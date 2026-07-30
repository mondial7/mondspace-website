// The Library (down area) — an "About Marco" panel plus books that shaped how
// I think. Project shape is documented in ../content.js. Books use the section
// keys about / why / takeaway (the drawer labels any section key).
//
// NOTE: the book list is a starter set chosen to fit the profile — edit freely
// to match the real shelf.

const about = {
  slug: "about-marco",
  title: "About Marco",
  type: "Profile",
  themes: ["Continuous learning", "Sustainable engineering"],
  summary: "The short version — who I am, what I do now, and what I care about.",
  sections: {
    now:
      "I'm a Staff-level engineer and engineering-systems builder, currently leading engineering at uButler in Amsterdam. I establish the processes, KPIs and AI-assisted workflows that help a small team ship sustainably — while staying hands-on across the stack (TypeScript, Python, React / React Native, Go, GraphQL, GCP).",
    path:
      "10+ years across startups and small product teams — from co-founding a mobile startup, through data-visualisation and legacy platforms, to engineering leadership. Underneath it: a European Master in Software Engineering (Madrid + Oulu) and a lifelong XP / Agile habit.",
    beyond:
      "I speak in the XP / Agile community, build small honest apps for myself (the shelves around you), and I'm happiest reducing friction — for teams, for users, and for one very good dog.",
  },
  related: ["engineering-playbook", "engineering-product-workspace"],
};

const books = [
  {
    slug: "book-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    type: "Book",
    meta: "Andrew Hunt & David Thomas",
    themes: ["Craft", "Ways of working", "Continuous learning"],
    summary: "The closest thing our field has to a book of good habits.",
    sections: {
      about: "A tour of the everyday craft of software — from DRY and orthogonality to tracer bullets and taking responsibility for your work.",
      why: "It's less about any language and more about a *stance*: pragmatic, curious, allergic to broken windows. It ages well because habits do.",
      takeaway: "Care about the boring stuff — naming, automation, small daily improvements — because that's where quality actually lives.",
    },
  },
  {
    slug: "book-team-topologies",
    title: "Team Topologies",
    type: "Book",
    meta: "Matthew Skelton & Manuel Pais",
    themes: ["Organisational design", "Ways of working", "Developer experience"],
    summary: "Conway's Law, turned into a design tool for how teams are shaped.",
    sections: {
      about: "A model for organising teams (stream-aligned, platform, enabling, complicated-subsystem) and the interaction modes between them.",
      why: "It gave me language for something I kept feeling: that team boundaries and cognitive load are an architectural decision, not an HR one.",
      takeaway: "Design the team-of-teams as deliberately as you design the system — the two mirror each other whether you plan it or not.",
    },
    related: ["engineering-product-workspace"],
  },
  {
    slug: "book-thinking-in-systems",
    title: "Thinking in Systems",
    type: "Book",
    meta: "Donella H. Meadows",
    themes: ["Systems thinking", "Sustainable engineering"],
    summary: "The book behind how I actually see problems.",
    sections: {
      about: "A clear, humane primer on stocks, flows, feedback loops, delays and leverage points — systems thinking without the jargon.",
      why: "It's the intellectual spine of this whole site. Most engineering-org problems are feedback-loop problems wearing a different costume.",
      takeaway: "The highest-leverage change is rarely the obvious one — look for where a small shift in structure changes the whole behaviour.",
    },
    related: ["engineering-product-workspace"],
  },
  {
    slug: "book-accelerate",
    title: "Accelerate",
    type: "Book",
    meta: "Forsgren, Humble & Kim",
    themes: ["Engineering metrics", "Ways of working"],
    summary: "The research that made delivery metrics respectable.",
    sections: {
      about: "The evidence behind the four key metrics (lead time, deploy frequency, change-fail rate, MTTR) and the capabilities that move them.",
      why: "It's the antidote to metric theatre — measures that predict outcomes without becoming targets you can game.",
      takeaway: "Speed and stability aren't a trade-off; the same capabilities improve both. That reframed how I talk about KPIs.",
    },
    related: ["engineering-kpis"],
  },
  {
    slug: "book-xp-explained",
    title: "Extreme Programming Explained",
    type: "Book",
    meta: "Kent Beck",
    themes: ["XP", "Sustainable engineering", "Ways of working"],
    summary: "Where my values as an engineer come from.",
    sections: {
      about: "The case for XP — small releases, pairing, testing, continuous feedback — and, underneath the practices, a set of human values.",
      why: "The practices matter, but the values (communication, feedback, courage, respect, sustainable pace) are what stuck with me.",
      takeaway: "Sustainable pace is an engineering constraint, not a perk. Teams that respect it go faster over any horizon that matters.",
    },
    related: ["sustainable-remote-pairing", "sync-code-reviews"],
  },
  {
    slug: "book-staff-engineer",
    title: "Staff Engineer",
    type: "Book",
    meta: "Will Larson",
    themes: ["Technical leadership", "Continuous learning"],
    summary: "A map of the senior-IC path that isn't 'become a manager'.",
    sections: {
      about: "The archetypes of the Staff-plus role, how the work changes above senior, and how influence replaces authority.",
      why: "It named a lot of what I already do — technical strategy, glue work, influence without a title — and gave it a shape to grow into.",
      takeaway: "At this level the job is leverage: the highest-value thing you build is often the system that helps everyone else build better.",
    },
    related: ["engineering-playbook"],
  },
];

export const library = [about, ...books];
