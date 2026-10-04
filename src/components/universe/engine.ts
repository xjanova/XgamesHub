import * as THREE from "three";
import {
  ATMO_FRAG,
  BAKE_FRAG,
  BAKE_VERT,
  HALO_FRAG,
  HALO_VERT,
  PLANET_FRAG,
  PLANET_VERT,
  POINTS_FRAG,
  POINTS_VERT,
  RING_FRAG,
  RING_VERT,
  SKY_FRAG,
  SKY_VERT,
} from "./shaders";

export type Palette = [string, string, string];
export type World = { palette: Palette; style: number; seed: number };

/**
 * One full-screen WebGL canvas fixed behind the page.
 *
 * - The sky is a cube map, re-rendered only while its tint is changing.
 * - Planet surfaces are baked once into equirect textures; the per-frame cost
 *   is a texture fetch plus lighting.
 * - Objects that belong to a section (the spotlight planet, the studio core)
 *   are children of the camera and are pinned every frame to the screen rect
 *   of a DOM "stage" element, so they scroll with the page while the camera
 *   flies through space behind them.
 */
export class HubEngine {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2500);
  private clock = new THREE.Clock();
  private raf = 0;
  private running = false;
  private motion: boolean;
  private needsRender = true;
  private time = 0;
  private w = 1;
  private h = 1;
  private dpr = 1;
  private maxDpr = 1.75;
  private slowFrames = 0;
  private texType: THREE.TextureDataType = THREE.UnsignedByteType;

  // sky
  private skyScene = new THREE.Scene();
  private skyMat!: THREE.ShaderMaterial;
  private cubeRT!: THREE.WebGLCubeRenderTarget;
  private cubeCam!: THREE.CubeCamera;
  private skyFrom = [new THREE.Color(), new THREE.Color(), new THREE.Color()];
  private skyTo = [new THREE.Color(), new THREE.Color(), new THREE.Color()];
  private skyT = 1;
  private skyDirty = true;

  // baking
  private bakeScene = new THREE.Scene();
  private bakeCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private bakeMat!: THREE.ShaderMaterial;

  // featured planet
  private hero = new THREE.Group();
  private heroSpin = new THREE.Group();
  private heroPlanet!: THREE.Mesh;
  private heroMat!: THREE.ShaderMaterial;
  private heroAtmo!: THREE.ShaderMaterial;
  private heroRing!: THREE.ShaderMaterial;
  private heroHalo!: THREE.ShaderMaterial;
  private heroMoon!: THREE.Mesh;
  private heroRT: THREE.WebGLRenderTarget[] = [];
  private heroFront = 0;
  private heroMix = 1;
  private heroPulse = 1;
  private rotY = 0.6;
  private rotV = 0.0025;
  private fovKick = 0;

  // studio core
  private core = new THREE.Group();
  private coreSpin = new THREE.Group();
  private orbit = new THREE.Group();
  private minis: THREE.Mesh[] = [];

  // background
  private stars!: THREE.Points;
  private dust!: THREE.Points;
  private pointMats: THREE.ShaderMaterial[] = [];
  private bigPlanets: THREE.Mesh[] = [];

  // input
  private mouse = new THREE.Vector2();
  private mouseS = new THREE.Vector2();
  private scrollS = 0;
  private camZ = 0;

  private lightDir = new THREE.Vector3(-0.62, 0.42, 0.66).normalize();
  private disposables: { dispose(): void }[] = [];

  constructor(private canvas: HTMLCanvasElement, opts: { motion: boolean }) {
    this.motion = opts.motion;
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    this.maxDpr = small ? 1.4 : 1.75;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !small,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x05060c, 1);
    const ext = this.renderer.extensions;
    if (ext.has("EXT_color_buffer_float") || ext.has("EXT_color_buffer_half_float")) {
      this.texType = THREE.HalfFloatType;
    }
    this.scene.add(this.camera);
    this.buildSky();
    this.buildBake();
    this.buildStars();
    this.buildHero();
    this.buildCore();
    this.buildBigPlanets();
    this.resize();
  }

  /* ------------------------------------------------------------------ build */

  private buildSky() {
    this.skyMat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uA: { value: new THREE.Color() },
        uB: { value: new THREE.Color() },
        uC: { value: new THREE.Color() },
      },
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(10, 64, 32), this.skyMat);
    this.skyScene.add(sky);
    this.cubeRT = new THREE.WebGLCubeRenderTarget(512, {
      type: this.texType,
      generateMipmaps: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    this.cubeCam = new THREE.CubeCamera(0.1, 100, this.cubeRT);
    this.scene.background = this.cubeRT.texture;
    this.disposables.push(this.cubeRT, sky.geometry, this.skyMat);
  }

  private buildBake() {
    this.bakeMat = new THREE.ShaderMaterial({
      vertexShader: BAKE_VERT,
      fragmentShader: BAKE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uA: { value: new THREE.Color() },
        uB: { value: new THREE.Color() },
        uC: { value: new THREE.Color() },
        uStyle: { value: 0 },
        uSeed: { value: 0 },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.bakeMat);
    quad.frustumCulled = false;
    this.bakeScene.add(quad);
    this.disposables.push(quad.geometry, this.bakeMat);
  }

  private makeRT(w: number, h: number) {
    const rt = new THREE.WebGLRenderTarget(w, h, {
      type: this.texType,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.RepeatWrapping,
    });
    rt.texture.anisotropy = 4;
    this.disposables.push(rt);
    return rt;
  }

  private bake(world: World, rt: THREE.WebGLRenderTarget) {
    const u = this.bakeMat.uniforms;
    u.uA.value.set(world.palette[0]);
    u.uB.value.set(world.palette[1]);
    u.uC.value.set(world.palette[2]);
    u.uStyle.value = world.style;
    u.uSeed.value = world.seed;
    this.renderer.setRenderTarget(rt);
    this.renderer.render(this.bakeScene, this.bakeCam);
    this.renderer.setRenderTarget(null);
  }

  private planetMaterial(rt: THREE.WebGLRenderTarget, accent: string, glow = 1) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: PLANET_VERT,
      fragmentShader: PLANET_FRAG,
      uniforms: {
        uTex0: { value: rt.texture },
        uTex1: { value: rt.texture },
        uMix: { value: 0 },
        uC0: { value: new THREE.Color(accent) },
        uC1: { value: new THREE.Color(accent) },
        uLight: { value: this.lightDir },
        uGlow: { value: glow },
      },
    });
    this.disposables.push(mat);
    return mat;
  }

  private atmoMaterial(color: string, power: number) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: PLANET_VERT,
      fragmentShader: ATMO_FRAG,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uLight: { value: this.lightDir },
        uPower: { value: power },
      },
    });
    this.disposables.push(mat);
    return mat;
  }

  private buildStars() {
    const rnd = mulberry(7);
    // far stars
    const N = 3200;
    const pos = new Float32Array(N * 3);
    const size = new Float32Array(N);
    const phase = new Float32Array(N);
    const col = new Float32Array(N * 3);
    const tints = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#cfd8ff"),
      new THREE.Color("#b9a4ff"),
      new THREE.Color("#c0ff4b"),
      new THREE.Color("#8ff3ff"),
    ];
    for (let i = 0; i < N; i++) {
      const v = randomDir(rnd).multiplyScalar(700 + rnd() * 500);
      pos.set([v.x, v.y, v.z], i * 3);
      const big = rnd() < 0.04;
      size[i] = big ? 2.6 + rnd() * 2.2 : 0.8 + rnd() * 1.5;
      phase[i] = rnd();
      const c = tints[rnd() < 0.82 ? (rnd() < 0.6 ? 0 : 1) : 2 + Math.floor(rnd() * 3)];
      const b = 0.35 + rnd() * 0.65;
      col.set([c.r * b, c.g * b, c.b * b], i * 3);
    }
    this.stars = this.points(pos, size, phase, col, 0);
    this.stars.renderOrder = -2;

    // dust drifting along the camera path: what makes scrolling feel like flying
    const M = 900;
    const dp = new Float32Array(M * 3);
    const ds = new Float32Array(M);
    const dph = new Float32Array(M);
    const dc = new Float32Array(M * 3);
    const dt = [new THREE.Color("#7c5cff"), new THREE.Color("#5ee7ff"), new THREE.Color("#c0ff4b"), new THREE.Color("#ffffff")];
    for (let i = 0; i < M; i++) {
      let x = 0;
      let y = 0;
      do {
        x = (rnd() - 0.5) * 140;
        y = (rnd() - 0.5) * 90;
      } while (Math.hypot(x, y) < 9);
      dp.set([x, y, 30 - rnd() * 360], i * 3);
      ds[i] = 1.2 + rnd() * 3.5;
      dph[i] = rnd();
      const c = dt[Math.floor(rnd() * dt.length)];
      const b = 0.25 + rnd() * 0.45;
      dc.set([c.r * b, c.g * b, c.b * b], i * 3);
    }
    this.dust = this.points(dp, ds, dph, dc, 160);
    this.dust.renderOrder = -1;
  }

  private points(pos: Float32Array, size: Float32Array, phase: Float32Array, col: Float32Array, atten: number) {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    const m = new THREE.ShaderMaterial({
      vertexShader: POINTS_VERT,
      fragmentShader: POINTS_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPR: { value: 1 }, uAtten: { value: atten } },
    });
    const p = new THREE.Points(g, m);
    p.frustumCulled = false;
    this.scene.add(p);
    this.pointMats.push(m);
    this.disposables.push(g, m);
    return p;
  }

  private buildHero() {
    this.heroRT = [this.makeRT(1024, 512), this.makeRT(1024, 512)];
    this.heroMat = this.planetMaterial(this.heroRT[0], "#6ff0ff", 1.1);
    const sphere = new THREE.SphereGeometry(1, 96, 64);
    this.heroPlanet = new THREE.Mesh(sphere, this.heroMat);
    this.heroAtmo = this.atmoMaterial("#6ff0ff", 1.6);
    const atmo = new THREE.Mesh(sphere, this.heroAtmo);
    atmo.scale.setScalar(1.14);

    this.heroRing = new THREE.ShaderMaterial({
      vertexShader: RING_VERT,
      fragmentShader: RING_FRAG,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uA: { value: new THREE.Color("#c9d2ff") },
        uB: { value: new THREE.Color("#6b4cff") },
        uTime: { value: 0 },
        uInner: { value: 1.42 },
        uOuter: { value: 2.45 },
      },
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.42, 2.45, 160, 1), this.heroRing);
    ring.renderOrder = 2;

    this.heroHalo = new THREE.ShaderMaterial({
      vertexShader: HALO_VERT,
      fragmentShader: HALO_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uColor: { value: new THREE.Color("#6b4cff") }, uStrength: { value: 0.55 } },
    });
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 5.2), this.heroHalo);
    halo.position.z = -1.6;
    halo.renderOrder = -1;

    // dashed orbit with a little moon
    const curve = new THREE.EllipseCurve(0, 0, 3.0, 3.0, 0, Math.PI * 2);
    const og = new THREE.BufferGeometry().setFromPoints(curve.getPoints(200).map((p) => new THREE.Vector3(p.x, 0, p.y)));
    const orbitLine = new THREE.Line(
      og,
      new THREE.LineDashedMaterial({ color: 0xc0ff4b, dashSize: 0.08, gapSize: 0.12, transparent: true, opacity: 0.45 }),
    );
    orbitLine.computeLineDistances();
    const moonRT = this.makeRT(256, 128);
    this.bake({ palette: ["#d9dde8", "#5a6078", "#c0ff4b"], style: 2, seed: 4.2 }, moonRT);
    const moonMat = this.planetMaterial(moonRT, "#c0ff4b", 1.4);
    this.heroMoon = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16), moonMat);

    const tilt = new THREE.Group();
    tilt.rotation.set(0.32, 0, -0.28);
    const ringTilt = new THREE.Group();
    ringTilt.rotation.x = Math.PI / 2 - 0.22;
    ringTilt.add(ring);
    const orbitTilt = new THREE.Group();
    orbitTilt.rotation.set(0.18, 0, 0.12);
    orbitTilt.add(orbitLine, this.heroMoon);

    this.heroSpin.add(this.heroPlanet);
    tilt.add(this.heroSpin, atmo, ringTilt, orbitTilt);
    this.hero.add(halo, tilt);
    this.hero.visible = false;
    this.camera.add(this.hero);
    this.disposables.push(sphere, ring.geometry, halo.geometry, og, orbitLine.material as THREE.Material, this.heroRing, this.heroHalo);
  }

  private buildCore() {
    // the XMAN "X": two crossing bars, same geometry as the favicon
    const bars = [
      [12, 15, 25, 15, 52, 49, 39, 49],
      [39, 15, 52, 15, 25, 49, 12, 49],
    ].map((b) => {
      const s = new THREE.Shape();
      const pt = (i: number) => new THREE.Vector2((b[i] - 32) / 18, -(b[i + 1] - 32) / 18);
      s.moveTo(pt(0).x, pt(0).y);
      for (let i = 2; i < 8; i += 2) s.lineTo(pt(i).x, pt(i).y);
      s.closePath();
      return s;
    });
    const xg = new THREE.ExtrudeGeometry(bars, {
      depth: 0.34,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
    xg.center();
    const xm = new THREE.MeshStandardMaterial({
      color: 0xc0ff4b,
      emissive: 0x7dbb1a,
      emissiveIntensity: 0.55,
      roughness: 0.28,
      metalness: 0.45,
    });
    const x = new THREE.Mesh(xg, xm);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(xg, 30),
      new THREE.LineBasicMaterial({ color: 0xf0ffd0, transparent: true, opacity: 0.55 }),
    );
    x.add(edges);
    this.coreSpin.add(x);

    const ringA = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.012, 8, 180),
      new THREE.MeshBasicMaterial({ color: 0xc0ff4b, transparent: true, opacity: 0.7 }),
    );
    ringA.rotation.x = Math.PI / 2 - 0.35;
    const ringB = new THREE.Mesh(
      new THREE.TorusGeometry(2.35, 0.008, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0x8b5cff, transparent: true, opacity: 0.6 }),
    );
    ringB.rotation.set(Math.PI / 2 + 0.5, 0.3, 0);
    this.orbit.rotation.set(0.42, 0, -0.18);

    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.ShaderMaterial({
        vertexShader: HALO_VERT,
        fragmentShader: HALO_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#5d7d1c") }, uStrength: { value: 0.6 } },
      }),
    );
    halo.position.z = -1.2;

    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(-3, 4, 5);
    this.core.add(key.target);
    const rim = new THREE.PointLight(0x8b5cff, 30, 12);
    rim.position.set(2.5, -1.5, 1.5);
    const fill = new THREE.PointLight(0xc0ff4b, 12, 10);
    fill.position.set(-2, -2, 3);
    this.core.add(new THREE.AmbientLight(0x6070a0, 0.8), key, rim, fill, halo, this.coreSpin, ringA, ringB, this.orbit);
    this.core.visible = false;
    this.camera.add(this.core);
    this.disposables.push(xg, xm, edges.geometry, edges.material as THREE.Material, ringA.geometry, ringB.geometry, halo.geometry);
  }

  /** The ten worlds orbiting the studio core, one per game. */
  setWorlds(worlds: World[]) {
    for (const m of this.minis) this.orbit.remove(m);
    this.minis = [];
    const g = new THREE.SphereGeometry(0.17, 40, 24);
    this.disposables.push(g);
    worlds.forEach((w, i) => {
      const rt = this.makeRT(256, 128);
      this.bake(w, rt);
      const mesh = new THREE.Mesh(g, this.planetMaterial(rt, w.palette[2], 1.3));
      const a = (i / worlds.length) * Math.PI * 2;
      mesh.userData.a = a;
      mesh.position.set(Math.cos(a) * 2.95, 0, Math.sin(a) * 2.95);
      this.orbit.add(mesh);
      this.minis.push(mesh);
    });
    this.needsRender = true;
  }

  private buildBigPlanets() {
    const defs: { w: World; pos: [number, number, number]; r: number; atmo: string }[] = [
      { w: { palette: ["#7d5cff", "#1d1450", "#9fe8ff"], style: 0, seed: 1.7 }, pos: [-150, -78, -420], r: 70, atmo: "#7d5cff" },
      { w: { palette: ["#c0ff4b", "#14303a", "#c0ff4b"], style: 2, seed: 8.1 }, pos: [-260, 40, -520], r: 24, atmo: "#c0ff4b" },
    ];
    const g = new THREE.SphereGeometry(1, 64, 40);
    this.disposables.push(g);
    for (const d of defs) {
      const rt = this.makeRT(512, 256);
      this.bake(d.w, rt);
      const m = new THREE.Mesh(g, this.planetMaterial(rt, d.w.palette[2], 0.8));
      m.position.set(...d.pos);
      m.scale.setScalar(d.r);
      const a = new THREE.Mesh(g, this.atmoMaterial(d.atmo, 1.1));
      a.scale.setScalar(1.12);
      m.add(a);
      this.scene.add(m);
      this.bigPlanets.push(m);
    }
  }

  /* ---------------------------------------------------------------- control */

  /** Switch the spotlight world: bake into the back buffer, then cross-fade. */
  setFeatured(world: World, animate = true) {
    const back = 1 - this.heroFront;
    this.bake(world, this.heroRT[back]);
    const u = this.heroMat.uniforms;
    if (!animate) {
      u.uTex0.value = this.heroRT[back].texture;
      u.uTex1.value = this.heroRT[back].texture;
      u.uC0.value.set(world.palette[2]);
      u.uC1.value.set(world.palette[2]);
      u.uMix.value = 0;
      this.heroMix = 1;
    } else {
      u.uTex0.value = this.heroRT[this.heroFront].texture;
      u.uTex1.value = this.heroRT[back].texture;
      u.uC0.value.copy(u.uC1.value);
      u.uC1.value.set(world.palette[2]);
      u.uMix.value = 0;
      this.heroMix = 0;
      this.heroPulse = 0;
      this.fovKick = 1;
      this.rotV += 0.05;
    }
    this.heroFront = back;
    this.heroAtmo.uniforms.uColor.value.set(world.palette[2]);
    this.heroRing.uniforms.uA.value.set(world.palette[2]).lerp(new THREE.Color("#ffffff"), 0.45);
    this.heroRing.uniforms.uB.value.set(world.palette[0]);
    this.heroHalo.uniforms.uColor.value.set(world.palette[0]);
    this.setSky(world.palette, animate);
    this.needsRender = true;
  }

  private setSky(p: Palette, animate: boolean) {
    const u = this.skyMat.uniforms;
    // a little of the world's colour bleeds into the nebula, never all of it
    const base = [new THREE.Color("#6b46ff"), new THREE.Color("#241a6e"), new THREE.Color("#c0ff4b")];
    const target = p.map((c, i) => new THREE.Color(c).lerp(base[i], 0.55));
    for (let i = 0; i < 3; i++) {
      this.skyFrom[i].copy(animate ? [u.uA, u.uB, u.uC][i].value : target[i]);
      this.skyTo[i].copy(target[i]);
    }
    if (!animate) [u.uA, u.uB, u.uC].forEach((un, i) => un.value.copy(target[i]));
    this.skyT = animate ? 0 : 1;
    this.skyDirty = true;
  }

  spin(dx: number) {
    this.rotV += dx * 0.0009;
    this.needsRender = true;
    if (!this.motion) this.rotY += dx * 0.01;
  }

  pointer(x: number, y: number) {
    this.mouse.set(x, y);
    if (!this.motion) this.mouseS.copy(this.mouse);
  }

  setMotion(on: boolean) {
    this.motion = on;
    this.needsRender = true;
    if (on && !this.running) this.start();
  }

  invalidate() {
    this.needsRender = true;
    if (!this.motion && !this.raf) this.raf = requestAnimationFrame(this.frame);
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.w = w;
    this.h = h;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    for (const m of this.pointMats) m.uniforms.uPR.value = this.dpr;
    this.needsRender = true;
  }

  async warmup() {
    // Compile every program before the first visible frame (Windows/ANGLE
    // compiles are slow; doing it up front avoids a hitch on first scroll).
    this.hero.visible = true;
    this.core.visible = true;
    try {
      await this.renderer.compileAsync(this.scene, this.camera);
    } catch {
      /* older drivers: compile happens on first render instead */
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.getDelta();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  /* ------------------------------------------------------------------ frame */

  private frame = () => {
    this.raf = 0;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const animating = this.motion || this.skyT < 1 || this.heroMix < 1;
    if (this.running && (animating || this.needsRender)) {
      this.update(this.motion ? dt : animating ? dt : 0);
      this.render();
      this.needsRender = false;
      if (this.motion) this.adapt(dt);
    }
    if (this.running && (this.motion || this.skyT < 1 || this.heroMix < 1)) {
      this.raf = requestAnimationFrame(this.frame);
    }
  };

  private adapt(dt: number) {
    // Hold ~45 fps or better: step the pixel ratio down on slow machines.
    if (dt > 0.024) this.slowFrames++;
    else this.slowFrames = Math.max(0, this.slowFrames - 1);
    if (this.slowFrames > 90 && this.dpr > 1) {
      this.maxDpr = Math.max(1, this.dpr - 0.25);
      this.slowFrames = 0;
      this.resize();
    }
  }

  private update(dt: number) {
    this.time += dt;
    const k = this.motion ? 1 - Math.pow(0.0015, dt) : 1;

    // camera: scroll flies forward and turns a little, pointer adds parallax
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    this.scrollS += (p - this.scrollS) * (this.motion ? 1 - Math.pow(0.02, dt) : 1);
    this.mouseS.lerp(this.mouse, k * 0.6);
    this.camZ = -this.scrollS * 150;
    this.camera.position.set(this.mouseS.x * 0.8, -this.mouseS.y * 0.5, this.camZ);
    this.camera.rotation.set(-this.scrollS * 0.1 + this.mouseS.y * 0.02, this.scrollS * 0.42 - this.mouseS.x * 0.03, 0, "YXZ");
    if (this.fovKick > 0) this.fovKick = Math.max(0, this.fovKick - dt * 1.6);
    const fov = 45 + Math.sin(this.fovKick * Math.PI) * 4;
    if (Math.abs(this.camera.fov - fov) > 1e-3) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }

    for (const m of this.pointMats) m.uniforms.uTime.value = this.time;

    // sky tint
    if (this.skyT < 1) {
      this.skyT = Math.min(1, this.skyT + dt / 1.2);
      const e = ease(this.skyT);
      const u = this.skyMat.uniforms;
      [u.uA, u.uB, u.uC].forEach((un, i) => un.value.copy(this.skyFrom[i]).lerp(this.skyTo[i], e));
      this.skyDirty = true;
    }

    // spotlight planet
    if (this.heroMix < 1) {
      this.heroMix = Math.min(1, this.heroMix + dt / 1.1);
      this.heroMat.uniforms.uMix.value = ease(this.heroMix);
      if (this.heroMix >= 1) {
        const u = this.heroMat.uniforms;
        u.uTex0.value = u.uTex1.value;
        u.uC0.value.copy(u.uC1.value);
        u.uMix.value = 0;
      }
    }
    if (this.heroPulse < 1) this.heroPulse = Math.min(1, this.heroPulse + dt / 0.9);
    this.rotV += (0.0025 - this.rotV) * (this.motion ? 1 - Math.pow(0.25, dt) : 1);
    this.rotY += this.motion ? this.rotV * dt * 60 : 0;
    this.heroSpin.rotation.y = this.rotY;
    this.heroRing.uniforms.uTime.value = this.time;
    const ma = this.time * 0.35;
    this.heroMoon.position.set(Math.cos(ma) * 3.0, 0, Math.sin(ma) * 3.0);
    this.heroMoon.rotation.y = this.time * 0.6;
    this.pin(this.hero, "spotlight-stage", 0.3, 0.225);
    const pulse = 0.9 + 0.1 * ease(this.heroPulse);
    this.hero.scale.multiplyScalar(pulse);
    this.hero.rotation.set(this.mouseS.y * 0.08, this.mouseS.x * 0.12, 0);

    // studio core
    this.coreSpin.rotation.y = Math.sin(this.time * 0.5) * 0.45 + this.mouseS.x * 0.3;
    this.coreSpin.rotation.x = this.mouseS.y * 0.2;
    this.orbit.rotation.y = this.time * 0.12;
    for (const m of this.minis) m.rotation.y = this.time * 0.8 + m.userData.a;
    this.pin(this.core, "core-stage", 0.24, 0.24);

    for (const b of this.bigPlanets) b.rotation.y = this.time * 0.01;
  }

  /** Place a camera-child group so it sits on a DOM element's screen rect. */
  private pin(group: THREE.Group, id: string, fy: number, fx: number) {
    const el = document.getElementById(id);
    if (!el) {
      group.visible = false;
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.bottom < -r.height * 0.5 || r.top > this.h + r.height * 0.5) {
      group.visible = false;
      return;
    }
    group.visible = true;
    const D = 12;
    const wpp = (2 * D * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))) / this.h;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    group.position.set((cx - this.w / 2) * wpp, -(cy - this.h / 2) * wpp, -D);
    // narrow stages (phones) get a smaller world so the ring stays inside the card
    const kx = r.width < 520 ? fx * 0.86 : fx;
    group.scale.setScalar(Math.min(r.height * fy, r.width * kx) * wpp);
  }

  private render() {
    if (this.skyDirty) {
      this.cubeCam.update(this.renderer, this.skyScene);
      this.skyDirty = false;
    }
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    for (const d of this.disposables) d.dispose();
    this.renderer.dispose();
  }
}

/* ---------------------------------------------------------------- helpers */

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function mulberry(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomDir(rnd: () => number) {
  const u = rnd() * 2 - 1;
  const t = rnd() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return new THREE.Vector3(s * Math.cos(t), u, s * Math.sin(t));
}
