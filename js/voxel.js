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

  // the speaker
  const avatar = buildAvatar({ shirt: "#ff9800", pants: "#39424f", mode: "wave" });
  avatar.position.set(0, 1.5, 0);
  avatar.scale.setScalar(1.25);
  g.add(avatar);
  g.userData.avatar = avatar;
  g.userData.update = (t) => avatar.userData.update(t);
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

  const avatar = buildAvatar({ skin: "#c68642", shirt: "#00bcd4", pants: "#2f3b2f", mode: "mine" });
  avatar.position.set(-0.2, 0, 1.5);
  avatar.rotation.y = 0.1; // faces the camera that flies in from the front-right
  avatar.scale.setScalar(1.25);
  g.add(avatar);
  g.userData.avatar = avatar;
  g.userData.update = (t) => avatar.userData.update(t);
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
// DOWN — the jukebox at the bottom of the sunken pit.
// ---------------------------------------------------------------------------

export function buildPitAndJukebox() {
  const g = new THREE.Group();
  const cobble = mat(tex.cobble);
  const stone = mat(tex.stone);

  // line the pit shaft
  for (let x = -PIT.r; x <= PIT.r; x++) {
    for (let z = -PIT.r; z <= PIT.r; z++) {
      const wx = PIT.cx + x, wz = PIT.cz + z;
      const dist = Math.hypot(x, z);
      if (dist > PIT.r) continue;
      // floor
      g.add(cube(1, cobble, [wx, PIT.floor, wz]));
      // walls (ring)
      if (dist > PIT.r - 1) {
        for (let y = PIT.floor + 1; y <= 0; y++) g.add(cube(1, stone, [wx, y, wz]));
      }
    }
  }

  // jukebox + note blocks on the floor
  const jbY = PIT.floor + 1;
  const jukeMat = [
    mat(tex.plank), mat(tex.plank),
    mat(tex.noteBlock), mat(tex.plank),
    mat(tex.plank), mat(tex.plank),
  ];
  const juke = cube(1.2, jukeMat, [PIT.cx, jbY, PIT.cz]);
  g.add(juke);

  const noteMat = mat(tex.noteBlock);
  const around = [[-2, 0], [2, 0], [0, -2], [0, 2]];
  around.forEach(([dx, dz]) => g.add(cube(0.9, noteMat, [PIT.cx + dx, jbY - 0.05, PIT.cz + dz])));

  // floating music-note particles, animated; visibility toggled while playing
  const notes = new THREE.Group();
  const noteGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
  const noteMatGlow = new THREE.MeshLambertMaterial({ color: 0xd8c0ff, emissive: 0x9c6cff, emissiveIntensity: 0.8 });
  const noteList = [];
  for (let i = 0; i < 10; i++) {
    const n = new THREE.Mesh(noteGeo, noteMatGlow);
    n.userData.phase = Math.random() * Math.PI * 2;
    n.userData.x = PIT.cx + (Math.random() - 0.5) * 2;
    n.userData.z = PIT.cz + (Math.random() - 0.5) * 2;
    notes.add(n);
    noteList.push(n);
  }
  notes.visible = false;
  g.add(notes);

  g.userData.notes = notes;
  g.userData.update = (t) => {
    if (!notes.visible) return;
    noteList.forEach((n) => {
      const p = (t + n.userData.phase) % 3;
      n.position.set(
        n.userData.x + Math.sin((t + n.userData.phase) * 2) * 0.3,
        jbY + 0.6 + p,
        n.userData.z
      );
      n.material.opacity = 1 - p / 3;
      n.rotation.y = t * 2 + n.userData.phase;
      n.scale.setScalar(1 - p / 6);
    });
  };
  g.userData.setPlaying = (on) => { notes.visible = on; };
  return g;
}

export { ISLAND_R, PIT };
