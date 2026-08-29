import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog | HostCopy AI",
  description: "What's new in HostCopy AI — major features and updates.",
  alternates: { canonical: "https://hostcopyai.com/changelog" },
};

const ENTRIES: { date: string; items: string[] }[] = [
  {
    date: "August 29, 2026",
    items: [
      "Added a Regenerate button, a \"copy all 3\" button, word counts, quick-start templates, and a thumbs-up/down feedback gesture after generating",
      "Added generation history for Pro users, and this changelog page",
      "Added a Stripe webhook to log subscription cancellations and failed payments, rate limiting on checkout, and stricter input validation on the generator",
      "Added a Content-Security-Policy in monitoring mode as a step toward tighter security",
      "Added custom illustrations for the hero section and the 404 page, a loading skeleton, toast notifications, and a sticky header and \"Generate\" button while scrolling",
      "Added SEO structured data, comparison tables, TL;DR summaries, and cited sources across blog articles, plus a hosting glossary and several new guides",
      "Added a first-time explainer for new visitors, clearer error messages, and accessibility improvements for screen reader users",
      "Fixed a bug where the back-to-top button overlapped the mobile \"Generate\" bar",
    ],
  },
  {
    date: "August 28, 2026",
    items: [
      "Added Booking.com description generator link across the blog and footer",
      "Improved accessibility with proper form labels across the site",
      "Added an llms.txt file so AI search engines can better understand the site",
      "Small copy and color polish across buttons and links",
    ],
  },
  {
    date: "August 20, 2026",
    items: [
      "Added a dedicated Booking.com-specific description generator page",
      "Redesigned the site with a warm cream color palette",
      "Expanded the pricing plans and FAQ with more detail",
      "Switched to Google Fonts for a more polished look",
    ],
  },
  {
    date: "August 16, 2026",
    items: [
      "Added usage analytics for successful and failed generations",
      "Enabled promo codes at checkout",
    ],
  },
  {
    date: "August 14, 2026",
    items: ["Added a Twelve Tools badge to the footer"],
  },
  {
    date: "August 12, 2026",
    items: [
      "Added Pro account tokens so paying users skip the free-generation limit",
      "Fixed generation rate limiting to persist reliably using Redis",
      "Added a Terms of Service page",
    ],
  },
  {
    date: "August 11, 2026",
    items: [
      "Added a cookie consent banner and privacy-friendly analytics",
      "Added a Terms of Service link in the footer",
      "Added security headers site-wide",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-navy/70 hover:text-navy transition-colors">
          &larr; Back to HostCopy AI
        </Link>
        <h1 className="font-display text-3xl font-semibold text-navy mt-8 mb-2">
          Changelog
        </h1>
        <p className="text-navy/70 mb-10">
          The major updates and features we&apos;ve shipped, newest first.
        </p>
        <div className="space-y-8">
          {ENTRIES.map((entry) => (
            <div key={entry.date} className="border-l-2 border-brass/30 pl-5">
              <p className="font-mono text-xs uppercase tracking-wide text-navy/70 mb-2">
                {entry.date}
              </p>
              <ul className="space-y-1.5">
                {entry.items.map((item) => (
                  <li key={item} className="text-navy/80 text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
