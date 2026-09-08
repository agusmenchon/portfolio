export type SectionId = "about" | "career";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About me" },
  { id: "career", label: "My Career" },
];

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

export const HERO = {
  greeting: "TODO: completar",
  title: "Desarrollador Full Stack Node",
  subtitle: "TODO: completar — una línea sobre foco y disponibilidad remota",
};

export const PROFILE = {
  name: "TODO: Nombre Apellido",
  role: HERO.title,
};

export const SOCIAL_LINKS = {
  github: "https://github.com/TODO",
  linkedin: "https://linkedin.com/in/TODO",
  email: "mailto:TODO@example.com",
};

export const ABOUT = {
  paragraphs: ["TODO: completar — párrafo de presentación personal."],
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "TODO: puesto",
    company: "TODO: empresa",
    period: "TODO: 20XX — presente",
    description: "TODO: completar descripción del rol.",
    tags: ["TODO"],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  { category: "TODO: categoría", items: ["TODO", "TODO", "TODO"] },
];

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export const EDUCATION: EducationItem[] = [
  { title: "TODO: título/curso", institution: "TODO: institución", period: "TODO: año" },
];

export type CourseItem = {
  title: string;
  institution: string;
  period: string;
};

export const COURSES: CourseItem[] = [
  { title: "TODO: nombre del curso", institution: "TODO: institución/plataforma", period: "TODO: año" },
];

export type ProjectItem = {
  name: string;
  description: string;
  tags: string[];
  link?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    name: "TODO: nombre del proyecto",
    description: "TODO: completar descripción.",
    tags: ["TODO"],
    link: undefined,
  },
];

export const CONTACT = {
  heading: "Trabajemos juntos",
  description: "TODO: completar — invitación a contactar.",
};
