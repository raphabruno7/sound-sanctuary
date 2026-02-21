# CODEX_EXEC_S08 — Sound Sanctuary: Header + Hero Polish + Layout Fixes

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the five original UX issues on the home page (header, theme toggle, hero photo, overlay, CTA) AND fix three regressions found in post-S08 visual audit (horizontal overflow, text contrast, scrolled header visibility).

**Architecture:** All changes are CSS + component-level. No new dependencies, no DS changes, no new routes.

**Tech Stack:** Next.js App Router · TypeScript · Tailwind v4 · CSS custom properties · DS v8.9.0 (submodule at `design-system/`)

**IMPORTANT:** S08 PRs 1–4 are already merged into `main`. This execution adds PRs 5–7 to fix regressions discovered in the post-merge visual audit. Do NOT re-do PRs 1–4 — start from current `main`.

---

## Contexto

Repo: `/Users/raphaelbruno/projects/sound-sanctuary`
Branch base: `main`

### DNA estética
- Base: **obsidian / deep moss** — fundo `#1A1A16`, superfícies `#2A2A24`
- Accents: **gold `#C4A35A`** + **green `#2D5A3E`**
- Materials: **liquid-glass cards**
- Intent: **nervous-system medicine** — calmo, orgânico, refinado

### Três bugs encontrados no audit pós-S08 (screenshots)

1. **Horizontal overflow** — Conteúdo das seções está cortado na esquerda. Texto aparece como "und Healing uses resonance..." (faltando "So"). Causa: `.impulse-section` usa `width: 100vw` que inclui a largura da scrollbar, criando overflow horizontal no `<body>`. Isso desloca todo o conteúdo.

2. **Baixo contraste em bullet list** — Na seção "Who It Is For", os itens ("anxiety / stress", "sleep", "overstimulation", "integration after intense periods") estão quase invisíveis no dark mode. A classe `text-secondary` aplicada via Tailwind pode estar sendo resolvida diferente do token `--sh-semantic-text-secondary`.

3. **Header scrolled pouco visível** — O glass effect do header ao scrollar é muito sutil — quase não se percebe a transição. O `box-shadow` e o contraste com o fundo precisam ser reforçados.

---

## Pré-requisito

```bash
cd /Users/raphaelbruno/projects/sound-sanctuary
git submodule update --init --recursive
npm install
bash scripts/agent_check.sh   # deve passar antes de qualquer mudança
```

---

## Escopo (PRs 5–7 apenas — PRs 1–4 já estão merged)

### PR-5 — Fix horizontal overflow (CRITICAL)

**Objetivo:** Eliminar o overflow horizontal que desloca o conteúdo da página.

**Arquivo:** `src/app/globals.css`

**Diagnóstico:** A classe `.impulse-section` usa `width: 100vw` que inclui a largura da scrollbar vertical (quando presente). Isso cria overflow horizontal. O padrão `margin-left: calc(50% - 50vw)` amplifica o problema.

**Mudanças:**

1. Adicionar overflow containment no `<main>` (via `@layer base`):

Localizar o bloco `@layer base` existente e SUBSTITUIR por:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    overflow-x: hidden;
  }
}
```

A única mudança é adicionar `overflow-x: hidden` ao `body`. Isso impede que o `100vw` do impulse-section crie scrollbar horizontal.

2. **NÃO alterar** o `.impulse-section` — o `overflow-x: hidden` no body é suficiente e é a solução mais segura (não quebra o full-bleed visual).

**Gate PR-5:**
```bash
npm run lint && npm run build
```
Verificação: scrollar a home page inteira — todo o conteúdo respeita o `journey-container`, sem texto cortado na esquerda. Impulse section continua full-bleed.

---

### PR-6 — Fix text contrast on bullet list + secondary text

**Objetivo:** Itens de lista e texto secundário legíveis no dark mode.

**Arquivo:** `src/app/globals.css`

**Diagnóstico:** A classe Tailwind `text-secondary` (usada em `page.tsx` nos `<li>` e `<p>`) pode não estar resolvendo para o token `--sh-semantic-text-secondary` corretamente. No Tailwind v4 com `@theme inline`, `text-secondary` pode apontar para um valor diferente.

**Mudanças:**

Adicionar no final do arquivo, antes dos `@media` de reduced-motion:

```css
/* ── Text contrast fixes ── */
.text-secondary {
  color: var(--sh-semantic-text-secondary);
}

.text-muted {
  color: var(--sh-semantic-text-muted);
}
```

Isso garante que as classes utilitárias `text-secondary` e `text-muted` usadas no markup sempre apontem para os tokens do DS, independente do que o Tailwind resolva.

**Atenção:** Se `.text-secondary` conflitar com Tailwind (Tailwind pode gerar `.text-secondary` como utility apontando para outro valor), usar especificidade mais alta ou verificar se a classe é de fato gerada pelo Tailwind. Se não for gerada pelo Tailwind (não existe `--color-secondary` no `@theme`), a regra acima é suficiente. Se houver conflito, use:

```css
.text-secondary:where(:not(.tailwind-override)) {
  color: var(--sh-semantic-text-secondary);
}
```

Ou, mais simples — adicione `--color-secondary` ao `@theme inline`:

```css
@theme inline {
  /* ... existing vars ... */
  --color-secondary: var(--sh-semantic-text-secondary);
  --color-secondary-foreground: var(--sh-semantic-text-primary);
}
```

Escolha a abordagem que produzir `npm run build` sem warnings e texto visível.

**Gate PR-6:**
```bash
npm run lint && npm run build
```
Verificação: na seção "Who It Is For", os bullets ("anxiety / stress", "sleep", etc.) são legíveis no dark mode. Texto secundário em todas as seções tem contraste suficiente.

---

### PR-7 — Reforçar header scrolled visibility

**Objetivo:** O header scrolled é claramente distinto do fundo da página.

**Arquivo:** `src/app/globals.css`

**Mudanças:**

Localizar as regras `.header-transparent.ds-header.header-scrolled` existentes e SUBSTITUIR por:

```css
.header-transparent.ds-header.header-scrolled {
  background: rgba(26, 26, 22, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 rgba(196, 163, 90, 0.15), 0 4px 12px rgba(0, 0, 0, 0.2);
}

:root:not(.dark) .header-transparent.ds-header.header-scrolled {
  background: rgba(248, 246, 241, 0.88);
  box-shadow: 0 1px 0 rgba(196, 163, 90, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
}
```

Mudanças vs. anterior:
- Background opacity: 0.75 → 0.85 (dark), 0.8 → 0.88 (light)
- Blur: 12px → 16px
- Box-shadow: adicionado drop shadow além da border line

**Gate PR-7:**
```bash
npm run lint && npm run build
```
Verificação: ao scrollar, o header ganha presença clara — distingue-se do conteúdo abaixo. Gold border line + shadow visíveis.

---

## Gate Final (pós PRs 5–7)

```bash
bash scripts/agent_check.sh
```

Verificações manuais:
- [ ] **Sem overflow horizontal** — scrollar toda a home, texto nunca cortado
- [ ] **Impulse section full-bleed** — continua indo edge-to-edge
- [ ] **Texto secundário legível** — bullets e parágrafos `text-secondary` visíveis no dark
- [ ] **Header scrolled visível** — glass + shadow claramente distinguíveis
- [ ] **Nenhuma regressão** nos PRs 1–4 (header transparent, ícones, hero, CTA)
- [ ] **Light mode** — tudo acima funciona igualmente

## Definition of Done

- `bash scripts/agent_check.sh` PASS (lint + build)
- 3 PRs criados e mergeados em `main` (PRs 5, 6, 7)
- Nenhum bug visual introduzido nos dois modos
- Nenhuma dependência nova adicionada
- DS não foi modificado

---

## Report

Atualizar `docs/AGENT_REPORT_S08.md` — adicionar os PRs 5–7 à tabela existente, manter os PRs 1–4, e atualizar o gate final.
