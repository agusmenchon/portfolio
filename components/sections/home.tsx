"use client";

import { useRef } from "react";
import { MacWindow } from "@/components/mac-window";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { HERO, WHOAMI, UI } from "@/lib/content";
import { useLang } from "@/lib/lang-context";
import { scrollToId } from "@/lib/scroll";

export function Home() {
  const stageRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const hero = HERO[lang];
  const whoami = WHOAMI[lang];
  const ui = UI[lang];

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
          <span>
            location: <span className="text-foreground">{hero.meta.location}</span>
          </span>
          <span aria-hidden>·</span>
          <span>
            stack: <span className="text-foreground">{hero.meta.stack}</span>
          </span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {hero.meta.status}
          </span>
        </div>

        <h1 className="max-w-4xl font-heading text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl">
          {hero.heading}
        </h1>

        <p className="max-w-3xl text-base text-muted sm:text-lg">{hero.paragraph}</p>
      </div>

      <div ref={stageRef} className="relative min-h-[340px] w-full">
        <MacWindow
          slug={whoami.slug}
          className="mx-auto max-w-3xl"
          interactive
          dragConstraintsRef={stageRef}
          hint={ui.dragWindow}
        >
          <div className="flex flex-col gap-5 text-left">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-heading text-lg font-medium">{whoami.title}</h2>
              <Pill className="border-accent/40 bg-accent/10 font-mono text-accent">{whoami.badge}</Pill>
            </div>

            <p className="text-sm text-muted sm:text-base">{whoami.description}</p>

            <dl className="flex flex-col gap-3 font-mono text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-muted">&gt; focus:</dt>
                <dd className="text-foreground">{whoami.focus}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-muted">&gt; experience:</dt>
                <dd className="text-foreground">{whoami.experience}</dd>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <dt className="shrink-0 text-muted">&gt; core_stack:</dt>
                <dd className="flex flex-wrap gap-2">
                  {whoami.coreStack.map((tech) => (
                    <Pill key={tech} className="font-mono">
                      {tech}
                    </Pill>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="flex items-center gap-1.5 border-t border-border pt-4 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              status: {whoami.status}
            </div>
          </div>
        </MacWindow>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => scrollToId("contact")}>
          {ui.contact}
        </Button>
        <Button href="/cv.pdf" target="_blank" rel="noopener noreferrer" variant="secondary">
          {ui.viewCv}
        </Button>
      </div>
    </div>
  );
}
