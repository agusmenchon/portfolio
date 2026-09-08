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
