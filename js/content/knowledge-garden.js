// Knowledge Garden — conference talks reborn as interactive artifacts.
// (The Engineering Playbook now lives in The Library.) Project shape is
// documented in ../content.js.

export const knowledgeGarden = [
  {
    slug: "adapting-to-ai",
    context: "talk",
    title: "Adapting to AI",
    type: "Talk",
    meta: "AiSIS 2024 · Utrecht",
    themes: ["AI adoption", "Technical leadership", "Continuous learning"],
    summary:
      "What actually changes for a small engineering team when it adopts AI — beyond the hype and the fear.",
    sections: {
      problem:
        "Every team is told to 'adopt AI' with no map. As a startup engineering manager, I lived the messy middle: real gains, real dead-ends, and a lot of narrative that didn't survive contact with a real backlog.",
      build:
        "An industry talk at Advances in Software Intensive Startups (AiSIS 2024, Utrecht) on the practical journey of AI adoption in a small team — where it removed friction, where it created it, and how to tell the difference early.",
      learnings:
        "AI adoption is a change-management problem more than a tooling one. The teams that win build **norms**, not just install tools.",
    },
    related: ["ai-engineering-assistant", "ai-360-feedback"],
  },
  {
    slug: "sync-code-reviews",
    context: "talk",
    title: "Time to Pair Up!",
    type: "Talk",
    meta: "XP2023 · Amsterdam",
    themes: ["Ways of working", "Developer experience", "Sustainable engineering"],
    summary:
      "Why synchronous, pairing-style code review beats the async pull-request queue in hybrid teams.",
    sections: {
      problem:
        "Async PR review feels efficient and often isn't: context is lost, feedback arrives late, and the queue becomes the place momentum goes to die — especially across time zones in hybrid teams.",
      build:
        "A talk at XP2023 (GoHyb — Global and Hybrid Work in Software Engineering, Amsterdam) making the case for synchronous review: faster feedback, shared context, and knowledge that spreads instead of pooling.",
      learnings:
        "Review is a knowledge-distribution system, not a gate. Optimise it for how fast understanding spreads, not how many PRs you close.",
    },
    related: ["sustainable-remote-pairing", "engineering-kpis"],
  },
  {
    slug: "sustainable-remote-pairing",
    context: "talk",
    title: "One Pairing Session at a Time",
    type: "Talk",
    meta: "XP2022 · Copenhagen",
    themes: ["Sustainable engineering", "Ways of working", "Developer experience"],
    summary:
      "Building a sustainable remote-first team, one pairing session at a time — an Agile Alliance experience report.",
    sections: {
      problem:
        "Remote-first teams can quietly become isolating and unsustainable: knowledge silos, invisible burnout, and connection that erodes one skipped coffee at a time.",
      build:
        "An experience report at XP2022 (Copenhagen) on using regular pairing as the building block of a sustainable, psychologically safe remote culture — told through what actually happened, not what should have.",
      learnings:
        "Sustainability is built in small, repeated acts. Pairing wasn't just a coding practice — it was the mechanism that kept a distributed team human.",
    },
    related: ["sync-code-reviews", "habit-tracker"],
  },
];
