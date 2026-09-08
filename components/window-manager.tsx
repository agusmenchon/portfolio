"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { MacWindow } from "@/components/mac-window";
import { WindowContent } from "@/components/window-content";
import { Home } from "@/components/sections/home";
import { Contact } from "@/components/sections/contact";
import { PROFILE, SOCIAL_LINKS, SECTIONS, CAREER_TABS, type SectionId, type CareerTabId } from "@/lib/content";

const WIDE = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export function WindowManager() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<SectionId>("about");
  const [careerTab, setCareerTab] = useState<CareerTabId>("experience");
  const activeCareerMeta = CAREER_TABS.find((tab) => tab.id === careerTab)!;

  function toggleSection() {
    setSection((s) => (s === "about" ? "career" : "about"));
  }

  return (
    <>
      <header className="sticky top-4 z-40 flex justify-center px-5 sm:px-8">
        <div className="flex h-14 w-full max-w-3xl items-center gap-4 rounded-full border border-border/60 bg-surface/70 px-4 shadow-lg backdrop-blur-xl backdrop-saturate-150 sm:px-6">
          <button type="button" onClick={() => setSection("about")} className="min-w-0 flex-1 text-left">
            <p className="truncate font-heading text-base font-medium tracking-tight">{PROFILE.name}</p>
            <p className="truncate text-xs text-muted">{PROFILE.role}</p>
          </button>

          <nav className="flex shrink-0 items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  section === s.id ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {s.label}
              </button>
            ))}
            <Button href={SOCIAL_LINKS.email} size="sm">
              Let&apos;s Talk
            </Button>
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-end">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className={`${WIDE} flex flex-col gap-10 py-10`}>
        <div ref={stageRef} className="relative min-h-[560px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={section}
              initial={{ x: section === "career" ? 80 : -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: section === "career" ? -80 : 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              {section === "about" ? (
                <div className="flex items-center justify-center gap-8">
                  <AvatarPlaceholder />
                  <MacWindow
                    slug="aboutme"
                    onMinimize={toggleSection}
                    className="md:w-4/5"
                    interactive
                    dragConstraintsRef={stageRef}
                  >
                    <Home />
                  </MacWindow>
                </div>
              ) : (
                <MacWindow
                  slug={activeCareerMeta.slug}
                  onMinimize={toggleSection}
                  className="mx-auto md:w-4/5"
                  interactive
                  dragConstraintsRef={stageRef}
                >
                  <div className="flex gap-6">
                    <nav className="flex w-36 shrink-0 flex-col gap-1">
                      {CAREER_TABS.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setCareerTab(tab.id)}
                          className={`rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                            careerTab === tab.id
                              ? "bg-accent text-accent-foreground"
                              : "text-muted hover:bg-background hover:text-foreground"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </nav>

                    <div className="min-h-[420px] min-w-0 flex-1">
                      <WindowContent id={careerTab} />
                    </div>
                  </div>
                </MacWindow>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div id="contact">
          <Contact />
        </div>
      </div>
    </>
  );
}
