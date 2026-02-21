# CODEX_EXEC_S08_HOTFIX — Fix ALL Dark Mode Text (DEFINITIVE)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** ALL text in dark mode is unreadable (dark text on dark background). Previous hotfix (PR-8) tried overriding `--color-foreground` in `.dark {}` but it doesn't work because Tailwind v4 `@theme inline` resolves values at build time — the compiled CSS uses the baked light-mode value, NOT a `var()` reference. The `.dark` CSS variable override has no effect.

This prompt fixes the root cause definitively.

**Architecture:** CSS-only fix. Single PR.

---

## Contexto

Repo: `/Users/raphaelbruno/projects/sound-sanctuary`
Branch base: `main`

### Root cause analysis

In `globals.css`:
```css
@theme inline {
  --color-foreground: var(--sh-semantic-text-primary);
}
```

Tailwind v4 `@theme inline` means: resolve the value at build time and inline it into utilities. So `text-foreground` compiles to something like `color: #2a2a24` (the LIGHT mode value of `--sh-semantic-text-primary`), NOT `color: var(--color-foreground)`.

When `.dark` is added to `<html>` at runtime, the DS remaps `--sh-semantic-text-primary` to `#F2EFE8`, and the `.dark {}` block sets `--color-foreground: #f2efe8`. But neither matters — the compiled Tailwind utility already has the hardcoded dark color.

The `body { @apply text-foreground }` in `@layer base` ALSO gets the baked value.

### The fix

**Set `color` directly on `.dark` as an inherited CSS property — NOT via CSS custom property overrides.**

```css
.dark {
  color: #f2efe8;
}
```

This sets the actual CSS `color` property on `<html class="dark">`. All child elements inherit this unless they override it. This bypasses Tailwind's build-time resolution entirely.

---

## Pré-requisito

```bash
cd /Users/raphaelbruno/projects/sound-sanctuary
git submodule update --init --recursive
npm install
bash scripts/agent_check.sh
```

---

## PR-1 — Definitive dark mode text fix

**Arquivo:** `src/app/globals.css`

### Step 1 — Add `color` property to `.dark` block

Find the existing `.dark { ... }` block (around lines 42-66). Add `color: #f2efe8;` as the FIRST line inside the block:

```css
.dark {
  /* ── Definitive dark text color ── */
  color: #f2efe8;
  background-color: #1a1a16;

  /* Tailwind theme var overrides (keep for components that read these vars) */
  --color-background: var(--sh-semantic-bg-primary);
  --color-foreground: #f2efe8;
  --color-muted: var(--sh-semantic-bg-secondary);
  --color-muted-foreground: rgba(242, 239, 232, 0.5);
  --color-card: var(--sh-semantic-bg-secondary);
  --color-card-foreground: #f2efe8;
  --color-popover: var(--sh-glass-light-bg);
  --color-popover-foreground: #f2efe8;
  --color-border: var(--sh-glass-light-border);
  --color-input: var(--sh-glass-light-border);

  --sh-semantic-text-secondary: rgba(242, 239, 232, 0.82);
  --sh-semantic-text-muted: rgba(242, 239, 232, 0.62);

  --sh-glass-light-border: rgba(196, 163, 90, 0.25);
  --sh-glass-light-bg: rgba(26, 26, 22, 0.7);

  --color-foreground: #f2efe8;
  --color-accent-foreground: #f2efe8;
}
```

The critical additions are:
- `color: #f2efe8;` — sets the ACTUAL inherited text color
- `background-color: #1a1a16;` — ensures dark bg even if Tailwind's `bg-background` is baked

### Step 2 — Force color on journey elements that might have baked values

Add after the `.dark { }` block:

```css
/* ── Dark mode: force light text on all content elements ── */
.dark h1, .dark h2, .dark h3, .dark h4, .dark p, .dark li, .dark span, .dark a {
  color: inherit;
}

.dark .journey-title {
  color: #f2efe8;
}

.dark .journey-sub {
  color: rgba(242, 239, 232, 0.82);
}

.dark .journey-label {
  color: rgba(242, 239, 232, 0.62);
}

.dark .text-secondary {
  color: rgba(242, 239, 232, 0.82);
}

.dark .text-muted {
  color: rgba(242, 239, 232, 0.62);
}
```

### Step 3 — Verify `.text-secondary` isn't fighting

The existing `.text-secondary { color: var(--sh-semantic-text-secondary); }` (around line 445) is fine — in `.dark`, the `--sh-semantic-text-secondary` is overridden to `rgba(242, 239, 232, 0.82)`. But add the explicit `.dark .text-secondary` above as a safety net.

### Step 4 — Verify light mode is NOT affected

The `color: #f2efe8` is inside `.dark {}` — it only applies when `<html>` has class `dark`. In light mode (no `.dark` class), the body inherits from Tailwind's baked `text-foreground` which is the dark text color. This should be correct.

**BUT verify:** if light mode text turns light after this change, something is wrong with the `.dark` scoping. Debug by checking if `<html>` has class `dark` in light mode.

### Step 5 — Verify header links

The header uses `.ds-header__link` and `.ds-header__brand` from the DS. These should inherit from `.dark { color: #f2efe8 }`. If they don't (because the DS sets explicit colors), add:

```css
.dark .ds-header__link,
.dark .ds-header__brand {
  color: #f2efe8;
}

.dark .ds-header__link:hover {
  color: #c4a35a;
}
```

Only add these if the header links are also dark/invisible.

---

## Gate

```bash
npm run lint && npm run build
```

### Verificação manual OBRIGATÓRIA — faça antes de criar PR:

Run `npm run dev` and open `http://localhost:3000` in a browser.

**Dark mode checklist (EVERY item must pass):**
- [ ] H1 "Sound Healing" on hero — LIGHT text, readable over photo
- [ ] Subtitle "O prana canta enquanto flui" — visible
- [ ] "Regulation practice for modern life..." — visible
- [ ] Hero CTAs ("Book a 1:1", "Join Sound Healing Live") — visible
- [ ] Header nav links — visible
- [ ] "Sound Sanctuary" brand — visible
- [ ] Section labels ("UPSTREAM CARE", "02 - SOUND AND THE NERVOUS SYSTEM") — visible (muted)
- [ ] Section titles ("A calm, structured sound practice", "Princípio fundador", "Five steps, no mystery") — LIGHT text, clearly readable
- [ ] Body paragraphs in glass cards — readable
- [ ] Bullet list items ("anxiety / stress", "sleep") — readable
- [ ] "O SOM RECONSTRÓI O SISTEMA NERVOSO." — gold overline, visible

**Light mode checklist:**
- [ ] Toggle to light — all text turns DARK on cream background
- [ ] No white/light text on cream
- [ ] Glass cards legible

If ANY item fails, debug before creating PR. The most likely issue is a DS class overriding `color` with a specific value — add `.dark` override for that class.

---

## Definition of Done

- `bash scripts/agent_check.sh` PASS
- 1 PR criado e mergeado em `main`
- **Dark mode: ALL text legible — no exceptions**
- **Light mode: no regressions**
- DS not modified

---

## Report

Atualizar `docs/AGENT_REPORT_S08.md` — substituir PR-8 entry ou adicionar PR-9 com a fix definitiva.
