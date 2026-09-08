import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SKILLS } from "@/lib/content";

export function Skills() {
  return (
    <>
      <SectionHeading eyebrow="Skills" title="Con qué trabajo" />
      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((group) => (
          <Card key={group.category}>
            <h3 className="mb-3 font-heading text-base font-medium">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, itemIndex) => (
                <Pill key={`${item}-${itemIndex}`}>{item}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
      {/* TODO: next iteration — staggered reveal per card */}
    </>
  );
}
