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
];
