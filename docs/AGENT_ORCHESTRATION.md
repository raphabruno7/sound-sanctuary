# Agent Orchestration (Codex) — PR-first Operating System

This repo is designed to be worked on by multiple agents (or multiple Codex sessions) in parallel.

## Core rules (non-negotiable)
1) PR-first: every change happens on a branch, via PR.
2) Small commits: single purpose, easy to review.
3) No third-party site cloning: replicate design intent, use original content.
4) No secrets in repo: use env vars / secret stores.

## Recommended role split
- Architect: IA, page map, data model decisions, keeps docs aligned.
- UI Builder: components/pages, responsive layout, motion (subtle), accessibility.
- Backend/DB: Convex schema/functions, newsletter flows, admin tooling.
- QA: Playwright checks, UX regressions, broken links, perf sanity.
- Release: env sanity, SEO/OG, deploy checklist.

## Branch naming
- chore/... (infrastructure, tooling, docs)
- feat/... (user-facing features)
- fix/... (bugfix)
- qa/... (test harness)

## Task intake format
Every new piece of work should start as a task file in `agents/tasks/` (see templates).

## PR Autopilot (recommended)
To reduce operator back-and-forth, task files should include an `autopilot` block (see `agents/tasks/TEMPLATE.md`).

You can use:
- `./scripts/pr_autopilot.sh start agents/tasks/.../<task>.md` (creates branch from `BASE`)
- `./scripts/pr_autopilot.sh finish agents/tasks/.../<task>.md` (runs checks, commits staged changes, pushes, opens PR)

## Definition of Done (DoD)
A PR is Done when:
- passes `npm run lint` and `npm run build`
- includes updated docs (if architecture/behavior changed)
- includes screenshots or notes for UI changes (when relevant)
- has a clear rollback plan if it touches infra

## Multi-agent workflow pattern
1) Architect writes a task: scope, acceptance criteria, out-of-scope.
2) UI + Backend take sub-tasks, each in their own branches.
3) QA validates with checklist.
4) Release verifies env + SEO + deploy steps.
