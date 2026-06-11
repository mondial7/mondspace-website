import * as THREE from "three";
import {
  buildGround, buildTree, buildClouds, buildMonument,
  buildStage, buildWorkbench, buildSigns, buildPitAndJukebox, buildDog,
} from "./voxel.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z);

function lerpAngle(a, b, t) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

// A short synthesized "woof woof" so the site ships no audio asset for it.
function playBark(ctx) {
  if (!ctx || ctx.state !== "running") return;
  const t0 = ctx.currentTime;
  for (let k = 0; k < 2; k++) {
    const ts = t0 + k * 0.16;
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(420, ts);
    osc.frequency.exponentialRampToValueAtTime(150, ts + 0.12);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass"; bp.frequency.value = 900; bp.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ts);
    gain.gain.exponentialRampToValueAtTime(0.16, ts + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ts + 0.14);
    osc.connect(bp); bp.connect(gain); gain.connect(ctx.destination);
    osc.start(ts); osc.stop(ts + 0.16);
  }
}

// Gradient sky dome.
function makeSky() {
  const geo = new THREE.SphereGeometry(220, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color(0x3a7bd5) },
      bottom: { value: new THREE.Color(0xbfe3ff) },
    },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vPos;
      uniform vec3 top; uniform vec3 bottom;
      void main() {
        float h = normalize(vPos).y * 0.5 + 0.5;
        gl_FragColor = vec4(mix(bottom, top, clamp(h, 0.0, 1.0)), 1.0);
      }`,
  });
  return new THREE.Mesh(geo, mat);
}

export function initWorld(canvas, opts = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: !!opts.preserveDrawingBuffer, // only needed for static screenshots
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xbfe3ff, 55, 170);
  scene.add(makeSky());

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400);
  camera.position.set(0, 7, 8);
  camera.lookAt(0, 4, -18);

  // ---- lighting ----
  scene.add(new THREE.HemisphereLight(0xbfe3ff, 0x5a4a3a, 0.85));
  const sun = new THREE.DirectionalLight(0xfff2d6, 1.25);
  sun.position.set(28, 46, 22);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 160;
  sun.shadow.camera.left = -45;
  sun.shadow.camera.right = 45;
  sun.shadow.camera.top = 55;
  sun.shadow.camera.bottom = -25;
  sun.shadow.bias = -0.0006;
  scene.add(sun);
  scene.add(sun.target);

  // ---- terrain ----
  const ground = buildGround();
  scene.add(ground.mesh);
  const surfaceY = ground.surfaceY;

  const updatables = [];

  // clouds
  const clouds = buildClouds();
  scene.add(clouds);
  updatables.push(clouds.userData.update);

  // scattered trees (kept clear of structures and the pit)
  const treeSpots = [
    [8, 6], [-9, 4], [12, -3], [-12, -2], [6, -22], [-6, -24], [20, -8], [-20, -10],
  ];
  treeSpots.forEach(([x, z], i) => {
    scene.add(buildTree(x, surfaceY(x, z) - 0.5, z, 0.9 + (i % 3) * 0.12));
  });

  // ---- the five areas ----
  // CENTER — monument
  const cMon = buildMonument();
  const cy = surfaceY(0, -18);
  cMon.position.set(0, cy, -18);
  scene.add(cMon);
  updatables.push(cMon.userData.update);

  // UP — floating island + speaker
  const stage = buildStage();
  stage.position.set(0, 15, -13);
  scene.add(stage);
  updatables.push(stage.userData.update);

  // LEFT — workbench + builder
  const bench = buildWorkbench();
  const ly = surfaceY(-15, -14);
  bench.position.set(-15, ly, -14);
  bench.rotation.y = 0.6;
  scene.add(bench);
  updatables.push(bench.userData.update);

  // RIGHT — signposts grove
  const signs = buildSigns();
  const ry = surfaceY(15, -14);
  signs.position.set(15, ry, -14);
  signs.rotation.y = -0.6;
  scene.add(signs);
  // extra trees framing the grove
  scene.add(buildTree(18, surfaceY(18, -16) - 0.5, -16, 0.8));
  scene.add(buildTree(13, surfaceY(13, -11) - 0.5, -11, 0.7));

  // DOWN — sunken jukebox
  const juke = buildPitAndJukebox();
  scene.add(juke);
  updatables.push(juke.userData.update);

  // ---- the dog ----
  const dog = buildDog();
  scene.add(dog);
  // ground spot the dog trots to for each focused area
  const dogTargets = {
    center: V(2, 0, -3.5),    // up close in the foreground
    up:     V(0, 0, -6.5),
    left:   V(-12, 0, -9.5),  // in front of the workbench, in frame
    right:  V(12, 0, -9.5),
    down:   V(2.5, 0, -3.5),
  };
  Object.values(dogTargets).forEach((p) => (p.y = surfaceY(p.x, p.z)));
  const dogPos = dogTargets.center.clone();
  let dogHeading = 0;
  let nextBark = 5;     // seconds; first possible bark
  let barkUntil = 0;
  let audioCtx = null;
  dog.position.copy(dogPos);

  function updateDog(t, dt, activeArea, idle) {
    const target = dogTargets[activeArea] || dogTargets.center;
    const dx = target.x - dogPos.x;
    const dz = target.z - dogPos.z;
    const dist = Math.hypot(dx, dz);
    const moving = dist > 0.35;

    let desiredHeading = dogHeading;
    if (moving) {
      const step = Math.min(dist, 6 * dt); // ~6 units/sec trot
      dogPos.x += (dx / dist) * step;
      dogPos.z += (dz / dist) * step;
      desiredHeading = Math.atan2(dx, dz);
    } else {
      // arrived — face the viewer (camera) while it waits
      desiredHeading = Math.atan2(camera.position.x - dogPos.x, camera.position.z - dogPos.z);
    }
    dogPos.y = surfaceY(dogPos.x, dogPos.z);
    dogHeading = lerpAngle(dogHeading, desiredHeading, Math.min(1, dt * 6));

    const sitting = !moving && idle;

    // barking
    if (t > nextBark) {
      barkUntil = t + 0.45;
      playBark(audioCtx);
      nextBark = t + 6 + Math.random() * 9;
    }
    const barking = t < barkUntil;

    dog.position.set(dogPos.x, dogPos.y, dogPos.z);
    dog.userData.update(t, Math.min(dt, 0.05), { moving, sitting, barking, heading: dogHeading });
  }

  // The dog's bark needs an AudioContext; browsers only allow it after a
  // user gesture, so the page resumes it on first interaction.
  function resumeAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  // ---- camera viewpoints per area ----
  // CENTER is a wide establishing shot; pushing the mouse toward an area flies
  // the camera in close so the avatar / banner there becomes the focus.
  const areas = {
    center: { camPos: V(0, 7, 9),       lookAt: V(0, cy + 3, -16),       anchor: V(0, cy + 2.6, -16) },
    up:     { camPos: V(0, 16.6, -3.2), lookAt: V(0, 16.6, -13),         anchor: V(0, 18.2, -13) },
    left:   { camPos: V(-9.5, ly + 3, -7), lookAt: V(-15, ly + 1.8, -13.6), anchor: V(-15, ly + 3.2, -13.6) },
    right:  { camPos: V(9.5, ry + 3, -7),  lookAt: V(15, ry + 1.8, -13.6),  anchor: V(15, ry + 3.4, -13.6) },
    down:   { camPos: V(0, 5, -2),      lookAt: V(0, -1.8, -9),          anchor: V(0, 0.6, -9) },
  };

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", resize);

  function tick(t) {
    for (const fn of updatables) fn(t);
  }
  function render() {
    renderer.render(scene, camera);
  }

  return {
    scene, camera, renderer, areas, tick, render, resize,
    updateDog, resumeAudio,
    setJukeboxPlaying: (on) => juke.userData.setPlaying(on),
  };
}
