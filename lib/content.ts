export type SectionId = "about" | "career";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About me" },
  { id: "career", label: "My Career" },
];

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

export const HERO = {
  greeting: "Hola, soy Agustín 👋",
  title: "Frontend Developer",
  subtitle:
    "Enfocado en SEO técnico, performance y landing pages de alta conversión — disponible para trabajo remoto.",
};

export const PROFILE = {
  name: "Agustín Menchón",
  role: HERO.title,
};

export const SOCIAL_LINKS = {
  github: "https://github.com/agusmenchon",
  linkedin: "https://www.linkedin.com/in/agustin-menchon",
  email: "mailto:agus.menchon@gmail.com",
};

export const ABOUT = {
  paragraphs: [
    "Frontend Developer enfocado en SEO, sitios de alto rendimiento y landing pages, con experiencia construyendo experiencias web responsivas, optimizando SEO técnico y llevando sitios a producción.",
    "Trabajé con React, TypeScript, Next.js, Node.js y Express, integrando bases de datos como MongoDB y PostgreSQL, arquitecturas Server-Driven UI e integraciones enterprise con sistemas como SAP.",
    "Pasé de Frontend Developer a Frontend Lead tomando ownership de arquitectura frontend, decisiones técnicas y prácticas de desarrollo en equipos chicos.",
  ],
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
    role: "Freelance Web Developer",
    company: "ZAG Consultant — Echo Koh Tao",
    period: "May 2026 — Jul 2026",
    description:
      "Diseño y desarrollo de landing pages responsivas orientadas a conversión, con SEO técnico (HTML semántico, metadata, indexación), optimización de performance e imágenes, deploy a producción e integración de flujos automatizados para gestión de datos de huéspedes.",
    tags: ["SEO Técnico", "Landing Pages", "Performance", "Deploy"],
  },
  {
    role: "Frontend Lead",
    company: "Vincula Group (para Sinergia Tech)",
    period: "Nov 2025 — Mar 2026",
    description:
      "Lideré el frontend de un sistema de gestión de transporte para una empresa de logística de camiones, definiendo la arquitectura frontend de un equipo chico. Desarrollé interfaces en React con foco en mantenibilidad y reusabilidad, manejo de estado con Redux, y una app React para escanear códigos de barras de etiquetas de transporte.",
    tags: ["React", "Redux", "Arquitectura Frontend", "React Native"],
  },
  {
    role: "Frontend Developer → Frontend Lead",
    company: "Software On the Road",
    period: "Sep 2023 — Nov 2025",
    description:
      "Trabajé día a día con React, TypeScript, MUI, Node.js, Express, Next.js, MongoDB y PostgreSQL. Progresé de Frontend Developer a Frontend Lead, tomando ownership de arquitectura frontend y decisiones técnicas. Trabajé con arquitecturas Server-Driven UI, integraciones enterprise con SAP y sistemas externos, aporté en backend cuando fue necesario, y apliqué SEO (metadata, HTML semántico, structured data) mejorando la discoverability de forma medible.",
    tags: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "SAP"],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Desarrollo Web",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS/SCSS", "Responsive Design", "Landing Pages"],
  },
  {
    category: "SEO & Performance",
    items: [
      "SEO Técnico",
      "On-Page SEO",
      "Web Performance Optimization",
      "Google Search Console",
      "Google Analytics",
      "Google Tag Manager",
    ],
  },
  {
    category: "CMS & Marketing",
    items: ["WordPress", "Shopify", "HubSpot", "Webflow", "Notion", "CMS", "Marketing Automation"],
  },
  {
    category: "Herramientas & Deploy",
    items: ["Git", "GitHub", "Vite", "npm", "Docker", "REST APIs"],
  },
  {
    category: "UI & Diseño",
    items: ["Material UI", "Component-Based Design", "UI Development", "Cross-Browser Compatibility"],
  },
];

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export const EDUCATION: EducationItem[] = [
  {
    title: "Licenciatura en Sistemas — Desarrollo de Aplicaciones TI (TUDAI)",
    institution: "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
    period: "2021 — 2024",
  },
];

export type CourseItem = {
  title: string;
  institution: string;
  period: string;
};

export const COURSES: CourseItem[] = [];

export type ProjectItem = {
  name: string;
  description: string;
  tags: string[];
  link?: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    name: "Echo Koh Tao",
    description:
      "Landing pages responsivas para un negocio de hospedaje en Koh Tao, con foco en conversión de visitantes, SEO técnico, optimización de performance e imágenes, y flujos automatizados para gestión de datos de huéspedes.",
    tags: ["SEO", "Landing Page", "Performance", "Freelance"],
    link: undefined,
  },
  {
    name: "Sistema de gestión de transporte",
    description:
      "Sistema para manejar datos operativos de una empresa de camiones: interfaces React mantenibles, manejo de estado con Redux y una app React para escanear códigos de barras de etiquetas de transporte.",
    tags: ["React", "Redux", "Mobile"],
    link: undefined,
  },
];

export const CONTACT = {
  heading: "Trabajemos juntos",
  description:
    "¿Tenés un proyecto de frontend, una landing page o una web que necesita mejorar su SEO y performance? Escribime a agus.menchon@gmail.com y lo charlamos.",
};
