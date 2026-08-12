"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => setConsented(localStorage.getItem("cookie_consent") === "accepted");
    check();
    window.addEventListener("cookie_consent_accepted", check);
    return () => window.removeEventListener("cookie_consent_accepted", check);
  }, []);

  if (!consented || !process.env.NEXT_PUBLIC_GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  );
}
