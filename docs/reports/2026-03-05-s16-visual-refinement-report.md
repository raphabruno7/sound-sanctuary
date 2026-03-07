# Report — S16 Visual Refinement (Mobile-First) (2026-03-05)

## Scope

Executed prompt `docs/prompts/CODEX_EXEC_S16_VISUAL_REFINEMENT.md` to refine the S15 Home layout with a mobile-first visual pass: smaller typography, lighter cards, simpler benefits, and a single hero-style photo block.

## Changes

### Global styles

Updated `src/app/globals.css`:

- Reduced `.journey-title` sizes (desktop + 768px + 480px) to prevent oversized headings on mobile.
- Added `.journey-sub` font sizing via `clamp(...)` for more consistent hierarchy.
- Lightened `.journey-card` by reducing padding.
- Added `.journey-card--clean::after { display: none; }` to suppress the pulsing gold dot on selected cards.
- Reduced mobile section spacing:
  - `@media (max-width: 768px) .journey-section` → `margin: 2rem auto`
  - `@media (max-width: 480px) .journey-section` → `margin: 1.5rem auto`

### Home page refinements

Updated `src/app/[locale]/page.tsx`:

- Offers cards:
  - Added `journey-card--clean` to offer cards.
  - Reduced offer card title size from `ds-size-2xl` → `ds-size-xl`.
- Photo split:
  - Replaced 2-photo grid with a single full-width container photo (16:9, `sizes="100vw"`).
- Benefits:
  - Replaced 6 glass cards with a clean 2-column bullet list (no card chrome).

## Constraints honored

- Section order from S15 unchanged.
- No i18n keys removed.
- No new dependencies.
- No new component files.

## Verification

- Manual UI check: verified headings scale down on small widths; photo section renders as a single image; benefits render as a bullet list; offer cards no longer show the gold dot.
- Lint: `npm -C projects/sound-sanctuary run -s lint` — OK
- Build: `npm -C projects/sound-sanctuary run -s build` — OK

