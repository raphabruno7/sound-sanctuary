# Report — S17 “Does It Work Virtually?” Section (2026-03-05)

## Scope

Executed prompt `docs/prompts/CODEX_EXEC_S17_VIRTUAL_SECTION.md` to replace the Home “Photo Split” section with a conversion-focused “Virtual Sessions” split layout (text + photo), mobile-first.

## Changes

### Home page section

- Updated `src/app/[locale]/page.tsx`:
  - Replaced section #4 (previous Photo Split) with **Virtual Sessions**:
    - Responsive 2-column layout at `md+` (text left, photo right).
    - Mobile stacks naturally with photo first, text below (`md:order-*`).
    - Uses existing photo asset: `/media/sections/virtual-session.jpg`.
    - CTA routes to `/contact`.

### i18n

- Updated `messages/en.json`:
  - Removed `home.photoSplit.*`
  - Added `home.virtual.*` keys: `title`, `p1`, `p2`, `cta`, `alt`
- Updated `messages/pt-BR.json`:
  - Removed `home.photoSplit.*`
  - Added `home.virtual.*` keys in Portuguese with accents.

## Constraints honored

- No other sections were changed.
- No new dependencies.
- No new component files.
- Asset `/media/sections/virtual-session.jpg` was reused as-is.

## Verification

- Manual UI check (dev server): section renders with image + text and CTA; stacks correctly on mobile.
- Lint: `npm -C projects/sound-sanctuary run -s lint` — OK
- Build: `npm -C projects/sound-sanctuary run -s build` — OK

