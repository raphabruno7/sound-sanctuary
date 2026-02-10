"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type Status = "idle" | "loading" | "success" | "exists" | "error";

export function NewsletterForm({ source = "home" }: { source?: string }) {
  const subscribe = useMutation(api.subscribers.subscribe);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const disabled = useMemo(() => status === "loading", [status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await subscribe({ email, source });
      if (res.alreadySubscribed) {
        setStatus("exists");
        setMessage("You're already subscribed.");
      } else {
        setStatus("success");
        setMessage("Welcome. You're in.");
        setEmail("");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-md">
      <label className="block text-sm text-neutral-700" htmlFor="email">
        Newsletter (quiet updates)
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none focus:border-neutral-400"
          required
          disabled={disabled}
        />
        <button
          type="submit"
          className="rounded-xl border border-neutral-900 bg-neutral-900 px-4 py-3 text-white hover:bg-neutral-800 disabled:opacity-60"
          disabled={disabled}
        >
          Join
        </button>
      </div>

      {message ? (
        <p
          className={["mt-3 text-sm", status === "error" ? "text-red-600" : "text-neutral-700"].join(
            " "
          )}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-xs text-neutral-500">No spam. Unsubscribe anytime.</p>
      )}
    </form>
  );
}
