import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { EDUCATION } from "@/lib/content";

export function Education() {
  return (
    <>
      <SectionHeading eyebrow="Estudios" title="Formación" />
      <div className="flex flex-col gap-4">
        {EDUCATION.map((item, i) => (
          <Card key={i} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h3 className="font-heading text-lg font-medium">{item.title}</h3>
              <p className="text-sm text-muted">{item.institution}</p>
            </div>
            <span className="text-sm text-muted">{item.period}</span>
          </Card>
        ))}
      </div>
      {/* TODO: next iteration — staggered reveal per card */}
    </>
  );
}
