"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../convex/_generated/api";

type Status = "idle" | "loading" | "success" | "exists" | "error";

export interface TasterModalProps {
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

  const disabled = useMemo(() => status === "loading", [status]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
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
          return;
        }

        setStatus("success");
        setMessage(t("success"));
        setName("");
        setEmail("");
      } catch (err: unknown) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : t("errorFallback"));
      }
    },
    [email, name, subscribe, t]
  );

  if (!open) return null;

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
          <button className="ds-modal__close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="ds-modal__body">
          <p className="text-secondary mb-6">{t("description")}</p>

          {status === "success" ? (
            <div className="py-4 text-center">
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
              <button type="submit" className="btn btn-primary w-full disabled:opacity-60" disabled={disabled}>
                {t("submit")}
              </button>
              {message ? (
                <p className={["ds-size-sm", status === "error" ? "text-red-600" : "text-secondary"].join(" ")}>
                  {message}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
