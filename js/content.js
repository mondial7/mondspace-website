// All site content lives here so the world stays a thin presentation layer.
// Five areas arranged as a panorama the visitor looks around (desktop) or
// scrolls through (mobile). Order below is also the mobile scroll order.
//
// Each area is a CATEGORY holding project cards. A project follows a consistent
// "Pokémon card" shape (see docs/adr/0004, 0005):
//
//   { slug, title, type, status?, meta?, summary, themes[],
//     sections: { problem, build?, decisions?, learnings },
//     explore?: { kind },   // mounts an interactive demo (phase 2)
//     related?: [slug],     // cross-links into the knowledge graph (phase 3)
//     links?: [{ label, href }] }
//
// Section bodies use a tiny markdown subset: blank-line-separated paragraphs,
// "- " bullet lists, **bold** and `code` (rendered in js/drawer.js).

export const PALETTE = ["#00FFFF", "#DA70D6", "#FF9800", "#76FF03", "#F48FB1", "#FAFAFA"];

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
      "Talks, lessons and an engineering playbook — as interactive experiences, not slides.",
      "A decade of XP, Agile and AI-adoption practice, made explorable.",
    ],
    projects: [
      {
        slug: "engineering-playbook",
        title: "Engineering Playbook",
        type: "Playbook",
        status: "Growing",
        themes: ["Technical leadership", "Sustainable engineering", "Ways of working", "Continuous learning"],
        summary:
          "An open, growing handbook of everything I've learned building software and teams — principles, not prescriptions.",
        sections: {
          problem:
            "Hard-won engineering lessons usually stay locked in people's heads or scattered across old talk decks. I wanted one growing place where the thinking connects — a reference for engineers and Staff-level ICs, not a listicle.",
          build:
            "A living playbook, added to over time. Early chapters:\n\n- Sustainable pace is an engineering constraint\n- Influence without authority\n- Build feedback loops, not reporting theatre\n- Use AI to remove friction, not judgment\n- Internal tools are products\n- Pairing as distributed system knowledge\n- Staff engineering in small organisations\n- When process becomes overhead",
          learnings:
            "Writing the playbook is how I find out what I actually believe. Each chapter starts as an opinion and gets sharpened until it's useful to someone who isn't me.",
        },
        related: ["engineering-product-workspace", "engineering-kpis", "sustainable-remote-pairing", "ai-engineering-assistant"],
      },
      {
        slug: "adapting-to-ai",
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
    projects: [
      {
        slug: "engineering-product-workspace",
        title: "Engineering & Product Workspace",
        type: "Internal platform",
        status: "In production",
        themes: ["Internal platforms", "Developer experience", "Engineering metrics", "Ways of working"],
        summary:
          "Rebuilt how engineering and product plan, document and stay aligned — one workspace that replaced scattered docs, ad-hoc planning and invisible progress.",
        sections: {
          problem:
            "When I stepped up to lead engineering at uButler, the team's knowledge lived everywhere and nowhere: planning happened in three tools, decisions evaporated in chat, and nobody could answer 'what are we working on, and why' without a meeting.\n\nThe cost wasn't just friction. It was **invisible work** — effort no one could see, priorities no one could question, and onboarding that took weeks because the map only existed in people's heads.",
          build:
            "I rebuilt the engineering & product workspace as a single operating surface:\n\n- **Planning** — one backlog, one roadmap, one place where work is split, estimated and prioritised.\n- **Documentation** — architecture decisions, runbooks and rituals captured where the work happens, not in a wiki graveyard.\n- **KPIs & reporting** — weekly information radiators that surface delivery health without a status meeting.\n- **Visibility** — cross-team alignment so product and engineering see the same picture.\n\nIt was deliberately built on tools the team already had, wired together with light automation, so adoption cost was near zero.",
          decisions:
            "- **Boring tech on purpose.** I optimised for adoption over elegance — the best workspace is the one people actually open.\n- **Radiate, don't report.** Metrics are pulled automatically and shown passively; nobody assembles a status deck. This kills 'reporting theatre'.\n- **Documentation as a side effect.** Capture happens inside the planning flow, so the docs stay alive instead of rotting.\n- **Start with the team's pain, not a framework.** I mapped the real friction first, and only then chose structure.",
          learnings:
            "Internal tools are products — they live or die on adoption, not features. Treating the team as users changed everything about how I built this.\n\nI also learned that **visibility is leverage**: once work became visible, better prioritisation and healthier conversations followed almost on their own.\n\nIt reshaped how I think about engineering leadership: the highest-leverage thing you can build is often not a feature, but the system that helps everyone else build better.",
        },
        related: ["engineering-kpis", "ai-engineering-assistant", "ai-360-feedback"],
      },
      {
        slug: "engineering-kpis",
        title: "Engineering KPIs",
        type: "Engineering system",
        meta: "Agile Venture Bolzano 2024",
        status: "Talk + working system",
        themes: ["Engineering metrics", "Ways of working", "Sustainable engineering"],
        summary:
          "Metrics engineers actually enjoy — leading vs lagging, outcome vs output, healthy vs harmful. A framework (and an explorer) for measuring delivery without weaponising numbers.",
        sections: {
          problem:
            "Most engineering metrics fail the same way: they measure what's easy to count (velocity, lines, tickets) and quietly become targets. Once a metric is a target, it stops measuring anything — people optimise the number, not the outcome.\n\nI kept seeing teams either drown in dashboards nobody trusted, or fly blind because 'metrics are evil'. Both are avoidable.",
          build:
            "I built a small, opinionated model for choosing metrics in a multi-project / multi-product environment:\n\n- Separate **leading** indicators (predict the future) from **lagging** ones (confirm the past).\n- Prefer **outcome** metrics (did it help?) over **output** metrics (did we do stuff?).\n- Distinguish **team** signals from **individual** ones — and never use the latter for judgment.\n- Pair every metric with the **harmful version** of itself, so its failure mode is explicit.\n\nIt became a conference talk and the interactive explorer below.",
          decisions:
            "- **Trade-offs made visible.** Every metric ships with its own abuse case, so teams adopt it with eyes open.\n- **Health over precision.** A rough signal you trust beats a precise one you game.\n- **No individual output metrics.** A hard line — they corrode the exact culture you're trying to build.",
          learnings:
            "The point of metrics isn't measurement, it's **conversation**. The best ones give a team a shared language for 'are we OK?' — the worst ones end the conversation by pretending to answer it.\n\nBuilding the explorer taught me the trade-offs land far harder when you can *toggle* them than when you read them on a slide.",
        },
        explore: { kind: "kpi-explorer" },
        related: ["engineering-product-workspace", "sustainable-remote-pairing"],
      },
      {
        slug: "ai-engineering-assistant",
        title: "AI Engineering Assistant",
        type: "AI workflow",
        status: "In production",
        themes: ["AI adoption", "Developer experience", "Ways of working"],
        summary:
          "How an engineering team adopts AI without hype — prompt patterns, review gates and quality guardrails that remove friction instead of judgment.",
        sections: {
          problem:
            "AI in engineering is mostly narrated as either salvation or threat. Neither helps a team ship. 'We use Cursor' isn't a strategy, and unguided AI use quietly erodes code quality and review culture.\n\nThe useful question is narrower: where does AI **remove friction** without removing understanding?",
          build:
            "I led AI adoption across development and operations at uButler:\n\n- **Prompt patterns** for the recurring jobs — scaffolding, test generation, migration grunt-work, code explanation.\n- **Review gates** so AI-assisted changes meet the same bar as any other — the human stays accountable.\n- **Quality guardrails** — where AI is trusted, where it's assistive-only, where it's off-limits.\n- Early adoption of Hugging Face Transformers to bring AI assistants into production-grade systems.\n\nStack: TypeScript, Python, GCP, Hugging Face Transformers.",
          decisions:
            "- **Friction, not judgment.** AI removes toil; humans keep judgment. That line is the whole philosophy.\n- **Same quality bar.** AI-assisted code is reviewed like code — no special pass.\n- **Document the patterns.** Shared prompt patterns beat everyone rediscovering them privately.",
          learnings:
            "The teams that get value from AI aren't the ones with the best tools — they're the ones with the clearest norms about when to reach for them. Adoption is a culture problem wearing a technology costume.",
        },
        related: ["ai-360-feedback", "adapting-to-ai", "engineering-product-workspace"],
      },
      {
        slug: "ai-360-feedback",
        title: "360 AI Feedback",
        type: "AI product",
        status: "Piloting with the team",
        themes: ["AI adoption", "Feedback loops", "Ways of working"],
        summary:
          "An AI-assisted 360 feedback tool that improves feedback loops — making peer feedback more useful, more specific and less painful to give.",
        sections: {
          problem:
            "Most feedback systems fail for the same reasons: feedback is vague ('be more proactive'), late (once a year), and expensive to write — so people skip it or phone it in. The loop that's supposed to help people grow barely turns.",
          build:
            "A tool, currently piloting with the engineering team, that uses AI to:\n\n- turn vague notes into **specific, behavioural** feedback,\n- prompt for concrete examples where feedback is thin,\n- lower the effort of giving good feedback so it happens more often.\n\nThe human always owns the message — the AI just raises the floor on quality.",
          decisions:
            "- **Assistive, never authoritative.** AI drafts and prompts; people decide and send.\n- **Improve the loop, not the paperwork.** Success is more-useful feedback more often, not a prettier form.\n- **Pilot before rollout.** Feedback is sensitive; earn trust with a small group first.",
          learnings:
            "Improving a feedback loop is a systems problem, not a UI problem. The leverage is in reducing the *cost* of the good behaviour, not exhorting people to do it.",
        },
        related: ["ai-engineering-assistant", "engineering-product-workspace"],
      },
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
    projects: [
      {
        slug: "journaling",
        title: "Journaling",
        type: "Indie product",
        status: "Personal project",
        themes: ["Reducing cognitive load", "Thoughtful software", "Continuous learning"],
        summary: "Software that helps you think — a journal designed to externalise thought, not gamify it.",
        sections: {
          problem:
            "Journaling apps mostly optimise for streaks and stats. But the value of a journal isn't the streak — it's the thinking. When the app nudges you toward 'don't break the chain', it quietly changes what you write and why.",
          build:
            "A deliberately calm journaling app: fast capture, gentle structure (prompts you can ignore), and search that makes past thinking findable. No streaks, no badges, no guilt.\n\nBuilt through an AI-assisted workflow, with product direction, system design and refinement led by me.",
          decisions:
            "- **No gamification.** The reward is clarity, not a number.\n- **Capture speed above all.** If it's slow to open, you won't use it when it matters.\n- **Private by default.** Thinking needs a safe place.",
          learnings:
            "Designing for reflection means designing *away* from engagement metrics — the usual playbook actively works against the goal. That tension is the whole design problem.",
        },
        related: ["habit-tracker", "puppy-companion"],
      },
      {
        slug: "puppy-companion",
        title: "Puppy Companion",
        type: "Indie product",
        status: "Personal project",
        themes: ["Reducing cognitive load", "Thoughtful software"],
        summary:
          "A system that remembers everything a first-time puppy owner can't — vaccinations, growth, training, vet visits — so you can just enjoy the dog.",
        sections: {
          problem:
            "I suddenly became responsible for a puppy and was drowning in things to track: vaccination schedules, weight, training milestones, vet appointments — each in a different place, each easy to forget, all stressful to get wrong.",
          build:
            "A tiny companion app that holds the whole picture: vaccination and vet timeline, growth and weight tracking, training progress, appointment reminders, and a photo timeline for the fun part.\n\nBuilt through an AI-assisted workflow, with product direction, system design and refinement led by me.",
          decisions:
            "- **Reduce load, don't add chores.** Every feature must remove more worry than it adds.\n- **Timeline as the spine.** A puppy's life is a sequence; the UI follows that.\n- **Forgiving reminders.** Nudge, don't nag.",
          learnings:
            "It wasn't 'a puppy app' — it was a system for reducing the cognitive load of caring for something you love but can't hold entirely in your head. That reframing sits behind everything else I build. (The roaming dog on this site is a nod to it.)",
        },
        related: ["habit-tracker", "journaling"],
      },
      {
        slug: "habit-tracker",
        title: "Habit Tracker",
        type: "Indie product",
        status: "Personal project",
        themes: ["Behaviour systems", "Thoughtful software", "Sustainable engineering"],
        summary: "Building consistency instead of guilt — a tracker that helps you recover from a miss instead of punishing it.",
        sections: {
          problem:
            "Most habit trackers are guilt machines. Miss a day and the streak resets to zero — exactly the moment you're most likely to quit. The tool punishes the lapse instead of helping the recovery.",
          build:
            "A habit tracker built around **recovery, not streaks**: it emphasises getting back on track after a miss, shows trends over guilt-inducing perfect records, and treats consistency as a rate, not a chain.\n\nBuilt through an AI-assisted workflow, with product direction, system design and refinement led by me.",
          decisions:
            "- **Rate over streak.** '5 of the last 7' is honest and kind; '0 (streak broken)' is neither.\n- **Frictionless recovery.** The most important moment is the day after a miss — design for it.\n- **Trends, not judgment.** Show direction, not a verdict.",
          learnings:
            "A behaviour system that makes you feel bad is a behaviour system you'll delete. Sustainability applies to habits exactly like it applies to engineering teams — pace beats heroics.",
        },
        related: ["journaling", "sustainable-remote-pairing"],
      },
      {
        slug: "currency-converter",
        title: "Currency Converter",
        type: "Indie product",
        status: "Personal project",
        themes: ["Reducing friction", "Thoughtful software"],
        summary:
          "Tiny software that removes travel anxiety — an offline-first converter that's fast, simple and works when your data doesn't.",
        sections: {
          problem:
            "Standing in a foreign market doing mental arithmetic with no signal is a small, universal friction. Most converter apps assume connectivity and bury the one number you actually want.",
          build:
            "An offline-first converter: caches rates, opens instantly to the pair you use, and answers the only question that matters — 'is this expensive?' — in one glance. It earned its keep on trips through Honduras and Nepal.\n\nBuilt through an AI-assisted workflow, with product direction, system design and refinement led by me.",
          decisions:
            "- **Offline first.** The moment you need it is the moment you have no signal.\n- **One number, big.** Ruthless focus on the actual job.\n- **Instant open.** Sub-second, or it's useless in a shop.",
          learnings:
            "Tiny software with a sharp purpose can remove a disproportionate amount of friction. Not everything worth building is big.",
        },
        related: ["puppy-companion", "journaling"],
      },
      {
        slug: "office-chores",
        title: "Office Chores Manager",
        type: "Playful tool",
        status: "In use (started as a Google Sheet)",
        themes: ["Reducing friction", "Ways of working"],
        summary:
          "A deliberately small internal tool for coordinating recurring office responsibilities — because solving annoying problems well is its own signal.",
        sections: {
          problem:
            "Recurring office chores are the classic tragedy of the commons: everyone's responsibility, so nobody's. It started as a Google Sheet, which worked until it didn't — no reminders, no fairness, easy to ignore.",
          build:
            "A tiny scheduler that rotates recurring responsibilities fairly, nudges whoever's up, and keeps overhead near zero. It graduated from a spreadsheet to a small tool without pretending to be more than it is.\n\nBuilt through an AI-assisted workflow, with product direction led by me.",
          decisions:
            "- **Keep it small.** The tool's overhead must stay below the chore's overhead.\n- **Fairness is the feature.** Rotation people trust is the whole point.\n- **Spreadsheet-first was right.** Prove the need before building software.",
          learnings:
            "Solving small, annoying problems well is an underrated signal — it says you notice friction and remove it. That instinct scales from office chores to engineering platforms.",
        },
        related: ["engineering-product-workspace"],
      },
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

// Flat index of every project by slug — used by the drawer for cross-links and,
// later, by search (see docs/adr/0007).
export const PROJECTS = Object.fromEntries(
  AREAS.flatMap((a) => (a.projects || []).map((p) => [p.slug, { ...p, areaId: a.id, areaLabel: a.label, areaColor: a.color }]))
);
