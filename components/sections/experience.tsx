import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { EXPERIENCE } from "@/lib/content";

export function Experience() {
  return (
    <>
      <SectionHeading eyebrow="Experiencia" title="Dónde trabajé" />
      <div className="flex flex-col gap-4">
        {EXPERIENCE.map((item, i) => (
          <Card key={i} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-heading text-lg font-medium">
                {item.role} · {item.company}
              </h3>
              <span className="text-sm text-muted">{item.period}</span>
            </div>
            <p className="text-sm text-muted sm:text-base">{item.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag, tagIndex) => (
                <Pill key={`${tag}-${tagIndex}`}>{tag}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
