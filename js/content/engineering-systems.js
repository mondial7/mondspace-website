// Engineering Systems — systems that make engineering organisations work better.
// Project shape is documented in ../content.js.

export const engineeringSystems = [
  {
    slug: "engineering-product-workspace",
    context: "business",
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
        "I built a small, opinionated model for choosing metrics in a multi-project / multi-product environment:\n\n- Separate **leading** indicators (predict the future) from **lagging** ones (confirm the past).\n- Prefer **outcome** metrics (did it help?) over **output** metrics (did we do stuff?).\n- Distinguish **team** signals from **individual** ones — and never use the latter for judgment.\n- Pair every metric with the **harmful version** of itself, so its failure mode is explicit.\n\nIt became a conference talk and the interactive explorer below.",
      decisions:
        "- **Trade-offs made visible.** Every metric ships with its own abuse case, so teams adopt it with eyes open.\n- **Health over precision.** A rough signal you trust beats a precise one you game.\n- **No individual output metrics.** A hard line — they corrode the exact culture you're trying to build.",
      learnings:
        "The point of metrics isn't measurement, it's **conversation**. The best ones give a team a shared language for 'are we OK?' — the worst ones end the conversation by pretending to answer it.\n\nBuilding the explorer taught me the trade-offs land far harder when you can *toggle* them than when you read them on a slide.",
    },
    explore: { kind: "kpi-explorer" },
    related: ["engineering-product-workspace", "sustainable-remote-pairing", "engineering-metrics-talk"],
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
