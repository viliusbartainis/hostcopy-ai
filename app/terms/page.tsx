import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | HostCopy AI",
  description: "Terms of Service for using HostCopy AI's listing description generator.",
  alternates: { canonical: "https://hostcopyai.com/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-navy/60 hover:text-navy transition-colors">
          &larr; Back to HostCopy AI
        </Link>
        <div className="legal-content mt-8">
      <h1>Terms of Service</h1>
      <p className="text-sm">Last updated: August 2026</p>
      <p>
        These Terms of Service ("Terms") govern your use of HostCopy AI
        ("the Service"), operated from Vilnius, Lithuania. By using the
        Service, you agree to these Terms.
      </p>
      <h2>The Service</h2>
      <p>
        HostCopy AI generates listing descriptions for Airbnb, Booking.com,
        and Instagram based on property details you provide. The Free plan
        includes a limited number of generations. Pro and Premium plans are
        paid monthly subscriptions billed via Stripe.
      </p>
      <h2>Your responsibilities</h2>
      <ul>
        <li>You are responsible for the accuracy of the property details you submit.</li>
        <li>You are responsible for reviewing generated content before publishing it on any platform, and for that platform's own rules.</li>
        <li>You won't use the Service to generate misleading, illegal, or harmful content.</li>
      </ul>
      <h2>Subscriptions and billing</h2>
      <ul>
        <li>Pro and Premium subscriptions renew automatically each month until canceled.</li>
        <li>You can cancel anytime via the billing portal linked in your account; you'll retain access until the end of the current billing period.</li>
        <li>Prices are shown inclusive of applicable VAT for EU customers.</li>
        <li>We don't offer refunds for partial billing periods, except where required by law.</li>
      </ul>
      <h2>No warranty</h2>
      <p>
        The Service is provided "as is". AI-generated content may contain
        errors or inaccuracies. We don't guarantee that using the Service
        will result in more bookings or any particular outcome.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, HostCopy AI is not liable for
        indirect, incidental, or consequential damages arising from your
        use of the Service, including any listing performance or platform
        policy issues.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the
        Service after changes means you accept the updated Terms.
      </p>
      <h2>Governing law</h2>
      <p>These Terms are governed by the laws of the Republic of Lithuania.</p>
      <h2>Contact</h2>
      <p>Questions? Reach out via the contact details on our homepage.</p>
        </div>
      </div>
    </main>
  );
}
