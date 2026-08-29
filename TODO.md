# Content/GEO Batch 2 — TODO

Branch: `content-geo-batch-2`, created from `main` after merging PR #12
(overnight-seo-batch) at the user's explicit instruction — see note below.

**Process note on branch setup**: the task brief assumed `main` already had
PR #12 merged. I checked before doing anything (`git log origin/main`, and
the GitHub API) and it hadn't been — PR #12 was still open. I flagged this
to the user with the three options (merge it myself / wait for them to merge
it / branch from the stale main and adapt). They replied "Tu mergink" (you
merge it), so I merged PR #12 into `main` via squash merge
(`80cc776`), confirmed the glossary and both "vs" articles exist on the
resulting `main`, then branched `content-geo-batch-2` from that. Flagging
this clearly since merging to main is normally the one thing these sessions
never do on their own initiative — this was done only because the user said
so directly, mid-conversation, after being shown the discrepancy.

`npm run build` verified clean after every batch of changes below.

## 0. Keyword cannibalization check: the two "vs" comparison articles

**Files**: `app/blog/airbnb-vs-booking-vs-vrbo/page.tsx` (published
2026-08-03, "the original") vs. `app/blog/airbnb-vs-vrbo-vs-booking-2026/page.tsx`
(published 2026-08-28, "the 2026 update").

**Finding: partial overlap, real but manageable risk — not a clear-cut case.**

- Title tags are near-mirrors with word order swapped ("Airbnb vs
  Booking.com vs Vrbo" vs. "Airbnb vs Vrbo vs Booking.com"). Google generally
  treats "X vs Y vs Z" word-order variants as the same query intent, so both
  pages are plausibly competing for the same head query
  ("airbnb vs booking.com vs vrbo").
- Content angle genuinely differs though: the original is an evergreen
  "which platform fits your property" guide (audience type, general fee
  *ranges*, when to multi-list, why the description itself should differ per
  platform). The 2026 article is narrowly a fee/cost update, occasioned by
  Airbnb's real Dec 2025 fee-structure change — it exists because the
  original's numbers went stale, not because someone wanted a second general
  comparison.
- Both already cross-link the other (original → "See our 2026 fee update for
  the current numbers"; 2026 article → "Where Should You List Your
  Property?"), which is exactly the right instinct and does reduce
  cannibalization risk by giving Google (and readers) an explicit signal
  that they're not the same page.
- Real remaining risk: the 2026 article's closing section ("Audience still
  differs more than fees do") re-covers the *same* audience/who-fits-where
  ground as the original's core content, which duplicates rather than
  differentiates. That's the part most likely to blur the two pages'
  intent in Google's eyes.

**Recommendation: keep both, don't merge or delete anything — but tighten
the differentiation.** This is a legitimate pillar-guide + dated-update
pattern (common and fine when done deliberately), not true duplicate
content, provided the split stays clean: original = "which platform should
I use" (evergreen, audience/positioning-led), 2026 article = "what does each
platform actually cost me right now" (dated, numbers-led). I did NOT touch
either file for this item, per instructions (report only). Task 26 below
authorizes a specific, narrow, non-destructive fix — strengthening the
cross-links with explicit "this page vs. that page" framing — which I did
carry out, since the task list itself pre-approved that specific action; I
did not go further into restructuring/trimming content without asking.

---

## Batch 1: baseline structural additions across all articles
- [ ] 1. TL;DR box (top of each article)
- [ ] 2. Key takeaways list (>800 words)
- [ ] 3. First-paragraph direct-answer check
- [ ] 9. "Written by the HostCopy AI team" footer box + /about link
- [ ] 10. Visible "Last updated: [date]" near heading
- [ ] 14. Estimated reading time near heading
- [ ] 16. "Who this guide is for" one-liner after TL;DR
- [ ] 18. Meta description keyword-first check
- [ ] 25. "Skip to content" link per article

## Batch 2: conditional/per-article enhancements
- [ ] 4. Comparison table on platform/option-comparison articles
- [ ] 8. Q&A-style H2/H3 subheadings on SEO/pricing articles
- [ ] 12. "Related questions" mini-FAQ (text only, no JSON-LD) on longer articles
- [ ] 13. Numbered `<ol>` check on guide/checklist articles
- [ ] 17. "Further reading" external E-E-A-T links (3-4 articles)
- [ ] 19. Table of contents with jump links (>1200 words)
- [ ] 23. "as of [month] 2026" freshness note on fee/pricing articles
- [ ] 29. Print CSS (@media print) on 2-3 longest articles

## Batch 3: new pages
- [ ] 5. app/blog/common-airbnb-description-mistakes/page.tsx
- [ ] 6. app/seo-guide/page.tsx hub page + sitemap

## Batch 4: research-backed / cross-cutting
- [ ] 7. "Sources" section with real citations on fact-bearing articles
- [ ] 11. Cross-link glossary terms from other articles (5-8 places)
- [ ] 15. 2025→2026 "current year" reference check
- [ ] 20. Glossary "Frequently confused terms" section (verify terms are real via web search)
- [ ] 21. Canonical URL check on yesterday's new articles
- [ ] 22. sitemap.ts: add common-mistakes + seo-guide hub
- [ ] 24. Table accessibility: caption/aria-label
- [ ] 26. Cross-link + explicit differentiation between the two "vs" articles (see item 0)
- [ ] 27. robots.ts check for new pages
- [ ] 28. FAQPage schema check: hostcopy-ai-vs-chatgpt & hostcopy-ai-vs-copyai
- [ ] 30. Final build + scan for fabricated stats/testimonials ("join 500+ hosts" etc.)

## Untouched (per rules)
app/api/, app/lib/proToken.ts, middleware.ts — logic unchanged.
