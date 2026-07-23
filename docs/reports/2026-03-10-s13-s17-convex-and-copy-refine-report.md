# Sound Sanctuary — S13–S17 + Convex Local Fix Report (2026-03-10)

## Scope

This report summarizes the execution of prompts S13–S17 (home improvements) plus the follow-up fixes for:
- Offers section alignment drifting left (desktop)
- PT-BR “Banho de Som” copy insertion + typographic refinement
- Runtime crash caused by Convex querying `testimonials:listPublished` against the wrong local backend

Repo: `projects/sound-sanctuary`

## Deliverables implemented (S13–S17)

### S13 — Offers section
- Added the “Ofertas Atuais” section structure on Home.
- Improved offer cards layout + CTA placement.

### S13 refinement — Alignment fix
- Root cause: `.journey-section { margin: ... 0 }` overrode centering from `.journey-container { margin: 0 auto }`.
- Fix: ensured `.journey-section` uses `margin: ... auto` to preserve centering on wide layouts.

Files:
- `projects/sound-sanctuary/src/app/globals.css`

### S14 — Taster popup / section
- Implemented “taster” CTA flow and modal behavior.

### S15 — Home reorder
- Reordered home sections to match the new narrative flow.

### S16 — Visual refinement
- Mobile-first adjustments (typography scale, spacing, card density).
- Simplified “benefits” into a clean bullet grid (less glass UI).

Files (high-level):
- `projects/sound-sanctuary/src/app/[locale]/page.tsx`
- `projects/sound-sanctuary/src/app/globals.css`

### S17 — Virtual section
- Added a “Virtual Sessions” split section with image.
- Replaced `home.photoSplit.*` translation keys with `home.virtual.*`.

Files:
- `projects/sound-sanctuary/src/app/[locale]/page.tsx`
- `projects/sound-sanctuary/messages/en.json`
- `projects/sound-sanctuary/messages/pt-BR.json`

## PT-BR copy update — “O Que é Banho de Som?”

### What changed
- Added the provided “banho de som” copy into the PT-BR Home “What it is” section.
- Refined textual organization (paragraph breaks, spacing) without changing meaning.

Files:
- `projects/sound-sanctuary/messages/pt-BR.json` (keys: `home.whatItIs.sub`, `home.whatItIs.p1`, `home.whatItIs.p2`)
- `projects/sound-sanctuary/src/app/[locale]/page.tsx` (renders multi-paragraph strings using `\n\n` splits)

## Convex runtime crash — root cause and fix

### Symptom
Next.js runtime error:
`Could not find public function for 'testimonials:listPublished'`

### Root cause
The Next app was pointing to a Convex local backend on `3210/3211` that belonged to a different project instance:
- `local-rapha_bruno-sound_journey_club_400d8` on ports `3210/3211`

So the `testimonials:listPublished` function did not exist in that backend.

### Fix
Started (and configured) a dedicated Convex local backend for Sound Sanctuary on new ports, avoiding conflict:
- Convex (Sanctuary): `3212` (cloud), `3213` (site proxy)
- Updated `projects/sound-sanctuary/.env.local` accordingly

Current expected env:
- `NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3212`
- `NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3213`

Note:
- After `.env.local` changes, Next dev must be restarted to pick up new env vars.

## Important clarification (dev URLs)

- Sound Sanctuary runs at: `http://127.0.0.1:3000/pt-BR`
- `http://localhost:8082/onboarding/duration` is a different app (“Sound Journey Club”) and does not reflect Sound Sanctuary changes.

