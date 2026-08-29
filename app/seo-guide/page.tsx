import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Airbnb SEO Guide: How to Rank Higher | HostCopy AI",
  description: "Everything on this site about ranking higher in Airbnb search — ranking factors, titles, descriptions, and timing — in one place.",
  alternates: { canonical: "https://hostcopyai.com/seo-guide" },
  openGraph: {
    title: "Airbnb SEO Guide",
    description: "Every guide on this site about ranking higher in Airbnb search, in one place: ranking factors, titles, descriptions, and timing.",
    url: "https://hostcopyai.com/seo-guide",
    siteName: "HostCopy AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb SEO Guide",
    description: "Every guide on this site about ranking higher in Airbnb search, in one place: ranking factors, titles, descriptions, and timing.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hostcopyai.com" },
    { "@type": "ListItem", position: 2, name: "Airbnb SEO Guide", item: "https://hostcopyai.com/seo-guide" },
  ],
};

const guides = [
  {
    slug: "airbnb-seo-search-ranking",
    title: "SEO for Airbnb: How to Rank Higher in Airbnb Search Results",
    description: "The core guide: how Airbnb's search ranking actually weighs response rate, Instant Book, occupancy, photos, and reviews — and the practical actions that move it.",
  },
  {
    slug: "airbnb-title-that-gets-clicks",
    title: "How to Write an Airbnb Title That Gets Clicks",
    description: "Titles don't directly move ranking, but they drive the click-through and booking rate that do. The formula, common mistakes, and before/after examples.",
  },
  {
    slug: "airbnb-listing-description-guide",
    title: "How to Write an Airbnb Listing Description That Actually Books",
    description: "A description that matches your photos and amenities reduces the mismatched-expectation reviews that quietly hurt ranking over time.",
  },
  {
    slug: "best-time-to-list-airbnb",
    title: "Best Time to List Your Airbnb Property",
    description: "New listings need time to build the review count and booking history that ranking rewards — timing your launch affects how fast that happens.",
  },
  {
    slug: "airbnb-superhost-requirements",
    title: "Airbnb Superhost Requirements Explained",
    description: "Superhost status is a byproduct of the same metrics — response rate, reviews, cancellations — that also feed search ranking.",
  },
  {
    slug: "airbnb-hosting-glossary",
    title: "Airbnb Hosting Glossary",
    description: "Plain-language definitions for the ranking-adjacent terms that come up across these guides: search ranking, listing quality score, response rate, and more.",
  },
];

export default function SeoGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">&larr; Back to HostCopy AI</Link>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-4">
          Airbnb SEO Guide
        </h1>
        <p className="text-stone-600 mb-10">
          Everything on this site about ranking higher in Airbnb search, gathered in one place —
          start with the ranking-factors guide, then go deeper on whichever piece (title,
          description, timing) you need to fix first.
        </p>
        <div className="space-y-8">
          {guides.map((g) => (
            <div key={g.slug}>
              <Link href={`/blog/${g.slug}`} className="text-xl font-display font-semibold text-stone-900 underline">
                {g.title}
              </Link>
              <p className="text-stone-600 mt-2 text-sm">{g.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-stone-200">
          <Link href="/blog" className="text-stone-900 underline font-medium">
            Browse the full blog
          </Link>
        </div>
      </div>
    </main>
  );
}
