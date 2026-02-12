# BRIEFING v5 (Interpreted for Engineering)

Purpose: translate BRIEFING v5 into versioned, engineering-usable artifacts that can evolve (v6, v7...) without breaking planning.

Inputs:
- `docs/SPRINTS/S02.md`
- `docs/QA_RELEASE.md`
- `agents/ASYNC_CONTRACT.md`
- `agents/tasks/S02/*`
- `docs/architecture/CONTENT_ARCHITECTURE_v1.md`
- `docs/architecture/ROUTE_STRUCTURE_v1.md`
- `docs/specs/SPEC_HOME_SOUND_HEALING_v1.md`
- `docs/briefing/BRIEFING_v5_RAW.md` (source snapshot: design system v5.3)
- `Branding/design_system/raphael-design-system-v5.3.html` (canonical design system snapshot)

## Purpose / Core Positioning (Sound Healing + Nervous System)
- Core offer: Sound Healing, framed as nervous system support and regulation (no clinical claims).
- Primary visitor intent (mobile-first): land from social/direct, quickly understand:
  - what sound healing is
  - why it relates to regulation / settling / rhythm
  - what happens in a session
  - what formats exist
  - how to contact/book
- Content principle: grounded, authoritative, human; avoid "template vibe" and avoid overly poetic abstraction.

## Primary Pages & Journeys (Mobile-First)
Primary conversion flow (preserve):
- `/` -> `/sound-healing` -> `/sessions` -> `/contact`

Secondary trust/support routes:
- `/portfolio` (trust, proof, context)
- `/about` (practitioner context, approach)
- `/newsletter` (retain interest when not ready to book)
- `/privacy` (compliance/trust)

Mobile-first journeys:
1. New visitor: `/` -> `/sound-healing` -> `/sessions` -> `/contact`
2. Returning visitor (warm): `/` -> `/sessions` -> `/contact`
3. Trust-seeking: `/` -> `/portfolio` and/or `/about` -> `/sessions` -> `/contact`
4. Not-ready-yet: `/` -> `/newsletter`

## Content Modules (Reusable Sections)
Define reusable modules so pages can be composed structurally without committing to a design system:
- Module: "What it is" (definition + grounding)
- Module: "Sound and the Nervous System" (regulation/rhythm/settling/integration)
- Module: "What Happens in a Session" (arrival -> grounding -> immersion -> integration -> closing)
- Module: "Session Formats" (1:1 and group; for-whom + duration placeholder)
- Module: "Who it is for" (stress/sleep/overstimulation/integration; no medical promises)
- Module: "Trust signals" (short proof points, portfolio entry points)
- Module: "Primary CTA" (book -> contact)
- Module: "Secondary CTA" (portfolio/newsletter)

## Media Slots (Structural Only)
Media is treated as slots/placements; no palette/typography system decisions in v5:
- Home:
  - Hero media slot: optional (image/video) with fallback to text-only.
  - Section media slots: optional (one per major section max).
- Sound Healing:
  - One explanatory visual slot (optional) aligned to "system nervous framing".
- Sessions:
  - One optional illustrative slot per format (placeholder only).
- Portfolio:
  - Grid/list of entries with 1 thumbnail slot each (optional).

## Data Needs (Future)
No schema changes in v5 planning. Data needs are "future" and can stay as static content initially:
- Session formats: names, durations, who-its-for, logistics notes (future structured data).
- Portfolio entries: title, context, media, reflections/outcomes (future structured data).
- Testimonials/social proof: quote, attribution policy, date/context (future structured data).

## Decisions Locked (v5)
- Positioning: Sound Healing is the core offer; nervous system framing is the explanatory layer.
- Preserve conversion path integrity: `/` -> `/sound-healing` -> `/sessions` -> `/contact`.
- Scope boundary: structural information architecture and structural copy scaffolding only.
- No new dependencies.
- No schema/Convex changes.
- QA gate: `./scripts/agent_check.sh` must pass; Supervisor must conclude MERGE/REQUEST CHANGES/BLOCKED.

## Decisions Open (Need Refinement)
- Visual direction from BRIEFING v5 (brand identity) is reference-only until a later sprint explicitly authorizes design system work.
- Exact copy (tone, length, specific wording) per page beyond the required headings/modules.
- Pricing, durations, and logistics details (placeholders allowed).
- Portfolio content selection and sourcing rules.
- Media sourcing and rights.

## Risks / Assumptions
- Risk: BRIEFING v5 raw content is heavily visual/brand-focused; applying it prematurely can violate S02/S03 "no design system" constraints.
- Risk: "nervous system" language can drift into clinical claims; enforce disclaimers and keep language non-medical.
- Assumption: pages can ship with placeholders for durations/pricing/media until content is finalized.
- Assumption: portfolio/testimonials can remain minimal or placeholder without harming conversion integrity (needs validation).

## What NOT To Do Yet
- No design system decisions (palette, typography system, spacing tokens).
- No motion/animation work.
- No new dependencies.
- No schema/Convex changes.
- No refactors outside task scope.
