# Route Structure v1

## Full Route Map
- `/` (Home)
- `/sound-healing`
- `/sessions`
- `/portfolio`
- `/about`
- `/newsletter`
- `/contact`
- `/privacy`

## Primary Routes
- `/`: top-level entry and pathway distribution.
- `/sound-healing`: service understanding.
- `/sessions`: service selection and conversion trigger.
- `/contact`: direct conversion destination.

## Secondary Routes
- `/newsletter`: non-immediate conversion and retention path.
- `/portfolio`: trust and evidence support.
- `/about`: authority and methodology context.
- `/privacy`: compliance and trust support.

## Future Extensibility
- Blog placeholder:
  - Route namespace reserved as `/blog`.
  - Future detail routes reserved as `/blog/[slug]`.
- App integration placeholder:
  - Route namespace reserved as `/app`.
  - Authenticated experience routes can be nested under `/app/*`.
- Extension rule:
  - Preserve primary conversion flow integrity (`/` -> `/sound-healing` -> `/sessions` -> `/contact`) while adding future namespaces.
