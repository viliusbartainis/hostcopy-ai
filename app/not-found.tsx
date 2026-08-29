import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | HostCopy AI",
  description: "This page doesn't exist. Head back to HostCopy AI or browse the blog.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center py-16">
        <p className="font-display text-6xl font-semibold text-navy mb-4">404</p>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-4">
          This page doesn&apos;t exist
        </h1>
        <p className="text-navy/70 mb-8">
          The page you&apos;re looking for may have been moved or never existed.
          Here are a couple of places to go instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-brass text-white rounded-lg px-6 py-3 font-medium hover:bg-brass-dark transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/blog"
            className="inline-block bg-white border border-navy/15 text-navy rounded-lg px-6 py-3 font-medium hover:bg-parchment transition-colors"
          >
            Browse the blog
          </Link>
        </div>
      </div>
    </main>
  );
}
