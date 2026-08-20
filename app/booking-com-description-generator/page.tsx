import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking.com Description Generator (Free) | HostCopy AI",
  description:
    "Generate a professional Booking.com property description in seconds. Free AI tool built for how Booking.com guests actually scan listings — factual, structured, no signup required.",
  alternates: { canonical: "https://hostcopyai.com/booking-com-description-generator" },
  openGraph: {
    title: "Free Booking.com Description Generator",
    description:
      "AI-generated Booking.com property descriptions that match how Booking.com guests read listings — factual and scannable, not Airbnb-style storytelling.",
    url: "https://hostcopyai.com/booking-com-description-generator",
    siteName: "HostCopy AI",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this Booking.com description generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 3 free generations with no signup required. Every generation also includes an Airbnb version and an Instagram caption from the same details.",
      },
    },
    {
      "@type": "Question",
      name: "Why not just use the same description on Airbnb and Booking.com?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Booking.com guests tend to scan for concrete facts — bed count, distance to landmarks, exact amenities — rather than read a story. Airbnb's audience responds better to a warmer, narrative style. Reusing one description usually underperforms on at least one platform.",
      },
    },
    {
      "@type": "Question",
      name: "What information do I need to provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Property type, location, number of guests and bedrooms, amenities, and a tone. The generator uses these to write a structured, factual description suited to Booking.com's format.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work for other platforms too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every generation produces a Booking.com version, an Airbnb version, and an Instagram caption at the same time, from the same property details.",
      },
    },
  ],
};

export default function BookingComGeneratorPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-navy/60 hover:text-navy transition-colors">
          &larr; Back to HostCopy AI
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy mt-6 mb-4">
          Free Booking.com Description Generator
        </h1>
        <p className="text-lg text-navy/70 mb-8">
          Booking.com guests read listings differently than Airbnb guests — they scan for facts,
          not a story. This tool generates a description written specifically for that, from the
          same property details you&apos;d use anywhere else.
        </p>
        <Link
          href="/#pricing"
          className="inline-block bg-navy text-parchment rounded-lg px-6 py-3 font-medium hover:bg-navy-light transition-colors mb-12"
        >
          Try it free — 3 generations, no signup
        </Link>
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-navy mb-4">
            Why Booking.com needs a different description than Airbnb
          </h2>
          <p className="text-navy/80 mb-3">
            Airbnb rewards warm, story-driven copy — guests are often browsing for an experience.
            Booking.com guests, by contrast, are frequently comparing hotels and rentals
            side-by-side on the same trip, and they scan for hard facts: bed count, distance to
            the airport or old town, whether parking is included, exact amenities.
          </p>
          <p className="text-navy/80">
            A description written for Airbnb and reused on Booking.com often reads as vague to
            that audience — long on atmosphere, short on the specifics guests are actually
            comparing. HostCopy AI generates a separate, factual, structured version for
            Booking.com specifically, alongside the Airbnb and Instagram versions, from one form.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-navy mb-4">
            Example output
          </h2>
          <p className="text-sm text-navy/50 mb-4">
            Generated from: Apartment · Vilnius Old Town · 2 guests · 1 bedroom · WiFi, Kitchen,
            Balcony · Cozy &amp; Homey tone
          </p>
          <div className="bg-parchment rounded-2xl border border-brass/20 p-6">
            <p className="text-ink whitespace-pre-wrap leading-relaxed">
              Cozy 1-bedroom apartment in central Vilnius, ideal for up to 2 guests. Features a
              comfortable bed, fully equipped kitchen, and a private balcony. Guests enjoy
              complimentary WiFi throughout the stay. The property includes fresh linens and
              towels. Located within walking distance of Old Town attractions, restaurants, and
              public transport. Self-service check-in available. House rules: no smoking, no
              parties, maximum 2 occupants. Suited to couples or solo travelers seeking a
              comfortable, well-located stay.
            </p>
          </div>
          <p className="text-sm text-navy/50 mt-3">
            Note: this is a real example output from the tool, not a paid placement or
            testimonial — try it with your own property details above.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-navy mb-4">
            What the generator uses
          </h2>
          <ul className="space-y-2 text-navy/80">
            <li className="flex gap-2"><span className="text-teal">•</span> Property type (apartment, house, villa, cabin, loft, studio)</li>
            <li className="flex gap-2"><span className="text-teal">•</span> Location</li>
            <li className="flex gap-2"><span className="text-teal">•</span> Guests and bedrooms</li>
            <li className="flex gap-2"><span className="text-teal">•</span> Amenities (WiFi, pool, kitchen, parking, and more)</li>
            <li className="flex gap-2"><span className="text-teal">•</span> Tone (cozy, luxury, family-friendly, business traveler, minimalist)</li>
          </ul>
        </section>
        <section className="mb-4">
          <h2 className="font-display text-2xl font-semibold text-navy mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                Is this Booking.com description generator free?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Yes. You get 3 free generations with no signup required. Every generation also
                includes an Airbnb version and an Instagram caption from the same details.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                Why not just use the same description on Airbnb and Booking.com?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Booking.com guests tend to scan for concrete facts — bed count, distance to
                landmarks, exact amenities — rather than read a story. Airbnb&apos;s audience
                responds better to a warmer, narrative style. Reusing one description usually
                underperforms on at least one platform.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                What information do I need to provide?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Property type, location, number of guests and bedrooms, amenities, and a tone.
                The generator uses these to write a structured, factual description suited to
                Booking.com&apos;s format.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                Does it work for other platforms too?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Yes — every generation produces a Booking.com version, an Airbnb version, and an
                Instagram caption at the same time, from the same property details.
              </p>
            </details>
          </div>
        </section>
        <div className="mt-10 text-center">
          <Link
            href="/#pricing"
            className="inline-block bg-brass text-white rounded-lg px-6 py-3 font-medium hover:bg-brass-dark transition-colors"
          >
            Generate your Booking.com description free
          </Link>
        </div>
      </div>
    </main>
  );
}
