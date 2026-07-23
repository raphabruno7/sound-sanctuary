# Sound Sanctuary Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Deliver a prioritized audit of sound-sanctuary that calls out bugs, regressions, production risks, and missing tests across frontend and Convex backend surfaces.

**Architecture:** The codebase is a Next.js 16.1 application that ships app-router pages inside `src/app/[locale]`, leans on React 19.2 with Next Intl for localization, and delegates data persistence to Convex functions under `convex/`. The experience is orchestrated through component modules under `src/components` plus a shared design system, so I will treat the app, components, and Convex endpoints as the three pillars of the audit.

**Tech Stack:** Next.js 16.1, React 19.2, Next Intl 4.8, Convex 1.32, Tailwind 4 + tailwind-merge, clsx, framer-motion, Typescript 5.

### Task 1: Baseline architecture and dependency context
**Files:** `README.md`, `package.json`, `src/app/'[locale]'`

**Step 1: Capture the root layout.** Run `ls -a /Users/raphaelbruno/projects/sound-sanctuary` and note the directories (src, convex, design-system, docs) that need to be scanned deeper.
**Step 2: Read onboarding guidance.** Run `cat README.md` to confirm the project is a Next.js create-next-app project and to capture any stated assumptions or dev server instructions.
**Step 3: Inventory dependencies.** Run `cat package.json` and extract the list of direct dependencies (Convex, Next Intl, Tailwind 4, etc.) so I know which runtime stacks to verify.
**Step 4: List localized pages.** Run `ls src/app/'[locale]'` to identify every section page (home, about, sessions, newsletter, portfolio, etc.) so I can prioritize those for UI/regression checks.
**Step 5: Record this context for later reference and commit the plan.** `git add docs/plans/2026-03-18-sound-sanctuary-audit.md` followed by `git commit -m "docs: add sound-sanctuary audit plan"` so the architecture snapshot is versioned before deeper work.

### Task 2: Review high-impact pages and interactive components
**Files:** `src/app/'[locale]'/page.tsx`, `src/app/'[locale]'/sessions/page.tsx`, `src/components/NewsletterForm.tsx`, `src/components/TasterModal.tsx`, `src/components/PortfolioPreview.tsx`, `src/components/TestimonialsPreview.tsx`

**Step 1: Inspect the homepage.** Run `sed -n '1,200p' src/app/'[locale]'/page.tsx` to understand the hero, CTA, and variant copy blocks; flag any brittle `use client` patterns or missing content fallbacks.
**Step 2: Survey auxiliary landing pages.** For `sessions`, `portfolio`, and `newsletter`, run `sed -n '1,200p'` on each `page.tsx` file to verify data fetching, props, and layout wrappers (especially modal triggers and localization hooks). Note any manual guards that could regress when content changes.
**Step 3: Audit interactive components.** Run `sed -n '1,200p'` on each component file listed above and note whether the event handlers (newsletter submission, modal toggling, carousel previews) have guardrails, default props, or fallback data. Identify missing TypeScript strict checks or untested `fetch` usage.
**Step 4: Run existing static checks.** Run `npm run lint` from the repo root to confirm linters are clean and capture any warnings that might hide regressions (e.g., `no-undef`, missing dependencies, unused states).
**Step 5: Consolidate the findings into the audit report and stage notes.** Write the key risks (e.g., untested forms, missing default data) into `docs/AGENT_REPO_AUDIT_2026-xx.md` or a dedicated audit note, then `git add` those notes plus this plan before committing.

### Task 3: Inspect Convex backend functions and test gaps
**Files:** `convex/schema.ts`, `convex/portfolio.ts`, `convex/testimonials.ts`, `convex/subscribers.ts`, `convex/tsconfig.json`

**Step 1: Examine the schema.** Run `cat convex/schema.ts` to ensure the Convex tables (portfolio entries, testimonials, subscribers) define all required fields and indexes used by the front-end.
**Step 2: Review every Convex function.** Run `cat` on `convex/portfolio.ts`, `convex/testimonials.ts`, and `convex/subscribers.ts`, paying attention to input validation, error handling, and whether they assume form payloads exist.
**Step 3: Cross-check tests.** List `convex/_generated` contents or search for `.test.ts` under `convex` (e.g., `rg --files convex | rg ".test\.ts"`). Note that if no tests exist, that is itself a gap; propose targeted unit tests for each handler.
**Step 4: Run type-checking.** Run `npm run lint` (covered in Task 2 Step 4) and `npm run build -- --no-lint` if needed to ensure no Convex runtime type errors leak through. Document any missing `ConvexHttp` guards or missing `zod`/schema validation that could cause production errors.
**Step 5: Capture the production risk summary.** Append a dedicated section in the audit report that pairs each Convex entry point with a proposed regression test (e.g., verifying subscriber creation) and stage the results with `git add docs/AGENT_REPO_AUDIT_2026-03-18.md` plus the plan file.

