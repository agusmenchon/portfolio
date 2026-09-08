import { SectionHeading } from "@/components/ui/section-heading";
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { EXPERIENCE } from "@/lib/content";

export function Experience() {
  return (
    <>
      <SectionHeading eyebrow="Experiencia" title="Dónde trabajé" />
      <div className="flex flex-col">
        {EXPERIENCE.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                <AvatarPlaceholder size="sm" decorative />
                {i < EXPERIENCE.length - 1 ? <div className="w-px flex-1 bg-border" aria-hidden /> : null}
              </div>

              <div className="flex flex-col gap-2 pb-10">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="font-heading text-lg font-medium">
                    {item.role} · {item.company}
                  </h3>
                  <Pill>{item.period}</Pill>
                </div>
                <p className="max-w-2xl text-sm text-muted sm:text-base">{item.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag, tagIndex) => (
                    <Pill key={`${tag}-${tagIndex}`}>{tag}</Pill>
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
