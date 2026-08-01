import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Very simple in-memory rate limiter (per server instance).
// Prevents obvious abuse of the free tier. Not bulletproof, but cheap and effective.
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 8; // max requests
const WINDOW_MS = 60 * 60 * 1000; // per hour, per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { propertyType, location, amenities, guests, bedrooms, tone } = body;

    if (!location || typeof location !== 'string') {
      return NextResponse.json({ error: 'Location is required.' }, { status: 400 });
    }

    const systemPrompt = `You are an expert short-term rental copywriter. Write compelling, SEO-friendly property descriptions of 150-200 words that highlight unique selling points and match the specified tone. Avoid generic phrases like "cozy retreat" unless the tone specifically calls for it. Do not use markdown formatting - plain text only.`;

    const userPrompt = `Write an Airbnb/Booking.com listing description for:
- Property type: ${propertyType}
- Location: ${location}
- Guests: ${guests}, Bedrooms: ${bedrooms}
- Amenities: ${Array.isArray(amenities) ? amenities.join(', ') : ''}
- Tone: ${tone}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const description = textBlock && 'text' in textBlock ? textBlock.text : '';

    return NextResponse.json({ description });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
