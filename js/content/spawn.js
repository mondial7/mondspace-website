// Spawn (center) — the entrance. Two cards only: who I am, and how to read
// this place. Project shape is documented in ../content.js.
//
// Positioning follows the CV exactly (Marco_Mondini-Resume.pdf):
//   layer = Engineering Manager, scope = Product Engineer.
// Those are two different axes — the layer says how I lead, the scope says
// what I lead on. They are never presented as competing job titles.

const profile = {
  slug: "about-marco",
  title: "Marco Mondini",
  type: "Engineering Manager · Product Engineer",
  meta: "Amsterdam, EU citizen",
  themes: ["People leadership", "Delivery flow", "Technical direction", "Product engineering"],
  summary:
    "Engineering Manager and hands-on software engineer — 10+ years in product-focused startups and scale-ups, 5+ of them leading engineering teams.",
  sections: {
    now:
      "I'm Head of Development at **uButler** in Amsterdam, promoted twice into broader engineering leadership: I own people, delivery and technical direction in a product-focused environment, and I'm still in the codebase.\n\nDay to day that means coaching engineers, keeping delivery flow predictable, partnering with Product on trade-offs, and setting technical direction across web, mobile and internal platforms.",
    how:
      "I combine people-first leadership with technical fluency — the two aren't a trade-off, they're the same job seen from two angles.\n\n- **People leadership & mentoring** — 1:1s, feedback, career levels, hiring, psychological safety.\n- **Delivery flow & predictability** — lightweight KPIs/OKRs, Kanban/XP, information radiators.\n- **Technical direction & architecture** — across web, mobile, data and internal platforms.\n- **CI/CD & developer experience** — because friction compounds.\n- **Reliability, observability & incident response** — operational maturity as a feature.",
    path:
      "Co-founded a mobile startup in Bolzano (**FlashBeing**, 5,500+ users in the first month), built data-visualisation and ML-adjacent products at **Datatellers**, led a remote-first team of five at **RIDE** in Berlin, and have been leading engineering at **uButler** since 2023.\n\nUnderneath it: a B.Sc. from Bolzano, the **European Master in Software Engineering** (Madrid), and an M.Sc. from **Oulu** — plus a decade-long XP and Agile habit that shows up in everything above.\n\nThat academic side never quite switched off. I still publish occasionally, and my 2017 paper on agile practice in software startups has been cited over 140 times.",
    beyondTheCV:
      "This site is deliberately *not* the CV. The CV tells you what I was responsible for; the world around you is where I show the reasoning — the trade-offs I'd defend, the things I got wrong, the small apps I ship on my own time, and the books that actually changed how I work.\n\nIf you only have two minutes: download the CV. If you have ten, go left and read a decision I'd argue about.",
  },
  related: ["engineering-playbook", "engineering-product-workspace", "career-growth"],
  links: [
    { label: "Download CV (PDF)", href: "/Marco_Mondini-Resume.pdf" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mondinimarco/" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=wTXrtyAAAAAJ&hl=en" },
    { label: "GitHub", href: "https://github.com/mondial7" },
  ],
};

const startHere = {
  slug: "start-here",
  title: "Start here",
  type: "How to read this world",
  themes: ["Continuous learning"],
  summary:
    "Four directions, four questions. What I lead, what I build, what I teach, and how I think.",
  sections: {
    map:
      "The world around you is a map of the same career seen four ways. Nothing here is behind a menu — just look around.\n\n- **Left · Engineering Systems** — *how I lead.* The systems I've built to make an engineering organisation work: workspaces, KPIs, career levels, AI adoption, operational maturity.\n- **Right · Thoughtful Products** — *what I build.* Small apps I designed, shipped and maintain myself. None of these are on my CV.\n- **Up · Knowledge Garden** — *what I teach.* Conference talks, experience reports and a peer-reviewed paper, turned back into something explorable.\n- **Down · The Library** — *how I think.* My engineering playbook, and the books behind the opinions.",
    whyThis:
      "A CV is a list of claims. It has no room for the argument behind them.\n\nSo every project here follows the same shape — **Problem, Build, Decisions, Learnings** — and the two sections a CV can never contain are the last two. That's where the trade-offs I'd defend live, and the things that changed my mind.",
    controls:
      "Move your mouse, or press **W A S D** to look around. **C** re-centres. Press **/** to search everything at once.\n\nOn a phone, just scroll — and tap the compass to jump.",
  },
  related: ["about-marco"],
};

export const spawn = [profile, startHere];
