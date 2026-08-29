'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReadingAids() {
  const pathname = usePathname();
  const isArticle = !!pathname && pathname.startsWith('/blog/') && pathname !== '/blog';
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setShowBackToTop(scrollTop > 600);
      if (isArticle) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isArticle]);

  return (
    <>
      {isArticle && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 print:hidden" aria-hidden="true">
          <div
            className="h-full bg-brass"
            style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
          />
        </div>
      )}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-20 right-6 md:bottom-6 z-40 w-11 h-11 rounded-full bg-navy text-parchment shadow-card-lg flex items-center justify-center hover:bg-navy/90 transition-colors print:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 15V5M10 5L5 10M10 5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </>
  );
}
