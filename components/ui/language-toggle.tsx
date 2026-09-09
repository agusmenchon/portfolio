"use client";

import { useLang } from "@/lib/lang-context";
import { UI } from "@/lib/content";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const t = UI[lang];

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 ${className}`}
      role="group"
      aria-label={t.selectLanguage}
    >
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
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
