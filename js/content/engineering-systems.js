// Engineering Systems — systems that make engineering organisations work better.
// Project shape is documented in ../content.js.

export const engineeringSystems = [
  {
    slug: "engineering-product-workspace",
    context: "business",
    title: "Cadence",
    type: "Internal platform",
    status: "In production",
    meta: "Engineering & product workspace",
    themes: ["Internal platforms", "Developer experience", "Engineering metrics", "Design systems", "Ways of working"],
    summary:
      "The internal platform I built to run engineering and product off one surface — roadmap, board, metrics, tech radar, a shared backlog and a design system for HTML mocks.",
    sections: {
      problem:
        "When I stepped up to lead engineering at uButler, the team's knowledge lived everywhere and nowhere: planning happened in three tools, decisions evaporated in chat, and nobody could answer 'what are we working on, and why' without a meeting.\n\nThe cost wasn't just friction. It was **invisible work** — effort no one could see, priorities no one could question, and onboarding that took weeks because the map only existed in people's heads.",
      build:
        "I built **Cadence**, an internal platform that puts the whole engineering flow on one surface — and then joins it to the product side rather than sitting next to it.\n\n- **Roadmap** — the engineering roadmap, integrated with the product roadmap so the two are one picture instead of two documents that disagree by Thursday.\n- **Board** — where the work actually moves.\n- **Metrics** — the KPIs and radiator live here, pulled in rather than assembled for a meeting.\n- **Help desk** — a front door for engineering flows, so requests stop arriving as taps on the shoulder.\n- **Tech radar** — for managing the technical foundations deliberately: what we're adopting, holding, and getting off.\n- **Backlog area** — one centralised place where *every* team refines, grooms and plans together, instead of each team keeping its own private queue.\n- **Design system** — a simple one, built to store and link **HTML designs**.\n\nThat last one is the piece I'd point at. Low- and high-fidelity mocks are increasingly just HTML now, and having somewhere to store and link them turned design handoff from a static picture into something everyone could open, click and argue with. It's the part that genuinely bridged product, design and engineering — three groups who otherwise each held a different version of the same screen.",
      decisions:
        "- **One backlog for every team, not one per team.** The centralised refining and planning area was the least popular decision at first and the one I'd defend hardest — private queues are how two teams end up solving the same problem in different quarters.\n- **The roadmaps had to be joined, not adjacent.** An engineering roadmap that merely sits beside the product roadmap will drift from it. Integrating them means a change on one side is visibly a change on the other.\n- **HTML mocks over static images.** A picture of a screen can't be clicked, can't be responsive, and can't be handed to an engineer as anything but a target to reinterpret. Storing designs as linkable HTML made the artifact the same object for all three disciplines.\n- **A tech radar, so foundations are a decision rather than a drift.** Without one, the stack is chosen by whoever started the newest service.\n- **Boring tech on purpose.** I optimised for adoption over elegance — the best workspace is the one people actually open.\n- **Radiate, don't report.** Metrics are pulled automatically and shown passively; nobody assembles a status deck. This kills 'reporting theatre'.\n- **Documentation as a side effect.** Capture happens inside the planning flow, so the docs stay alive instead of rotting.",
      learnings:
        "Internal tools are products — they live or die on adoption, not features. Treating the team as users changed everything about how I built this.\n\nI also learned that **visibility is leverage**: once work became visible, better prioritisation and healthier conversations followed almost on their own.\n\nThe surprise was the design system. I built it as a small utility for storing mocks, and it turned out to be the part that changed the most conversations — because it gave product, design and engineering a *single object* to point at. Most cross-functional friction I've seen isn't disagreement; it's three people describing three different mental images and assuming they match.\n\nAll of it reshaped how I think about engineering leadership: the highest-leverage thing you can build is often not a feature, but the system that helps everyone else build better.",
    },
    related: ["engineering-kpis", "ai-engineering-assistant", "ai-360-feedback"],
  },
  {
    slug: "engineering-kpis",
    context: "business",
    title: "Engineering KPIs",
    type: "Engineering system",
    meta: "Agile Venture Bolzano 2024",
    status: "Talk + working system",
    themes: ["Engineering metrics", "Ways of working", "Sustainable engineering"],
    summary:
      "Metrics engineers actually enjoy — leading vs lagging, outcome vs output, healthy vs harmful. A framework (and an explorer) for measuring delivery without weaponising numbers.",
    sections: {
      problem:
        "Most engineering metrics fail the same way: they measure what's easy to count (velocity, lines, tickets) and quietly become targets. Once a metric is a target, it stops measuring anything — people optimise the number, not the outcome.\n\nI kept seeing teams either drown in dashboards nobody trusted, or fly blind because 'metrics are evil'. Both are avoidable.\n\nI had to solve this while building the uButler development team essentially **from scratch**, across several products at once — so the measurement grew up alongside the team rather than being dropped on one that already existed.",
      build:
        "The environment is genuinely awkward to measure: five products running at once (mobile app, client portal, internal portals, web app, BI infrastructure) alongside a project stream that ranges from ISO certification and ops automation to market analysis and AI innovation. Any metric assuming one team shipping one thing falls apart immediately.\n\nWhat I built was **three groups of metrics and four places to read them**.\n\nThe metrics sort into:\n\n- **Output** — velocity, delivered\n- **Flow** — throughput, volatility, effort allocation\n- **Quality** — incidents, releases, bugs and defects\n\nAnd they surface at four different cadences, each aimed at a different audience:\n\n- **Day Start** *(daily, internal)* — half stand-up, half check-in, against a Kanban-style board.\n- **Management report** *(weekly, external)* — deviations from target KPIs, framed as progress, plans and problems.\n- **Roadmap** *(monthly)* — monthly milestones against the yearly plan.\n- **Development Radiator** *(anytime, internal)* — weekly and quarterly progress at a glance.\n\nThe explorer below is the interactive version of the model behind all this.",
      decisions:
        "**The radiator updates reactively, not automatically.** This is the choice people argue with most. A dashboard that refreshes itself is something you stop seeing; one that updates when someone goes and looks builds the habit of checking. It sits deliberately between an interactive dashboard and a physical information radiator — digital, so remote-first colleagues actually have it, but designed for a passer-by rather than an analyst.\n\n**Deliberately few metrics on it.** The constraint is that someone glancing at it for five seconds should still leave with something true. Depth belongs in the analysis tools, not the radiator.\n\n**Effort allocation is reported as a split** — maintenance vs technical improvements vs product delivery. It's the single most useful number I report upward, because it turns 'why is this taking so long' into a conversation about where the time is actually going.\n\n**Outcome and impact are defined with Product, not by Engineering alone.** A metric engineering invents for itself measures engineering's opinion of itself.\n\n**No individual output metrics.** A hard line — they corrode the exact culture you're trying to build.",
      learnings:
        "The point of metrics isn't measurement, it's **conversation**. The best ones give a team a shared language for 'are we OK?' — the worst ones end the conversation by pretending to answer it.\n\nThree things I'd now defend in an argument:\n\n- **Freeze projects on purpose.** Deliberately freezing and unfreezing work at the right moment is a real lever on cost of delay — at iteration level and at roadmap level. Everything running at once is the most expensive way to run anything.\n- **Solve technical debt by not focusing on technical debt.** Chase delivery speed, flow and product quality instead, and the debt that actually matters is the debt that shows up in those numbers. The rest was never urgent.\n- **Keep zooming in and out.** Zoom in on a target, then zoom out and re-check whether it's still the right thing to measure. In a complex environment there's no silver bullet, and a metric that was right last quarter is a liability if nobody revisits it.\n\nBuilding the explorer taught me the trade-offs land far harder when you can *toggle* them than when you read them on a slide.",
    },
    explore: { kind: "kpi-explorer" },
    related: ["engineering-product-workspace", "sustainable-remote-pairing", "engineering-metrics-talk", "ocean-eye"],
  },
  {
    slug: "ai-engineering-assistant",
    context: "business",
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
    context: "business",
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
  {
    slug: "career-growth",
    context: "business",
    title: "Career Levels & Growth",
    type: "People system",
    status: "In production",
    themes: ["People leadership", "Mentoring", "Engineering culture", "Ways of working"],
    summary:
      "The system behind growing engineers: career levels, a real 1:1 cadence, feedback that lands, and a hiring bar the team can actually apply.",
    sections: {
      problem:
        "I was building the uButler development team from close to nothing, which meant the growth system and the team arrived together rather than one being retrofitted onto the other.\n\nA small team can go a long way on goodwill, and then it stops. Engineers couldn't see what *next* looked like, so growth conversations turned into salary conversations. Feedback arrived in bursts when something went wrong. Hiring decisions leaned on whoever interviewed most confidently that week.\n\nNone of that is a people problem. It's a **missing system** — and its absence is felt hardest by the quietest people on the team.",
      build:
        "I introduced the scaffolding that makes growth legible:\n\n- **Career levels** — written expectations for each level, so 'what would it take?' has an answer that isn't my opinion on the day.\n- **A 1:1 cadence that holds** — regular, engineer-owned agenda, not a status report in disguise.\n- **Feedback as a habit** — specific and behavioural, close to the event, in both directions.\n- **A shared hiring bar** — clear expectations and a consistent loop, so decisions are comparable across interviewers.\n- **Practices that reinforce psychological safety** — because none of the above works if people can't say the true thing.",
      decisions:
        "- **Levels as a map, not a ladder.** They describe scope and impact, not a queue you wait in. The Staff-track and management-track branches are both drawn, deliberately — nobody should back into management because it was the only path on the wall.\n- **Written beats charismatic.** Anything I only say in a 1:1 doesn't scale past me and quietly favours whoever talks to me most.\n- **Lightweight on purpose.** A framework the team won't maintain is worse than none — it decays into a document people cite when they're unhappy.\n- **Coaching over evaluating.** The levels exist to answer 'how do I grow', and only incidentally 'how did I do'.",
      learnings:
        "The framework mattered far less than the fact that it was *written down and applied consistently*. Most of the perceived unfairness in a small team isn't unfairness — it's ambiguity, and people fill ambiguity with their worst guess.\n\nI also learned to be honest that management is a **different job, not a higher one**. Saying that out loud changed which people put their hand up, and made it safe for a strong engineer to stay an engineer.",
    },
    related: ["engineering-product-workspace", "ai-360-feedback", "engineering-metrics-talk", "engineering-playbook", "book-managers-path"],
  },
  {
    slug: "operational-maturity",
    context: "business",
    title: "Operational Maturity",
    type: "Engineering system",
    status: "In production",
    themes: ["Reliability", "Observability", "Incident response", "Risk & compliance"],
    summary:
      "Turning 'the site is slow, I think?' into a system: observability, incident response, security reviews and business-continuity planning a small team can actually sustain.",
    sections: {
      problem:
        "A startup finds out it needs operational maturity in exactly one way: something breaks, and nobody can say when it started, who noticed, or whether it's still happening.\n\nAt the same time the company was growing into real obligations — security reviews, audit readiness, business continuity. The usual answer is a compliance binder that no engineer ever reads. I wanted the version where the team is genuinely better at running its software, and the paperwork falls out of that as a by-product.",
      build:
        "Raised the floor across several fronts at once, each deliberately small:\n\n- **Observability** — the boring question first: can we see it? Signals chosen so a human can go from alert to cause without a guided tour.\n- **Incident response** — a lightweight practice for declaring, handling and *writing up* incidents, with blameless review as the default.\n- **Security reviews & risk management** — made routine rather than heroic, and sized to a small team.\n- **Business continuity & audit readiness** — documented where the work already happens, so it stays true.",
      decisions:
        "- **Blameless, or don't bother.** The moment a write-up becomes a search for who, you stop learning what — and you lose the reports you most needed to read.\n- **Sustainable for the team we actually are.** A rota that burns out four people is not reliability, it's a deferred outage.\n- **Compliance as an output, not a project.** If the practice is real, the evidence exists already; if you need a project to produce it, the practice wasn't real.\n- **Reliability is a product decision.** Deciding how reliable something needs to be is a conversation with Product, not a target engineering invents alone.",
      learnings:
        "Operational maturity reads as bureaucracy right up until the first incident it makes survivable — and after that it's the least negotiable thing you own.\n\nThe surprise was cultural, not technical: the practice that changed the most was **blameless write-ups**. Once engineers stopped expecting the question to be *who*, they started reporting the near-misses, which is where nearly all the useful information turned out to be.",
    },
    related: ["engineering-product-workspace", "engineering-kpis", "career-growth"],
  },
];
