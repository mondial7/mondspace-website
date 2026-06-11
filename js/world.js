import * as THREE from "three";
import {
  buildGround, buildTree, buildClouds, buildMonument,
  buildStage, buildWorkbench, buildSigns, buildPitAndJukebox,
} from "./voxel.js";

const V = (x, y, z) => new THREE.Vector3(x, y, z);

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
    setJukeboxPlaying: (on) => juke.userData.setPlaying(on),
  };
}
