# CODEX_EXEC_S04 — Sound Sanctuary: DS v8.9 Integration + Visual Polish

## Contexto

Repo: `/Users/raphaelbruno/projects/sound-sanctuary`
Branch base: `main`
DS submodule: `v8.9.0` (já bumpeado, submodule aponta para `4ff32e2`)

O site é um "digital sanctuary" — estética minimalista, calma, grandes fotografias,
texto escasso, whitespace generoso. As adições do DS devem **reforçar** essa estética,
nunca sobrecarregar.

### Estado herdado (S03 DONE)
- Next.js App Router + TypeScript + Tailwind v4 + Convex
- DS integrado via submodule em `./design-system`
- `globals.css` importa `tokens.css`, `base.css`, `typography.css`, `components.css`
- Sistema de classes `.journey-*` e `.impulse-*` já em uso e funcionando
- `animations.css` existe no DS (desde v8.7) mas **NÃO está importado**
- Pages: `/` Home · `/sound-healing` · `/sessions` · `/about` · `/portfolio` · `/newsletter` · `/contact` · `/privacy`

### O que NÃO fazer
- Não inventar tokens ou classes fora do DS
- Não reescrever as classes `.journey-*` que já funcionam
- Não adicionar Framer Motion, JS de animação ou dependências novas
- Não alterar conteúdo textual, imagens ou CTAs
- Não usar componentes DS v8.9 de interação avançada (search, swipeable, drag) — irrelevantes para site editorial

---

## Pré-requisito

```bash
cd /Users/raphaelbruno/projects/sound-sanctuary
git submodule update --init --recursive
npm install
```

---

## Branch

`feat/s04-ds-v8.9-integration`

Criar worktree isolado:

```bash
git worktree add .worktrees/feat-s04-ds-v8.9-integration -b feat/s04-ds-v8.9-integration
cd .worktrees/feat-s04-ds-v8.9-integration
git submodule update --init --recursive
npm install
```

---

## Escopo (ordem de execução)

### PR-1: Base técnica — animations.css + PROJECT_STATUS.md

**Objetivo:** Desbloquear as utility classes de animação do DS e atualizar
a documentação de estado do projeto.

**Arquivos:**
- Modify: `src/app/globals.css`
- Modify: `docs/PROJECT_STATUS.md`

**Mudanças em `globals.css`:**

Adicionar após o import de `components.css` e antes do `@import "tailwindcss"`:

```css
@import "../../design-system/styles/dist/animations.css";
```

A ordem final deve ser:
```css
@import "../../design-system/styles/dist/tokens.css";
@import "../../design-system/styles/dist/base.css";
@import "../../design-system/styles/dist/typography.css";
@import "../../design-system/styles/dist/components.css";
@import "../../design-system/styles/dist/animations.css";
@import "tailwindcss";
```

**Mudanças em `PROJECT_STATUS.md`:**

Reescrever o arquivo para refletir o estado atual:
- DS: v8.9.0 (submodule, já bumpeado via PRs #46–#50)
- Último sprint: S03 (DONE, 2026-02-12)
- Sprint atual: S04 (em execução — DS v8.9 integration)
- Últimas PRs: #46 (ds-v8.3), #47 (ds-v8.4), #48 (ds-v8.7), #49 (ds-v8.8), #50 (ds-v8.9)
- Preservar seções: Repo, How To Run, Common Ops, Convex Seeding, Notes

**Gate:**
```bash
# animations.css importado
grep "animations.css" src/app/globals.css

# build passa
bash scripts/agent_check.sh
```

**Dependências:** nenhuma — fazer PRIMEIRO.

---

### PR-2: Home — vine dividers + strike-wave + breath-pulse

**Objetivo:** Adicionar presença orgânica sutil entre as seções do Home.
Vine dividers como separadores. Strike-wave no "Impulsos". `.sh-breath-pulse`
no texto que já anima.

**Arquivos:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css` (adicionar classes `.vine-divider` e `.strike-wave-art`)

**Mudanças:**

1. **Vine divider** — adicionar entre as seções principais do Home.
   Criar classe `.vine-divider` em `globals.css`:

```css
.vine-divider {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  opacity: 0.14;
  display: block;
  pointer-events: none;
}
```

Usar o SVG do DS inline nos pontos de divisão em `page.tsx`:
- Entre seção "01 - What It Is" e "02 - Sound and the Nervous System"
- Entre seção "06 - Framework Elemental" e "07 - Animacao · Impulsos"

Usar o conteúdo do arquivo `design-system/artwork/vine-islimi.svg` inline como:
```tsx
<div aria-hidden="true" className="journey-container">
  <svg className="vine-divider" viewBox="0 0 800 80" ...>
    {/* conteúdo do vine-islimi.svg — simplificado, apenas o path principal */}
  </svg>
</div>
```

**Nota sobre vine-islimi.svg:** O arquivo tem stroke-dasharray/dashoffset para
animação `vineGrow` definida em `components.css`. Preservar esses atributos.
Usar `stroke: var(--sh-organic-liquid-glass-forest)` e `opacity: 0.14`.

2. **Strike-wave na seção "07 - Impulsos"** — o `impulse-plate` já tem um SVG
   manual de nervo. Adicionar o strike-wave do DS ao lado como artwork complementar.

   Criar classe `.strike-wave-art` em `globals.css`:
```css
.strike-wave-art {
  position: absolute;
  inset: -10% 0 -10% 40%;
  pointer-events: none;
  opacity: 0.18;
}
```

Usar SVG inline do `design-system/artwork/strike-wave.svg` dentro do `.impulse-plate`
como elemento absolutamente posicionado (semelhante ao `.impulse-art` já existente).

3. **`.sh-breath-pulse` no texto "journey-breathe"** — o texto
   `O prana canta enquanto flui` já tem a classe `journey-breathe` com animação
   CSS manual. Adicionar também `sh-breath-pulse` da `animations.css` após o import.
   Na prática: substituir a animação manual `sh-text-breathe` pela utility class
   `.sh-breath-pulse` do DS quando couber; se o comportamento for equivalente,
   manter o manual e apenas confirmar que ambos coexistem sem conflito.

**Gate:**
```bash
grep -c "vine-divider" src/app/globals.css  # >= 1
grep -c "vine-divider" src/app/page.tsx     # >= 2
grep -c "strike-wave" src/app/globals.css   # >= 1
bash scripts/agent_check.sh
```

**Dependências:** PR-1 (animations.css importado).

---

### PR-3: sound-healing — draw-on-nervura + jornada-sonora + estrutura

**Objetivo:** A página `/sound-healing` é esparsa (3 seções, muito espaço vazio).
Adicionar artwork do DS que reforça a metáfora "nervoso = folha retroiluminada"
e estruturar melhor o conteúdo existente.

**Arquivos:**
- Modify: `src/app/sound-healing/page.tsx`
- Modify: `src/app/globals.css` (classes `.nervura-art` e `.jornada-art`)

**Mudanças:**

1. **`draw-on-nervura.svg` como artwork hero** — posicionado absolutamente
   ao lado direito da seção principal, reforça o conceito visual central.

   Criar classe `.nervura-art` em `globals.css`:
```css
.nervura-art {
  position: absolute;
  top: 0;
  right: -5%;
  width: 45%;
  height: 100%;
  pointer-events: none;
  opacity: 0.12;
  overflow: hidden;
}

@media (max-width: 980px) {
  .nervura-art { display: none; }
}
```

Envolver a primeira seção em `position: relative` e adicionar o SVG inline
de `design-system/artwork/draw-on-nervura.svg`.

2. **`jornada-sonora.svg` na seção "O som reconstrói o sistema nervoso"** —
   posicionado como background decorativo no card glassmorphism existente.

   Criar classe `.jornada-art` em `globals.css`:
```css
.jornada-art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.09;
  object-fit: cover;
}
```

Adicionar `position: relative overflow-hidden` ao card e inserir o SVG inline.

3. **Vine divider** entre as seções (mesma classe `.vine-divider` do PR-2).

**Gate:**
```bash
grep -c "nervura-art\|jornada-art" src/app/globals.css  # >= 2
grep -c "draw-on-nervura\|jornada-sonora" src/app/sound-healing/page.tsx  # >= 1
grep -c "vine-divider" src/app/sound-healing/page.tsx   # >= 1
bash scripts/agent_check.sh
```

**Dependências:** PR-1, PR-2 (vine-divider class já criada).

---

### PR-4: sessions — ds-accordion + ds-timeline (CSS puro)

**Objetivo:** A página `/sessions` é muito esparsa. Adicionar estrutura usando
as receitas CSS do DS v8.8: accordion para "O que esperar" em cada formato,
timeline para as 4 fases de uma sessão.

**Arquivos:**
- Modify: `src/app/sessions/page.tsx`

**Mudanças:**

1. **Timeline das 4 fases** — usar as classes `.ds-timeline`, `.ds-timeline__item`,
   `.ds-timeline__marker`, `.ds-timeline__content` já disponíveis em `components.css`.

   Adicionar nova seção após os cards de formato:
```tsx
<section className="journey-container journey-section">
  <div className="journey-label">O que acontece</div>
  <h2 className="journey-title">Quatro fases de uma sessão</h2>
  <div className="ds-timeline mt-8">
    <div className="ds-timeline__item ds-timeline__item--completed">
      <div className="ds-timeline__marker" />
      <div className="ds-timeline__content">
        <strong>Chegada</strong>
        <p className="text-secondary text-sm mt-1">Assentar. Respirar. Deixar o corpo chegar.</p>
      </div>
    </div>
    <div className="ds-timeline__item ds-timeline__item--current">
      <div className="ds-timeline__marker" />
      <div className="ds-timeline__content">
        <strong>Imersão sonora</strong>
        <p className="text-secondary text-sm mt-1">O campo sonoro se forma. O corpo responde.</p>
      </div>
    </div>
    <div className="ds-timeline__item">
      <div className="ds-timeline__marker" />
      <div className="ds-timeline__content">
        <strong>Integração</strong>
        <p className="text-secondary text-sm mt-1">Silêncio guiado. O sistema nervoso processa.</p>
      </div>
    </div>
    <div className="ds-timeline__item">
      <div className="ds-timeline__marker" />
      <div className="ds-timeline__content">
        <strong>Fechamento</strong>
        <p className="text-secondary text-sm mt-1">Retorno gradual. Chá. Partida com espaço.</p>
      </div>
    </div>
  </div>
</section>
```

2. **Accordion "O que esperar"** — usar `.ds-accordion`, `.ds-accordion__trigger`,
   `.ds-accordion__content` de `components.css`. Em Next.js App Router (RSC),
   usar `details`/`summary` nativo para comportamento sem JS, com as classes DS
   para visual:

```tsx
<section className="journey-container journey-section">
  <div className="journey-label">Perguntas frequentes</div>
  <h2 className="journey-title">O que esperar</h2>
  <div className="mt-6 space-y-2">
    {[
      { q: "Preciso de experiência com meditação?", a: "Não. As sessões são acessíveis para qualquer pessoa. Não há técnica para aprender." },
      { q: "Como me vestir?", a: "Roupas confortáveis. Você ficará deitado ou sentado a maior parte do tempo." },
      { q: "E se eu adormecer?", a: "Ótimo. O corpo sabe o que precisa. O sono durante a sessão é integração." },
      { q: "Há contraindicações?", a: "Sessões individuais são adaptadas. Epilepsia fotossensível ou implantes metálicos — informe antes." },
    ].map(({ q, a }) => (
      <details key={q} className="ds-accordion">
        <summary className="ds-accordion__trigger">{q}</summary>
        <div className="ds-accordion__content">
          <p className="text-secondary text-sm">{a}</p>
        </div>
      </details>
    ))}
  </div>
</section>
```

**Gate:**
```bash
grep -c "ds-timeline" src/app/sessions/page.tsx   # >= 4
grep -c "ds-accordion" src/app/sessions/page.tsx  # >= 3
bash scripts/agent_check.sh
```

**Dependências:** PR-1 (components.css já importado desde S03).

---

### PR-5: about — migrar layout + neuron-field background

**Objetivo:** A página `/about` usa layout destoante (`max-w-5xl`, sem
`journey-container`, sem tokens DS). Alinhar ao sistema visual do site.
Adicionar neuron-field sutil como background.

**Arquivos:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/globals.css` (classe `.neuron-field-bg`)

**Mudanças:**

1. **Migrar layout** — substituir `max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-10`
   por `journey-container journey-section`. Manter o conteúdo intacto, apenas
   o wrapper muda.

2. **Neuron-field background** — adicionar SVG do DS como background sutil
   na página inteira:

   Criar classe `.neuron-field-bg` em `globals.css`:
```css
.neuron-field-bg {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.06;
}

@media (prefers-reduced-motion: reduce) {
  .neuron-field-bg { opacity: 0.03; }
}
```

Inserir SVG inline de `design-system/artwork/neuron-field-light.svg` (ou dark
conforme tema) como primeiro filho do `<main>`.

3. **Vine divider** entre as seções de conteúdo.

4. **Aplicar classes DS** nas headings que usam classes Tailwind puras:
   - `text-xl tracking-tight text-foreground` → manter ou trocar por `ds-font-display ds-weight-light ds-size-2xl`
   - `text-muted-foreground` → manter (já mapeado via `globals.css @theme`)

**Gate:**
```bash
grep "journey-container" src/app/about/page.tsx  # deve aparecer
grep "neuron-field-bg" src/app/globals.css        # deve aparecer
grep "vine-divider" src/app/about/page.tsx        # deve aparecer
bash scripts/agent_check.sh
```

**Dependências:** PR-1, PR-2 (vine-divider class).

---

### PR-6: Documentação — Sprint S04 + handoff

**Objetivo:** Documentar o sprint executado para continuidade futura.

**Arquivos:**
- Create: `docs/SPRINTS/S04.md`
- Modify: `docs/HISTORY.md` (adicionar milestone S04)
- Create: `docs/AGENT_REPORT_S04.md` (report desta execução — ver seção abaixo)

**`docs/SPRINTS/S04.md` conteúdo mínimo:**
- Sprint goal
- PRs entregues (PR-1 a PR-5) com evidências
- DS versions consumidas
- Definition of done (checklist)
- Gaps restantes para S05

**`docs/HISTORY.md`:** adicionar entrada `## 2026-02-18` com os PRs do S04.

**Gate:**
```bash
test -f docs/SPRINTS/S04.md
test -f docs/AGENT_REPORT_S04.md
grep "S04" docs/HISTORY.md
```

**Dependências:** PR-1 a PR-5 concluídos.

---

## Dependências entre PRs

```
PR-1 (base técnica)        → independente, fazer PRIMEIRO
  ├─ PR-2 (Home)           → depende de PR-1
  ├─ PR-4 (sessions)       → depende de PR-1
  └─ PR-5 (about)          → depende de PR-1 + PR-2 (vine-divider)

PR-3 (sound-healing)       → depende de PR-1 + PR-2 (vine-divider)

PR-6 (docs)                → depende de PR-1..PR-5 (fazer ÚLTIMO)
```

**Ordem otimizada:**
1. PR-1 — obrigatório primeiro
2. PR-2 — logo após PR-1 (cria `.vine-divider` que PR-3 e PR-5 usam)
3. PR-3, PR-4, PR-5 — paralelos (dependem de PR-1 e PR-2)
4. PR-6 — último

---

## Gate obrigatório (antes de cada merge)

```bash
bash scripts/agent_check.sh
# → lint ✓ + build ✓
```

Para o PR final (PR-6), gate adicional:
```bash
# animations.css importado
grep "animations.css" src/app/globals.css

# vine-divider presente em pelo menos 3 páginas
grep -rl "vine-divider" src/app | wc -l  # >= 3

# neuron-field presente
grep -r "neuron-field-bg" src/app/globals.css

# ds-timeline e ds-accordion presentes
grep -c "ds-timeline" src/app/sessions/page.tsx   # >= 4
grep -c "ds-accordion" src/app/sessions/page.tsx  # >= 3

# about migrado
grep "journey-container" src/app/about/page.tsx

# docs criados
test -f docs/SPRINTS/S04.md && echo "S04.md OK"
test -f docs/AGENT_REPORT_S04.md && echo "AGENT_REPORT OK"
```

---

## Report final (obrigatório)

Ao concluir, criar `docs/AGENT_REPORT_S04.md` com:

```markdown
# AGENT REPORT — S04 DS v8.9 Integration

## Briefing executado
- `docs/prompts/CODEX_EXEC_S04.md`

## PRs entregues
| PR | Branch | Merge commit | Status |
|----|--------|-------------|--------|
| PR-1 | feat/s04-pr1-base | ... | MERGED |
| PR-2 | feat/s04-pr2-home | ... | MERGED |
| PR-3 | feat/s04-pr3-sound-healing | ... | MERGED |
| PR-4 | feat/s04-pr4-sessions | ... | MERGED |
| PR-5 | feat/s04-pr5-about | ... | MERGED |
| PR-6 | feat/s04-pr6-docs | ... | MERGED |

## Gates
- `bash scripts/agent_check.sh` → lint ✓ + build ✓
- [listar todos os gate checks com outputs reais]

## Artwork integrado
- [ ] vine-islimi.svg (vine-divider) — Home, sound-healing, about
- [ ] draw-on-nervura.svg — sound-healing hero
- [ ] jornada-sonora.svg — sound-healing card
- [ ] strike-wave.svg — Home impulse section
- [ ] neuron-field-light.svg — about background

## DS components usados (CSS puro)
- [ ] ds-timeline — sessions
- [ ] ds-accordion — sessions
- [ ] animations.css utility classes — globals

## Gaps restantes (S05)
- [listar o que ficou fora de escopo]
```

---

## Definition of Done (S04)

1. ✓ `animations.css` importado em `globals.css`
2. ✓ `PROJECT_STATUS.md` atualizado para DS v8.9.0 / S04
3. ✓ Vine dividers em Home, sound-healing e about
4. ✓ `draw-on-nervura.svg` em sound-healing
5. ✓ `jornada-sonora.svg` em sound-healing
6. ✓ `strike-wave.svg` em Home (impulse section)
7. ✓ `neuron-field-light.svg` em about
8. ✓ `ds-timeline` em sessions (4 fases)
9. ✓ `ds-accordion` em sessions (4 FAQs)
10. ✓ `about` migrado para `journey-container`
11. ✓ `bash scripts/agent_check.sh` → lint ✓ + build ✓
12. ✓ `docs/SPRINTS/S04.md` criado
13. ✓ `docs/AGENT_REPORT_S04.md` criado com gates reais
14. ✓ `docs/HISTORY.md` atualizado
