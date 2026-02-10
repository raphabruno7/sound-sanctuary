# Multi-Agent Plan (Codex) — Roles & Guardrails

## Working agreement
- Every change via branch + PR.
- Small commits, single purpose.
- No copying third-party site code. We replicate design intent with original content.

## Roles (run as separate Codex tasks/sessions)
1) Architect
- Owns IA, routing, data model decisions.
- Keeps HIGH_LEVEL.md up-to-date.

2) UI Builder
- Builds components/pages following the aesthetic rules (quiet, minimal).
- Maintains accessibility and responsive behavior.

3) Backend/DB
- Implements subscribers + portfolio models and endpoints.
- Adds env vars, schema, migrations (if applicable).

4) QA (Playwright)
- Validates routes, responsive layout, forms, basic perf checks.

5) Release
- Ensures deploy checklist, SEO, metadata, OG images, sitemap.

## Definition of Done (v0)
- Home/About/Portfolio/Privacy exist, render cleanly, mobile-first.
- Minimal motion, no template artifacts.
- Docs describe next milestones (newsletter, portfolio content).
