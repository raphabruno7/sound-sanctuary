# Report — S13 “Current Offers” Section (2026-03-05)

## Scope

Executed prompts:

- `docs/prompts/CODEX_EXEC_S13_OFFERS_SECTION.md` — add a “Current Offers” section to the Home page, immediately after the HERO and before the CTA strip.
- `docs/prompts/CODEX_EXEC_S13_OFFERS_REFINEMENT.md` — refine the section to use “Neuron cards” (design-system glass), clean typography, and a simpler layout.

## Changes

### Home page section

- Inserted “Current Offers” section in `src/app/[locale]/page.tsx` right after the HERO and before the `hero-cta-strip`.
- Layout (final):
  - Section wrapper uses `journey-container journey-section text-center`.
  - 3-card grid on desktop (`md:grid-cols-3`), stacked on mobile (fallback grid: `mx-auto ... max-w-5xl ...` because `journey-grid-3` doesn’t exist in CSS).
  - Each card uses design system glass + journey card: `ds-glass journey-card` with centered content and CTA pinned to the bottom via `mt-auto`.
  - CTA button uses existing button style (`btn btn-primary`).
- Cards + links:
  - Card 1: `/contact`
  - Card 2: `/sessions`
  - Card 3: `/sessions`

### i18n

Added keys under `home.offers.*`:

- `messages/en.json`
  - `offers.title`
  - `offers.card1_title`, `offers.card1_sub`, `offers.card1_cta`
  - `offers.card2_title`, `offers.card2_sub`, `offers.card2_cta`
  - `offers.card3_title`, `offers.card3_sub`, `offers.card3_cta`
- `messages/pt-BR.json`
  - Same shape/keys as EN
  - Accent fix: `Sessões` (not `Sessoes`)

### Alignment / layout fix (post-prompt)

The page content appeared “stuck” to the left because `.journey-section` was overriding the horizontal centering from `.journey-container`:

- `.journey-container` sets `margin: 0 auto` (centered).
- `.journey-section` previously used `margin: X 0`, which resets `margin-left/right` to `0` and cancels centering.

Fix applied in `src/app/globals.css`: change `.journey-section` responsive margins to `margin: X auto` so vertical spacing remains while horizontal centering is preserved.

## Constraints honored

- No new component files (inline JSX only).
- No new dependencies.
- No design-system token changes.
- Global CSS change was limited to the `journey-section` margin behavior to restore intended centering.

## Verification

- JSON validity: `jq` on `messages/en.json` and `messages/pt-BR.json`.
- Lint: `npm run lint` (project root: `projects/sound-sanctuary`) — OK.
- Build: `npm run build` (project root: `projects/sound-sanctuary`) — OK.

## Local dev server note

`next dev` initially failed to listen on port `3000` with `EPERM` (`0.0.0.0:3000` and `127.0.0.1:3000`). Started successfully after allowing the command with elevated permissions:

`npm -C projects/sound-sanctuary run dev -- -H 127.0.0.1 -p 3000`

Confirmed server responding via `curl -I http://127.0.0.1:3000` (307 redirect due to locale middleware).
