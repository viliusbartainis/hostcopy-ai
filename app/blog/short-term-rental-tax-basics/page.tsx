import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Short-Term Rental Tax Basics for New Hosts | HostCopy AI",
  description: "General patterns in how short-term rental income is taxed, what usually needs to be declared, and commonly deductible expenses. Not tax advice.",
  keywords: "airbnb taxes for hosts, short-term rental tax guide, do airbnb hosts pay tax",
  alternates: { canonical: 'https://hostcopyai.com/blog/short-term-rental-tax-basics' },
};

export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Short-Term Rental Tax Basics for New Hosts",
    description: "General patterns in how short-term rental income is taxed, what usually needs to be declared, and commonly deductible expenses. Not tax advice.",
    author: { "@type": "Organization", name: "HostCopy AI" },
    publisher: { "@type": "Organization", name: "HostCopy AI" },
    datePublished: "2026-08-03",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://hostcopyai.com/blog/short-term-rental-tax-basics",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">&larr; Back to HostCopy AI</Link>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-6">
          Short-Term Rental Tax Basics for New Hosts
        </h1>
        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5">
          <p>Tax is one of the parts of starting a short-term rental that new hosts put off longest, often because generic answers online can be actively misleading. Rules differ hugely between countries, and frequently between states, provinces, or even cities within the same country.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">This is general information, not tax advice</h2>
          <p>This article describes broad patterns that show up across many countries, not a legal or tax guide for any specific place. Whether short-term rental income counts as rental income, business income, or something else, whether VAT or GST applies, and what registration you need before you can legally host all vary by country and often by region within a country. Before making any real decisions, talk to a local accountant or tax advisor who knows the rules where your property actually is &mdash; an hour of their time is almost always cheaper than the cost of getting this wrong.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">What most hosts need to declare</h2>
          <p>Income from short-term rental counts as taxable income in the overwhelming majority of countries, including small amounts and income that arrives directly from a platform into your bank account. Many platforms now share booking and payout data with tax authorities under information-sharing agreements, so your income may already be visible to your tax authority whether or not you report it yourself. A few jurisdictions do carve out exemptions for very limited rental &mdash; a small number of rental days per year, or renting only a room in your primary residence &mdash; but these are the exception rather than the rule, and worth confirming for your specific location rather than assuming they apply to you.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Expenses that are commonly deductible, in general terms</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cleaning costs, supplies, and consumables purchased for guest use</li>
            <li>Platform commissions and fees</li>
            <li>A portion of utilities and internet, often prorated by the share of space or time used for rental if it&apos;s part of your primary residence</li>
            <li>Depreciation of furniture and larger equipment over time, in many tax systems</li>
            <li>Repairs and maintenance directly tied to the rental space</li>
            <li>Insurance premiums specific to short-term rental use</li>
          </ul>
          <p>These are common patterns, not a guarantee &mdash; whether and how much of each is actually deductible depends entirely on the rules where you&apos;re based.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Recordkeeping habits that make tax season easier</h2>
          <p>Keep receipts from day one, even before your first confirmed booking. A separate bank account, or at minimum a clear way to track rental income apart from personal spending, saves hours later. If the property is also your home part of the year, log which dates were personal use and which were rental use, since many tax systems treat these periods differently.</p>
          <p>None of this replaces professional advice, but getting the business side organized early leaves more room to focus on the guest experience &mdash; including things like your listing description, which <Link href="/" className="text-stone-900 underline font-medium">HostCopy AI</Link> can help you write in under a minute.</p>
          <div className="mt-10 pt-8 border-t border-stone-200">
            <p className="text-sm font-medium text-stone-500 mb-3">Related guides</p>
            <div className="space-y-2">
              <Link href="/blog/airbnb-startup-cost" className="block text-stone-900 underline">How Much Does It Cost to Start an Airbnb Business?</Link>
              <Link href="/blog/new-airbnb-host-checklist" className="block text-stone-900 underline">The Ultimate Airbnb Host Checklist for New Listings</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
