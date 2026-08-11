import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const API_VERSION = '2025-03-31.basil' as Stripe.StripeConfig['apiVersion'];

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ valid: false }, { status: 503 });
  }
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: API_VERSION });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const valid =
      session.payment_status === 'paid' &&
      session.status === 'complete';
    return NextResponse.json({ valid });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
