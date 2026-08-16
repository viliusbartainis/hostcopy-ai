import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const API_VERSION = '2025-03-31.basil' as Stripe.StripeConfig['apiVersion'];

export async function POST() {
  try {
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

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json(
      { error: 'Checkout failed. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
