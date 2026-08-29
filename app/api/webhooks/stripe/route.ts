import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const API_VERSION = '2025-03-31.basil' as Stripe.StripeConfig['apiVersion'];

// Handles subscription-cancellation-shaped events so we at least have a
// record of them. This does NOT revoke Pro access today: the Pro flag lives
// in a signed cookie in the user's own browser (see app/lib/proToken.ts),
// and a webhook has no access to that browser's cookies. Actually revoking
// access on cancellation needs one of:
//   (a) a database mapping Stripe customer_id -> pro_status, checked
//       server-side instead of trusting the client's cookie, or
//   (b) some other server-side session store the cookie can be tied to.
// Neither exists yet. For now this endpoint verifies the Stripe signature
// and logs the event so there's a record to act on / build against later.
const HANDLED_EVENTS = new Set([
  'customer.subscription.deleted',
  'customer.subscription.updated',
  'invoice.payment_failed',
]);

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY is missing on the server' }, { status: 503 });
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('Stripe webhook received but STRIPE_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Webhook secret is not configured on the server' }, { status: 503 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: API_VERSION });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err instanceof Error ? err.message : 'unknown error');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  // For subscription.updated we only care about it here if the new status
  // is no longer active (e.g. past_due, canceled, unpaid) — an update that
  // keeps the subscription active isn't a cancellation-shaped event.
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    if (subscription.status === 'active') {
      return NextResponse.json({ received: true });
    }
  }

  let customerEmail: string | null = null;
  try {
    const obj = event.data.object as { customer?: string | Stripe.Customer | null; customer_email?: string | null };
    if (typeof obj.customer_email === 'string') {
      customerEmail = obj.customer_email;
    } else if (typeof obj.customer === 'string') {
      const customer = await stripe.customers.retrieve(obj.customer);
      if (!('deleted' in customer) || !customer.deleted) {
        customerEmail = (customer as Stripe.Customer).email ?? null;
      }
    }
  } catch (err) {
    console.error('Stripe webhook: failed to resolve customer email:', err instanceof Error ? err.message : 'unknown error');
  }

  // TODO (future work, needs a human decision): this only logs the event.
  // Full revocation requires a customer_id -> pro_status mapping (a
  // database, which this project doesn't have) so a future request from
  // that user can be checked server-side instead of trusting their cookie.
  console.log(
    `[stripe-webhook] ${new Date().toISOString()} event=${event.type} customer_email=${customerEmail ?? 'unknown'}`
  );

  return NextResponse.json({ received: true });
}
