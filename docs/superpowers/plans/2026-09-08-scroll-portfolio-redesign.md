# Scroll Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the click-toggle single-page-app (separate desktop/mobile layouts) with one responsive long-scroll page: About window (avatar moved inside) → standalone Experience timeline → Career window (3 tabs, no Experience) → Contact, all revealed progressively via scroll, with nav/CTA driven by scroll-to-section instead of state toggles.

**Architecture:** A new `components/site.tsx` becomes the single layout for all breakpoints, replacing `window-manager.tsx` + `mobile-layout.tsx` + `topbar.tsx`. `MacWindow` drops its `onMinimize` toggle concept (drag + maximize stay). `lib/content.ts` drops the mobile-carousel/experience-tab data that no longer applies. A shared `lib/scroll.ts` helper backs every scroll-to-section interaction (nav pills, Let's Talk, the About window's Contacto button).

**Tech Stack:** Next.js 16 (App Router), React 19, framer-motion 13, Tailwind v4. No test runner is configured in this repo (confirmed: `package.json` has no test script/framework) — verification per task is `npx tsc --noEmit` + `npm run lint` + a manual browser check via `npm run dev`, not automated tests.

**Spec:** `docs/superpowers/specs/2026-09-08-scroll-portfolio-redesign-design.md`

## Global Constraints

- No test framework exists in this repo — every task's "run tests" step is `npx tsc --noEmit` and `npm run lint`, plus the manual browser check described in that task.
- Keep using the site's existing design tokens (`bg-surface`, `border-border`, `text-muted`, `text-accent`, etc. from `app/globals.css`) — no new hardcoded color palette for the Experience timeline.
- `CareerTabId` after this plan is `"education" | "courses" | "skills"` (no `"experience"`).
- Mobile gets the exact same layout as desktop (no separate carousel/hamburger component).

---

### Task 1: Shared scroll-to-section helper

**Files:**
- Create: `lib/scroll.ts`

**Interfaces:**
- Produces: `scrollToId(id: string): void` — smooth-scrolls the element with that DOM id into view. Consumed by Task 2 (site header + Let's Talk) and Task 3 (Home's Contacto button).

- [ ] **Step 1: Create the helper**

```ts
// lib/scroll.ts
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
```

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit with no errors (this file has no consumers yet, so it's a no-op addition).

- [ ] **Step 3: Commit**

```bash
git add lib/scroll.ts
git commit -m "feat: add shared scrollToId helper for scroll-to-section navigation"
```

---

### Task 2: Cut over from click-toggle SPA to the unified scroll `Site`

This is the atomic "shell swap": `lib/content.ts`, `window-content.tsx`, and `mac-window.tsx` are all consumed by `window-manager.tsx`/`mobile-layout.tsx`/`topbar.tsx`, which are being deleted in favor of the new `site.tsx`. These changes can't be split further without leaving the build broken mid-task.

**Files:**
- Modify: `lib/content.ts`
- Modify: `components/window-content.tsx`
- Modify: `components/mac-window.tsx`
- Create: `components/site.tsx`
- Modify: `app/page.tsx`
- Delete: `components/window-manager.tsx`
- Delete: `components/mobile-layout.tsx`
- Delete: `components/topbar.tsx`

**Interfaces:**
- Consumes: `scrollToId` from Task 1 (`lib/scroll.ts`).
- Consumes (unchanged): `Home` (`components/sections/home.tsx`), `Experience` (`components/sections/experience.tsx`, still the old card-list implementation — Task 4 rewrites its internals only), `Contact` (`components/sections/contact.tsx`), `Reveal` (`components/ui/reveal.tsx`).
- Produces: `Site` (default-exported-free named export `Site` from `components/site.tsx`) — consumed by `app/page.tsx`. `MacWindow` no longer accepts `onMinimize` — consumed by Task 3/4 only in the sense that no other file may pass that prop anymore.

- [ ] **Step 1: Trim the career tabs and delete the mobile-carousel types in `lib/content.ts`**

Replace:

```ts
export type CareerTabId = "experience" | "education" | "courses" | "skills";

export type CareerTabMeta = {
  id: CareerTabId;
  label: string;
  slug: string;
};

export const CAREER_TABS: CareerTabMeta[] = [
  { id: "experience", label: "Experiencia", slug: "experience" },
  { id: "education", label: "Estudios", slug: "education" },
  { id: "courses", label: "Cursos", slug: "courses" },
  { id: "skills", label: "Skills", slug: "skills" },
];

export type MobileTabId = "about" | CareerTabId;

export const MOBILE_TABS: { id: MobileTabId; label: string; slug: string }[] = [
  { id: "about", label: "Sobre mi", slug: "aboutme" },
  ...CAREER_TABS,
];
```

with:

```ts
export type CareerTabId = "education" | "courses" | "skills";

export type CareerTabMeta = {
  id: CareerTabId;
  label: string;
  slug: string;
};

export const CAREER_TABS: CareerTabMeta[] = [
  { id: "education", label: "Estudios", slug: "education" },
  { id: "courses", label: "Cursos", slug: "courses" },
  { id: "skills", label: "Skills", slug: "skills" },
];
```

Leave everything else in the file (`SECTIONS`, `HERO`, `PROFILE`, `SOCIAL_LINKS`, `ABOUT`, `EXPERIENCE`, `SKILLS`, `EDUCATION`, `COURSES`, `PROJECTS`, `CONTACT`) untouched.

- [ ] **Step 2: Drop the `experience` case from `window-content.tsx`**

Replace the whole file with:

```tsx
import type { CareerTabId } from "@/lib/content";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Courses } from "@/components/sections/courses";

export function WindowContent({ id }: { id: CareerTabId }) {
  switch (id) {
    case "education":
      return <Education />;
    case "courses":
      return <Courses />;
    case "skills":
      return <Skills />;
  }
}
```

- [ ] **Step 3: Remove `onMinimize` from `MacWindow`**

Replace the whole file with:

```tsx
"use client";

import type { ReactNode, RefObject } from "react";
import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { PROFILE } from "@/lib/content";

export function MacWindow({
  slug,
  children,
  className = "",
  interactive = false,
  dragConstraintsRef,
}: {
  slug: string;
  children: ReactNode;
  className?: string;
  /** Enables drag + maximize. */
  interactive?: boolean;
  dragConstraintsRef?: RefObject<HTMLElement | null>;
}) {
  const dragControls = useDragControls();
  const [maximized, setMaximized] = useState(false);

  return (
    <motion.div
      drag={interactive && !maximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragConstraints={dragConstraintsRef}
      animate={interactive && maximized ? { x: 0, y: 0 } : undefined}
      className={
        interactive && maximized
          ? "absolute inset-0 z-20 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_60px_-24px_var(--accent)]"
          : `relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_60px_-24px_var(--accent)] ${className}`
      }
    >
      <div
        onPointerDown={(e) => {
          if (!interactive || maximized) return;
          dragControls.start(e);
        }}
        className={`flex items-center gap-4 px-5 py-3.5 sm:px-6 ${
          interactive && !maximized ? "cursor-grab select-none active:cursor-grabbing" : ""
        }`}
      >
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          {interactive ? (
            <button
              type="button"
              onClick={() => setMaximized((m) => !m)}
              aria-label={maximized ? "Restaurar" : "Maximizar"}
              className="h-3 w-3 rounded-full bg-[#28c840] transition-transform hover:scale-110"
            />
          ) : (
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          )}
        </div>
        <span className="truncate text-xs font-medium text-muted">
          {PROFILE.name}/{slug}
        </span>
      </div>
      <div className={`px-5 pb-6 sm:px-6 sm:pb-8 ${interactive && maximized ? "h-full overflow-auto" : ""}`}>
        {children}
      </div>
    </motion.div>
  );
}
```

(Only change from the current file: `onMinimize` param and its `?`-typed prop are gone, the yellow dot is now always the plain `<span className="h-3 w-3 rounded-full bg-[#febc2e]" />`, and the outer dots `<div>` no longer carries `aria-hidden`.)

- [ ] **Step 4: Create `components/site.tsx`**

```tsx
"use client";

import { useRef, useState } from "react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";
import { MacWindow } from "@/components/mac-window";
import { WindowContent } from "@/components/window-content";
import { Home } from "@/components/sections/home";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Reveal } from "@/components/ui/reveal";
import { scrollToId } from "@/lib/scroll";
import { PROFILE, SECTIONS, CAREER_TABS, type CareerTabId } from "@/lib/content";

const WIDE = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export function Site() {
  const aboutStageRef = useRef<HTMLDivElement>(null);
  const careerStageRef = useRef<HTMLDivElement>(null);
  const [careerTab, setCareerTab] = useState<CareerTabId>("education");
  const activeCareerMeta = CAREER_TABS.find((tab) => tab.id === careerTab)!;

  return (
    <>
      <header className="sticky top-4 z-40 flex justify-center px-5 sm:px-8">
        <div className="flex h-14 w-full max-w-3xl items-center gap-4 rounded-full border border-border/60 bg-surface/70 px-4 shadow-lg backdrop-blur-xl backdrop-saturate-150 sm:px-6">
          <button type="button" onClick={() => scrollToId("about")} className="min-w-0 flex-1 text-left">
            <p className="truncate font-heading text-base font-medium tracking-tight">{PROFILE.name}</p>
            <p className="truncate text-xs text-muted">{PROFILE.role}</p>
          </button>

          <nav className="flex shrink-0 items-center gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToId(s.id)}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {s.label}
              </button>
            ))}
            <Button type="button" size="sm" onClick={() => scrollToId("contact")}>
              Let&apos;s Talk
            </Button>
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-end">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className={`${WIDE} flex flex-col gap-24 py-16`}>
        <Reveal>
          <section id="about" ref={aboutStageRef} className="relative min-h-[420px]">
            <MacWindow slug="aboutme" className="mx-auto md:w-4/5" interactive dragConstraintsRef={aboutStageRef}>
              <Home />
            </MacWindow>
          </section>
        </Reveal>

        <Reveal>
          <section id="experience">
            <Experience />
          </section>
        </Reveal>

        <Reveal>
          <section id="career" ref={careerStageRef} className="relative min-h-[560px]">
            <MacWindow
              slug={activeCareerMeta.slug}
              className="mx-auto md:w-4/5"
              interactive
              dragConstraintsRef={careerStageRef}
            >
              <div className="flex gap-6">
                <nav className="flex w-36 shrink-0 flex-col gap-1">
                  {CAREER_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCareerTab(tab.id)}
                      className={`rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                        careerTab === tab.id
                          ? "bg-accent text-accent-foreground"
                          : "text-muted hover:bg-background hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="min-h-[420px] min-w-0 flex-1">
                  <WindowContent id={careerTab} />
                </div>
              </div>
            </MacWindow>
          </section>
        </Reveal>

        <Reveal>
          <section id="contact">
            <Contact />
          </section>
        </Reveal>
      </main>
    </>
  );
}
```

Note: the About window renders without an avatar for now (Task 3 adds it inside `Home`) — that's expected, not a bug, for this step.

- [ ] **Step 5: Wire `app/page.tsx` to the new `Site`**

Replace the whole file with:

```tsx
import { Site } from "@/components/site";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Site />
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Delete the obsolete layout files**

```bash
git rm components/window-manager.tsx components/mobile-layout.tsx components/topbar.tsx
```

- [ ] **Step 7: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit with no errors. If TypeScript complains about a leftover reference to `MOBILE_TABS`, `MobileTabId`, `CareerTabId` `"experience"`, or `onMinimize`, grep for it (`grep -rn "MOBILE_TABS\|MobileTabId\|onMinimize" components app lib`) — it means a file outside this task's list still references the removed API and needs the same treatment.

- [ ] **Step 8: Manual browser check**

Run `npm run dev`, open the site, and confirm:
- Page loads with the About window at the top (no avatar yet — expected), the old Experience card list below it (not in tabs), the Career window below that with only 3 tabs (Estudios/Cursos/Skills), and the contact form at the bottom.
- Nav pills "About me"/"My Career" and the "Let's Talk" button scroll smoothly to `#about`/`#career`/`#contact`.
- Both windows still drag (via header) and maximize/restore (green dot); red and yellow dots do nothing.
- Resize the browser to a narrow (mobile) width — same layout, no carousel, no hamburger menu, content readable and not overflowing horizontally.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: replace click-toggle SPA with a single scrollable Site layout"
```

---

### Task 3: Move the avatar inside the About window

**Files:**
- Modify: `components/sections/home.tsx`

**Interfaces:**
- Consumes: `scrollToId` (Task 1), `AvatarPlaceholder` (`components/ui/avatar-placeholder.tsx`, unchanged in this task — default size already renders at `h-28 w-28`).

- [ ] **Step 1: Add the avatar and switch the Contacto button to `scrollToId`**

Replace the whole file with:

```tsx
"use client";

import { AvatarPlaceholder } from "@/components/ui/avatar-placeholder";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { scrollToId } from "@/lib/scroll";
import { ABOUT, HERO } from "@/lib/content";

export function Home() {
  return (
    <div className="flex flex-col gap-6">
      <AvatarPlaceholder />

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
        <Button type="button" onClick={() => scrollToId("contact")}>
          Contacto
        </Button>
        <SocialLinks />
      </div>
    </div>
  );
}
```

(Removed the local `scrollToContact`/`MouseEvent` handling in favor of the shared helper, and the `href="#contact"` anchor became a plain button since it no longer needs to be a real link.)

- [ ] **Step 2: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual browser check**

Run `npm run dev`, confirm the About window now shows the avatar circle above the greeting text, and clicking "Contacto" smooth-scrolls to the contact form at the bottom.

- [ ] **Step 4: Commit**

```bash
git add components/sections/home.tsx
git commit -m "feat: move the avatar placeholder inside the About window"
```

---

### Task 4: Rewrite Experience as a standalone timeline

**Files:**
- Modify: `components/ui/avatar-placeholder.tsx`
- Modify: `components/sections/experience.tsx`

**Interfaces:**
- Produces: `AvatarPlaceholder({ size?: "lg" | "sm"; label?: string; className?: string })` — `size` defaults to `"lg"` (same visual as before this task, so Task 3's `<AvatarPlaceholder />` call keeps working unchanged).
- Consumes: `Reveal` (per-item stagger), `Pill`, `SectionHeading`, `EXPERIENCE` from `lib/content.ts` (unchanged shape).

- [ ] **Step 1: Add a `size` variant to `AvatarPlaceholder`**

Replace the whole file with:

```tsx
const SIZE_CLASSES = {
  lg: "h-28 w-28",
  sm: "h-14 w-14",
} as const;

const ICON_SIZE_CLASSES = {
  lg: "h-9 w-9",
  sm: "h-5 w-5",
} as const;

export function AvatarPlaceholder({
  size = "lg",
  label = "Placeholder de foto de perfil",
  className = "",
}: {
  size?: "lg" | "sm";
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-border text-muted ${SIZE_CLASSES[size]} ${className}`}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        className={ICON_SIZE_CLASSES[size]}
        aria-hidden
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `Experience` as a vertical timeline**

Replace the whole file with:

```tsx
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
                <AvatarPlaceholder size="sm" label={`Placeholder de logo de ${item.company}`} />
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
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual browser check**

Run `npm run dev`, scroll to the Experience section between the About and Career windows, and confirm: each entry shows a small circular placeholder, a vertical line connects it to the next entry (no line after the last one), role/company/period/description/tags render, and each entry fades/slides in as it's scrolled into view (reload and scroll slowly to see the stagger).

- [ ] **Step 5: Commit**

```bash
git add components/ui/avatar-placeholder.tsx components/sections/experience.tsx
git commit -m "feat: render Experience as a standalone scroll-reveal timeline"
```

---

### Task 5: Full end-to-end verification

**Files:** none (verification only; fix forward in the relevant file from Tasks 1-4 if something's broken, then re-run this task's checks).

- [ ] **Step 1: Type-check and lint the whole project**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 2: Full desktop walkthrough**

Run `npm run dev`, open in a browser at a desktop width (~1440px):
- Scroll from top to bottom once: About (with avatar inside) → Experience timeline (fades in as it enters view) → Career window (Estudios/Cursos/Skills tabs, switching tabs works) → Contact form at the very bottom.
- Click each nav pill and "Let's Talk" from the top of the page — each scrolls smoothly to its section.
- On both the About and Career windows: click the green dot to maximize (fills the section, nav stays visible above), click again to restore. Confirm the red and yellow dots do nothing when clicked.
- Drag a window by its header (not the traffic lights or body text) and confirm it moves and is constrained to its own section. If the browser-automation tool's synthetic drag doesn't register (a known limitation with pointer-capture-based drag — see prior session), verify by dispatching real `PointerEvent`s via the page's console instead, or ask the user to confirm manually.

- [ ] **Step 3: Mobile-width walkthrough**

Resize to a narrow width (~390px) and repeat the scroll-through: confirm the same sections stack legibly, nothing overflows horizontally, and the header nav still fits/works.

- [ ] **Step 4: Report results**

Summarize what was checked and any deviations found (and how they were fixed) back to the user — no separate commit needed for this task unless a fix was made, in which case commit that fix with a message describing what was wrong.
