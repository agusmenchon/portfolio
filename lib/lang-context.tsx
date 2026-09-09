"use client";

import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/content";

function detectBrowserLang(): Lang {
  const locales = window.navigator.languages ?? [window.navigator.language];
  const isSpanish = locales.some((locale) => locale.toLowerCase().startsWith("es"));
  return isSpanish ? "es" : "en";
}

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("lang");
  if (stored === "en" || stored === "es") return stored;
  return detectBrowserLang();
}

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void } | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  // Starts at the server-safe default so hydration matches; corrected
  // synchronously before paint, same pattern as ThemeToggle.
  const [lang, setLangState] = useState<Lang>("es");

  useLayoutEffect(() => {
    const stored = readStoredLang();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- runs before paint to correct the SSR-safe default to the real client value
    setLangState(stored);
    document.documentElement.lang = stored;
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
