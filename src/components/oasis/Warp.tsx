"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  InstancedMesh,
  MathUtils,
  MeshBasicMaterial,
  Object3D,
} from "three";
import type { Phase } from "./constants";

const COUNT = 700;

/** Deterministic PRNG so the streak field is stable across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const NEAR = 80;
const FAR = -120;

/** Light streaks rushing past the camera — the hyperspace jump. */
export default function Warp({ phase }: { phase: Phase }) {
  const mesh = useRef<InstancedMesh>(null);
  const material = useRef<MeshBasicMaterial>(null);
  const speed = useRef(6);
  const dummy = useMemo(() => new Object3D(), []);

  const streaks = useMemo(() => {
    const random = mulberry32(2045);
    return Array.from({ length: COUNT }, (_, i) => {
        const angle = random() * Math.PI * 2;
        const radius = 2.5 + random() * 22;
        return {
          x: Math.cos(angle) * radius,
          y: 3 + Math.sin(angle) * radius * 0.8,
          z: FAR + random() * (NEAR - FAR),
          pink: i % 3 === 0,
        };
      });
  }, []);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    const pink = new Color("#ff3df2").multiplyScalar(2.5);
    const cyan = new Color("#3ff6ff").multiplyScalar(2.5);
    streaks.forEach((s, i) => mesh.current!.setColorAt(i, s.pink ? pink : cyan));
    mesh.current.instanceColor!.needsUpdate = true;
  }, [streaks]);

  useFrame((_, delta) => {
    if (!mesh.current || !material.current) return;
    const target = phase === "warp" ? 190 : phase === "boot" ? 6 : 0;
    speed.current = MathUtils.damp(speed.current, target, phase === "warp" ? 1.8 : 3, delta);
    const opacityTarget = phase === "world" ? 0 : 1;
    material.current.opacity = MathUtils.damp(
      material.current.opacity,
      opacityTarget,
      2,
      delta,
    );
    mesh.current.visible = material.current.opacity > 0.01;
    if (!mesh.current.visible) return;

    const stretch = 1 + speed.current * 0.09;
    streaks.forEach((s, i) => {
      s.z += speed.current * delta;
      if (s.z > NEAR) s.z -= NEAR - FAR;
      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.set(1, 1, stretch);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.04, 0.04, 0.6]} />
      <meshBasicMaterial
        ref={material}
        transparent
        blending={AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
