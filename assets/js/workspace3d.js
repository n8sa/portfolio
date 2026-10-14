// The studio — a cutaway 3D room. Progressive enhancement only:
// the labelled buttons in the DOM are the real, accessible controls.

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const C = {
  ivory: 0xF8F6F2,
  white: 0xFBFAF7,
  lavender: 0xB8A4E3,
  lavenderWall: 0xE6E0F0,
  ink: 0x26243A,
  inkSoft: 0x3A3754,
  sage: 0xB8D4C5,
  sageDeep: 0x6E9C85,
  peach: 0xF2C7AE,
  rose: 0xE9A9C1,
  blush: 0xF7DCE6,
  wall: 0xF2ECE4,
  wood: 0xE3CBB0,
  woodDark: 0xC9AC8C,
  cork: 0xC9A27A,
  eye: 0xCFF3E0,
};

const HIGHLIGHT = new THREE.Color(0xB8A4E3);
const BLACK = new THREE.Color(0x000000);

export function initWorkspace(stage, { reducedMotion = false, onSelect, monitorImages = [], boardImages = [] } = {}) {
  const host = stage.querySelector('[data-stage-canvas]');
  const pinButtons = new Map([...stage.querySelectorAll('[data-hotspot]')].map((b) => [b.dataset.hotspot, b]));
  const small = window.matchMedia('(max-width: 767px)').matches;
  const idle = !reducedMotion && !small;
  const ease = reducedMotion ? 1 : 0.075;

  /* ---------- Renderer, scene, camera ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = !small;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

  const hemi = new THREE.HemisphereLight(0xFFFFFF, 0xE6D8C6, 1.9);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xFFF3E6, 1.6);
  key.position.set(6, 9, 7);
  key.castShadow = renderer.shadowMap.enabled;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  const windowGlow = new THREE.PointLight(0xFFE2C4, 6, 7, 1.6);
  windowGlow.position.set(2.3, 2.6, -3.2);
  scene.add(windowGlow);

  /* ---------- Builders ---------- */
  const disposables = [];
  const keep = (x) => { disposables.push(x); return x; };
  const mat = (color, opts = {}) => keep(new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0, ...opts }));
  const basic = (opts) => keep(new THREE.MeshBasicMaterial(opts));
  const rbox = (w, h, d, r = 0.04) => keep(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2.01, h / 2.01, d / 2.01)));
  const box = (w, h, d) => keep(new THREE.BoxGeometry(w, h, d));
  const mesh = (geometry, material, [x = 0, y = 0, z = 0] = [], { cast = true, receive = true } = {}) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = receive;
    return m;
  };

  const loader = new THREE.TextureLoader();
  // Load an image and crop it to "cover" a plane of the given aspect, anchored at the top.
  function coverTexture(src, planeAspect) {
    const tex = keep(loader.load(src, (t) => {
      const imgAspect = t.image.width / t.image.height;
      if (imgAspect > planeAspect) {
        t.repeat.set(planeAspect / imgAspect, 1);
        t.offset.set((1 - t.repeat.x) / 2, 0);
      } else {
        t.repeat.set(1, imgAspect / planeAspect);
        t.offset.set(0, 1 - t.repeat.y);
      }
      requestRender();
    }));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }

  const room = new THREE.Group();
  scene.add(room);

  /* ---------- Shell: floor + two walls ---------- */
  room.add(mesh(box(8, 0.3, 8), mat(0xFFFFFF, { map: keep(plankTexture()) }), [0, -0.15, 0], { cast: false }));
  room.add(mesh(box(8, 4.4, 0.2), mat(C.wall), [0, 2.2, -4.1], { cast: false }));
  room.add(mesh(box(0.2, 4.4, 8.2), mat(C.lavenderWall), [-4.1, 2.2, -0.1], { cast: false }));
  room.add(mesh(box(8, 0.16, 0.05), mat(C.white), [0, 0.08, -3.98], { cast: false }));
  room.add(mesh(box(0.05, 0.16, 8), mat(C.white), [-3.98, 0.08, 0], { cast: false }));

  // Window with an afternoon sky
  const win = new THREE.Group();
  win.position.set(2.45, 2.65, -3.98);
  const daySky = keep(skyTexture());
  const nightSky = keep(nightSkyTexture());
  const skyMat = basic({ map: daySky });
  win.add(mesh(keep(new THREE.PlaneGeometry(1.7, 1.35)), skyMat, [0, 0, 0.01], { cast: false, receive: false }));
  const frameMat = mat(C.white);
  for (const [w, h, x, y] of [[1.86, 0.08, 0, 0.71], [1.86, 0.08, 0, -0.71], [0.08, 1.5, -0.89, 0], [0.08, 1.5, 0.89, 0], [0.05, 1.4, 0, 0], [1.76, 0.05, 0, 0]]) {
    win.add(mesh(box(w, h, 0.08), frameMat, [x, y, 0.04], { cast: false }));
  }
  win.add(mesh(box(2.0, 0.06, 0.24), frameMat, [0, -0.77, 0.12]));
  room.add(win);

  // Wall shelf with books and a cactus
  const shelf = new THREE.Group();
  shelf.position.set(-1.05, 3.35, -3.84);
  shelf.add(mesh(box(1.7, 0.05, 0.32), mat(C.wood), [0, 0, 0.05]));
  const bookColors = [C.lavender, C.ink, C.rose, C.sage, C.blush, C.lavender];
  let bx = -0.7;
  bookColors.forEach((color, i) => {
    const h = 0.32 + ((i * 37) % 10) / 60;
    const w = 0.08 + (i % 3) * 0.02;
    shelf.add(mesh(box(w, h, 0.24), mat(color), [bx, h / 2 + 0.025, 0.05]));
    bx += w + 0.015;
  });
  shelf.add(mesh(keep(new THREE.CylinderGeometry(0.09, 0.07, 0.14, 16)), mat(C.peach), [0.55, 0.095, 0.05]));
  shelf.add(mesh(keep(new THREE.CapsuleGeometry(0.05, 0.14, 4, 8)), mat(C.sageDeep), [0.55, 0.26, 0.05]));
  room.add(shelf);

  // Poster: the headline, and a way into "Why hire me"
  const poster = new THREE.Group();
  poster.position.set(-3.0, 2.7, -3.97);
  poster.add(mesh(box(0.98, 1.28, 0.04), mat(C.wood), [0, 0, 0.02], { cast: false }));
  poster.add(mesh(keep(new THREE.PlaneGeometry(0.88, 1.18)), basic({ map: keep(posterTexture()) }), [0, 0, 0.045], { cast: false, receive: false }));

  // Rug, chair, floor plant
  const rug = mesh(keep(new THREE.CylinderGeometry(1.7, 1.7, 0.03, 48)), mat(C.sage), [0.2, 0.015, -0.6], { cast: false });
  rug.scale.set(1.25, 1, 0.9);
  room.add(rug);

  const chair = new THREE.Group();
  chair.position.set(-0.15, 0, -1.85);
  chair.rotation.y = -0.75;
  const chairMat = mat(C.rose);
  chair.add(mesh(rbox(0.72, 0.1, 0.66, 0.05), chairMat, [0, 0.95, 0]));
  chair.add(mesh(rbox(0.72, 0.72, 0.09, 0.05), chairMat, [0, 1.4, 0.33]));
  chair.add(mesh(keep(new THREE.CylinderGeometry(0.04, 0.04, 0.82, 10)), mat(C.inkSoft), [0, 0.47, 0]));
  for (let i = 0; i < 5; i += 1) {
    const leg = mesh(box(0.42, 0.05, 0.06), mat(C.inkSoft), [0, 0.06, 0]);
    leg.rotation.y = (i / 5) * Math.PI * 2;
    leg.translateX(0.2);
    chair.add(leg);
  }
  room.add(chair);

  const plant = new THREE.Group();
  plant.position.set(3.25, 0, -3.25);
  plant.add(mesh(keep(new THREE.CylinderGeometry(0.34, 0.27, 0.62, 24)), mat(C.white), [0, 0.31, 0]));
  const leafMat = mat(C.sageDeep, { roughness: 0.9 });
  const leafGeo = keep(new THREE.SphereGeometry(0.24, 12, 10));
  for (let i = 0; i < 7; i += 1) {
    const a = (i / 7) * Math.PI * 2;
    const leaf = mesh(leafGeo, leafMat, [Math.cos(a) * 0.28, 1.0 + (i % 3) * 0.28, Math.sin(a) * 0.28]);
    leaf.scale.set(0.7, 1.6, 0.45);
    leaf.rotation.set(Math.sin(a) * 0.5, a, Math.cos(a) * 0.5);
    plant.add(leaf);
  }
  room.add(plant);

  /* ---------- Desk ---------- */
  const deskTop = 1.5;
  const desk = new THREE.Group();
  desk.position.set(-0.75, 0, -3.35);
  desk.add(mesh(rbox(3.7, 0.08, 1.2, 0.03), mat(C.wood), [0, deskTop - 0.04, 0]));
  desk.add(mesh(box(0.08, deskTop - 0.08, 1.1), mat(C.inkSoft), [-1.75, (deskTop - 0.08) / 2, 0]));
  desk.add(mesh(box(0.95, deskTop - 0.08, 1.1), mat(C.woodDark), [1.3, (deskTop - 0.08) / 2, 0]));
  for (const y of [0.45, 0.95]) {
    desk.add(mesh(box(0.3, 0.035, 0.04), mat(C.ink), [1.3, y, 0.57], { cast: false }));
  }
  room.add(desk);
  const top = deskTop;

  // Desk lamp — switches on in night mode
  const lamp = new THREE.Group();
  lamp.position.set(-2.4, top, -3.7);
  const lampMetal = mat(C.ink, { roughness: 0.45 });
  lamp.add(mesh(keep(new THREE.CylinderGeometry(0.16, 0.18, 0.05, 20)), lampMetal, [0, 0.025, 0]));
  const lampArm = mesh(keep(new THREE.CylinderGeometry(0.02, 0.02, 0.75, 8)), lampMetal, [0.08, 0.38, 0.05]);
  lampArm.rotation.z = -0.22;
  lamp.add(lampArm);
  const shadeMat = mat(C.peach, { emissive: new THREE.Color(0xFFC98A), emissiveIntensity: 0, side: THREE.DoubleSide });
  const shade = mesh(keep(new THREE.ConeGeometry(0.2, 0.24, 24, 1, true)), shadeMat, [0.2, 0.78, 0.12]);
  shade.rotation.z = -0.5;
  lamp.add(shade);
  const bulbMat = basic({ color: 0xFFF1D6, transparent: true, opacity: 0 });
  lamp.add(mesh(keep(new THREE.SphereGeometry(0.06, 12, 10)), bulbMat, [0.24, 0.7, 0.12], { cast: false, receive: false }));
  room.add(lamp);
  const lampLight = new THREE.PointLight(0xFFC98A, 0, 6, 1.4);
  lampLight.position.set(-2.1, top + 0.65, -3.5);
  scene.add(lampLight);

  // Mug (decor)
  const mug = new THREE.Group();
  mug.position.set(0.15, top, -2.92);
  mug.add(mesh(keep(new THREE.CylinderGeometry(0.09, 0.08, 0.2, 18)), mat(C.lavender), [0, 0.1, 0]));
  mug.add(mesh(keep(new THREE.TorusGeometry(0.055, 0.018, 8, 14)), mat(C.lavender), [0.1, 0.1, 0]));
  room.add(mug);

  /* ---------- Hotspot objects ---------- */
  const hotspots = {};
  function register(name, group, anchor, below = false) {
    group.userData = { hotspot: name, anchor: new THREE.Vector3(...anchor), scale: 1 };
    hotspots[name] = group;
    const li = pinButtons.get(name)?.closest('li');
    if (li) li.dataset.below = String(below);
    room.add(group);
  }

  // Computer — screen cycles through real screenshots of professional work
  const computer = new THREE.Group();
  computer.position.set(-1.05, top, -3.5);
  computer.rotation.y = 0.18;
  const screenAspect = 1.5 / 0.9;
  const screenTextures = monitorImages.slice(0, 4).map((src) => coverTexture(src, screenAspect));
  const screenMat = basic({ color: 0xFFFFFF, map: screenTextures[0] || keep(siteTexture()) });
  computer.add(mesh(rbox(1.62, 1.02, 0.06, 0.03), mat(C.white), [0, 0.88, 0]));
  computer.add(mesh(keep(new THREE.PlaneGeometry(1.5, 0.9)), screenMat, [0, 0.88, 0.032], { cast: false, receive: false }));
  computer.add(mesh(box(0.1, 0.4, 0.06), mat(0xD8D2C8), [0, 0.2, -0.04]));
  computer.add(mesh(rbox(0.5, 0.03, 0.3, 0.015), mat(0xD8D2C8), [0, 0.015, 0]));
  computer.add(mesh(rbox(0.95, 0.035, 0.3, 0.015), mat(0xF1EEE8), [0.05, 0.02, 0.6]));
  computer.add(mesh(rbox(0.1, 0.035, 0.16, 0.03), mat(0xF1EEE8), [0.72, 0.02, 0.62]));
  register('computer', computer, [0, 1.55, 0]);

  // Robot
  const robot = new THREE.Group();
  robot.position.set(0.55, top, -3.45);
  robot.rotation.y = 0.55;
  robot.scale.setScalar(0.48);
  robot.add(mesh(rbox(0.85, 0.72, 0.62, 0.22), mat(C.lavender), [0, 0.38, 0]));
  const head = new THREE.Group();
  head.position.y = 1.08;
  head.add(mesh(rbox(1.0, 0.72, 0.72, 0.24), mat(C.white)));
  head.add(mesh(rbox(0.78, 0.46, 0.06, 0.12), mat(C.ink, { roughness: 0.3 }), [0, 0, 0.35]));
  const eyeGeo = keep(new THREE.CapsuleGeometry(0.055, 0.09, 4, 8));
  const eyes = [-0.17, 0.17].map((x) => mesh(eyeGeo, basic({ color: C.eye }), [x, 0.02, 0.39], { cast: false }));
  eyes.forEach((e) => head.add(e));
  head.add(mesh(keep(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8)), mat(C.ink), [0, 0.5, 0]));
  const antennaMat = mat(C.peach, { emissive: new THREE.Color(C.peach), emissiveIntensity: 0.35 });
  head.add(mesh(keep(new THREE.SphereGeometry(0.08, 16, 12)), antennaMat, [0, 0.68, 0]));
  robot.add(head);
  const armMat = mat(C.white);
  for (const x of [-0.52, 0.52]) {
    const arm = mesh(keep(new THREE.CapsuleGeometry(0.08, 0.28, 4, 8)), armMat, [x, 0.42, 0]);
    arm.rotation.z = x < 0 ? -0.25 : 0.25;
    robot.add(arm);
  }
  register('robot', robot, [0, 2.1, 0]);

  // Notebook — open, with handwritten-style notes
  const notebook = new THREE.Group();
  notebook.position.set(-2.05, top, -3.0);
  notebook.rotation.y = 0.28;
  notebook.add(mesh(rbox(1.0, 0.03, 0.66, 0.012), mat(C.peach), [0, 0.015, 0]));
  const pages = mesh(keep(new THREE.PlaneGeometry(0.94, 0.6)), mat(0xFFFFFF, { map: keep(notebookTexture()) }), [0, 0.034, 0], { cast: false });
  pages.rotation.x = -Math.PI / 2;
  notebook.add(pages);
  const pen = mesh(keep(new THREE.CapsuleGeometry(0.018, 0.5, 4, 8)), mat(C.ink), [0.6, 0.03, 0.05]);
  pen.rotation.set(Math.PI / 2, 0, 0.35);
  notebook.add(pen);
  register('notebook', notebook, [0, 0.05, 0.3], true);

  // Mail tray — contact
  const mail = new THREE.Group();
  mail.position.set(0.95, top, -2.95);
  mail.rotation.y = 0.4;
  mail.add(mesh(rbox(0.46, 0.07, 0.32, 0.02), mat(C.ink), [0, 0.035, 0]));
  const envelope = mesh(box(0.38, 0.26, 0.015), mat(C.peach), [0, 0.18, 0]);
  envelope.rotation.x = -0.25;
  mail.add(envelope);
  const flap = mesh(keep(new THREE.CircleGeometry(0.15, 3)), mat(0xE9B597), [0, 0.24, 0.02], { cast: false });
  flap.rotation.set(-0.25, 0, -Math.PI / 2);
  mail.add(flap);
  register('mail', mail, [0, 0, 0.12], true);

  // Console on a pouf — experiments
  const consoleGroup = new THREE.Group();
  consoleGroup.position.set(2.15, 0, -0.9);
  consoleGroup.add(mesh(keep(new THREE.CylinderGeometry(0.55, 0.6, 0.6, 32)), mat(C.peach, { roughness: 1 }), [0, 0.3, 0]));
  const handheld = new THREE.Group();
  handheld.position.set(0, 0.62, 0);
  handheld.rotation.y = 0.5;
  handheld.add(mesh(rbox(0.7, 0.07, 0.36, 0.035), mat(C.sage), [0, 0.035, 0]));
  const hScreen = mesh(keep(new THREE.PlaneGeometry(0.26, 0.18)), basic({ map: keep(consoleTexture()) }), [0, 0.072, 0], { cast: false });
  hScreen.rotation.x = -Math.PI / 2;
  handheld.add(hScreen);
  handheld.add(mesh(box(0.1, 0.02, 0.03), mat(C.inkSoft), [-0.24, 0.08, 0]));
  handheld.add(mesh(box(0.03, 0.02, 0.1), mat(C.inkSoft), [-0.24, 0.08, 0]));
  handheld.add(mesh(keep(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 10)), mat(C.lavender), [0.22, 0.08, -0.03]));
  handheld.add(mesh(keep(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 10)), mat(C.ink), [0.27, 0.08, 0.04]));
  consoleGroup.add(handheld);
  register('console', consoleGroup, [0, 0.75, 0]);

  // Pinboard — real screenshots as polaroids
  const board = new THREE.Group();
  board.position.set(-3.96, 2.5, -1.35);
  board.rotation.y = Math.PI / 2;
  board.add(mesh(box(2.3, 1.45, 0.05), mat(C.cork, { roughness: 1 }), [0, 0, 0.025], { cast: false }));
  const boardFrame = mat(C.woodDark);
  for (const [w, h, x, y] of [[2.4, 0.06, 0, 0.75], [2.4, 0.06, 0, -0.75], [0.06, 1.56, -1.18, 0], [0.06, 1.56, 1.18, 0]]) {
    board.add(mesh(box(w, h, 0.07), boardFrame, [x, y, 0.035], { cast: false }));
  }
  const slots = [[-0.68, 0.24, 0.06], [0.05, 0.3, -0.05], [0.74, 0.2, 0.08], [-0.42, -0.36, -0.07], [0.42, -0.34, 0.04]];
  const cardMat = mat(0xFFFFFF);
  const pinColors = [C.lavender, C.peach, C.sageDeep, C.ink, C.peach];
  const photoAspect = 0.5 / 0.34;
  const photoTextures = boardImages.slice(0, slots.length).map((src) => coverTexture(src, photoAspect));
  slots.forEach(([x, y, r], i) => {
    const card = new THREE.Group();
    card.position.set(x, y, 0.06);
    card.rotation.z = r;
    card.add(mesh(box(0.58, 0.5, 0.01), cardMat, [0, 0, 0], { cast: false }));
    const photoMat = photoTextures[i]
      ? basic({ map: photoTextures[i] })
      : mat([C.lavender, C.sage, C.peach][i % 3]); // blank card, not a fake screenshot
    card.add(mesh(keep(new THREE.PlaneGeometry(0.5, 0.34)), photoMat, [0, 0.04, 0.006], { cast: false, receive: false }));
    card.add(mesh(keep(new THREE.SphereGeometry(0.03, 10, 8)), mat(pinColors[i]), [0, 0.22, 0.02]));
    board.add(card);
  });
  register('wall', board, [0, 0.85, 0.1]);

  register('poster', poster, [0, -0.66, 0.05], true);

  // Framed certificate with a rosette badge — certifications
  const certFrame = new THREE.Group();
  certFrame.position.set(0.72, 3.15, -3.97);
  certFrame.add(mesh(box(0.86, 0.66, 0.05), mat(C.woodDark), [0, 0, 0.025], { cast: false }));
  certFrame.add(mesh(keep(new THREE.PlaneGeometry(0.76, 0.56)), basic({ map: keep(certificateTexture()) }), [0, 0, 0.052], { cast: false, receive: false }));
  const rosette = new THREE.Group();
  rosette.position.set(0.3, -0.22, 0.07);
  rosette.add(mesh(keep(new THREE.CylinderGeometry(0.085, 0.085, 0.025, 20)), mat(C.peach, { roughness: 0.5 }), [0, 0, 0], { cast: false }));
  rosette.children[0].rotation.x = Math.PI / 2;
  rosette.add(mesh(keep(new THREE.CylinderGeometry(0.055, 0.055, 0.03, 20)), mat(0xE9B597, { roughness: 0.4 }), [0, 0, 0.01], { cast: false }));
  rosette.children[1].rotation.x = Math.PI / 2;
  for (const [x, r] of [[-0.035, 0.25], [0.035, -0.25]]) {
    const tail = mesh(box(0.045, 0.14, 0.008), mat(C.lavender), [x, -0.1, -0.005], { cast: false });
    tail.rotation.z = r;
    rosette.add(tail);
  }
  certFrame.add(rosette);
  register('certs', certFrame, [0, 0.36, 0.05]);

  const hotspotList = Object.values(hotspots);

  /* ---------- Camera rig ---------- */
  const baseTarget = new THREE.Vector3(-0.7, 1.55, -1.8);
  const baseDir = new THREE.Vector3(1, 0.62, 1.05).normalize();
  const target = baseTarget.clone();
  const goalTarget = baseTarget.clone();
  let baseDist = 14;
  let dist = baseDist;
  let goalDist = baseDist;
  let yaw = 0; let goalYaw = 0;
  let pitch = 0; let goalPitch = 0;
  let shift = 0; let goalShift = 0; // horizontal view offset (fraction of width)
  let lift = 0; let goalLift = 0;   // vertical view offset (fraction of height)
  let width = 1; let height = 1;
  let focused = null;
  const restLift = () => (width / height < 0.8 ? 0.16 : 0.02);

  function resize() {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const aspect = width / height;
    camera.aspect = aspect;
    // Fit the room: keep ~9.6 units of width (less on phones) and ~6.6 units of height in view.
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const wantW = aspect < 0.8 ? 7.6 : 9.6;
    baseDist = Math.max(wantW / (2 * tanHalf * aspect), 6.6 / (2 * tanHalf));
    if (!focused) {
      goalDist = baseDist;
      goalLift = restLift();
    }
    renderer.setSize(width, height, false);
    measurePins();
    requestRender();
  }

  const tmp = new THREE.Vector3();
  function placeCamera() {
    tmp.copy(baseDir).applyAxisAngle(THREE.Object3D.DEFAULT_UP, yaw);
    tmp.y += pitch;
    camera.position.copy(target).addScaledVector(tmp.normalize(), dist);
    camera.lookAt(target);
    camera.setViewOffset(width, height, shift * width, lift * height, width, height);
    camera.updateProjectionMatrix();
  }

  /* ---------- Labels follow their objects ---------- */
  // Each label sits above (or below) its object, stays on screen and below the top bar,
  // and is nudged out of the way if it would overlap a label placed before it.
  const projected = new THREE.Vector3();
  const pinSize = new Map();
  let TOP_SAFE = 72;
  function measurePins() {
    pinButtons.forEach((b, k) => pinSize.set(k, { w: b.offsetWidth, h: b.offsetHeight }));
    const bar = document.querySelector('.topbar');
    if (bar) TOP_SAFE = Math.round(bar.getBoundingClientRect().height) + 4;
  }
  function placePins() {
    if (!pinSize.size) measurePins();
    const placed = [];
    for (const group of hotspotList) {
      const name = group.userData.hotspot;
      const li = pinButtons.get(name)?.closest('li');
      if (!li) continue;
      projected.copy(group.userData.anchor).applyMatrix4(group.matrixWorld).project(camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      const { w, h } = pinSize.get(name) || { w: 100, h: 32 };
      const below = li.dataset.below === 'true';
      const maxTop = Math.max(TOP_SAFE, height - h - 8);
      const maxLeft = Math.max(8, width - w - 8);
      const baseLeft = THREE.MathUtils.clamp(x - w / 2, 8, maxLeft);
      const base = THREE.MathUtils.clamp(below ? y + h * 0.4 : y - h, TOP_SAFE, maxTop);
      const overlap = (l, t) => placed.reduce((sum, p) => {
        const ox = Math.min(l + w + 4, p.left + p.w + 4) - Math.max(l, p.left);
        const oy = Math.min(t + h + 4, p.top + p.h + 4) - Math.max(t, p.top);
        return sum + (ox > 0 && oy > 0 ? ox * oy : 0);
      }, 0);
      // Stay close to the object: natural spot, one or two steps away, or a small slide sideways.
      // If every nearby spot is taken, use the one with the least overlap.
      const step = h + 4;
      const dir = below ? 1 : -1;
      const tops = [base, base + dir * step, base - dir * step, base + dir * step * 2];
      const lefts = [0, -0.5, 0.5].map((f) => THREE.MathUtils.clamp(baseLeft + w * f, 8, maxLeft));
      let left = baseLeft;
      let top = base;
      let best = Infinity;
      search: for (const l of lefts) {
        for (const t of tops) {
          if (t < TOP_SAFE || t > maxTop) continue;
          const o = overlap(l, t);
          if (o < best) { best = o; left = l; top = t; }
          if (o === 0) break search;
        }
      }
      placed.push({ left, top, w, h });
      li.style.transform = `translate(${left.toFixed(1)}px, ${top.toFixed(1)}px)`;
    }
  }

  /* ---------- Hover, drag, select ---------- */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hovered = null;

  function setHighlight(group, on) {
    group.traverse((obj) => {
      const m = obj.material;
      if (!m || !m.emissive || m === antennaMat) return;
      m.emissive.copy(on ? HIGHLIGHT : BLACK);
      m.emissiveIntensity = on ? 0.16 : 1;
    });
  }

  function setHovered(name) {
    if (name === hovered) return;
    if (hovered) setHighlight(hotspots[hovered], false);
    hovered = name;
    if (hovered) setHighlight(hotspots[hovered], true);
    pinButtons.forEach((b, k) => b.classList.toggle('is-active', k === hovered));
    stage.classList.toggle('is-hovering', !!hovered);
    requestRender();
  }

  pinButtons.forEach((btn, name) => {
    btn.addEventListener('pointerenter', () => setHovered(name));
    btn.addEventListener('pointerleave', () => setHovered(null));
    btn.addEventListener('focus', () => setHovered(name));
    btn.addEventListener('blur', () => setHovered(null));
  });

  function pick(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    let obj = raycaster.intersectObjects(hotspotList, true)[0]?.object;
    while (obj && !obj.userData.hotspot) obj = obj.parent;
    return obj?.userData.hotspot || null;
  }

  const canvas = renderer.domElement;
  let drag = null;

  function onPointerDown(e) {
    drag = { x: e.clientX, y: e.clientY, yaw: goalYaw, pitch: goalPitch, moved: 0 };
  }
  function onPointerMove(e) {
    if (drag) {
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
      if (e.pointerType === 'touch' && Math.abs(dy) > Math.abs(dx)) return; // let the page scroll
      goalYaw = THREE.MathUtils.clamp(drag.yaw - dx * 0.0035, -0.55, 0.45);
      goalPitch = THREE.MathUtils.clamp(drag.pitch + dy * 0.0025, -0.25, 0.3);
      requestRender();
    } else if (e.pointerType === 'mouse') {
      setHovered(pick(e));
    }
  }
  function onPointerUp(e) {
    if (drag && drag.moved < 6) {
      const name = pick(e);
      if (name) onSelect?.(name);
    }
    drag = null;
  }
  function onPointerLeave() {
    drag = null;
    const btn = pinButtons.get(hovered);
    if (!btn || !btn.matches(':hover, :focus')) setHovered(null);
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointercancel', onPointerLeave);

  /* ---------- Loop ---------- */
  const clock = new THREE.Clock();
  let rafId = 0;
  let visible = true;
  let needsRender = true;
  let screenIndex = 0;
  let nextSwap = 5;

  function requestRender() {
    needsRender = true;
    if (!rafId && visible) rafId = requestAnimationFrame(frame);
  }

  const approach = (cur, goal) => cur + (goal - cur) * ease;
  const near = (a, b, eps = 0.0005) => Math.abs(a - b) < eps;

  function frame() {
    rafId = 0;
    const t = clock.getElapsedTime();
    let moving = false;

    target.lerp(goalTarget, ease);
    dist = approach(dist, goalDist);
    yaw = approach(yaw, goalYaw);
    pitch = approach(pitch, goalPitch);
    shift = approach(shift, goalShift);
    lift = approach(lift, goalLift);
    if (target.distanceToSquared(goalTarget) > 1e-6 || !near(dist, goalDist, 0.002) || !near(yaw, goalYaw)
      || !near(pitch, goalPitch) || !near(shift, goalShift) || !near(lift, goalLift)) {
      moving = true;
    }

    for (const group of hotspotList) {
      const want = group.userData.hotspot === hovered ? 1.05 : 1;
      if (!near(group.userData.scale, want, 0.001)) {
        group.userData.scale = approach(group.userData.scale, want);
        group.scale.setScalar((group === robot ? 0.48 : 1) * group.userData.scale);
        moving = true;
      }
    }

    if (idle) {
      head.position.y = 1.08 + Math.sin(t * 1.6) * 0.03;
      head.rotation.y = Math.sin(t * 0.5) * 0.15;
      antennaMat.emissiveIntensity = 0.35 + (Math.sin(t * 2.4) + 1) * 0.25;
      eyes.forEach((e) => { e.scale.y = (t % 4.2) < 0.12 ? 0.15 : 1; });
      if (screenTextures.length > 1 && t > nextSwap) {
        screenIndex = (screenIndex + 1) % screenTextures.length;
        screenMat.map = screenTextures[screenIndex];
        nextSwap = t + 5;
      }
      moving = true;
    }

    if (needsRender || moving) {
      placeCamera();
      scene.updateMatrixWorld();
      renderer.render(scene, camera);
      placePins();
      needsRender = false;
    }

    if (moving && visible && !document.hidden) rafId = requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestRender();
  });
  io.observe(stage);
  const onVisibility = () => { if (!document.hidden) requestRender(); };
  document.addEventListener('visibilitychange', onVisibility);
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  dist = goalDist;
  lift = goalLift;

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    stage.classList.remove('is-3d');
  });

  // Show the room once the first frame is drawn — no loading gate.
  requestAnimationFrame(() => {
    frame();
    stage.classList.add('is-3d');
  });

  /* ---------- Light / night ---------- */
  function applyTheme(theme) {
    const night = theme === 'dark';
    hemi.color.set(night ? 0x8C84C4 : 0xFFFFFF);
    hemi.groundColor.set(night ? 0x2A2440 : 0xE6D8C6);
    hemi.intensity = night ? 0.6 : 1.9;
    key.color.set(night ? 0xA8B4FF : 0xFFF3E6);
    key.intensity = night ? 0.35 : 1.6;
    windowGlow.color.set(night ? 0x9DB2FF : 0xFFE2C4);
    windowGlow.intensity = night ? 3 : 6;
    lampLight.intensity = night ? 9 : 0;
    shadeMat.emissiveIntensity = night ? 0.9 : 0;
    bulbMat.opacity = night ? 1 : 0;
    skyMat.map = night ? nightSky : daySky;
    requestRender();
  }
  const onTheme = (e) => applyTheme(e.detail?.theme);
  document.addEventListener('themechange', onTheme);
  applyTheme(document.documentElement.dataset.theme);

  /* ---------- Public API ---------- */
  const sidePanel = () => window.matchMedia('(min-width: 768px)').matches;

  function focus(name) {
    const group = hotspots[name];
    if (!group) return;
    focused = name;
    group.updateWorldMatrix(true, false);
    const pos = group.userData.anchor.clone().applyMatrix4(group.matrixWorld);
    goalTarget.lerpVectors(baseTarget, pos, 0.8);
    goalDist = baseDist * 0.62;
    goalShift = sidePanel() ? 0.22 : 0;   // keep the object clear of the side panel…
    goalLift = sidePanel() ? 0 : 0.24;    // …or above the bottom sheet
    goalYaw = name === 'wall' ? -0.5 : 0;
    goalPitch = 0;
    setHovered(null);
    requestRender();
  }

  function release() {
    focused = null;
    goalTarget.copy(baseTarget);
    goalDist = baseDist;
    goalShift = 0;
    goalLift = restLift();
    goalYaw = 0;
    requestRender();
  }

  function nudge() {
    if (reducedMotion) return;
    goalYaw = -0.2;
    requestRender();
    setTimeout(() => { goalYaw = 0; requestRender(); }, 900);
  }

  function dispose() {
    cancelAnimationFrame(rafId);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    document.removeEventListener('themechange', onTheme);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    canvas.remove();
    stage.classList.remove('is-3d', 'is-hovering');
  }
  window.addEventListener('pagehide', dispose, { once: true });

  return { focus, release, nudge, dispose };
}

/* ---------- Canvas textures (no external art) ---------- */

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  if (g.roundRect) g.roundRect(x, y, w, h, r);
  else g.rect(x, y, w, h);
}

function plankTexture() {
  const tex = canvasTexture(512, 512, (g, w, h) => {
    const tones = ['#DDC4A6', '#D7BC9C', '#E2CAAE', '#D9C0A1'];
    const plank = h / 8;
    for (let i = 0; i < 8; i += 1) {
      g.fillStyle = tones[i % tones.length];
      g.fillRect(0, i * plank, w, plank);
      g.fillStyle = 'rgba(120, 90, 60, 0.18)';
      g.fillRect(0, i * plank, w, 2);
      const cut = ((i * 173) % 400) + 40;
      g.fillRect(cut, i * plank, 2, plank);
    }
  });
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  return tex;
}

function skyTexture() {
  return canvasTexture(256, 256, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#BFD9EA');
    grad.addColorStop(0.65, '#EAE4EC');
    grad.addColorStop(1, '#F7DCC6');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255, 255, 255, 0.75)';
    for (const [x, y, s] of [[60, 70, 1], [180, 110, 0.7]]) {
      g.beginPath();
      g.ellipse(x, y, 40 * s, 12 * s, 0, 0, Math.PI * 2);
      g.ellipse(x + 22 * s, y - 8 * s, 26 * s, 12 * s, 0, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = 'rgba(184, 212, 197, 0.9)';
    g.fillRect(0, h - 40, w, 40);
  });
}

function nightSkyTexture() {
  return canvasTexture(256, 256, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#141A3A');
    grad.addColorStop(0.7, '#2A2650');
    grad.addColorStop(1, '#4A3A5E');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255, 255, 255, 0.85)';
    let seed = 7;
    const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < 60; i += 1) g.fillRect(rand() * w, rand() * (h - 60), rand() < 0.2 ? 2 : 1, rand() < 0.2 ? 2 : 1);
    g.fillStyle = '#F6F0DA';
    g.beginPath();
    g.arc(190, 64, 20, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#141A3A';
    g.beginPath();
    g.arc(200, 58, 18, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(30, 40, 50, 0.95)';
    g.fillRect(0, h - 40, w, 40);
    g.fillStyle = 'rgba(255, 214, 150, 0.8)';
    for (let x = 12; x < w; x += 22) if (rand() < 0.5) g.fillRect(x, h - 30 + rand() * 18, 3, 3);
  });
}

function certificateTexture() {
  return canvasTexture(380, 280, (g, w, h) => {
    g.fillStyle = '#FFFDF8';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#B8A4E3';
    g.lineWidth = 4;
    g.strokeRect(12, 12, w - 24, h - 24);
    g.strokeStyle = 'rgba(184, 164, 227, 0.45)';
    g.lineWidth = 1.5;
    g.strokeRect(20, 20, w - 40, h - 40);
    g.textAlign = 'center';
    g.fillStyle = '#5A4796';
    g.font = '500 15px "JetBrains Mono", monospace';
    g.fillText('CERTIFICATIONS', w / 2, 62);
    g.fillStyle = '#26243A';
    g.font = '800 30px Manrope, system-ui, sans-serif';
    g.fillText('Farah Nisa', w / 2, 108);
    g.fillStyle = '#5A576E';
    g.font = '500 15px Inter, system-ui, sans-serif';
    g.fillText('Azure · Meta · Google · Anthropic', w / 2, 140);
    g.strokeStyle = '#D8CFC3';
    g.lineWidth = 2;
    for (const y of [176, 198]) { g.beginPath(); g.moveTo(70, y); g.lineTo(w - 70, y); g.stroke(); }
  });
}

function posterTexture() {
  return canvasTexture(352, 472, (g, w, h) => {
    g.fillStyle = '#26243A';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#B8A4E3';
    g.font = '800 46px Manrope, system-ui, sans-serif';
    ['I turn', 'ideas into', 'digital', 'experi-', 'ences.'].forEach((line, i) => g.fillText(line, 26, 86 + i * 52));
    g.fillStyle = '#F2C7AE';
    g.beginPath();
    g.arc(w - 60, h - 64, 26, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(248, 246, 242, 0.6)';
    g.font = '500 15px "JetBrains Mono", monospace';
    g.fillText('WHY HIRE ME? →', 26, h - 56);
  });
}

function notebookTexture() {
  return canvasTexture(640, 408, (g, w, h) => {
    g.fillStyle = '#FFFDF8';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#E8DED2';
    g.fillRect(w / 2 - 2, 0, 4, h);
    g.strokeStyle = 'rgba(184, 164, 227, 0.45)';
    g.lineWidth = 1.5;
    for (let y = 70; y < h - 10; y += 34) {
      g.beginPath(); g.moveTo(24, y); g.lineTo(w / 2 - 20, y); g.stroke();
      g.beginPath(); g.moveTo(w / 2 + 20, y); g.lineTo(w - 24, y); g.stroke();
    }
    g.fillStyle = '#26243A';
    g.font = '800 30px Manrope, system-ui, sans-serif';
    g.fillText('Farah Nisa', 30, 54);
    g.font = '500 19px Inter, system-ui, sans-serif';
    g.fillStyle = '#4A4760';
    ['2017 · UiTM', '2020 · enterprise IT', '2024 · data + UI/UX', '2025 · Astro AWANI', '→ read more'].forEach((line, i) => g.fillText(line, 30, 98 + i * 34));
    ['ideas → prototypes', 'prototypes → products', '', 'useful, clear, human'].forEach((line, i) => g.fillText(line, w / 2 + 30, 98 + i * 34));
    g.strokeStyle = '#B8A4E3';
    g.lineWidth = 3;
    g.beginPath();
    g.ellipse(w / 2 + 128, 290, 110, 22, -0.05, 0, Math.PI * 2);
    g.stroke();
  });
}

function consoleTexture() {
  return canvasTexture(128, 88, (g, w) => {
    g.fillStyle = '#26243A';
    g.fillRect(0, 0, w, 88);
    g.fillStyle = '#CFF3E0';
    g.font = '700 22px "JetBrains Mono", monospace';
    g.fillText('PLAY', 30, 50);
    g.fillStyle = '#F2C7AE';
    g.fillRect(14, 62, 100, 6);
  });
}

function siteTexture() {
  return canvasTexture(512, 308, (g) => {
    g.fillStyle = '#F8F6F2';
    g.fillRect(0, 0, 512, 308);
    roundRect(g, 24, 24, 260, 26, 8); g.fillStyle = '#26243A'; g.fill();
    roundRect(g, 24, 64, 200, 14, 7); g.fillStyle = '#A9A4B8'; g.fill();
    roundRect(g, 300, 24, 188, 150, 16); g.fillStyle = '#B8D4C5'; g.fill();
  });
}
