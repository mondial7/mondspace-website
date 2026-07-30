// Thoughtful Products — small software with real purpose. Project shape is
// documented in ../content.js.
//
// The journaling, puppy, habits and currency entries describe real apps
// (Mira, Mare, Leafstep, LempiraEUR); details verified against their source
// repos. Only LempiraEUR is on the App Store yet; the others are in review.

export const thoughtfulProducts = [
  {
    slug: "journaling",
    context: "indie",
    title: "Mira",
    type: "iOS app",
    status: "Live on App Store",
    meta: "SwiftUI · SwiftData",
    themes: ["Thoughtful software", "Reducing cognitive load", "Privacy by design", "Continuous learning"],
    summary: "A calm, private place to notice how you really feel — capture a thought, tag the feeling, rate its intensity, and move on.",
    sections: {
      problem:
        "Most journaling apps optimise for feeds, streaks and stats. But the value of a journal isn't the streak — it's the noticing. I wanted the smallest honest unit of reflection: what happened, how it felt, and how much — captured in seconds and never mined for engagement.",
      build:
        "Mira is a SwiftUI app on SwiftData with optional iCloud (CloudKit) sync. An entry is a thought (free text), one or more sentiments from a fixed palette, and an intensity from 1–10. Notable choices:\n\n- **Ports-and-adapters core** — a pure `JournalKit` Swift package with zero Apple-framework imports, so the domain is testable in milliseconds without a simulator.\n- **Tamper-evident history** — every edit is an immutable audit event in a SHA-256 hash chain; you can see exactly how an entry changed.\n- **On-device voice dictation**, full-text search and filters, soft-delete with a trash, and one-tap export to CSV / Markdown.\n\nBuilt through an AI-assisted workflow, with product, architecture and design led by me.",
      decisions:
        "- **Private by design.** No accounts, no servers, no analytics, no third-party SDKs — \"Data Not Collected\" on the App Store. Data stays on device; iCloud sync is optional.\n- **Conditional reminders, not nagging.** A reminder is suppressed if you've already written that day, and \"Skip today\" silences a single one.\n- **Structure over blank page.** A fixed thought / sentiment / intensity template makes capture fast and consistent — reflection you can actually keep up.",
      learnings:
        "Keeping the domain free of Apple frameworks turned reminders and the audit trail into pure functions I could test in milliseconds — the calm UX rests on a boringly testable core.\n\nAnd shipping changes your principles: v1 had *no streaks* on purpose, but real use pushed me to add a **gentle** streak that encourages consistency without the guilt. Designing for reflection is a constant negotiation with the engagement playbook.",
    },
    links: [{ label: "View on the App Store", href: "https://apps.apple.com/nl/app/mira-mondspace-journal/id6792884985" }],
    related: ["habit-tracker", "puppy-companion"],
  },
  {
    slug: "puppy-companion",
    context: "indie",
    title: "Mare",
    type: "Full-stack app",
    status: "In development",
    meta: "Go · HTMX · SwiftUI",
    themes: ["Reducing cognitive load", "Thoughtful software", "AI adoption", "Privacy by design"],
    summary:
      "The app that watches the clock so you don't have to. One tap logs a care event; the potty timer stays current and the journal writes itself — for first-time puppy owners who'd rather watch the puppy than the checklist.",
    sections: {
      problem:
        "I suddenly became responsible for a puppy and was drowning: when did she last pee, has she eaten, which vaccination is next, is she growing normally? Every answer lived in a different place, each easy to forget, all stressful to get wrong. The friction wasn't looking things up — it was *remembering to log* in the first place.",
      build:
        "Mare is a small monorepo with one domain shared across three surfaces:\n\n- **Go backend** (standard-library `net/http` + `html/template`) — a single static binary with embedded migrations, on PostgreSQL, deployed stateless on Fly.io.\n- **Server-rendered web app** with HTMX for live updates, plus a native **SwiftUI** iOS app with home-screen widgets and Siri voice logging.\n- **Brand-as-code** — one `tokens.json` generates both the web CSS and the iOS Swift, so the design system can't drift.\n\nThe hero is a one-tap, no-forms log (pee, poop, meal, walk, nap) that feeds everything else: an age-based **potty countdown**, a computed food-and-activity plan, a growth curve, auto-written weekly recaps, and AI-generated puppy tips.",
      decisions:
        "- **Surface, don't store.** The home screen shows what's happening and what's next, so you rarely have to go looking. Outputs — journal, growth chart, recaps — are *generated from* logging, never typed.\n- **Quiet by default.** Proactive nudges are few, prioritised (max ~3) and dismissible — it must never nag.\n- **Not a vet.** It tracks what you and your vet decide and never prescribes; AI tips are clearly labelled and GDPR-minimised (no names or emails in prompts).\n- **Offline-first logging.** The critical path works on a walk with no signal and syncs later.",
      learnings:
        "The real cognitive load wasn't accessing past data — it was the remembering. Making one-tap logging the single primitive, and deriving the journal, plan and reminders *from* it, means the owner gets the outputs for free.\n\nSharing one Go domain across web and iOS — with brand tokens generated for both — kept a three-surface product coherent as a solo build, and forced the discipline of a testable, framework-light core.",
    },
    related: ["habit-tracker", "journaling", "ai-engineering-assistant"],
  },
  {
    slug: "habit-tracker",
    context: "indie",
    title: "Leafstep",
    type: "iOS app",
    status: "Coming soon to the App Store",
    meta: "SwiftUI · SwiftData",
    themes: ["Behaviour systems", "Thoughtful software", "Privacy by design", "Sustainable engineering"],
    summary: "Consistency through re-engagement, not streaks — a habit tracker that welcomes you back after a miss instead of punishing a broken chain.",
    sections: {
      problem:
        "Most habit trackers are guilt machines. Miss a day and the streak resets to zero — exactly the moment you're most likely to quit. The tool punishes the lapse instead of helping the recovery.",
      build:
        "Leafstep is a SwiftUI + SwiftData app (optional iCloud sync) with two habit types — Goals (done / not done) and Actions (a counter you increment). What makes it different is the nudge engine:\n\n- **On-device smart nudges** score habits mostly by *days since you last acted* (×3), with streak-protection deliberately weighted low (×0.5) — so it surfaces what you've neglected and welcomes you back, rather than guarding a chain. No ML, no networking; deterministic and private.\n- **Event-sourced timeline** — every check, increment and move is an immutable event you can look back on.\n- **Home-screen widgets** in three sizes that carry the same nudges, plus JSON export / import.\n\nBuilt through an AI-assisted workflow, with product and design led by me.",
      decisions:
        "- **Re-engagement over streaks.** The scoring makes 'come back' the primary signal and 'protect your streak' a minor one — the opposite of most trackers.\n- **Private and offline.** Everything is computed on device; iCloud sync is optional, and there are no analytics.\n- **Celebrate the win.** Confetti on completion — encouragement, never shame for a miss.",
      learnings:
        "A behaviour system that makes you feel bad is one you'll delete. Putting *days since last action* at the centre of the nudge score — instead of the streak — turned the app from a taskmaster into something that meets you where you are. Sustainability applies to habits like it does to teams: pace beats heroics.",
    },
    related: ["journaling", "sustainable-remote-pairing"],
  },
  {
    slug: "currency-converter",
    context: "indie",
    title: "LempiraEUR",
    type: "iOS app",
    status: "Live on App Store",
    meta: "SwiftUI · Combine",
    themes: ["Reducing friction", "Thoughtful software", "Travel"],
    summary:
      "Tiny software that takes the mental arithmetic out of travel — euros to Honduran lempira and Nepalese rupee in a tap, online or off.",
    sections: {
      problem:
        "Standing in a market in Tegucigalpa or Kathmandu doing currency maths in your head — with no signal — is a small, universal friction. Most converters assume a connection and bury the one number you actually want.",
      build:
        "A SwiftUI + Combine app focused on the two currencies I actually travelled with: EUR ↔ Honduran Lempira (HNL) and EUR ↔ Nepalese Rupee (NPR). Rates come from ExchangeRate-API and are cached locally, so it keeps working on the last known rate when the network doesn't. Also:\n\n- **Home-screen widgets** — including an interactive slider — for a glance-and-go rate.\n- **Bilingual** English / Spanish.\n- Sliders and quick amounts, plus links to the official central-bank rates.\n\nBuilt through an AI-assisted workflow, with product direction led by me.",
      decisions:
        "- **Works offline on cached rates.** It refreshes when it can and degrades gracefully to the last known rate — the moment you need it is often the moment you have no data.\n- **Two currencies, done well.** Not a global converter — the ones I actually needed, with local context and central-bank links.\n- **Privacy-first.** No tracking, no analytics, no personal data; everything stays on device.",
      learnings:
        "Sharp, tiny software removes a disproportionate amount of friction. Constraining it to two real trips — Honduras and Nepal — made every decision easy. Scope is a feature.",
    },
    links: [{ label: "View on the App Store", href: "https://apps.apple.com/ae/app/lempiraeur/id6755972445" }],
    related: ["puppy-companion", "journaling"],
  },
  {
    slug: "office-chores",
    context: "business",
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
