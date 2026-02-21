# AGENT REPORT — S08 Header + Hero Polish

Date: 2026-02-20

## Briefing executed
- `docs/prompts/CODEX_EXEC_S08.md`

## PRs delivered (created + merged)
| PR | Branch | Merge commit | Status |
|----|--------|-------------|--------|
| PR-1 | `feat/s08-pr1-header` | `303e439` | MERGED |
| PR-2 | `feat/s08-pr2-theme-icons` | `380d0a4` | MERGED |
| PR-3 | `feat/s08-pr3-hero-tuning` | `d100c67` | MERGED |
| PR-4 | `feat/s08-pr4-hero-cta` | `943b34d` | MERGED |
| PR-5 | `feat/s08-pr5-overflow` | `daf5714` | MERGED |
| PR-6 | `feat/s08-pr6-text-secondary` | `3b889b3` | MERGED |
| PR-7 | `feat/s08-pr7-header-scrolled` | `4eb192a` | MERGED |

Links:
- PR-1: https://github.com/raphabruno7/sound-sanctuary/pull/79
- PR-2: https://github.com/raphabruno7/sound-sanctuary/pull/80
- PR-3: https://github.com/raphabruno7/sound-sanctuary/pull/81
- PR-4: https://github.com/raphabruno7/sound-sanctuary/pull/82
- PR-5: https://github.com/raphabruno7/sound-sanctuary/pull/83
- PR-6: https://github.com/raphabruno7/sound-sanctuary/pull/84
- PR-7: https://github.com/raphabruno7/sound-sanctuary/pull/85

## Changes delivered

### Header transparency + scroll glass
- `SiteHeader` is now a client component and applies a `header-scrolled` class when `scrollY > 40`.
- Header is transparent over the cinematic hero and becomes a glass surface on scroll (dark + light variants).

### Theme toggle icons
- Replaced developer-facing text (“Theme: Dark/Light/System”) with compact inline SVG icons (moon/sun/monitor).
- Added `.theme-toggle-btn` styling for consistent hit area and hover affordance.

### Hero photo + overlay tuning
- Added `max-height` to the hero to avoid excessive stretch/crop on wide screens.
- Adjusted hero `object-position` and strengthened overlay stops for better legibility.
- Added a light-mode overlay variant to preserve warmth and readability.

### Hero CTA legibility
- Added a subtle glass/backdrop treatment for the hero secondary CTA (`btn-secondary`) so it stays readable over photography in both modes.

## Hotfixes (post S08)

### PR-5 — Horizontal overflow
- Hotfix: added `overflow-x: hidden` to the global `body` styles to prevent content clipping/scrolling issues.

### PR-6 — Secondary text invisible in dark
- Hotfix: ensured `.text-secondary` maps to `--sh-semantic-text-secondary` (DS token) so it stays legible in dark mode.

### PR-7 — Header scrolled almost invisible
- Hotfix: increased the scrolled header background opacity, blur, and shadow for clearer separation from the hero/photo.

## Verification evidence
- Final gate after all merges (including PR-5..7): `bash scripts/agent_check.sh` → PASS (lint ✓ + build ✓) on `main`.

## Deviations
- None (implementation matches the prompt’s architecture and constraints: CSS + component-level only, no new deps, DS untouched).
