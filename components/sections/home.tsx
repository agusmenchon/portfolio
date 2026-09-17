"use client";

import { useRef } from "react";
import Image from "next/image";
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
    <div className="flex flex-col items-center gap-8 text-center sm:-mx-10 sm:w-[calc(100%+5rem)] lg:-mx-16 lg:w-[calc(100%+8rem)]">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-12 sm:text-left">
        <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border border-border shadow-[0_0_40px_-16px_var(--accent)] sm:h-52 sm:w-52 md:h-60 md:w-60">
          <Image
            src="/foto.webp"
            alt="Agustín Menchón"
            fill
            sizes="(min-width: 768px) 240px, (min-width: 640px) 208px, 144px"
            className="object-cover"
            preload
          />
        </div>

        <div className="flex flex-col items-center gap-6 sm:items-start">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-muted sm:justify-start">
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

          <h1 className="max-w-4xl font-heading text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
            {hero.heading}
          </h1>

          <p className="max-w-3xl text-base text-muted sm:text-xl">{hero.paragraph}</p>
        </div>
      </div>

      <div ref={stageRef} className="relative min-h-[340px] w-full">
        <MacWindow
          slug={whoami.slug}
          className="mx-auto max-w-5xl"
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
