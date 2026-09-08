"use client";

import { useLayoutEffect, useState } from "react";

type Lang = "es" | "en";

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("lang");
  return stored === "en" ? "en" : "es";
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  // Starts at the server-safe default so hydration matches; corrected
  // synchronously before paint, same pattern as ThemeToggle.
  const [lang, setLang] = useState<Lang>("es");

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- runs before paint to correct the SSR-safe default to the real client value
    setLang(readStoredLang());
  }, []);

  function select(next: Lang) {
    if (next === lang) return;
    setLang(next);
    window.localStorage.setItem("lang", next);
  }

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 ${className}`}
      role="group"
      aria-label="Seleccionar idioma"
    >
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => select(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            lang === code
              ? "bg-accent text-accent-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
