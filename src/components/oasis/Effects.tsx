"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { BlendFunction, type ChromaticAberrationEffect } from "postprocessing";
import { useMemo, useRef } from "react";
import { MathUtils, Vector2 } from "three";
import type { Phase } from "./constants";

export default function Effects({ phase }: { phase: Phase }) {
  const chroma = useRef<ChromaticAberrationEffect>(null);
  const offset = useMemo(() => new Vector2(0.0006, 0.0006), []);

  useFrame((_, delta) => {
    if (!chroma.current) return;
    const target = phase === "warp" ? 0.012 : 0.0007;
    const v = MathUtils.damp(chroma.current.offset.x, target, 3, delta);
    chroma.current.offset.set(v, v * 0.6);
  });

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={1.15}
        luminanceThreshold={0.22}
        luminanceSmoothing={0.3}
        radius={0.8}
      />
      <ChromaticAberration
        ref={chroma}
        offset={offset}
        radialModulation
        modulationOffset={0.2}
      />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.25} darkness={0.75} />
    </EffectComposer>
  );
}
