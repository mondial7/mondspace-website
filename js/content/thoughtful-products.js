// Thoughtful Products — small software with real purpose. Project shape is
// documented in ../content.js.

export const thoughtfulProducts = [
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
];
