import { NextRequest, NextResponse } from 'next/server';

// Groq offers a free API tier (no credit card required) with fast, high-quality
// open-source models. We use it here instead of a paid API to keep costs at $0.
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

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

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Server is not configured yet (missing GROQ_API_KEY).' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an expert short-term rental copywriter. Write compelling, SEO-friendly property descriptions of 150-200 words that highlight unique selling points and match the specified tone. Avoid generic phrases like "cozy retreat" unless the tone specifically calls for it. Do not use markdown formatting - plain text only. Do not include any preamble, just the description itself.`;

    const userPrompt = `Write an Airbnb/Booking.com listing description for:
- Property type: ${propertyType}
- Location: ${location}
- Guests: ${guests}, Bedrooms: ${bedrooms}
- Amenities: ${Array.isArray(amenities) ? amenities.join(', ') : ''}
- Tone: ${tone}`;

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', errText);
      return NextResponse.json(
        { error: 'Failed to generate description' },
        { status: 500 }
      );
    }

    const data = await groqRes.json();
    const description = data?.choices?.[0]?.message?.content?.trim() || '';

    return NextResponse.json({ description });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}
