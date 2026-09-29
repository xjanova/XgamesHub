"use client";

import { Sparkles, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  Group,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
} from "three";
import { GATE_Z } from "./constants";

/* ------------------------------------------------------------------ */
/* Infinite synthwave grid floor                                       */
/* ------------------------------------------------------------------ */

const gridVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const gridFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uFog;
  varying vec3 vWorld;

  float gridLine(vec2 coord, float width) {
    vec2 g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - clamp(min(g.x, g.y) / width, 0.0, 1.0);
  }

  void main() {
    vec2 p = vWorld.xz / 2.5;
    p.y += uTime * uSpeed;
    float fine = gridLine(p, 1.2);
    float major = gridLine(p / 4.0, 1.8);
    float dist = length(vWorld.xz);
    vec3 line = mix(uColorA, uColorB, smoothstep(10.0, 120.0, dist));
    vec3 col = uFog + line * (fine * 0.9 + major * 1.6);
    // glow pool around the hub centre
    col += uColorA * 0.25 * smoothstep(22.0, 0.0, dist);
    float fade = smoothstep(190.0, 40.0, dist);
    gl_FragColor = vec4(mix(uFog, col, fade), 1.0);
  }
`;

export function SynthGrid({ speed }: { speed: number }) {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uColorA: { value: new Color("#ff3df2") },
      uColorB: { value: new Color("#3ff6ff") },
      uFog: { value: new Color("#05010f") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms;
    u.uTime.value += delta;
    u.uSpeed.value += (speed - u.uSpeed.value) * Math.min(1, delta * 2);
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
      <planeGeometry args={[420, 420, 1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Retro striped sun on the horizon                                    */
/* ------------------------------------------------------------------ */

const sunFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    vec3 top = vec3(1.0, 0.86, 0.3);
    vec3 bottom = vec3(1.0, 0.15, 0.62);
    vec3 col = mix(bottom, top, smoothstep(-0.9, 0.8, p.y)) * 1.05;
    // horizontal cut-outs in the lower half, drifting downward
    float band = fract(p.y * 7.0 + uTime * 0.25);
    float cutWidth = smoothstep(0.15, -0.9, p.y) * 0.55;
    if (p.y < 0.15 && band < cutWidth) discard;
    float edge = smoothstep(1.0, 0.96, r);
    gl_FragColor = vec4(col, edge);
  }
`;

const basicVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function RetroSun() {
  const material = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
  });
  return (
    <group position={[0, 17, -200]}>
      <mesh>
        <circleGeometry args={[34, 96]} />
        <shaderMaterial
          ref={material}
          vertexShader={basicVertex}
          fragmentShader={sunFragment}
          uniforms={uniforms}
          transparent
          toneMapped={false}
          fog={false}
        />
      </mesh>
      {/* soft halo */}
      <mesh position={[0, 0, -1]}>
        <circleGeometry args={[62, 64]} />
        <meshBasicMaterial
          color="#ff3df2"
          transparent
          opacity={0.05}
          blending={AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Wireframe mountain ranges framing the valley                        */
/* ------------------------------------------------------------------ */

function mountainGeometry(seed: number) {
  const geo = new PlaneGeometry(260, 60, 90, 24);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // valley in the middle, peaks toward the sides
    const side = Math.min(1, Math.max(0, (Math.abs(x) - 26) / 50));
    const n =
      Math.sin(x * 0.11 + seed) * Math.cos(y * 0.21 + seed * 2) +
      Math.sin(x * 0.037 + seed * 3) * 1.6 +
      Math.sin(x * 0.29 + y * 0.17) * 0.35;
    const h = Math.max(0, (n + 1.4) * 9 * side * ((y + 30) / 60));
    pos.setZ(i, h);
  }
  geo.computeVertexNormals();
  return geo;
}

export function Mountains() {
  const geometry = useMemo(() => mountainGeometry(1.7), []);
  return (
    <group position={[0, 0, -120]} rotation-x={-Math.PI / 2}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#08021a"
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#b43dff" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Entrance gate the camera flies through                              */
/* ------------------------------------------------------------------ */

export function EntranceGate() {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);
  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.z += delta * 0.15;
    if (inner.current) inner.current.rotation.z -= delta * 0.35;
  });

  const segments = 24;
  return (
    <group position={[0, 5.2, GATE_Z]}>
      <group ref={outer}>
        <mesh>
          <torusGeometry args={[7.2, 0.22, 16, 160]} />
          <meshStandardMaterial
            color="#000"
            emissive="#ff3df2"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
        {Array.from({ length: segments }, (_, i) => {
          const a = (i / segments) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 8, Math.sin(a) * 8, 0]}
              rotation-z={a}
            >
              <boxGeometry args={[0.9, 0.18, 0.18]} />
              <meshStandardMaterial
                color="#000"
                emissive={i % 3 === 0 ? "#3ff6ff" : "#7a3dff"}
                emissiveIntensity={3}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>
      <group ref={inner}>
        <mesh>
          <torusGeometry args={[6.3, 0.06, 8, 160]} />
          <meshStandardMaterial
            color="#000"
            emissive="#3ff6ff"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Hex platform under Nova                                             */
/* ------------------------------------------------------------------ */

export function HubPlatform() {
  const rings = useRef<Group>(null);
  useFrame((state) => {
    if (!rings.current) return;
    const t = state.clock.elapsedTime;
    rings.current.children.forEach((child, i) => {
      const s = ((t * 0.35 + i / 3) % 1) * 1.0;
      child.scale.setScalar(1 + s * 2.2);
      const mat = (child as Mesh).material as { opacity: number };
      mat.opacity = (1 - s) * 0.7;
    });
  });

  return (
    <group position={[0, 0, 2.5]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[2.6, 2.9, 0.24, 6]} />
        <meshStandardMaterial color="#120832" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[2.2, 2.45, 6]} />
        <meshStandardMaterial
          color="#000"
          emissive="#3ff6ff"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
      <group ref={rings} position={[0, 0.26, 0]} rotation-x={-Math.PI / 2}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <ringGeometry args={[1.2, 1.28, 64]} />
            <meshBasicMaterial
              color="#ff3df2"
              transparent
              blending={AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <Sparkles
        count={60}
        scale={[6, 5, 6]}
        position={[0, 2.5, 0]}
        size={3}
        speed={0.4}
        color="#3ff6ff"
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Floating wireframe data cubes for depth                             */
/* ------------------------------------------------------------------ */

export function DataCubes() {
  const group = useRef<Group>(null);
  const cubes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const r = 20 + (i % 4) * 7;
        return {
          position: [Math.cos(a) * r, 4 + (i % 5) * 2.4, Math.sin(a) * r - 10] as [
            number,
            number,
            number,
          ],
          size: 0.6 + (i % 3) * 0.5,
          color: i % 2 ? "#3ff6ff" : "#ff3df2",
          speed: 0.2 + (i % 4) * 0.12,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      c.rotation.x += delta * cubes[i].speed;
      c.rotation.y += delta * cubes[i].speed * 1.3;
      c.position.y = cubes[i].position[1] + Math.sin(t + i) * 0.6;
    });
  });

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.position}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshBasicMaterial
            color={c.color}
            wireframe
            toneMapped={false}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Sky() {
  return (
    <Stars radius={220} depth={60} count={4000} factor={5} fade speed={0.6} />
  );
}
