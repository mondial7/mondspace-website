// Site content assembled from per-category modules (see docs/adr/0007) so the
// world stays a thin presentation layer. Five areas arranged as a panorama the
// visitor looks around (desktop) or scrolls through (mobile). Array order is
// also the mobile scroll order.
//
// Each area is a CATEGORY holding project cards. A project follows a consistent
// "Pokémon card" shape:
//
//   { slug, title, type, status?, meta?, summary, themes[],
//     sections: { problem, build?, decisions?, learnings },
//     explore?: { kind },   // mounts an interactive demo (js/demos/)
//     related?: [slug],     // cross-links into the knowledge graph
//     links?: [{ label, href }] }
//
// Section bodies use a tiny markdown subset: blank-line-separated paragraphs,
// "- " bullet lists, **bold**, *italic* and `code` (rendered in js/drawer.js).

import { engineeringSystems } from "./content/engineering-systems.js";
import { thoughtfulProducts } from "./content/thoughtful-products.js";
import { knowledgeGarden } from "./content/knowledge-garden.js";
import { library } from "./content/library.js";

export const PALETTE = ["#00FFFF", "#DA70D6", "#FF9800", "#76FF03", "#F48FB1", "#FAFAFA"];

// How a project came to exist — so business-context work reads differently from
// indie projects and talks. Each project carries a `context` key into this map.
export const CONTEXTS = {
  business: { label: "Work", full: "Business project", color: "#7ec0ee" },
  indie: { label: "Indie", full: "Indie project", color: "#FF9800" },
  talk: { label: "Talk", full: "Conference talk", color: "#DA70D6" },
};

export const AREAS = [
  {
    id: "center",
    label: "Spawn",
    color: "#76FF03",
    lines: [
      "I'm Marco. I build systems that help people and engineering teams thrive.",
      "Software, internal platforms, AI-assisted workflows and developer experiences that reduce friction and improve feedback loops.",
    ],
  },
  {
    id: "up",
    label: "Knowledge Garden",
    color: "#FF9800",
    lines: [
      "Conference talks reborn as interactive experiences, not slides.",
      "A decade of XP, Agile and AI-adoption practice, made explorable.",
    ],
    projects: knowledgeGarden,
  },
  {
    id: "left",
    label: "Engineering Systems",
    color: "#00FFFF",
    lines: [
      "Systems that make engineering organisations work better.",
      "Rebuilt engineering workspaces, KPIs & reporting, AI-assisted workflows — and the practices that hold them together.",
    ],
    projects: engineeringSystems,
  },
  {
    id: "right",
    label: "Thoughtful Products",
    color: "#DA70D6",
    lines: [
      "Small, thoughtful software built around real human needs.",
      "Journaling, a puppy companion, habit-building, travel utilities — each removes friction so you can think about what matters.",
    ],
    projects: thoughtfulProducts,
  },
  {
    id: "down",
    label: "The Library",
    color: "#F48FB1",
    lines: [
      "Books that shaped how I think, my engineering playbook, and the short version of me.",
      "A shelf, not a syllabus — pick something up.",
    ],
    projects: library,
  },
];

export const LINKS = [
  { label: "GitHub", href: "https://github.com/mondial7" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mondinimarco/" },
];

// Audio CV parked for now (see docs/adr/0008). Kept for a future re-add in About.
export const AUDIO_SRC = "mmcv-2025-05-26.m4a";

// Flat index of every project by slug — used by the drawer for cross-links and
// by search (see docs/adr/0007).
export const PROJECTS = Object.fromEntries(
  AREAS.flatMap((a) =>
    (a.projects || []).map((p) => [p.slug, { ...p, areaId: a.id, areaLabel: a.label, areaColor: a.color }])
  )
);
