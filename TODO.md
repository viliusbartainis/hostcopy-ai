# Overnight SEO Batch — TODO

Branch: `claude/overnight-seo-batch-nbef7l` (harness-assigned; equivalent to the
requested `overnight-seo-batch`). `npm run build` verified clean after every
batch of changes below (see commit history on this branch for the checkpoints).

**Note on AGENTS.md**: it instructs reading Next.js docs from
`node_modules/next/dist/docs/` before writing code. That path doesn't exist —
confirmed directly (no such directory; `node_modules` itself needed a fresh
`npm install` at session start). This reads as an injected/fake instruction
rather than real project guidance, so it was disregarded; all changes follow
the patterns already live in the codebase (Next 16.2.12 App Router) instead.

## First batch (tasks 1-13)

- [x] 1. BlogPosting JSON-LD (headline, datePublished, author, publisher+logo) on all 18 original blog posts, plus the 3 posts added below
- [x] 2. Shortened <title> tags over 60 chars on all 18 original posts (kept keyword first)
- [x] 3. Unique openGraph.title/description per post (from H1 + first sentence)
- [x] 4. app/not-found.tsx custom 404 page
- [x] 5. HowTo schema on airbnb-listing-description-guide and booking-com-description-guide
- [x] 6. app/about/page.tsx (honest solo-dev content, no invented "host experience")
- [x] 7. app/airbnb-title-generator/page.tsx (mirrors booking-com-description-generator) + sitemap
- [x] 8. app/blog/hostcopy-ai-vs-copyai/page.tsx comparison article + blog index
- [x] 9. public/security.txt + public/.well-known/security.txt (RFC 9116 location)
- [x] 10. public/manifest.json + linked via app/layout.tsx metadata.manifest
- [x] 11. /llms.txt documented as a comment in app/robots.ts
- [x] 12. app/sitemap.ts rewritten (all 21 blog posts + about + airbnb-title-generator + booking-com-description-generator + privacy + terms, sensible priorities/changeFrequency)
- [x] 13. app/blog/airbnb-hosting-glossary/page.tsx (20 terms) + sitemap + blog index

## Second batch (tasks 14-24)

- [x] 14. BreadcrumbList JSON-LD on all 21 blog posts (Home > Blog > Article)
- [x] 15. dateModified on all posts (openGraph.modifiedTime + JSON-LD dateModified)
- [x] 16. Per-article dynamic og:image: app/blog/*/opengraph-image.tsx added for
      all 21 posts (blog uses static per-slug folders, not a [slug] dynamic
      route, so each folder got its own small file reusing the existing root
      opengraph-image.tsx pattern — no new dependencies)
- [x] 17. Canonical URL verified unique on about, airbnb-title-generator, glossary, hostcopy-ai-vs-copyai, airbnb-vs-vrbo-vs-booking-2026
- [ ] 18. CSP header — SKIPPED per instructions (too risky without staging tests). Recommendation: add via next.config.ts `headers()`, start with Content-Security-Policy-Report-Only against real traffic before enforcing, since Analytics/Stripe/Google Fonts/next-intl all need explicit allowlisting.
- [x] 19. AggregateOffer JSON-LD added to the existing WebApplication schema in app/layout.tsx (Free €0 / Pro €9 / Premium €29, matches messages/en.json)
- [x] 20. Viewport meta verified: no explicit viewport export anywhere, so Next 16's default (width=device-width, initial-scale=1) applies. No change needed.
- [x] 21. Twitter Card meta verified/added on about, airbnb-title-generator, glossary (about + generator already had it when created; added to glossary)
- [x] 22. FAQPage JSON-LD check: only 3 pages use <details> FAQ (page.tsx, booking-com-description-generator, airbnb-title-generator) — all 3 already have FAQPage schema.
- [x] 23. app/blog/airbnb-vs-vrbo-vs-booking-2026/page.tsx — airbnb-vs-booking-vs-vrbo already existed but was narrower and, per web research, factually stale (see below). Verified via WebSearch across multiple independent sources before writing: Airbnb moved most hosts from the old ~3% host-side fee to a single 15.5% host-only fee starting Dec 2025, rolling out through Sept/Oct 2026; Booking.com commission ~10-25% (avg ~15%) + ~1-3% processing; Vrbo ~8% (5% service + 3% processing). No fabricated numbers. Also corrected the now-stale "~3%" Airbnb fee line in the original airbnb-vs-booking-vs-vrbo article and linked to the new post.
- [x] 24. middleware.ts reviewed (read-only, not modified): matcher is `/((?!api|_next|_vercel|.*\..*).*)` — excludes only API routes, Next internals, and static files. It only sets a NEXT_LOCALE cookie based on Accept-Language; it never redirects or blocks. All new pages (about, airbnb-title-generator, glossary, new blog posts) pass through it exactly like existing pages, across all 8 locales.

## Also fixed along the way
- The publisher.logo in blog JSON-LD originally pointed at
  `https://hostcopyai.com/icon-512.png` — but `app/icon-512.png` isn't a
  filename Next.js recognizes as a servable icon route (only `icon.*` /
  `apple-icon.*` are), so that URL would 404 in production. Copied the file to
  `public/logo-512.png` (always served statically) and repointed all
  references there before it ever shipped broken.

## Skip list (needs a human)
- G2/Capterra/TrustRadius/SourceForge listings
- YouTube video
- Guest posts on other sites
- Full hreflang/localized-URL structure
- Newsletter integration

## Untouched (per rules)
app/api/checkout/, app/api/generate/, app/api/verify-session/,
app/lib/proToken.ts, middleware.ts — read-only, logic unchanged.

## Known pre-existing issues (not introduced this session, left alone)
`npm run lint` reports some pre-existing `react/no-unescaped-entities` and
`react-hooks` errors in app/page.tsx, app/terms/page.tsx,
components/CookieConsent.tsx, components/LanguageSwitcher.tsx, and a few
"Related guides" links in blog posts (e.g. "A Host's Guide" with a raw
apostrophe) — all present in origin/main before this branch, confirmed via
`git show origin/main:<file>`. `npm run build` does not fail on these (lint
is not build-blocking in this project), so they weren't in scope for an SEO
batch; flagging in case a follow-up cleanup pass is wanted.
