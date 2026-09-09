import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { EXPERIENCE } from "@/lib/content";

export function Experience() {
  return (
    <>
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading title="Experiencia" />
      </div>
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        {EXPERIENCE.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                {item.logo ? (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white p-2">
                    <Image
                      src={item.logo}
                      alt={`Logo de ${item.company}`}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <AvatarPlaceholder size="sm" decorative />
                )}
                {i < EXPERIENCE.length - 1 ? <div className="w-px flex-1 bg-border" aria-hidden /> : null}
              </div>

              <div className="flex flex-1 flex-col gap-2 pb-10">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="font-heading text-lg font-medium">
                    {item.role} · {item.company}
                  </h3>
                  <Pill>{item.period}</Pill>
                </div>
                
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted underline underline-offset-2 hover:text-foreground sm:text-base"
                  >
                    {item.link}
                  </a>
                ) : null}
                <p className="text-sm text-muted sm:text-base">{item.description}</p>
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
