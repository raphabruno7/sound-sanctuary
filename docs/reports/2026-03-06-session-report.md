# Session Report — 2026-03-05 / 2026-03-06

## Resumo

Sessão focada em modelar a home page do Sound Sanctuary usando a estrutura do aboutgong.com como referência. Inclui implementação de features, commits atômicos e preparação de prompts para o Codex.

---

## Commits realizados (4)

| Hash | Mensagem | Escopo |
|------|----------|--------|
| `be26ec6` | refine(hero): horizontal arrow, larger rings, remove inline CTA | HeroStatusLine.tsx |
| `115c04c` | feat(ui): mobile hamburger menu with fullscreen overlay | SiteHeader.tsx |
| `6661647` | feat(home): current offers section + alignment fix (S13) | page.tsx, globals.css, i18n |
| `03ced90` | docs: S13 prompts, plans and reports | docs/ |

## Features implementadas (via Codex, já no working tree)

### S13 — Current Offers Section
- 3 Neuron Cards (glass, sem fotos) com título, subtítulo e CTA gold
- Iteração: começou com cards com foto de fundo → refinado para glass cards sem foto (melhor legibilidade dentro do design system)
- Fix de centralização: `.journey-section` sobrescrevia `margin: auto` do `.journey-container`
- Correção de acentos: "Sessoes" → "Sessões"

### S14 — Taster Session Popup
- `TasterSection.tsx` — seção com título + descrição + botão CTA
- `TasterModal.tsx` — modal `ds-modal` com campos Nome + Email
- Submit via Convex `subscribers.subscribe` com `source: "taster"`
- Fecha com Escape / click no backdrop / botão X
- i18n completo EN + PT-BR
- **Status: executado pelo Codex, ainda não commitado**

### Mobile Hamburger Menu
- Botão hamburger visível em ≤768px
- Overlay fullscreen com backdrop blur
- Body scroll lock + auto-close on resize

## Mudanças não commitadas

| Arquivo | Origem |
|---------|--------|
| `src/components/TasterModal.tsx` | S14 — novo |
| `src/components/TasterSection.tsx` | S14 — novo |
| `src/app/[locale]/page.tsx` | S14 — TasterSection inserido |
| `messages/en.json` | S14 — chaves taster/tasterModal |
| `messages/pt-BR.json` | S14 — chaves taster/tasterModal |

## Prompts preparados para Codex

| Arquivo | Sprint | Descrição |
|---------|--------|-----------|
| `docs/prompts/CODEX_EXEC_S13_OFFERS_SECTION.md` | S13 | Criação da seção offers (executado) |
| `docs/prompts/CODEX_EXEC_S13_OFFERS_REFINEMENT.md` | S13 | Refinamento: glass cards, centralização, acentos (executado) |
| `docs/prompts/CODEX_EXEC_S14_TASTER_POPUP.md` | S14 | Popup de lead capture (executado) |
| `docs/prompts/CODEX_EXEC_S15_HOME_REORDER.md` | S15 | Reorganização completa da home (pendente) |

## Análise: aboutgong.com vs Sound Sanctuary

### Estrutura aboutgong.com (referência)
1. Hero → 2. Offers (3 cards) → 3. Taster (lead capture) → 4. Photo split → 5. What is Sound Healing → 6. Benefits → 7. Testimonials → 8. Practitioner → 9. Workplace → 10. Training → 11. Social Proof → 12. Newsletter

### Estrutura Sound Sanctuary (atual — 13 seções + 3 separadores)
1. Hero → 2. Offers → 3. Taster → 4. CTA Strip → 5. For Whom → 6. What It Is → 7. Why It Works (+ 4 cards) → 8. How It Works → 9. Practitioner → 10. Testimonials → 11. Formats → 12. Live → 13. Portfolio → 14. Contact/Newsletter

### Estrutura Sound Sanctuary (planejada S15 — 12 seções, sem separadores)
1. Hero → 2. Offers → 3. Taster → 4. Photo Split → 5. What is Sound Healing → 6. Benefits → 7. Testimonials → 8. Practitioner → 9. Workplace → 10. Training → 11. Social Proof → 12. Newsletter

### O que sai da home no S15
- CTA Strip (redundante com Offers)
- Why It Works + Framework (verbose, migra para /sound-healing)
- How It Works (migra para /sound-healing ou /sessions)
- Formats (redundante com Offers)
- Sound Healing Live (redundante com Offers card 3)
- Portfolio Preview (vive em /portfolio)
- VineDivider / ImpulseSeparator (simplificação visual)

Nenhum i18n key é deletado — o conteúdo fica preservado para uso em subpáginas.

## Próximo passo

Executar `CODEX_EXEC_S15_HOME_REORDER.md` — reorganiza a home para a sequência final de 12 seções.
