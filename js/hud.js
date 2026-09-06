import { AREAS, LINKS, CONTEXTS } from "./content.js";

const byId = Object.fromEntries(AREAS.map((a) => [a.id, a]));

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Wires up everything in the #hud overlay: nav links, world-anchored narration
// with a typewriter effect, the compass, the neon cursor and the hint.
export function createHUD({ camera, areaViews, isCoarse, onJump, onOpenProject }) {
  const $ = (id) => document.getElementById(id);
  const narration = $("narration");
  const card = narration.querySelector(".narration-card");
  const labelEl = $("narration-label");
  const textEl = $("narration-text");
  const reduceBtn = $("narration-reduce");

  // Reduce / expand: collapse the card into a top-left miniature. While
  // minimised the pointer no longer freezes navigation (see navigation.js), so
  // you can roam the world with the panel tucked away, then click to bring it
  // back to centre.
  let minimized = false;
  function setMinimized(v) {
    minimized = v;
    narration.classList.toggle("minimized", v);
    reduceBtn.setAttribute("aria-label", v ? "Expand panel" : "Minimize panel");
    reduceBtn.setAttribute("title", v ? "Expand" : "Minimize");
  }
  reduceBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setMinimized(!minimized);
  });
  // Clicking the parked miniature anywhere brings it back.
  narration.addEventListener("click", () => {
    if (minimized) setMinimized(false);
  });

  // Project cards live below the narration text. Built once, repopulated per
  // area from the content data.
  const cardsEl = document.createElement("div");
  cardsEl.className = "area-cards";
  card.appendChild(cardsEl);
  const linksEl = $("links");
  const hintEl = $("hint");
  const cursor = $("cursor");
  const compass = $("compass");

  narration.classList.add("hidden");
  compass.style.opacity = 1;

  // On touch the compass doubles as a tappable d-pad to jump between areas.
  if (isCoarse && onJump) {
    compass.setAttribute("aria-hidden", "false");
    compass.querySelectorAll(".dot").forEach((dot) => {
      const id = ["up", "left", "center", "right", "down"].find((c) => dot.classList.contains(c));
      if (!id) return;
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("aria-label", `Go to ${id}`);
      dot.addEventListener("click", () => onJump(id));
    });
  }

  // nav links
  LINKS.forEach((l) => {
    const a = document.createElement("a");
    a.href = l.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = l.label;
    linksEl.appendChild(a);
  });

  // hint
  hintEl.textContent = isCoarse
    ? "Scroll to explore the world ↓"
    : "Move your mouse or press W A S D to explore ✦";
  let hintFaded = false;
  const fadeHint = () => {
    if (hintFaded) return;
    hintFaded = true;
    hintEl.classList.add("fade");
  };
  setTimeout(fadeHint, 8000);

  // neon cursor (desktop only)
  if (!isCoarse) {
    window.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
  }

  // typewriter — animates the first time an area is shown, then renders the
  // full text instantly on every return so we don't replay it each visit.
  let typeTimer = null;
  const typed = new Set();
  function typeLines(id, lines, color) {
    clearTimeout(typeTimer);
    textEl.style.color = color;
    textEl.style.textShadow = `0 0 8px ${color}55`;
    const full = lines.join("\n\n");
    const fullHtml = escapeHtml(full).replace(/\n/g, "<br>");
    // Reserve the final text height up-front (render full, measure, pin
    // min-height) so the card doesn't grow line-by-line as the typewriter runs.
    textEl.style.minHeight = "0px";
    textEl.innerHTML = fullHtml;
    textEl.style.minHeight = `${textEl.offsetHeight}px`;
    if (typed.has(id)) {
      textEl.innerHTML = fullHtml;
      return;
    }
    let i = 0;
    const caret = '<span class="caret">&nbsp;</span>';
    (function step() {
      i++;
      textEl.innerHTML = escapeHtml(full.slice(0, i)).replace(/\n/g, "<br>") + caret;
      if (i < full.length) {
        typeTimer = setTimeout(step, 22);
      } else {
        textEl.innerHTML = fullHtml;
        typed.add(id); // fully written — don't animate this one again
      }
    })();
  }

  // Compact clickable chips, one per project in the area. Each opens the drawer.
  function renderCards(a) {
    const projects = a.projects || [];
    cardsEl.innerHTML = "";
    cardsEl.hidden = projects.length === 0;
    projects.forEach((p) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "area-card";
      btn.style.setProperty("--c", a.color);
      const ctx = CONTEXTS[p.context];
      const ctxTag = ctx
        ? `<span class="area-card-ctx ctx--${p.context}" style="--ctx:${ctx.color}">${escapeHtml(ctx.label)}</span>`
        : "";
      btn.innerHTML =
        ctxTag +
        `<span class="area-card-title">${escapeHtml(p.title)}</span>` +
        `<span class="area-card-type">${escapeHtml(p.type)}${p.explore ? " · ▶ demo" : ""}</span>`;
      btn.addEventListener("click", () => onOpenProject && onOpenProject(p.slug));
      cardsEl.appendChild(btn);
    });
  }

  let current = "center";
  function showArea(id) {
    const a = byId[id];
    if (!a) return;
    current = id;
    labelEl.textContent = a.label;
    labelEl.style.color = a.color;
    renderCards(a);
    narration.classList.remove("hidden");
    typeLines(id, a.lines, a.color);

    // compass
    compass.querySelectorAll(".dot").forEach((d) =>
      d.classList.toggle("active", d.classList.contains(id))
    );
    if (id !== "center") fadeHint();
  }

  // The card is pinned to screen centre by CSS (same spot & size for every
  // area), so there is nothing to reposition per frame. Kept for API parity
  // with the render loop.
  function update() {}

  return { showArea, update };
}
