# Cleanup & Final Pass — TODO

Branch: `cleanup-and-final-pass`, created from `main` (has PR #11-17
merged). `npm run build` verified clean after every item/group below.
`npm run lint` is clean of everything fixable without a logic change —
see the note under Part A item 2 for the 4 remaining findings that
genuinely require one, left alone per this session's rule.
`app/api/checkout/`, `app/api/verify-session/`, `app/lib/proToken.ts`,
and `middleware.ts` are untouched. `app/api/generate/` and
`app/api/webhooks/` were only read, not modified — nothing in this batch
needed to touch them.

---

## PART A — Audit and cleanup

### 1. Reviewed the last 50 commits for conflicting/duplicated changes
Checked specifically for: multiple loading indicators, duplicate toast
components, duplicated CSS logic. Result: **no conflicts found**. Toast
and the loading-skeleton logic each exist in exactly one place
(`app/page.tsx`), not duplicated across components. `globals.css` has no
duplicate keyframes or rule blocks — every animation/utility class is
defined once. No action needed.

### 2. `npm run lint` — fixed everything that's pure code style
Went from **31 problems to 4**. Fixed all 24 `react/no-unescaped-entities`
errors (stray `'`/`"` in JSX text) across 11 blog posts and the terms
page — escaped with `&apos;`/`&quot;`, zero behavior change.
**Left alone (all 4 require an actual logic/structural change, not
style)**:
- `app/page.tsx` — `setState` inside the hydration `useEffect`
  (pre-existing, flagged in an earlier session too; fixing it means
  restructuring the hydration pattern itself)
- `components/CookieConsent.tsx` — same `setState`-in-effect pattern
- `components/LanguageSwitcher.tsx` — `document.cookie` write flagged
  by `react-hooks/immutability`; the suggested fix is to move it into an
  effect, which changes the component's structure
- `app/layout.tsx` — `@next/next/no-page-custom-font` warning on
  `FontLoader`; fixing it properly means switching to `next/font/google`
  instead of the current preload-swap trick, a different loading strategy

### 3. Dead imports/components from recent sessions
Checked every file in `components/` is actually imported somewhere in
`app/`: all 10 are used (`Analytics`, `CheckIcon`, `CookieConsent`,
`ErrorBoundary`, `FontLoader`, `HeroIllustration`, `LanguageSwitcher`,
`NotFoundIllustration`, `PrintButton`, `ReadingAids`). **No dead
components found.**

### 4. Tailwind/design-token consistency — **found and fixed 2 real issues**
- All 23 `opengraph-image.tsx` routes (social share preview images) used
  a hardcoded `#EA580C`/`#B45309` orange gradient that never matched the
  site's actual brass brand color anywhere else on the site. These routes
  render through Next's `ImageResponse`/Satori, which can't resolve CSS
  custom properties, so they must stay as literal hex — but the *color*
  was simply wrong. Fixed to the real brass tokens (`#B5652E`/`#954F21`)
  across all 23 files, verified by fetching a rendered image.
- The header logo mark's inline SVG used literal `#3B2F26`/`#FAF6EE` hex
  instead of `var(--color-navy)`/`var(--background)`, unlike every other
  illustration component (`HeroIllustration.tsx`, `NotFoundIllustration.tsx`)
  which already use the `var(--color-*)` pattern. Switched to match,
  verified identical rendered output via screenshot.
- No other hardcoded hex colors found outside `globals.css`'s own token
  definitions.

### 5. Cross-component z-index/positioning conflicts
Reviewed every `fixed`/`sticky` element site-wide (header, sticky mobile
CTA, toast, back-to-top, reading-progress bar, tone tooltip) and mapped
their z-index and viewport conditions. All potential pairings were either
already non-overlapping by design (sticky CTA vs. toast: mutually
exclusive on `results` state) or already fixed in the previous session
(back-to-top vs. sticky CTA, now at `bottom-20 md:bottom-6`). **No new
conflicts found** this session.

### 6. Full `npm run build` warnings (not just errors)
Only one build-time warning exists: `The "middleware" file convention is
deprecated. Please use "proxy" instead.` This is Next.js 16's migration
notice for `middleware.ts` → `proxy.ts`. **Deliberately not touched** —
rule 3 explicitly forbids touching `middleware.ts`, and renaming the file
to the new convention is exactly that, even though the logic inside
wouldn't change. Flagged below under "Requires human decision."

### 7. New pages in `sitemap.ts` — **found and fixed a real gap**
`/changelog` (added in PR #15) was missing from `sitemap.ts` entirely.
Added it. Cross-checked every other route against the sitemap
(`/about`, `/seo-guide`, `/airbnb-title-generator`,
`/booking-com-description-generator`, and all 22 blog posts including
`airbnb-hosting-glossary` and `common-airbnb-description-mistakes`) —
everything else was already present. The new `/examples-by-property-type`
page (item 12 below) was added to the sitemap at the same time.

### 8. Consolidated "Requires human decision" list
See the dedicated section at the bottom of this file — collected from
the `security-hardening` and `ux-polish-2` branch TODOs (both still
reachable in git history at `384132c` and `06d951f`).

---

## PART B — Remaining valuable items

### 9. `app/robots.ts` — confirmed AI bots are allowed
The file uses a single wildcard rule (`userAgent: '*', allow: '/'`) with
no disallow rules at all, so GPTBot, PerplexityBot, ClaudeBot, and every
other crawler are allowed by construction. Verified, no change needed.

### 10. `/api/webhooks/stripe` reachable without auth friction
`middleware.ts`'s matcher is `"/((?!api|_next|_vercel|.*\\..*).*)"` —
it explicitly excludes everything under `/api`, so the middleware
function never runs for `/api/webhooks/stripe` (or any other API route).
Stripe's server-to-server POST (no browser session/cookies) reaches the
route handler directly. Verified by reading the matcher, no change
needed (and none was made to `middleware.ts`, per rule 3).

### 11. Differentiation callouts between the two Airbnb/Booking/Vrbo posts
Both `airbnb-vs-booking-vs-vrbo` and `airbnb-vs-vrbo-vs-booking-2026`
still have a clear, visible italic callout pointing to the other post,
placed right after the TL;DR box and before the Key Takeaways list on
both — not pushed down or hidden by the later TL;DR/table additions.
Verified by reading both files in full. No change needed.

### 12. `app/examples-by-property-type/page.tsx` — **created**
Four property types (beach apartment, mountain cabin, city studio,
family house), each showing all three example outputs (Airbnb,
Booking.com, Instagram) as static, hand-written text — no live
`/api/generate` calls from this page, each block explicitly labeled
"example output," no invented numbers or statistics anywhere. Added to
`sitemap.ts`. Verified visually and with `eslint`.

### 13. Hero subtitle reworded to sell the outcome, not the form
Old (all 8 locales): opened with "One form, three ready-to-paste
listings...". New: opens with "Get three ready-to-paste listings...
in 30 seconds" — leads with what the visitor gets and the time it takes,
not the mechanism. Same tone, same trailing "written for how guests
actually search and scroll" differentiator kept everywhere. Updated in
all 8 `messages/*.json` files, verified visually on the homepage.

### 14. Changelog completeness — **found and fixed a real gap**
The changelog only covered work through August 28; everything from PR
#12 through #17 (two SEO/content batches, the UI/UX redesign, the
13-feature batch, security hardening, and this session's UX polish 2)
was missing. Added one dated entry (all of it landed the same day per
git history) summarizing every batch in plain, human terms — not commit
titles.

### 15. `package.json` dependency audit
All 6 runtime dependencies (`next`, `react`, `react-dom`, `stripe`,
`next-intl`, `redis`) and all 4 dev dependencies are actively used
somewhere in the codebase — confirmed by grepping for each. **No unused
dependencies found**, nothing removed.

### 16-20. Blog post title/meta-description length audit
Measured every one of the 22 blog post `<title>` values. **Found and
fixed one violation**: `airbnb-vs-vrbo-vs-booking-2026` was 63 characters
(dropped "Compared" → 54 characters). Every other title is under 60.
Also measured meta descriptions: a handful run past the ~155-160
character soft guideline (longest is 168), but that wasn't the explicit
limit this task named (only title <60 was), so left as-is rather than
rewriting descriptive copy that wasn't asked for.

---

## Explicitly skipped this session (per instructions)
- Locale URL structure with hreflang — too large a separate effort
- `npm audit fix --force` — known sharp/next vulnerability, deliberately
  deferred (see security-hardening's TODO), not touched
- Any new third-party service or paid tool

---

## Requires human decision

Consolidated from every reachable prior branch TODO (`security-hardening`
at commit `384132c`, `ux-polish-2` at commit `06d951f`), plus one new
item found this session:

1. **`STRIPE_WEBHOOK_SECRET` still isn't set on Vercel.** The webhook
   endpoint (`/api/webhooks/stripe`) fails closed (503) until it is.
   Stripe Dashboard → Developers → Webhooks → Add endpoint →
   `https://hostcopyai.com/api/webhooks/stripe` → select
   `customer.subscription.deleted` / `customer.subscription.updated` /
   `invoice.payment_failed` → copy the signing secret → add as
   `STRIPE_WEBHOOK_SECRET` in Vercel → redeploy.

2. **The Stripe webhook only logs — it does not revoke Pro access.**
   Pro status lives in a signed cookie in the user's own browser; a
   webhook can't reach into that. Real revocation needs either
   (a) a `customer_id -> pro_status` database, checked server-side on
   generation requests instead of trusting the client's cookie (real
   scope increase), or (b) handling cancellations manually from Vercel
   function logs for now. Needs a decision on which direction before
   more work goes into it.

3. **Content-Security-Policy is report-only with no collector.** Safe
   (nothing is blocked) but only visible per-visitor in their own browser
   console today. Add a `report-to`/`report-uri` endpoint before ever
   considering enforcing mode.

4. **3 `npm audit` findings remain** (`postcss`, `sharp`, via `next`),
   fixable only via `npm audit fix --force`, which would bump `next` to
   `16.3.3` — a version change outside the current range. Deliberately
   not applied automatically; needs a human to review the Next.js 16.3.3
   changelog and test before upgrading.

5. **`middleware.ts` uses a deprecated Next.js convention** (found this
   session, see Part A item 6). Next 16 wants `proxy.ts` instead. Since
   rule 3 forbids touching `middleware.ts`, this needs an explicit
   go-ahead — it's a rename + adapting to the new export shape, not a
   logic change, but it touches the one file every session has been told
   to leave alone.

6. **Blog mid-article CTA callout redesign** (from `ux-polish-2`) —
   most long posts have one plain-text inline mention of HostCopy AI
   partway through, but upgrading it to a styled callout box (like the
   TL;DR treatment) across all 22 posts is real content/design work,
   not a polish drive-by.

7. **Blog font-size control** and **FAQ search/filter** (both from
   `ux-polish-2`) — explicitly low priority / reviewed as unnecessary at
   current scale (5 FAQ items). Revisit if the FAQ list grows past
   ~15 items.

8. **Product-scope features explicitly deferred in `new-features`**
   (PDF export, multi-property profiles, a tone-blending slider, emoji
   suggestions, session-replay/analytics tooling, an `/admin` dashboard)
   — none implemented, each needs either a new dependency or a scope/
   security decision before picking one up.
