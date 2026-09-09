export type Lang = "es" | "en";

export type SectionId = "about" | "experience" | "skills" | "education" | "contact";

export const SECTIONS: Record<Lang, { id: SectionId; label: string }[]> = {
  es: [
    { id: "about", label: "About me" },
    { id: "experience", label: "Experiencia" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Estudios" },
    // { id: "contact", label: "Contacto" },
  ],
  en: [
    { id: "about", label: "About me" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    // { id: "contact", label: "Contact" },
  ],
};

export const PROFILE = {
  name: "Agustín Menchón",
  role: "Software Full-Stack Developer",
};

export const HERO: Record<
  Lang,
  {
    meta: { location: string; stack: string; status: string };
    heading: string;
    paragraph: string;
  }
> = {
  es: {
    meta: {
      location: "Remoto",
      stack: "React / Next.js / TypeScript / Node.js",
      status: "build passing",
    },
    heading: "Hola, soy Agustín, Software Full-Stack Developer.",
    paragraph:
      "Llevo más de 3 años construyendo interfaces en producción — de landing pages freelance a sistemas internos de gestión — combinando performance con arquitectura frontend mantenible.",
  },
  en: {
    meta: {
      location: "Remote",
      stack: "React / Next.js / TypeScript / Node.js",
      status: "build passing",
    },
    heading: "Hi, I'm Agustín, Software Full-Stack Developer.",
    paragraph:
      "I've spent 3+ years building production interfaces — from freelance landing pages to internal management systems — combining performance with maintainable frontend architecture.",
  },
};

export const WHOAMI: Record<
  Lang,
  {
    slug: string;
    title: string;
    badge: string;
    description: string;
    focus: string;
    experience: string;
    coreStack: string[];
    status: string;
  }
> = {
  es: {
    slug: "quiensoy.sh",
    title: "Agustín — Software Full-Stack Developer",
    badge: "active: prod_ready",
    description:
      "Soy un desarrollador full-stack con foco en frontend, especializado en React, TypeScript y Next.js. Me apasiona crear experiencias web rápidas, accesibles y optimizadas para SEO, combinando buenas prácticas de desarrollo con un enfoque en resultados medibles.",
    focus: "SEO técnico, performance web y landing pages de alta conversión",
    experience: "3+ años (freelance, agencias y equipos de producto)",
    coreStack: ["React", "TypeScript", "Next.js", "Node.js", "SEO Técnico"],
    status: "online & open to opportunities",
  },
  en: {
    slug: "whoami.sh",
    title: "Agustín — Software Full-Stack Developer",
    badge: "active: prod_ready",
    description:
      "I'm a full-stack developer focused on frontend, specialized in React, TypeScript and Next.js. I'm passionate about building fast, accessible, SEO-optimized web experiences, combining development best practices with a focus on measurable outcomes.",
    focus: "Technical SEO, web performance and high-conversion landing pages",
    experience: "3+ years (freelance, agencies and product teams)",
    coreStack: ["React", "TypeScript", "Next.js", "Node.js", "Technical SEO"],
    status: "online & open to opportunities",
  },
};

export const SOCIAL_LINKS = {
  github: "https://github.com/agusmenchon",
  linkedin: "https://www.linkedin.com/in/agustinmenchon",
  email: "mailto:agus.menchon@gmail.com",
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  link?: string;
  logo?: string;
};

export const EXPERIENCE: Record<Lang, ExperienceItem[]> = {
  es: [
    {
      role: "Freelance Web Developer & Automation Specialist",
      company: "Echo Koh Tao",
      period: "May 2026 — Jul 2026",
      description:
        "Diseño y desarrollo de landing page responsiva orientadas a conversión, con SEO técnico (HTML semántico, metadata, indexación), optimización de performance e imágenes, deploy a producción e integración de flujos automatizados para gestión de datos de huéspedes.",
      link: "https://echokohtao.com/",
      tags: ["SEO Técnico", "Landing Pages", "Performance", "Deploy", "Automatización", "Supabase"],
      logo: "/logos/echo-koh-tao.png",
    },
    {
      role: "Frontend Software Developer",
      company: "Vincula Group (para Sinergia Tech)",
      period: "Nov 2025 — Mar 2026",
      link: "https://www.vincula.group",
      description:
        "Desarrollé el frontend de un sistema de gestión de transporte para una empresa de logística de camiones, definiendo la arquitectura frontend de un equipo chico. Desarrollé interfaces en React con foco en mantenibilidad y reusabilidad, manejo de estado con Redux. En el apartado Mobile, desarrollé una app React para escanear códigos de barras de etiquetas de transporte.",
      tags: ["React", "Redux", "Arquitectura Frontend", "Mobile"],
      logo: "/logos/vincula.svg",
    },
    {
      role: "Frontend Software Developer",
      company: "Software On the Road",
      link: "https://www.softwareontheroad.com.ar",
      period: "Sep 2023 — Nov 2025",
      description:
        "Trabajé día a día con React, TypeScript, MUI, Node.js, Express, Next.js, MongoDB y PostgreSQL. Progresé de Frontend Developer a Frontend Lead, tomando ownership de arquitectura frontend y decisiones técnicas. Trabajé con arquitecturas Server-Driven UI, integraciones enterprise con SAP y sistemas externos, aporté en backend cuando fue necesario, y apliqué SEO (metadata, HTML semántico, structured data) mejorando la discoverability de forma medible.",
      tags: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "SAP"],
      logo: "/logos/software-on-the-road.jpeg",
    },
  ],
  en: [
    {
      role: "Freelance Web Developer & Automation Specialist",
      company: "Echo Koh Tao",
      period: "May 2026 — Jul 2026",
      description:
        "Designed and built conversion-focused responsive landing pages with technical SEO (semantic HTML, metadata, indexing), performance and image optimization, production deploys, and automated workflows for guest data management.",
      link: "https://echokohtao.com/",
      tags: ["Technical SEO", "Landing Pages", "Performance", "Deploy", "Automation", "Supabase"],
      logo: "/logos/echo-koh-tao.png",
    },
    {
      role: "Frontend Software Developer",
      company: "Vincula Group (for Sinergia Tech)",
      period: "Nov 2025 — Mar 2026",
      link: "https://www.vincula.group",
      description:
        "Built the frontend for a transport management system for a trucking logistics company, defining the frontend architecture for a small team. Built React interfaces focused on maintainability and reusability, with state management via Redux. On the mobile side, built a React app to scan barcodes on shipping labels.",
      tags: ["React", "Redux", "Frontend Architecture", "Mobile"],
      logo: "/logos/vincula.svg",
    },
    {
      role: "Frontend Software Developer",
      company: "Software On the Road",
      link: "https://www.softwareontheroad.com.ar",
      period: "Sep 2023 — Nov 2025",
      description:
        "Worked daily with React, TypeScript, MUI, Node.js, Express, Next.js, MongoDB and PostgreSQL. Progressed from Frontend Developer to Frontend Lead, taking ownership of frontend architecture and technical decisions. Worked with Server-Driven UI architectures, enterprise integrations with SAP and external systems, contributed to backend when needed, and applied SEO (metadata, semantic HTML, structured data), measurably improving discoverability.",
      tags: ["React", "TypeScript", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "SAP"],
      logo: "/logos/software-on-the-road.jpeg",
    },
  ],
};

export type SkillGroup = {
  category: string;
  description: string;
  items: string[];
};

export const SKILLS: Record<Lang, SkillGroup[]> = {
  es: [
    {
      category: "Frontend & UI",
      description:
        "Interfaces centradas en experiencia de usuario, componentes reusables y diseño responsive.",
      items: ["React", "TypeScript", "JavaScript", "HTML", "CSS/SCSS", "Responsive Design", "Material UI"],
    },
    {
      category: "Backend & Databases",
      description:
        "Desarrollo de APIs y servicios backend, con bases de datos relacionales y no relacionales.",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "REST APIs"],
    },
    {
      category: "Herramientas & Deploy",
      description:
        "Control de versiones, tooling de build y despliegue a producción.",
      items: ["Git", "GitHub", "Vite", "npm", "Docker", "REST APIs"],
    },
    {
      category: "SEO & Performance",
      description:
        "SEO técnico, optimización de Core Web Vitals y medición de resultados en producción.",
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
      description:
        "Plataformas de contenido y automatización de marketing para negocios y landing pages.",
      items: ["WordPress", "Shopify", "HubSpot", "Webflow", "Notion", "CMS", "Marketing Automation"],
    },
  ],
  en: [
    {
      category: "Frontend & UI",
      description:
        "User-experience-focused interfaces, reusable components and responsive design.",
      items: ["React", "TypeScript", "JavaScript", "HTML", "CSS/SCSS", "Responsive Design", "Material UI"],
    },
    {
      category: "Backend & Databases",
      description:
        "Backend API and service development, with relational and non-relational databases.",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "REST APIs"],
    },
    {
      category: "Tools & Deploy",
      description: "Version control, build tooling and production deployment.",
      items: ["Git", "GitHub", "Vite", "npm", "Docker", "REST APIs"],
    },
    {
      category: "SEO & Performance",
      description:
        "Technical SEO, Core Web Vitals optimization and measuring results in production.",
      items: [
        "Technical SEO",
        "On-Page SEO",
        "Web Performance Optimization",
        "Google Search Console",
        "Google Analytics",
        "Google Tag Manager",
      ],
    },
    {
      category: "CMS & Marketing",
      description:
        "Content platforms and marketing automation for businesses and landing pages.",
      items: ["WordPress", "Shopify", "HubSpot", "Webflow", "Notion", "CMS", "Marketing Automation"],
    },
  ],
};

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export const EDUCATION: Record<Lang, EducationItem[]> = {
  es: [
    {
      title: "Licenciatura en Sistemas — Desarrollo de Aplicaciones TI (TUDAI)",
      institution: "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
      period: "2021 — 2024",
    },
    {
      title: "React de cero a experto (Udemy)",
      institution: "Udemy - Fernando Herrera",
      period: "2024",
    },
    {
      title: "React PRO + Next.js + TypeScript (Udemy)",
      institution: "Udemy - Fernando Herrera",
      period: "2025",
    },
  ],
  en: [
    {
      title: "B.Sc. in Systems Engineering — IT Application Development (TUDAI)",
      institution: "Universidad Nacional del Centro de la Provincia de Buenos Aires (UNICEN)",
      period: "2021 — 2024",
    },
    {
      title: "React from Zero to Expert (Udemy)",
      institution: "Udemy - Fernando Herrera",
      period: "2024",
    },
    {
      title: "React PRO + Next.js + TypeScript (Udemy)",
      institution: "Udemy - Fernando Herrera",
      period: "2025",
    },
  ],
};

export type ProjectItem = {
  name: string;
  description: string;
  tags: string[];
  link?: string;
};

export const PROJECTS: Record<Lang, ProjectItem[]> = {
  es: [
    {
      name: "Echo Koh Tao",
      link: "https://echokohtao.com/",
      description:
        "Landing pages responsivas para un negocio de hospedaje en Koh Tao, con foco en conversión de visitantes, SEO técnico, optimización de performance e imágenes, y flujos automatizados para gestión de datos de huéspedes.",
      tags: ["SEO", "Landing Page", "Performance", "Freelance"],
    },
    {
      name: "Sistema de gestión de transporte",
      description:
        "Sistema para manejar datos operativos de una empresa de camiones: interfaces React mantenibles, manejo de estado con Redux y una app React para escanear códigos de barras de etiquetas de transporte.",
      tags: ["React", "Redux", "Mobile"],
      link: "https://www.vincula.app",
    },
  ],
  en: [
    {
      name: "Echo Koh Tao",
      link: "https://echokohtao.com/",
      description:
        "Responsive landing pages for a hospitality business in Koh Tao, focused on visitor conversion, technical SEO, performance and image optimization, and automated workflows for guest data management.",
      tags: ["SEO", "Landing Page", "Performance", "Freelance"],
    },
    {
      name: "Transport Management System",
      description:
        "System to manage operational data for a trucking company: maintainable React interfaces, state management with Redux, and a React app to scan barcodes on shipping labels.",
      tags: ["React", "Redux", "Mobile"],
      link: "https://www.vincula.app",
    },
  ],
};

export const CONTACT: Record<
  Lang,
  {
    eyebrow: string;
    heading: string;
    description: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      sendingLabel: string;
      successHeading: string;
      successText: string;
      successReset: string;
      errorText: string;
    };
    direct: { label: string; emailButtonLabel: string };
    availability: { label: string; text: string };
  }
> = {
  es: {
    eyebrow: "// GET IN TOUCH",
    heading: "¿Tenés una idea o proyecto en mente?",
    description:
      "Siempre estoy disponible para conversar sobre nuevos desafíos técnicos, oportunidades de desarrollo a tiempo completo o colaboraciones puntuales.",
    form: {
      nameLabel: "Nombre / Organización",
      namePlaceholder: "Ej: Santiago o Empresa S.A.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "nombre@ejemplo.com",
      messageLabel: "Mensaje o detalle del proyecto",
      messagePlaceholder: "Contame brevemente qué necesitás resolver o el alcance de la propuesta...",
      submitLabel: "Enviar mensaje",
      sendingLabel: "Enviando...",
      successHeading: "Mensaje enviado con éxito",
      successText: "Gracias por escribir. Te voy a responder a la brevedad.",
      successReset: "Enviar otro mensaje",
      errorText: "No se pudo enviar el mensaje. Probá de nuevo o escribime directamente por correo.",
    },
    direct: {
      label: "CONTACTO DIRECTO",
      emailButtonLabel: "Escribir por correo",
    },
    availability: {
      label: "Disponibilidad actual:",
      text: "Abierto a roles de frontend a tiempo completo (remoto) o proyectos freelance de landing pages, SEO técnico y performance.",
    },
  },
  en: {
    eyebrow: "// GET IN TOUCH",
    heading: "Got an idea or project in mind?",
    description:
      "I'm always open to talk about new technical challenges, full-time development opportunities, or one-off collaborations.",
    form: {
      nameLabel: "Name / Organization",
      namePlaceholder: "E.g: Santiago or Company Inc.",
      emailLabel: "Email",
      emailPlaceholder: "name@example.com",
      messageLabel: "Message or project details",
      messagePlaceholder: "Briefly tell me what you need solved or the scope of the proposal...",
      submitLabel: "Send message",
      sendingLabel: "Sending...",
      successHeading: "Message sent successfully",
      successText: "Thanks for reaching out. I'll get back to you shortly.",
      successReset: "Send another message",
      errorText: "Couldn't send the message. Try again or email me directly.",
    },
    direct: {
      label: "DIRECT CONTACT",
      emailButtonLabel: "Send an email",
    },
    availability: {
      label: "Current availability:",
      text: "Open to full-time frontend roles (remote) or freelance projects — landing pages, technical SEO and performance.",
    },
  },
};

export const UI: Record<
  Lang,
  {
    closeMenu: string;
    openMenu: string;
    letsTalk: string;
    contact: string;
    dragWindow: string;
    restore: string;
    maximize: string;
    copied: string;
    copy: string;
    skillsSubtitle: string;
    selectLanguage: string;
    logoAlt: (company: string) => string;
  }
> = {
  es: {
    closeMenu: "Cerrar menú",
    openMenu: "Abrir menú",
    letsTalk: "Let's Talk",
    contact: "Contacto",
    dragWindow: "arrastrá esta ventana",
    restore: "Restaurar",
    maximize: "Maximizar",
    copied: "copiado",
    copy: "copiar",
    skillsSubtitle: "Caja de herramientas de producción",
    selectLanguage: "Seleccionar idioma",
    logoAlt: (company) => `Logo de ${company}`,
  },
  en: {
    closeMenu: "Close menu",
    openMenu: "Open menu",
    letsTalk: "Let's Talk",
    contact: "Contact",
    dragWindow: "drag this window",
    restore: "Restore",
    maximize: "Maximize",
    copied: "copied",
    copy: "copy",
    skillsSubtitle: "Production toolbox",
    selectLanguage: "Select language",
    logoAlt: (company) => `${company} logo`,
  },
};
