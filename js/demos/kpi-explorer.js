// Engineering KPI Explorer — a self-contained interactive for the "Explore" slot
// of the engineering-kpis project (see docs/adr/0006). No dependencies; mounts
// into the given element and returns a cleanup fn.
//
// The point it teaches: a metric's value depends entirely on how you use it.
// Pick a lens (scope / kind / signal) and watch which metrics light up and why
// the combination is healthy or toxic — then flip every metric to its abuse case.

const METRICS = [
  {
    name: "Lead time for changes",
    scope: "team", kind: "outcome", signal: "leading",
    healthy: "Shows how fast value actually flows to users. Great for spotting bottlenecks in the system.",
    harmful: "Push it onto individuals and people skip review and cut risky corners to look fast.",
  },
  {
    name: "Change failure rate",
    scope: "team", kind: "outcome", signal: "lagging",
    healthy: "Balances speed with quality — the counterweight that stops 'go faster' becoming reckless.",
    harmful: "Relabel incidents or quietly hide failures so the number stays green.",
  },
  {
    name: "Escaped defects",
    scope: "team", kind: "outcome", signal: "lagging",
    healthy: "Did quality actually reach the customer? An honest, user-facing signal.",
    harmful: "Turns into a blame game, so people stop reporting bugs at all.",
  },
  {
    name: "On-call interrupt load",
    scope: "team", kind: "outcome", signal: "leading",
    healthy: "A sustainability signal — protects focus and predicts burnout before it happens.",
    harmful: "Ignored until someone quits; treated as heroics instead of a system problem.",
  },
  {
    name: "Deployment frequency",
    scope: "team", kind: "output", signal: "leading",
    healthy: "A proxy for small batches and healthy flow — when read as a trend, not a target.",
    harmful: "Deploy-for-the-metric: trivial commits and noise just to move the number.",
  },
  {
    name: "Velocity (story points)",
    scope: "team", kind: "output", signal: "lagging",
    healthy: "Rough capacity planning within one team, watched as a trend over time.",
    harmful: "Compare teams or set it as a goal and you get point inflation, nothing more.",
  },
  {
    name: "Commits per developer",
    scope: "individual", kind: "output", signal: "leading",
    healthy: "Almost never useful. At best, a faint onboarding-ramp signal.",
    harmful: "Commit padding, and it quietly punishes pairing and mobbing.",
  },
  {
    name: "Lines of code",
    scope: "individual", kind: "output", signal: "lagging",
    healthy: "There is no healthy use. Deleting code is often the win.",
    harmful: "Rewards verbosity, punishes the best refactors. The canonical anti-metric.",
  },
];

const AXES = [
  { key: "scope", label: "Scope", options: [["all", "All"], ["team", "Team"], ["individual", "Individual"]] },
  { key: "kind", label: "Kind", options: [["all", "All"], ["outcome", "Outcome"], ["output", "Output"]] },
  { key: "signal", label: "Signal", options: [["all", "All"], ["leading", "Leading"], ["lagging", "Lagging"]] },
];

const VERDICTS = {
  "team-outcome": ["good", "The healthy zone. Team outcomes tell you whether the work actually helped — hard to game, worth measuring."],
  "team-output": ["warn", "Output tells you about activity, not impact. Fine as a flow signal; a trap as a goal."],
  "individual-outcome": ["warn", "Individual outcomes are hard to attribute fairly — software is a team sport, so credit and blame blur."],
  "individual-output": ["danger", "The classic trap. Individual output metrics become targets, and people optimise the number instead of the outcome."],
};

const SIGNAL_NOTE = {
  leading: "Leading indicators predict — they give you time to react.",
  lagging: "Lagging indicators confirm — they tell you what already happened.",
};

const CSS = `
.kpix { font-family: 'JetBrains Mono', ui-monospace, monospace; color: #cfdae6; }
.kpix-axes { display: grid; gap: 0.7rem; margin: 0.2rem 0 1rem; }
.kpix-axis { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.kpix-axis > span { font-size: 0.64rem; text-transform: uppercase; letter-spacing: 0.06em; color: #9fd0f0; min-width: 3.6rem; }
.kpix-seg { display: inline-flex; border: 1px solid rgba(255,255,255,0.16); border-radius: 8px; overflow: hidden; }
.kpix-seg button { font-family: inherit; font-size: 0.72rem; padding: 0.3rem 0.6rem; background: transparent; color: #cfdae6; border: none; cursor: pointer; border-right: 1px solid rgba(255,255,255,0.1); }
.kpix-seg button:last-child { border-right: none; }
.kpix-seg button[aria-pressed="true"] { background: #7ec0ee; color: #10151d; font-weight: 700; }
.kpix-verdict { border-radius: 8px; padding: 0.7rem 0.85rem; font-size: 0.86rem; line-height: 1.5; margin-bottom: 0.5rem; border: 1px solid; }
.kpix-verdict.neutral { border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.05); }
.kpix-verdict.good { border-color: rgba(118,255,3,0.4); background: rgba(118,255,3,0.08); color: #d6ffbe; }
.kpix-verdict.warn { border-color: rgba(255,152,0,0.45); background: rgba(255,152,0,0.1); color: #ffd699; }
.kpix-verdict.danger { border-color: rgba(244,143,177,0.5); background: rgba(244,143,177,0.12); color: #ffc9dc; }
.kpix-note { font-size: 0.72rem; color: #9fb4c8; margin-bottom: 0.9rem; min-height: 1em; }
.kpix-flip { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.9rem; font-size: 0.74rem; }
.kpix-flip button { font-family: inherit; font-size: 0.72rem; padding: 0.28rem 0.7rem; border-radius: 999px; border: 1px solid rgba(255,152,0,0.5); background: transparent; color: #ffd699; cursor: pointer; }
.kpix-flip button[data-on="true"] { background: rgba(255,152,0,0.18); }
.kpix-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.6rem; }
.kpix-card { border: 1px solid rgba(255,255,255,0.12); border-left: 3px solid #7ec0ee; border-radius: 8px; padding: 0.6rem 0.7rem; background: rgba(255,255,255,0.04); transition: opacity 0.2s ease, border-color 0.2s ease, transform 0.08s ease; }
.kpix-card.dim { opacity: 0.28; }
.kpix-card.match { border-left-color: #76ff03; }
.kpix-card.harm { border-left-color: #f48fb1; }
.kpix-name { font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; }
.kpix-tags { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.45rem; }
.kpix-tags span { font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.03em; padding: 0.12rem 0.35rem; border-radius: 4px; background: rgba(126,192,238,0.14); color: #9fd0f0; }
.kpix-desc { font-size: 0.76rem; line-height: 1.45; color: #cfdae6; }
.kpix-card.harm .kpix-desc { color: #ffc9dc; }
`;

function ensureStyle() {
  if (document.getElementById("kpix-style")) return;
  const s = document.createElement("style");
  s.id = "kpix-style";
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function mount(el) {
  ensureStyle();
  const state = { scope: "all", kind: "all", signal: "all", mode: "healthy" };

  el.innerHTML = `
    <div class="kpix">
      <div class="kpix-axes">
        ${AXES.map(
          (a) => `
          <div class="kpix-axis" data-axis="${a.key}">
            <span>${a.label}</span>
            <div class="kpix-seg">
              ${a.options
                .map(([v, lbl]) => `<button type="button" data-val="${v}" aria-pressed="${v === "all"}">${lbl}</button>`)
                .join("")}
            </div>
          </div>`
        ).join("")}
      </div>
      <div class="kpix-verdict neutral" data-verdict>Pick a lens. Healthy measurement starts with what you're trying to learn.</div>
      <div class="kpix-note" data-note></div>
      <div class="kpix-flip">
        <span>Same metric, used badly:</span>
        <button type="button" data-flip data-on="false">Reveal harmful use</button>
      </div>
      <div class="kpix-grid" data-grid></div>
    </div>`;

  const grid = el.querySelector("[data-grid]");
  const verdictEl = el.querySelector("[data-verdict]");
  const noteEl = el.querySelector("[data-note]");
  const flipBtn = el.querySelector("[data-flip]");

  function matches(m) {
    return (
      (state.scope === "all" || m.scope === state.scope) &&
      (state.kind === "all" || m.kind === state.kind) &&
      (state.signal === "all" || m.signal === state.signal)
    );
  }

  function renderGrid() {
    const harm = state.mode === "harmful";
    grid.innerHTML = METRICS.map((m) => {
      const on = matches(m);
      const cls = ["kpix-card", on ? "match" : "dim", harm ? "harm" : ""].filter(Boolean).join(" ");
      return `
        <div class="${cls}">
          <div class="kpix-name">${m.name}</div>
          <div class="kpix-tags"><span>${m.scope}</span><span>${m.kind}</span><span>${m.signal}</span></div>
          <div class="kpix-desc">${harm ? m.harmful : m.healthy}</div>
        </div>`;
    }).join("");
  }

  function renderVerdict() {
    let tone = "neutral";
    let msg = "Pick a lens. Healthy measurement starts with what you're trying to learn.";
    if (state.scope !== "all" && state.kind !== "all") {
      const v = VERDICTS[`${state.scope}-${state.kind}`];
      if (v) [tone, msg] = v;
    }
    verdictEl.className = `kpix-verdict ${tone}`;
    verdictEl.textContent = msg;
    noteEl.textContent = state.signal !== "all" ? SIGNAL_NOTE[state.signal] : "";
  }

  function render() {
    renderVerdict();
    renderGrid();
  }

  function onAxisClick(e) {
    const btn = e.target.closest("button[data-val]");
    if (!btn) return;
    const axis = btn.closest("[data-axis]").getAttribute("data-axis");
    state[axis] = btn.getAttribute("data-val");
    el.querySelectorAll(`[data-axis="${axis}"] button`).forEach((b) =>
      b.setAttribute("aria-pressed", String(b === btn))
    );
    render();
  }

  function onFlip() {
    state.mode = state.mode === "healthy" ? "harmful" : "healthy";
    const on = state.mode === "harmful";
    flipBtn.setAttribute("data-on", String(on));
    flipBtn.textContent = on ? "Show healthy use" : "Reveal harmful use";
    renderGrid();
  }

  el.querySelectorAll(".kpix-seg").forEach((seg) => seg.addEventListener("click", onAxisClick));
  flipBtn.addEventListener("click", onFlip);

  render();

  return () => { el.innerHTML = ""; };
}
