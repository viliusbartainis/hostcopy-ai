"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookie_consent_accepted"));
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-900 text-white p-4 z-50 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-sm">
        We use cookies for basic analytics to improve this site.{" "}
        <a href="/privacy" className="underline">Learn more</a>
      </p>
      <div className="flex gap-2 shrink-0">
        <button onClick={decline} className="px-4 py-2 text-sm rounded border border-stone-600 hover:bg-stone-800">
          Decline
        </button>
        <button onClick={accept} className="px-4 py-2 text-sm rounded bg-white text-stone-900 hover:bg-stone-100">
          Accept
        </button>
      </div>
    </div>
  );
}
