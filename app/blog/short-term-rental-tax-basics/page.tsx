import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Short-Term Rental Tax Basics for New Hosts | HostCopy AI",
  description: "General patterns in how short-term rental income is taxed, what usually needs to be declared, and commonly deductible expenses. Not tax advice.",
  keywords: "airbnb taxes for hosts, short-term rental tax guide, do airbnb hosts pay tax",
  alternates: { canonical: 'https://hostcopyai.com/blog/short-term-rental-tax-basics' },
  openGraph: {
    type: "article",
    title: "Short-Term Rental Tax Basics for New Hosts",
    description: "Tax is one of the parts of starting a short-term rental that new hosts put off longest, often because generic answers online can be actively misleading.",
    publishedTime: "2026-08-03",
    modifiedTime: "2026-08-29",
    url: "https://hostcopyai.com/blog/short-term-rental-tax-basics",
  },
};

export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Short-Term Rental Tax Basics for New Hosts",
    description: "General patterns in how short-term rental income is taxed, what usually needs to be declared, and commonly deductible expenses. Not tax advice.",
    author: { "@type": "Organization", name: "HostCopy AI" },
    publisher: {
      "@type": "Organization",
      name: "HostCopy AI",
      logo: { "@type": "ImageObject", url: "https://hostcopyai.com/logo-512.png" },
    },
    datePublished: "2026-08-03",
    dateModified: "2026-08-29",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://hostcopyai.com/blog/short-term-rental-tax-basics",
    },
  };

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hostcopyai.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://hostcopyai.com/blog" },
    { "@type": "ListItem", position: 3, name: "Short-Term Rental Tax Basics for New Hosts", item: "https://hostcopyai.com/blog/short-term-rental-tax-basics" },
  ],
};

  return (
    <main className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-stone-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:underline"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article id="main-content" className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">&larr; Back to HostCopy AI</Link>
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-4">
          <span>Last updated: August 29, 2026</span>
          <span aria-hidden="true">&middot;</span>
          <span>2 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-6">
          Short-Term Rental Tax Basics for New Hosts
        </h1>
        <p className="text-sm text-stone-500 italic mt-4 mb-4">Who this guide is for: New hosts trying to understand the general shape of short-term rental taxes before talking to an accountant.</p>
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">TL;DR</p>
          <p className="text-stone-800 leading-relaxed text-sm">Short-term rental income is generally taxable and needs to be declared, with a set of commonly deductible expenses — cleaning, platform fees, a portion of utilities. Exact rules vary hugely by country, and this is general information, not tax advice for your specific situation.</p>
        </div>

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
        <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
          <p className="font-medium mb-1">Further reading</p>
          <ul className="space-y-1">
            <li><a href="https://www.irs.gov/businesses/gig-economy-tax-center" target="_blank" rel="noopener noreferrer" className="underline">IRS Gig Economy Tax Center</a> (US hosts; rules differ outside the US)</li>
          </ul>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-200 text-sm text-stone-500">
          Written by the HostCopy AI team &mdash; a solo developer project.{" "}
          <Link href="/about" className="underline text-stone-700">Learn more about us</Link>.
        </div>
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
