"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home } from "@/components/sections/home";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import { scrollToId } from "@/lib/scroll";
import { PROFILE, SECTIONS, UI } from "@/lib/content";
import { useLang } from "@/lib/lang-context";

const WIDE = "mx-auto w-full max-w-[91rem] px-6 sm:px-16";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={open ? "M4 4l10 10M14 4L4 14" : "M2.5 5h13M2.5 9h13M2.5 13h13"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { lang } = useLang();
  const sections = SECTIONS[lang];
  const ui = UI[lang];

  function go(id: (typeof sections)[number]["id"]) {
    // The mobile dropdown's exit animation (height -> 0, 220ms) fights the
    // browser's native smooth-scroll and cancels it mid-flight. Wait it out
    // before scrolling when the menu was actually open.
    if (menuOpen) {
      setMenuOpen(false);
      window.setTimeout(() => scrollToId(id), 260);
    } else {
      scrollToId(id);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md backdrop-saturate-150">
        <div className={`${WIDE} flex h-16 items-center gap-4`}>
          <button type="button" onClick={() => go("about")} className="min-w-0 flex-1 text-left sm:flex-initial">
            <p className="truncate font-heading text-base font-medium tracking-tight">{PROFILE.name}</p>
            <p className="truncate text-xs text-muted">{PROFILE.role}</p>
          </button>

          <nav className="hidden flex-1 items-center justify-center gap-1 sm:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(s.id)}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <Button type="button" size="sm" onClick={() => go("contact")}>
              {ui.letsTalk}
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:hidden">
            <Button type="button" size="sm" onClick={() => go("contact")}>
              {ui.contact}
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-surface"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.nav
              id="mobile-nav"
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeInOut" }}
              className="overflow-hidden border-t border-border/60 sm:hidden"
            >
              <div className={`${WIDE} flex flex-col gap-1 py-3`}>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(s.id)}
                    className="rounded-md px-2 py-2.5 text-left text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main className={`${WIDE} flex flex-col gap-24 py-16`}>
        <Reveal>
          <section id="about">
            <Home />
          </section>
        </Reveal>

        <Reveal>
          <section id="experience">
            <Experience />
          </section>
        </Reveal>

        <Reveal>
          <section id="skills">
            <Skills />
          </section>
        </Reveal>

        <Reveal>
          <section id="education">
            <Education />
          </section>
        </Reveal>

        <Reveal>
          <section id="contact">
            <Contact />
          </section>
        </Reveal>
      </main>
    </>
  );
}
