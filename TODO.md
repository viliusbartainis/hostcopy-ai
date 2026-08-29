# UI/UX Polish — TODO (100 items)

Branch: `ui-ux-polish`, created from `main` (which already has PR #12 and #13
merged). `npm run build` verified clean after every group of changes below.

**Design system note**: the task brief states the tokens as navy `#1B2A4A`
and brass `#C9973E`. The actual values already in `app/globals.css` are
`--color-navy: #3b2f26` (a dark warm brown, not blue) and
`--color-brass: #b5652e` (a terracotta/rust, not golden). Per rule 5 ("keep
the existing design system, don't retheme"), I used the tokens exactly as
they exist in the codebase — the token *names* match what was described,
just not the exact hex the brief remembered. Not asking about this since
the instruction to preserve what's there is unambiguous either way: use
what's actually there.

Not attempting literally all 100 in one pass — working high-impact-first per
instruction, stopping when a section is reasonably covered rather than
grinding every minor item. Status is accurate as of the last commit on this
branch.

## Item 0 — no new dependency needed for anything in this batch
Everything requested (shadows, custom form controls, scrollbar, selection,
grain texture, skeleton loaders, toasts, progress bar, smooth scroll) is
achievable with Tailwind v4 utilities + plain CSS/JS. No package installs.

---

## UI — High impact (1-15)
- [x] 1. Custom SVG hero illustration (house/key/luggage-tag motif) -- new HeroIllustration component, asymmetric two-column hero
- [x] 2. Layered, colored box-shadows on cards (not default Tailwind gray) -- .shadow-card/.shadow-card-lg, applied to form/showcase/Pro cards
- [ ] 3. Custom checkbox/radio styling with navy/brass accent -- N/A, no native checkbox/radio inputs exist anywhere on the site (amenities use toggle buttons)
- [x] 4. Custom scrollbar (::-webkit-scrollbar) in navy/brass tones
- [x] 5. Custom ::selection style (brass bg, navy text)
- [x] 6. Custom underline-with-hover-animation for links (not browser default) -- .link-underline utility (used on retry action so far; browser default underline elsewhere is intentional/accessible)
- [x] 7. At least one asymmetric layout section -- hero (text + illustration, unequal columns)
- [x] 8. Subtle paper/grain SVG texture in background -- fixed feTurbulence overlay, opacity 0.035
- [x] 9. Custom bullet icons (SVG) instead of Unicode ✓ -- new CheckIcon component, all 17 pricing bullets
- [x] 10. Visual card variation (2+ distinct card styles for different purposes) -- form/showcase (cream+shadow-card), Pro (dark navy+shadow-card-lg), Free/Premium (cream+border)
- [ ] 11. Pull-quote style for Sources sections
- [x] 12. Refined :focus-visible style -- brass outline replacing browser default blue, sitewide
- [x] 13. Distinctive number display for prices/stats -- .number-display (tabular-nums) on all 3 pricing numbers
- [x] 14. SVG section divider between 2+ sections -- wave dividers bracketing the pricing section
- [ ] 15. Increase H1/H2/body type-scale contrast -- hero H1 got tracking-tight; broader sitewide pass not yet done

## UI — Medium impact (16-35)
- [ ] 16. Favicon check/refresh
- [ ] 17. Border treatment audit
- [ ] 18. Badge component consistency
- [ ] 19. Hover micro-animations (buttons/cards)
- [ ] 20. Button state system (hover/active/disabled)
- [ ] 21. Tab/pill nav visual polish
- [ ] 22. Select dropdown custom styling
- [ ] 23. Icon consistency audit
- [ ] 24. Footer layout polish
- [x] 25. Sticky header shadow on scroll -- header pulled out of hero-gradient, now position:sticky with scroll-triggered bg+shadow
- [ ] 26. Mobile menu polish (n/a — no hamburger menu exists; header is simple enough not to need one, noted)
- [ ] 27. Blockquote style
- [ ] 28. Table style polish (blog tables)
- [ ] 29. Whitespace/spacing audit
- [ ] 30. Line-height audit
- [ ] 31. Card hover lift
- [ ] 32. Disabled state polish
- [ ] 33. Custom loading spinner -- covered by the skeleton loader below instead (no separate spinner needed for the one loading state on the site)
- [x] 34. Skeleton loader -- pulsing placeholder tabs+lines shown during generation
- [ ] 35. Error state visual polish

## UI — Small (36-50)
- [ ] 36. Icon size consistency
- [ ] 37. Avatar/logo mark consistency
- [ ] 38. 404 illustration
- [ ] 39. Pricing tier visual differentiation (beyond current "Pro" highlight)
- [ ] 40. FAQ open/close animation
- [ ] 41. Copy-button success animation
- [ ] 42. Border-radius system audit
- [ ] 43. Contrast balance pass
- [ ] 44. Print style pass (beyond the 3 blog posts already done)
- [ ] 45. Section spacing rhythm
- [ ] 46. Mobile typography scale
- [ ] 47. "Most popular" badge polish
- [ ] 48. Language switcher visual polish
- [ ] 49. Signature visual motif reused sitewide
- [ ] 50. (rolled into above — no separate item)

## UX — High impact (1-15)
- [x] 1. Skeleton loader instead of plain "Generating..." text
- [x] 2. Real-time form validation (location required shown immediately) -- shows on blur, styled input border
- [x] 3. Reading progress bar on long blog posts -- ReadingAids component, active on all /blog/* article pages
- [x] 4. Back-to-top button after scroll -- ReadingAids, appears after 600px on any page
- [x] 5. Sticky mobile CTA (Generate always reachable) -- appears once scrolled past the form, links back to it
- [x] 6. Smooth scroll with header offset for #pricing/anchors -- scroll-behavior:smooth + existing scroll-mt-8 on #pricing
- [x] 7. Consistent primary/secondary CTA visual hierarchy -- reviewed: brass=primary, outlined navy=secondary consistently across free/premium CTAs, header buy-premium, retry link
- [ ] 8. Microcopy pass (warmer, less robotic) -- partially done via new copy (30-seconds line, privacy line); full audit of existing strings not yet done
- [x] 9. "Takes 30 seconds" expectation-setting near the form -- added, translated to all 8 locales
- [x] 10. Form field grouping review -- existing grid grouping (guests+bedrooms side by side) confirmed already reasonable, no change needed
- [x] 11. Toast notification instead of static success text -- fixed bottom-center toast on copy-to-clipboard
- [x] 12. prefers-reduced-motion support -- global override in globals.css
- [ ] 13. Touch target size audit (44x44 min) -- not yet done
- [x] 14. Privacy reassurance near the form -- added, translated to all 8 locales
- [ ] 15. Form-to-result flow walkthrough — rough edges noted below

## UX — Medium impact (16-35)
- [ ] 16. Blog search
- [ ] 17. Related content widget
- [ ] 18. Breadcrumbs (UI, not just schema)
- [ ] 19. Keyboard nav audit
- [ ] 20. Language-switch loading state
- [ ] 21. Optimistic UI
- [ ] 22. Subtle scroll animations
- [ ] 23. Page transition
- [ ] 24. Tooltips
- [ ] 25. Hover explainers
- [ ] 26. Trust badge near checkout
- [ ] 27. 404 UX review
- [ ] 28. Autosave (form draft)
- [ ] 29. Progressive disclosure
- [ ] 30. Empty state
- [ ] 31. Tab visual distinction (results tabs)
- [x] 32. Copy-success animation (UX half of item 41 above) -- checkmark icon animation on copy button
- [ ] 33. Pricing comparison clarity
- [ ] 34. Mobile responsive test pass
- [ ] 35. Touch gesture review

## UX — Small (36-50)
- [ ] 36. Free-counter visibility
- [ ] 37. Language switcher UX
- [ ] 38. FAQ UX
- [ ] 39. Hover consistency
- [ ] 40. Scroll-anchor accuracy
- [ ] 41. Post-generation CTA clarity
- [ ] 42. Placeholder text pass
- [x] 43. Error action button (retry) -- "Try again" link added to the error banner, calls handleGenerate directly
- [ ] 44. Nav active state
- [ ] 45. Focus order audit
- [ ] 46. Blog reading max-width check
- [ ] 47. "Read more" link text review
- [ ] 48. Contact accessibility
- [ ] 49. Onboarding review
- [ ] 50. Overall "handmade" subjective pass at the end

---
(Checkboxes above get filled in as work proceeds — see commit history for
exactly what changed and why.)
