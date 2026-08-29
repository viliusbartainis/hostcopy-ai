import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Report-Only: violations are only visible in each visitor's own browser
// devtools console (no report-uri/report-to collector is configured yet),
// nothing is blocked. Built from what the site actually loads client-side
// today: Google Fonts (fonts.googleapis.com/fonts.gstatic.com), GA4
// (www.googletagmanager.com, plus www.google-analytics.com for the beacon),
// and inline scripts/styles the app already uses (GA4's inline snippet,
// JSON-LD blocks, a handful of inline style attributes) — hence
// 'unsafe-inline'. Stripe checkout is a server-side redirect
// (window.location.href to a Stripe-hosted page), not embedded Stripe.js,
// so no Stripe domains are needed here. Before ever switching this to an
// enforcing Content-Security-Policy header, a human should watch real
// browser console reports for a while and add a report-to collector —
// don't flip to enforcing based on this pass alone.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
        ],
      },
      {
        // Belt-and-suspenders: /api/generate and /api/checkout already set
        // Cache-Control: no-store on their own responses in code. Setting
        // it here too means it still applies even on a response path that
        // code change missed, so a CDN/proxy in front of Vercel never
        // caches these.
        source: "/api/(generate|checkout)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
