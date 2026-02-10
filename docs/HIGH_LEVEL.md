# Sound Sanctuary — High-Level Spec (v0.1)

A minimal, authoral website for Sound Healing / Nervous System support.  
Goal: a “digital sanctuary” outside social media + portfolio + newsletter.

## Goals
- Calm landing experience (hero as a field; minimal text).
- Portfolio of events/sessions/retreats/collabs.
- Soft conversion: WhatsApp / email contact.
- Newsletter: email capture with consent + unsubscribe.
- Future-proof foundation without site-builder lock-in.

## Non-goals (v0)
- No ecommerce.
- No heavy CMS.
- No “SaaS card grid” visual language.

## IA (Information Architecture)
Pages:
- `/` Home (Hero -> About -> Offerings -> Portfolio preview -> Contact/Newsletter)
- `/portfolio`
- `/about`
- `/privacy`

CTAs:
- Primary: WhatsApp / “Get in touch”
- Secondary: “View portfolio”
- Newsletter: calm, consent-forward

## Stack (v0)
- Next.js (App Router) + TypeScript + Tailwind
- Framer Motion (subtle animations)
- DB/backend later: Convex or cheap Postgres (Neon/Supabase)
- Email later: Resend

## Aesthetic rules
- Large photography, minimal text, generous whitespace
- Subtle motion only (fade, slow transitions)
- Avoid cards/icons/placeholders
