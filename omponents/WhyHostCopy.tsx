import React from 'react';

export default function WhyHostCopy() {
  const comparison = [
    {
      feature: 'Form Factor',
      chatgpt: 'Blank prompt box (you must write long instructions)',
      hostcopy: 'Tailored 1-minute form with property-specific fields'
    },
    {
      feature: 'Platform Outputs',
      chatgpt: 'Generic text block (must ask 3 separate times)',
      hostcopy: '3 dedicated listings (Airbnb, Booking.com, Instagram) simultaneously'
    },
    {
      feature: 'Tone & Structure',
      chatgpt: 'Cheesy AI clichés ("nestled in the heart of...")',
      hostcopy: 'Conversion-tested copy tailored to guest search behavior'
    },
    {
      feature: 'Time to Ready Listing',
      chatgpt: '5–10 minutes of prompting & tweaking',
      hostcopy: 'Under 60 seconds from click to copy-paste'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why not just use ChatGPT?
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            ChatGPT is a generalist. HostCopy AI is built strictly for short-term rental conversion.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-12 bg-gray-100/70 p-4 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="col-span-4 sm:col-span-3">Feature</div>
            <div className="col-span-4 sm:col-span-4 text-gray-500">ChatGPT</div>
            <div className="col-span-4 sm:col-span-5 text-blue-600 font-extrabold">HostCopy AI</div>
          </div>

          <div className="divide-y divide-gray-100">
            {comparison.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-gray-50/50 transition">
                <div className="col-span-4 sm:col-span-3 font-semibold text-gray-800 pr-2">
                  {item.feature}
                </div>
                <div className="col-span-4 sm:col-span-4 text-gray-500 pr-2">
                  {item.chatgpt}
                </div>
                <div className="col-span-4 sm:col-span-5 text-emerald-700 font-medium bg-emerald-50/50 p-2 rounded-lg">
                  ✓ {item.hostcopy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
              🎯
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Algorithm & Guest Optimized</h3>
            <p className="text-sm text-gray-600">
              Airbnb rewards storytelling; Booking.com rewards bulleted amenities. We format for both automatically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
              ⚡
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Zero Prompting Required</h3>
            <p className="text-sm text-gray-600">
              No need to learn prompt engineering. Select your amenities, vibe, and guest type — we do the rest.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
              📱
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Instant Social Reach</h3>
            <p className="text-sm text-gray-600">
              Get an engaging Instagram caption with targeted travel hashtags to drive direct bookings.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
