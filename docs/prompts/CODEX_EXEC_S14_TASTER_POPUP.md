# CODEX EXEC S14 — Taster Session Popup (Lead Capture)

## Context

Add a "Try a Free Sound Healing Session" popup modal that captures the visitor's name + email to send them access to a free recorded session. Inspired by aboutgong.com's "Feeling anxious?" popup.

The project already has a working subscriber mutation in Convex (`api.subscribers.subscribe`) with a `source` field. The popup reuses this infra with `source: "taster"`.

## Goal

Create a modal component triggered by a CTA button on the home page. The modal:
- Uses the design system's `ds-modal` pattern (see `design-system/docs/components/OVERLAY_FEEDBACK.md`)
- Captures First Name + Email
- Submits to the existing Convex `subscribers.subscribe` mutation with `source: "taster"`
- Shows success/error feedback
- Adapts to the dark organic aesthetic of the site

## Files to create/edit

| File | Action |
|------|--------|
| `src/components/TasterModal.tsx` | **CREATE** — modal component |
| `src/app/[locale]/page.tsx` | **EDIT** — add taster CTA section + import |
| `messages/en.json` | **EDIT** — add `home.taster.*` and `tasterModal.*` keys |
| `messages/pt-BR.json` | **EDIT** — add same keys in Portuguese |

## 1. Create `src/components/TasterModal.tsx`

A client component with a modal overlay:

```tsx
"use client";

import { type FormEvent, useState, useEffect, useCallback } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../convex/_generated/api";

type Status = "idle" | "loading" | "success" | "exists" | "error";

interface TasterModalProps {
  open: boolean;
  onClose: () => void;
}

export function TasterModal({ open, onClose }: TasterModalProps) {
  const t = useTranslations("tasterModal");
  const subscribe = useMutation(api.subscribers.subscribe);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await subscribe({
        email,
        name: name.trim() || undefined,
        source: "taster",
      });
      if (res.alreadySubscribed) {
        setStatus("exists");
        setMessage(t("alreadySubscribed"));
      } else {
        setStatus("success");
        setMessage(t("success"));
        setName("");
        setEmail("");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t("errorFallback"));
    }
  }, [email, name, subscribe, t]);

  if (!open) return null;

  const disabled = status === "loading";

  return (
    <div className="ds-modal-backdrop" onClick={onClose}>
      <div
        className="ds-modal ds-modal--md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="taster-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ds-modal__header">
          <h2 id="taster-title" className="ds-modal__title ds-font-display ds-size-2xl">
            {t("title")}
          </h2>
          <button
            className="ds-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="ds-modal__body">
          <p className="text-secondary mb-6">{t("description")}</p>

          {status === "success" ? (
            <div className="text-center py-4">
              <p className="ds-font-display ds-size-xl text-primary">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                autoComplete="given-name"
                placeholder={t("namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={disabled}
              />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                disabled={disabled}
              />
              <button
                type="submit"
                className="btn btn-primary w-full disabled:opacity-60"
                disabled={disabled}
              >
                {t("submit")}
              </button>
              {message && status !== "success" && (
                <p className={`text-sm ${status === "error" ? "text-red-600" : "text-secondary"}`}>
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 2. Add taster section + trigger in page.tsx

Add a new section after the CURRENT OFFERS section and before the CTA strip. This section has a title, description, and a button that opens the modal.

Since `page.tsx` is a Server Component, create a small client wrapper for the trigger:

```tsx
// Add this import at the top of page.tsx
import { TasterSection } from "@/components/TasterSection";
```

Create `src/components/TasterSection.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TasterModal } from "./TasterModal";

export function TasterSection() {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="journey-container journey-section text-center">
        <h2 className="journey-title">{t("taster.title")}</h2>
        <p className="journey-sub max-w-2xl mx-auto">{t("taster.description")}</p>
        <button
          className="btn btn-primary mt-6"
          onClick={() => setOpen(true)}
        >
          {t("taster.cta")}
        </button>
      </section>
      <TasterModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

In `page.tsx`, place `<TasterSection />` after the offers `</section>` and before the `hero-cta-strip`:

```tsx
{/* -- CURRENT OFFERS -- */}
<section className="journey-container journey-section text-center">
  ...
</section>

{/* -- TASTER SESSION -- */}
<TasterSection />

{/* ── CTA strip ── */}
<div className="hero-cta-strip">
```

## 3. i18n keys

### messages/en.json

Add under `"home"`:

```json
"taster": {
  "title": "Try a Free Sound Healing Session",
  "description": "A sound healing session is the perfect way to relax from home whenever you need immediate relief. It's a chance to reconnect with your inner world without having to travel anywhere.",
  "cta": "Access the Taster Session"
}
```

Add new top-level namespace `"tasterModal"`:

```json
"tasterModal": {
  "title": "Receive Your Free Session",
  "description": "Enter your details below and we'll send you a link to a free recorded sound healing session.",
  "namePlaceholder": "First Name",
  "emailPlaceholder": "Email",
  "submit": "Send Me the Recording",
  "success": "Check your inbox! Your free session is on the way.",
  "alreadySubscribed": "You already have access! Check your inbox.",
  "errorFallback": "Something went wrong. Please try again."
}
```

### messages/pt-BR.json

Add under `"home"`:

```json
"taster": {
  "title": "Experimente uma Sessão Gratuita de Sound Healing",
  "description": "Uma sessão de sound healing é a forma perfeita de relaxar em casa sempre que você precisa de alívio imediato. É uma chance de reconectar com o seu mundo interior sem precisar sair de casa.",
  "cta": "Acessar a Sessão Gratuita"
}
```

Add new top-level namespace `"tasterModal"`:

```json
"tasterModal": {
  "title": "Receba Sua Sessão Gratuita",
  "description": "Preencha seus dados abaixo e enviaremos um link para uma sessão gravada de sound healing gratuita.",
  "namePlaceholder": "Primeiro Nome",
  "emailPlaceholder": "Email",
  "submit": "Enviar a Gravação",
  "success": "Confira sua caixa de entrada! Sua sessão gratuita está a caminho.",
  "alreadySubscribed": "Você já tem acesso! Confira sua caixa de entrada.",
  "errorFallback": "Algo deu errado. Tente novamente."
}
```

## 4. Styling

The modal uses existing `ds-modal` classes from the design system. If those classes are not yet compiled into the dist CSS, add minimal modal styles to `globals.css`:

```css
/* Taster modal — fallback if ds-modal not in dist */
.ds-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.ds-modal {
  position: relative;
  width: 90%;
  max-width: 560px;
  border-radius: var(--sh-radius-lg, 1rem);
  background: var(--sh-semantic-surface-primary, #1a1a16);
  border: 1px solid var(--sh-semantic-border-default, rgba(196, 163, 90, 0.15));
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.ds-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}

.ds-modal__close {
  background: none;
  border: none;
  color: var(--sh-semantic-text-secondary, #a9a28e);
  font-size: 1.75rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem;
}

.ds-modal__body {
  padding: 1rem 1.5rem 1.5rem;
}
```

Check if `ds-modal` styles already exist in `design-system/styles/dist/components.css` before adding fallback. Use:

```bash
grep -l "ds-modal" design-system/styles/dist/*.css
```

If found, skip the fallback CSS above.

## Constraints

- Reuse the existing `api.subscribers.subscribe` mutation — do NOT create new Convex functions
- Use `source: "taster"` to distinguish taster leads from newsletter subscribers
- Use existing design system classes where available
- Do NOT add npm dependencies
- Run `npm run lint` and `npm run build` to verify
