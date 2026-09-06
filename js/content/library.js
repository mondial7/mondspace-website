// The Library (down area) — my engineering playbook plus the books behind the
// opinions. Project shape is documented in ../content.js. Books use the section
// keys about / why / takeaway (the drawer labels any section key).
//
// NOTE: the book list is a starter set chosen to fit the profile — edit freely
// to match the real shelf.

const playbook = {
  slug: "engineering-playbook",
  context: "indie",
  title: "Engineering Playbook",
  type: "Playbook",
  status: "Growing",
  themes: ["Technical leadership", "Sustainable engineering", "Ways of working", "Continuous learning"],
  summary:
    "An open, growing handbook of everything I've learned building software and teams — principles, not prescriptions.",
  sections: {
    problem:
      "Hard-won engineering lessons usually stay locked in people's heads or scattered across old talk decks. I wanted one growing place where the thinking connects — a reference for engineers stepping into technical leadership, whichever track they take — not a listicle.",
    build:
      "A living playbook, added to over time. Early chapters:\n\n- Sustainable pace is an engineering constraint\n- Influence without authority\n- Build feedback loops, not reporting theatre\n- Use AI to remove friction, not judgment\n- Internal tools are products\n- Pairing as distributed system knowledge\n- Technical leadership in small organisations\n- When process becomes overhead",
    learnings:
      "Writing the playbook is how I find out what I actually believe. Each chapter starts as an opinion and gets sharpened until it's useful to someone who isn't me.",
  },
  related: ["engineering-product-workspace", "engineering-kpis", "sustainable-remote-pairing", "ai-engineering-assistant"],
};

const books = [
  {
    slug: "book-pragmatic-programmer",
    title: "The Pragmatic Programmer",
    type: "Suggested read",
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
    type: "Suggested read",
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
    type: "Suggested read",
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
    type: "Suggested read",
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
    type: "Suggested read",
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
    type: "Suggested read",
    meta: "Will Larson",
    themes: ["Technical leadership", "Continuous learning"],
    summary: "A map of the senior-IC path that isn't 'become a manager'.",
    sections: {
      about: "The archetypes of the Staff-plus role, how the work changes above senior, and how influence replaces authority.",
      why: "It named a lot of what I already do — technical strategy, glue work, influence without a title — and gave it a shape to grow into.",
      takeaway: "At this level the job is leverage: the highest-value thing you build is often the system that helps everyone else build better.",
    },
    related: ["engineering-playbook", "book-managers-path"],
  },
  {
    slug: "book-managers-path",
    title: "The Manager's Path",
    type: "Suggested read",
    meta: "Camille Fournier",
    themes: ["People leadership", "Technical leadership", "Continuous learning"],
    summary: "The other map — what the management track actually asks of you.",
    sections: {
      about: "A stage-by-stage walk through engineering leadership: being managed, mentoring, tech lead, managing people, managing managers — and what changes at each step.",
      why: "I read it next to *Staff Engineer* on purpose. Both describe leadership above senior; only one involves a reporting line. Knowing both maps is what let me choose deliberately rather than drift.",
      takeaway: "Management is a distinct craft with its own skills to practise — not a promotion you receive for being good at the previous job.",
    },
    related: ["book-staff-engineer", "career-growth", "engineering-playbook"],
  },
];

export const library = [playbook, ...books];
