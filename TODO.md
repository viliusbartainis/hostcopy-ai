# Mobile Header Fixes — TODO

Branch: `mobile-header-fixes`, created from `main` (has PR #11-17 merged;
PR #18 "cleanup-and-final-pass" is still open/unmerged as of this session).
`npm run build` verified clean after every task. Design system preserved
(cream background, navy/brass, Lora/Inter). The "Buy Premium" button's
brass color is deliberately untouched this session, per rule 4.
`app/api/`, `app/lib/proToken.ts`, `middleware.ts` untouched.

- [x] 1. Remove em dash from Hero subtitle in all 8 `messages/*.json`
- [ ] 2. Redesign header logo mark (SVG, navy/brass/parchment palette)
- [ ] 3. Responsive header (mobile hamburger menu, desktop spacing check)
- [ ] 4. Fix teal onboarding banner background (off-palette)
- [ ] 5. Footer mobile layout (link wrapping/middot fix)

## Note for you (per this session's instructions)
Before this PR merges, please take a look at mobile screenshots of the
new header/footer — I'll attach/generate them as part of this work, but
you asked to be the one to sign off on the visual result before it goes
into `main`. See the PR description for screenshots once posted.

## Notes
- Task 1: `main` currently had the *pre-reword* Hero subtitle text (the
  `ux-polish-2` session's rewording — which itself introduced two em
  dashes — is sitting unmerged in PR #18). Fixed the em dash on the
  version that's actually in `main` right now. If PR #18 merges after
  this one, its subtitle rewrite will need the same em-dash fix
  reapplied — flagging this so it isn't silently reintroduced.
