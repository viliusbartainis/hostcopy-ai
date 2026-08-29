import { NextRequest, NextResponse } from 'next/server';
import { verifyProToken, COOKIE_NAME } from '@/app/lib/proToken';
import { isRateLimited } from '@/app/lib/rateLimit';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-120b';
const RATE_LIMIT = 8;
const WINDOW_SECONDS = 60 * 60;
const MAX_BODY_BYTES = 10 * 1024;
const GROQ_TIMEOUT_MS = 15_000;
const MAX_GUESTS = 50;
const MAX_BEDROOMS = 20;

// Basic prompt-injection guard for the free-text "location" field. This is
// NOT a complete defense — just a first filter against the most obvious
// "ignore your instructions" style phrases before the value is interpolated
// into the Groq prompt.
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/gi,
  /disregard\s+(all\s+)?(previous|prior|above)\s+instructions/gi,
  /system\s*:/gi,
  /assistant\s*:/gi,
];

function sanitizeLocation(value: string): string {
  let cleaned = value;
  for (const pattern of INJECTION_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }
  return cleaned.trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const isPro = verifyProToken(req.cookies.get(COOKIE_NAME)?.value);

    if (!isPro && (await isRateLimited('ratelimit', ip, RATE_LIMIT, WINDOW_SECONDS))) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(WINDOW_SECONDS) } }
      );
    }

    const contentLength = Number(req.headers.get('content-length') || '0');
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    }

    const body = await req.json();
    const { propertyType, location, amenities, guests, bedrooms, tone } = body;

    if (!location || typeof location !== 'string') {
      return NextResponse.json({ error: 'Location is required.' }, { status: 400 });
    }

    const sanitizedLocation = sanitizeLocation(location);
    if (!sanitizedLocation) {
      return NextResponse.json({ error: 'Location is required.' }, { status: 400 });
    }

    if (
      typeof guests !== 'number' || !Number.isFinite(guests) || guests < 1 || guests > MAX_GUESTS ||
      typeof bedrooms !== 'number' || !Number.isFinite(bedrooms) || bedrooms < 0 || bedrooms > MAX_BEDROOMS
    ) {
      return NextResponse.json({ error: 'Guests or bedrooms value is out of range.' }, { status: 400 });
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
- Location: ${sanitizedLocation}
- Guests: ${guests}, Bedrooms: ${bedrooms}
- Amenities: ${Array.isArray(amenities) ? amenities.join(', ') : ''}
- Tone: ${tone}

Respond with ONLY the JSON object, nothing else.`;

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), GROQ_TIMEOUT_MS);

    let groqRes: Response;
    try {
      groqRes = await fetch(GROQ_API_URL, {
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
        signal: abortController.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.error('Groq API request timed out');
        return NextResponse.json({ error: 'Generation timed out. Please try again.' }, { status: 504 });
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!groqRes.ok) {
      // Don't log the raw response body: some providers echo request
      // details (occasionally including a masked form of the API key) back
      // in error payloads. Status code is enough to diagnose from here.
      console.error(`Groq API error: status ${groqRes.status}`);
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

    return NextResponse.json(
      {
        airbnb: parsed.airbnb || '',
        booking: parsed.booking || '',
        instagram: parsed.instagram || '',
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Generation error:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json(
      { error: 'Generation failed. Please try again in a moment.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
