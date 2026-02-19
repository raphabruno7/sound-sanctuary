"use client";

import { useEffect, useMemo, useState } from "react";

type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

type LegacyMediaQueryList = MediaQueryList & {
  addListener: (listener: (ev: MediaQueryListEvent) => void) => void;
  removeListener: (listener: (ev: MediaQueryListEvent) => void) => void;
};

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function applyThemeClass(preference: ThemePreference) {
  if (typeof document === "undefined") return;

  const shouldUseDark = preference === "dark" || (preference === "system" && getSystemPrefersDark());
  document.documentElement.classList.toggle("dark", shouldUseDark);
}

function readStoredPreference(): ThemePreference | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return null;
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("dark");

  const label = useMemo(() => {
    if (preference === "system") return "Theme: System";
    if (preference === "dark") return "Theme: Dark";
    return "Theme: Light";
  }, [preference]);

  useEffect(() => {
    const stored = readStoredPreference();
    const initial = stored ?? "dark";
    applyThemeClass(initial);
    // Defer the state sync to avoid synchronous setState inside the effect body.
    Promise.resolve().then(() => {
      setPreference((prev) => (prev === initial ? prev : initial));
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (preference !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = () => applyThemeClass("system");
    // Safari uses addListener/removeListener.
    if ("addEventListener" in media) media.addEventListener("change", onChange);
    else (media as LegacyMediaQueryList).addListener(onChange);

    return () => {
      if ("removeEventListener" in media) media.removeEventListener("change", onChange);
      else (media as LegacyMediaQueryList).removeListener(onChange);
    };
  }, [preference]);

  function cyclePreference(current: ThemePreference): ThemePreference {
    if (current === "system") return "dark";
    if (current === "dark") return "light";
    return "system";
  }

  function onToggle() {
    const next = cyclePreference(preference);
    setPreference(next);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
    applyThemeClass(next);
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title={label}
      onClick={onToggle}
      className="text-sm underline underline-offset-4"
    >
      {label}
    </button>
  );
}
