'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import HeroIllustration from '@/components/HeroIllustration';
import CheckIcon from '@/components/CheckIcon';
import ErrorBoundary from '@/components/ErrorBoundary';

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

const QUICK_TEMPLATES: { key: string; propertyType: string; amenities: string[]; tone: string }[] = [
  { key: 'beachApartment', propertyType: 'Apartment', amenities: ['Pool', 'WiFi', 'Balcony', 'Air conditioning'], tone: 'Cozy & Homey' },
  { key: 'cityStudio', propertyType: 'Studio', amenities: ['WiFi', 'Workspace', 'Kitchen'], tone: 'Minimalist' },
  { key: 'familyHouse', propertyType: 'House', amenities: ['Kitchen', 'Parking', 'Pet-friendly', 'Air conditioning'], tone: 'Family-friendly' },
  { key: 'businessLoft', propertyType: 'Loft', amenities: ['WiFi', 'Workspace', 'Parking'], tone: 'Business Traveler' },
];

const FREE_LIMIT = 3;
const STORAGE_KEY = 'hostcopy_uses_used';
const PRO_KEY = 'hostcopy_pro';
const FORM_STORAGE_KEY = 'hostcopy_form_state';
const HISTORY_KEY = 'hostcopy_history';
const HISTORY_LIMIT = 5;
const ONBOARDING_SEEN_KEY = 'hostcopy_onboarding_seen';
const GENERATE_SEEN_KEY = 'hostcopy_generate_pulse_seen';
const MAX_GUESTS = 50;
const MAX_BEDROOMS = 20;

type GenerationResult = { airbnb: string; booking: string; instagram: string };
type HistoryEntry = {
  id: string;
  timestamp: number;
  propertyType: string;
  location: string;
  guests: number;
  bedrooms: number;
  amenities: string[];
  tone: string;
  results: GenerationResult;
};

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

type SavedFormState = {
  propertyType?: string;
  location?: string;
  guests?: number;
  bedrooms?: number;
  amenities?: string[];
  tone?: string;
};

function readSavedFormState(): SavedFormState | null {
  try {
    const raw = localStorage.getItem(FORM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
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
  const tTemplates = useTranslations('Templates');
  const tHistory = useTranslations('History');
  const tOnboarding = useTranslations('Onboarding');

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
  const [locationTouched, setLocationTouched] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [errorKind, setErrorKind] = useState<'validation' | 'network' | 'server' | 'ratelimit' | null>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [showToneTip, setShowToneTip] = useState(false);
  const [justGenerated, setJustGenerated] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const initial = readInitialState();
    setIsPro(initial.pro);
    setUsesUsed(initial.used);
    setHydrated(true);

    const saved = readSavedFormState();
    if (saved) {
      if (saved.propertyType) setPropertyType(saved.propertyType);
      if (saved.location) setLocation(saved.location);
      if (typeof saved.guests === 'number') setGuests(saved.guests);
      if (typeof saved.bedrooms === 'number') setBedrooms(saved.bedrooms);
      if (saved.amenities) setAmenities(saved.amenities);
      if (saved.tone) setTone(saved.tone);
    }
    setHistory(readHistory());
    setShowIntro(localStorage.getItem(ONBOARDING_SEEN_KEY) !== 'true');
    setHasInteracted(localStorage.getItem(GENERATE_SEEN_KEY) === 'true');

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

  useEffect(() => {
    if (!hydrated) return;
    const state: SavedFormState = { propertyType, location, guests, bedrooms, amenities, tone };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, propertyType, location, guests, bedrooms, amenities, tone]);

  useEffect(() => {
    if (!loading) return;
    const originalTitle = document.title;
    document.title = tGenerate('loading');
    return () => {
      document.title = originalTitle;
    };
  }, [loading, tGenerate]);

  useEffect(() => {
    if (!justGenerated) return;
    const t = setTimeout(() => setJustGenerated(false), 1600);
    return () => clearTimeout(t);
  }, [justGenerated]);

  const freeUsesLeft = FREE_LIMIT - usesUsed;
  const limitReached = !isPro && freeUsesLeft <= 0;
  const formValid = location.trim() !== '' && guests >= 1 && bedrooms >= 0;
  const showGeneratePulse = hydrated && !hasInteracted && !limitReached && formValid;
  const selectedAmenitiesCount = amenities.length;

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const dismissIntro = () => {
    setShowIntro(false);
    localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
  };

  const adjustGuests = (delta: number) => {
    setGuests((prev) => Math.min(MAX_GUESTS, Math.max(1, prev + delta)));
  };

  const adjustBedrooms = (delta: number) => {
    setBedrooms((prev) => Math.min(MAX_BEDROOMS, Math.max(0, prev + delta)));
  };

  const applyTemplate = (template: (typeof QUICK_TEMPLATES)[number]) => {
    setPropertyType(template.propertyType);
    setAmenities(template.amenities);
    setTone(template.tone);
  };

  const loadHistoryEntry = (entry: HistoryEntry) => {
    setPropertyType(entry.propertyType);
    setLocation(entry.location);
    setGuests(entry.guests);
    setBedrooms(entry.bedrooms);
    setAmenities(entry.amenities);
    setTone(entry.tone);
    setResults(entry.results);
    setActiveTab('airbnb');
    setFeedbackGiven(null);
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
    setErrorKind(null);
    setHasInteracted(true);
    localStorage.setItem(GENERATE_SEEN_KEY, 'true');
    if (limitReached) {
      return;
    }
    if (!location.trim()) {
      setLocationTouched(true);
      return;
    }
    if (guests < 1 || bedrooms < 0) {
      setError(tErrors('invalidNumbers'));
      setErrorKind('validation');
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
        setErrorKind(res.status === 429 ? 'ratelimit' : 'server');
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_failed', { reason: data.error || 'unknown' });
        }
        return;
      }
      const newResults = { airbnb: data.airbnb, booking: data.booking, instagram: data.instagram };
      setResults(newResults);
      setActiveTab('airbnb');
      setFeedbackGiven(null);
      setJustGenerated(true);
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
      } else {
        const entry: HistoryEntry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          timestamp: Date.now(),
          propertyType,
          location,
          guests,
          bedrooms,
          amenities,
          tone,
          results: newResults,
        };
        const newHistory = [entry, ...history].slice(0, HISTORY_LIMIT);
        setHistory(newHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      }
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        resultsRef.current?.focus();
      });
    } catch (err) {
      setError(err instanceof TypeError ? tErrors('network') : tErrors('generic'));
      setErrorKind(err instanceof TypeError ? 'network' : 'server');
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
      <ErrorBoundary>
      <main className="min-h-screen bg-background">
        <header
          className={`sticky top-0 z-40 transition-shadow duration-200 ${
            scrolled ? 'bg-background/95 backdrop-blur-sm shadow-card' : 'bg-transparent'
          }`}
        >
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="10" fill="var(--color-navy)" />
                <text x="16" y="21.5" textAnchor="middle" fontFamily="Lora, serif" fontSize="13" fontWeight="600" fill="var(--background)">HC</text>
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
                  className="text-sm font-medium text-navy bg-brass hover:bg-brass-dark rounded-full px-4 py-2 transition-colors"
                >
                  {tHeader('buyPremium')}
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="hero-gradient">
          <section className="max-w-5xl mx-auto px-6 pt-14 pb-16">
            <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
              <div className="text-center md:text-left">
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy mb-4 leading-tight tracking-tight">
                  {tHero('title')}
                </h1>
                <p className="text-lg text-navy/70 mb-8 max-w-xl mx-auto md:mx-0">
                  {tHero('subtitle')}
                </p>
                <p className="font-mono text-xs tracking-wide uppercase text-navy/50">{tHero('builtBy')}</p>
              </div>
              <div className="hidden md:block" aria-hidden="true">
                <HeroIllustration />
              </div>
            </div>
          </section>
        </div>

        <section className="max-w-2xl mx-auto px-6 -mt-8 pb-16 relative">
          {showIntro && (
            <div className="mb-4 flex items-start gap-3 bg-teal/10 border border-teal/25 rounded-xl px-4 py-3">
              <p className="text-sm text-navy/80 flex-1">{tOnboarding('intro')}</p>
              <button
                type="button"
                onClick={dismissIntro}
                className="text-sm font-medium text-teal underline shrink-0"
              >
                {tOnboarding('dismiss')}
              </button>
            </div>
          )}
          <div className="mb-4">
            <p className="text-xs font-medium text-navy/70 mb-2">{tTemplates('title')}</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_TEMPLATES.map((template) => (
                <button key={template.key} type="button" onClick={() => applyTemplate(template)}
                  className="px-3.5 py-2 rounded-full text-sm border border-navy/20 bg-white text-navy/70 hover:border-navy/40 hover:text-navy transition-colors">
                  {tTemplates(template.key)}
                </button>
              ))}
            </div>
          </div>
          <div id="generator-form" className="bg-parchment rounded-2xl shadow-card-lg border border-brass/20 p-8 scroll-mt-24">
            <form className="grid gap-5" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-navy/80 mb-1">{tForm('propertyTypeLabel')}</label>
                <select id="propertyType" autoFocus value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass">
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt.value} value={pt.value}>{tPropertyTypes(pt.key)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-navy/80 mb-1">
                  {tForm('locationLabel')} <span className="text-brass-dark" aria-hidden="true">*</span>
                  <span className="sr-only"> {tForm('requiredIndicator')}</span>
                </label>
                <input id="location" value={location} onChange={(e) => setLocation(e.target.value)}
                  onBlur={() => setLocationTouched(true)}
                  aria-invalid={locationTouched && !location.trim()}
                  placeholder={tForm('locationPlaceholder')}
                  className={`w-full border rounded-lg px-3 py-2 text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brass/50 ${
                    locationTouched && !location.trim()
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-navy/20 focus:border-brass'
                  }`} />
                {locationTouched && !location.trim() && (
                  <p className="text-xs text-red-600 mt-1">{tErrors('locationRequired')}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-navy/80 mb-1">{tForm('guestsLabel')}</label>
                  <div className="flex items-stretch border border-navy/20 bg-white rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brass/50 focus-within:border-brass">
                    <button type="button" onClick={() => adjustGuests(-1)} disabled={guests <= 1} aria-label="Decrease guests"
                      className="px-3 text-navy/60 hover:text-navy hover:bg-parchment transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed">
                      −
                    </button>
                    <input id="guests" type="number" value={guests} min={1} max={MAX_GUESTS}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full min-w-0 text-center px-2 py-2 text-ink font-mono focus:outline-none" />
                    <button type="button" onClick={() => adjustGuests(1)} disabled={guests >= MAX_GUESTS} aria-label="Increase guests"
                      className="px-3 text-navy/60 hover:text-navy hover:bg-parchment transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed">
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-navy/80 mb-1">{tForm('bedroomsLabel')}</label>
                  <div className="flex items-stretch border border-navy/20 bg-white rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brass/50 focus-within:border-brass">
                    <button type="button" onClick={() => adjustBedrooms(-1)} disabled={bedrooms <= 0} aria-label="Decrease bedrooms"
                      className="px-3 text-navy/60 hover:text-navy hover:bg-parchment transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed">
                      −
                    </button>
                    <input id="bedrooms" type="number" value={bedrooms} min={0} max={MAX_BEDROOMS}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full min-w-0 text-center px-2 py-2 text-ink font-mono focus:outline-none" />
                    <button type="button" onClick={() => adjustBedrooms(1)} disabled={bedrooms >= MAX_BEDROOMS} aria-label="Increase bedrooms"
                      className="px-3 text-navy/60 hover:text-navy hover:bg-parchment transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed">
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy/80 mb-2">
                  {tForm('amenitiesLabel')}
                  {selectedAmenitiesCount > 0 && (
                    <span className="ml-1.5 font-normal text-navy/70">{tForm('amenitiesSelected', { count: selectedAmenitiesCount })}</span>
                  )}
                </label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => (
                    <button key={a.value} type="button" onClick={() => toggleAmenity(a.value)}
                      className={`px-3.5 py-2.5 rounded-full text-sm border transition-colors ${
                        amenities.includes(a.value)
                          ? 'bg-navy text-parchment border-navy'
                          : 'bg-white text-navy/70 border-navy/20 hover:border-navy/40'
                      }`}>
                      {tAmenities(a.key)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <label className="flex items-center gap-1.5 text-sm font-medium text-navy/80 mb-1">
                  {tForm('toneLabel')}
                  <button
                    type="button"
                    aria-label="What do the tones mean?"
                    aria-expanded={showToneTip}
                    onClick={() => setShowToneTip((v) => !v)}
                    onMouseEnter={() => setShowToneTip(true)}
                    onMouseLeave={() => setShowToneTip(false)}
                    className="w-4 h-4 rounded-full border border-navy/40 text-navy/60 text-[10px] leading-none flex items-center justify-center hover:border-navy/70 hover:text-navy/80"
                  >
                    ?
                  </button>
                </label>
                {showToneTip && (
                  <div role="tooltip" className="absolute z-10 -top-1 left-0 translate-y-[-100%] w-64 max-w-[80vw] text-xs text-parchment bg-navy rounded-lg px-3 py-2 shadow-card-lg">
                    {tForm('toneTooltip')}
                  </div>
                )}
                <select value={tone} onChange={(e) => setTone(e.target.value)}
                  className="w-full border border-navy/20 bg-white rounded-lg px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass">
                  {TONES.map((tn) => (
                    <option key={tn.value} value={tn.value}>{tTones(tn.key)}</option>
                  ))}
                </select>
              </div>
              {error && (
                <div className={`text-sm rounded-lg px-3 py-2 flex items-center justify-between gap-3 border ${
                  errorKind === 'validation' || errorKind === 'ratelimit'
                    ? 'text-amber-800 bg-amber-50 border-amber-200'
                    : 'text-red-700 bg-red-50 border-red-200'
                }`}>
                  <span>{error}</span>
                  {(errorKind === 'network' || errorKind === 'server') && (
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="link-underline font-medium shrink-0"
                    >
                      {tErrors('retry')}
                    </button>
                  )}
                </div>
              )}
              <button type="submit" disabled={loading || !hydrated || limitReached}
                className={`w-full bg-brass text-navy rounded-lg py-3 font-medium hover:bg-brass-dark disabled:opacity-50 transition-colors ${
                  showGeneratePulse ? 'animate-generate-pulse' : ''
                }`}>
                {genLabel}
              </button>
              <p className="text-xs text-navy/70 text-center -mt-2">
                {tForm('timeEstimate')} &middot; {tForm('privacyReassurance')}
              </p>
              {hydrated && limitReached && (
                <div className="p-5 bg-lavender/50 border-2 border-brass/30 rounded-xl text-center">
                  <p className="font-display font-semibold text-navy mb-1">{tLimit('title', { limit: FREE_LIMIT })}</p>
                  <p className="text-sm text-navy/70 mb-4">{tLimit('description')}</p>
                  <button
                    type="button"
                    disabled={checkoutLoading}
                    onClick={handleCheckout}
                    className="w-full bg-brass text-navy rounded-lg py-3 font-medium hover:bg-brass-dark disabled:opacity-50 transition-colors"
                  >
                    {checkoutLoading ? tLimit('redirecting') : tLimit('upgradeButton')}
                  </button>
                  {checkoutError && (
                    <p className="text-xs text-red-600 mt-2">{tErrors('errorPrefix', { message: checkoutError })}</p>
                  )}
                </div>
              )}
            </form>

            {loading && (
              <div className="mt-6 animate-pulse" aria-hidden="true">
                <div className="flex gap-1">
                  <div className="h-9 w-24 bg-navy/10 rounded-t-lg" />
                  <div className="h-9 w-24 bg-navy/5 rounded-t-lg" />
                  <div className="h-9 w-24 bg-navy/5 rounded-t-lg" />
                </div>
                <div className="p-5 bg-parchment border border-navy/15 border-t-0 rounded-b-xl rounded-tr-xl space-y-3">
                  <div className="h-4 bg-navy/10 rounded w-full" />
                  <div className="h-4 bg-navy/10 rounded w-11/12" />
                  <div className="h-4 bg-navy/10 rounded w-full" />
                  <div className="h-4 bg-navy/10 rounded w-4/5" />
                  <div className="h-4 bg-navy/10 rounded w-2/3" />
                </div>
              </div>
            )}
            {!loading && results && (
              <div
                ref={resultsRef}
                tabIndex={-1}
                role="region"
                aria-live="polite"
                aria-label="Generated listing descriptions"
                className="mt-6 outline-none"
              >
                <div className="flex gap-1" role="tablist" aria-label="Platform">
                  {([
                    { key: 'airbnb', label: tResults('airbnb') },
                    { key: 'booking', label: tResults('booking') },
                    { key: 'instagram', label: tResults('instagram') },
                  ] as const).map((rt) => (
                    <button key={rt.key} onClick={() => setActiveTab(rt.key)}
                      role="tab"
                      aria-selected={activeTab === rt.key}
                      aria-label={`View ${rt.label} description`}
                      className={`px-4 py-2 text-sm font-mono uppercase tracking-wide rounded-t-lg border-b-2 transition-colors ${
                        activeTab === rt.key
                          ? 'bg-parchment text-navy font-semibold border-x border-t border-navy/15 border-b-brass'
                          : 'text-navy/70 hover:text-navy border-transparent'
                      }`}>
                      {rt.label}
                    </button>
                  ))}
                </div>
                <div
                  role="tabpanel"
                  className={`ticket-perforation p-5 bg-parchment border border-navy/15 border-t-0 rounded-b-xl rounded-tr-xl ${
                    justGenerated ? 'animate-result-flash' : ''
                  }`}
                >
                  <p className="text-ink whitespace-pre-wrap leading-relaxed">{results[activeTab]}</p>
                  <p className="text-xs text-navy/70 mt-2">{tResults('wordCount', { count: countWords(results[activeTab]) })}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(results[activeTab]);
                        setCopied(true);
                        setToast(tResults('copied'));
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-sm font-medium text-teal underline inline-flex items-center gap-1.5">
                      {copied && (
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {copied ? tResults('copied') : tResults('copy')}
                    </button>
                    <button
                      onClick={() => {
                        const formatted = `AIRBNB:\n${results.airbnb}\n\nBOOKING.COM:\n${results.booking}\n\nINSTAGRAM:\n${results.instagram}`;
                        navigator.clipboard.writeText(formatted);
                        setCopiedAll(true);
                        setToast(tResults('copiedAll'));
                        setTimeout(() => setCopiedAll(false), 2000);
                      }}
                      className="text-sm font-medium text-teal underline inline-flex items-center gap-1.5">
                      {copiedAll ? tResults('copiedAll') : tResults('copyAll')}
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="text-sm font-medium text-teal underline disabled:opacity-50">
                      {loading ? tResults('regenerating') : tResults('regenerate')}
                    </button>
                  </div>
                  <div className="mt-5 pt-4 border-t border-navy/10 flex items-center gap-3">
                    {feedbackGiven ? (
                      <p className="text-sm text-navy/70">{tResults('feedbackThanks')}</p>
                    ) : (
                      <>
                        <p className="text-sm text-navy/70">{tResults('feedbackQuestion')}</p>
                        <button
                          type="button"
                          aria-label="Helpful"
                          onClick={() => {
                            setFeedbackGiven('up');
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'feedback', { helpful: true });
                            }
                          }}
                          className="text-lg hover:scale-110 transition-transform">
                          👍
                        </button>
                        <button
                          type="button"
                          aria-label="Not helpful"
                          onClick={() => {
                            setFeedbackGiven('down');
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'feedback', { helpful: false });
                            }
                          }}
                          className="text-lg hover:scale-110 transition-transform">
                          👎
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            {hydrated && isPro && (
              <div className="mt-8 pt-6 border-t border-navy/10">
                <p className="text-sm font-medium text-navy/80 mb-3">{tHistory('title')}</p>
                {history.length === 0 ? (
                  <p className="text-sm text-navy/70">{tHistory('empty', { limit: HISTORY_LIMIT })}</p>
                ) : (
                  <ul className="space-y-2">
                    {history.map((entry) => (
                      <li key={entry.id} className="flex items-center justify-between gap-3 bg-white border border-navy/10 rounded-lg px-4 py-2.5">
                        <span className="text-sm text-navy/70 truncate">
                          {entry.propertyType} &middot; {entry.location || '—'}
                        </span>
                        <button
                          type="button"
                          onClick={() => loadHistoryEntry(entry)}
                          className="text-sm font-medium text-teal underline shrink-0">
                          {tHistory('load')}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
          <div className="bg-parchment rounded-2xl border border-navy/15 shadow-card p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-wide text-navy/50">{tShowcase('label')}</span>
              <span className="font-mono text-xs uppercase tracking-wide text-navy/50">{tShowcase('propertyLabel')}</span>
            </div>
            <p className="text-ink leading-relaxed whitespace-pre-wrap">{tShowcase('text')}</p>
          </div>
        </section>

        <div className="bg-parchment-dim">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-8 block text-background" aria-hidden="true">
            <path d="M0,0 L1200,0 L1200,24 C1000,44 800,44 600,24 C400,4 200,4 0,24 Z" fill="currentColor" />
          </svg>
        <section id="pricing" className="max-w-5xl mx-auto px-6 pb-16 pt-4 scroll-mt-8">
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
            <div className="flex flex-col rounded-2xl border border-navy/15 bg-parchment p-7 card-hover">
              <p className="font-display text-lg text-navy">{tPricing('free.name')}</p>
              <p className="text-sm text-navy/50 mb-5">{tPricing('free.tagline')}</p>
              <p className="mb-6">
                <span className="font-display number-display text-4xl font-semibold text-navy">{tPricing('free.price')}</span>
              </p>
              <ul className="space-y-3 text-sm text-navy/80 mb-7 flex-1">
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('free.feature1', { limit: FREE_LIMIT })}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('free.feature2')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('free.feature3')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('free.feature4')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('free.feature5')}</li>
              </ul>
              <a href="#" className="block text-center rounded-lg border border-navy/25 py-2.5 text-sm font-medium text-navy hover:border-navy/50 transition-colors">
                {tPricing('free.cta')}
              </a>
            </div>

            <div className="relative flex flex-col rounded-2xl border-2 border-navy bg-navy p-7 shadow-card-lg md:-mt-4 md:mb-4 card-hover">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brass text-navy text-xs font-semibold px-3 py-1 rounded-full shadow-card tracking-wide">
                {tPricing('pro.badge')}
              </span>
              <p className="font-display text-lg text-parchment">{tPricing('pro.name')}</p>
              <p className="text-sm text-parchment/60 mb-5">{tPricing('pro.tagline')}</p>
              <p className="mb-6">
                <span className="font-display number-display text-4xl font-semibold text-parchment">{tPricing('pro.price')}</span>
                <span className="text-parchment/60 text-sm">{tPricing('pro.period')}</span>
              </p>
              <ul className="space-y-3 text-sm text-parchment/90 mb-7 flex-1">
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature1')}</li>
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature2')}</li>
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature3')}</li>
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature4')}</li>
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature5')}</li>
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature6')}</li>
                <li className="flex gap-2"><CheckIcon className="text-brass" /> {tPricing('pro.feature7')}</li>
              </ul>
              <button
                type="button"
                disabled={checkoutLoading}
                onClick={handleCheckout}
                className="block w-full text-center rounded-lg bg-brass py-2.5 text-sm font-semibold text-navy hover:bg-brass-dark disabled:opacity-50 transition-colors"
              >
                {checkoutLoading ? tPricing('pro.redirecting') : tPricing('pro.cta')}
              </button>
              {checkoutError && (
                <p className="text-xs text-red-300 mt-2 text-center">{tErrors('errorPrefix', { message: checkoutError })}</p>
              )}
              <p className="flex items-center justify-center gap-1.5 text-xs text-parchment/50 mt-3">
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2l6 2.5v5c0 4.2-2.6 7.4-6 8.5-3.4-1.1-6-4.3-6-8.5v-5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                Secure checkout via Stripe
              </p>
            </div>

            <div className="flex flex-col rounded-2xl border border-navy/15 bg-parchment p-7 card-hover">
              <p className="font-display text-lg text-navy">{tPricing('premium.name')}</p>
              <p className="text-sm text-navy/50 mb-5">{tPricing('premium.tagline')}</p>
              <p className="mb-6">
                <span className="font-display number-display text-4xl font-semibold text-navy">{tPricing('premium.price')}</span>
                <span className="text-navy/50 text-sm">{tPricing('premium.period')}</span>
              </p>
              <ul className="space-y-3 text-sm text-navy/80 mb-7 flex-1">
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('premium.feature1')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('premium.feature2')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('premium.feature3')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('premium.feature4')}</li>
                <li className="flex gap-2"><CheckIcon className="text-teal" /> {tPricing('premium.feature5')}</li>
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
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-8 block text-background rotate-180" aria-hidden="true">
            <path d="M0,0 L1200,0 L1200,24 C1000,44 800,44 600,24 C400,4 200,4 0,24 Z" fill="currentColor" />
          </svg>
        </div>

        <section className="max-w-2xl mx-auto px-6 pt-16 pb-16">
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

        {scrolled && !results && (
          <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-background/95 backdrop-blur-sm border-t border-navy/10 shadow-card print:hidden">
            <a
              href="#generator-form"
              className="block w-full text-center bg-brass text-navy rounded-lg py-3 font-medium hover:bg-brass-dark transition-colors"
            >
              {genLabel}
            </a>
          </div>
        )}

        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
            toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {toast && (
            <div className="bg-navy text-parchment text-sm font-medium px-4 py-2.5 rounded-full shadow-card-lg">
              {toast}
            </div>
          )}
        </div>
      </main>
      </ErrorBoundary>
    </>
  );
}
