"use client";

import { useEffect, useState } from "react";

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

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("dark");

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

  const ariaLabel =
    preference === "dark"
      ? "Theme: dark (click to switch to light)"
      : preference === "light"
        ? "Theme: light (click to switch to system)"
        : "Theme: system (click to switch to dark)";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onToggle}
      className="theme-toggle-btn"
    >
      {preference === "dark" && <MoonIcon />}
      {preference === "light" && <SunIcon />}
      {preference === "system" && <MonitorIcon />}
    </button>
  );
}
