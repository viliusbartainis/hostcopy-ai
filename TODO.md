# UX Polish 2 — TODO (50 items)

Branch: `ux-polish-2`. Per this session's rule 1, created from `ui-ux-polish`
(not `main`) — but `ui-ux-polish` had fallen behind `main` by two whole
merged PRs (#15 "new-features": regenerate/copy-all/history/templates/
feedback/changelog/health/error-boundary, and #16 "security-hardening":
webhook/rate-limiting/validation/CSP). Branching from the stale tip as-is
would have risked reverting that work when this branch's PR eventually
merges. Per explicit approval, `origin/main` was merged into this branch
first (2 conflicts, both "ui-ux-polish's version was a strict subset of
main's" — resolved by taking main's side; everything else auto-merged
cleanly), so this branch now carries: PR #12/13 content + `ui-ux-polish`'s
9 UI/UX commits (41/100 of *that* branch's own list — see git history for
detail, not reproduced here) + PR #15 + PR #16, plus the 50 new items below.

`npm run build` verified clean after each item (or tight group of
sub-edits within one item). Design system (cream background, navy/brass/
teal, Lora/Inter/IBM Plex Mono) preserved throughout — no retheming.
`app/api/checkout/`, `app/api/verify-session/`, `app/lib/proToken.ts`,
`middleware.ts` untouched. No new npm dependency needed for anything below;
if one had been needed the item would be flagged here and skipped pending
your go-ahead (rule 7) — none were.

## Onboarding
- [ ] 1. Pulse/glow on Generate button when form first becomes valid
- [ ] 2. Location placeholder with a real example
- [ ] 3. Micro-tooltip on Tone select explaining the tones
- [ ] 4. One-time "3 versions" explainer (localStorage flag)

## Error recovery
- [ ] 5. More specific error messages (missing location / network / server)
- [ ] 6. Auto-shown "Try again" for network errors (not rate-limit)
- [ ] 7. Form data survives an error (no data loss on reload)
- [ ] 8. Visually distinct user-error (amber) vs system-error (red)

## Mobile specifics
- [ ] 9. Amenity button touch-target size check
- [ ] 10. Native mobile picker check (property type / tone selects)
- [ ] 11. Results tabs horizontal-scroll/overflow check
- [ ] 12. Copy-to-clipboard on iOS Safari check
- [ ] 13. Viewport meta / pinch-zoom check
- [ ] 14. Pricing cards mobile stacking check

## Post-generation experience
- [ ] 15. Clearer "success" state after generation (not just new text appearing)
- [ ] 16. Auto-scroll to results after generating
- [ ] 17. Clear Copy button state (Copied! + checkmark)
- [ ] 18. Post-3rd-generation upgrade CTA visibility check
- [ ] 19. Stronger active-tab visual state on results tabs

## Form UX
- [ ] 20. +/- spinner buttons for guests/bedrooms
- [ ] 21. Visible count of selected amenities
- [ ] 22. Select open/close animation (only if custom select is used)
- [ ] 23. Tab order check across the whole form
- [ ] 24. Explicit "required" marker on Location

## Performance-adjacent UX
- [ ] 25. Optimistic "Generating..." shown immediately on click
- [ ] 26. Debounce protection on amenity button clicks
- [ ] 27. Lazy-loading for blog images (if any exist)
- [ ] 28. Prefetch homepage on hover of "Try it free" links in blog posts

## Accessibility deep pass
- [ ] 29. aria-live region on the results section
- [ ] 30. aria-label on results tabs
- [ ] 31. Focus management to results after generation
- [ ] 32. Contrast check on every element added in recent sessions

## Blog reading experience
- [ ] 33. Reading-progress-bar integration check
- [ ] 34. Clearer visual boundary: TL;DR/key-takeaways vs body text
- [ ] 35. Mid-article CTA for long posts
- [ ] 36. Font-size control for long articles (low priority)

## Trust signals
- [ ] 37. "Free, no signup" reinforcement near CTAs
- [ ] 38. Privacy explainer near the form (check if already done)
- [ ] 39. "Cancel anytime" reminder near the Pro button

## Details/polish
- [ ] 40. Consistent border-radius across newer components
- [ ] 41. Toast position check on mobile
- [ ] 42. Sticky header z-index check
- [ ] 43. Back-to-top button position vs sticky mobile CTA
- [ ] 44. "Generating..." tab title during generation

## Decision-support
- [ ] 45. One-line "who this plan is for" under each pricing card title
- [ ] 46. FAQ search/filter (only if actually needed — check first)

## Final audit
- [ ] 47. Full landing→checkout journey review, rough edges noted here
- [ ] 48. Loading-state consistency check
- [ ] 49. Disabled-state visual clarity check
- [ ] 50. Subjective "does this feel premium" pass + conclusion

## Explicitly skipped / needs a human decision
(filled in as encountered)
