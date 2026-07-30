import { PROJECTS } from "./content.js";

// Search across the whole knowledge garden — titles, types, summaries, themes
// and section prose (see docs/adr/0007). Opens results in the drawer.
//
//   const search = createSearch({ onOpen: (slug) => drawer.open(slug) });
//   search.open();          // blank
//   search.open("metrics"); // prefilled (used by clickable themes)

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const WEIGHT = { title: 6, theme: 4, meta: 2, summary: 2, section: 1 };

export function createSearch({ onOpen } = {}) {
  // Precomputed, weighted fields per project.
  const ENTRIES = Object.values(PROJECTS).map((p) => ({
    p,
    fields: {
      title: (p.title || "").toLowerCase(),
      theme: (p.themes || []).join(" ").toLowerCase(),
      meta: [p.type, p.status, p.meta].filter(Boolean).join(" ").toLowerCase(),
      summary: (p.summary || "").toLowerCase(),
      section: Object.values(p.sections || {}).join(" ").toLowerCase(),
    },
  }));

  const root = document.createElement("div");
  root.id = "search";
  root.className = "search";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="search-backdrop" data-close></div>
    <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search Mondspace">
      <div class="search-bar">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input class="search-input" type="text" autocomplete="off" spellcheck="false"
               placeholder="Search projects, talks, ideas…" aria-label="Search Mondspace"
               role="combobox" aria-expanded="true" aria-controls="search-results" />
        <kbd class="search-esc">esc</kbd>
      </div>
      <ul class="search-results" id="search-results" role="listbox"></ul>
      <div class="search-empty" hidden>No matches — try a theme like <em>AI</em> or <em>metrics</em>.</div>
    </div>`;
  document.body.appendChild(root);

  const input = root.querySelector(".search-input");
  const list = root.querySelector(".search-results");
  const empty = root.querySelector(".search-empty");

  let results = [];
  let sel = 0;
  let open = false;

  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  function score(fields, terms) {
    let total = 0;
    for (const t of terms) {
      const wordRe = new RegExp(`\\b${escapeRegex(t)}\\b`);
      let best = 0;
      for (const [k, w] of Object.entries(WEIGHT)) {
        const f = fields[k];
        if (!f.includes(t)) continue;
        // whole-word hits (AI) outrank substring hits (ai inside "pair")
        best = Math.max(best, w * (wordRe.test(f) ? 1 : 0.4));
      }
      if (!best) return -1; // every term must match somewhere (AND)
      total += best;
    }
    return total;
  }

  function compute(q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      return ENTRIES.map((e) => e.p); // show everything, original order
    }
    return ENTRIES.map((e) => ({ p: e.p, s: score(e.fields, terms) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.p);
  }

  function render(q) {
    results = compute(q);
    sel = 0;
    empty.hidden = results.length > 0;
    list.innerHTML = results
      .map(
        (p, i) => `
        <li class="search-result${i === 0 ? " active" : ""}" role="option" data-slug="${p.slug}"
            aria-selected="${i === 0}" style="--c:${p.areaColor}">
          <span class="sr-title">${escapeHtml(p.title)}</span>
          <span class="sr-meta">${escapeHtml(p.areaLabel)} · ${escapeHtml(p.type)}</span>
          <span class="sr-summary">${escapeHtml(p.summary)}</span>
        </li>`
      )
      .join("");
  }

  function highlight() {
    [...list.children].forEach((li, i) => {
      const on = i === sel;
      li.classList.toggle("active", on);
      li.setAttribute("aria-selected", String(on));
      if (on) li.scrollIntoView({ block: "nearest" });
    });
  }

  function choose(i) {
    const p = results[i];
    if (!p) return;
    close();
    onOpen && onOpen(p.slug);
  }

  function show(prefill = "") {
    open = true;
    root.classList.add("open");
    root.setAttribute("aria-hidden", "false");
    input.value = prefill;
    render(prefill);
    // focus after paint so mobile keyboards behave
    requestAnimationFrame(() => input.focus());
  }
  function close() {
    if (!open) return;
    open = false;
    root.classList.remove("open");
    root.setAttribute("aria-hidden", "true");
  }
  function toggle() {
    open ? close() : show();
  }

  input.addEventListener("input", () => render(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, results.length - 1); highlight(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); highlight(); }
    else if (e.key === "Enter") { e.preventDefault(); choose(sel); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  list.addEventListener("click", (e) => {
    const li = e.target.closest("[data-slug]");
    if (li) choose(results.findIndex((p) => p.slug === li.getAttribute("data-slug")));
  });
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });

  // global "/" shortcut (ignored while typing in a field)
  window.addEventListener("keydown", (e) => {
    if (e.key === "/" && !open) {
      const t = e.target;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (!typing) { e.preventDefault(); show(); }
    }
  });

  return { open: show, close, toggle, isOpen: () => open };
}
