'use client';

import { useState, useEffect } from 'react';

const AMENITIES = [
  'WiFi', 'Pool', 'Kitchen', 'Parking', 'Pet-friendly',
  'Balcony', 'Hot tub', 'Workspace', 'Air conditioning',
];

const FREE_LIMIT = 3;
const STORAGE_KEY = 'hostcopy_uses_used';
const PRO_KEY = 'hostcopy_pro';

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — you get 3 free generations with no signup required. Pro unlocks unlimited use for 9 EUR/month.",
      },
    },
    {
      "@type": "Question",
      name: "Why three different versions instead of one description?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Airbnb guests read stories, Booking.com guests scan facts, and Instagram needs a short caption. HostCopy AI writes each one for how that platform's guests actually read.",
      },
    },
    {
      "@type": "Question",
      name: "Do you store my listing information?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — your inputs are only used to generate the description and are not saved or shared.",
      },
    },
    {
      "@type": "Question",
      name: "Which platforms does it support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Currently Airbnb, Booking.com, and Instagram captions — all generated from one form.",
      },
    },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HostCopy AI",
  url: "https://hostcopy-ai.vercel.app",
};

function readInitialState() {
  if (typeof window === 'undefined') {
    return { pro: false, used: 0 };
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === 'true') {
    localStorage.setItem(PRO_KEY, 'true');
    window.history.replaceState({}, '', '/');
  }
  return {
    pro: localStorage.getItem(PRO_KEY) === 'true',
    used: Number(localStorage.getItem(STORAGE_KEY) || '0'),
  };
}

export default function Home() {
  const [propertyType, setPropertyType] = useState('Apartment');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedrooms] = useState(1);
  const [tone, setTone] = useState('Cozy & Homey');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [results, setResults] = useState<{ airbnb: string; booking: string; instagram: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'airbnb' | 'booking' | 'instagram'>('airbnb');
  const [loading, setLoading] = useState(false);
  const [usesUsed, setUsesUsed] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const initial = readInitialState();
    setIsPro(initial.pro);
    setUsesUsed(initial.used);
    setHydrated(true);
  }, []);

  const freeUsesLeft = FREE_LIMIT - usesUsed;
  const limitReached = !isPro && freeUsesLeft <= 0;

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || 'Unknown error — no URL returned');
      }
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleGenerate = async () => {
    setError('');
    if (limitReached) {
      return;
    }
    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }
    if (guests < 1 || bedrooms < 0) {
      setError('Please enter valid guest and bedroom numbers.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyType, location, amenities, guests, bedrooms, tone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setResults({ airbnb: data.airbnb, booking: data.booking, instagram: data.instagram });
      setActiveTab('airbnb');
      if (!isPro) {
        const newUsed = usesUsed + 1;
        setUsesUsed(newUsed);
        localStorage.setItem(STORAGE_KEY, String(newUsed));
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const genLabel = loading
    ? 'Writing your listings...'
    : isPro
      ? 'Generate Description'
      : `Generate Description (${Math.max(freeUsesLeft, 0)} free left)`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <main className="min-h-screen bg-stone-50">
        <header className="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#hg)" />
              <path d="M8 17L16 10L24 17V23C24 23.55 23.55 24 23 24H19V19H13V24H9C8.45 24 8 23.55 8 23V17Z" fill="white" />
              <circle cx="24" cy="9" r="2.5" fill="#FDE68A" />
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EA580C" />
                  <stop offset="1" stopColor="#B45309" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-serif font-semibold text-stone-900 text-lg">HostCopy AI</span>
          </div>
          {hydrated && isPro ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-100 border border-amber-200 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pro active
            </span>
          ) : (
            <a
              href="#pricing"
              className="text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-full px-4 py-2 transition-colors"
            >
              Buy Premium
            </a>
          )}
        </header>

        <section className="max-w-3xl mx-auto px-6 pt-12 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
            Write Your Airbnb, Booking.com and Instagram Listings in One Go
          </h1>
          <p className="text-lg text-stone-600 mb-8">
            One form, three ready-to-paste listings: Airbnb, Booking.com, and an Instagram caption —
            each written for how that platform&apos;s guests actually search and scroll.
          </p>
          <p className="text-sm text-stone-500">Built by a working Airbnb host in Vilnius.</p>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <div className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Property type</label>
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2">
                  {['Apartment', 'House', 'Villa', 'Cabin', 'Loft', 'Studio'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Vilnius Old Town"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Guests</label>
                  <input type="number" value={guests} min={1}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Bedrooms</label>
                  <input type="number" value={bedrooms} min={0}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => (
                    <button key={a} type="button" onClick={() => toggleAmenity(a)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        amenities.includes(a)
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                      }`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2">
                  {['Luxury', 'Cozy & Homey', 'Family-friendly', 'Business Traveler', 'Minimalist'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button onClick={handleGenerate} disabled={loading || !hydrated || limitReached}
                className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors">
                {genLabel}
              </button>

              {hydrated && limitReached && (
                <div className="p-5 bg-amber-50 border-2 border-amber-300 rounded-xl text-center">
                  <p className="font-serif font-semibold text-stone-900 mb-1">You&apos;ve used your 3 free generations</p>
                  <p className="text-sm text-stone-600 mb-4">Upgrade to Pro for unlimited listings — all three platforms, every property, no limits.</p>
                  <button
                    type="button"
                    disabled={checkoutLoading}
                    onClick={handleCheckout}
                    className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors"
                  >
                    {checkoutLoading ? 'Redirecting...' : 'Upgrade to Pro — €9/month'}
                  </button>
                  {checkoutError && (
                    <p className="text-xs text-red-600 mt-2">Error: {checkoutError}</p>
                  )}
                </div>
              )}
            </div>

            {results && (
              <div className="mt-6">
                <div className="flex gap-1 border-b border-stone-200">
                  {([
                    { key: 'airbnb', label: 'Airbnb' },
                    { key: 'booking', label: 'Booking.com' },
                    { key: 'instagram', label: 'Instagram' },
                  ] as const).map((t) => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                        activeTab === t.key
                          ? 'bg-stone-50 border border-stone-200 border-b-white text-stone-900 -mb-px'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="p-5 bg-stone-50 border border-stone-200 rounded-b-xl rounded-tr-xl">
                  <p className="text-stone-800 whitespace-pre-wrap leading-relaxed">{results[activeTab]}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(results[activeTab]);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="mt-4 text-sm font-medium text-stone-900 underline">
                    {copied ? 'Copied!' : 'Copy to clipboard'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="pricing" className="max-w-5xl mx-auto px-6 pb-20 scroll-mt-8">
          <div className="text-center mb-3">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-orange-600 mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-3">
              Built for every kind of host
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Start free, upgrade when it pays for itself. Every plan writes all three platform versions from one form.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-10 items-stretch">
            <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-7">
              <p className="font-serif text-lg text-stone-900">Free</p>
              <p className="text-sm text-stone-500 mb-5">For trying it out</p>
              <p className="mb-6">
                <span className="font-serif text-4xl font-semibold text-stone-900">€0</span>
              </p>
              <ul className="space-y-3 text-sm text-stone-700 mb-7 flex-1">
                <li className="flex gap-2"><span className="text-orange-600">✓</span> 3 generations total</li>
                <li className="flex gap-2"><span className="text-orange-600">✓</span> All three platforms</li>
                <li className="flex gap-2"><span className="text-orange-600">✓</span> No signup required</li>
              </ul>
              <a href="#" className="block text-center rounded-lg border border-stone-300 py-2.5 text-sm font-medium text-stone-900 hover:border-stone-400 transition-colors">
                Start free
              </a>
            </div>

            <div className="relative flex flex-col rounded-2xl border-2 border-stone-900 bg-stone-900 p-7 shadow-xl md:-mt-4 md:mb-4">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Most popular
              </span>
              <p className="font-serif text-lg text-white">Pro</p>
              <p className="text-sm text-stone-400 mb-5">For active hosts</p>
              <p className="mb-6">
                <span className="font-serif text-4xl font-semibold text-white">€9</span>
                <span className="text-stone-400 text-sm">/month</span>
              </p>
              <ul className="space-y-3 text-sm text-stone-200 mb-7 flex-1">
                <li className="flex gap-2"><span className="text-orange-400">✓</span> Unlimited generations</li>
                <li className="flex gap-2"><span className="text-orange-400">✓</span> All three platforms</li>
                <li className="flex gap-2"><span className="text-orange-400">✓</span> Priority faster generation</li>
                <li className="flex gap-2"><span className="text-orange-400">✓</span> Save &amp; re-edit descriptions</li>
              </ul>
              <button
                type="button"
                disabled={checkoutLoading}
                onClick={handleCheckout}
                className="block w-full text-center rounded-lg bg-white py-2.5 text-sm font-semibold text-stone-900 hover:bg-stone-100 disabled:opacity-50 transition-colors"
              >
                {checkoutLoading ? 'Redirecting...' : 'Upgrade to Pro'}
              </button>
              {checkoutError && (
                <p className="text-xs text-red-300 mt-2 text-center">Error: {checkoutError}</p>
              )}
            </div>

            <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-7">
              <p className="font-serif text-lg text-stone-900">Premium</p>
              <p className="text-sm text-stone-500 mb-5">For property managers</p>
              <p className="mb-6">
                <span className="font-serif text-4xl font-semibold text-stone-900">€29</span>
                <span className="text-stone-500 text-sm">/month</span>
              </p>
              <ul className="space-y-3 text-sm text-stone-700 mb-7 flex-1">
                <li className="flex gap-2"><span className="text-orange-600">✓</span> Everything in Pro</li>
                <li className="flex gap-2"><span className="text-orange-600">✓</span> AI property walkthrough from photos</li>
                <li className="flex gap-2"><span className="text-orange-600">✓</span> Bulk generation for multiple listings</li>
                <li className="flex gap-2"><span className="text-orange-600">✓</span> Priority support</li>
              </ul>
              <a href="mailto:vilius.bartainis67@gmail.com?subject=HostCopy%20AI%20Premium"
                className="block text-center rounded-lg border border-stone-300 py-2.5 text-sm font-medium text-stone-900 hover:border-stone-400 transition-colors">
                Contact for early access
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-stone-400 mt-6">
            Prices in EUR. Cancel anytime. Premium features roll out to early-access users first.
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-serif font-semibold text-stone-900 mb-6 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-xl border border-stone-200 p-5">
              <summary className="font-medium text-stone-900 cursor-pointer">Is it really free?</summary>
              <p className="text-stone-600 mt-2 text-sm">Yes — you get 3 free generations with no signup required. Pro unlocks unlimited use for €9/month.</p>
            </details>
            <details className="bg-white rounded-xl border border-stone-200 p-5">
              <summary className="font-medium text-stone-900 cursor-pointer">Why three different versions instead of one description?</summary>
              <p className="text-stone-600 mt-2 text-sm">Airbnb guests read stories, Booking.com guests scan facts, and Instagram needs a short caption. HostCopy AI writes each one for how that platform&apos;s guests actually read.</p>
            </details>
            <details className="bg-white rounded-xl border border-stone-200 p-5">
              <summary className="font-medium text-stone-900 cursor-pointer">What does the Premium plan add?</summary>
              <p className="text-stone-600 mt-2 text-sm">Premium adds an AI property walkthrough — upload photos or a link and it drafts a room-by-room tour — plus bulk generation for managing multiple listings at once.</p>
            </details>
            <details className="bg-white rounded-xl border border-stone-200 p-5">
              <summary className="font-medium text-stone-900 cursor-pointer">Do you store my listing information?</summary>
              <p className="text-stone-600 mt-2 text-sm">No — your inputs are only used to generate the description and are not saved or shared.</p>
            </details>
          </div>
        </section>

        <footer className="max-w-2xl mx-auto px-6 pb-16 text-center">
          <a href="/blog" className="text-sm text-stone-500 hover:text-stone-800 underline">
            Read our Airbnb hosting guides →
          </a>
          <p className="text-xs text-stone-400 mt-4">
            We don&apos;t store your listing data. Questions?{' '}
            <a href="mailto:vilius.bartainis67@gmail.com" className="underline">
              vilius.bartainis67@gmail.com
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
