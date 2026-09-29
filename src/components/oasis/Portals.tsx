"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  ShaderMaterial,
} from "three";
import type { Game } from "@/data/games";
import { portalLayout } from "./constants";
import { emojiTexture, labelTexture } from "./textures";

const vortexVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const vortexFragment = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float a = atan(p.y, p.x);
    float speed = 1.5 + uHover * 3.0;
    float swirl = sin(a * 5.0 + log(r + 0.05) * 9.0 - uTime * speed) * 0.5 + 0.5;
    float rings = sin(r * 26.0 - uTime * (2.0 + uHover * 4.0)) * 0.5 + 0.5;
    float body = mix(swirl, rings, 0.35);
    vec3 col = uColor * (0.25 + body * (1.1 + uHover));
    col += vec3(1.0) * pow(1.0 - r, 5.0) * (0.6 + uHover);
    float alpha = smoothstep(1.0, 0.85, r) * (0.75 + 0.25 * uHover);
    gl_FragColor = vec4(col, alpha);
  }
`;

type PortalProps = {
  game: Game;
  index: number;
  total: number;
  hovered: boolean;
  selected: boolean;
  /** Another portal is selected — step back so it stands out. */
  dimmed: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
};

function Portal({
  game,
  index,
  total,
  hovered,
  selected,
  dimmed,
  onHover,
  onSelect,
}: PortalProps) {
  const slot = useMemo(() => portalLayout(total)[index], [total, index]);
  const root = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const emoji = useRef<Group>(null);
  const vortex = useRef<ShaderMaterial>(null);

  const textures = useMemo(
    () => ({
      emoji: emojiTexture(game.emoji),
      label: labelTexture(game.title, game.genre, game.color),
    }),
    [game],
  );
  useEffect(
    () => () => {
      textures.emoji.dispose();
      textures.label.dispose();
    },
    [textures],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: index * 3.1 },
      uHover: { value: 0 },
      uColor: { value: new Color(game.color) },
    }),
    [game.color, index],
  );

  const active = hovered || selected;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (vortex.current) {
      const u = vortex.current.uniforms;
      u.uTime.value += delta;
      u.uHover.value = MathUtils.damp(u.uHover.value, active ? 1 : 0, 6, delta);
    }
    if (root.current) {
      const s = MathUtils.damp(
        root.current.scale.x,
        active ? 1.12 : dimmed ? 0.7 : 1,
        6,
        delta,
      );
      root.current.scale.setScalar(s);
      root.current.position.y = slot.position.y + Math.sin(t * 1.2 + index) * 0.15;
    }
    if (ring.current) ring.current.rotation.z += delta * (active ? 1.6 : 0.4);
    if (emoji.current) {
      emoji.current.position.y = Math.sin(t * 2 + index) * 0.12;
      emoji.current.rotation.y = Math.sin(t * 0.8 + index) * 0.3;
    }
  });

  return (
    <group
      ref={root}
      position={slot.position}
      rotation-y={slot.rotationY}
      scale={0.01}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(game.slug);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(game.slug);
      }}
    >
      {/* Vortex surface */}
      <mesh>
        <circleGeometry args={[2.1, 64]} />
        <shaderMaterial
          ref={vortex}
          vertexShader={vortexVertex}
          fragmentShader={vortexFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Frame rings */}
      <mesh>
        <torusGeometry args={[2.2, 0.09, 16, 96]} />
        <meshStandardMaterial
          color="#000"
          emissive={game.color}
          emissiveIntensity={active ? 7 : 3.5}
          toneMapped={false}
        />
      </mesh>
      <group ref={ring}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 2.55, Math.sin(a) * 2.55, 0]}
              rotation-z={a}
            >
              <boxGeometry args={[0.36, 0.07, 0.07]} />
              <meshStandardMaterial
                color="#000"
                emissive={i % 2 ? game.color : "#ffffff"}
                emissiveIntensity={2.5}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* Emoji hologram */}
      <group ref={emoji} position={[0, 0, 0.25]}>
        <mesh>
          <planeGeometry args={[1.9, 1.9]} />
          <meshBasicMaterial
            map={textures.emoji}
            transparent
            depthWrite={false}
            toneMapped={false}
            side={DoubleSide}
          />
        </mesh>
      </group>

      {/* Name plate */}
      <mesh position={[0, 3.25, 0]}>
        <planeGeometry args={[4.4, 1.1]} />
        <meshBasicMaterial
          map={textures.label}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Light beam down to the floor */}
      <mesh position={[0, -2.4, 0]}>
        <cylinderGeometry args={[0.05, 0.9, 1.6, 24, 1, true]} />
        <meshBasicMaterial
          color={game.color}
          transparent
          opacity={active ? 0.5 : 0.22}
          blending={AdditiveBlending}
          depthWrite={false}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={game.color} intensity={active ? 20 : 8} distance={8} />
    </group>
  );
}

type PortalsProps = {
  games: Game[];
  hovered: string | null;
  selected: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
};

export default function Portals({
  games,
  hovered,
  selected,
  onHover,
  onSelect,
}: PortalsProps) {
  return (
    <group>
      {games.map((game, i) => (
        <Portal
          key={game.slug}
          game={game}
          index={i}
          total={games.length}
          hovered={hovered === game.slug}
          selected={selected === game.slug}
          dimmed={selected !== null && selected !== game.slug}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}
