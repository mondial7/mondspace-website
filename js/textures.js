import * as THREE from "three";

// Everything here is drawn on a tiny canvas so the whole site ships with zero
// image assets. Textures are 16x16 (classic block resolution) and use nearest
// filtering to keep the crunchy, pixelated Minecraft look.

const SIZE = 16;
const cache = new Map();

function shade(hex, amt) {
  const c = new THREE.Color(hex);
  c.offsetHSL(0, 0, amt);
  return "#" + c.getHexString();
}

// Draw with a callback, memoize by key, return a ready CanvasTexture.
function make(key, draw) {
  if (cache.has(key)) return cache.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

// Speckle a base colour with random lighter/darker pixels for that noisy look.
function speckle(ctx, base, amount = 0.14, density = 0.5) {
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, SIZE, SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (Math.random() > density) continue;
      const a = (Math.random() - 0.5) * 2 * amount;
      ctx.fillStyle = shade(base, a);
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

export const tex = {
  grassTop: () => make("grassTop", (c) => speckle(c, "#5fa83a", 0.16, 0.6)),
  dirt: () => make("dirt", (c) => speckle(c, "#876045", 0.16, 0.6)),
  grassSide: () =>
    make("grassSide", (c) => {
      speckle(c, "#876045", 0.16, 0.6);
      // grassy top lip
      c.fillStyle = "#5fa83a";
      c.fillRect(0, 0, SIZE, 4);
      for (let x = 0; x < SIZE; x++) {
        if (Math.random() > 0.5) continue;
        c.fillStyle = shade("#5fa83a", (Math.random() - 0.5) * 0.2);
        c.fillRect(x, 3 + (Math.random() > 0.5 ? 1 : 0), 1, 1);
      }
    }),
  stone: () => make("stone", (c) => speckle(c, "#8b8b8b", 0.12, 0.55)),
  cobble: () =>
    make("cobble", (c) => {
      speckle(c, "#7c7c7c", 0.18, 0.7);
      c.fillStyle = "rgba(0,0,0,0.25)";
      [[0,0,7,7],[8,1,7,6],[1,8,6,7],[8,9,7,6]].forEach(([x,y,w,h]) => {
        c.strokeStyle = "rgba(0,0,0,0.3)";
        c.strokeRect(x + 0.5, y + 0.5, w, h);
      });
    }),
  plank: () =>
    make("plank", (c) => {
      speckle(c, "#a9763e", 0.1, 0.45);
      c.fillStyle = "rgba(60,35,15,0.5)";
      c.fillRect(0, 4, SIZE, 1);
      c.fillRect(0, 11, SIZE, 1);
      c.fillRect(8, 0, 1, 4);
      c.fillRect(4, 5, 1, 6);
      c.fillRect(12, 12, 1, 4);
    }),
  logSide: () =>
    make("logSide", (c) => {
      speckle(c, "#6b4a2b", 0.1, 0.4);
      c.fillStyle = "rgba(40,25,12,0.5)";
      for (let y = 0; y < SIZE; y += 3) c.fillRect(0, y, SIZE, 1);
    }),
  logTop: () =>
    make("logTop", (c) => {
      speckle(c, "#a9763e", 0.1, 0.4);
      c.strokeStyle = "rgba(80,50,25,0.6)";
      for (let r = 2; r < 8; r += 2) c.strokeRect(8 - r, 8 - r, r * 2, r * 2);
    }),
  leaves: () => make("leaves", (c) => speckle(c, "#3f7d2f", 0.22, 0.8)),
  glow: () =>
    make("glow", (c) => {
      const g = c.createRadialGradient(8, 8, 1, 8, 8, 9);
      g.addColorStop(0, "#fff7c0");
      g.addColorStop(0.5, "#ffd54a");
      g.addColorStop(1, "#ff9800");
      c.fillStyle = g;
      c.fillRect(0, 0, SIZE, SIZE);
    }),
  obsidian: () =>
    make("obsidian", (c) => {
      speckle(c, "#1c1730", 0.18, 0.6);
      c.fillStyle = "rgba(150,90,220,0.25)";
      for (let i = 0; i < 6; i++) c.fillRect((Math.random() * 16) | 0, (Math.random() * 16) | 0, 1, 1);
    }),
  sand: () => make("sand", (c) => speckle(c, "#d8c89a", 0.1, 0.5)),
  water: () =>
    make("water", (c) => {
      speckle(c, "#3a7bd5", 0.1, 0.4);
      c.fillStyle = "rgba(255,255,255,0.12)";
      for (let y = 2; y < 16; y += 5) c.fillRect(0, y, SIZE, 1);
    }),
  speaker: () =>
    make("speaker", (c) => {
      speckle(c, "#2a2a2a", 0.1, 0.4);
      c.fillStyle = "#111";
      c.beginPath(); c.arc(8, 8, 4, 0, Math.PI * 2); c.fill();
      c.fillStyle = "#444";
      c.beginPath(); c.arc(8, 8, 2, 0, Math.PI * 2); c.fill();
    }),
  noteBlock: () =>
    make("noteBlock", (c) => {
      speckle(c, "#5a3a8a", 0.12, 0.4);
      c.fillStyle = "#d8c0ff";
      // a little music note
      c.fillRect(6, 4, 2, 7);
      c.fillRect(8, 4, 3, 2);
      c.beginPath(); c.arc(6, 11, 2, 0, Math.PI * 2); c.fill();
    }),
};

// A face on the avatar head, generated to a chosen skin/eye palette.
export function faceTexture(skin, eye = "#1a1a1a", mouth = "#7a4a3a") {
  const key = `face_${skin}_${eye}_${mouth}`;
  return make(key, (c) => {
    speckle(c, skin, 0.06, 0.3);
    // hair line on top
    c.fillStyle = shade(skin, -0.32);
    c.fillRect(0, 0, SIZE, 3);
    // eyes
    c.fillStyle = "#ffffff"; c.fillRect(4, 6, 3, 2); c.fillRect(9, 6, 3, 2);
    c.fillStyle = eye; c.fillRect(5, 6, 2, 2); c.fillRect(10, 6, 2, 2);
    // mouth
    c.fillStyle = mouth; c.fillRect(6, 11, 4, 1);
  });
}
