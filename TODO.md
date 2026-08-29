# UX Polish 2 — TODO (50 items)

Branch: `ux-polish-2`. Per this session's rule 1, created from `ui-ux-polish`
(not `main`) — but `ui-ux-polish` had fallen behind `main` by two whole
merged PRs (#15 "new-features": regenerate/copy-all/history/templates/
feedback/changelog/health/error-boundary, and #16 "security-hardening":
webhook/rate-limiting/validation/CSP). Branching from the stale tip as-is
would have risked reverting that work when this branch's PR eventually
merges. Per explicit approval, `origin/main` was merged into this branch
first (2 conflicts in `app/page.tsx`, both "ui-ux-polish's version was a
strict subset of main's" — resolved by taking main's side; `TODO.md`
conflicted too and was simply rewritten fresh; everything else auto-merged
cleanly), so this branch now carries PR #12/13 content + `ui-ux-polish`'s
9 UI/UX commits + PR #15 + PR #16, plus the 50 new items below.

`npm run build` verified clean after each item or tight group of related
sub-edits. `npm run lint` shows no *new* issues (pre-existing findings in
blog posts/terms page/layout.tsx/the hydration effect are untouched and
predate this session). Design system (cream background, navy/brass/teal,
Lora/Inter/IBM Plex Mono) preserved throughout. `app/api/checkout/`,
`app/api/verify-session/`, `app/lib/proToken.ts`, `middleware.ts` untouched.
No new npm dependency was needed for anything below.

## Onboarding
- [x] 1. Pulse/glow on Generate button on first-ever valid form — `animate-generate-pulse` (globals.css), shown while `hydrated && !hasInteracted && !limitReached && formValid`; `hasInteracted` persists to localStorage (`hostcopy_generate_pulse_seen`) the moment Generate is first clicked, so it never shows again for that visitor
- [x] 2. Location placeholder with a real example — already done (`Form.locationPlaceholder`: "e.g. Vilnius Old Town"), verified only
- [x] 3. Micro-tooltip on Tone select — small "?" button next to the label, opens on hover or tap (`showToneTip` state), one sentence per tone (`Form.toneTooltip`, translated all 8 locales)
- [x] 4. One-time "3 versions" explainer — dismissible banner above the form, shown once via `ONBOARDING_SEEN_KEY` localStorage flag, "Got it" dismisses permanently

## Error recovery
- [x] 5. More specific error messages — added `errorKind` state (`validation`/`network`/`server`/`ratelimit`); network errors (fetch throwing `TypeError`) now get their own message (`Errors.network`) instead of the generic one; missing-location and invalid-numbers were already separate
- [x] 6. Auto-shown "Try again" only for network/server errors — the retry button in the error banner now only renders when `errorKind` is `network` or `server`; hidden for `ratelimit` (retrying immediately is pointless) and `validation`
- [x] 7. Form data survives an error — already true, verified: `handleGenerate` never clears form fields on error, and the existing localStorage persistence effect (from PR #15) runs independently of the error/success path
- [x] 8. Visually distinct user-error vs system-error color — amber (`bg-amber-50 border-amber-200 text-amber-800`, contrast-checked at 4.84:1) for `validation`/`ratelimit`; red (unchanged) for `network`/`server`

## Mobile specifics
- [x] 9. Amenity button touch target — bumped `py-2` to `py-2.5` (from ~38px to ~44px tall including border), meets the 44px guideline
- [x] 10. Native mobile picker — Property type and Tone are plain `<select>` elements (no custom dropdown library), so mobile browsers already show their native picker. Verified, no change needed
- [x] 11. Results tabs horizontal overflow — measured at 375px viewport: tablist is 261px wide against ~327px available, fits with no scroll/clipping. Verified, no change needed
- [x] 12. Copy-to-clipboard on iOS Safari — `navigator.clipboard.writeText()` is already called synchronously inside the `onClick` handler (not after an `await`), which is the pattern iOS Safari requires for clipboard writes to work reliably. Verified, no change needed
- [x] 13. Viewport meta / pinch-zoom — no custom `viewport` export anywhere in the app; Next.js's default (`width=device-width, initial-scale=1`, no `maximum-scale`/`user-scalable=no`) is in effect, which correctly allows pinch-zoom. Verified, no change needed
- [x] 14. Pricing cards mobile stacking — screenshotted at 375px: the 3 cards stack cleanly in a single column (the `grid md:grid-cols-3` has no column directive below `md`, so it falls back to one column). Verified, no change needed

## Post-generation experience
- [x] 15. Clearer success state — new `justGenerated` flag applies `.animate-result-flash` (a brief teal glow, globals.css) to the results panel for ~1.2s right after a successful generation
- [x] 16. Auto-scroll to results — `resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })` fires right after `setResults`; verified via Playwright screenshot
- [x] 17. Copy button state clarity — already present (checkmark icon + "Copied!" text swap), verified only
- [x] 18. Post-3rd-generation CTA visibility — reviewed via screenshot: the upgrade block is a distinct bordered card with bold title, description, and a full-width brass button. Already clear, no change needed
- [x] 19. Stronger active-tab state — active tab now gets `font-semibold` plus a brass bottom border (`border-b-brass`) instead of relying on background color alone

## Form UX
- [x] 20. +/- stepper buttons for guests/bedrooms — added, wrapped around the existing number input (typing directly still works); buttons disable at the 1/50 (guests) and 0/20 (bedrooms) bounds
- [x] 21. Visible count of selected amenities — "{n} selected" appears next to the Amenities label once at least one is picked
- [x] 22. Select open/close animation — N/A, both selects are native `<select>` elements (see item 10), the browser owns their open/close chrome; nothing to animate
- [x] 23. Tab order check — traced with Playwright keyboard nav: property type → location → guests (−/input/+) → bedrooms (−/input/+) → amenities → tone → tone tooltip is skipped correctly (only reachable via mouse/tap, matching its role) → generate. Matches visual order, no change needed
- [x] 24. Required marker on Location — red asterisk added next to the label (`aria-hidden`), with an sr-only "(required)" for screen readers (`Form.requiredIndicator`)

## Performance-adjacent UX
- [x] 25. Optimistic "Generating..." — already true, verified: `setLoading(true)` runs synchronously before the `fetch` call, so the skeleton shows on the same tick as the click, not after network latency
- [x] 26. Debounce on amenity clicks — reviewed and intentionally NOT added: toggling an amenity is a pure, idempotent local-state flip with no network request behind it (unlike Generate, which already has `disabled={loading}`). A double-click just flips it twice, which is harmless and instantly visible/undoable. Adding an artificial delay here would only make the UI feel less responsive for no real protection benefit
- [x] 27. Lazy-loading blog images — N/A, none of the 22 blog posts contain any `<img>` (verified via grep); nothing to lazy-load
- [x] 28. Prefetch homepage on hover in blog CTAs — already true: every "HostCopy AI" / "Back to HostCopy AI" link in blog posts uses `next/link`'s `<Link>`, which prefetches automatically (Next.js's built-in behavior) rather than a plain `<a>`. Verified, no change needed

## Accessibility deep pass
- [x] 29. aria-live region on results — the results container now has `role="region"` + `aria-live="polite"` + `aria-label="Generated listing descriptions"`
- [x] 30. aria-label on results tabs — each tab button has `role="tab"`, `aria-selected`, and `aria-label="View {Platform} description"`; the tab row has `role="tablist"`
- [x] 31. Focus management to results — `resultsRef.current?.focus()` (container is `tabIndex={-1}`) runs alongside the auto-scroll; confirmed via Playwright's accessibility snapshot showing `"focused": true` on the region after generating
- [x] 32. Contrast check on recently-added elements — computed WCAG ratios for every `text-navy/NN` combo added in the last 3 sessions (PR #15/#16 + this one) against the parchment/cream backgrounds they sit on. `navy/40` (2.19:1) and `navy/50` (2.78:1) and `navy/60` (3.58:1) all failed the 4.5:1 AA threshold for normal text. Bumped every recently-added instance to `navy/70` (4.71:1, passes): results tabs, word count, feedback text, history empty-state, quick-start label, amenities-selected count, and the changelog page + ErrorBoundary fallback text. (Older elements predating these sessions, e.g. pricing taglines, Showcase labels, FAQ answers, were left alone — out of this item's stated scope of "elements added in recent sessions," and changing them risks an unrelated sitewide restyle.)

## Blog reading experience
- [x] 33. Reading-progress-bar integration — confirmed working: `ReadingAids` renders the brass progress bar only on `/blog/*` article routes, tracks scroll correctly. Verified, no change needed
- [x] 34. TL;DR visual boundary — already clear: a shaded `bg-stone-100 border rounded-xl` callout box separates it from the `prose` body below. Verified, no change needed
- [x] 35. Mid-article CTA for long posts — reviewed: most long posts already have one inline mention of HostCopy AI roughly two-thirds through the article (not just in the end-of-post footer), but it's a plain underlined text link, not a distinct visual callout. Upgrading it to a styled callout box (matching the TL;DR box treatment) across all 22 posts is a real content-and-design pass in its own right — bigger than a "polish" item — so **flagged as future work** rather than done blind across 22 files in this session
- [ ] 36. Font-size control for long articles — **skipped**, per the task's own "low priority, nice-to-have" note. Needs new persistent UI chrome (a size toggle + localStorage state) across every blog post layout; not attempted this session

## Trust signals
- [x] 37. "Free, no signup" near CTAs — already present: the Generate button label itself always shows the free-count ("Generate Description (3 free left)"), and the Free pricing card explicitly lists "No signup required". Verified, no change needed
- [x] 38. Privacy explainer near the form — already done in an earlier session ("Your details aren't stored or shared." directly under the Generate button). Verified only
- [x] 39. "Cancel anytime" near the Pro button — already present as a bullet ("No signup, cancel anytime") a few lines above the Pro CTA button, inside the same card. Verified, no change needed

## Details/polish
- [x] 40. Border-radius consistency — audited: the site already uses a consistent 3-tier system (`rounded-lg` for controls/inputs, `rounded-xl`/`rounded-2xl` for cards, `rounded-full` for pills/circular buttons); every element added this session follows the same system. No inconsistency found
- [x] 41. Toast position on mobile — checked: the toast (`bottom-6`) only ever appears once results exist, and the sticky mobile CTA only ever shows when results do NOT exist — the two states are mutually exclusive, so there's no overlap scenario. Verified, no change needed
- [x] 42. Sticky header z-index — reviewed the full z-index stack (header `z-40`, sticky CTA `z-40`, toast `z-50`, tone tooltip `z-10`, back-to-top `z-40`): each new element sits at a sensible layer and none of them are dropdown/modal content that the header could wrongly cover. No conflict found
- [x] 43. Back-to-top vs sticky mobile CTA — **found and fixed a real bug**: `ReadingAids`' back-to-top button (`bottom-6 right-6`) visually overlapped the homepage's sticky mobile CTA bar, covering part of its text (confirmed via screenshot). Fixed by moving it to `bottom-20 md:bottom-6` — clears the CTA bar on mobile, unchanged on desktop/tablet where the CTA is hidden anyway
- [x] 44. "Generating..." tab title — `document.title` is swapped to the translated loading label while `loading` is true, restored via the effect's cleanup function the moment it flips back

## Decision-support
- [x] 45. "Who this plan is for" under each pricing card — already present as each card's tagline ("For trying it out" / "For active hosts" / "For property managers"), directly under the plan name. Verified, no change needed
- [ ] 46. FAQ search/filter — **skipped, reviewed as unnecessary**: only 5 FAQ items exist, all visible without scrolling on desktop and with minimal scrolling on mobile; a search/filter UI would add interaction cost for no real benefit at this size. Revisit if the FAQ list grows meaningfully (15+ items)

## Final audit
- [x] 47. Landing → checkout journey review — walked hero → quick templates → form → generate → results → feedback/history → pricing → checkout → FAQ → footer. Rough edges found and fixed this session: back-to-top/sticky-CTA overlap (43), low-contrast text in several recently-added elements (32), no error-type distinction (5/6/8), no focus/scroll to results (16/31). No further rough edges found beyond items already listed as future work (35, 36, and the two npm audit / webhook-revocation items noted in earlier sessions' TODOs).
- [x] 48. Loading-state consistency — the site has exactly one real loading state (the generate skeleton) plus button-level `loading`/`checkoutLoading` text swaps ("Redirecting...", "Regenerating...", "Writing your listings..."); all follow the same pattern (disable + relabel), no inconsistency found
- [x] 49. Disabled-state visual clarity — audited all disabled controls: Generate/Upgrade buttons already used `disabled:opacity-50`; the new guest/bedroom stepper buttons had NO disabled styling at their min/max bounds (looked clickable but silently did nothing) — **fixed**, added `disabled:opacity-30 disabled:cursor-not-allowed` and wired the actual `disabled` condition to the min/max bounds
- [x] 50. Subjective "does this feel premium" pass — see conclusion below

### Conclusion (item 50)
The core generator flow now has the small signals a paid, cared-for product
has that a weekend project usually skips: a first-time nudge toward the
primary action, a visible "something just happened" moment after
generating, error messages that actually tell you what went wrong and
whether trying again is worth it, and controls that look disabled when
they are. The biggest remaining gap toward "premium" isn't visual — it's
the Stripe webhook (from the previous session) still not actually revoking
Pro access on cancellation, which is a trust issue more than a polish one,
and is explicitly flagged there as needing a human decision on a database.
Secondary gap: the blog's mid-article CTAs are functional but plain text,
not the styled callout the rest of the site would suggest — real but
lower stakes than the webhook gap, and sized right as a follow-up.

## Human review suggested
- Item 35 (blog mid-article CTA callout across 22 posts) — content/design
  pass, not attempted this session
- Item 36 (blog font-size control) — explicitly low priority, skipped
- Item 46 (FAQ search) — skipped as unnecessary at current FAQ size
