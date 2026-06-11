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
      // While the cursor is over the narration banner, hold position so the
      // world doesn't swing around — keeps it calm and easy to navigate.
      if (e.target.closest && e.target.closest(".narration-card")) return;
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    });
  }

  function computeDesired() {
    if (mode === "mouse") {
      // Hysteresis: a wide threshold to LEAVE the centre keeps it calm, and a
      // tighter one to RETURN to the centre makes the side/up/down views sticky
      // so easing the mouse back doesn't snap you to centre too early.
      const enter = 0.45;
      const exit = 0.25;
      const r = Math.hypot(mx, my);
      const threshold = active === "center" ? enter : exit;
      let id = "center";
      if (r > threshold) {
        if (Math.abs(my) > Math.abs(mx)) id = my < 0 ? "up" : "down";
        else id = mx < 0 ? "left" : "right";
      }
      setActive(id);
      const a = areas[id];
      tmpPos.copy(a.camPos);
      tmpLook.copy(a.lookAt);
      // subtle parallax within an area
      tmpPos.x += mx * 0.7;
      tmpPos.y += -my * 0.5;
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
    computeDesired();
    camera.position.lerp(tmpPos, 0.06);
    look.lerp(tmpLook, 0.06);
    camera.lookAt(look);
  }

  return {
    mode,
    update,
    getActive: () => active,
    enable() {
      enabled = true;
      // sync the smoothing state to wherever the intro left the camera
      look.copy(areas.center.lookAt);
      onArea && onArea(active);
    },
  };
}
