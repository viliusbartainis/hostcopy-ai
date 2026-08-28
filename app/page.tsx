'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const PROPERTY_TYPES: { value: string; key: string }[] = [
  { value: 'Apartment', key: 'apartment' },
  { value: 'House', key: 'house' },
  { value: 'Villa', key: 'villa' },
  { value: 'Cabin', key: 'cabin' },
  { value: 'Loft', key: 'loft' },
  { value: 'Studio', key: 'studio' },
];

const AMENITIES: { value: string; key: string }[] = [
  { value: 'WiFi', key: 'wifi' },
  { value: 'Pool', key: 'pool' },
  { value: 'Kitchen', key: 'kitchen' },
  { value: 'Parking', key: 'parking' },
  { value: 'Pet-friendly', key: 'petFriendly' },
  { value: 'Balcony', key: 'balcony' },
  { value: 'Hot tub', key: 'hotTub' },
  { value: 'Workspace', key: 'workspace' },
  { value: 'Air conditioning', key: 'airConditioning' },
];

const TONES: { value: string; key: string }[] = [
  { value: 'Luxury', key: 'luxury' },
  { value: 'Cozy & Homey', key: 'cozy' },
  { value: 'Family-friendly', key: 'familyFriendly' },
  { value: 'Business Traveler', key: 'businessTraveler' },
  { value: 'Minimalist', key: 'minimalist' },
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
    {
      "@type": "Question",
      name: "Why use HostCopy AI instead of ChatGPT or another AI tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You technically could prompt ChatGPT yourself — the difference is HostCopy AI already has three separate, tuned prompts (Airbnb's warm/story tone, Booking.com's factual/scannable format, Instagram's short caption style) built in, so you get all three correctly formatted in one click instead of writing and adjusting three prompts yourself each time you list something.",
      },
    },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HostCopy AI",
  url: "https://hostcopyai.com",
};

function readInitialState() {
  if (typeof window === 'undefined') {
    return { pro: false, used: 0 };
  }
  return {
    pro: localStorage.getItem(PRO_KEY) === 'true',
    used: Number(localStorage.getItem(STORAGE_KEY) || '0'),
  };
}

export default function Home() {
  const tHeader = useTranslations('Header');
  const tHero = useTranslations('Hero');
  const tForm = useTranslations('Form');
  const tPropertyTypes = useTranslations('PropertyTypes');
  const tAmenities = useTranslations('Amenities');
  const tTones = useTranslations('Tones');
  const tErrors = useTranslations('Errors');
  const tGenerate = useTranslations('Generate');
  const tLimit = useTranslations('LimitReached');
  const tResults = useTranslations('Results');
  const tShowcase = useTranslations('Showcase');
  const tPricing = useTranslations('Pricing');
  const tFaq = useTranslations('Faq');
  const tFooter = useTranslations('Footer');

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

    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      const sessionId = params.get('session_id');
      if (sessionId) {
        fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.valid === true) {
              localStorage.setItem(PRO_KEY, 'true');
              setIsPro(true);
            }
          })
          .catch(() => {})
          .finally(() => {
            window.history.replaceState({}, '', '/');
          });
      } else {
        window.history.replaceState({}, '', '/');
      }
    }
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
        setCheckoutError(data.error || tErrors('checkoutUnknown'));
      }
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : tErrors('checkoutNetwork'));
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
      setError(tErrors('locationRequired'));
      return;
    }
    if (guests < 1 || bedrooms < 0) {
      setError(tErrors('invalidNumbers'));
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
        setError(data.error || tErrors('generic'));
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_failed', { reason: data.error || 'unknown' });
        }
        return;
      }
      setResults({ airbnb: data.airbnb, booking: data.booking, instagram: data.instagram });
      setActiveTab('airbnb');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_description', {
          is_pro: isPro,
          property_type: propertyType,
          tone,
        });
      }
      if (!isPro) {
        const newUsed = usesUsed + 1;
        setUsesUsed(newUsed);
        localStorage.setItem(STORAGE_KEY, String(newUsed));
      }
    } catch {
      setError(tErrors('generic'));
    } finally {
      setLoading(false);
    }
  };

  const genLabel = loading
    ? tGenerate('loading')
    : isPro
    ? tGenerate('default')
    : tGenerate('withFreeLeft', { count: Math.max(freeUsesLeft, 0) });

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
      <main className="min-h-screen bg-background">
        <div className="hero-gradient">
          <header className="max-w-5xl mx-auto px-6 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="10" fill="#3B2F26" />
                <text x="16" y="21.5" textAnchor="middle" fontFamily="Lora, serif" fontSize="13" fontWeight="600" fill="#FAF6EE">HC</text>
              </svg>
              <span className="font-display font-semibold text-navy text-lg">HostCopy AI</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/blog"
                className="text-sm font-medium text-navy/70 hover:text-navy transition-colors"
              >
                {tHeader('blog')}
              </a>
              <LanguageSwitcher />
              {hydrated && isPro ? (
                <div className="flex items-center gap-3">
                  <a
                    href="https://billing.stripe.com/p/login/5kQ00j6KIa888b53S09k400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-navy/70 hover:text-navy underline"
                  >
                    {tHeader('manageSubscription')}
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-300 rounded-full px-3 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {tHeader('proActive')}
                  </span>
                </div>
              ) : (
                <a
                  href="#pricing"
                  className="text-sm font-medium text-parchment bg-brass hover:bg-brass-dark rounded-full px-4 py-2 transition-colors"
                >
                  {tHeader('buyPremium')}
                </a>
              )}
            </div>
          </header>

          <section className="max-w-3xl mx-auto px-6 pt-14 pb-16 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy mb-4 leading-tight">
              {tHero('title')}
            </h1>
            <p className="text-lg text-navy/70 mb-8 max-w-xl mx-auto">
              {tHero('subtitle')}
            </p>
            <p className="font-mono text-xs tracking-wide uppercase text-navy/50">{tHero('builtBy')}</p>
          </section>
        </div>

        <section className="max-w-2xl mx-auto px-6 -mt-8 pb-16 relative">
          <div className="bg-parchment rounded-2xl shadow-lg shadow-navy/10 border border-brass/20 p-8">
            <div className="grid gap-5">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-navy/80 mb-1">{tForm('propertyTypeLabel')}</label>
                <select id="propertyType" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass">
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt.value} value={pt.value}>{tPropertyTypes(pt.key)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 mb-1">{tForm('locationLabel')}</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder={tForm('locationPlaceholder')}
                  className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-navy/80 mb-1">{tForm('guestsLabel')}</label>
                  <input id="guests" type="number" value={guests} min={1}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink font-mono focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass" />
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-navy/80 mb-1">{tForm('bedroomsLabel')}</label>
                  <input id="bedrooms" type="number" value={bedrooms} min={0}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink font-mono focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 mb-2">{tForm('amenitiesLabel')}</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => (
                    <button key={a.value} type="button" onClick={() => toggleAmenity(a.value)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        amenities.includes(a.value)
                          ? 'bg-navy text-parchment border-navy'
                          : 'bg-white text-navy/70 border-navy/20 hover:border-navy/40'
                      }`}>
                      {tAmenities(a.key)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 mb-1">{tForm('toneLabel')}</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)}
                  className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass">
                  {TONES.map((tn) => (
                    <option key={tn.value} value={tn.value}>{tTones(tn.key)}</option>
                  ))}
                </select>
              </div>
              {error && (
                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <button onClick={handleGenerate} disabled={loading || !hydrated || limitReached}
                className="w-full bg-brass text-white rounded-lg py-3 font-medium hover:bg-brass-dark disabled:opacity-50 transition-colors">
                {genLabel}
              </button>
              {hydrated && limitReached && (
                <div className="p-5 bg-lavender/50 border-2 border-brass/30 rounded-xl text-center">
                  <p className="font-display font-semibold text-navy mb-1">{tLimit('title', { limit: FREE_LIMIT })}</p>
                  <p className="text-sm text-navy/70 mb-4">{tLimit('description')}</p>
                  <button
                    type="button"
                    disabled={checkoutLoading}
                    onClick={handleCheckout}
                    className="w-full bg-brass text-white rounded-lg py-3 font-medium hover:bg-brass-dark disabled:opacity-50 transition-colors"
                  >
                    {checkoutLoading ? tLimit('redirecting') : tLimit('upgradeButton')}
                  </button>
                  {checkoutError && (
                    <p className="text-xs text-red-600 mt-2">{tErrors('errorPrefix', { message: checkoutError })}</p>
                  )}
                </div>
              )}
            </div>

            {results && (
              <div className="mt-6">
                <div className="flex gap-1">
                  {([
                    { key: 'airbnb', label: tResults('airbnb') },
                    { key: 'booking', label: tResults('booking') },
                    { key: 'instagram', label: tResults('instagram') },
                  ] as const).map((rt) => (
                    <button key={rt.key} onClick={() => setActiveTab(rt.key)}
                      className={`px-4 py-2 text-sm font-mono uppercase tracking-wide rounded-t-lg transition-colors ${
                        activeTab === rt.key
                          ? 'bg-parchment text-navy border border-navy/15 border-b-0'
                          : 'text-navy/40 hover:text-navy/70'
                      }`}>
                      {rt.label}
                    </button>
                  ))}
                </div>
                <div className="ticket-perforation p-5 bg-parchment border border-navy/15 border-t-0 rounded-b-xl rounded-tr-xl">
                  <p className="text-ink whitespace-pre-wrap leading-relaxed">{results[activeTab]}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(results[activeTab]);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="mt-4 text-sm font-medium text-teal underline">
                    {copied ? tResults('copied') : tResults('copy')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16">
          <div className="text-center mb-6">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-3">{tShowcase('eyebrow')}</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-3">
              {tShowcase('title')}
            </h2>
            <p className="text-navy/60 max-w-xl mx-auto">
              {tShowcase('subtitle')}
            </p>
          </div>
          <div className="bg-parchment rounded-2xl border border-navy/15 p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-wide text-navy/50">{tShowcase('label')}</span>
              <span className="font-mono text-xs uppercase tracking-wide text-navy/50">{tShowcase('propertyLabel')}</span>
            </div>
            <p className="text-ink leading-relaxed whitespace-pre-wrap">{tShowcase('text')}</p>
          </div>
        </section>

        <section id="pricing" className="max-w-5xl mx-auto px-6 pb-20 scroll-mt-8">
          <div className="text-center mb-3">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-teal mb-3">{tPricing('eyebrow')}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-3">
              {tPricing('title')}
            </h2>
            <p className="text-navy/60 max-w-xl mx-auto">
              {tPricing('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-10 items-stretch">
            <div className="flex flex-col rounded-2xl border border-navy/15 bg-parchment p-7">
              <p className="font-display text-lg text-navy">{tPricing('free.name')}</p>
              <p className="text-sm text-navy/50 mb-5">{tPricing('free.tagline')}</p>
              <p className="mb-6">
                <span className="font-display text-4xl font-semibold text-navy">{tPricing('free.price')}</span>
              </p>
              <ul className="space-y-3 text-sm text-navy/80 mb-7 flex-1">
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('free.feature1', { limit: FREE_LIMIT })}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('free.feature2')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('free.feature3')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('free.feature4')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('free.feature5')}</li>
              </ul>
              <a href="#" className="block text-center rounded-lg border border-navy/25 py-2.5 text-sm font-medium text-navy hover:border-navy/50 transition-colors">
                {tPricing('free.cta')}
              </a>
            </div>

            <div className="relative flex flex-col rounded-2xl border-2 border-navy bg-navy p-7 shadow-xl md:-mt-4 md:mb-4">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brass text-white text-xs font-medium px-3 py-1 rounded-full">
                {tPricing('pro.badge')}
              </span>
              <p className="font-display text-lg text-parchment">{tPricing('pro.name')}</p>
              <p className="text-sm text-parchment/60 mb-5">{tPricing('pro.tagline')}</p>
              <p className="mb-6">
                <span className="font-display text-4xl font-semibold text-parchment">{tPricing('pro.price')}</span>
                <span className="text-parchment/60 text-sm">{tPricing('pro.period')}</span>
              </p>
              <ul className="space-y-3 text-sm text-parchment/90 mb-7 flex-1">
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature1')}</li>
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature2')}</li>
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature3')}</li>
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature4')}</li>
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature5')}</li>
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature6')}</li>
                <li className="flex gap-2"><span className="text-brass">✓</span> {tPricing('pro.feature7')}</li>
              </ul>
              <button
                type="button"
                disabled={checkoutLoading}
                onClick={handleCheckout}
                className="block w-full text-center rounded-lg bg-brass py-2.5 text-sm font-semibold text-white hover:bg-brass-dark disabled:opacity-50 transition-colors"
              >
                {checkoutLoading ? tPricing('pro.redirecting') : tPricing('pro.cta')}
              </button>
              {checkoutError && (
                <p className="text-xs text-red-300 mt-2 text-center">{tErrors('errorPrefix', { message: checkoutError })}</p>
              )}
            </div>

            <div className="flex flex-col rounded-2xl border border-navy/15 bg-parchment p-7">
              <p className="font-display text-lg text-navy">{tPricing('premium.name')}</p>
              <p className="text-sm text-navy/50 mb-5">{tPricing('premium.tagline')}</p>
              <p className="mb-6">
                <span className="font-display text-4xl font-semibold text-navy">{tPricing('premium.price')}</span>
                <span className="text-navy/50 text-sm">{tPricing('premium.period')}</span>
              </p>
              <ul className="space-y-3 text-sm text-navy/80 mb-7 flex-1">
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('premium.feature1')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('premium.feature2')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('premium.feature3')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('premium.feature4')}</li>
                <li className="flex gap-2"><span className="text-teal">✓</span> {tPricing('premium.feature5')}</li>
              </ul>
              <a href="mailto:vilius.bartainis67@gmail.com?subject=HostCopy%20AI%20Premium"
                className="block text-center rounded-lg border border-navy/25 py-2.5 text-sm font-medium text-navy hover:border-navy/50 transition-colors">
                {tPricing('premium.cta')}
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-navy/40 mt-6">
            {tPricing('footnote')}
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-6 pb-16">
          <h2 className="font-display text-2xl font-semibold text-navy mb-6 text-center">
            {tFaq('title')}
          </h2>
          <div className="space-y-4">
            <details className="bg-parchment rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">{tFaq('q1')}</summary>
              <p className="text-navy/60 mt-2 text-sm">{tFaq('a1', { limit: FREE_LIMIT })}</p>
            </details>
            <details className="bg-parchment rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">{tFaq('q2')}</summary>
              <p className="text-navy/60 mt-2 text-sm">{tFaq('a2')}</p>
            </details>
            <details className="bg-parchment rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">{tFaq('q3')}</summary>
              <p className="text-navy/60 mt-2 text-sm">{tFaq('a3')}</p>
            </details>
            <details className="bg-parchment rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">{tFaq('q4')}</summary>
              <p className="text-navy/60 mt-2 text-sm">{tFaq('a4')}</p>
            </details>
            <details className="bg-parchment rounded-xl border border-navy/15 p-5">
              <summary className="font-medium text-navy cursor-pointer">{tFaq('q5')}</summary>
              <p className="text-navy/60 mt-2 text-sm">{tFaq('a5')}</p>
            </details>
          </div>
        </section>

        <footer className="max-w-2xl mx-auto px-6 pb-16 text-center">
          <a href="/blog" className="text-sm text-navy/60 hover:text-navy underline">
            {tFooter('blogLink')}
          </a>
          {' · '}
          <a href="/booking-com-description-generator" className="text-sm text-navy/60 hover:text-navy underline">
            Booking.com description generator
          </a>
          <p className="text-xs text-navy/40 mt-2">
            <a href="/privacy" className="underline hover:text-navy/70">
              Privacy Policy
            </a>
            {' · '}
            <a href="/terms" className="underline hover:text-navy/70">
              Terms of Service
            </a>
          </p>
          <p className="text-xs text-navy/40 mt-4">
            {tFooter('privacyNote')}{' '}
            <a href="mailto:vilius.bartainis67@gmail.com" className="underline">
              vilius.bartainis67@gmail.com
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
