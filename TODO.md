# Security Hardening — TODO

Branch: `security-hardening`, created from `main` (which already has PR #12,
#13, #14, #15 merged). `npm run build` verified clean after every step
below, each done as its own small change.

Per this session's rule 4: the existing Stripe checkout/verify-session
flow and Pro cookie logic (`app/lib/proToken.ts`) are functionally
untouched — every change here is either a brand-new endpoint, a check that
runs *before* the existing logic (body size, rate limit), or a lift of the
existing Redis rate-limit code into a shared helper with byte-for-byte the
same behavior (same Redis key prefix for `/api/generate`, so existing
counters aren't reset) so `/api/checkout` can reuse it.

- [x] **1. Stripe webhook endpoint** — `app/api/webhooks/stripe/route.ts`.
  Verifies the signature with `stripe.webhooks.constructEvent` (raw body +
  `stripe-signature` header) and listens for `customer.subscription.deleted`,
  `customer.subscription.updated` (only when the new status isn't
  `active`), and `invoice.payment_failed`. On a matching event it logs
  `timestamp`, `event.type`, and the customer's email via `console.log`.
  **It does not revoke Pro access** — see the "Human action required"
  section below, this is explicitly a logging-only foundation per the task
  description, not a full fix.

- [x] **2. Location field sanitization** — `app/api/generate/route.ts`.
  Added `sanitizeLocation()`, which strips (case-insensitive) phrases like
  "ignore previous instructions", "disregard previous instructions",
  `system:`, `assistant:` before the value is interpolated into the Groq
  prompt. Explicitly a first filter, not complete prompt-injection defense
  (documented in a code comment).

- [x] **3. Request body size limit (413)** — both `/api/generate` and
  `/api/checkout` now reject requests with `Content-Length > 10KB` with a
  413, before `JSON.parse`/route logic runs.

- [x] **4. Redis rate limiting on `/api/checkout`** — extracted the
  existing `getRedis`/rate-limit-by-IP logic out of `/api/generate` into
  `app/lib/rateLimit.ts` (`isRateLimited(keyPrefix, ip, limit,
  windowSeconds)`), unchanged in behavior, and reused it in both routes.
  `/api/generate` keeps its original `ratelimit:<ip>` key/8-per-hour so
  existing counters aren't affected; `/api/checkout` gets a new
  `checkout-ratelimit:<ip>` key at 5/hour. `checkout/route.ts`'s `POST`
  now takes a `req: NextRequest` param (needed to read the IP) — the
  Stripe session-creation call itself is untouched.

- [x] **5. Content-Security-Policy-Report-Only** — added to `next.config.ts`.
  Report-only (not enforced), so it cannot break anything client-side.
  Directives are based on what the app actually loads client-side today
  (checked via grep for every `https://` reference in `app/` and
  `components/`): Google Fonts, GA4 (`googletagmanager.com` +
  `google-analytics.com`), and `'unsafe-inline'` for the GA4 inline
  snippet / JSON-LD blocks / a few inline `style={{}}` attributes. No
  Stripe domains needed — checkout is a server-redirect
  (`window.location.href` to a Stripe-hosted page), not embedded Stripe.js.
  **Not enforced yet on purpose** — there's no `report-to` collector
  configured, so today this is only useful by opening the browser
  devtools console on the live site. A human should watch real violation
  reports for a while (and ideally wire up a collector) before ever
  switching this to an enforcing `Content-Security-Policy` header.

- [x] **6. CORS policy check (read-only)** — no `Access-Control-*` headers
  are set anywhere in `next.config.ts` or any `app/api/**/route.ts`. That
  means Next.js's default applies: same-origin only. A `fetch()` from
  another origin's JavaScript to `/api/generate`, `/api/checkout`,
  `/api/verify-session`, or the new webhook will not receive
  `Access-Control-Allow-Origin`, so browsers block the response from being
  read by that cross-origin script. This is the secure default and no
  misconfiguration was found — no code change made.

- [x] **7. `guests`/`bedrooms` range validation** — `/api/generate` now
  rejects (400) unless `guests` is a finite number in `[1, 50]` and
  `bedrooms` is a finite number in `[0, 20]`.

- [x] **8. Audit `console.error()` calls in `app/api/`** — found and fixed
  two that logged more than necessary:
  - `generate/route.ts` used to log the raw Groq error response body
    (`errText`) on a failed request; some providers echo request details
    back in error payloads, so this now logs only the HTTP status code.
  - The generic catch-all in `generate/route.ts`, `checkout/route.ts`,
    and the new `rateLimit.ts`/webhook route used to log the raw error
    object (`console.error('X:', err)`); all now log `err.message` (or
    `'unknown error'`) instead of the full object. `verify-session/route.ts`
    doesn't log at all on error (unchanged, already fine).

- [x] **9. `Cache-Control: no-store`** — added directly on the JSON
  responses in `/api/generate` and `/api/checkout`, *and* as a
  belt-and-suspenders `next.config.ts` header rule for `/api/(generate|checkout)`
  so it still applies even on a response path a future code change
  misses (e.g. an early validation-error return).

- [x] **10. `npm audit`** — 4 high-severity findings. Ran `npm audit fix`
  (no `--force`): fixed the `nanoid` one (only touched `package-lock.json`,
  no `package.json` version range change). The remaining 3
  (`postcss`, `sharp`, transitively via `next`) all require
  `npm audit fix --force`, which would upgrade `next` from `16.2.12` to
  `16.3.3` — a version bump outside the current dependency range. **Not
  done automatically** per rule 10 — needs a human to review the Next.js
  16.3.3 changelog and test the upgrade deliberately, not as a drive-by
  security patch.

- [x] **11. Groq fetch timeout** — wrapped the Groq `fetch()` call in an
  `AbortController` with a 15s timeout; an abort now returns a 504 with a
  clear message instead of hanging indefinitely.

- [x] **12. `Retry-After: 3600` on 429s** — added to both the
  `/api/generate` and the new `/api/checkout` rate-limit responses.

- [x] **13-15. `middleware.ts` / `next.config.ts` header review** —
  read-only, as instructed. `middleware.ts` only handles locale-cookie
  detection and its matcher explicitly excludes `/api` (`"/((?!api|_next|_vercel|.*\\..*).*)"`),
  so it was never the place security headers live for API routes.
  `next.config.ts`'s `headers()` already applies `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy:
  strict-origin-when-cross-origin`, and `Permissions-Policy` to
  `/:path*` (i.e. every route, including `/api/**`) — all four are present
  and correctly configured. No gaps found, no changes made beyond adding
  the new CSP-Report-Only and Cache-Control entries described above.

## Human action required before/after deploying

1. **STRIPE_WEBHOOK_SECRET is not set on Vercel and the webhook does
   nothing useful without it.** To finish wiring it up:
   - Stripe Dashboard → Developers → Webhooks → Add endpoint
   - Endpoint URL: `https://hostcopyai.com/api/webhooks/stripe`
   - Select events: `customer.subscription.deleted`,
     `customer.subscription.updated`, `invoice.payment_failed`
   - Copy the "Signing secret" it gives you
   - Add it to Vercel as the `STRIPE_WEBHOOK_SECRET` env var (Project →
     Settings → Environment Variables), then redeploy.
   - Until this is set, the endpoint returns `503` and does nothing (it
     fails closed, not silently).

2. **The webhook does not revoke Pro access yet — it only logs.** Pro
   status lives entirely in a signed cookie in the user's own browser
   (`app/lib/proToken.ts`); a server-side webhook has no way to reach into
   that browser to clear it. Actually revoking access on cancellation/
   failed payment needs one of:
   - (a) a database mapping `customer_id -> pro_status`, checked
     server-side on generation requests instead of trusting the client's
     cookie (the "real" fix, but a real scope increase — new DB, new
     schema, changes to how `/api/generate` checks Pro status), or
   - (b) leave it as a monitoring/logging tool for now and handle
     cancellations manually by checking the Vercel function logs.
   This needs a human decision on which direction to take before more
   work goes into it — not something to guess at.

3. **CSP-Report-Only has no collector.** It's safe (report-only, nothing
   is blocked) but currently only visible per-visitor in their own browser
   console. If you want real telemetry before ever enforcing it, add a
   `report-to`/`report-uri` endpoint and a `Reporting-Endpoints` header.

4. **`npm audit` still shows 3 high-severity findings** (`postcss`,
   `sharp`, via `next`) that need `next` bumped to `16.3.3` via
   `npm audit fix --force`. Not applied automatically — review the Next.js
   16.3.3 changes and test before upgrading.

## Explicitly noted as future work (not implemented)
- Full Stripe webhook -> Pro-access revocation (needs a DB — see item 2
  above)
- Enforcing Content-Security-Policy (needs a monitoring period + a
  report collector first — see item 3 above)
- Upgrading `next` to clear the remaining `npm audit` findings (see item 4
  above)
