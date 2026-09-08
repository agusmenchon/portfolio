"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROFILE, SOCIAL_LINKS, MOBILE_TABS, type MobileTabId } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-3.5 w-4 flex-col justify-between">
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
        className="h-px w-full origin-center bg-foreground"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        className="h-px w-full bg-foreground"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
        className="h-px w-full origin-center bg-foreground"
      />
    </span>
  );
}

export function Topbar({
  activeId,
  onNavigate,
}: {
  activeId: MobileTabId;
  onNavigate: (id: MobileTabId) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleNavClick(id: MobileTabId) {
    setOpen(false);
    onNavigate(id);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-surface/70 shadow-sm backdrop-blur-xl backdrop-saturate-150">
      <Container className="flex h-16 items-center justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{PROFILE.name}</p>
          <p className="truncate text-xs text-muted">{PROFILE.role}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button href={SOCIAL_LINKS.email} size="sm">
            Let&apos;s Talk
          </Button>
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.nav
            key="upperbar"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] bg-background"
          >
            <Container className="flex flex-col py-4">
              {MOBILE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleNavClick(tab.id)}
                  className={`rounded-lg px-3 py-3 text-left text-base transition-colors ${
                    activeId === tab.id ? "text-accent" : "text-foreground hover:bg-surface"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
