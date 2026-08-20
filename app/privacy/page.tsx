import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | HostCopy AI",
  description:
    "How HostCopy AI collects, uses, and protects your data when you use our listing description generator.",
  alternates: { canonical: "https://hostcopyai.com/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-navy/60 hover:text-navy transition-colors">
          &larr; Back to HostCopy AI
        </Link>
        <div className="legal-content mt-8">
      <h1>Privacy Policy</h1>
      <p className="text-sm">Last updated: August 2026</p>
      <p>
        HostCopy AI (&quot;we&quot;, &quot;us&quot;) is a tool that generates
        Airbnb, Booking.com, and Instagram listing descriptions from
        information you provide. This page explains what data we collect,
        why, and how it&apos;s handled.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Property details you enter</strong> (property type,
          location, guests, amenities, tone) are sent to our AI provider
          (Groq) to generate your description. This text is processed to
          create your result and is not stored in a database or used to
          train any model.
        </li>
        <li>
          <strong>Payment information</strong> for Pro/Premium subscriptions
          is collected and processed entirely by Stripe. We do not see or
          store your card details. We receive only your email address and
          subscription status from Stripe, to manage your account.
        </li>
        <li>
          <strong>Local usage data</strong> — your browser stores a small
          flag locally (via localStorage) to remember your free-generation
          count and Pro status. This stays on your device and is not sent
          to our servers.
        </li>
        <li>
          <strong>Language preference</strong> — a cookie remembers your
          selected site language so you don&apos;t have to choose it again
          on your next visit.
        </li>
        <li>
          <strong>Basic analytics</strong> — we use Google Analytics to
          understand overall traffic (e.g., which pages are visited, from
          which country) so we can improve the site. This data is
          aggregated and not used to identify you personally.
        </li>
      </ul>
      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your data to third parties.</li>
        <li>We don&apos;t store the property descriptions you generate on our servers.</li>
        <li>We don&apos;t require an account or personal details to try the free tier.</li>
      </ul>
      <h2>Third-party services we use</h2>
      <ul>
        <li>
          <strong>Stripe</strong> — payment processing.{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            Stripe&apos;s privacy policy
          </a>
        </li>
        <li>
          <strong>Groq</strong> — AI text generation.{" "}
          <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Groq&apos;s privacy policy
          </a>
        </li>
        <li>
          <strong>Vercel</strong> — hosting infrastructure.{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel&apos;s privacy policy
          </a>
        </li>
        <li>
          <strong>Google Analytics</strong> — traffic analytics.{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google&apos;s privacy policy
          </a>
        </li>
      </ul>
      <h2>Your rights</h2>
      <p>
        If you are in the EU/EEA, you have rights under GDPR, including the
        right to request what data we hold about you (limited to your email
        and subscription status via Stripe) and to request its deletion. To
        do so, contact us using the details below.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach out via the contact details on
        our homepage.
      </p>
        </div>
      </div>
    </main>
  );
}
