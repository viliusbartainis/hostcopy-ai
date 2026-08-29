import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | HostCopy AI",
  description: "HostCopy AI is a solo-built tool for Airbnb, Booking.com, and Instagram listing copy — here's who built it and why.",
  alternates: { canonical: "https://hostcopyai.com/about" },
  openGraph: {
    title: "About HostCopy AI",
    description: "A solo developer project built after researching what Airbnb, Booking.com, and Instagram audiences actually respond to — not a hosting company.",
    url: "https://hostcopyai.com/about",
    siteName: "HostCopy AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About HostCopy AI",
    description: "A solo developer project built after researching what Airbnb, Booking.com, and Instagram audiences actually respond to — not a hosting company.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-navy/60 hover:text-navy transition-colors">
          &larr; Back to HostCopy AI
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy mt-6 mb-8">
          About HostCopy AI
        </h1>
        <div className="prose prose-stone max-w-none text-navy/80 leading-relaxed space-y-5">
          <p>
            HostCopy AI is a solo-built side project, not a company with a team of
            hosting experts. I&apos;m not going to pretend otherwise — there&apos;s
            no &quot;founding team of Superhosts&quot; behind this, and I&apos;d
            rather you know that upfront than find out later.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-4">
            Why I built it
          </h2>
          <p>
            I noticed that a lot of hosts write one description and paste the same
            text on Airbnb, Booking.com, and Instagram, even though each of those
            audiences reads listings differently: Airbnb guests respond to warm,
            story-driven copy; Booking.com guests scan for hard facts they can
            compare across listings; Instagram needs a short caption, not a
            paragraph. Writing three separate, well-matched versions by hand takes
            real time, and doing it well requires understanding what each platform
            actually rewards.
          </p>
          <p>
            I didn&apos;t learn that by hosting properties myself. I learned it by
            reading how each platform&apos;s search and guest behavior actually
            works, studying real listings that convert well, and testing what kind
            of copy reads naturally to each audience. HostCopy AI is the tool that
            came out of that research — built to skip the prompt-writing and
            platform-switching, and generate all three versions from one form.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-4">
            What this is and isn&apos;t
          </h2>
          <p>
            It&apos;s a focused generator: you fill in property details, and it
            writes an Airbnb description, a Booking.com description, and an
            Instagram caption, each matched to how that platform&apos;s audience
            reads. It isn&apos;t a full property management platform, a pricing
            tool, or a substitute for photos and a well-set-up listing — those
            still matter more than any description ever will.
          </p>
          <h2 className="font-display text-xl font-semibold text-navy pt-4">
            Feedback is welcome
          </h2>
          <p>
            If something&apos;s wrong, missing, or could be better, I read every
            message.{" "}
            <a href="mailto:vilius.bartainis67@gmail.com" className="text-navy underline">
              vilius.bartainis67@gmail.com
            </a>
          </p>
        </div>
        <div className="mt-10 pt-8 border-t border-navy/10">
          <Link href="/" className="text-navy underline font-medium">
            Try HostCopy AI
          </Link>
          {" · "}
          <Link href="/blog" className="text-navy underline font-medium">
            Read the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
