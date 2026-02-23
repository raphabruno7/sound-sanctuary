# Homepage Restructure + i18n Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure the sound-sanctuary homepage to follow a conversion funnel order and add EN + PT-BR i18n support via next-intl.

**Architecture:** Add next-intl with `[locale]` App Router segment (EN default, PT-BR secondary). Move all pages into `src/app/[locale]/`. Restructure `page.tsx` section order from practitioner logic to client funnel logic. Create new `PractitionerSection` component. Integrate Framework Elemental into "Why it works" section.

**Tech Stack:** Next.js 16 App Router · next-intl · TypeScript · existing design system (ds-glass, journey-* CSS classes, design tokens)

**Repo:** `/Users/raphaelbruno/projects/sound-sanctuary`

---

## Context for Codex

### Current section order (page.tsx) — WRONG order
1. Hero
2. Upstream Care (O que é)
3. Princípio Fundador (Por que funciona)
4. Five Steps (Como funciona)
5. Session Formats
6. Framework Elemental (4 elementos standalone)
7. Impulso (animation section — no strategic purpose)
8. Who It Is For (Para quem é)
9. Sound Healing Live
10. PortfolioPreview
11. TestimonialsPreview
12. Contact CTA

### New section order — conversion funnel logic
1. Hero
2. Para quem é (Who It Is For) — self-identification first
3. O que é (What It Is) — explanation after hook
4. Por que funciona (Why It Works) — Princípio Fundador + Framework Elemental merged
5. Como é uma sessão (Five Steps) — demystification
6. Quem sou eu (Practitioner) — NEW SECTION
7. Depoimentos (Testimonials) — moved before offer
8. Formatos (Session Formats) — offer
9. Sound Healing Live
10. Portfolio Preview
11. Contact CTA + newsletter

### Key changes
- **Framework Elemental**: moves from standalone section → sub-block inside "Por que funciona"
- **Impulso section**: remove copy entirely, keep only the SVG animation as a silent visual separator (no label, no text)
- **Quem sou eu**: new `PractitionerSection` component with portrait photo + 2 paragraphs
- **"you →" annotation**: ForWhom section uses hero photo with a text overlay pointing to the person lying down
- **Testimonials**: move from after portfolio to before Formats
- All strings extracted to `messages/en.json` and `messages/pt-BR.json`

### File structure after this plan
```
src/
  app/
    layout.tsx              ← minimal root (passes children, no html/body)
    globals.css             ← stays here
    favicon.ico             ← stays here
    robots.ts               ← stays here
    sitemap.ts              ← stays here
    [locale]/
      layout.tsx            ← NEW: html lang={locale}, all providers, header, footer
      page.tsx              ← MOVED + REWRITTEN: new section order
      about/page.tsx        ← MOVED
      contact/page.tsx      ← MOVED
      newsletter/page.tsx   ← MOVED
      portfolio/
        layout.tsx          ← MOVED
        page.tsx            ← MOVED
      privacy/page.tsx      ← MOVED
      sessions/page.tsx     ← MOVED
      sound-healing/page.tsx ← MOVED
  i18n/
    routing.ts              ← NEW
    request.ts              ← NEW
  middleware.ts             ← NEW
  components/
    PractitionerSection.tsx ← NEW
    LanguageToggle.tsx      ← NEW
    SiteHeader.tsx          ← UPDATED (add LanguageToggle)
    ... (rest unchanged)
messages/
  en.json                   ← NEW (project root)
  pt-BR.json                ← NEW (project root)
next.config.ts              ← UPDATED (add withNextIntl wrapper)
```

---

## Task 1: Install next-intl

**Files:**
- Modify: `package.json`

**Step 1: Install the package**
```bash
cd /Users/raphaelbruno/projects/sound-sanctuary
npm install next-intl
```

**Step 2: Verify installation**
```bash
npm ls next-intl
```
Expected: `next-intl@x.x.x` in output (no errors).

**Step 3: Commit**
```bash
git add package.json package-lock.json
git commit -m "feat(i18n): add next-intl"
```

---

## Task 2: Configure next-intl

**Files:**
- Modify: `next.config.ts`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`

**Step 1: Update `next.config.ts`**

Replace the entire file with:
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

**Step 2: Create `src/i18n/routing.ts`**
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // EN at /, PT-BR at /pt-BR
});
```

**Step 3: Create `src/i18n/request.ts`**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as 'en' | 'pt-BR')) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**Step 4: Create `src/middleware.ts`**
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

**Step 5: Commit**
```bash
git add next.config.ts src/i18n/routing.ts src/i18n/request.ts src/middleware.ts
git commit -m "feat(i18n): configure next-intl routing and middleware"
```

---

## Task 3: Create message files

**Files:**
- Create: `messages/en.json` (at project root, next to `package.json`)
- Create: `messages/pt-BR.json`

**Step 1: Create `messages/en.json`**
```json
{
  "nav": {
    "soundHealing": "Sound Healing",
    "sessions": "Sessions",
    "portfolio": "Portfolio",
    "about": "About",
    "contact": "Contact",
    "book": "Book 1:1",
    "langToggle": "PT"
  },
  "home": {
    "hero": {
      "title": "Sound Healing",
      "poetic": "O prana canta enquanto flui",
      "sub": "Regulation practice for modern life: rhythm, rest, and integration.",
      "cta_primary": "Book a 1:1",
      "cta_secondary": "Join Sound Healing Live"
    },
    "forWhom": {
      "label": "Who It Is For",
      "title": "When life runs hot",
      "annotation": "you",
      "items": [
        "anxiety / stress",
        "sleep issues",
        "overstimulation",
        "integration after intense periods"
      ],
      "cta_prompt": "Ready to downshift? Two paths. Same intention.",
      "cta_primary": "Book a 1:1",
      "cta_secondary": "Explore portfolio"
    },
    "whatItIs": {
      "label": "Upstream Care",
      "title": "A calm, structured sound practice",
      "sub": "Sound Healing uses resonance, rhythm, and guided rest to help the nervous system downshift without performance.",
      "p1": "It is simple: you arrive, you settle, sound creates a field, and your body has room to integrate. Nothing to achieve.",
      "p2": "The promise is not medical treatment. It is training capacity: downshifting, returning to rhythm, and leaving with more space inside."
    },
    "whyItWorks": {
      "label": "Sound and the Nervous System",
      "title": "Why it works",
      "p1": "The human body is 70% water. Sound travels through water.",
      "p2": "The nervous system is immersed in that water.",
      "p3": "When the bowl strikes, vibration meets the fluid, propagates as a wave, and reaches every nerve from within.",
      "overline": "Sound rebuilds the nervous system.",
      "framework_label": "The Elemental Framework",
      "sun_name": "The Sun",
      "sun_sub": "heals, charges, warms",
      "sun_body": "The frequency of fire. Heat that dissolves.",
      "moon_name": "The Moon",
      "moon_sub": "connects, manifests, unlocks",
      "moon_body": "Internal water frequency and the subtle body's rhythm.",
      "ocean_name": "The Ocean",
      "ocean_sub": "cleanses, refreshes, opens",
      "ocean_body": "Undulation that cleanses and opens energy centers.",
      "forest_name": "The Forest",
      "forest_sub": "grounds, balances, stabilizes",
      "forest_body": "Root. Grounding. Low sound that anchors to earth."
    },
    "howItWorks": {
      "label": "What Happens in a Session",
      "title": "Five steps, no mystery",
      "step1": "Arrival",
      "step2": "Grounding",
      "step3": "Sound immersion",
      "step4": "Integration",
      "step5": "Closing"
    },
    "practitioner": {
      "label": "About",
      "title": "[Practitioner Name]",
      "identity": "[One line — who you are and what you do]",
      "p1": "[Journey: how you arrived at sound healing]",
      "p2": "[Approach: what guides your practice]",
      "cta": "Full story"
    },
    "formats": {
      "label": "Session Formats",
      "title": "Choose depth",
      "oneOnOne_title": "1:1 Sound Therapy",
      "oneOnOne_duration": "60 min",
      "oneOnOne_for": "For deeper pacing + integration support",
      "oneOnOne_body": "Personalized support for transitions, sleep stress, and chronic overstimulation.",
      "oneOnOne_cta_primary": "Book a 1:1",
      "oneOnOne_cta_secondary": "See session details",
      "group_title": "Group Sound Journey",
      "group_duration": "90 min",
      "group_for": "Collective rest without performance",
      "group_body": "A shared field for settling and connection. Low barrier and high felt sense.",
      "group_cta_primary": "See next live",
      "group_cta_secondary": "Contact"
    },
    "live": {
      "label": "Live",
      "title": "Sound Healing Live",
      "sub": "A weekly ritual to keep your nervous system tended. Join for a reset and return for rhythm.",
      "body": "Low commitment. High return. Show up, lie down, let sound do the work.",
      "cta_primary": "Join the loop",
      "cta_secondary": "See sessions"
    },
    "contact": {
      "label": "Contact",
      "title": "Book a 1:1",
      "sub": "Three questions. I reply within 48 hours.",
      "cta_primary": "Start with a session",
      "cta_secondary": "Open contact"
    }
  }
}
```

**Step 2: Create `messages/pt-BR.json`**
```json
{
  "nav": {
    "soundHealing": "Sound Healing",
    "sessions": "Sessões",
    "portfolio": "Portfólio",
    "about": "Sobre",
    "contact": "Contato",
    "book": "Agendar 1:1",
    "langToggle": "EN"
  },
  "home": {
    "hero": {
      "title": "Sound Healing",
      "poetic": "O prana canta enquanto flui",
      "sub": "Uma prática de regulação para a vida moderna: ritmo, descanso e integração.",
      "cta_primary": "Agendar 1:1",
      "cta_secondary": "Entrar no Sound Healing Live"
    },
    "forWhom": {
      "label": "Para quem é",
      "title": "Quando a vida acelera demais",
      "annotation": "você",
      "items": [
        "ansiedade / estresse",
        "dificuldades com o sono",
        "superestimulação",
        "integração após períodos intensos"
      ],
      "cta_prompt": "Pronto para desacelerar? Dois caminhos. Mesma intenção.",
      "cta_primary": "Agendar 1:1",
      "cta_secondary": "Ver portfólio"
    },
    "whatItIs": {
      "label": "Cuidado preventivo",
      "title": "Uma prática sonora calma e estruturada",
      "sub": "O Sound Healing usa ressonância, ritmo e descanso guiado para ajudar o sistema nervoso a desacelerar sem performance.",
      "p1": "É simples: você chega, se instala, o som cria um campo e o seu corpo tem espaço para integrar. Nada a atingir.",
      "p2": "A promessa não é tratamento médico. É treinar capacidade: desacelerar, voltar ao ritmo e sair com mais espaço interno."
    },
    "whyItWorks": {
      "label": "Som e Sistema Nervoso",
      "title": "Por que funciona",
      "p1": "O corpo humano é 70% água. O som viaja pela água.",
      "p2": "O sistema nervoso está imerso nessa água.",
      "p3": "Quando a tigela toca, a vibração encontra o líquido, se propaga como onda e alcança cada nervo por dentro.",
      "overline": "O som reconstrói o sistema nervoso.",
      "framework_label": "Framework Elemental",
      "sun_name": "O Sol",
      "sun_sub": "cura, carrega, aquece",
      "sun_body": "Frequência do fogo. Calor que dissolve.",
      "moon_name": "A Lua",
      "moon_sub": "conecta, manifesta, desbloqueia",
      "moon_body": "Frequência da água interna e ritmo do corpo sutil.",
      "ocean_name": "O Oceano",
      "ocean_sub": "limpa, refresca, abre",
      "ocean_body": "Ondulação que limpa e abre centros de energia.",
      "forest_name": "A Floresta",
      "forest_sub": "enraíza, equilibra, estabiliza",
      "forest_body": "Raiz. Aterramento. Som grave que ancora na terra."
    },
    "howItWorks": {
      "label": "O que acontece em uma sessão",
      "title": "Cinco etapas, sem mistério",
      "step1": "Chegada",
      "step2": "Enraizamento",
      "step3": "Imersão sonora",
      "step4": "Integração",
      "step5": "Encerramento"
    },
    "practitioner": {
      "label": "Sobre",
      "title": "[Nome do Praticante]",
      "identity": "[Uma linha — quem você é e o que faz]",
      "p1": "[Trajetória: como você chegou ao som]",
      "p2": "[Abordagem: o que guia sua prática]",
      "cta": "História completa"
    },
    "formats": {
      "label": "Formatos de Sessão",
      "title": "Escolha a profundidade",
      "oneOnOne_title": "1:1 Terapia Sonora",
      "oneOnOne_duration": "60 min",
      "oneOnOne_for": "Para suporte de integração mais profundo",
      "oneOnOne_body": "Suporte personalizado para transições, estresse do sono e superestimulação crônica.",
      "oneOnOne_cta_primary": "Agendar 1:1",
      "oneOnOne_cta_secondary": "Ver detalhes da sessão",
      "group_title": "Jornada Sonora em Grupo",
      "group_duration": "90 min",
      "group_for": "Descanso coletivo sem performance",
      "group_body": "Um campo compartilhado para aquietar e conectar. Baixa barreira, alto senso de pertencimento.",
      "group_cta_primary": "Ver próximo ao vivo",
      "group_cta_secondary": "Contato"
    },
    "live": {
      "label": "Ao Vivo",
      "title": "Sound Healing Live",
      "sub": "Um ritual semanal para cuidar do seu sistema nervoso. Venha para um reset e volte para o ritmo.",
      "body": "Baixo compromisso. Alto retorno. Apareça, deite, deixe o som trabalhar.",
      "cta_primary": "Entrar no loop",
      "cta_secondary": "Ver sessões"
    },
    "contact": {
      "label": "Contato",
      "title": "Agendar 1:1",
      "sub": "Três perguntas. Respondo em até 48 horas.",
      "cta_primary": "Começar com uma sessão",
      "cta_secondary": "Abrir contato"
    }
  }
}
```

**Step 3: Commit**
```bash
git add messages/
git commit -m "feat(i18n): add EN and PT-BR message files"
```

---

## Task 4: Restructure app directory for locale routing

**Goal:** Move all page/layout files from `src/app/` into `src/app/[locale]/`. Update root layout to be minimal (no html/body). Create locale layout with html lang={locale} and all providers.

**Step 1: Create `src/app/[locale]/` directory structure**

Create the following directories (they will be populated in next steps):
```
src/app/[locale]/
src/app/[locale]/about/
src/app/[locale]/contact/
src/app/[locale]/newsletter/
src/app/[locale]/portfolio/
src/app/[locale]/privacy/
src/app/[locale]/sessions/
src/app/[locale]/sound-healing/
```

**Step 2: Create `src/app/[locale]/layout.tsx`**

This replaces the current root layout as the main layout. Create this file:

```typescript
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "Sound Sanctuary",
    template: "%s | Sound Sanctuary",
  },
  description:
    "Sound healing, contemplative practices, and grounded sessions to support calm and nervous system regulation.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt-BR")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className="bg-background text-foreground antialiased"
        style={{ backgroundColor: "var(--sh-semantic-bg-primary, #F8F6F1)" }}
      >
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
        <NextIntlClientProvider messages={messages}>
          <ConvexClientProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
          </ConvexClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 3: Replace `src/app/layout.tsx` with minimal passthrough**

The root layout is still required by Next.js but we want html/body in the locale layout. Replace it with:

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

**Step 4: Move all existing page files**

Move these files (copy content, create at new path, delete originals):

| From | To |
|------|----|
| `src/app/about/page.tsx` | `src/app/[locale]/about/page.tsx` |
| `src/app/contact/page.tsx` | `src/app/[locale]/contact/page.tsx` |
| `src/app/newsletter/page.tsx` | `src/app/[locale]/newsletter/page.tsx` |
| `src/app/portfolio/layout.tsx` | `src/app/[locale]/portfolio/layout.tsx` |
| `src/app/portfolio/page.tsx` | `src/app/[locale]/portfolio/page.tsx` |
| `src/app/privacy/page.tsx` | `src/app/[locale]/privacy/page.tsx` |
| `src/app/sessions/page.tsx` | `src/app/[locale]/sessions/page.tsx` |
| `src/app/sound-healing/page.tsx` | `src/app/[locale]/sound-healing/page.tsx` |

Do NOT move `globals.css`, `favicon.ico`, `robots.ts`, `sitemap.ts` — these stay at `src/app/`.

**Step 5: Verify dev server starts**
```bash
npm run dev
```
Visit `http://localhost:3000` — should see the homepage without errors.
Visit `http://localhost:3000/pt-BR` — should see PT-BR version.

**Step 6: Commit**
```bash
git add src/app/
git commit -m "feat(i18n): restructure app dir with [locale] segment"
```

---

## Task 5: Create LanguageToggle component

**Files:**
- Create: `src/components/LanguageToggle.tsx`

**Step 1: Create the component**

```typescript
"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  // Strip current locale prefix from path
  const pathWithoutLocale = pathname.replace(/^\/(pt-BR)/, "") || "/";

  const isEN = locale === "en";
  const targetLocale = isEN ? "pt-BR" : "en";
  const targetLabel = isEN ? "PT" : "EN";
  const targetHref = isEN ? `/pt-BR${pathWithoutLocale}` : pathWithoutLocale;

  return (
    <Link
      href={targetHref}
      className="ds-header__link text-sm"
      aria-label={`Switch to ${targetLocale}`}
    >
      {targetLabel}
    </Link>
  );
}
```

**Step 2: Update `src/components/SiteHeader.tsx`**

Add `LanguageToggle` import and insert the component next to `ThemeToggle`. Replace the `<div className="flex items-center gap-2">` block with:

```typescript
// Add to imports:
import { LanguageToggle } from "@/components/LanguageToggle";

// Replace the flex items div:
<div className="flex items-center gap-2">
  <LanguageToggle />
  <ThemeToggle />
  <Link className="btn btn-primary" href="/contact">
    Book 1:1
  </Link>
</div>
```

**Step 3: Verify toggle appears in header and switches locale**

**Step 4: Commit**
```bash
git add src/components/LanguageToggle.tsx src/components/SiteHeader.tsx
git commit -m "feat(i18n): add LanguageToggle to header"
```

---

## Task 6: Create PractitionerSection component

**Files:**
- Create: `src/components/PractitionerSection.tsx`

**Step 1: Create the component**

```typescript
import Image from "next/image";
import Link from "next/link";

interface PractitionerSectionProps {
  label: string;
  title: string;
  identity: string;
  p1: string;
  p2: string;
  cta: string;
}

export function PractitionerSection({
  label,
  title,
  identity,
  p1,
  p2,
  cta,
}: PractitionerSectionProps) {
  return (
    <section className="journey-container journey-section">
      <div className="journey-label">{label}</div>
      <div className="journey-grid-2 mt-6 items-start gap-8">
        <div className="journey-hero-media ds-glass relative overflow-hidden rounded-2xl aspect-[3/4]">
          <Image
            src="/media/practitioner/portrait.jpg"
            alt={title}
            fill
            sizes="(max-width: 980px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <div className="journey-photo-vignette" aria-hidden="true" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="journey-title">{title}</h2>
          <p className="mt-2 ds-font-display ds-italic ds-weight-light ds-size-xl text-secondary">
            {identity}
          </p>
          <p className="mt-5 text-secondary leading-relaxed">{p1}</p>
          <p className="mt-3 text-secondary leading-relaxed">{p2}</p>
          <div className="mt-6">
            <Link className="btn btn-ghost" href="/about">
              {cta} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Note for user:** Add your portrait photo to `/public/media/practitioner/portrait.jpg`. Fill in the practitioner strings in both message files before going live.

**Step 2: Commit**
```bash
git add src/components/PractitionerSection.tsx
git commit -m "feat: add PractitionerSection component"
```

---

## Task 7: Rewrite homepage with new section order

**Files:**
- Rewrite: `src/app/[locale]/page.tsx`

Replace the entire file with the following. Read the current `src/app/page.tsx` first to copy any SVG/animation code that is reused (vine dividers, impulse SVG, venation SVG for Ocean card).

```typescript
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { TestimonialsPreview } from "@/components/TestimonialsPreview";
import { PractitionerSection } from "@/components/PractitionerSection";

// Reusable vine divider SVG — copy from existing page.tsx
function VineDivider() {
  return (
    <div aria-hidden="true" className="journey-container journey-divider">
      <svg
        className="vine-divider"
        viewBox="0 0 400 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Decorative vine divider"
      >
        <defs>
          <style>{`.vine-path:nth-child(2) { animation-delay: 0.4s; }`}</style>
        </defs>
        <path
          className="vine-path"
          d="M10 58C38 22 72 20 98 46C124 72 152 74 178 48C204 22 236 22 262 48C288 74 322 76 390 44"
          stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="620"
          strokeDashoffset="620"
        />
        <path
          className="vine-path"
          d="M10 74C44 38 76 36 102 60C126 84 150 84 174 62C198 40 228 40 252 62C276 84 308 84 390 56"
          stroke="var(--sh-organic-liquid-glass-forest, #2D5A3E)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          strokeDasharray="620"
          strokeDashoffset="620"
        />
        <path d="M72 38C78 28 90 28 96 38C90 48 78 48 72 38Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
        <path d="M146 64C152 54 164 54 170 64C164 74 152 74 146 64Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
        <path d="M218 40C224 30 236 30 242 40C236 50 224 50 218 40Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
        <path d="M292 66C298 56 310 56 316 66C310 76 298 76 292 66Z" fill="var(--sh-organic-liquid-glass-light, #8BC4A0)" opacity="0.2" />
      </svg>
    </div>
  );
}

// Silent visual separator — impulso section stripped of copy
function ImpulseSeparator() {
  return (
    <div aria-hidden="true" className="impulse-section">
      <div className="impulse-plate ds-glass">
        <div className="impulse-art">
          <svg className="impulse-svg" viewBox="0 0 800 420" preserveAspectRatio="none">
            <path
              className="path"
              d="M60,60 C220,50 260,140 340,160 C420,180 480,110 560,140 C640,170 640,270 740,310"
            />
            <path
              className="flash"
              d="M60,60 C220,50 260,140 340,160 C420,180 480,110 560,140 C640,170 640,270 740,310"
            />
            <circle className="node" cx="60" cy="60" r="3" />
            <circle className="node" cx="340" cy="160" r="3" />
            <circle className="node" cx="560" cy="140" r="3" />
            <circle className="node" cx="740" cy="310" r="3" />
          </svg>
        </div>
        <div className="strike-wave-art">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <defs>
              <style>{`
                .ring { fill: none; stroke-width: 2; transform-origin: 150px 150px; animation: strikeWave 6000ms cubic-bezier(0.33, 0, 0.67, 1) infinite; }
                .r1 { stroke: var(--sh-organic-gold-primary, #C4A35A); animation-delay: 0ms; }
                .r2 { stroke: var(--sh-organic-gold-light, #E0C97F); animation-delay: 800ms; }
                .r3 { stroke: var(--sh-organic-liquid-glass-light, #8BC4A0); animation-delay: 1600ms; }
                .r4 { stroke: var(--sh-organic-liquid-glass-ghost, #C8E6D0); animation-delay: 2400ms; }
                .r5 { stroke: var(--sh-organic-ocean-primary, #5A8A8A); animation-delay: 3200ms; }
                .core { fill: var(--sh-organic-gold-primary, #C4A35A); animation: strikeFlash 6000ms cubic-bezier(0.16, 1, 0.3, 1) infinite; }
                @keyframes strikeWave { 0% { opacity: 0; transform: scale(0.2); } 15% { opacity: 0.9; } 100% { opacity: 0; transform: scale(1.7); } }
                @keyframes strikeFlash { 0%, 70%, 100% { opacity: 0.25; r: 5px; } 74% { opacity: 1; r: 12px; } }
              `}</style>
            </defs>
            <rect width="300" height="300" fill="transparent" />
            <circle className="ring r5" cx="150" cy="150" r="80" />
            <circle className="ring r4" cx="150" cy="150" r="65" />
            <circle className="ring r3" cx="150" cy="150" r="50" />
            <circle className="ring r2" cx="150" cy="150" r="35" />
            <circle className="ring r1" cx="150" cy="150" r="20" />
            <circle className="core" cx="150" cy="150" r="6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="min-h-dvh pb-24">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="home-hero">
        <Image
          src="/media/hero/2627.jpg"
          alt="Sound healing session in the forest"
          fill
          priority
          sizes="100vw"
          className="home-hero__image"
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__vignette" aria-hidden="true" />
        <div className="home-hero__content journey-container">
          <div className="home-hero__copy">
            <h1 className="ds-font-display ds-weight-light ds-size-6xl ds-leading-tight">
              {t("hero.title")}
            </h1>
            <p className="mt-3 ds-font-display ds-italic ds-weight-light ds-size-xl journey-breathe sh-breath-pulse text-secondary">
              {t("hero.poetic")}
            </p>
            <p className="journey-sub ds-size-lg">{t("hero.sub")}</p>
            <div className="journey-axon" aria-hidden="true">
              <span className="journey-node left" />
              <span className="journey-node right" />
            </div>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/contact">
                {t("hero.cta_primary")}
              </Link>
              <Link className="btn btn-secondary" href="/sessions">
                {t("hero.cta_secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FOR WHOM — "you →" photo annotation ──────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("forWhom.label")}</div>
        <h2 className="journey-title journey-title-regular">{t("forWhom.title")}</h2>
        <div className="journey-grid-2 mt-6">
          {/* Photo with annotation overlay */}
          <div className="journey-hero-media ds-glass relative overflow-hidden rounded-2xl">
            <Image
              src="/media/hero/2627.jpg"
              alt="Person lying down receiving sound healing in the forest"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
            {/* "you →" annotation pointing to person lying down */}
            <span
              className="absolute bottom-6 right-6 ds-font-display ds-italic ds-size-2xl text-white/90 pointer-events-none select-none"
              aria-hidden="true"
            >
              {t("forWhom.annotation")} →
            </span>
          </div>
          {/* Symptom list + CTA */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-3">
              {(["items.0", "items.1", "items.2", "items.3"] as const).map((key) => (
                <li key={key} className="ds-size-lg text-secondary">
                  {t(`forWhom.${key}`)}
                </li>
              ))}
            </ul>
            <div className="ds-glass mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
              <p className="text-secondary">{t("forWhom.cta_prompt")}</p>
              <div className="btn-row !mb-0">
                <Link className="btn btn-primary" href="/contact">
                  {t("forWhom.cta_primary")}
                </Link>
                <Link className="btn btn-secondary" href="/portfolio">
                  {t("forWhom.cta_secondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VineDivider />

      {/* ── 3. WHAT IT IS ────────────────────────────────────────── */}
      <section className="journey-container journey-section journey-section-lg">
        <div className="journey-label">{t("whatItIs.label")}</div>
        <h2 className="journey-title">{t("whatItIs.title")}</h2>
        <p className="journey-sub">{t("whatItIs.sub")}</p>
        <div className="journey-grid-2 mt-6 text-secondary leading-relaxed">
          <p>{t("whatItIs.p1")}</p>
          <p>{t("whatItIs.p2")}</p>
        </div>
      </section>

      {/* ── 4. WHY IT WORKS — Princípio Fundador + Framework ────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("whyItWorks.label")}</div>
        <h2 className="journey-title journey-title-regular">{t("whyItWorks.title")}</h2>
        <div className="ds-glass journey-card mt-6">
          <p className="text-secondary">{t("whyItWorks.p1")}</p>
          <p className="text-secondary mt-2">{t("whyItWorks.p2")}</p>
          <p className="text-secondary mt-2">{t("whyItWorks.p3")}</p>
          <p className="mt-3 ds-text-overline journey-breathe">{t("whyItWorks.overline")}</p>
        </div>

        {/* Framework Elemental — integrated as methodology */}
        <div className="mt-10">
          <p className="journey-label">{t("whyItWorks.framework_label")}</p>
          <div className="journey-grid-4 mt-4">
            <article className="ds-glass journey-card">
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.sun_name")}</h3>
              <p className="mt-2 text-sm text-secondary">{t("whyItWorks.sun_sub")}</p>
              <p className="mt-3 text-secondary">{t("whyItWorks.sun_body")}</p>
            </article>
            <article className="ds-glass journey-card">
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.moon_name")}</h3>
              <p className="mt-2 text-sm text-secondary">{t("whyItWorks.moon_sub")}</p>
              <p className="mt-3 text-secondary">{t("whyItWorks.moon_body")}</p>
            </article>
            <article className="ds-glass journey-card relative overflow-hidden">
              {/* Venation SVG — copy the full SVG from original page.tsx section 05, The Ocean card */}
              {/* IMPORTANT: paste the full <svg className="venation-art" ...> block here */}
              <div className="relative z-10">
                <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.ocean_name")}</h3>
                <p className="mt-2 text-sm text-secondary">{t("whyItWorks.ocean_sub")}</p>
                <p className="mt-3 text-secondary">{t("whyItWorks.ocean_body")}</p>
              </div>
            </article>
            <article className="ds-glass journey-card">
              <h3 className="ds-font-display ds-size-xl ds-weight-light">{t("whyItWorks.forest_name")}</h3>
              <p className="mt-2 text-sm text-secondary">{t("whyItWorks.forest_sub")}</p>
              <p className="mt-3 text-secondary">{t("whyItWorks.forest_body")}</p>
            </article>
          </div>
        </div>
      </section>

      <VineDivider />

      {/* ── 5. HOW IT WORKS — Five steps ─────────────────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("howItWorks.label")}</div>
        <h2 className="journey-title">{t("howItWorks.title")}</h2>
        <div className="journey-grid-2 mt-6">
          <div className="ds-glass journey-card">
            <ol className="list-decimal pl-6 space-y-2 text-secondary">
              <li>{t("howItWorks.step1")}</li>
              <li>{t("howItWorks.step2")}</li>
              <li>{t("howItWorks.step3")}</li>
              <li>{t("howItWorks.step4")}</li>
              <li>{t("howItWorks.step5")}</li>
            </ol>
          </div>
          <div className="journey-hero-media ds-glass relative overflow-hidden rounded-2xl">
            <Image
              src="/media/sections/2641.jpg"
              alt="Detail of instruments used in a session"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="journey-photo-vignette" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── 6. QUEM SOU EU — Practitioner ────────────────────────── */}
      <PractitionerSection
        label={t("practitioner.label")}
        title={t("practitioner.title")}
        identity={t("practitioner.identity")}
        p1={t("practitioner.p1")}
        p2={t("practitioner.p2")}
        cta={t("practitioner.cta")}
      />

      <ImpulseSeparator />

      {/* ── 7. TESTIMONIALS — before the offer ───────────────────── */}
      <TestimonialsPreview />

      {/* ── 8. FORMATS ───────────────────────────────────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("formats.label")}</div>
        <h2 className="journey-title journey-title-regular">{t("formats.title")}</h2>
        <div className="journey-grid-2 mt-6">
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">{t("formats.oneOnOne_title")}</h3>
            <p className="mt-2 text-sm text-secondary">
              {t("formats.oneOnOne_for")} · {t("formats.oneOnOne_duration")}
            </p>
            <p className="mt-3 text-secondary">{t("formats.oneOnOne_body")}</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-primary" href="/contact">
                {t("formats.oneOnOne_cta_primary")}
              </Link>
              <Link className="btn btn-ghost" href="/sessions">
                {t("formats.oneOnOne_cta_secondary")}
              </Link>
            </div>
          </article>
          <article className="ds-glass journey-card">
            <h3 className="ds-font-display ds-size-2xl ds-weight-light">{t("formats.group_title")}</h3>
            <p className="mt-2 text-sm text-secondary">
              {t("formats.group_for")} · {t("formats.group_duration")}
            </p>
            <p className="mt-3 text-secondary">{t("formats.group_body")}</p>
            <div className="btn-row mt-5">
              <Link className="btn btn-secondary" href="/sessions">
                {t("formats.group_cta_primary")}
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                {t("formats.group_cta_secondary")}
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── 9. SOUND HEALING LIVE ─────────────────────────────────── */}
      <section className="journey-container journey-section">
        <div className="journey-label">{t("live.label")}</div>
        <h2 className="journey-title">{t("live.title")}</h2>
        <p className="journey-sub">{t("live.sub")}</p>
        <div className="ds-glass mt-6 flex flex-wrap items-center justify-between gap-5 rounded-2xl p-6">
          <p className="text-secondary max-w-2xl">{t("live.body")}</p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/newsletter">
              {t("live.cta_primary")}
            </Link>
            <Link className="btn btn-secondary" href="/sessions">
              {t("live.cta_secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. PORTFOLIO ─────────────────────────────────────────── */}
      <PortfolioPreview />

      {/* ── 11. CTA FINAL + NEWSLETTER ───────────────────────────── */}
      <section className="journey-container journey-section" id="contact">
        <div className="journey-label">{t("contact.label")}</div>
        <h2 className="journey-title">{t("contact.title")}</h2>
        <p className="journey-sub">{t("contact.sub")}</p>
        <div className="mt-6">
          <Link className="btn btn-primary" href="/contact">
            {t("contact.cta_primary")}
          </Link>
          <Link className="btn btn-secondary ml-3" href="/contact">
            {t("contact.cta_secondary")}
          </Link>
        </div>
        <NewsletterForm source="home" />
      </section>

    </main>
  );
}
```

**Important note on items array in messages:** The `forWhom.items` array uses `t("forWhom.items.0")` etc. next-intl supports array indexing in messages. Verify this works or alternatively list as `item1`, `item2`, `item3`, `item4` flat keys.

**Step 2: Verify**
```bash
npm run dev
```
- Visit `http://localhost:3000` — EN version
- Visit `http://localhost:3000/pt-BR` — PT-BR version
- Check section order matches: Hero → ForWhom → WhatItIs → WhyItWorks → HowItWorks → Practitioner → Testimonials → Formats → Live → Portfolio → Contact
- Verify "you →" annotation appears on ForWhom photo
- Verify Framework Elemental appears inside WhyItWorks, not as standalone section
- Verify impulse animation is present but has no text/label

**Step 3: Commit**
```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: restructure homepage — conversion funnel order + i18n"
```

---

## Task 8: Delete old app/page.tsx

**Step 1: Delete the original page**
```bash
rm /Users/raphaelbruno/projects/sound-sanctuary/src/app/page.tsx
```

**Step 2: Verify no build errors**
```bash
npm run build
```

**Step 3: Commit**
```bash
git add -A
git commit -m "chore: remove old app/page.tsx after locale migration"
```

---

## Post-implementation checklist

- [ ] Add portrait photo to `/public/media/practitioner/portrait.jpg`
- [ ] Fill in practitioner placeholder strings in `messages/en.json` and `messages/pt-BR.json` (fields: `practitioner.title`, `practitioner.identity`, `practitioner.p1`, `practitioner.p2`)
- [ ] Copy full venation SVG into Ocean card in new page.tsx (marked with IMPORTANT comment)
- [ ] Verify language toggle works on all pages, not just homepage
- [ ] Test on mobile: section order, photo annotations, language toggle visibility
- [ ] Update links in `SiteHeader` to be locale-aware if next-intl requires it (check if `<Link>` from next/link picks up locale automatically via middleware)

---

## Troubleshooting

**"Cannot find module ../../messages/en.json"**
→ Check that `messages/` directory is at the project root (same level as `package.json`), not inside `src/`.

**PT-BR not loading at /pt-BR**
→ Check `src/middleware.ts` config matcher is correct. Verify `routing.locales` includes `'pt-BR'` (with hyphen, not underscore).

**forWhom items not rendering**
→ If `t("forWhom.items.0")` doesn't work, change the items array to flat keys: `item1`, `item2`, `item3`, `item4` in both message files and update the JSX to use `t("forWhom.item1")` etc.

**Root layout error: "html element should have a lang attribute"**
→ The locale layout handles `lang`. If Next.js complains about root layout, add `lang="en"` to root layout as fallback — it will be overridden by the locale layout.
