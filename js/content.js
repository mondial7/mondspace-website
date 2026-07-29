// All site content lives here so the world stays a thin presentation layer.
// Five areas arranged as a panorama the visitor looks around (desktop) or
// scrolls through (mobile). Order below is also the mobile scroll order.
//
// Each area is a CATEGORY. Phase 0 sets the identity + copy; later phases hang
// project cards (`projects[]`) off each area (see docs/adr/0004).

export const PALETTE = ["#00FFFF", "#DA70D6", "#FF9800", "#76FF03", "#F48FB1", "#FAFAFA"];

export const AREAS = [
  {
    id: "center",
    label: "Spawn",
    color: "#76FF03",
    // The first thing you read — the positioning.
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
      "Talks, lessons and an engineering playbook — as interactive experiences, not slides.",
      "A decade of XP, Agile and AI-adoption practice, made explorable.",
    ],
  },
  {
    id: "left",
    label: "Engineering Systems",
    color: "#00FFFF",
    lines: [
      "Systems that make engineering organisations work better.",
      "Rebuilt engineering workspaces, KPIs & reporting, AI-assisted workflows — and the practices that hold them together.",
    ],
  },
  {
    id: "right",
    label: "Thoughtful Products",
    color: "#DA70D6",
    lines: [
      "Small, thoughtful software built around real human needs.",
      "Journaling, a puppy companion, habit-building, travel utilities — each removes friction so you can think about what matters.",
    ],
  },
  {
    id: "down",
    label: "About",
    color: "#F48FB1",
    lines: [
      "Want the long version? Press play.",
      "An 8-minute AI-narrated audio CV — or reach me on GitHub and LinkedIn.",
    ],
    audio: true,
  },
];

export const LINKS = [
  { label: "GitHub", href: "https://github.com/mondial7" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mondinimarco/" },
];

export const AUDIO_SRC = "mmcv-2025-05-26.m4a";
