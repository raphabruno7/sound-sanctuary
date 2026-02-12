# Module System v1

## Reusable Section Modules
- `Hero`
- `PathwayIntro`
- `TrustBullets`
- `HowItWorks`
- `SessionTypes`
- `Expectations`
- `ProofStrip`
- `NewsletterCapture`
- `ContactEntry`
- `PrivacyNotice`

## Responsibilities Per Module
- `Hero`: state page intent and orient next action at content level.
- `PathwayIntro`: explain page purpose within broader user journey.
- `TrustBullets`: provide concise credibility facts and assurances.
- `HowItWorks`: explain sequence/process in plain, ordered steps.
- `SessionTypes`: describe available formats and intended audience fit.
- `Expectations`: define prep, during-session, and post-session expectations.
- `ProofStrip`: summarize proof placeholders (testimonials, outcomes, contexts).
- `NewsletterCapture`: define value exchange and signup intent.
- `ContactEntry`: define inquiry categories and expected response scope.
- `PrivacyNotice`: provide compliance context and policy linkage.

## Module Composition Rules
- Modules are content blocks with semantic structure and message responsibility.
- Modules should be composable across routes without changing underlying purpose.
- Modules should maintain consistent heading hierarchy to support mobile scanning.
- Modules should expose placeholders where operational copy is still pending.

## Design System Source Of Truth
- Design tokens and base styles are sourced exclusively from the `./design-system` submodule.
- Canonical token source for web consumers: `design-system/styles/dist/tokens.css`.
- Canonical base-style source for web consumers: `design-system/styles/dist/base.css`.
- Consumer repositories must import canonical files and must not duplicate token definitions.
- Consumer repositories must not define local `:root` token blocks or alternate token registries.
- Any token change request must be implemented in the central `design-system` repository, not in this repo.

## What Modules Must NOT Contain (Design Logic)
- No styling system decisions (color, spacing, typography specs).
- No animation behavior definitions.
- No component-library or visual token coupling.
- No responsiveness implementation details beyond structural ordering.
- No data-model/schema concerns.
