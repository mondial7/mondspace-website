import { AREAS, LINKS } from "./content.js";

const byId = Object.fromEntries(AREAS.map((a) => [a.id, a]));

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Wires up everything in the #hud overlay: nav links, world-anchored narration
// with a typewriter effect, the compass, the neon cursor and the hint.
export function createHUD({ camera, areaViews, isCoarse, onJump }) {
  const $ = (id) => document.getElementById(id);
  const narration = $("narration");
  const card = narration.querySelector(".narration-card");
  const labelEl = $("narration-label");
  const textEl = $("narration-text");
  const jukeboxEl = $("jukebox");
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
    : "Move your mouse to explore ✦";
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
    if (typed.has(id)) {
      textEl.innerHTML = escapeHtml(full).replace(/\n/g, "<br>");
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
        textEl.innerHTML = escapeHtml(full).replace(/\n/g, "<br>");
        typed.add(id); // fully written — don't animate this one again
      }
    })();
  }

  let current = "center";
  function showArea(id) {
    const a = byId[id];
    if (!a) return;
    current = id;
    labelEl.textContent = a.label;
    labelEl.style.color = a.color;
    card.style.borderLeftColor = a.color;
    jukeboxEl.hidden = !a.audio;
    narration.classList.remove("hidden");
    typeLines(id, a.lines, a.color);

    // compass
    compass.querySelectorAll(".dot").forEach((d) =>
      d.classList.toggle("active", d.classList.contains(id))
    );
    if (id !== "center") fadeHint();
  }

  // Each frame, pin the narration card to its area's world anchor.
  function update() {
    if (isCoarse) return; // CSS pins the card on touch devices
    const view = areaViews[current];
    if (!view) return;
    const p = view.anchor.clone().project(camera);
    const behind = p.z > 1;
    if (behind) {
      narration.style.opacity = "0";
      narration.style.pointerEvents = "none";
      return;
    }
    narration.style.opacity = "";
    narration.style.pointerEvents = "";
    const x = (p.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-p.y * 0.5 + 0.5) * window.innerHeight;
    // keep the card comfortably on screen
    const cx = Math.min(Math.max(x, window.innerWidth * 0.28), window.innerWidth * 0.72);
    const cy = Math.min(Math.max(y, window.innerHeight * 0.34), window.innerHeight * 0.74);
    narration.style.left = `${cx}px`;
    narration.style.top = `${cy}px`;
  }

  return { showArea, update };
}
