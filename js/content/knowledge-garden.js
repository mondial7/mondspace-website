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
        "An experience report at XP2022 (Copenhagen), co-authored with five colleagues, on the engineering department at **RIDE Capital** in Berlin — where pairing went from a practice to the load-bearing one.\n\nThe team grew from about five developers in late 2020 into multiple distributed teams spread from IST to BRT, with **50–90% of working time spent pairing**. The report covers what that did for onboarding, knowledge sharing and psychological safety, told through what actually happened rather than what should have.",
      learnings:
        "Sustainability is built in small, repeated acts. Pairing wasn't just a coding practice — it was the mechanism that kept a distributed team human across eight time zones.\n\nThe part I'd defend hardest: pairing at that intensity is not a productivity tactic, it's how a remote team stops knowledge from pooling in whoever happens to be online.",
    },
    related: ["sync-code-reviews", "habit-tracker", "first-being-then-doing"],
    links: [{ label: "Read the experience report", href: "https://www.agilealliance.org/resources/experience-reports/towards-a-sustainable-remote-first-team-environment-one-pairing-session-at-a-time/" }],
  },
  {
    slug: "first-being-then-doing",
    context: "talk",
    title: "First Being, then Doing",
    type: "Experience report",
    meta: "XP2018 · Porto",
    themes: ["Ways of working", "Continuous learning", "Engineering culture"],
    summary:
      "Feeling the freedom through agileness — an Agile Alliance experience report on what agility feels like before it becomes a process.",
    sections: {
      problem:
        "Agile is usually taught as a set of ceremonies to perform. That framing produces teams that *do* agile faithfully and never feel any freer for it — the practices arrive, the autonomy doesn't.",
      build:
        "An experience report at XP2018 (Agile Alliance, Porto), co-authored with Francesco Vettoretti, on the agile transformation at **Datatellers** in Bolzano.\n\nIt documents two attempts. The first was top-down and tool-led — roll out Trello, roll out Asana, declare agility. It failed. The second worked by going the other way: principles first, spread bottom-up through the team, with education instead of imposition.",
      learnings:
        "You can adopt every ceremony and change nothing. Tools are the *output* of a way of working, never the cause of one — installing them first just gives everyone a place to file the old behaviour.\n\nThis is the earliest thing on this shelf and the only one that's mostly a write-up of a failure. I still recognise the argument in how I lead now: I'd rather change what a team believes than what it has installed.",
    },
    related: ["sustainable-remote-pairing", "agile-startups-paper", "engineering-playbook"],
    links: [{ label: "Read the experience report", href: "https://www.agilealliance.org/resources/experience-reports/first-being-then-doing-feeling-the-freedom-through-agileness/" }],
  },
  {
    slug: "agile-startups-paper",
    context: "talk",
    title: "Are Software Startups Applying Agile Practices?",
    type: "Conference paper",
    meta: "XP2017 · Springer",
    themes: ["Research", "Ways of working", "Continuous learning"],
    summary:
      "A peer-reviewed look at the gap between what startups say they do and what they actually practise.",
    sections: {
      problem:
        "Startups almost universally describe themselves as agile. Whether that survives contact with the day-to-day — the pressure, the pivots, the two-person teams — is an empirical question, and mostly an unasked one.",
      build:
        "A conference paper published in the XP2017 proceedings (Springer), examining which agile practices software startups genuinely apply versus which they claim.",
      learnings:
        "Doing the research is what made me sceptical of self-reported process, in a way that still shapes how I measure teams: ask what the system produces, not what it says about itself.\n\nIt's also why I'd rather ship a lightweight practice a team sustains than a correct one it quietly abandons.",
    },
    related: ["first-being-then-doing", "engineering-kpis"],
  },
  {
    slug: "xp2024-track-chair",
    context: "talk",
    title: "XP2024 Engineering Track Co-Chair",
    type: "Community leadership",
    meta: "XP2024",
    themes: ["Engineering culture", "Community", "People leadership"],
    summary:
      "Co-led the engineering track: theme definition, reviews, speaker coordination, agenda and live facilitation.",
    sections: {
      problem:
        "A conference track is a curation problem with a deadline. Someone has to decide what the engineering conversation should be about this year, then find the people who can have it well — and make the room work on the day.",
      build:
        "As co-chair of the XP2024 engineering track I helped define the theme, ran the review process, coordinated speakers, shaped the agenda and facilitated live.",
      learnings:
        "Chairing is the same job as engineering leadership with the timeline compressed into two days: set direction, review other people's work generously, then get out of the way and hold the room.\n\nReviewing submissions was the unexpectedly useful part — reading fifty proposals is the fastest way to find out what the field is actually worried about.",
    },
    related: ["adapting-to-ai", "engineering-playbook"],
  },
];
