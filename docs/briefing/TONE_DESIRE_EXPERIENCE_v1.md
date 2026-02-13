# Tone + Desire Experience Brief (v1)

Status: Draft

Purpose: define the **tone**, **desire**, and **conversion arc** of the site so a first-time visitor:
1) understands who you are and what you do,
2) understands why sound healing relates to nervous system regulation (without clinical claims),
3) feels enough safety and pull to take a next step:
   - join **Sound Healing Live** (ongoing ritual), and/or
   - book a **1:1** session (personalized support).

This document is **copy + UX direction** (visual + textual), tuned to 2026 expectations: fast clarity, calm authority, high trust, minimal friction.

## Design-System Anchors (Canonical)
The design-system repo is the **single source of truth** for visual design. This brief defines the narrative/UX arc. All execution should use what the design-system publishes.

Canonical consumer imports (website):
- `design-system/styles/dist/tokens.css`
- `design-system/styles/dist/base.css`
- `design-system/styles/dist/typography.css`
- `design-system/styles/dist/components.css`

Reference (visual baseline, not imported into the app):
- `design-system/examples/web/raphael-design-system-v5.3.html`

---

## The 2026 Frame (Category Context)
Modern life runs the nervous system hot: digital stimulation, blurred boundaries, artificial light, constant news, social comparison, uncertainty. Many people are not “broken” but **over-activated**.

Positioning (no medical claims):
- This work is **upstream care**: regulation, recovery, resilience *before* breakdown.
- It is not “treatment.” It is **training capacity**: downshifting, settling, returning to rhythm.
- The promise is felt-sense: calmer baseline, better sleep hygiene, steadier attention, more flexible stress response (framed as support, not guarantees).

---

## North Star (One Sentence)
Sound Healing as neurowellness: a calm, structured practice that trains the nervous system toward regulation, recovery, and resilience.

## Audience Reality (2026)
- People arrive skeptical of wellness hype and allergic to “optimization culture.”
- They want language that is grounded and specific: what happens, how it feels, what to do next.
- They want belonging without performance: group experiences as connection, not perfection.
- They want a habit in their environment: ongoing support beats one-off inspiration.

---

## Tone Pillars (Rules)
- Calm authority: short sentences, clear claims, no grandiosity.
- Somatic precision: describe sensations and shifts (settle, soften, steady, integrate).
- Premium simplicity: fewer words; remove filler; no jargon.
- Invitational: offer choices; avoid coercion.
- Truthful: what it is, what it is not, who it is for, what it requires (time, attention, rest).

## Language Do / Don’t
Do:
- regulation, rhythm, settle, downshift, integrate, recover, capacity, resilience, rest, pace, gentle, structured
Don’t:
- “transform your life,” “hack,” “biohack,” “optimize,” “guaranteed results,” medical claims/diagnoses

---

## The Desire Arc (Roteiro)

### Act 1: Arrival (0–10s)
Goal: safety + category clarity.
- “This is sound healing.”
- “It relates to nervous system regulation.”
- “Here is the next step.”

### Act 2: Orientation (10–45s)
Goal: mechanism without overexplaining.
- One grounded paragraph: sound as rhythm + resonance + paced silence.
- One concrete process: what happens in a session.

### Act 3: Belonging + Identity (45–90s)
Goal: “This fits me.”
- Two offers presented as identity choices, not upsells.
  - Live: ongoing ritual; community; low friction.
  - 1:1: personalized support; deeper pacing; specific intention.

### Act 4: Decision (90s+)
Goal: select a path now.
- Primary: book 1:1.
- Secondary: join Live (schedule) or join waitlist.
- Trust links: portfolio, about, privacy.

---

## Offer Ladder (What We’re Selling)
Rule: Live is the habit. 1:1 is the deep support.

- Entry: Sound Healing Live
  - weekly live practice
  - collective energy without performance
  - helps turn “I need this” into a rhythm
- Core: 1:1 Sound Therapy
  - personalized pacing
  - tailored intention + integration support
  - for transitions, sleep stress, chronic overstimulation (support language only)
- Occasional: Group Sound Journey
  - event-style reset
  - lower barrier, high felt impact

---

## Home Page Script (Visual + Text)
Home structure must remain aligned with `docs/specs/SPEC_HOME_SOUND_HEALING_v1.md`. This is the copy/UX layer on top.

### Frame 0: Header (always visible)
Visual:
- quiet sticky header; low-noise; no “product nav.”
Copy:
- brand: Sound Sanctuary
- one utility: theme toggle

### Frame 1: Hero (fold)
Visual:
- one calm field image; readable overlay; two buttons only
Copy:
- H1: Sound Healing
- Subhead (1–2 lines):
  - “A calm, structured practice to help your nervous system downshift.”
- Primary CTA: “Book a 1:1”
- Secondary CTA: “Join Sound Healing Live”

### Frame 2: What It Is
Copy (2 paragraphs):
- definition: what sound healing is, plainly
- link to the 2026 frame: regulation / rhythm / settling (support language)

### Frame 3: Sound + Nervous System
Copy:
- 4–6 sentences maximum
- focus on training capacity: rhythm, settling, integration

### Frame 4: What Happens in a Session
Copy:
- Arrival → Grounding → Sound immersion → Integration → Closing

### Frame 5: Session Formats (choice architecture)
Visual:
- two blocks; equal weight; both feel “premium”
Copy:
- 1:1 Sound Therapy
  - For whom: personalized pacing when you want deeper support.
  - Duration: placeholder.
- Group Sound Journey
  - For whom: collective rest and connection without performance.
  - Duration: placeholder.

### Frame 6: Who It’s For
Copy (bullets):
- stress / anxiety
- sleep
- overstimulation
- integration after intense periods

### Frame 7: Live (ongoing ritual)
Goal: desire without “app pitch.”
Copy:
- Heading: Sound Healing Live
- 2–3 lines:
  - “A weekly live practice to keep your nervous system tended.”
  - “Join when you need a reset. Return when you want rhythm.”
- CTA: “See live schedule” (route TBD)

### Final CTA (decision)
- Primary: Book a session → `/contact`
- Secondary: Explore portfolio → `/portfolio`

---

## CTA System (A/B Options)

Set A (direct, premium):
- Book a 1:1
- Join Sound Healing Live
- Explore portfolio

Set B (softer):
- Start with a session
- Practice live
- See previous work

Set C (category-led):
- 1:1 regulation support
- Weekly live ritual
- Proof & context

---

## Page Intent Notes

### /sound-healing
Goal: reduce skepticism with grounded clarity.
- explain what it is (simple)
- explain why it helps regulation (non-clinical)
- CTA: Book 1:1 / Join Live

### /sessions
Goal: make the choice easy.
- formats + “for whom”
- one primary CTA to `/contact`

### /portfolio
Goal: proof without noise.
- calm grid; let content speak
- keep links back to sessions/contact

### /contact
Goal: frictionless inquiry.
- ask 3 questions max
- confirm response time

---

## Trust + Ethics Guardrails
- No medical claims, diagnoses, or promises.
- Use support language: “may help,” “many people feel,” “often supports.”
- Keep “nervous system” framing educational, not clinical.

---

## Acceptance (What “Good” Looks Like)
- A visitor can say what you offer in 10 seconds.
- A visitor can describe the session arc in 30 seconds.
- Two clear next steps exist (Live and 1:1) without feeling salesy.
- The site feels calm, authored, non-template.
