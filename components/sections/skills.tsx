import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SKILLS } from "@/lib/content";

export function Skills() {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mb-10">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          <span className="text-muted"></span> Skills &amp; Stack
        </h2>
        <p className="text-sm text-muted">Caja de herramientas de producción</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SKILLS.map((group, i) => (
          <Card key={group.category} className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-base font-medium">{group.category}</h3>
              <span className="shrink-0 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")} / layer
              </span>
            </div>
            <p className="text-sm text-muted">{group.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {group.items.map((item, itemIndex) => (
                <Pill key={`${item}-${itemIndex}`}>{item}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
