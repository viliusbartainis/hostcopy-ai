import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Airbnb Title Generator (Free) | HostCopy AI",
  description:
    "Generate an Airbnb listing title that gets clicks in seconds. Free AI tool built for how Airbnb search actually ranks and displays titles — no signup required.",
  alternates: { canonical: "https://hostcopyai.com/airbnb-title-generator" },
  openGraph: {
    title: "Free Airbnb Title Generator",
    description:
      "AI-generated Airbnb listing titles that fit Airbnb's title length and the words guests actually search for, not generic filler.",
    url: "https://hostcopyai.com/airbnb-title-generator",
    siteName: "HostCopy AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Airbnb Title Generator",
    description:
      "AI-generated Airbnb listing titles that fit Airbnb's title length and the words guests actually search for, not generic filler.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this Airbnb title generator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You get 3 free generations with no signup required. Every generation also includes a full Airbnb description, a Booking.com description, and an Instagram caption from the same details.",
      },
    },
    {
      "@type": "Question",
      name: "How long should an Airbnb title be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Airbnb titles are capped at 50 characters and get cut off on mobile search results well before that, so the most important words need to come first.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good Airbnb title?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A strong title leads with the property type and location, then adds one specific, differentiating detail — a view, a standout amenity, or proximity to something guests search for — instead of generic words like \"cozy\" or \"amazing.\"",
      },
    },
    {
      "@type": "Question",
      name: "What information do I need to provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Property type, location, number of guests and bedrooms, amenities, and a tone. The generator uses these to write a title within Airbnb's length limit that leads with what matters most.",
      },
    },
  ],
};

export default function AirbnbTitleGeneratorPage() {
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
          Free Airbnb Title Generator
        </h1>
        <p className="text-lg text-navy/70 mb-8">
          Airbnb titles are capped at 50 characters and get cut off on mobile well
          before that. This tool generates a title that leads with what actually
          matters, from the same property details you&apos;d use anywhere else.
        </p>
        <Link
          href="/#pricing"
          className="inline-block bg-navy text-parchment rounded-lg px-6 py-3 font-medium hover:bg-navy-light transition-colors mb-12"
        >
          Try it free — 3 generations, no signup
        </Link>
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-navy mb-4">
            Why most Airbnb titles waste their character limit
          </h2>
          <p className="text-navy/80 mb-3">
            Airbnb search results only show the first part of a title before it
            truncates, especially on mobile, where most searches happen. Titles
            that open with filler like &quot;Amazing cozy stay!&quot; burn the
            characters that matter most before the guest ever sees the property
            type, location, or the one detail that would make them tap in.
          </p>
          <p className="text-navy/80">
            A title that leads with property type, location, and a specific,
            differentiating detail — a view, a standout amenity, walking distance
            to something guests search for — gets read even when it&apos;s cut
            off, because the important words come first. HostCopy AI generates a
            title structured that way, alongside your Airbnb description,
            Booking.com description, and Instagram caption, from one form.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-navy mb-4">
            Example output
          </h2>
          <p className="text-sm text-navy/50 mb-4">
            Generated from: Apartment · Vilnius Old Town · 2 guests · 1 bedroom ·
            WiFi, Kitchen, Balcony · Cozy &amp; Homey tone
          </p>
          <div className="bg-parchment rounded-2xl border border-brass/20 p-6">
            <p className="text-ink leading-relaxed">
              Sunny 1BR Apartment with Balcony, Steps from Old Town
            </p>
          </div>
          <p className="text-sm text-navy/50 mt-3">
            Note: this is a real example output from the tool, not a paid
            placement or testimonial — try it with your own property details
            above.
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
                Is this Airbnb title generator free?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Yes. You get 3 free generations with no signup required. Every
                generation also includes a full Airbnb description, a Booking.com
                description, and an Instagram caption from the same details.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                How long should an Airbnb title be?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Airbnb titles are capped at 50 characters and get cut off on
                mobile search results well before that, so the most important
                words need to come first.
              </p>
            </details>
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                What makes a good Airbnb title?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                A strong title leads with the property type and location, then
                adds one specific, differentiating detail — a view, a standout
                amenity, or proximity to something guests search for — instead of
                generic words like &quot;cozy&quot; or &quot;amazing.&quot;
              </p>
            </details>
            <details className="bg-white rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">
                What information do I need to provide?
              </summary>
              <p className="text-navy/60 mt-2 text-sm">
                Property type, location, number of guests and bedrooms,
                amenities, and a tone. The generator uses these to write a title
                within Airbnb&apos;s length limit that leads with what matters
                most.
              </p>
            </details>
          </div>
        </section>
        <div className="mt-10 text-center">
          <Link
            href="/#pricing"
            className="inline-block bg-brass text-white rounded-lg px-6 py-3 font-medium hover:bg-brass-dark transition-colors"
          >
            Generate your Airbnb title free
          </Link>
        </div>
      </div>
    </main>
  );
}
