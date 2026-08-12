import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';
import { verifyProToken, COOKIE_NAME } from '@/app/lib/proToken';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-120b';
const RATE_LIMIT = 8;
const WINDOW_SECONDS = 60 * 60;

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!process.env.KV_REDIS_URL) return null;
  if (!redisClient) {
    redisClient = createClient({ url: process.env.KV_REDIS_URL });
    redisClient.on('error', (err) => console.error('Redis client error:', err));
  }
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const redis = await getRedis();
    if (!redis) return false;
    const key = `ratelimit:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }
    return count > RATE_LIMIT;
  } catch (err) {
    console.error('Rate limit check failed, allowing request:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const isPro = verifyProToken(req.cookies.get(COOKIE_NAME)?.value);

    if (!isPro && (await isRateLimited(ip))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { propertyType, location, amenities, guests, bedrooms, tone } = body;

    if (!location || typeof location !== 'string') {
      return NextResponse.json({ error: 'Location is required.' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Server is not configured yet (missing GROQ_API_KEY).' }, { status: 500 });
    }

    const systemPrompt = `You are an expert short-term rental copywriter. You write platform-specific listing copy that is SEO-friendly and matches the specified tone. Avoid generic phrases like "cozy retreat" unless the tone specifically calls for it. You MUST respond with ONLY a valid JSON object (no markdown, no code fences, no preamble) with exactly these three keys:
- "airbnb": a 150-200 word Airbnb listing description (warm, story-driven, keyword-rich for Airbnb search)
- "booking": a 100-130 word Booking.com listing description (more formal/factual tone, structured, highlights amenities clearly since Booking.com guests scan for specifics)
- "instagram": a short 2-3 sentence Instagram caption (60-90 words) promoting the property, casual tone, ending with 3-5 relevant hashtags`;

    const userPrompt = `Write listing copy for:
- Property type: ${propertyType}
- Location: ${location}
- Guests: ${guests}, Bedrooms: ${bedrooms}
- Amenities: ${Array.isArray(amenities) ? amenities.join(', ') : ''}
- Tone: ${tone}

Respond with ONLY the JSON object, nothing else.`;

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
        max_tokens: 2000,
        temperature: 0.8,
        reasoning_effort: 'low',
        response_format: { type: 'json_object' },
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error(`Groq API error (${groqRes.status}):`, errText);
      return NextResponse.json({ error: 'Generation failed. Please try again in a moment.' }, { status: 500 });
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '{}';

    let parsed: { airbnb?: string; booking?: string; instagram?: string };
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { airbnb: raw, booking: '', instagram: '' };
    }

    return NextResponse.json({
      airbnb: parsed.airbnb || '',
      booking: parsed.booking || '',
      instagram: parsed.instagram || '',
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Generation failed. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
