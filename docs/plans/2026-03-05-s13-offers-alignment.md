# S13 Offers Alignment Fix — Implementation Plan

> **For Claude/Codex:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Corrigir o desalinhamento para a esquerda (containers `.journey-container`) preservando o spacing vertical (`.journey-section`) em todas as páginas.

**Architecture:** A classe `.journey-container` define o container centralizado via `margin: 0 auto`, mas `.journey-section` sobrescreve o `margin` com `margin: X 0`, zerando os `margin-left/right`. Trocar para `margin-block` (ou `margin-top/bottom`) mantém o espaçamento vertical sem quebrar o auto-centering horizontal.

**Tech Stack:** Next.js (app router), Tailwind (via `@import "tailwindcss"`), CSS global (`src/app/globals.css`).

---

### Task 1: Confirmar root cause no browser

**Files:**
- Inspect: `projects/sound-sanctuary/src/app/globals.css`

**Step 1: Medir o container com as classes atuais**
- Abrir `http://127.0.0.1:3000/pt-BR` e medir o `getBoundingClientRect()` do `section.journey-container.journey-section`.
- Esperado: `x === 0` (desalinhado) e `marginLeft/marginRight` computados como `0px`.

**Step 2: Remover `.journey-section` temporariamente**
- Remover a classe `journey-section` do elemento no DevTools.
- Esperado: `x > 0` e margens computadas não-zero (conteúdo centraliza).

---

### Task 2: Ajustar CSS para não sobrescrever margens horizontais

**Files:**
- Modify: `projects/sound-sanctuary/src/app/globals.css`

**Step 1: Trocar `.journey-section { margin: ... }` por `margin-block: ...`**
- Desktop: `margin-block: 5rem;`
- Breakpoints: manter os valores, mas usando `margin-block` (ex.: `3rem`, `2.5rem`)

**Step 2: Verificar que `.journey-container` volta a centralizar**
- Medir novamente: `x ≈ (viewport - 1040) / 2` em larguras > 1040.

---

### Task 3: Verificação e regressão rápida

**Step 1: Lint**
- Run: `npm -C projects/sound-sanctuary run -s lint`
- Expected: `0` exit code

**Step 2: Build**
- Run: `npm -C projects/sound-sanctuary run -s build`
- Expected: `0` exit code

---

### Task 4: Atualizar report para handoff

**Files:**
- Modify: `projects/sound-sanctuary/docs/reports/2026-03-05-s13-offers-section-report.md`

**Step 1: Anotar root cause e fix**
- Explicar o conflito `.journey-container` vs `.journey-section`.
- Registrar mudança (margens horizontais preservadas via `margin-block`).

