import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Airbnb Hosting Glossary: 21 Terms Explained | HostCopy AI",
  description: "Superhost, Instant Book, response rate, occupancy rate, and 17 more Airbnb hosting terms explained clearly, in plain language.",
  keywords: "airbnb hosting glossary, airbnb terms explained, what is superhost, what is instant book",
  alternates: {
    canonical: "https://hostcopyai.com/blog/airbnb-hosting-glossary",
  },
  openGraph: {
    type: "article",
    title: "Airbnb Hosting Glossary: 21 Terms Every Host Should Know",
    description: "Superhost, Instant Book, response rate, occupancy rate, and more — clear, accurate definitions for the terms Airbnb hosts run into most.",
    publishedTime: "2026-08-28",
    modifiedTime: "2026-08-29",
    url: "https://hostcopyai.com/blog/airbnb-hosting-glossary",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Hosting Glossary: 21 Terms Every Host Should Know",
    description: "Superhost, Instant Book, response rate, occupancy rate, and more — clear, accurate definitions for the terms Airbnb hosts run into most.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Airbnb Hosting Glossary: 21 Terms Every Host Should Know",
  description: "Superhost, Instant Book, response rate, occupancy rate, and more — clear, accurate definitions for the terms Airbnb hosts run into most.",
  author: { "@type": "Organization", name: "HostCopy AI" },
  publisher: {
    "@type": "Organization",
    name: "HostCopy AI",
    logo: { "@type": "ImageObject", url: "https://hostcopyai.com/logo-512.png" },
  },
  datePublished: "2026-08-28",
  dateModified: "2026-08-29",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://hostcopyai.com/blog/airbnb-hosting-glossary",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hostcopyai.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://hostcopyai.com/blog" },
    { "@type": "ListItem", position: 3, name: "Airbnb Hosting Glossary: 21 Terms Every Host Should Know", item: "https://hostcopyai.com/blog/airbnb-hosting-glossary" },
  ],
};

const terms = [
  {
    term: "Superhost",
    definition: "A status badge Airbnb awards to hosts who meet minimum thresholds for reviews, response rate, cancellations, and overall rating, reviewed quarterly. It gives extra visibility in search and a badge on the listing, but doesn't guarantee bookings on its own.",
  },
  {
    term: "Guest Favorite",
    definition: "A separate badge introduced by Airbnb for individual listings (not hosts) in roughly the top 9% by rating, reviews, and reliability, recalculated on a rolling basis rather than a fixed quarterly schedule. It's awarded automatically and isn't something a host applies for or configures.",
  },
  {
    term: "Instant Book",
    definition: "A listing setting that lets guests book immediately without waiting for host approval. Airbnb's search tends to favor Instant Book listings, since it reduces friction for guests comparing several options.",
  },
  {
    term: "Response rate",
    definition: "The percentage of new messages a host replies to within 24 hours. It's one of the factors Airbnb uses in both Superhost eligibility and, reportedly, search ranking.",
  },
  {
    term: "Response time",
    definition: "The average time it takes a host to reply to guest messages. Faster response time is generally associated with better guest experience and can affect Superhost status.",
  },
  {
    term: "Occupancy rate",
    definition: "The percentage of available nights that are actually booked over a given period. A common way to measure how well a listing is performing relative to its calendar.",
  },
  {
    term: "ADR (Average Daily Rate)",
    definition: "The average nightly price actually paid across booked nights, as opposed to the listed price. Used alongside occupancy rate to evaluate revenue performance.",
  },
  {
    term: "RevPAR (Revenue Per Available Night)",
    definition: "Total revenue divided by the total number of available nights (booked or not). It combines occupancy and rate into a single number for comparing performance over time.",
  },
  {
    term: "Dynamic pricing",
    definition: "Adjusting the nightly rate based on demand signals like season, day of week, local events, and booking lead time, rather than charging one flat rate year-round.",
  },
  {
    term: "Minimum stay",
    definition: "The fewest number of nights a guest must book for a given date range. Hosts often raise minimum stays during high-demand periods to reduce turnover costs.",
  },
  {
    term: "Cancellation policy",
    definition: "The rules that determine how much a guest is refunded if they cancel, ranging from Flexible to Strict, and how much of a payout the host keeps in each case.",
  },
  {
    term: "Host guarantee / AirCover",
    definition: "Airbnb's protection program for hosts, which can cover certain types of guest-caused property damage and liability claims, subject to its terms and exclusions.",
  },
  {
    term: "Co-host",
    definition: "A person granted partial or full access to manage a listing — messaging guests, updating the calendar, or handling check-ins — without necessarily being the listing owner.",
  },
  {
    term: "Listing quality score",
    definition: "An internal Airbnb metric that reportedly factors into search ranking, based on signals like photos, completeness of listing details, pricing competitiveness, and guest satisfaction. Airbnb doesn't publish the exact formula.",
  },
  {
    term: "Search ranking",
    definition: "The order listings appear in for a given search query, influenced by factors including price, reviews, response rate, Instant Book, and how well the listing matches the guest's filters.",
  },
  {
    term: "House rules",
    definition: "The specific policies a host sets for guest behavior — quiet hours, guest caps, smoking, pets, parties — displayed on the listing before booking.",
  },
  {
    term: "Self check-in",
    definition: "A check-in method that doesn't require the host or a representative to be present, typically using a lockbox, smart lock, or keypad.",
  },
  {
    term: "Guest star rating",
    definition: "The 1-5 star review a guest leaves after checkout, factoring into a listing's overall rating and, over time, Superhost eligibility.",
  },
  {
    term: "Payout",
    definition: "The amount a host actually receives after Airbnb deducts its host service fee, released according to the host's chosen payout schedule (typically a set time after check-in).",
  },
  {
    term: "Service fee",
    definition: "The percentage Airbnb charges to hosts (and separately to guests) for using the platform. The exact host-side fee depends on the host's cancellation policy and account type.",
  },
  {
    term: "Long-term stay discount",
    definition: "An optional discount a host can set for bookings above a certain number of nights (commonly 28+), used to attract guests booking extended stays.",
  },
];

export default function GlossaryPost() {
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
          <span>1 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-6">
          Airbnb Hosting Glossary: 21 Terms Every Host Should Know
        </h1>
        <p className="text-sm text-stone-500 italic mt-4 mb-4">Who this guide is for: Hosts who keep running into hosting jargon that isn't explained clearly anywhere else.</p>
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">TL;DR</p>
          <p className="text-stone-800 leading-relaxed text-sm">This glossary defines 20 terms Airbnb hosts run into constantly — Superhost, Instant Book, response rate, occupancy rate, and more — in plain language, without the marketing spin some of these terms get elsewhere.</p>
        </div>

        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5">
          <p>Airbnb hosting comes with its own vocabulary, and a lot of it isn&apos;t explained clearly in one place. Here are 20 terms that come up constantly, defined plainly and without jargon.</p>
        </div>
        <dl className="mt-8 space-y-6">
          {terms.map((t) => {
            const id = t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <div key={t.term} id={id} className="border-b border-stone-200 pb-6 scroll-mt-8">
                <dt className="text-lg font-display font-semibold text-stone-900 mb-1">{t.term}</dt>
                <dd className="text-stone-700 leading-relaxed">{t.definition}</dd>
              </div>
            );
          })}
        </dl>
        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5 mt-10">
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Frequently confused terms</h2>
          <p><strong><Link href="#superhost" className="underline">Superhost</Link> vs. <Link href="#guest-favorite" className="underline">Guest Favorite</Link></strong> — Superhost is a status awarded to a host based on their track record across all their listings, reviewed quarterly. Guest Favorite is awarded to an individual listing based on its own rating and reliability, recalculated on a rolling basis. A host can have one badge without the other, or both.</p>
          <p><strong><Link href="#response-rate" className="underline">Response rate</Link> vs. <Link href="#response-time" className="underline">Response time</Link></strong> — response rate is the percentage of messages you reply to within 24 hours; response time is how fast those replies actually are. A host can have a perfect response rate while still being slow, or vice versa — they measure different things.</p>
        </div>
        <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500">
          <p className="font-medium mb-1">Sources</p>
          <ul className="space-y-1">
            <li><a href="https://hospitable.com/airbnb-guest-favorite-badge" target="_blank" rel="noopener noreferrer" className="underline">Hospitable &ndash; Airbnb Guest Favorite Badge: How Does It Work?</a></li>
            <li><a href="https://www.airbnb.com/help/article/828" target="_blank" rel="noopener noreferrer" className="underline">Airbnb Help Center &ndash; Understand the Superhost program</a></li>
          </ul>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-200 text-sm text-stone-500">
          Written by the HostCopy AI team &mdash; a solo developer project.{" "}
          <Link href="/about" className="underline text-stone-700">Learn more about us</Link>.
        </div>
        <div className="mt-10 pt-8 border-t border-stone-200">
          <p className="text-sm font-medium text-stone-500 mb-3">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/airbnb-superhost-requirements" className="block text-stone-900 underline">
              Airbnb Superhost Requirements Explained
            </Link>
            <Link href="/blog/airbnb-seo-search-ranking" className="block text-stone-900 underline">
              SEO for Airbnb: How to Rank Higher in Search
            </Link>
            <Link href="/blog/airbnb-pricing-strategy" className="block text-stone-900 underline">
              How to Price Your Airbnb Listing
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
