import * as THREE from "three";
import { tex, faceTexture } from "./textures.js";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const matCache = new Map();
const BOX = new THREE.BoxGeometry(1, 1, 1);

// Lambert material from a texture function (cheap, flat, good for voxels).
function mat(texFn, opts = {}) {
  const key = texFn.name + JSON.stringify(opts);
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshLambertMaterial({
    map: texFn(),
    emissive: opts.emissive ? new THREE.Color(opts.emissive) : 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
  });
  if (opts.emissive) m.emissiveMap = texFn();
  matCache.set(key, m);
  return m;
}

// A solid colour lambert material (for avatar clothes etc.).
function flat(color) {
  const key = "flat" + color;
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshLambertMaterial({ color });
  matCache.set(key, m);
  return m;
}

// Single-texture cube.
function cube(size, material, pos) {
  const m = new THREE.Mesh(BOX, material);
  m.scale.setScalar(size);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Arbitrary-dimension box with one material (or material array for faces).
function box(w, h, d, material, pos) {
  const m = new THREE.Mesh(BOX, material);
  m.scale.set(w, h, d);
  if (pos) m.position.set(pos[0], pos[1], pos[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// BoxGeometry face order: [px, nx, py(top), ny(bottom), pz(front), nz]
function grassBlockMaterials() {
  return [
    mat(tex.grassSide), mat(tex.grassSide),
    mat(tex.grassTop), mat(tex.dirt),
    mat(tex.grassSide), mat(tex.grassSide),
  ];
}

// ---------------------------------------------------------------------------
// Terrain — an island of grass blocks built as a single InstancedMesh.
// ---------------------------------------------------------------------------

const ISLAND_R = 26;

function heightAt(x, z) {
  const n =
    Math.sin(x * 0.15) +
    Math.sin(z * 0.13 + 1.7) +
    Math.sin((x + z) * 0.09) * 0.6;
  if (n > 1.25) return 2;
  if (n > 0.25) return 1;
  return 0;
}

// Region carved out for the sunken jukebox area.
const PIT = { cx: 0, cz: -9, r: 5, floor: -3 };
function inPit(x, z) {
  return Math.hypot(x - PIT.cx, z - PIT.cz) <= PIT.r;
}

export function buildGround() {
  const positions = [];
  for (let x = -ISLAND_R; x <= ISLAND_R; x++) {
    for (let z = -ISLAND_R; z <= ISLAND_R; z++) {
      if (Math.hypot(x, z) > ISLAND_R) continue;
      if (inPit(x, z)) continue;
      const h = heightAt(x, z);
      // fill the column so there are no see-through gaps between heights
      for (let y = 0; y <= h; y++) positions.push([x, y, z]);
    }
  }

  const mesh = new THREE.InstancedMesh(BOX, grassBlockMaterials(), positions.length);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  const dummy = new THREE.Object3D();
  positions.forEach((p, i) => {
    dummy.position.set(p[0], p[1], p[2]);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;

  // surfaceY(x,z): the y to stand an object on at world x,z
  const surfaceY = (x, z) => heightAt(Math.round(x), Math.round(z)) + 0.5;
  return { mesh, surfaceY, ISLAND_R };
}

// ---------------------------------------------------------------------------
// Scenery
// ---------------------------------------------------------------------------

export function buildTree(x, baseY, z, scale = 1) {
  const g = new THREE.Group();
  const logMat = [
    mat(tex.logSide), mat(tex.logSide),
    mat(tex.logTop), mat(tex.logTop),
    mat(tex.logSide), mat(tex.logSide),
  ];
  const trunkH = 4;
  for (let i = 0; i < trunkH; i++) g.add(cube(1, logMat, [0, i + 0.5, 0]));
  const leaf = mat(tex.leaves);
  // simple blocky canopy
  const canopy = [
    [-1, 4, 0], [1, 4, 0], [0, 4, -1], [0, 4, 1], [0, 4, 0],
    [-1, 4, -1], [1, 4, 1], [-1, 4, 1], [1, 4, -1],
    [0, 5, 0], [-1, 5, 0], [1, 5, 0], [0, 5, -1], [0, 5, 1],
    [0, 6, 0],
  ];
  canopy.forEach((p) => g.add(cube(1, leaf, p)));
  g.position.set(x, baseY, z);
  g.scale.setScalar(scale);
  return g;
}

export function buildClouds() {
  const g = new THREE.Group();
  const cloudMat = new THREE.MeshLambertMaterial({
    color: 0xffffff, transparent: true, opacity: 0.85,
  });
  const make = (cx, cy, cz) => {
    const c = new THREE.Group();
    const shape = [
      [0, 0, 0], [1, 0, 0], [2, 0, 0], [1, 0, 1], [2, 0, 1],
      [0, 0, 1], [1, 0, -1], [3, 0, 0],
    ];
    shape.forEach((p) => {
      const b = box(1, 0.8, 1, cloudMat, p);
      b.castShadow = false;
      c.add(b);
    });
    c.position.set(cx, cy, cz);
    return c;
  };
  const clouds = [
    make(-14, 20, -10), make(10, 23, -18), make(-6, 26, 6),
    make(18, 21, 4), make(0, 28, -28),
  ];
  clouds.forEach((c) => g.add(c));
  g.userData.update = (t) => {
    clouds.forEach((c, i) => {
      c.position.x += 0.004 * (i % 2 ? 1 : 0.7);
      if (c.position.x > 34) c.position.x = -34;
    });
  };
  return g;
}

// ---------------------------------------------------------------------------
// CENTER — a beacon monument with a spinning glow crystal.
// ---------------------------------------------------------------------------

export function buildMonument() {
  const g = new THREE.Group();
  const ob = mat(tex.obsidian);
  // stepped obsidian base
  for (let i = 0; i < 9; i++) {
    const r = 1 - 0; // 3x3
    g.add(cube(1, ob, [(i % 3) - 1, 0.5, Math.floor(i / 3) - 1]));
  }
  g.add(box(1, 1, 1, mat(tex.glow, { emissive: "#ffce54", emissiveIntensity: 1.4 }), [0, 1.5, 0]));
  // floating crystal
  const crystalGeo = new THREE.OctahedronGeometry(0.7);
  const crystal = new THREE.Mesh(
    crystalGeo,
    new THREE.MeshStandardMaterial({
      color: 0x76ff03, emissive: 0x4caf00, emissiveIntensity: 0.9,
      metalness: 0.2, roughness: 0.2, flatShading: true,
    })
  );
  crystal.position.set(0, 3.4, 0);
  crystal.castShadow = true;
  g.add(crystal);

  const beam = new THREE.PointLight(0x9dff5a, 1.2, 14, 2);
  beam.position.set(0, 3.4, 0);
  g.add(beam);

  g.userData.update = (t) => {
    crystal.rotation.y = t * 0.8;
    crystal.position.y = 3.4 + Math.sin(t * 1.5) * 0.18;
    beam.intensity = 1.0 + Math.sin(t * 3) * 0.3;
  };
  return g;
}

// ---------------------------------------------------------------------------
// Avatars — blocky humanoids built from boxes, with idle + gesture animation.
// ---------------------------------------------------------------------------

// A limb that swings from its top (shoulder/hip).
function limb(w, h, d, material) {
  const pivot = new THREE.Group();
  const m = box(w, h, d, material, [0, -h / 2, 0]);
  pivot.add(m);
  return pivot;
}

export function buildAvatar({ skin = "#e0ac69", shirt = "#ff9800", pants = "#3a4a6b", mode = "wave" } = {}) {
  const g = new THREE.Group();
  const skinMat = flat(skin);
  const shirtMat = flat(shirt);
  const pantsMat = flat(pants);

  // head with a face on the front (+z = index 4)
  const headMaterial = new THREE.MeshLambertMaterial({ map: faceTexture(skin) });
  const headMatArr = [skinMat, skinMat, skinMat, skinMat, headMaterial, skinMat];

  const legY = 0.75;        // leg length
  const bodyH = 0.9;
  const headS = 0.8;

  const hipY = legY;        // top of legs
  const shoulderY = legY + bodyH; // top of body

  // legs
  const lLeg = limb(0.28, legY, 0.28, pantsMat); lLeg.position.set(-0.16, hipY, 0);
  const rLeg = limb(0.28, legY, 0.28, pantsMat); rLeg.position.set(0.16, hipY, 0);
  // body
  const body = box(0.62, bodyH, 0.34, shirtMat, [0, legY + bodyH / 2, 0]);
  // arms
  const lArm = limb(0.24, 0.85, 0.24, shirtMat); lArm.position.set(-0.43, shoulderY, 0);
  const rArm = limb(0.24, 0.85, 0.24, shirtMat); rArm.position.set(0.43, shoulderY, 0);
  // head
  const head = box(headS, headS, headS, headMatArr, [0, shoulderY + headS / 2, 0]);

  g.add(lLeg, rLeg, body, lArm, rArm, head);

  // builder holds a pickaxe in the right hand
  let tool = null;
  if (mode === "mine") {
    tool = new THREE.Group();
    tool.add(box(0.1, 0.9, 0.1, flat("#8a5a2b"), [0, -0.45, 0])); // handle
    tool.add(box(0.6, 0.14, 0.14, flat("#9e9e9e"), [0, -0.9, 0])); // head
    tool.position.set(0, -0.85, 0.05);
    rArm.add(tool);
  }

  g.castShadow = true;
  const baseY = g.position.y;

  let waveT = 0;
  g.userData.update = (t) => {
    g.position.y = baseY + Math.sin(t * 2) * 0.03;
    head.rotation.y = Math.sin(t * 0.6) * 0.25;

    // gentle idle leg/arm sway
    lLeg.rotation.x = Math.sin(t * 1.4) * 0.08;
    rLeg.rotation.x = -Math.sin(t * 1.4) * 0.08;
    lArm.rotation.x = -Math.sin(t * 1.4) * 0.1;

    if (mode === "wave") {
      // periodic friendly wave with the right arm
      const cycle = t % 6;
      if (cycle < 2) {
        rArm.rotation.z = -2.4;
        rArm.rotation.x = Math.sin(t * 12) * 0.3;
      } else {
        rArm.rotation.z = THREE.MathUtils.lerp(rArm.rotation.z, 0, 0.1);
        rArm.rotation.x = THREE.MathUtils.lerp(rArm.rotation.x, Math.sin(t * 1.4) * 0.1, 0.1);
      }
    } else if (mode === "mine") {
      // chopping motion
      rArm.rotation.x = -0.6 + Math.sin(t * 6) * 0.6;
    }
  };

  return g;
}

// ---------------------------------------------------------------------------
// A Minecraft-style trading villager — big brow-nose, robe + apron, hands
// clasped in front. Feet rest at y = 0; expose userData.update(t) like the
// avatar so the stage/workbench can drive it the same way.
// ---------------------------------------------------------------------------

export function buildVillager({ robe = "#6b4a2b", apron = "#c9b08a", mode = "idle" } = {}) {
  const g = new THREE.Group();
  const skin = flat("#b9946a");
  const noseSkin = flat("#a9855d");
  const robeMat = flat(robe);

  // feet peeking under the robe
  g.add(box(0.22, 0.3, 0.26, flat("#3a3a3a"), [-0.16, 0.15, 0]));
  g.add(box(0.22, 0.3, 0.26, flat("#3a3a3a"), [0.16, 0.15, 0]));
  // robe: flared skirt + torso + dark collar
  g.add(box(0.8, 0.78, 0.54, robeMat, [0, 0.64, 0]));
  g.add(box(0.66, 0.7, 0.42, robeMat, [0, 1.33, 0]));
  g.add(box(0.7, 0.12, 0.44, flat("#4a3320"), [0, 1.62, 0]));
  // trader apron — lighter front panel
  g.add(box(0.5, 1.0, 0.02, flat(apron), [0, 0.95, 0.28]));
  // arms down the sides, forearms + clasped hands in front
  g.add(box(0.17, 0.6, 0.32, robeMat, [-0.42, 1.35, 0]));
  g.add(box(0.17, 0.6, 0.32, robeMat, [0.42, 1.35, 0]));
  g.add(box(0.52, 0.2, 0.2, robeMat, [0, 1.14, 0.28]));
  g.add(box(0.26, 0.17, 0.16, skin, [0, 1.12, 0.4]));

  // head — big nose, heavy brow, small eyes either side
  const head = new THREE.Group();
  head.position.set(0, 2.0, 0);
  g.add(head);
  head.add(box(0.66, 0.66, 0.62, skin, [0, 0, 0]));
  head.add(box(0.17, 0.44, 0.36, noseSkin, [0, -0.02, 0.34])); // protruding nose
  head.add(box(0.52, 0.09, 0.04, flat("#5a4634"), [0, 0.16, 0.31])); // unibrow
  const eye = (x) => {
    head.add(box(0.14, 0.13, 0.04, flat("#f4f4f4"), [x, 0.02, 0.31]));
    head.add(box(0.07, 0.13, 0.05, flat("#6b4a8a"), [x, 0.02, 0.32])); // pupil
  };
  eye(-0.2); eye(0.2);

  g.castShadow = true;
  const baseY = g.position.y;
  g.userData.update = (t) => {
    g.position.y = baseY + Math.sin(t * 1.8) * 0.03;
    head.rotation.y = Math.sin(t * 0.5) * 0.28;
    head.rotation.x = Math.sin(t * 1.1) * 0.05;
    if (mode === "wave") {
      head.rotation.x += 0.06 + Math.sin(t * 2.2) * 0.05; // curious head bob
    } else if (mode === "mine") {
      g.rotation.x = Math.sin(t * 2.0) * 0.03; // small trading nod
    }
  };
  return g;
}

// ---------------------------------------------------------------------------
// The dog — a blocky companion that runs to the focused area, sits when idle,
// wags non-stop and barks now and then. Forward is +z; feet rest at y = 0.
// world.js drives its position/heading; this returns the animated model.
// ---------------------------------------------------------------------------

export function buildDog() {
  const g = new THREE.Group();
  const black = flat("#1c1c1c");
  const brown = flat("#6b4a2b");
  const darkBrown = flat("#3a2616");
  const tan = flat("#b5874f");   // poodle fluff accent (tail pompom)
  const white = flat("#f2f2f2");
  const nose = flat("#0a0a0a");

  const hipY = 0.44;

  // a leg = black upper + brown paw, hung from a hip pivot so it can swing
  function leg(x, z) {
    const p = new THREE.Group();
    p.position.set(x, hipY, z);
    p.add(box(0.16, 0.3, 0.16, black, [0, -0.15, 0]));
    p.add(box(0.2, 0.14, 0.22, brown, [0, -0.37, 0.02]));
    return p;
  }
  const fl = leg(-0.2, 0.34), fr = leg(0.2, 0.34);
  const bl = leg(-0.2, -0.34), br = leg(0.2, -0.34);
  g.add(fl, fr, bl, br);

  // body + white chest
  g.add(box(0.5, 0.42, 0.95, black, [0, 0.65, 0]));
  g.add(box(0.32, 0.34, 0.08, white, [0, 0.56, 0.46]));

  // ----- head ----- built as a GROUP, not a box() mesh: a box() mesh carries a
  // non-unit scale, and any child attached to it would inherit that scale and
  // shrink into the cube (which is why the face was invisible before).
  const head = new THREE.Group();
  head.position.set(0, 0.97, 0.54);
  g.add(head);
  head.add(box(0.5, 0.46, 0.44, black, [0, 0, 0]));
  const FRONT = 0.22;

  // tan muzzle so the snout + black nose stand out against the black head
  head.add(box(0.3, 0.24, 0.34, brown, [0, -0.11, 0.26]));
  head.add(box(0.18, 0.15, 0.13, nose, [0, -0.04, 0.45]));        // clear black nose
  head.add(box(0.12, 0.1, 0.06, flat("#e8868f"), [0, -0.2, 0.42])); // happy tongue
  // white blaze down the forehead so the face reads against the black coat
  head.add(box(0.1, 0.34, 0.04, white, [0, 0.07, FRONT + 0.01]));
  // pretty puppy eyes: big white sclera (frontmost) + amber iris + pupil + glint
  const eye = (x) => {
    head.add(box(0.2, 0.2, 0.12, white, [x, 0.11, FRONT - 0.01]));            // sclera, proud of the face
    head.add(box(0.13, 0.15, 0.06, flat("#3b82f6"), [x, 0.1, FRONT + 0.06])); // blue iris
    head.add(box(0.07, 0.09, 0.04, flat("#0a0a0a"), [x, 0.1, FRONT + 0.09])); // pupil
    head.add(box(0.04, 0.05, 0.03, white, [x + 0.04, 0.14, FRONT + 0.11]));   // bright glint
  };
  eye(-0.15); eye(0.15);
  // jaw drops open when barking
  const jaw = new THREE.Group();
  jaw.position.set(0, -0.17, 0.16);
  jaw.add(box(0.22, 0.05, 0.32, brown, [0, 0, 0.16]));
  head.add(jaw);
  // fluffy poodle topknot on top (black)
  head.add(box(0.48, 0.24, 0.46, black, [0, 0.32, 0]));

  // ----- shorter floppy ears (black with a dark-brown tip) -----
  function ear(side) {
    const p = new THREE.Group();
    p.position.set(side * 0.27, 0.16, 0.02);
    p.add(box(0.16, 0.3, 0.15, black, [0, -0.15, 0]));           // short floppy ear
    p.add(box(0.18, 0.14, 0.16, darkBrown, [0, -0.3, 0]));       // dark-brown tip
    p.rotation.z = side * 0.3;                                    // splay outward
    head.add(p);
    return p;
  }
  const earL = ear(-1), earR = ear(1);

  // ----- tail with a poodle pompom -----
  const tail = new THREE.Group();
  tail.position.set(0, 0.76, -0.46);
  tail.rotation.x = -1.0;
  tail.add(box(0.1, 0.1, 0.3, black, [0, 0, -0.15]));
  tail.add(box(0.24, 0.24, 0.24, tan, [0, 0, -0.34]));           // pompom
  g.add(tail);

  // ----- rocket jetpack (hidden until the dog takes flight in the sky scene) -----
  const rocket = new THREE.Group();
  rocket.position.set(0, 0.92, -0.18);
  rocket.add(box(0.3, 0.42, 0.3, flat("#c0392b"), [0, 0, -0.12]));    // red pack
  rocket.add(box(0.14, 0.14, 0.12, flat("#cfcfcf"), [0, 0.2, -0.12])); // top fin
  rocket.add(box(0.18, 0.16, 0.12, flat("#9e9e9e"), [0, -0.16, -0.28])); // nozzle
  const flame = new THREE.Group();
  flame.position.set(0, -0.16, -0.42);
  flame.add(box(0.18, 0.18, 0.34, flat("#ff7043"), [0, 0, -0.17]));
  flame.add(box(0.1, 0.1, 0.24, flat("#ffd54a"), [0, 0, -0.13]));
  rocket.add(flame);
  rocket.visible = false;
  g.add(rocket);

  g.scale.setScalar(1.05);

  let sitAmt = 0;
  g.userData.update = (t, dt, state) => {
    // FLYING: jetpack on, legs splayed, ears blown back, flame flickering
    if (state.flying) {
      rocket.visible = true;
      g.rotation.y = state.heading;
      g.rotation.x = state.pitch || 0;
      fl.rotation.x = -0.7; fr.rotation.x = -0.7;
      bl.rotation.x = 0.8; br.rotation.x = 0.8;
      tail.rotation.y = Math.sin(t * 22) * 0.3;
      earL.rotation.x = -0.7; earR.rotation.x = -0.7;
      flame.scale.set(0.85 + Math.sin(t * 44) * 0.15, 0.85 + Math.cos(t * 40) * 0.15, 0.7 + Math.abs(Math.sin(t * 30)) * 0.9);
      const bkf = state.barking ? 1 : 0;
      head.rotation.x = Math.sin(t * 3) * 0.05 - 0.2 * bkf;
      jaw.rotation.x = 0.6 * bkf;
      g.position.y += Math.abs(Math.sin(t * 22)) * 0.05 * bkf;
      return;
    }
    rocket.visible = false;

    const d = Math.min(1, dt * 10);
    sitAmt += ((state.sitting ? 1 : 0) - sitAmt) * d;

    g.rotation.y = state.heading;
    g.rotation.x = -0.3 * sitAmt; // lean back when sitting (nose up)

    // running gait (diagonal pairs), damped to a gentle idle sway when stopped
    const amp = state.moving ? 0.7 : 0.05;
    const ph = t * 11;
    fl.rotation.x = Math.sin(ph) * amp;
    br.rotation.x = Math.sin(ph) * amp;
    fr.rotation.x = -Math.sin(ph) * amp;
    bl.rotation.x = -Math.sin(ph) * amp;
    // fold the hind legs and straighten the front when sitting
    bl.rotation.x = THREE.MathUtils.lerp(bl.rotation.x, 1.3, sitAmt);
    br.rotation.x = THREE.MathUtils.lerp(br.rotation.x, 1.3, sitAmt);
    fl.rotation.x = THREE.MathUtils.lerp(fl.rotation.x, 0, sitAmt);
    fr.rotation.x = THREE.MathUtils.lerp(fr.rotation.x, 0, sitAmt);

    // always-happy tail wag, faster on the move
    tail.rotation.y = Math.sin(t * (state.moving ? 16 : 10)) * 0.55;

    // bark: open jaw, tilt head up, perk the ears up, little hop
    const bk = state.barking ? 1 : 0;
    head.rotation.x = -0.25 * bk + Math.sin(t * 2) * 0.04;
    jaw.rotation.x = 0.6 * bk;
    // ears flop a little while running, lift forward on a bark
    const flop = state.moving ? Math.sin(t * 16) * 0.18 : 0;
    earL.rotation.x = 0.1 + flop - 0.5 * bk;
    earR.rotation.x = 0.1 + flop - 0.5 * bk;
    g.position.y += Math.abs(Math.sin(t * 22)) * 0.07 * bk;
  };

  return g;
}

// ---------------------------------------------------------------------------
// UP — a floating island with a stage + speaker avatar.
// ---------------------------------------------------------------------------

export function buildStage() {
  const g = new THREE.Group();
  const plank = mat(tex.plank);
  const stone = mat(tex.stone);

  // floating island chunk (grass on top, stone underside)
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      if (Math.hypot(x, z) > 3.4) continue;
      g.add(cube(1, grassBlockMaterials(), [x, 0, z]));
      g.add(cube(1, stone, [x, -1, z]));
      if (Math.hypot(x, z) < 1.6) g.add(cube(1, stone, [x, -2, z]));
    }
  }
  // raised plank stage
  for (let x = -1; x <= 1; x++)
    for (let z = -1; z <= 1; z++) g.add(cube(1, plank, [x, 1, z]));

  // speakers
  const spk = mat(tex.speaker);
  g.add(box(0.9, 1.6, 0.9, spk, [-2, 1.3, 0]));
  g.add(box(0.9, 1.6, 0.9, spk, [2, 1.3, 0]));

  // mic stand
  g.add(box(0.08, 1.2, 0.08, flat("#222"), [0, 2.1, 0.7]));
  g.add(cube(0.22, flat("#111"), [0, 2.75, 0.7]));

  // a jukebox on the island, puffing music notes over the show
  const jukeMat = [
    mat(tex.plank), mat(tex.plank),
    mat(tex.noteBlock), mat(tex.plank),
    mat(tex.plank), mat(tex.plank),
  ];
  const jbX = 1.9, jbY = 0.95, jbZ = 1.9;
  g.add(cube(0.9, jukeMat, [jbX, jbY, jbZ]));
  const notes = new THREE.Group();
  const noteGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
  const noteList = [];
  for (let i = 0; i < 8; i++) {
    const n = new THREE.Mesh(
      noteGeo,
      new THREE.MeshLambertMaterial({ color: 0xd8c0ff, emissive: 0x9c6cff, emissiveIntensity: 0.8, transparent: true })
    );
    n.userData.phase = Math.random() * Math.PI * 2;
    notes.add(n);
    noteList.push(n);
  }
  g.add(notes);

  // the speaker — a trading villager at the mic
  const villager = buildVillager({ robe: "#7a4a2b", apron: "#d8c49a", mode: "wave" });
  villager.position.set(0, 1.5, 0);
  villager.scale.setScalar(1.25);
  g.add(villager);
  g.userData.avatar = villager;
  g.userData.update = (t) => {
    villager.userData.update(t);
    noteList.forEach((n) => {
      const p = (t * 0.6 + n.userData.phase) % 2.4;
      n.position.set(
        jbX + Math.sin((t + n.userData.phase) * 1.8) * 0.3,
        jbY + 0.5 + p,
        jbZ + Math.cos((t + n.userData.phase) * 1.3) * 0.2
      );
      n.material.opacity = Math.max(0, 1 - p / 2.4);
      n.rotation.y = t * 2 + n.userData.phase;
      n.scale.setScalar(1 - p / 6);
    });
  };
  return g;
}

// ---------------------------------------------------------------------------
// LEFT — a workbench with the builder avatar.
// ---------------------------------------------------------------------------

export function buildWorkbench() {
  const g = new THREE.Group();
  const plank = mat(tex.plank);
  const logMat = [
    mat(tex.logSide), mat(tex.logSide),
    mat(tex.plank), mat(tex.plank),
    mat(tex.logSide), mat(tex.logSide),
  ];
  // crafting table
  g.add(cube(1, logMat, [0, 0.5, 0]));
  // an anvil-ish block + "laptop"
  g.add(box(0.9, 0.5, 0.6, mat(tex.stone), [1.4, 0.25, 0.3]));
  const laptopBase = box(0.7, 0.06, 0.5, flat("#3a3a3a"), [0, 1.03, 0]);
  const laptopScreen = box(0.7, 0.5, 0.06, flat("#1b2a3a"), [0, 1.28, -0.22]);
  const glow = box(0.6, 0.4, 0.02, new THREE.MeshLambertMaterial({ color: 0x123, emissive: 0x00bcd4, emissiveIntensity: 0.8 }), [0, 1.28, -0.18]);
  g.add(laptopBase, laptopScreen, glow);

  // stack of blocks as "builds"
  g.add(cube(0.7, mat(tex.cobble), [-1.4, 0.35, 0.2]));
  g.add(cube(0.7, mat(tex.plank), [-1.4, 1.05, 0.2]));

  const villager = buildVillager({ robe: "#4f5b34", apron: "#b9a06a", mode: "mine" });
  villager.position.set(-0.2, 0, 1.5);
  villager.rotation.y = 0.1; // faces the camera that flies in from the front-right
  villager.scale.setScalar(1.25);
  g.add(villager);
  g.userData.avatar = villager;
  g.userData.update = (t) => villager.userData.update(t);
  return g;
}

// ---------------------------------------------------------------------------
// RIGHT — a grove of signposts.
// ---------------------------------------------------------------------------

export function buildSigns() {
  const g = new THREE.Group();
  const post = flat("#6b4a2b");
  const board = [
    mat(tex.plank), mat(tex.plank), mat(tex.plank),
    mat(tex.plank), mat(tex.plank), mat(tex.plank),
  ];
  const makeSign = (x, z, rot) => {
    const s = new THREE.Group();
    s.add(box(0.14, 1.4, 0.14, post, [0, 0.7, 0]));
    s.add(box(1.4, 0.8, 0.12, board, [0, 1.5, 0]));
    s.position.set(x, 0, z);
    s.rotation.y = rot;
    return s;
  };
  g.add(makeSign(0, 0, -0.2));
  g.add(makeSign(-1.8, 1.2, 0.3));
  g.add(makeSign(1.6, 1.0, -0.5));
  return g;
}

// ---------------------------------------------------------------------------
// DOWN — a sunken reading nook: a tall bookshelf wall that faces the camera,
// side shelves, and an enchanting table raised to the rim with a floating open
// book and rising arcane runes.
// ---------------------------------------------------------------------------

export function buildPitAndLibrary() {
  const g = new THREE.Group();
  const cobble = mat(tex.cobble);
  const stone = mat(tex.stone);
  const plankTop = mat(tex.plank);
  const shelfMat = [
    mat(tex.bookshelf), mat(tex.bookshelf),
    plankTop, plankTop,
    mat(tex.bookshelf), mat(tex.bookshelf),
  ];

  // pit floor
  for (let x = -PIT.r; x <= PIT.r; x++) {
    for (let z = -PIT.r; z <= PIT.r; z++) {
      if (Math.hypot(x, z) > PIT.r) continue;
      g.add(cube(1, cobble, [PIT.cx + x, PIT.floor, PIT.cz + z]));
    }
  }

  // outer ring wall: two courses of bookshelves capped by a stone lip
  for (let x = -PIT.r; x <= PIT.r; x++) {
    for (let z = -PIT.r; z <= PIT.r; z++) {
      const d = Math.hypot(x, z);
      if (d > PIT.r || d <= PIT.r - 1) continue;
      const wx = PIT.cx + x, wz = PIT.cz + z;
      g.add(cube(1, shelfMat, [wx, PIT.floor + 1, wz]));
      g.add(cube(1, shelfMat, [wx, PIT.floor + 2, wz]));
      g.add(cube(1, stone, [wx, 0, wz]));
    }
  }

  // tall bookshelf back wall (faces the camera, rises above the rim) + returns
  const backZ = PIT.cz - 3;
  for (let x = -3; x <= 3; x++)
    for (let y = PIT.floor + 1; y <= 2; y++) g.add(cube(1, shelfMat, [PIT.cx + x, y, backZ]));
  for (let z = backZ + 1; z <= PIT.cz - 1; z++)
    for (let y = PIT.floor + 1; y <= 1; y++) {
      g.add(cube(1, shelfMat, [PIT.cx - 3, y, z]));
      g.add(cube(1, shelfMat, [PIT.cx + 3, y, z]));
    }
  // warm glowstone lanterns on the wall's top corners
  const glowMat = mat(tex.glow, { emissive: "#ffce54", emissiveIntensity: 1.3 });
  g.add(cube(1, glowMat, [PIT.cx - 3, 2, backZ]));
  g.add(cube(1, glowMat, [PIT.cx + 3, 2, backZ]));

  // ---- enchanting table on a raised dais, in front of the wall ----
  const tableZ = PIT.cz - 0.5;
  const tableY = 0; // lifted to the rim so it reads from above
  g.add(cube(1, stone, [PIT.cx, PIT.floor + 1, tableZ]));
  g.add(cube(1, stone, [PIT.cx, PIT.floor + 2, tableZ]));
  const tableMat = [
    mat(tex.obsidian), mat(tex.obsidian),
    mat(tex.enchantTop), mat(tex.obsidian),
    mat(tex.obsidian), mat(tex.obsidian),
  ];
  g.add(box(1.02, 0.8, 1.02, tableMat, [PIT.cx, tableY, tableZ]));

  // warm reading light + cool arcane glow
  const warm = new THREE.PointLight(0xffd9a0, 1.0, 16, 2);
  warm.position.set(PIT.cx, tableY + 3, tableZ + 1.5);
  g.add(warm);
  const arcane = new THREE.PointLight(0x9c6cff, 0.9, 7, 2);
  arcane.position.set(PIT.cx, tableY + 1.4, tableZ);
  g.add(arcane);

  // ---- floating open book above the table ----
  const book = new THREE.Group();
  const bookBaseY = tableY + 1.05;
  book.position.set(PIT.cx, bookBaseY, tableZ);
  book.add(box(0.12, 0.32, 0.5, flat("#5a3f8a"), [0, 0, 0])); // spine
  const pageMat = flat("#f4efe0");
  const coverMat = flat("#7a4aa0");
  const makeLeaf = (side) => {
    const p = new THREE.Group();
    p.add(box(0.44, 0.05, 0.5, coverMat, [side * 0.23, -0.03, 0])); // cover
    p.add(box(0.4, 0.04, 0.46, pageMat, [side * 0.22, 0.01, 0]));    // pages
    p.rotation.z = side * 0.5; // open into a V
    return p;
  };
  const leafL = makeLeaf(-1), leafR = makeLeaf(1);
  book.add(leafL, leafR);
  g.add(book);

  // ---- rising rune particles ----
  const runes = new THREE.Group();
  const runeGeo = new THREE.BoxGeometry(0.14, 0.14, 0.02);
  const runeList = [];
  for (let i = 0; i < 12; i++) {
    const n = new THREE.Mesh(
      runeGeo,
      new THREE.MeshLambertMaterial({ color: 0xd8c0ff, emissive: 0x9c6cff, emissiveIntensity: 0.9, transparent: true })
    );
    n.userData.phase = Math.random() * Math.PI * 2;
    n.userData.x = PIT.cx + (Math.random() - 0.5) * 1.2;
    n.userData.z = tableZ + (Math.random() - 0.5) * 1.2;
    runes.add(n);
    runeList.push(n);
  }
  g.add(runes);

  g.userData.update = (t) => {
    book.position.y = bookBaseY + Math.sin(t * 1.4) * 0.06;
    book.rotation.y = Math.sin(t * 0.5) * 0.25;
    leafL.rotation.z = -0.5 + Math.sin(t * 1.2) * 0.06;
    leafR.rotation.z = 0.5 - Math.sin(t * 1.2) * 0.06;
    arcane.intensity = 0.75 + Math.sin(t * 2.5) * 0.25;
    runeList.forEach((n) => {
      const p = (t * 0.5 + n.userData.phase) % 2.2;
      n.position.set(
        n.userData.x + Math.sin((t + n.userData.phase) * 1.6) * 0.16,
        bookBaseY + 0.1 + p,
        n.userData.z
      );
      n.material.opacity = Math.max(0, 1 - p / 2.2);
      n.rotation.y = t * 1.5 + n.userData.phase;
      n.scale.setScalar(1 - p / 4.4);
    });
  };
  return g;
}

export { ISLAND_R, PIT };
