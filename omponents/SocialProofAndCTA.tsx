import React from 'react';

export default function SocialProofAndCTA({ onCtaClick }: { onCtaClick?: () => void }) {
  const testimonials = [
    {
      quote: "Cut my listing creation time from an hour of tweaking to literally under a minute. The Booking.com version is spot on.",
      author: "Mantas K.",
      role: "Superhost (3 Apartments in Vilnius)"
    },
    {
      quote: "The Instagram caption alone saved me time. Usually AI text sounds super robotic, but this actually sounds natural and inviting.",
      author: "Elena R.",
      role: "Vacation Rental Manager"
    }
  ];

  const handleScroll = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl relative">
              <div className="flex text-amber-400 mb-3 text-sm">
                ★★★★★
              </div>
              <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-sm text-gray-900">{t.author}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Bottom CTA Banner */}
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ready to upgrade your listings?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8">
              Generate 3 ready-to-publish descriptions in seconds. No credit card or registration needed.
            </p>
            <button
              onClick={handleScroll}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Generate My Listing Now
            </button>
            <p className="text-xs text-blue-200 mt-3">3 free generations included</p>
          </div>
        </div>

      </div>
    </section>
  );
}
