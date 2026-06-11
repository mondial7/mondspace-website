import * as THREE from "three";
import { initWorld } from "./world.js";
import { createNavigation } from "./navigation.js";
import { createHUD } from "./hud.js";
import { createAudio } from "./audio.js";
import { AREAS } from "./content.js";

const canvas = document.getElementById("scene");
const splash = document.getElementById("splash");
const fill = document.getElementById("splash-fill");
const statusEl = document.getElementById("splash-status");

const isCoarse =
  window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));
const setStatus = (s) => (statusEl.textContent = s);

let fillVal = 0;
function tweenFill(target, ms = 450) {
  return new Promise((res) => {
    const from = fillVal;
    const start = performance.now();
    (function step(now) {
      const k = Math.min(1, (now - start) / ms);
      fillVal = from + (target - from) * k;
      fill.style.width = fillVal.toFixed(1) + "%";
      if (k < 1) requestAnimationFrame(step);
      else res();
    })(performance.now());
  });
}

function failGracefully(err) {
  console.error(err);
  splash.innerHTML = `
    <div class="splash-inner" style="line-height:1.7">
      <div class="splash-logo" style="font-size:1.1rem"><span>M</span><span>!</span></div>
      <p style="color:#cfe8ff;font-size:0.85rem">
        This world needs WebGL, which isn't available here.<br><br>
        I'm <strong>Marco Mondini</strong> — engineering leader and hands-on developer.<br>
        <a style="color:#FF9800" href="https://github.com/mondial7">GitHub</a> ·
        <a style="color:#FF9800" href="https://linkedin.com/in/mondinimarco/">LinkedIn</a>
      </p>
    </div>`;
}

async function boot() {
  setStatus("Waking the engine…");
  await tweenFill(18);
  await nextFrame();

  const W = initWorld(canvas);

  setStatus("Carving the island…");
  await tweenFill(58);
  await nextFrame();
  W.render(); // compile shaders / warm the pipeline

  setStatus("Planting trees & avatars…");
  await tweenFill(86);
  await nextFrame();
  W.render();

  setStatus("Ready.");
  await tweenFill(100);

  // ---- interaction layer ----
  const hud = createHUD({ camera: W.camera, areaViews: W.areas, isCoarse });
  const nav = createNavigation({
    camera: W.camera,
    areas: W.areas,
    order: AREAS.map((a) => a.id),
    onArea: (id) => hud.showArea(id),
  });
  createAudio({ onPlayingChange: (on) => W.setJukeboxPlaying(on) });

  // ---- intro camera fly-in ----
  const introStartPos = new THREE.Vector3(0, 30, 46);
  const introStartLook = new THREE.Vector3(0, 8, -4);
  const endPos = W.areas.center.camPos.clone();
  const endLook = W.areas.center.lookAt.clone();
  const curLook = introStartLook.clone();

  let phase = reduceMotion ? "live" : "intro";
  let introStart = null;
  const DUR = 2.6;
  const smoother = (x) => x * x * x * (x * (x * 6 - 15) + 10);

  if (reduceMotion) {
    W.camera.position.copy(endPos);
    W.camera.lookAt(endLook);
    nav.enable();
  } else {
    W.camera.position.copy(introStartPos);
    W.camera.lookAt(curLook);
  }

  function loop(now) {
    requestAnimationFrame(loop);
    const t = now / 1000;
    W.tick(t);

    if (phase === "intro") {
      if (introStart == null) introStart = t;
      const k = Math.min(1, (t - introStart) / DUR);
      const e = smoother(k);
      W.camera.position.lerpVectors(introStartPos, endPos, e);
      curLook.lerpVectors(introStartLook, endLook, e);
      W.camera.lookAt(curLook);
      if (k >= 1) {
        phase = "live";
        nav.enable();
      }
    } else {
      nav.update();
    }

    hud.update();
    W.render();
  }
  requestAnimationFrame(loop);

  // reveal the world
  await new Promise((r) => setTimeout(r, 350));
  splash.classList.add("gone");
}

boot().catch(failGracefully);
