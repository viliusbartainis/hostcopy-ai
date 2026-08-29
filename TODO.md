# New Features — TODO

Branch: `new-features`, created from `main` (which already has PR #12, #13,
#14 merged). `npm run build` verified clean after every task below.

All new state uses React state + localStorage only — no new database, no
new paid services/dependencies. `app/api/checkout/`, `app/api/verify-session/`,
`app/lib/proToken.ts`, and `middleware.ts` are untouched.
`app/api/generate/route.ts` is also untouched — none of these tasks needed
changes there (Regenerate just re-sends the existing request).

- [x] 1. "Regenerate" button next to results (re-sends the same form request via the existing `handleGenerate`)
- [x] 2. "Copy all 3" button (AIRBNB:/BOOKING.COM:/INSTAGRAM: format)
- [x] 3. Word/character counter under each generated version (ICU plural, all 8 locales)
- [x] 4. Form field persistence to localStorage (all users, not Pro-only) — key `hostcopy_form_state`
- [x] 5. Enter key in any form field triggers Generate (if valid) — field grid is now a `<form onSubmit>`, native Enter-to-submit
- [x] 6. 4 quick-start amenity templates above the form
- [x] 7. "Was this helpful?" 👍/👎 mini-feedback (GA4 `feedback` event, no storage)
- [x] 8. Generation history (Pro-only, last 5, localStorage `hostcopy_history`, Load button)
- [x] 9. Debounce protection on double-click Generate -- already protected: `disabled={loading || ...}` on the Generate button prevents a second click while a request is in flight. No change needed.
- [x] 10. /changelog static page (`app/changelog/page.tsx`, sourced from `git log`)
- [x] 11. /api/health endpoint (`app/api/health/route.ts`)
- [x] 12. ErrorBoundary component wrapping page content (`components/ErrorBoundary.tsx`)
- [x] 13. autoFocus on the Property type field

## Explicitly skipped (per instructions)
- PDF export (needs a new library)
- Multi-property profiles
- Tone-blending slider
- Emoji suggestions
- Session replay/analytics tools
- /admin dashboard (security risk without proper auth — skipped entirely)
