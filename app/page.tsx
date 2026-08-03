'use client';

import { useState, useEffect } from 'react';

const AMENITIES = [
  'WiFi', 'Pool', 'Kitchen', 'Parking', 'Pet-friendly',
  'Balcony', 'Hot tub', 'Workspace', 'Air conditioning',
];

const FREE_LIMIT = 3;
const STORAGE_KEY = 'hostcopy_uses_used';

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

  useEffect(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY) || '0');
    setUsesUsed(stored);
    setHydrated(true);
  }, []);

  const freeUsesLeft = FREE_LIMIT - usesUsed;

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const handleGenerate = async () => {
    setError('');
    if (freeUsesLeft <= 0) {
      setError('Free limit reached! Pro plan coming soon — check back shortly.');
      return;
    }
    if (!location.trim()) {
      setError('Please enter a location.');
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
      const newUsed = usesUsed + 1;
      setUsesUsed(newUsed);
      localStorage.setItem(STORAGE_KEY, String(newUsed));
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-8 flex items-center gap-2">
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
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-12 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
          Turn Your Airbnb Into a Listing That Books Itself
        </h1>
        <p className="text-lg text-stone-600 mb-8">
          One form, three ready-to-paste listings: Airbnb, Booking.com, and an Instagram caption —
          each written for how that platform&apos;s guests actually search and scroll.
        </p>
      </section>

      {/* Tool */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
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
            <button onClick={handleGenerate} disabled={loading || !hydrated}
              className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors">
              {loading ? 'Generating...' : `Generate Description (${freeUsesLeft} free left)`}
            </button>
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
                <button onClick={() => navigator.clipboard.writeText(results[activeTab])}
                  className="mt-4 text-sm font-medium text-stone-900 underline">
                  Copy to clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="max-w-2xl mx-auto px-6 pb-16 text-center">
        <a href="/blog/airbnb-listing-description-guide" className="text-sm text-stone-500 hover:text-stone-800 underline">
          Read: How to write an Airbnb description that books
        </a>
      </footer>
    </main>
  );
}
