"use client";

import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { ABOUT, HERO } from "@/lib/content";

function scrollToContact(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function Home() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-medium text-accent">{HERO.greeting}</p>

      <h1 className="font-heading text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl">
        {HERO.title}
      </h1>

      <p className="max-w-md text-base text-muted sm:text-lg">{HERO.subtitle}</p>

      <div className="max-w-md space-y-4 text-base text-muted sm:text-lg">
        {ABOUT.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button href="#contact" onClick={scrollToContact}>
          Contacto
        </Button>
        <SocialLinks />
      </div>
    </div>
  );
}
