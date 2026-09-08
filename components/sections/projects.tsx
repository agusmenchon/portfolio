import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { PROJECTS } from "@/lib/content";

export function Projects() {
  return (
    <section id="projects" className="border-b border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Proyectos" title="Qué construí" />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.05}>
              <Card>
                <h3 className="font-heading text-lg font-medium">{project.name}</h3>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Pill key={`${tag}-${tagIndex}`}>{tag}</Pill>
                  ))}
                </div>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-accent"
                  >
                    Ver proyecto →
                  </a>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
