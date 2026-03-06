# Report — S14 “Taster Session” Popup (2026-03-05)

## Scope

Executed prompt `docs/prompts/CODEX_EXEC_S14_TASTER_POPUP.md` to add a home-page CTA that opens a lead-capture modal for a free recorded session (“taster”).

## Changes

### Modal + trigger components

- Created `src/components/TasterModal.tsx`
  - Client component using design system `ds-modal` / `ds-modal-backdrop` classes (already present in `design-system/styles/dist/components.css`).
  - Captures name + email and submits to Convex `api.subscribers.subscribe` with `source: "taster"`.
  - Handles status states: idle/loading/success/already subscribed/error.
  - UX: closes on backdrop click and `Escape`; locks body scroll when open.
- Created `src/components/TasterSection.tsx`
  - Client section with title/description + CTA button that opens `TasterModal`.

### Home page placement

- Updated `src/app/[locale]/page.tsx`:
  - Imported and inserted `<TasterSection />` after the “Current Offers” section and before the `hero-cta-strip`.

### i18n

- Updated `messages/en.json`
  - Added `home.taster.*` keys (title/description/cta).
  - Added top-level `tasterModal.*` keys.
- Updated `messages/pt-BR.json`
  - Added matching `home.taster.*` keys in Portuguese.
  - Added matching top-level `tasterModal.*` keys in Portuguese.

## Constraints honored

- Reused existing Convex mutation `api.subscribers.subscribe` (no new Convex functions).
- Used `source: "taster"` for attribution.
- No new npm dependencies.
- Used design system modal styles; no fallback modal CSS added to globals.

## Verification

- Lint: `npm -C projects/sound-sanctuary run -s lint` — OK
- Build: `npm -C projects/sound-sanctuary run -s build` — OK
- Manual UI check (dev server): CTA opens modal and renders expected form fields + copy.

