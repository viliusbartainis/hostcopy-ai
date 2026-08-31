# Mobile Header Fixes — TODO

Branch: `mobile-header-fixes`, created from `main` (has PR #11-17 merged;
PR #18 "cleanup-and-final-pass" is still open/unmerged as of this session).
`npm run build` verified clean after every task. Design system preserved
(cream background, navy/brass, Lora/Inter). The "Buy Premium" button's
brass color is deliberately untouched this session, per rule 4 — only its
padding changed in the new mobile menu (to sit correctly in a stacked,
full-width layout), never its color.
`app/api/`, `app/lib/proToken.ts`, `middleware.ts` untouched.

- [x] 1. Remove em dash from Hero subtitle in all 8 `messages/*.json`
- [x] 2. Redesign header logo mark (SVG, navy/brass/parchment palette)
- [x] 3. Responsive header (mobile hamburger menu, desktop spacing check)
- [x] 4. Fix teal onboarding banner background (off-palette)
- [x] 5. Footer mobile layout (link wrapping/middot fix)

## ⚠️ Please review before merging

Per this session's instructions, I have **not** merged this PR, and I'm
asking you to look at the mobile screenshots before you do. I generated
and attached the following to the PR description:
- Mobile header, closed (hamburger) and open (dropdown menu) states,
  both the free-user and Pro-user menu content
- Desktop header, for comparison (should look unchanged apart from
  slightly more even spacing)
- Mobile and desktop footer (the link-wrapping fix)
- The new logo mark, zoomed in

If anything looks off on your actual device (not just these Playwright
screenshots), let me know before merging.

## Task notes

**1. Em dash removal** — `main` currently has the *pre-reword* Hero
subtitle text (the `ux-polish-2` session's rewording, which itself
introduced two more em dashes, is sitting unmerged in PR #18). Fixed the
em dash on the version actually in `main` right now, replacing it with a
comma in each of the 7 affected locales (Spanish already had no em dash).
**If PR #18 merges after this one**, its subtitle rewrite will reintroduce
an em dash — flagging this now so it isn't silently reintroduced later.

**2. Logo redesign** — replaced the "HC" text monogram with a small brass
key icon (circle bow + shaft + two teeth) on the existing navy rounded
square, using the same house/key/luggage-tag visual motif already
established in `HeroIllustration.tsx`. Pure SVG, no image asset. Verified
legibility with a 4x-scale zoomed screenshot at the actual 30px header
size.

**3. Responsive header** — below 768px: logo stays left, a hamburger
button (animates to an X when open) replaces the whole nav cluster on the
right. Opening it drops a full-width panel anchored under the sticky
header with Blog, the language switcher, and Buy Premium (or the
Pro-active badge + manage-subscription link for Pro users) stacked
vertically with generous spacing; each link/button closes the menu on
click. Desktop (≥768px) is functionally unchanged — only the gap between
nav items went from `gap-3` to `gap-5` for slightly more even spacing, as
asked. Header sticky behavior (`sticky top-0 z-40` plus the scroll-shadow
effect) was already in place from an earlier session and is untouched.

**4. Onboarding banner** — the first-time "3 versions" explainer used
`bg-teal/10`, which read as an odd mint/green tint against the site's warm
palette (teal's cool hue clashes even at low opacity). Chose option (b):
solid navy background with parchment text, matching the Pro pricing card
treatment, since it contrasts far more clearly against the surrounding
cream page than a pale parchment-on-parchment box would. Note: the dismiss
link uses `text-parchment` rather than `text-brass` — contrast-checked
brass-on-navy at only 3.0:1 (fails AA for small text; brass is fine for
larger decorative elements like the Pro card's checkmark icons, not for a
14px link), while parchment-on-navy is 9.5–11.3:1.

**5. Footer mobile layout** — both link pairs (blog guides + Booking.com
generator; Privacy + Terms) used a literal `" · "` between two `<a>` tags,
which wrapped mid-sentence on narrow screens with the middot stranded
alone. Switched both to `flex-col` (stacked, separator hidden) below the
`sm` breakpoint and `flex-row` with the middot restored at `sm` and up.
Verified at 375px and 1000px.
