export type Skill = {
  title: string;
  path: string;
  tech: string[];
  icon: "cube" | "sphere" | "cone" | "torus";
  color: string;
};

export const skills: Skill[] = [
  {
    title: "Frontend Development",
    path: "frontend/",
    tech: ["React", "Next.js", "Three.js", "Tailwind", "TypeScript"],
    icon: "cube",
    color: "#00d9ff",
  },
  {
    title: "Cinematography",
    path: "cinema/",
    tech: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Storytelling"],
    icon: "sphere",
    color: "#ff00ff",
  },
  {
    title: "UI/UX Design",
    path: "design/",
    tech: ["Figma", "Prototyping", "Animation Design", "User Research"],
    icon: "cone",
    color: "#00ff88",
  },
  {
    title: "TYBS IT Student",
    path: "in-progress/",
    tech: ["Learning", "Building", "Growing"],
    icon: "torus",
    color: "#00ff88",
  },
];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  color: string;
  badge?: string;
  detail: string[];
};

export const projects: Project[] = [
  {
    slug: "frame-runner",
    title: "Frame Runner",
    blurb:
      "Cinematic short — handheld energy, grade pushed teal-orange, sound designed in the edit.",
    tags: ["DaVinci Resolve", "Premiere Pro", "Color Grading"],
    color: "#ff00ff",
    badge: "Reel 2024",
    detail: [
      "A short built around rhythm — every cut lands on the edit.",
      "Handled the full pipeline: shoot, colour, edit, and mix.",
    ],
  },
  {
    slug: "gymverse",
    title: "GYMVERSE",
    blurb:
      "3D web game hub built with Next.js, React Three Fiber and custom motion systems.",
    tags: ["Next.js", "Three.js", "Tailwind"],
    color: "#00ff88",
    badge: "Work in progress",
    detail: [
      "A 3D scene with a locked-video hero and hand-tuned inertia.",
      "Zero-dependency motion — physics and audio wired by hand.",
    ],
  },
  {
    slug: "ui-ux-pro-skills",
    title: "UI/UX Pro Skills",
    blurb:
      "Agent skill system that turns raw product briefs into production-ready UI systems.",
    tags: ["Figma", "Design Systems", "AI Workflow"],
    color: "#00d9ff",
    detail: [
      "A repeatable process: brief → tokens → components → handoff.",
      "Design-system-first so teams ship consistent interfaces.",
    ],
  },
  {
    slug: "this-portfolio",
    title: "This Portfolio",
    blurb:
      "A cinema-meets-terminal experience — the very site you are scrolling.",
    tags: ["Next.js", "R3F", "Motion", "Lenis"],
    color: "#e0e0e0",
    badge: "You are here",
    detail: [
      "Treated as a film — atmosphere, lighting, and one continuous camera move.",
      "Grain, ease curves, and reduced-motion all respected.",
    ],
  },
];

export type TimelineStep = {
  year: string;
  title: string;
  detail: string;
  color: string;
};

export const timeline: TimelineStep[] = [
  {
    year: "School",
    title: "First frames",
    detail:
      "Fell into editing short clips on a phone — discovered that cutting, pacing and sound shape emotion.",
    color: "#00d9ff",
  },
  {
    year: "Hands-on",
    title: "Cinema + code collide",
    detail:
      "Bought a proper camera, started grading in DaVinci, and built my first websites from scratch.",
    color: "#ff00ff",
  },
  {
    year: "Now",
    title: "TYBS IT — building, always",
    detail:
      "IT student shipping 3D web experiences while filming campaigns — code is my second camera.",
    color: "#00ff88",
  },
];

export type Social = {
  label: string;
  icon: "github" | "instagram" | "youtube" | "mail";
  href: string;
};

export const EMAIL =
  "Krishp091205@users.noreply.github.com"; /* TODO: replace with your real inbox */

export const REEL = {
  /* TODO: replace with your own footage or poster */
  video: "https://raw.githubusercontent.com/gughigug/run-hero-assets/main/Legs_sprinting_on_pavement_1080p_202608312152.mp4",
  poster:
    "https://raw.githubusercontent.com/gughigug/run-hero-assets/main/bg-immersive.jpg",
};

/* TODO: swap instagram / youtube below for your real handles */
export const socials: Social[] = [
  { label: "github", icon: "github", href: "https://github.com/Krishp091205" },
  { label: "instagram", icon: "instagram", href: "https://instagram.com/" },
  { label: "youtube", icon: "youtube", href: "https://youtube.com/" },
  { label: "mail", icon: "mail", href: `mailto:${EMAIL}` },
];