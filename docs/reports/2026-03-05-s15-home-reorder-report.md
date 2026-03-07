# Report — S15 Home Page Reorganization (2026-03-05)

## Scope

Executed prompt `docs/prompts/CODEX_EXEC_S15_HOME_REORDER.md` to reorganize the Home page into a leaner, conversion-focused sequence inspired by aboutgong.com. Redundant sections were removed from Home (not deleted from i18n), and placeholders were added for future content.

## Changes

### Home structure

Updated `src/app/[locale]/page.tsx` to the new section order:

1. Hero (kept)
2. Current Offers (kept)
3. Taster (kept)
4. Photo Split (new)
5. What is Sound Healing (kept, simplified)
6. Benefits (new, replaces “forWhom” usage on Home)
7. Testimonials (moved up)
8. Practitioner (moved up)
9. Workplace (new placeholder)
10. Training (new placeholder)
11. Social Proof (new placeholder logo strip)
12. Newsletter + Contact (kept)

### Removed from Home rendering (content preserved for later reuse)

Stopped rendering (did not delete i18n keys):

- Hero CTA strip (`hero-cta-strip`)
- “For Whom” photo + symptom section (`forWhom`)
- “Why It Works” + Elemental framework (`whyItWorks`)
- “How It Works” steps (`howItWorks`)
- Formats (`formats`)
- Sound Healing Live (`live`)
- Portfolio preview (`PortfolioPreview`)
- Vine divider render calls (`<VineDivider />`)
- Impulse separator render calls (`<ImpulseSeparator />`)

Note: `VineDivider()` and `ImpulseSeparator()` functions remain in `page.tsx` for potential reuse, but are not rendered.

### i18n

Updated translation files to support new sections:

- `messages/en.json`
  - Added `home.hero.alt`
  - Added `home.photoSplit.*`, `home.benefits.*`, `home.workplace.*`, `home.training.*`, `home.socialProof.*`
- `messages/pt-BR.json`
  - Added `home.hero.alt`
  - Added the same keys with proper Portuguese accents (sessão, benefícios, alívio, regulação, redução, liberação, restauração, equilíbrio, organizações, formação, disponíveis)

## Verification

- Lint: `npm -C projects/sound-sanctuary run -s lint` — OK
- Build: `npm -C projects/sound-sanctuary run -s build` — OK
- Manual UI check (dev server): confirmed the new section flow and that the removed sections no longer render on Home.

