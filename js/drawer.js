import { PROJECTS, CONTEXTS } from "./content.js";

// The case-study drawer: a DOM overlay (NOT part of the 3D scene, see
// docs/adr/0005) that renders any project in the consistent Problem / Build /
// Decisions / Learnings / Explore format. Deep-linkable via the URL hash.
//
//   const drawer = createDrawer({ demos, onNavigate });
//   drawer.open("engineering-product-workspace");
//
// `demos` maps an explore `kind` to an async mount fn (element) => cleanup?.
// Empty in phase 1; the KPI explorer is registered in phase 2.

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Tiny markdown subset: blank-line paragraphs, "- " bullet lists, **bold**,
// *italic*, `code`.
function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
function renderMarkup(md) {
  return md
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((l) => l.trim().startsWith("- "))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.trim().slice(2))}</li>`).join("")}</ul>`;
      }
      return `<p>${inline(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

const SECTION_ORDER = [
  ["problem", "Problem"],
  ["build", "Build"],
  ["decisions", "Decisions"],
  ["learnings", "Learnings"],
];

export function createDrawer({ demos = {}, onNavigate, onTheme } = {}) {
  const root = document.createElement("div");
  root.id = "drawer";
  root.className = "drawer";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="drawer-backdrop" data-close></div>
    <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1">
      <button class="drawer-close" type="button" data-close aria-label="Close">✕</button>
      <div class="drawer-scroll">
        <div class="drawer-body"></div>
      </div>
    </aside>`;
  document.body.appendChild(root);

  const panel = root.querySelector(".drawer-panel");
  const body = root.querySelector(".drawer-body");
  const scroll = root.querySelector(".drawer-scroll");

  let openSlug = null;
  let lastFocus = null;
  let disposeDemo = null;

  // Themes are clickable — they route into search so a visitor can wander the
  // garden by idea, not just by area.
  function themeTags(items) {
    if (!items || !items.length) return "";
    return `<div class="drawer-themes">${items
      .map((t) => `<button type="button" class="theme-tag" data-theme="${escapeHtml(t)}">${escapeHtml(t)}</button>`)
      .join("")}</div>`;
  }

  function relatedHtml(slugs) {
    const rel = (slugs || []).map((s) => PROJECTS[s]).filter(Boolean);
    if (!rel.length) return "";
    return `
      <div class="drawer-section drawer-related">
        <h3>Related ideas</h3>
        <div class="related-list">
          ${rel
            .map(
              (r) =>
                `<button class="related-card" type="button" data-goto="${r.slug}" style="--c:${r.areaColor}">
                   <span class="related-title">${escapeHtml(r.title)}</span>
                   <span class="related-area">${escapeHtml(r.areaLabel)}</span>
                 </button>`
            )
            .join("")}
        </div>
      </div>`;
  }

  function render(p) {
    const ctx = CONTEXTS[p.context];
    const ctxBadge = ctx
      ? `<span class="ctx-badge ctx--${p.context}" style="--ctx:${ctx.color}">${escapeHtml(ctx.full)}</span>`
      : "";
    const badges = [p.type, p.status, p.meta].filter(Boolean);
    const sections = SECTION_ORDER.filter(([k]) => p.sections && p.sections[k])
      .map(
        ([k, title]) =>
          `<div class="drawer-section"><h3>${title}</h3>${renderMarkup(p.sections[k])}</div>`
      )
      .join("");

    const explore = p.explore
      ? `<div class="drawer-section drawer-explore">
           <h3>Explore</h3>
           <div class="demo-mount" data-demo="${escapeHtml(p.explore.kind)}">
             <div class="demo-fallback">Loading interactive demo…</div>
           </div>
         </div>`
      : "";

    const links = (p.links || [])
      .map(
        (l) =>
          `<a class="drawer-link" href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)} ↗</a>`
      )
      .join("");

    body.innerHTML = `
      <div class="drawer-eyebrow" style="--c:${p.areaColor}">${escapeHtml(p.areaLabel)}</div>
      <h2 id="drawer-title" class="drawer-title">${escapeHtml(p.title)}</h2>
      ${ctxBadge || badges.length ? `<div class="drawer-badges">${ctxBadge}${badges.map((b) => `<span>${escapeHtml(b)}</span>`).join("")}</div>` : ""}
      <p class="drawer-summary">${escapeHtml(p.summary)}</p>
      ${themeTags(p.themes)}
      ${sections}
      ${explore}
      ${links ? `<div class="drawer-links">${links}</div>` : ""}
      ${relatedHtml(p.related)}`;

    // cross-link navigation
    body.querySelectorAll("[data-goto]").forEach((el) =>
      el.addEventListener("click", () => open(el.getAttribute("data-goto")))
    );

    // clicking a theme jumps into search
    if (onTheme) {
      body.querySelectorAll("[data-theme]").forEach((el) =>
        el.addEventListener("click", () => { close(); onTheme(el.getAttribute("data-theme")); })
      );
    }

    // mount an interactive demo if one is registered for this kind
    const mount = body.querySelector(".demo-mount");
    if (mount) mountDemo(mount);
  }

  async function mountDemo(mount) {
    const kind = mount.getAttribute("data-demo");
    const fn = demos[kind];
    if (!fn) {
      mount.innerHTML = `<div class="demo-fallback">Interactive demo coming soon.</div>`;
      return;
    }
    try {
      mount.innerHTML = "";
      disposeDemo = (await fn(mount)) || null;
    } catch (err) {
      console.error("demo failed", err);
      mount.innerHTML = `<div class="demo-fallback">Couldn't load the demo.</div>`;
    }
  }

  function teardownDemo() {
    if (typeof disposeDemo === "function") {
      try { disposeDemo(); } catch (e) { /* noop */ }
    }
    disposeDemo = null;
  }

  function open(slug) {
    const p = PROJECTS[slug];
    if (!p) return;
    teardownDemo();
    if (!openSlug) lastFocus = document.activeElement;
    openSlug = slug;
    render(p);
    root.classList.add("open");
    root.setAttribute("aria-hidden", "false");
    scroll.scrollTop = 0;
    panel.focus();
    setHash(slug);
    onNavigate && onNavigate(slug);
  }

  function close() {
    if (!openSlug) return;
    teardownDemo();
    openSlug = null;
    root.classList.remove("open");
    root.setAttribute("aria-hidden", "true");
    clearHash();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  // ---- URL hash sync (deep links: mondspace.com/#project-slug) ----
  function setHash(slug) {
    if (location.hash.slice(1) !== slug) history.replaceState(null, "", `#${slug}`);
  }
  function clearHash() {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }
  function openFromHash() {
    const slug = decodeURIComponent(location.hash.slice(1));
    if (slug && PROJECTS[slug]) open(slug);
    else if (!slug) close();
  }

  // ---- events ----
  root.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openSlug) { e.stopPropagation(); close(); }
  });
  window.addEventListener("hashchange", openFromHash);

  return { open, close, openFromHash, isOpen: () => !!openSlug };
}
