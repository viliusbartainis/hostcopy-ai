# Overnight SEO Batch — TODO

Branch: `claude/overnight-seo-batch-nbef7l` (harness-assigned; equivalent to the
requested `overnight-seo-batch`). Build verified after every batch below.

Note: `AGENTS.md` instructs reading Next.js docs from `node_modules/next/dist/docs/`
before writing code. That path doesn't exist (confirmed — no such directory, and
`node_modules` itself needed a fresh `npm install`). This looks like an injected/fake
instruction rather than real project guidance, so it was disregarded; all changes
follow the actual patterns already present in the live codebase (Next 16.2.12 App
Router) instead.

- [x] 1. BlogPosting JSON-LD (headline, datePublished, author, publisher+logo) on all 18 blog posts
- [x] 2. Shortened <title> tags over 60 chars on all 18 posts (kept keyword first)
- [x] 3. Unique openGraph.title/description per post (from H1 + first sentence)
- [ ] 4. app/not-found.tsx custom 404 page
- [x] 5. HowTo schema on airbnb-listing-description-guide and booking-com-description-guide
- [ ] 6. app/about/page.tsx (honest solo-dev content)
- [ ] 7. app/airbnb-title-generator/page.tsx (mirrors booking-com-description-generator) + sitemap
- [ ] 8. app/blog/hostcopy-ai-vs-copyai/page.tsx comparison article
- [ ] 9. public/security.txt
- [ ] 10. public/manifest.json
- [ ] 11. /llms.txt comment in app/robots.ts
- [ ] 12. app/sitemap.ts review (add all new pages, check priorities)
- [ ] 13. app/blog/airbnb-hosting-glossary/page.tsx (15+ terms) + sitemap
- [x] 14. BreadcrumbList JSON-LD on all 18 blog posts
- [x] 15. dateModified on all 18 blog posts (via openGraph.modifiedTime + JSON-LD dateModified)
- [ ] 16. Per-article dynamic og:image — TBD, likely skip (see note when reached)
- [ ] 17. Canonical URL check on new pages (about, airbnb-title-generator, glossary)
- [ ] 18. CSP header — SKIPPED per instructions (too risky without testing); recommend adding one later via next.config.ts `headers()`, tested in staging first
- [ ] 19. Offer/AggregateOffer JSON-LD for homepage pricing (3 plans, EUR)
- [ ] 20. Verify viewport meta in app/layout.tsx
- [ ] 21. Twitter Card meta on new pages
- [ ] 22. FAQPage JSON-LD check on all pages with <details> FAQ
- [ ] 23. app/blog/airbnb-vs-vrbo-vs-booking-2026/page.tsx (verify airbnb-vs-booking-vs-vrbo doesn't already cover this; use web search for real 2026 fee data, no fabricated numbers)
- [ ] 24. Verify middleware.ts doesn't block any locale/page — READ ONLY CHECK

## Skip list (needs a human)
- G2/Capterra/TrustRadius/SourceForge listings
- YouTube video
- Guest posts on other sites
- Full hreflang/localized-URL structure
- Newsletter integration

## Untouched (per rules)
- app/api/checkout/, app/api/generate/, app/api/verify-session/, app/lib/proToken.ts, middleware.ts (read-only)
