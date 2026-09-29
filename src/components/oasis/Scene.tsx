"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import type { Game } from "@/data/games";
import CameraRig from "./CameraRig";
import { CAMERA_INTRO, portalLayout, type Phase } from "./constants";
import Effects from "./Effects";
import Nova from "./Nova";
import Portals from "./Portals";
import Warp from "./Warp";
import {
  DataCubes,
  EntranceGate,
  HubPlatform,
  Mountains,
  RetroSun,
  Sky,
  SynthGrid,
} from "./World";

type SceneProps = {
  phase: Phase;
  games: Game[];
  hovered: string | null;
  selected: string | null;
  waveSignal: number;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  onDeselect: () => void;
  onWarpDone: () => void;
  onPokeNova: () => void;
};

export default function Scene({
  phase,
  games,
  hovered,
  selected,
  waveSignal,
  onHover,
  onSelect,
  onDeselect,
  onWarpDone,
  onPokeNova,
}: SceneProps) {
  const slots = useMemo(() => portalLayout(games.length), [games.length]);
  const indexOf = (slug: string | null) =>
    slug ? games.findIndex((g) => g.slug === slug) : -1;
  const selectedIdx = indexOf(selected);
  const hoveredIdx = indexOf(hovered);
  const cameraFocus = selectedIdx >= 0 ? slots[selectedIdx].position : null;
  const novaFocus =
    selectedIdx >= 0
      ? slots[selectedIdx].position
      : hoveredIdx >= 0
        ? slots[hoveredIdx].position
        : null;

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ fov: 50, near: 0.1, far: 600, position: CAMERA_INTRO.toArray() }}
      onPointerMissed={() => phase === "world" && onDeselect()}
    >
      <color attach="background" args={["#05010f"]} />
      <fog attach="fog" args={["#05010f", 40, 230]} />

      <ambientLight intensity={0.35} color="#8a7dff" />
      <directionalLight position={[6, 12, 10]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-8, 4, -6]} intensity={1.2} color="#3ff6ff" />
      <hemisphereLight args={["#b9a8ff", "#05010f", 0.45]} />

      <Suspense fallback={null}>
        <Sky />
        <RetroSun />
        <Mountains />
        <SynthGrid speed={phase === "warp" ? 6 : 0.35} />
        <EntranceGate />
        <HubPlatform />
        <DataCubes />
        <Warp phase={phase} />
        <Nova focus={novaFocus} waveSignal={waveSignal} onPoke={onPokeNova} />
        {phase === "world" && (
          <Portals
            games={games}
            hovered={hovered}
            selected={selected}
            onHover={onHover}
            onSelect={onSelect}
          />
        )}
        <CameraRig phase={phase} focus={cameraFocus} onWarpDone={onWarpDone} />
        <Effects phase={phase} />
      </Suspense>
    </Canvas>
  );
}
