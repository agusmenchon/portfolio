"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { EDUCATION, SECTIONS } from "@/lib/content";
import { useLang } from "@/lib/lang-context";

export function Education() {
  const { lang } = useLang();
  const education = EDUCATION[lang];
  const heading = SECTIONS[lang].find((s) => s.id === "education")!.label;

  return (
    <>
      <SectionHeading title={heading} />
      <div className="flex flex-col gap-4">
        {education.map((item, i) => (
          <Card key={i} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="font-heading text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-muted">{item.institution}</p>
            </div>
            <span className="text-sm text-muted">{item.period}</span>
          </Card>
        ))}
      </div>
    </>
  );
}
