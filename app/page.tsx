'use client';

import { useState } from 'react';

const AMENITIES = [
  'WiFi', 'Pool', 'Kitchen', 'Parking', 'Pet-friendly',
  'Balcony', 'Hot tub', 'Workspace', 'Air conditioning',
];

const FREE_LIMIT = 3;

export default function Home() {
  const [propertyType, setPropertyType] = useState('Apartment');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedrooms] = useState(1);
  const [tone, setTone] = useState('Cozy & Homey');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [freeUsesLeft, setFreeUsesLeft] = useState(FREE_LIMIT);
  const [error, setError] = useState('');

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
      setResult(data.description);
      setFreeUsesLeft((prev) => prev - 1);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-900 mb-4">
          Turn Your Airbnb Into a Listing That Books Itself
        </h1>
        <p className="text-lg text-stone-600 mb-8">
          AI-written descriptions that highlight what guests actually search for.
          Generate a professional listing in 30 seconds.
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

            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-stone-900 text-white rounded-lg py-3 font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors">
              {loading ? 'Generating...' : `Generate Description (${freeUsesLeft} free left)`}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-5 bg-stone-50 border border-stone-200 rounded-xl">
              <p className="text-stone-800 whitespace-pre-wrap leading-relaxed">{result}</p>
              <button onClick={() => navigator.clipboard.writeText(result)}
                className="mt-4 text-sm font-medium text-stone-900 underline">
                Copy to clipboard
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
