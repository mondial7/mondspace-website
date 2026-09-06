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
    type: "Peer-reviewed paper",
    status: "140+ citations",
    meta: "XP2017 · Springer LNBIP 283 · open access",
    themes: ["Research", "Data analysis", "Ways of working", "Continuous learning"],
    summary:
      "The state of the practice from a survey of 1,526 software startups — and my first serious piece of work in software-engineering research.",
    sections: {
      problem:
        "Startups almost universally describe themselves as agile. Whether that survives contact with the day-to-day — the pressure, the pivots, the two-person teams — is an empirical question, and at the time a mostly unasked one.\n\nTwo research questions: are software startups applying agile practices, and do the ones following Lean Startup apply them differently?",
      build:
        "Published in the XP2017 proceedings (Springer LNBIP 283, pp. 167–183) with Jevgenija Pantiuchina, Dron Khanna, Xiaofeng Wang and Pekka Abrahamsson, out of the Free University of Bozen-Bolzano and NTNU. I'm second author.\n\n**My contribution was the data.** I did the cleaning and validation, the analysis, and the definition of the results, and contributed to shaping the research questions. The study examined five practices — regular refactoring and test-first (quality), frequent release and agile planning (speed), and the daily standup (communication) — using exploratory factor analysis and chi-square tests in R.",
      decisions:
        "The number I still think about: the raw dataset had **10,171 entries and the cleaned one had 1,526**. We threw away 85% of the data.\n\nThat was a deliberate trade-off, and we said so in the paper: strict validation cases certainly removed some genuinely valid entries, but a clean dataset was worth more than a large one. The validation rules were published openly on figshare so anyone could disagree with them.\n\nThe other honest moment: we wanted to aggregate practices into quality and speed dimensions, but Cronbach's alpha came back at 0.41 and 0.50 — too low to justify it. So we dropped the aggregation and analysed each practice on its own, which was less tidy and more true.",
      learnings:
        "The headline finding was that speed-related practices are used far more than quality ones, and the daily standup least of all. The one that surprised me: startups following Lean Startup did **not** trade quality for speed more than anyone else — the stereotype didn't survive the data.\n\nDoing this is what made me permanently sceptical of self-reported process, and it still shapes how I measure teams: ask what the system produces, not what it says about itself. It's also why I'd rather ship a lightweight practice a team sustains than a correct one it quietly abandons.\n\nAnd it taught me that the least glamorous part — deciding what data you're willing to throw away — is usually where the result is actually decided.",
    },
    related: ["first-being-then-doing", "engineering-kpis", "dabml-paper"],
    links: [
      { label: "Read the paper (open access)", href: "https://doi.org/10.1007/978-3-319-57633-6_11" },
      { label: "Google Scholar profile", href: "https://scholar.google.com/citations?user=wTXrtyAAAAAJ&hl=en" },
    ],
  },
  {
    slug: "dabml-paper",
    context: "talk",
    title: "daBML",
    type: "Peer-reviewed paper",
    meta: "2025 · Advances in Software Startups",
    themes: ["AI adoption", "Research", "Ways of working"],
    summary:
      "An extension of the Build-Measure-Learn loop for adopting generative AI into a product process.",
    sections: {
      problem:
        "Build-Measure-Learn assumes you're testing a hypothesis about a product. Adopting generative AI into how a team works is a different shape of problem: the thing you're changing is the process itself, the capability moves under you, and 'did it help?' is genuinely hard to measure.",
      build:
        "A paper with Gijs Oliemans, published in *Advances in Software Startups: Generative AI, Product Engineering* (2025), proposing **daBML** — an extension to the Build-Measure-Learn loop aimed at generative-AI process adoption.",
      learnings:
        "This is the academic counterpart to the AI work I do day to day: the *Adapting to AI* talk and the assistant and feedback tooling are the practice, and this is the attempt to give it a loop you can actually run rather than a set of anecdotes.\n\nIt also closes a loop of my own — my first paper was about whether startups really do what they claim, and this one is about how you'd know whether an AI practice is working. Same scepticism, eight years later.",
    },
    related: ["agile-startups-paper", "adapting-to-ai", "ai-engineering-assistant"],
    links: [
      { label: "Google Scholar profile", href: "https://scholar.google.com/citations?user=wTXrtyAAAAAJ&hl=en" },
    ],
  },
  {
    slug: "xp2024-track-chair",
    context: "talk",
    title: "XP2024 Engineering Track Co-Chair",
    type: "Community leadership",
    meta: "XP2024 · Bolzano",
    themes: ["Engineering culture", "Community", "People leadership"],
    summary:
      "Co-chaired the engineering track: reviewing, accepting and giving feedback on session proposals, then facilitating on the day.",
    sections: {
      problem:
        "A conference track is a curation problem with a deadline. Someone has to read every proposal, decide what gets a slot, tell the people who don't — and then make the room actually work once everyone's in it.",
      build:
        "As co-chair of the engineering track at XP2024 in Bolzano I reviewed session proposals, decided which were accepted, and gave feedback to the people who submitted them. On the day I helped with facilitation and the arrangements that keep a track running.",
      learnings:
        "Reviewing submissions was the unexpectedly useful part. Reading a stack of proposals is the fastest way to find out what the field is actually worried about this year — far faster than attending the talks that result.\n\nGiving feedback on rejected proposals is the part I'd defend: a rejection with nothing attached teaches no one anything, and the person on the other end is usually one draft away from a good session.",
    },
    related: ["adapting-to-ai", "engineering-metrics-talk", "engineering-playbook"],
  },
  {
    slug: "engineering-metrics-talk",
    context: "talk",
    title: "Development KPIs & Reporting",
    type: "Talk",
    meta: "Agile Venture Bolzano 2024",
    themes: ["Engineering metrics", "Technical leadership", "Ways of working"],
    summary:
      "Navigating a multi-project, multi-product environment — the metrics work as it actually happened, while building a development team from scratch.",
    sections: {
      problem:
        "Most metrics talks are given from a finished system, which makes them useless to the people who need them most. I gave this one from the middle: I was building the uButler development team essentially from scratch, and had to work out what was worth measuring *while* the team, the process and the products were all still moving.\n\nMulti-project and multi-product makes it harder again. Any metric that assumes one team shipping one thing falls apart the moment attention is split.",
      build:
        "An industry talk at Agile Venture Bolzano in 2024, co-located with XP2024 the following day, on my own work: which KPIs survived contact with a small team spread across several products, how the reporting was built so it cost almost nothing to keep running, and which measures I dropped.",
      learnings:
        "Building the team and building the measurement had to happen together, and that turned out to be an advantage — metrics introduced alongside a growing team read as a shared instrument, where the same metrics imposed on an established team read as surveillance.\n\nThe other lesson: in a multi-product environment, the useful question is almost never 'how fast is the team' but 'where is attention actually going', and those need very different instruments.",
    },
    related: ["engineering-kpis", "xp2024-track-chair", "career-growth"],
  },
];
