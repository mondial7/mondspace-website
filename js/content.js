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

import { spawn } from "./content/spawn.js";
import { engineeringSystems } from "./content/engineering-systems.js";
import { thoughtfulProducts } from "./content/thoughtful-products.js";
import { knowledgeGarden } from "./content/knowledge-garden.js";
import { library } from "./content/library.js";

const shelfCount = (k) => library.filter((p) => p.shelf === k).length;

export const PALETTE = ["#00FFFF", "#DA70D6", "#FF9800", "#76FF03", "#F48FB1", "#FAFAFA"];

// How a project came to exist — so business-context work reads differently from
// indie projects and talks. Each project carries a `context` key into this map.
// Where a book sits on the shelf. Books carry a `shelf` key into this map;
// "radar" ones are honestly unread, and say so rather than implying otherwise.
export const SHELF = {
  now: { label: "Reading now", full: "Reading now", color: "#FF9800" },
  read: { label: "Read", full: "Read", color: "#76FF03" },
  radar: { label: "On the radar", full: "On the radar — not read yet", color: "#7ec0ee" },
};

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
      "I'm Marco — an Engineering Manager and hands-on product engineer in Amsterdam.",
      "I build systems that help people and engineering teams thrive. Look around: left is how I lead, right is what I build, up is what I teach, down is how I think.",
    ],
    projects: spawn,
  },
  {
    id: "up",
    label: "Knowledge Garden",
    color: "#FF9800",
    lines: [
      "What I teach: talks, experience reports and peer-reviewed papers — reborn as something explorable, not slides.",
      "A decade in the XP and Agile community, from a 2017 research paper still being cited to co-chairing the XP2024 engineering track.",
    ],
    projects: knowledgeGarden,
  },
  {
    id: "left",
    label: "Engineering Systems",
    color: "#00FFFF",
    lines: [
      "How I lead: systems that make an engineering organisation work better.",
      "Workspaces, KPIs & reporting, career levels, AI adoption and operational maturity — built at uButler, and the practices that hold them together.",
    ],
    projects: engineeringSystems,
  },
  {
    id: "right",
    label: "Thoughtful Products",
    color: "#DA70D6",
    lines: [
      "What I build: small, thoughtful software around real human needs — designed, shipped and maintained by me alone.",
      "Journaling, a puppy companion, habit-building, travel utilities. None of these are on my CV; that's rather the point.",
    ],
    projects: thoughtfulProducts,
  },
  {
    id: "down",
    label: "The Library",
    color: "#F48FB1",
    lines: [
      "How I think: my engineering playbook, and the books behind the opinions.",
      `${shelfCount("read")} read, ${shelfCount("now")} on the go, ${shelfCount("radar")} on the radar. A shelf, not a syllabus — pick something up.`,
    ],
    projects: library,
  },
];

export const LINKS = [
  { label: "CV", href: "/Marco_Mondini-Resume.pdf" },
  { label: "GitHub", href: "https://github.com/mondial7" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mondinimarco/" },
];

// Audio CV parked for now (see docs/adr/0008). Kept for a future re-add in About.
export const AUDIO_SRC = "/mmcv-2025-05-26.m4a";

// Flat index of every project by slug — used by the drawer for cross-links and
// by search (see docs/adr/0007).
export const PROJECTS = Object.fromEntries(
  AREAS.flatMap((a) =>
    (a.projects || []).map((p) => [p.slug, { ...p, areaId: a.id, areaLabel: a.label, areaColor: a.color }])
  )
);
