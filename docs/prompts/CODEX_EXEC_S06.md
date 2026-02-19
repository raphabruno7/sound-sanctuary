# CODEX_EXEC_S06 — Sound Sanctuary: Aesthetic Refinement — Dual-Mode Sanctuary

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the site feel like a Sound Sanctuary in both dark and light modes — dark as the canonical experience, light as a dignified alternative.

**Architecture:** Three active bugs break the site's aesthetic (wrong default theme, hardcoded SVG colors, artwork opacities not adaptive). Fix bugs first, then activate unused DS artwork, then polish light mode. All changes stay in the site consumer — DS is not touched.

**Tech Stack:** Next.js App Router · TypeScript · Tailwind v4 · CSS custom properties · DS v8.9.0 (submodule at `design-system/`)

---

## Contexto

Repo: `/Users/raphaelbruno/projects/sound-sanctuary`
Design doc: `docs/plans/2026-02-19-s06-design.md`
Branch base: `main`
DS submodule: `v8.9.0` — artwork lives at `design-system/artwork/`

### DNA estética (leia antes de qualquer mudança visual)
Do `docs/07_design/DESIGN_FOUNDATION.md` (via sound-journey-club, aplicável ao site):
- Base: **obsidian / deep moss** — fundo `#1A1A16`, superfícies `#2A2A24`
- Accents: **gold `#C4A35A`** (ancestral, tigelas) + **green `#2D5A3E`** (floresta, nervuras)
- Materials: **liquid-glass cards** sobre substrato biológico vivo
- Motifs: venação foliar ↔ vias nervosas ↔ redes miceliais
- Intent: **nervous-system medicine** — calmo, orgânico, refinado, ancestral + futurista

### Três bugs ativos
1. `ThemeToggle` inicia em `"system"` → a maioria dos usuários vê light mode no primeiro load
2. `src/app/about/page.tsx` tem SVG inline com `.bg { fill: #F8F6F1 }` → no dark mode aparece retângulo creme sobre obsidiana
3. Opacidades de artwork (nervura 12%, jornada 9%, vine 14%, neuron-field 6%) calibradas para escuro — no light somem completamente

### Artwork DS disponível mas NÃO consumido
- `design-system/artwork/vine-islimi.svg` — vine com folhas em coração (mesmo padrão do vine-divider inline atual mas mais rico)
- `design-system/artwork/scapes-calligraphy.svg` — hastes botânicas calígrafas (ghost overlay)
- `design-system/artwork/fruit-venation.svg` — lima retroiluminada, secção transversal, liquid glass

---

## Pré-requisito

```bash
cd /Users/raphaelbruno/projects/sound-sanctuary
git submodule update --init --recursive
npm install
bash scripts/agent_check.sh   # deve passar antes de qualquer mudança
```

---

## Branch

`feat/s06-sanctuary-aesthetic`

```bash
git worktree add .worktrees/feat-s06-sanctuary-aesthetic -b feat/s06-sanctuary-aesthetic
cd .worktrees/feat-s06-sanctuary-aesthetic
git submodule update --init --recursive
npm install
```

---

## Escopo (ordem de execução)

### PR-1 — Dark default + FOUC prevention

**Objetivo:** O site abre em dark mode na primeira visita. Sem flash de tema claro durante hydration.

**Arquivos:**
- Modify: `src/components/ThemeToggle.tsx`
- Modify: `src/app/layout.tsx`

**Mudanças:**

`ThemeToggle.tsx` — muda o estado inicial:
```tsx
// antes:
const [preference, setPreference] = useState<ThemePreference>("system");
// depois:
const [preference, setPreference] = useState<ThemePreference>("dark");
```

`layout.tsx` — adiciona script inline antes da hydration para setar o tema antes do React montar.
Adiciona `suppressHydrationWarning` no `<html>` e um `<script>` como primeiro filho de `<body>`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {/* FOUC prevention: sets dark class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var stored = localStorage.getItem('theme');
                var isDark = stored === 'dark' || (!stored) || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) document.documentElement.classList.add('dark');
              } catch(e) {
                document.documentElement.classList.add('dark');
              }
            })();`,
          }}
        />
        <ConvexClientProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
```

**Gate PR-1:**
```bash
npm run lint && npm run build
```
Verificação manual: abrir `http://localhost:3000` em aba anônima (sem localStorage) → deve abrir escuro, sem flash.

---

### PR-2 — Corrige neuron-field (about page)

**Objetivo:** Remover o retângulo creme que aparece no dark mode em `/about`.

**Arquivo:** `src/app/about/page.tsx`

**Diagnóstico:** O SVG inline tem:
```css
.bg { fill: #F8F6F1; }
```
E um `<rect class="bg" width="600" height="400" />` que pinta um retângulo creme sobre o fundo — visível como bloco branco no dark mode.

**Mudanças:**

1. Remover completamente a `<rect class="bg" .../>` — o `body` já tem o background correto via token
2. No `<style>` interno, trocar a definição do `.bg` (que pode ser removida já que o rect foi embora) e ajustar as opacidades dos dendritos e nós para funcionarem nos dois modos:

```css
/* remover: .bg { fill: #F8F6F1; } */
.dendrite { fill: none; stroke: var(--sh-organic-liquid-glass-forest, #2D5A3E); stroke-width: 1.2; opacity: 0.25; }
.node { fill: var(--sh-organic-gold-primary, #C4A35A); animation: glowPulse 4000ms ease-in-out infinite; }
```

Os valores de opacidade em tokens CSS (`--sh-organic-liquid-glass-forest`) já se adaptam ao dark/light automaticamente. Não usar cores hexadecimais hardcoded — sempre via token ou com fallback `var(--token, #hex)`.

**Gate PR-2:**
```bash
npm run lint && npm run build
```
Verificação manual: `/about` em dark → sem retângulo creme; em light → nervuras visíveis.

---

### PR-3 — Opacidades de artwork dual-mode

**Objetivo:** Todos os artworks têm opacidade calibrada para dark E light.

**Arquivo:** `src/app/globals.css`

**Mudanças:** Adicionar variantes `.dark` para cada classe de artwork existente.

Adicionar ao final da seção de artwork em `globals.css`:

```css
/* ── Artwork: Dark mode opacity overrides ── */
.dark .nervura-art {
  opacity: 0.20;
}

.dark .jornada-art {
  opacity: 0.15;
}

.dark .vine-divider {
  opacity: 0.22;
}

.dark .neuron-field-bg {
  opacity: 0.10;
}

/* Light mode explicit values (already default, but now documented) */
.nervura-art { opacity: 0.12; }
.jornada-art { opacity: 0.09; }
.vine-divider { opacity: 0.14; }
.neuron-field-bg { opacity: 0.06; }
```

Nota: as classes de base já existem — **não duplicar** as regras, apenas garantir que as `.dark` overrides existam. Se as classes de base já tiverem os valores corretos, apenas adicionar as `.dark` variants.

**Gate PR-3:**
```bash
npm run lint && npm run build
```
Verificação manual: toggle dark/light em `/sound-healing` e `/about` — artworks visíveis proporcionalmente nos dois modos.

---

### PR-4 — Ativar artwork DS não consumido

**Objetivo:** Adicionar densidade visual orgânica ao site com os SVGs do DS que nunca foram usados.

**Arquivos:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/sessions/page.tsx`
- Modify: `src/app/globals.css`

**Artwork a usar:**

**vine-islimi.svg** → substituir os inline vine-dividers existentes (home + sound-healing) pelo SVG do DS. O vine-islimi é mais rico — tem folhas em coração além das hastes. Usar inline como `<svg>` (não `<img>`) para que os tokens CSS funcionem.

Método: copiar o conteúdo de `design-system/artwork/vine-islimi.svg` e usar como SVG inline substituindo os blocos `<svg className="vine-divider" ...>` existentes. Manter a classe `vine-divider` para herdar os estilos de `globals.css`.

**scapes-calligraphy.svg** → usar como ghost overlay sutil em `sessions/page.tsx`, na seção de header. Adicionar com posicionamento absoluto, pointer-events none, baixa opacidade. Tratar como arte ornamental — não deve competir com o conteúdo.

Classe nova em `globals.css`:
```css
.scapes-art {
  position: absolute;
  top: 0;
  right: 0;
  width: 240px;
  height: 200px;
  pointer-events: none;
  opacity: 0.08;
}
.dark .scapes-art {
  opacity: 0.13;
}
@media (max-width: 768px) {
  .scapes-art { display: none; }
}
```

**fruit-venation.svg** → usar na seção "Framework Elemental" da home (os 4 cards de Sol/Lua/Oceano/Floresta). Posicionar como background visual em um dos cards ou como elemento decorativo centralizado entre eles. Baixa opacidade — textura, não destaque.

Classe nova em `globals.css`:
```css
.venation-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.06;
  object-fit: contain;
}
.dark .venation-art {
  opacity: 0.10;
}
```

**Regras de uso de artwork:**
- Sempre `pointer-events: none`
- Sempre `aria-hidden="true"` no elemento container
- Sempre opacidade < 0.25 (textura, nunca destaque)
- Sempre `prefers-reduced-motion` respeitado (as animações dos SVGs já têm isso internamente)
- Nunca cobrir texto ou CTAs
- Os SVGs usam `var(--sh-organic-*)` tokens — funcionam em ambos os modos sem ajuste de cor

**Gate PR-4:**
```bash
npm run lint && npm run build
```
Verificação manual: artworks aparecem sutilmente nas páginas em ambos os modos, sem sobrepor conteúdo legível.

---

### PR-5 — Light mode sanctuary feel

**Objetivo:** Light mode sente orgânico e contido, não clínico/branco.

**Arquivo:** `src/app/globals.css`

**Contexto:** O fundo light usa `#F8F6F1` (creme quente, parchment) — base correta. O problema está nas bordas do glass e nas vignettes das fotos.

**Mudanças:**

Sobrescrever token de borda do glass para light mode (mais quente, mais âmbar):
```css
/* Light mode: warmer glass border */
:root:not(.dark) {
  --sh-glass-light-border: rgba(196, 163, 90, 0.28);
  --sh-glass-light-border-hover: rgba(196, 163, 90, 0.45);
}
```

Adicionar variante light da vignette de foto (mais quente, menos verde):
```css
/* Photo vignette — dark mode (existing): forest green + charcoal */
/* Photo vignette — light mode: amber warm */
:root:not(.dark) .journey-photo-vignette {
  background:
    radial-gradient(700px 340px at 70% 25%, rgba(196, 163, 90, 0.18), transparent 60%),
    radial-gradient(600px 380px at 30% 70%, rgba(196, 163, 90, 0.10), transparent 65%),
    linear-gradient(180deg, rgba(196, 163, 90, 0.06), rgba(248, 246, 241, 0));
}
```

Garantir que o `journey-card::after` (gold node pulse) seja visível no light:
```css
/* Node pulse visible in both modes */
:root:not(.dark) .journey-card::after {
  opacity: 0.35;
}
```

**Gate PR-5:**
```bash
npm run lint && npm run build
```
Verificação manual: em light mode, os glass cards têm borda dourada quente; fotos têm vignette âmbar; site parece sanctuary orgânico, não portfolio tech.

---

## Gate Final (pós todos os PRs)

```bash
bash scripts/agent_check.sh
```

Verificações manuais:
- [ ] Primeiro load (aba anônima, sem localStorage): abre dark, sem flash
- [ ] Toggle dark → light → system: ciclo funciona, cada modo mantém identidade visual
- [ ] `/about` em dark: sem retângulo creme, nervuras visíveis
- [ ] `/sound-healing` em ambos os modos: nervura-art e jornada-art proporcionais
- [ ] Home em dark: vine-islimi, strike-wave, scapes e venation adicionam textura sem competir com conteúdo
- [ ] Light mode: glass borders quentes, vignettes âmbar, sanctuary feel

---

## Definition of Done

- `bash scripts/agent_check.sh` PASS (lint + build)
- 5 PRs criados e mergeados em `main`
- Nenhum bug visual introduzido nos dois modos
- Nenhuma dependência nova adicionada
- DS não foi modificado

---

## Report

Após conclusão, criar `docs/AGENT_REPORT_S06.md` com:
- PRs criados + merge commits
- Screenshots ou descrição do estado visual em cada modo
- Quaisquer desvios do plano e justificativas
- `bash scripts/agent_check.sh` output final
