import { NextRequest, NextResponse } from 'next/server';

// Groq offers a free API tier (no credit card required) with fast, high-quality
// open-source models. We use it here instead of a paid API to keep costs at $0.
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-120b';

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

    const systemPrompt =
