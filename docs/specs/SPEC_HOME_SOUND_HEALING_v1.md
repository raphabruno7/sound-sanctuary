# SPEC — Home as Sound Healing Core (v1)

Status: Draft (structural)  
Owner: Rapha  
Goal: Make Home (/) clearly communicate Sound Healing as the core offer, explicitly linking sound ↔ nervous system.

---

## Non-goals (explicit)
- No palette decisions
- No typography system decisions
- No animation/motion work
- No new dependencies
- No Convex/schema work

This is Information Architecture + structural copy only.

---

## Primary user intent
- A visitor arrives from Instagram or after an in-person session.
- They should immediately understand:
  1) This is Sound Healing
  2) It relates to nervous system regulation
  3) What happens in a session
  4) What formats exist
  5) How to contact/book

---

## Page: `/` (Home) — Required structure (mobile-first)

### H1 (single)
Sound Healing

### Section 1 — What it is
- 2 short paragraphs:
  - Define Sound Healing (simple, grounded)
  - Directly mention nervous system (regulation / settling / rhythm)

### Section 2 — Sound and the Nervous System
Heading: Sound and the Nervous System
- Explain in concise language:
  - regulation
  - rhythm
  - settling
  - felt sense / integration
- Avoid poetic language; keep “authority but human”.

### Section 3 — What Happens in a Session
Heading: What Happens in a Session
- Steps (4–5 bullets):
  1) Arrival
  2) Grounding
  3) Sound immersion
  4) Integration
  5) Closing

### Section 4 — Session Formats
Heading: Session Formats
- Two cards/blocks:
  - 1:1 Sound Therapy
  - Group Sound Journey
- Each includes: 1 line “for whom” + duration placeholder.

### Section 5 — Who It Is For
Heading: Who It Is For
- bullets:
  - anxiety / stress
  - sleep
  - overstimulation
  - integration after intense periods

### Final CTA
- Primary CTA: Book a Session → `/contact`
- Secondary CTA: Portfolio → `/portfolio` (optional)

---

## Technical scope
- Modify: `src/app/page.tsx` (primary)
- Minor nav link adjustment allowed if needed (keep minimal)

---

## Acceptance criteria
- Home includes the structure above with headings in correct hierarchy.
- No style system changes (no globals overhaul).
- `./scripts/agent_check.sh` passes.
- PR references this spec file.

---

## Notes for agents
After opening a PR:
- Do NOT ask for merge approval.
- Wait for Supervisor review.
