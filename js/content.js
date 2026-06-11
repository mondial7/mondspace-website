// All site content lives here so the world stays a thin presentation layer.
// Five areas arranged as a panorama the visitor looks around (desktop) or
// scrolls through (mobile). Order below is also the mobile scroll order.

export const PALETTE = ["#00FFFF", "#DA70D6", "#FF9800", "#76FF03", "#F48FB1", "#FAFAFA"];

export const AREAS = [
  {
    id: "center",
    label: "Spawn",
    color: "#76FF03",
    // The first thing you read.
    lines: [
      "I'm Marco.",
      "Engineering leader, hands-on developer, and advocate for building better teams and software.",
    ],
  },
  {
    id: "up",
    label: "The Stage",
    color: "#FF9800",
    lines: [
      "I contribute to the XP / Agile community — speaking at conferences and sharing practical, experience-based insights.",
      "I establish key engineering processes and champion a culture of continuous improvement across teams.",
    ],
  },
  {
    id: "left",
    label: "The Workbench",
    color: "#00FFFF",
    lines: [
      "I stay hands-on with code — from modern greenfield apps to transforming legacy platforms.",
      "I've driven the adoption of AI tools and led their integration into scalable, production-grade systems.",
    ],
  },
  {
    id: "right",
    label: "The Grove",
    color: "#DA70D6",
    lines: [
      "I solve complex engineering challenges and guide teams to deliver better software, faster.",
      "I'm a lifelong learner — always exploring new technologies, patterns, and ways to grow.",
    ],
  },
  {
    id: "down",
    label: "The Jukebox",
    color: "#F48FB1",
    lines: [
      "Want the long version? Press play.",
      "An 8-minute AI-narrated audio CV.",
    ],
    audio: true,
  },
];

export const LINKS = [
  { label: "GitHub", href: "https://github.com/mondial7" },
  { label: "LinkedIn", href: "https://linkedin.com/in/mondinimarco/" },
];

export const AUDIO_SRC = "mmcv-2025-05-26.m4a";
