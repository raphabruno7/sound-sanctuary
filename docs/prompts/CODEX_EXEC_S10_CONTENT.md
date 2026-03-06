# CODEX_EXEC_S10_CONTENT — Sound Sanctuary: Sound Bath section (homepage)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new "soundBath" section to the homepage, right after the hero and before the "For Whom" section. All copy is localized (pt-BR + en) via the i18n system already in place from S09.

**Architecture:** Messages-only + one section inserted in `src/app/[locale]/page.tsx`. No new components, no new dependencies, no DS changes.

**Tech Stack:** Next.js App Router · TypeScript · next-intl · DS v8.9.0

---

## Contexto

Repo: `/Users/raphaelbruno/projects/sound-sanctuary`
Worktree: `.worktrees/feat-homepage-restructure-i18n`
Branch: `feat/homepage-restructure-i18n`

S09 completed i18n infrastructure. The homepage already uses `getTranslations("home")`.
Add a new `soundBath` section right after the HERO section (before `forWhom`) in
`src/app/[locale]/page.tsx`. All copy goes into `messages/pt-BR.json` and `messages/en.json`.

---

## Pré-requisito

```bash
cd /Users/raphaelbruno/projects/sound-sanctuary/.worktrees/feat-homepage-restructure-i18n
npm install
npm test
```

---

## Escopo

### STEP 1 — Adicionar chaves em `messages/pt-BR.json`

Dentro do objeto `"home"`, adicionar o bloco `"soundBath"` **antes de `"forWhom"`**:

```json
"soundBath": {
  "label": "Banho de Som",
  "title": "Som: o super alimento do sistema nervoso.",
  "opening": "O sistema nervoso é vibração.",
  "p1": "Quando você se deita e os instrumentos começam a tocar, seu sistema nervoso entra em sintonia com o som. Ele obedece e vibra junto.",
  "p2": "Seus ossos, sua água interna, cada célula — tudo entra em ressonância com as taças tibetanas e o gongo.",
  "reset": "E você reinicia.",
  "p3": "Durante um Banho de Som, o som percorre o seu corpo, organiza onde há desordem, dissolve o que está preso e gentilmente desfaz bloqueios.",
  "p4": "O som ajuda o corpo a sair do estresse crônico e entrar em estados que suportam o sono, a imunidade, a clareza mental, o equilíbrio emocional e a saúde a longo prazo.",
  "closing": "E sabe o que você precisa fazer? Nada. Apenas deitar e receber."
}
```

---

### STEP 2 — Adicionar chaves em `messages/en.json`

Dentro do objeto `"home"`, adicionar o bloco `"soundBath"` **antes de `"forWhom"`**:

```json
"soundBath": {
  "label": "Sound Bath",
  "title": "Sound: the superfood for the nervous system.",
  "opening": "The nervous system is vibration.",
  "p1": "When you lie down and the instruments begin to play, your nervous system tunes in with the sound. It obeys and vibrates along.",
  "p2": "Your bones, your inner water, every cell — everything enters resonance with the Tibetan singing bowls and the gong.",
  "reset": "And you reboot.",
  "p3": "During a Sound Bath, sound travels through your body, organizes where there is disorder, dissolves what is stuck, and gently unravels blockages.",
  "p4": "Sound helps the body move out of chronic stress and into states that support sleep, immunity, mental clarity, emotional balance, and long-term health.",
  "closing": "And do you know what you need to do? Nothing. Just lie down and receive."
}
```

---

### STEP 3 — Inserir seção em `src/app/[locale]/page.tsx`

No bloco `<main>`, inserir a seguinte seção **entre o HERO (seção 1) e o FOR WHOM (seção 2)** — exatamente após `</section> {/* HERO */}`:

```tsx
{/* ── 1.5. SOUND BATH — what it is ──────────────────────── */}
<section className="journey-container journey-section journey-section-lg">
  <div className="journey-label">{t("soundBath.label")}</div>
  <h2 className="journey-title ds-font-display ds-weight-light">
    {t("soundBath.title")}
  </h2>
  <p className="journey-sub mt-4">{t("soundBath.opening")}</p>
  <div className="ds-glass journey-card mt-6 space-y-4 text-secondary leading-relaxed">
    <p>{t("soundBath.p1")}</p>
    <p>{t("soundBath.p2")}</p>
    <p className="ds-font-display ds-italic ds-size-xl journey-breathe">
      {t("soundBath.reset")}
    </p>
    <p>{t("soundBath.p3")}</p>
    <p>{t("soundBath.p4")}</p>
  </div>
  <p className="mt-6 ds-size-lg ds-font-display ds-italic text-secondary">
    {t("soundBath.closing")}
  </p>
</section>
```

---

## Gate

```bash
npm test
npm run lint
npm run build
```

Verificação manual:
- [ ] Seção aparece entre hero e "Para quem é" / "For whom"
- [ ] PT-BR (`/pt-BR`) exibe copy em português
- [ ] EN (`/`) exibe copy em inglês
- [ ] "E você reinicia." renderiza em fonte display itálica
- [ ] "E sabe o que você precisa fazer?..." aparece como linha de fechamento abaixo do glass card

---

## Definition of Done

- `npm test && npm run lint && npm run build` PASS
- Chaves adicionadas em ambos os arquivos de mensagens
- Seção inserida na posição correta no componente
- DS não modificado
- Nenhuma dependência nova adicionada

---

## Report

Criar `docs/AGENT_REPORT_S10_CONTENT_2026-02-22.md` confirmando:
- Chaves adicionadas (pt-BR + en)
- Seção inserida
- Resultado de test/lint/build
