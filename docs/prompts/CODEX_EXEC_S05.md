# CODEX_EXEC_S05 — Sound Sanctuary: Content Polish + SEO + Layout Alignment

## Contexto

Repo: `/Users/raphaelbruno/projects/sound-sanctuary`
Branch base: `main`
DS submodule: `v8.9.0`
Sprint anterior: S04 DONE (DS v8.9 integration — artwork, animations.css, ds-timeline, ds-accordion)

O site agora tem a base visual correta (DS tokens, artwork, componentes CSS). Este sprint
foca em **qualidade de produto**: remover placeholders visíveis ao usuário, alinhar os
layouts restantes, ligar o formulário de newsletter que já existe mas não está conectado,
e cobrir SEO básico (metadata, sitemap, robots).

### Gaps identificados (estado atual do main)

**Placeholders visíveis:**
- `src/app/contact/page.tsx:9` — "I reply within **X hours**"
- `src/app/page.tsx:158,176` — "Duration: **placeholder**" (2x)
- `src/app/page.tsx:373` — "I reply within **X hours**" (repetido)
- `src/app/sessions/page.tsx:38` — "Evento ritual · Duration **placeholder**"
- `src/app/newsletter/page.tsx:25` — "Newsletter sign-up is **not live yet**…"
- `src/app/portfolio/page.tsx:48` — "**Run the seed mutation** in Convex" (dev-facing)
- `src/app/privacy/page.tsx:15` — "**placeholder**. Expand when…"

**Layout desalinhado:**
- `src/app/portfolio/page.tsx` — usa `max-w-5xl mx-auto px-8` em vez de `journey-container`
- `src/app/newsletter/page.tsx` — usa `max-w-5xl mx-auto px-8` em vez de `journey-container`

**Newsletter desconectada:**
- `src/components/NewsletterForm.tsx` existe e funciona (Convex)
- `src/app/newsletter/page.tsx` tem seção "Signup Placeholder" em vez de usar o componente

**SEO ausente:**
- Metadata (`title`/`description`) falta em: `/sound-healing`, `/sessions`, `/contact`,
  `/newsletter`, `/portfolio`
- Sem `sitemap.xml` (Next.js App Router: `src/app/sitemap.ts`)
- Sem `robots.txt` (Next.js App Router: `src/app/robots.ts`)

**Nav:**
- `Privacy` está no nav principal junto com links de conteúdo — deve ir apenas para o footer

### O que NÃO fazer
- Não inventar tokens ou classes fora do DS
- Não alterar fotografias, artwork SVGs ou animações do S04
- Não alterar copy que não é placeholder (manter a voz do site)
- Não adicionar dependências novas
- Não alterar schema/funções Convex

---

## Pré-requisito

```bash
cd /Users/raphaelbruno/projects/sound-sanctuary
git submodule update --init --recursive
npm install
```

---

## Branch

`feat/s05-content-seo-polish`

```bash
git worktree add .worktrees/feat-s05-content-seo-polish -b feat/s05-content-seo-polish
cd .worktrees/feat-s05-content-seo-polish
git submodule update --init --recursive
npm install
```

---

## Escopo (ordem de execução)

### PR-1: Placeholders textuais

**Objetivo:** Remover todos os placeholders visíveis ao usuário final.
Usar valores razoáveis que não comprometam a voz do site.

**Arquivos:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/sessions/page.tsx`
- Modify: `src/app/privacy/page.tsx`

**Substituições:**

`contact/page.tsx` linha ~9:
```
"Three questions. I reply within X hours."
→ "Three questions. I reply within 48 hours."
```

`page.tsx` linha ~158 (1:1 Sound Therapy):
```
"For whom: deeper pacing + integration support · Duration: placeholder"
→ "For whom: deeper pacing + integration support · 60 min"
```

`page.tsx` linha ~176 (Group Sound Journey):
```
"For whom: collective rest without performance · Duration: placeholder"
→ "For whom: collective rest without performance · 90 min"
```

`page.tsx` linha ~373 (contact section):
```
"Three questions. I reply within X hours."
→ "Three questions. I reply within 48 hours."
```

`sessions/page.tsx` linha ~38:
```
"Evento ritual · Duration placeholder"
→ "Evento ritual · 90 min"
```

`privacy/page.tsx` — substituir o body placeholder por uma privacy notice mínima
funcional (GDPR-light), cobrindo:
- Quais dados são coletados (email via newsletter, nenhum outro)
- Para quê (comunicações do Sound Sanctuary)
- Como remover (link de unsubscribe em cada email)
- Sem cookies de tracking além do essencial

**Gate:**
```bash
grep -r "placeholder\|X hours\|seed mutation" src/app/ | grep -v "NewsletterForm\|node_modules\|\.next"
# Esperado: 0 resultados (exceto o placeholder="..." do input, que é atributo HTML válido)
bash scripts/agent_check.sh
```

**Dependências:** nenhuma — fazer PRIMEIRO.

---

### PR-2: Newsletter page — ligar o formulário

**Objetivo:** A `newsletter/page.tsx` tem a seção "Signup Placeholder" com texto
dizendo que o formulário não está disponível. O `NewsletterForm` já existe e funciona.
Conectar.

**Arquivos:**
- Modify: `src/app/newsletter/page.tsx`

**Mudanças:**

1. Migrar layout de `max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-12`
   para `journey-container journey-section` (consistência com S04).

2. Substituir a seção "Signup Placeholder" pelo componente real:
```tsx
import { NewsletterForm } from "@/components/NewsletterForm";
```
Usar `<NewsletterForm source="newsletter" />` no lugar da seção placeholder.

3. Manter as seções "What You Will Receive" e "Delivery Rhythm" — são conteúdo válido.
   Migrar os headings para classes DS:
   - `text-2xl md:text-3xl tracking-tight text-foreground` → `journey-title`

4. Adicionar vine divider entre as seções (classe `.vine-divider` do S04).

**Resultado esperado:**
```tsx
<main className="min-h-dvh pb-24">
  <section className="journey-container journey-section">
    <div className="journey-label">Newsletter</div>
    <h1 className="journey-title">Quiet updates</h1>
    <p className="journey-sub">...</p>
  </section>

  {/* vine divider */}

  <section className="journey-container journey-section">
    <h2 className="journey-title">What You Will Receive</h2>
    <p className="journey-sub">...</p>
  </section>

  {/* vine divider */}

  <section className="journey-container journey-section">
    <NewsletterForm source="newsletter" />
  </section>
</main>
```

**Gate:**
```bash
grep "NewsletterForm" src/app/newsletter/page.tsx     # deve aparecer
grep "journey-container" src/app/newsletter/page.tsx  # deve aparecer
grep "not live yet\|Signup Placeholder" src/app/newsletter/page.tsx  # esperado: 0
bash scripts/agent_check.sh
```

**Dependências:** PR-1.

---

### PR-3: Portfolio page — layout + empty state artístico

**Objetivo:** Migrar o layout para `journey-container`, aplicar classes DS nos cards,
e substituir o empty state developer-facing por um estado artístico com `ScapesEmpty`.

**Arquivos:**
- Modify: `src/app/portfolio/page.tsx`

**Mudanças:**

1. Migrar layout de `max-w-5xl mx-auto px-8 md:px-10 py-16 space-y-10`
   para `journey-container journey-section`.

2. Cards do portfolio: trocar classes Tailwind genéricas por classes DS:
   - `rounded-2xl border border-border bg-card p-5` → `ds-glass journey-card`
   - `text-xs tracking-wide text-muted-foreground uppercase` → `journey-label`
   - Tags: `rounded-full border border-border px-2 py-1 text-muted-foreground text-xs`
     → `ds-badge` (disponível em components.css v8.3+)

3. Loading state: substituir `<p className="text-sm text-muted-foreground">Loading...</p>`
   por skeleton DS:
```tsx
<div className="ds-skeleton ds-skeleton--card" />
<div className="ds-skeleton ds-skeleton--card" />
<div className="ds-skeleton ds-skeleton--card" />
```

4. Empty state: substituir o texto developer-facing pelo componente `ScapesEmpty`
   que já existe em `src/components/artwork/ScapesEmpty.tsx` (criado no S04):
```tsx
<ScapesEmpty
  title="Portfolio em construção"
  description="Sessions, events, and retreats — coming soon."
/>
```
   Ajustar import: `import { ScapesEmpty } from "@/components/artwork/ScapesEmpty"`.

**Nota:** O componente é "use client" (usa Convex query). Manter o `"use client"` directive.

**Gate:**
```bash
grep "journey-container" src/app/portfolio/page.tsx  # deve aparecer
grep "ScapesEmpty" src/app/portfolio/page.tsx         # deve aparecer
grep "ds-skeleton" src/app/portfolio/page.tsx         # deve aparecer
grep "seed mutation" src/app/portfolio/page.tsx       # esperado: 0
bash scripts/agent_check.sh
```

**Dependências:** PR-1.

---

### PR-4: Nav — remover Privacy + ajustar footer

**Objetivo:** `Privacy` no nav principal desvia o foco dos links de conteúdo.
Mover para o footer onde links legais pertencem.

**Arquivos:**
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/SiteFooter.tsx`

**Mudanças em `SiteHeader.tsx`:**
- Remover o `<Link>` para `/privacy` do nav principal.
- O nav fica: Sound Healing · Sessions · Portfolio · About · Contact (5 links, mais limpo).

**Mudanças em `SiteFooter.tsx`:**
- Adicionar linha de links legais abaixo do copyright:
```tsx
<div className="mt-3 flex gap-4 text-xs">
  <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
  <Link href="/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link>
</div>
```

**Gate:**
```bash
grep "privacy" src/components/SiteHeader.tsx   # esperado: 0
grep "privacy" src/components/SiteFooter.tsx   # deve aparecer
bash scripts/agent_check.sh
```

**Dependências:** nenhuma — independente.

---

### PR-5: SEO — metadata + sitemap + robots

**Objetivo:** Cobertura mínima de SEO para todas as páginas.
Next.js App Router suporta `metadata` export, `sitemap.ts` e `robots.ts` nativamente.

**Arquivos:**
- Modify: `src/app/sound-healing/page.tsx` (adicionar metadata)
- Modify: `src/app/sessions/page.tsx` (adicionar metadata)
- Modify: `src/app/contact/page.tsx` (adicionar metadata)
- Modify: `src/app/newsletter/page.tsx` (adicionar metadata)
- Modify: `src/app/portfolio/page.tsx` (adicionar metadata — com generateMetadata para "use client" → mover para layout ou usar export separado)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Metadata por página:**

`sound-healing/page.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Sound Healing",
  description: "How sound travels through the nervous system. The science and practice behind Sound Sanctuary sessions.",
};
```

`sessions/page.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Sessions",
  description: "1:1 Sound Therapy and Group Sound Journey — formats, durations, and how to book.",
};
```

`contact/page.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 1:1 sound healing session or ask a question. Three questions. Reply within 48 hours.",
};
```

`newsletter/page.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Newsletter",
  description: "Quiet updates on session availability and reflective notes on sound and regulation.",
};
```

`portfolio/page.tsx` — é "use client", logo não pode exportar `metadata` diretamente.
Criar `src/app/portfolio/layout.tsx` com o metadata:
```typescript
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Portfolio",
  description: "Sessions, events, retreats, and collaborations — a record of Sound Sanctuary work.",
};
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**`src/app/sitemap.ts`:**
```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://soundsanctuary.com";
  const routes = [
    { url: base, priority: 1.0 },
    { url: `${base}/sound-healing`, priority: 0.9 },
    { url: `${base}/sessions`, priority: 0.9 },
    { url: `${base}/about`, priority: 0.8 },
    { url: `${base}/portfolio`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.8 },
    { url: `${base}/newsletter`, priority: 0.6 },
    { url: `${base}/privacy`, priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
```

**`src/app/robots.ts`:**
```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://soundsanctuary.com/sitemap.xml",
  };
}
```

**Gate:**
```bash
grep "export const metadata" src/app/sound-healing/page.tsx  # deve aparecer
grep "export const metadata" src/app/sessions/page.tsx       # deve aparecer
grep "export const metadata" src/app/contact/page.tsx        # deve aparecer
test -f src/app/sitemap.ts && echo "sitemap OK"
test -f src/app/robots.ts && echo "robots OK"
test -f src/app/portfolio/layout.tsx && echo "portfolio layout OK"
bash scripts/agent_check.sh
```

**Dependências:** PR-2 (newsletter page deve estar atualizada antes de adicionar metadata).

---

### PR-6: Documentação — Sprint S05 + handoff

**Arquivos:**
- Create: `docs/SPRINTS/S05.md`
- Modify: `docs/HISTORY.md`
- Create: `docs/AGENT_REPORT_S05.md`

**`docs/SPRINTS/S05.md` conteúdo mínimo:**
- Sprint goal
- PRs entregues (PR-1 a PR-5) com merge commits e evidências de gate
- Definition of done (checklist)
- Gaps restantes para S06

**`docs/HISTORY.md`:** adicionar entrada `## 2026-02-18 (S05)`.

**`docs/AGENT_REPORT_S05.md`:** usar o template abaixo.

**Gate:**
```bash
test -f docs/SPRINTS/S05.md
test -f docs/AGENT_REPORT_S05.md
grep "S05" docs/HISTORY.md
```

**Dependências:** PR-1 a PR-5 concluídos.

---

## Dependências entre PRs

```
PR-1 (placeholders)     → independente — fazer PRIMEIRO
  ├─ PR-2 (newsletter)  → depende de PR-1
  └─ PR-3 (portfolio)   → depende de PR-1

PR-4 (nav)              → independente (pode rodar junto com PR-1)

PR-5 (SEO)              → depende de PR-2 (newsletter atualizada)

PR-6 (docs)             → depende de PR-1..PR-5 — fazer ÚLTIMO
```

**Ordem otimizada:**
1. PR-1 + PR-4 em paralelo (ambos independentes)
2. PR-2 + PR-3 (dependem de PR-1)
3. PR-5 (depende de PR-2)
4. PR-6 (último)

---

## Gate obrigatório (antes de cada merge)

```bash
bash scripts/agent_check.sh
# → lint ✓ + build ✓
```

Gate final (PR-6):
```bash
# Zero placeholders visíveis
grep -r "placeholder\|X hours\|seed mutation\|not live yet" src/app/ \
  | grep -v "NewsletterForm\|node_modules\|\.next\|placeholder=\""
# Esperado: 0 linhas

# Layout alignment
grep "journey-container" src/app/newsletter/page.tsx
grep "journey-container" src/app/portfolio/page.tsx

# Newsletter conectada
grep "NewsletterForm" src/app/newsletter/page.tsx

# Nav limpa
grep -c "privacy" src/components/SiteHeader.tsx  # esperado: 0

# SEO
test -f src/app/sitemap.ts && echo "sitemap OK"
test -f src/app/robots.ts  && echo "robots OK"
grep "export const metadata" src/app/sound-healing/page.tsx
grep "export const metadata" src/app/sessions/page.tsx

# Docs
test -f docs/AGENT_REPORT_S05.md && echo "report OK"
```

---

## Report final (obrigatório)

Criar `docs/AGENT_REPORT_S05.md`:

```markdown
# AGENT REPORT — S05 Content Polish + SEO + Layout Alignment

## Briefing executado
- `docs/prompts/CODEX_EXEC_S05.md`

## PRs entregues
| PR | Branch | Merge commit | Status |
|----|--------|-------------|--------|
| PR-1 | feat/s05-pr1-placeholders | ... | MERGED |
| PR-2 | feat/s05-pr2-newsletter   | ... | MERGED |
| PR-3 | feat/s05-pr3-portfolio    | ... | MERGED |
| PR-4 | feat/s05-pr4-nav          | ... | MERGED |
| PR-5 | feat/s05-pr5-seo          | ... | MERGED |
| PR-6 | feat/s05-pr6-docs         | ... | MERGED |

## Gates
- `bash scripts/agent_check.sh` → lint ✓ + build ✓ em cada PR
- [listar todos os gate checks com outputs reais]

## Mudanças entregues
- [ ] Placeholders removidos (X hours → 48h, Duration placeholder → duração real)
- [ ] Privacy notice mínima funcional
- [ ] Newsletter page: NewsletterForm conectado
- [ ] Newsletter page: journey-container layout
- [ ] Portfolio page: journey-container layout + ds-glass cards + ScapesEmpty
- [ ] Privacy removido do nav principal → footer
- [ ] Metadata em: sound-healing, sessions, contact, newsletter, portfolio/layout
- [ ] sitemap.ts criado
- [ ] robots.ts criado

## Gaps para S06
- [listar o que ficou fora de escopo]
```

---

## Definition of Done (S05)

1. ✓ Zero placeholders visíveis ao usuário (`X hours`, `Duration placeholder`, `not live yet`, `seed mutation`)
2. ✓ Privacy notice mínima funcional em `/privacy`
3. ✓ `newsletter/page.tsx` usa `NewsletterForm` e layout `journey-container`
4. ✓ `portfolio/page.tsx` usa `journey-container`, `ds-glass`, `ds-skeleton`, `ScapesEmpty`
5. ✓ `Privacy` removido do nav principal, adicionado ao footer
6. ✓ Metadata em todas as páginas (sound-healing, sessions, contact, newsletter, portfolio via layout)
7. ✓ `src/app/sitemap.ts` criado
8. ✓ `src/app/robots.ts` criado
9. ✓ `bash scripts/agent_check.sh` → lint ✓ + build ✓
10. ✓ `docs/SPRINTS/S05.md` criado
11. ✓ `docs/AGENT_REPORT_S05.md` criado com gates reais
12. ✓ `docs/HISTORY.md` atualizado
