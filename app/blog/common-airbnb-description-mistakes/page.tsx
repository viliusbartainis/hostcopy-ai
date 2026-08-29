import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "9 Common Airbnb Description Mistakes | HostCopy AI",
  description: "The Airbnb description mistakes that quietly cost bookings: clichéd openers, buried hooks, outdated details, and copy pasted unchanged across platforms.",
  keywords: "airbnb description mistakes, common airbnb listing mistakes, airbnb description tips",
  alternates: {
    canonical: "https://hostcopyai.com/blog/common-airbnb-description-mistakes",
  },
  openGraph: {
    type: "article",
    title: "9 Common Airbnb Description Mistakes That Cost Bookings",
    description: "Clichéd openers, buried hooks, outdated details, and copy pasted unchanged across platforms — the mistakes that quietly cost bookings, and how to fix each one.",
    publishedTime: "2026-08-29",
    modifiedTime: "2026-08-29",
    url: "https://hostcopyai.com/blog/common-airbnb-description-mistakes",
  },
  twitter: {
    card: "summary_large_image",
    title: "9 Common Airbnb Description Mistakes That Cost Bookings",
    description: "Clichéd openers, buried hooks, outdated details, and copy pasted unchanged across platforms — the mistakes that quietly cost bookings, and how to fix each one.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "9 Common Airbnb Description Mistakes That Cost Bookings",
  description: "Clichéd openers, buried hooks, outdated details, and copy pasted unchanged across platforms — the mistakes that quietly cost bookings, and how to fix each one.",
  author: { "@type": "Organization", name: "HostCopy AI" },
  publisher: {
    "@type": "Organization",
    name: "HostCopy AI",
    logo: { "@type": "ImageObject", url: "https://hostcopyai.com/logo-512.png" },
  },
  datePublished: "2026-08-29",
  dateModified: "2026-08-29",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://hostcopyai.com/blog/common-airbnb-description-mistakes",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hostcopyai.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://hostcopyai.com/blog" },
    { "@type": "ListItem", position: 3, name: "9 Common Airbnb Description Mistakes That Cost Bookings", item: "https://hostcopyai.com/blog/common-airbnb-description-mistakes" },
  ],
};

export default function BlogPost() {
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
          <span>3 min read</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-6">
          9 Common Airbnb Description Mistakes That Cost Bookings
        </h1>
        <p className="text-sm text-stone-500 italic mt-4 mb-4">Who this guide is for: Hosts who suspect their description is underperforming but aren&apos;t sure why.</p>
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 mb-6">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">TL;DR</p>
          <p className="text-stone-800 leading-relaxed text-sm">Most underperforming descriptions share the same handful of problems: a clichéd opener, a hook buried past the first sentence, amenities listed without context, and the same text pasted unchanged across Airbnb, Booking.com, and Instagram. Fixing these usually matters more than rewriting from scratch.</p>
        </div>

        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5">
          <p>A weak description rarely fails because of bad writing — it fails because of a specific, fixable habit. These are the mistakes that show up most often, and what to do instead of each one.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">1. Opening with a phrase every other listing uses</h2>
          <p>&quot;Cozy retreat,&quot; &quot;home away from home,&quot; &quot;hidden gem&quot; — guests have read these hundreds of times and skip past them without registering a single detail. Open with something specific to your actual property instead: the view, the walk to a landmark, the exact feeling of the space.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">2. Burying the hook past the first sentence</h2>
          <p>Guests scan before they read. Whatever makes your place different needs to be in the first sentence, not the third paragraph — by the time a generic opener finishes setting the scene, many guests have already moved to the next listing.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">3. Listing amenities instead of describing the experience</h2>
          <p>&quot;Kitchen, WiFi, parking&quot; tells a guest what exists but not why it matters to them. &quot;Cook breakfast looking out at the courtyard&quot; describes the same kitchen in a way a guest can actually picture.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">4. Pasting the same text on Airbnb, Booking.com, and Instagram</h2>
          <p>Airbnb guests respond to warmth and story. Booking.com guests scan for hard facts like bed count and distance to landmarks. Instagram needs a short caption with hashtags, not a paragraph. One description reused everywhere underperforms on at least one of the three.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">5. Letting details go stale</h2>
          <p>An amenity you removed, a renovation that changed the layout, an occupancy limit that&apos;s no longer accurate — outdated details create a mismatch between what guests expect and what they get, which shows up directly in reviews.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">6. Writing for every guest instead of your actual guest</h2>
          <p>A description trying to appeal to business travelers, families, and couples all at once usually appeals strongly to none of them. Lead with what your specific, most likely guest type searches for — a desk and WiFi speed for business travelers, a second bathroom and washer for families.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">7. No mention of the neighborhood</h2>
          <p>What&apos;s a five-minute walk away often tips a booking, especially for first-time visitors to an area. Leaving it out entirely means missing one of the more persuasive details available for free.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">8. Ending flat, with no closing line</h2>
          <p>A description that just stops after the last amenity misses a chance to leave a final impression. One genuine, specific closing sentence — not a generic &quot;book now!&quot; — reads as more human and memorable.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">9. Typos and formatting guests notice</h2>
          <p>A misspelled neighborhood name or a broken sentence undermines trust in a way that&apos;s disproportionate to the actual error — it reads as carelessness, and guests extend that impression to how the property itself is likely maintained.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Related questions</h2>
          <p><strong>Is it worth completely rewriting a description that&apos;s getting some bookings?</strong> Not necessarily — check it against this list first. Fixing one or two specific mistakes is usually faster and safer than starting over.</p>
          <p><strong>How often should I update my description?</strong> Whenever something factual changes (amenities, layout, occupancy), and it&apos;s worth a general review every few months regardless.</p>
          <p>Avoiding all nine of these by hand, for three different platforms, takes real editing time. <Link href="/" className="text-stone-900 underline font-medium">HostCopy AI</Link> generates an Airbnb, Booking.com, and Instagram version from one form, each already matched to how that platform&apos;s guests read.</p>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-200 text-sm text-stone-500">
          Written by the HostCopy AI team &mdash; a solo developer project.{" "}
          <Link href="/about" className="underline text-stone-700">Learn more about us</Link>.
        </div>
        <div className="mt-10 pt-8 border-t border-stone-200">
          <p className="text-sm font-medium text-stone-500 mb-3">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/airbnb-listing-description-guide" className="block text-stone-900 underline">
              How to Write an Airbnb Listing Description That Actually Books
            </Link>
            <Link href="/blog/airbnb-title-that-gets-clicks" className="block text-stone-900 underline">
              How to Write an Airbnb Title That Gets Clicks
            </Link>
            <Link href="/blog/booking-com-description-guide" className="block text-stone-900 underline">
              How to Write a Booking.com Property Description That Converts
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
