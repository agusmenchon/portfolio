"use client";

import { Reveal } from "@/components/ui/reveal";
import { SKILLS, UI } from "@/lib/content";
import { useLang } from "@/lib/lang-context";

export function Skills() {
  const { lang } = useLang();
  const skills = SKILLS[lang];
  const ui = UI[lang];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mb-10">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          <span className="text-muted"></span> Skills &amp; Stack
        </h2>
        <p className="text-sm text-muted">{ui.skillsSubtitle}</p>
      </div>

      <div className="flex flex-col border-t border-border">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08}>
            <div className="flex flex-col gap-3 border-b border-border py-6 sm:flex-row sm:gap-8 sm:py-7">
              <div className="flex shrink-0 items-baseline gap-3 sm:w-44">
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base font-medium">{group.category}</h3>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <p className="text-sm text-muted">{group.description}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {group.items.map((item, itemIndex) => (
                    <span
                      key={`${item}-${itemIndex}`}
                      className="font-mono text-xs text-muted before:mr-1.5 before:text-foreground/40 before:content-['/']"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
