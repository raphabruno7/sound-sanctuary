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
    <form onSubmit={onSubmit} className="mt-6 max-w-md">
      <label className="block ds-size-sm text-muted" htmlFor="email">
        {t("label")}
      </label>
      <div className="mt-3">
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={disabled}
        />
      </div>
      <div className="mt-2 flex gap-2">
        <input
          id="email"
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
          className="btn btn-primary disabled:opacity-60"
          disabled={disabled}
        >
          {t("submit")}
        </button>
      </div>

      {message ? (
        <p
          className={["mt-3 ds-size-sm", status === "error" ? "text-red-600" : "text-muted"].join(
            " "
          )}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 ds-size-xs text-muted">{t("noSpam")}</p>
      )}
    </form>
  );
}
