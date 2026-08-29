import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Write House Rules Guests Actually Read | HostCopy AI",
  description: "Why long house rules lists get skimmed past, what actually belongs in them, and how to phrase them so guests follow them without feeling scolded.",
  keywords: "airbnb house rules examples, how to write house rules, airbnb guest rules",
  alternates: { canonical: 'https://hostcopyai.com/blog/airbnb-house-rules-guide' },
  openGraph: {
    type: "article",
    title: "How to Write House Rules Guests Actually Read",
    description: "Most Airbnb house rules sections are long enough that guests stop reading after the third bullet point.",
    publishedTime: "2026-08-04",
    modifiedTime: "2026-08-04",
    url: "https://hostcopyai.com/blog/airbnb-house-rules-guide",
  },
};

export default function BlogPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Write House Rules Guests Actually Read",
    description: "Why long house rules lists get skimmed past, what actually belongs in them, and how to phrase them so guests follow them without feeling scolded.",
    author: { "@type": "Organization", name: "HostCopy AI" },
    publisher: {
      "@type": "Organization",
      name: "HostCopy AI",
      logo: { "@type": "ImageObject", url: "https://hostcopyai.com/logo-512.png" },
    },
    datePublished: "2026-08-04",
    dateModified: "2026-08-04",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://hostcopyai.com/blog/airbnb-house-rules-guide",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://hostcopyai.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://hostcopyai.com/blog" },
      { "@type": "ListItem", position: 3, name: "How to Write House Rules Guests Actually Read", item: "https://hostcopyai.com/blog/airbnb-house-rules-guide" },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">&larr; Back to HostCopy AI</Link>
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-stone-900 mt-4 mb-6">
          How to Write House Rules Guests Actually Read
        </h1>
        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-5">
          <p>Most Airbnb house rules sections are long enough that guests stop reading after the third bullet point. That defeats the purpose — rules only work if someone actually sees them before they cause a problem, not after.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Why long lists get skipped</h2>
          <p>Once a rules list passes eight or nine items, most guests start skimming instead of reading, especially if several items feel like common sense (&quot;no smoking indoors,&quot; &quot;take out the trash&quot;). The rules that actually matter to you — quiet hours, guest caps, parking — end up buried in the same list as the obvious ones and get missed just as easily.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">What actually needs to be in the listing rules</h2>
          <p>Keep the visible house rules field to the handful of things that would genuinely cause a problem if broken: quiet hours, maximum guest count, whether smoking, pets, or parties are allowed, and checkout time. If your building or neighborhood has a specific issue — strict noise complaints, limited parking, an elevator that&apos;s out of service after a certain hour — that belongs here too, since it directly affects whether someone should book.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Explain the reason, not just the rule</h2>
          <p>&quot;Quiet hours after 10pm&quot; gets followed more often when it&apos;s &quot;Quiet hours after 10pm — the building manages noise complaints strictly and a complaint can affect future guests staying here too.&quot; Guests generally aren&apos;t trying to be difficult; a short reason turns a rule into something they understand rather than something they resent.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Put logistics somewhere else entirely</h2>
          <p>WiFi passwords, appliance instructions, parking codes, and trash pickup days aren&apos;t house rules — they&apos;re information guests need at a specific moment, not before booking. Put these in your check-in guide or a welcome message sent after booking instead of the public rules field. It keeps the rules section short and means guests actually get the logistics when they need them, not buried in a list they skimmed three weeks earlier.</p>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">A reasonable starting set</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Quiet hours: 10pm-8am</li>
            <li>Max {'{X}'} guests, no unregistered visitors overnight</li>
            <li>No smoking indoors</li>
            <li>No parties or events</li>
            <li>Checkout by 11am so we can prepare for the next guest</li>
          </ul>
          <h2 className="text-xl font-display font-semibold text-stone-900 pt-4">Enforcing rules without damaging the relationship</h2>
          <p>Mention the rule once, politely, as soon as you notice it being pushed — most guests fix the behavior immediately once they realize it matters. Save documentation and a firmer message for repeat issues or anything that affects safety or other guests. Rules exist to prevent problems, not to give you something to police over minor, harmless things.</p>
        </div>
        <div className="mt-10 pt-8 border-t border-stone-200">
          <p className="text-sm font-medium text-stone-500 mb-3">Related guides</p>
          <div className="space-y-2">
            <Link href="/blog/dealing-with-difficult-airbnb-guests" className="block text-stone-900 underline">
              How to Handle Difficult Airbnb Guests (Without Losing Your Cool)
            </Link>
            <Link href="/blog/new-airbnb-host-checklist" className="block text-stone-900 underline">
              The Ultimate Airbnb Host Checklist for New Listings
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
