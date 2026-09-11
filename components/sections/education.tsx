"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { EDUCATION, SECTIONS } from "@/lib/content";
import { useLang } from "@/lib/lang-context";

export function Education() {
  const { lang } = useLang();
  const education = EDUCATION[lang];
  const heading = SECTIONS[lang].find((s) => s.id === "education")!.label;

  return (
    <>
      <SectionHeading title={heading} />
      <div className="flex flex-col border-t border-border">
        {education.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="flex flex-col gap-1 border-b border-border py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted">{item.institution}</p>
                </div>
              </div>
              <span className="shrink-0 font-mono text-sm text-muted">{item.period}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
