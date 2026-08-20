import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | HostCopy AI",
  description: "Practical, honest guides for Airbnb and short-term rental hosts: pricing, photography, reviews, SEO, taxes, and more.",
};

const posts = [
  {
    slug: "airbnb-listing-description-guide",
    title: "How to Write an Airbnb Listing Description That Books",
    description: "Most Airbnb descriptions sound the same. Here's the exact structure that gets guests to click Book — plus real examples for Airbnb, Booking.com, and Instagram.",
  },
  {
    slug: "airbnb-photography-tips",
    title: "Airbnb Photos That Get You Booked: A Host's Guide",
    description: "Natural light vs. flash, angles that sell space, and how many photos you actually need. A practical guide to Airbnb photography that gets clicks.",
  },
  {
    slug: "airbnb-pricing-strategy",
    title: "How to Price Your Airbnb Listing: A Beginner's Guide to Dynamic Pricing",
    description: "Seasonality, weekends vs. weekdays, competitor analysis, and minimum stay tricks that actually move your Airbnb revenue. A practical pricing guide.",
  },
  {
    slug: "airbnb-seo-search-ranking",
    title: "SEO for Airbnb: How to Rank Higher in Airbnb Search Results",
    description: "How Airbnb's search ranking actually works: response rate, Instant Book, occupancy, and how photos, reviews, and amenities feed into your position.",
  },
  {
    slug: "airbnb-startup-cost",
    title: "How Much Does It Cost to Start an Airbnb Business?",
    description: "Initial setup costs, recurring expenses, and realistic profit ranges by city size, so you can budget an Airbnb listing with real numbers, not guesses.",
  },
  {
    slug: "airbnb-vs-booking-vs-vrbo",
    title: "Airbnb vs Booking.com vs Vrbo: Where Should You List Your Property?",
    description: "Audience, commission fees, and description tone compared across Airbnb, Booking.com, and Vrbo, plus when it actually pays to list on more than one.",
  },
  {
    slug: "best-airbnb-amenities-2026",
    title: "Airbnb Amenities Guests Actually Care About in 2026",
    description: "A real workspace, tested WiFi speed, self check-in, and the small details that bring guests back. What amenities are actually worth it in 2026.",
  },
  {
    slug: "dealing-with-difficult-airbnb-guests",
    title: "How to Handle Difficult Airbnb Guests (Without Losing Your Cool)",
    description: "Calm communication, when to escalate to Airbnb Support, how to document problems, and boundaries worth setting before a difficult guest ever books.",
  },
  {
    slug: "how-to-get-airbnb-5-star-reviews",
    title: "5-Star Reviews: How to Get Airbnb Guests to Leave Glowing Feedback",
    description: "Check-in experience, communication timing, small surprises that get mentioned in reviews, and how to handle a negative one. A practical review guide.",
  },
  {
    slug: "new-airbnb-host-checklist",
    title: "The Ultimate Airbnb Host Checklist for New Listings",
    description: "Safety, keys, cleaning, listing settings, insurance basics, and the first-week mistakes new Airbnb hosts make. A practical checklist before you publish.",
  },
  {
    slug: "short-term-rental-tax-basics",
    title: "Short-Term Rental Tax Basics for New Hosts",
    description: "General patterns in how short-term rental income is taxed, what usually needs to be declared, and commonly deductible expenses. Not tax advice.",
  },
  {
    slug: "hostcopy-ai-vs-chatgpt",
    title: "HostCopy AI vs. ChatGPT for Airbnb Listings: What's the Real Difference?",
    description: "ChatGPT can write a solid Airbnb description too. Here's an honest look at what it takes to get there, and what HostCopy AI automates instead.",
  },
  {
    slug: "best-time-to-list-airbnb",
    title: "Best Time to List Your Airbnb Property",
    description: "When new listings should go live to build reviews and search ranking before peak season hits, and how to adjust if you can't pick your own timing.",
  },
  {
    slug: "airbnb-superhost-requirements",
    title: "Airbnb Superhost Requirements Explained (2026 Update)",
    description: "The four criteria Airbnb uses to award Superhost status, how often it's reviewed, and what the badge actually gets you as a host.",
  },
  {
    slug: "airbnb-house-rules-guide",
    title: "How to Write House Rules Guests Actually Read",
    description: "Why long house rules lists get skimmed past, what actually belongs in them, and how to phrase them so guests follow them without feeling scolded.",
  },
  {
        slug: "airbnb-instagram-marketing",
        title: "How to Promote Your Airbnb on Instagram: Captions, Hashtags, and Story Ideas",
        description: "What to actually post, a caption formula that works for vacation rentals, and a hashtag approach that doesn't waste your reach.",
  },
  {
        slug: "airbnb-title-that-gets-clicks",
        title: "How to Write an Airbnb Title That Gets Clicks",
        description: "The formula top Airbnb titles follow, real before/after examples, and the words quietly costing you clicks in search results.",
  },
  {
        slug: "booking-com-description-guide",
        title: "How to Write a Booking.com Property Description That Converts",
        description: "Booking.com guests search and skim differently than Airbnb guests. Here's how to structure a property description that matches how the platform actually works.",
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">&larr; Back to HostCopy AI</Link>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-10">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="text-xl font-display font-semibold text-stone-900 underline">
                {post.title}
              </Link>
              <p className="text-stone-600 mt-2 text-sm">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
