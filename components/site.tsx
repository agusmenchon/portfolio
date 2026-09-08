"use client";

import { useRef, useState } from "react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { MacWindow } from "@/components/mac-window";
import { WindowContent } from "@/components/window-content";
import { Home } from "@/components/sections/home";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import { scrollToId } from "@/lib/scroll";
import { PROFILE, SECTIONS, CAREER_TABS, type CareerTabId } from "@/lib/content";

const WIDE = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export function Site() {
  const aboutStageRef = useRef<HTMLDivElement>(null);
  const careerStageRef = useRef<HTMLDivElement>(null);
  const [careerTab, setCareerTab] = useState<CareerTabId>("education");
  const activeCareerMeta = CAREER_TABS.find((tab) => tab.id === careerTab)!;

  return (
    <>
      <header className="sticky top-4 z-40 flex justify-center px-5 sm:px-8">
        <div className="flex h-14 w-full max-w-3xl items-center gap-4 rounded-full border border-border/60 bg-surface/70 px-4 shadow-lg backdrop-blur-xl backdrop-saturate-150 sm:px-6">
          <button type="button" onClick={() => scrollToId("about")} className="min-w-0 flex-1 text-left">
            <p className="truncate font-heading text-base font-medium tracking-tight">{PROFILE.name}</p>
            <p className="truncate text-xs text-muted">{PROFILE.role}</p>
          </button>

          <nav className="flex shrink-0 items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToId(s.id)}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
            <Button type="button" size="sm" onClick={() => scrollToId("contact")}>
              Let&apos;s Talk
            </Button>
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-end">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className={`${WIDE} flex flex-col gap-24 py-16`}>
        <Reveal>
          <section id="about" ref={aboutStageRef} className="relative min-h-[420px]">
            <MacWindow slug="aboutme" className="mx-auto md:w-4/5" interactive dragConstraintsRef={aboutStageRef}>
              <Home />
            </MacWindow>
          </section>
        </Reveal>

        <Reveal>
          <section id="experience">
            <Experience />
          </section>
        </Reveal>

        <Reveal>
          <section id="career" ref={careerStageRef} className="relative min-h-[560px]">
            <MacWindow
              slug={activeCareerMeta.slug}
              className="mx-auto md:w-4/5"
              interactive
              dragConstraintsRef={careerStageRef}
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                <nav className="flex w-full shrink-0 flex-row gap-1 sm:w-36 sm:flex-col">
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
