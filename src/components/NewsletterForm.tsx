"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../convex/_generated/api";

type Status = "idle" | "loading" | "success" | "exists" | "error";

export function NewsletterForm({ source = "home" }: { source?: string }) {
  const t = useTranslations("newsletterForm");
  const subscribe = useMutation(api.subscribers.subscribe);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const disabled = useMemo(() => status === "loading", [status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await subscribe({ email, name: name.trim() || undefined, source });
      if (res.alreadySubscribed) {
        setStatus("exists");
        setMessage(t("alreadySubscribed"));
      } else {
        setStatus("success");
        setMessage(t("welcome"));
        setName("");
        setEmail("");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t("errorFallback"));
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-2">
      <input
        id="name"
        type="text"
        autoComplete="name"
        placeholder={t("namePlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="ds-input ds-input--sm"
        disabled={disabled}
      />
      <input
        id="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="ds-input ds-input--sm"
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

      {message ? (
        <p className={status === "error" ? "ds-field__error" : "ds-field__helper"}>
          {message}
        </p>
      ) : (
        <p className="ds-field__helper">{t("noSpam")}</p>
      )}
    </form>
  );
}
