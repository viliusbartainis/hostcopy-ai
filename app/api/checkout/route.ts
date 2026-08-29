import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isRateLimited } from '@/app/lib/rateLimit';

const API_VERSION = '2025-03-31.basil' as Stripe.StripeConfig['apiVersion'];
const MAX_BODY_BYTES = 10 * 1024;
const CHECKOUT_RATE_LIMIT = 5;
const CHECKOUT_WINDOW_SECONDS = 60 * 60;

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get('content-length') || '0');
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body is too large.' }, { status: 413 });
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    if (await isRateLimited('checkout-ratelimit', ip, CHECKOUT_RATE_LIMIT, CHECKOUT_WINDOW_SECONDS)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(CHECKOUT_WINDOW_SECONDS) } }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY is missing on the server' }, { status: 503 });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return NextResponse.json({ error: 'STRIPE_PRICE_ID is missing on the server' }, { status: 503 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: API_VERSION,
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://hostcopyai.com'}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://hostcopyai.com'}?canceled=true`,
    });

    return NextResponse.json({ url: session.url }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('Checkout error:', err instanceof Error ? err.message : 'unknown error');
    return NextResponse.json(
      { error: 'Checkout failed. Please try again in a moment.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
