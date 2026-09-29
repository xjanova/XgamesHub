"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  Vector3,
} from "three";
import { NOVA_POSITION } from "./constants";

const PINK = new Color("#ff3df2");
const CYAN = new Color("#3ff6ff");

type NovaProps = {
  /** World-space point Nova should look at (e.g. a hovered portal). */
  focus: Vector3 | null;
  /** Bumping this number makes Nova wave. */
  waveSignal: number;
  onPoke: () => void;
};

/**
 * Nova — XgamesHub's guide. A floating pearl robot with a visor face,
 * glowing eyes, an antenna beacon, orbiting halo and hover-jet.
 * Built from primitives so it needs no model download.
 */
export default function Nova({ focus, waveSignal, onPoke }: NovaProps) {
  const root = useRef<Group>(null);
  const head = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const leftHand = useRef<Group>(null);
  const rightHand = useRef<Group>(null);
  const halo = useRef<Group>(null);
  const jet = useRef<Mesh>(null);
  const beacon = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);
  const glow = useRef<PointLight>(null);

  const waveStart = useRef(-10);
  const nextBlink = useRef(2);
  const lookTarget = useMemo(() => new Vector3(), []);
  const localTarget = useMemo(() => new Vector3(), []);

  useEffect(() => {
    waveStart.current = performance.now() / 1000;
  }, [waveSignal]);

  const shell = useMemo(
    () => ({
      color: "#f5f2ff",
      roughness: 0.18,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const now = performance.now() / 1000;
    if (!root.current || !head.current) return;

    // Idle hover bob + gentle sway
    root.current.position.y = NOVA_POSITION.y + Math.sin(t * 1.6) * 0.18;
    root.current.rotation.z = Math.sin(t * 0.9) * 0.05;

    // Head tracks the focus point, or the pointer when nothing is focused
    if (focus) {
      lookTarget.copy(focus);
    } else {
      lookTarget.set(state.pointer.x * 8, 2.6 + state.pointer.y * 4, 14);
    }
    localTarget.copy(lookTarget).sub(root.current.position);
    const yaw = Math.atan2(localTarget.x, localTarget.z);
    const pitch = -Math.atan2(
      localTarget.y - 0.9,
      Math.hypot(localTarget.x, localTarget.z),
    );
    head.current.rotation.y = MathUtils.damp(
      head.current.rotation.y,
      MathUtils.clamp(yaw, -1.1, 1.1),
      5,
      delta,
    );
    head.current.rotation.x = MathUtils.damp(
      head.current.rotation.x,
      MathUtils.clamp(pitch, -0.5, 0.4),
      5,
      delta,
    );
    // Body follows the head a little
    root.current.rotation.y = MathUtils.damp(
      root.current.rotation.y,
      head.current.rotation.y * 0.35,
      3,
      delta,
    );

    // Blink
    if (eyes.current) {
      if (t > nextBlink.current) {
        const k = (t - nextBlink.current) / 0.16;
        eyes.current.scale.y = k < 1 ? Math.max(0.1, Math.abs(1 - 2 * k)) : 1;
        if (k >= 1) nextBlink.current = t + 2.5 + Math.random() * 3;
      }
    }

    // Hands: idle float, right hand waves after a signal
    const waving = now - waveStart.current;
    if (leftHand.current) {
      leftHand.current.position.y = -0.55 + Math.sin(t * 2 + 1) * 0.08;
    }
    if (rightHand.current) {
      if (waving < 2.4) {
        const lift = Math.min(1, waving * 4) * Math.min(1, (2.4 - waving) * 3);
        rightHand.current.position.set(
          1.05 + lift * 0.15,
          -0.55 + lift * 1.25,
          0.15,
        );
        rightHand.current.rotation.z = Math.sin(waving * 14) * 0.6 * lift;
      } else {
        rightHand.current.position.set(
          1.05,
          -0.55 + Math.sin(t * 2) * 0.08,
          0.15,
        );
        rightHand.current.rotation.z = 0;
      }
    }

    if (halo.current) {
      halo.current.rotation.z += delta * 0.8;
      halo.current.rotation.x = 1.2 + Math.sin(t * 0.7) * 0.15;
    }
    if (jet.current) {
      const flicker = 1 + Math.sin(t * 40) * 0.08 + Math.sin(t * 17) * 0.06;
      jet.current.scale.set(1, flicker, 1);
    }
    const pulse = 0.5 + 0.5 * Math.sin(t * 3);
    if (beacon.current) {
      (beacon.current.material as MeshStandardMaterial).emissiveIntensity =
        2 + pulse * 4;
    }
    if (core.current) {
      core.current.rotation.y += delta * 1.5;
      (core.current.material as MeshStandardMaterial).emissive
        .copy(PINK)
        .lerp(CYAN, pulse);
    }
    if (glow.current) glow.current.intensity = 3 + pulse * 3;
  });

  return (
    <group
      ref={root}
      position={NOVA_POSITION}
      scale={0.85}
      onClick={(e) => {
        e.stopPropagation();
        onPoke();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <pointLight
        ref={glow}
        color={PINK}
        distance={9}
        decay={2}
        position={[0, -0.6, 0.8]}
      />

      {/* ---------- Head ---------- */}
      <group ref={head} position={[0, 0.85, 0]}>
        <mesh scale={[1.12, 0.96, 1]} castShadow>
          <sphereGeometry args={[0.82, 48, 48]} />
          <meshPhysicalMaterial {...shell} />
        </mesh>

        {/* Visor face */}
        <mesh position={[0, -0.02, 0.36]} scale={[0.92, 0.66, 0.55]}>
          <sphereGeometry args={[0.82, 48, 48]} />
          <meshPhysicalMaterial
            color="#07051a"
            roughness={0.08}
            metalness={0.6}
            clearcoat={1}
          />
        </mesh>

        {/* Eyes */}
        <group ref={eyes} position={[0, 0.02, 0.86]}>
          {[-0.26, 0.26].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <capsuleGeometry args={[0.075, 0.16, 8, 16]} />
              <meshStandardMaterial
                color="#000"
                emissive={CYAN}
                emissiveIntensity={6}
                toneMapped={false}
              />
            </mesh>
          ))}
          {/* Little smile */}
          <mesh position={[0, -0.2, -0.02]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.1, 0.018, 8, 24, Math.PI]} />
            <meshStandardMaterial
              color="#000"
              emissive={CYAN}
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Ear pods */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.9, 0.02, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 32]} />
              <meshPhysicalMaterial {...shell} />
            </mesh>
            <mesh
              position={[side * 0.075, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <torusGeometry args={[0.15, 0.03, 12, 32]} />
              <meshStandardMaterial
                color="#000"
                emissive={PINK}
                emissiveIntensity={5}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* Antenna */}
        <mesh position={[0.18, 0.95, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.018, 0.025, 0.42, 8]} />
          <meshStandardMaterial color="#c9c3ff" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh ref={beacon} position={[0.24, 1.18, 0]}>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial
            color="#000"
            emissive={PINK}
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ---------- Body ---------- */}
      <mesh position={[0, -0.45, 0]} scale={[1, 1.05, 0.9]} castShadow>
        <sphereGeometry args={[0.55, 40, 40]} />
        <meshPhysicalMaterial {...shell} />
      </mesh>
      {/* Chest core */}
      <mesh ref={core} position={[0, -0.38, 0.48]}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color="#000"
          emissive={PINK}
          emissiveIntensity={6}
          toneMapped={false}
        />
      </mesh>
      {/* Neck ring */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.05, 12, 40]} />
        <meshStandardMaterial
          color="#000"
          emissive={CYAN}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* ---------- Floating hands ---------- */}
      {[
        { ref: leftHand, x: -1.05 },
        { ref: rightHand, x: 1.05 },
      ].map(({ ref, x }) => (
        <group key={x} ref={ref} position={[x, -0.55, 0.15]}>
          <mesh scale={[1, 1.15, 0.9]}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshPhysicalMaterial {...shell} />
          </mesh>
          <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.025, 8, 32]} />
            <meshStandardMaterial
              color="#000"
              emissive={PINK}
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/* ---------- Halo ---------- */}
      <group ref={halo} position={[0, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[1.55, 0.018, 8, 128]} />
          <meshStandardMaterial
            color="#000"
            emissive={CYAN}
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0]}
            >
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial
                color="#000"
                emissive={i === 0 ? PINK : CYAN}
                emissiveIntensity={6}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* ---------- Hover jet ---------- */}
      <mesh ref={jet} position={[0, -1.35, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.28, 0.9, 32, 1, true]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.55}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
