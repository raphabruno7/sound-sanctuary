# Tone + Desire Experience Brief (v1)

Status: Draft

Purpose: define the **tone** and the **emotional arc** of the site so a first-time visitor:
1) understands who you are and what you do,
2) *feels* what sound healing can do (without clinical claims),
3) wants the next step: **Sound Healing Live** (app) and/or a **1:1 session**.

This document is **copy + UX direction** (visual + textual), written for 2026 expectations: fast clarity, calm authority, minimal friction, high trust.

## Design-System Anchors (Canonical)
The design-system repo is the **single source of truth** for visual design. This brief defines the narrative/UX arc, but all visual execution should be constrained to what the design-system publishes.

Canonical consumer imports (website):
- `design-system/styles/dist/tokens.css`
- `design-system/styles/dist/base.css`
- `design-system/styles/dist/typography.css`
- `design-system/styles/dist/components.css`

Reference (visual baseline, not imported into the app):
- `design-system/examples/web/raphael-design-system-v5.3.html`

---

## North Star (One Sentence)
Sound Healing for nervous system regulation, delivered with calm structure, deep listening, and a sanctuary-like experience.

## Audience Reality (2026)
- People arrive from social already overstimulated and skeptical of hype.
- They want a **felt-sense promise** plus **clear next steps**.
- They convert when: trust is established, the process is concrete, and the offer ladder is obvious.

## Tone Pillars (Rules)
- Calm authority: grounded language, no grand claims.
- Somatic precision: describe sensations and outcomes in human terms (settle, soften, steady, integrate).
- Premium simplicity: fewer words, better words. No marketing jargon.
- Invitational, not persuasive: lead with permission and choice.
- Honest specificity: what happens, for whom, what it is not.

## Words To Use / Avoid
Use:
- regulation, settle, rhythm, attention, rest, integration, pace, gentle, structured, grounded
Avoid:
- "transform", "hack", "biohack", "optimize", "results guaranteed", clinical/medical promises

---

## The Emotional Arc (Roteiro)

### Act 1: Arrival (0–10s)
**Goal:** instant recognition + safety.
- Visitor should understand: *Sound Healing*, *nervous system*, *book/contact*.
- Visual: one calm hero field, lots of air, minimal UI noise.
- Copy: short, declarative, no metaphors.

### Act 2: Orientation (scroll 10–45s)
**Goal:** meaning + mechanism.
- Explain sound + nervous system in plain language.
- Give the session arc (Arrival → Grounding → Immersion → Integration → Closing).
- Put a primary CTA in view again, but still soft.

### Act 3: Desire (45–90s)
**Goal:** “I want this in my life.”
- Present formats (1:1 vs group) as identity-fitting choices.
- Add light proof (portfolio/testimonials) as reassurance, not dominance.
- Introduce **Sound Healing Live** as ongoing support (a ritual, not an app pitch).

### Act 4: Decision (90s+)
**Goal:** pick a next step.
- Two clean paths:
  - **1:1**: “Personalized regulation support.”
  - **Live**: “Weekly live practice / ongoing nervous system hygiene.”
- Make the cost of inaction implicit: staying in overload.

---

## Offer Ladder (What We’re Selling)
- Entry (low friction): Sound Healing Live (weekly ritual, ongoing, community).
- Core (high value): 1:1 Sound Therapy (personalized, deeper work).
- Occasional: group sound journey (event-style, collective rest).

Positioning rule: **Live is the habit**, **1:1 is the deep support**.

---

## Home Page Script (Visual + Text)

### Frame 0: Header (always visible)
Visual:
- Header is quiet, sticky, low contrast glass.
- 3 links max in primary nav.
Copy:
- Brand: Sound Sanctuary.
- One action: Theme toggle.

### Frame 1: Hero (fold)
Visual:
- One image field, soft overlay. Text is readable in light/dark.
- Two buttons as the only “hard” UI elements.
Copy:
- H1: Sound Healing
- Subhead (1–2 lines):
  - "A calm, structured practice to help your nervous system settle."
- Primary CTA: "Book a 1:1"
- Secondary CTA: "Join Sound Healing Live"

### Frame 2: What It Is
Visual:
- Simple section, no cards.
Copy (2 short paragraphs):
- Definition.
- Explicit nervous system mention (regulation / rhythm / settling).

### Frame 3: Sound + Nervous System
Visual:
- Calm typography hierarchy, short lines.
Copy:
- 4–6 sentences max.
- Focus on: rhythm, settling, integration.

### Frame 4: What Happens In a Session
Visual:
- Ordered list, simple.
Copy:
- Arrival
- Grounding
- Sound immersion
- Integration
- Closing

### Frame 5: Formats (choice architecture)
Visual:
- Two blocks; they must read equally “good”.
Copy:
- 1:1 Sound Therapy
  - For whom: when you want personalized support.
  - Duration: placeholder.
- Group Sound Journey
  - For whom: when you want collective rest.
  - Duration: placeholder.

### Frame 6: Who It’s For
Visual:
- Bullets.
Copy:
- anxiety / stress
- sleep
- overstimulation
- integration after intense periods

### Frame 7: App Tease (Live)
Visual:
- One calm block, no “product grid”.
Copy:
- Heading: "Sound Healing Live"
- 2–3 lines:
  - "A weekly live practice to keep your nervous system tended."
  - "Join when you need a reset. Return when you want rhythm."
- CTA: "See live schedule" (route TBD)

### Final CTA
Copy:
- Primary: "Book a session" → `/contact`
- Secondary: "Explore portfolio" → `/portfolio`

---

## CTA Copy Bank (Choose one set)

### Set A (premium, direct)
- Primary: Book a 1:1
- Secondary: Join Sound Healing Live
- Tertiary: Explore portfolio

### Set B (softer)
- Primary: Start with a session
- Secondary: Practice live
- Tertiary: See previous work

### Set C (mechanism-first)
- Primary: Regulate with 1:1
- Secondary: Weekly live practice
- Tertiary: Proof & context

---

## Page Intent Notes (Secondary Routes)

### /sound-healing
Goal: give a grounded explanation that reduces skepticism.
- Open with “what it is” in 2 paragraphs.
- Add “what it’s for” and “what to expect”.
- CTA: Book 1:1 / Join Live.

### /sessions
Goal: make the choice easy.
- Show formats with clear “for whom”.
- One strong CTA: `/contact`.

### /portfolio
Goal: proof without noise.
- Keep cards calm.
- Let content do the work.

### /contact
Goal: frictionless inquiry.
- Ask 3 questions max.
- Confirm response time.

---

## Guardrails (Ethics + Trust)
- No medical claims, diagnoses, or promises.
- If you mention outcomes, frame as “support”, “often”, “may help”, “many people feel”.
- Prefer clarity over mystique.

---

## Acceptance (What “Good” Looks Like)
- A visitor can articulate the offer in 10 seconds.
- A visitor can describe the session arc in 30 seconds.
- The visitor sees two clear next steps: Live or 1:1.
- The site feels calm, authored, non-template.
