import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
if (!process.env.STRIPE_SECRET_KEY) {
return NextResponse.json({ error: 'Stripe not configured yet' }, { status: 503 });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
mode: 'subscription',
line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
success_url: `${process.env.NEXT_PUBLIC_URL || 'https://hostcopy-ai.vercel.app'}?success=true`,
cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://hostcopy-ai.vercel.app'}?canceled=true`,
});

return NextResponse.json({ url: session.url });
}
