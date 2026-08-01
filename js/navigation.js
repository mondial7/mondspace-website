import * as THREE from "three";

// Turns input into camera movement.
//   Desktop (fine pointer): the mouse direction picks one of the 5 areas;
//     centre = the dead zone in the middle. The camera eases toward that view.
//   Touch (coarse pointer): page scroll drives a continuous tour through the
//     areas in `order`, blending camera positions for a fluid feel.

export function createNavigation({ camera, areas, order, onArea }) {
  const isCoarse =
    window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  const mode = isCoarse ? "scroll" : "mouse";
  document.body.classList.add(isCoarse ? "coarse-pointer" : "fine-pointer");

  let mx = 0, my = 0;          // normalized mouse, [-1, 1]
  let active = "center";
  let enabled = false;         // intro animation holds this off until ready
  let lastInputAt = 0;         // ms of last navigation input (drives the dog)
  let overBanner = false;      // pointer is over the narration card → hold still
  let keyArea = null;          // WASD/arrow pick an area; cleared when the mouse moves

  const look = areas.center.lookAt.clone();
  const tmpPos = new THREE.Vector3();
  const tmpLook = new THREE.Vector3();

  function setActive(id) {
    if (id !== active) {
      active = id;
      onArea && onArea(id);
    }
  }

  if (mode === "mouse") {
    window.addEventListener("mousemove", (e) => {
      // While the cursor is over the (expanded) narration banner, hold position
      // so the world doesn't swing around — keeps it calm and easy to read
      // cards. When the card is minimised it no longer freezes navigation, so
      // the pointer can roam the world freely with the panel parked away.
      const onCard = e.target.closest && e.target.closest(".narration-card");
      const isMini = e.target.closest && e.target.closest(".narration.minimized");
      overBanner = !!onCard && !isMini;
      if (overBanner) return;
      keyArea = null; // moving the mouse hands control back to the pointer
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
      lastInputAt = performance.now();
    });
  } else {
    window.addEventListener("scroll", () => { lastInputAt = performance.now(); }, { passive: true });
  }

  // Keyboard: W/A/S/D (and arrow keys) jump to the up/left/down/right areas;
  // C or Space recentres. The selected area holds until the mouse moves. On
  // touch the same keys drive the scroll tour via goTo.
  const KEY_AREAS = {
    w: "up", a: "left", s: "down", d: "right",
    arrowup: "up", arrowleft: "left", arrowdown: "down", arrowright: "right",
  };
  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    if (document.querySelector(".drawer.open")) return; // don't steer the world behind an open case study
    const k = e.key.toLowerCase();
    const area = k === "c" || k === " " ? "center" : KEY_AREAS[k];
    if (!area) return;
    e.preventDefault();
    lastInputAt = performance.now();
    if (mode === "scroll") { goTo(area); return; }
    keyArea = area;
  });

  function computeDesired() {
    if (mode === "mouse") {
      let id;
      if (keyArea) {
        // A key press holds a fixed view until the mouse takes over.
        id = keyArea;
      } else {
        // Hysteresis: a wide threshold to LEAVE the centre keeps it calm, and a
        // tighter one to RETURN to the centre makes the side/up/down views
        // sticky so easing the mouse back doesn't snap to centre too early.
        const enter = 0.45;
        const exit = 0.25;
        const r = Math.hypot(mx, my);
        const threshold = active === "center" ? enter : exit;
        id = "center";
        if (r > threshold) {
          if (Math.abs(my) > Math.abs(mx)) id = my < 0 ? "up" : "down";
          else id = mx < 0 ? "left" : "right";
        }
      }
      setActive(id);
      const a = areas[id];
      tmpPos.copy(a.camPos);
      tmpLook.copy(a.lookAt);
      // subtle parallax within an area (skipped while a key holds the view)
      if (!keyArea) {
        tmpPos.x += mx * 0.7;
        tmpPos.y += -my * 0.5;
      }
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const f = p * (order.length - 1);
      const i0 = Math.floor(f);
      const i1 = Math.min(order.length - 1, i0 + 1);
      const frac = f - i0;
      tmpPos.copy(areas[order[i0]].camPos).lerp(areas[order[i1]].camPos, frac);
      tmpLook.copy(areas[order[i0]].lookAt).lerp(areas[order[i1]].lookAt, frac);
      setActive(order[Math.round(f)]);
    }
  }

  function update() {
    if (!enabled) return;
    // Reading a card? Hold the camera still so the pointer can roam the card
    // freely — but a keyboard pick (keyArea) still drives the scene change, so
    // WASD/arrows work even while the mouse rests over the card.
    if (mode === "mouse" && overBanner && !keyArea) return;
    computeDesired();
    camera.position.lerp(tmpPos, 0.06);
    look.lerp(tmpLook, 0.06);
    camera.lookAt(look);
  }

  // Jump straight to an area. On touch this smooth-scrolls the tour to the
  // matching point (the scroll then drives the camera there).
  function goTo(id) {
    const idx = order.indexOf(id);
    if (idx < 0) return;
    lastInputAt = performance.now();
    if (mode === "scroll") {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: (idx / (order.length - 1)) * max, behavior: "smooth" });
    }
  }

  return {
    mode,
    update,
    goTo,
    getActive: () => active,
    isIdle: (now) => now - lastInputAt > 700,
    enable() {
      enabled = true;
      // sync the smoothing state to wherever the intro left the camera
      look.copy(areas.center.lookAt);
      onArea && onArea(active);
    },
  };
}
