# Report — S13 Offers Alignment Fix (2026-03-05)

## Context

After implementing S13 “Current Offers” + refinement, the home page content looked visually left-aligned (containers not centered).

## Root cause

The centering rules were conflicting:

- `.journey-container` centers via `margin: 0 auto` and constrains width with `max-width: 1040px`.
- `.journey-section` previously used `margin: X 0`, which resets `margin-left/right` to `0` and cancels the auto-centering from `.journey-container`.

## Fix

Updated `src/app/globals.css` so `.journey-section` keeps vertical spacing while preserving horizontal centering:

- Desktop: `margin: 5rem auto`
- ≤768px: `margin: 3rem auto`
- ≤480px: `margin: 2.5rem auto`

Files changed:

- `projects/sound-sanctuary/src/app/globals.css`

## Verification

- Browser validation: `section.journey-container.journey-section` now centers (`x ≈ (viewport - 1040)/2` when viewport > 1040px).
- Lint: `npm -C projects/sound-sanctuary run -s lint` — OK
- Build: `npm -C projects/sound-sanctuary run -s build` — OK

## Notes

- Local dev server may require elevated permissions to bind to `127.0.0.1:3000` (EPERM).
- The broader S13 implementation details remain documented in:
  - `projects/sound-sanctuary/docs/reports/2026-03-05-s13-offers-section-report.md`

