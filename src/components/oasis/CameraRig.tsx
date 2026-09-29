"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import {
  CAMERA_INTRO,
  CAMERA_WORLD,
  LOOK_WORLD,
  WARP_MS,
  type Phase,
} from "./constants";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type CameraRigProps = {
  phase: Phase;
  /** Where the camera should fly to when a portal is selected. */
  focus: Vector3 | null;
  onWarpDone: () => void;
};

export default function CameraRig({ phase, focus, onWarpDone }: CameraRigProps) {
  const get = useThree((s) => s.get);
  const warpStart = useRef(0);
  const warpDone = useRef(false);
  const look = useMemo(() => new Vector3(0, 4, 0), []);
  const goalPos = useMemo(() => new Vector3(), []);
  const goalLook = useMemo(() => new Vector3(), []);

  useEffect(() => {
    if (phase === "boot") get().camera.position.copy(CAMERA_INTRO);
    if (phase === "warp") {
      warpStart.current = performance.now();
      warpDone.current = false;
    }
  }, [phase, get]);

  useFrame((state, delta) => {
    const camera = state.camera as PerspectiveCamera;
    const t = state.clock.elapsedTime;
    let fov = 50;

    if (phase === "boot") {
      goalPos.set(
        CAMERA_INTRO.x + Math.sin(t * 0.3) * 1.2,
        CAMERA_INTRO.y + Math.sin(t * 0.5) * 0.4,
        CAMERA_INTRO.z,
      );
      goalLook.set(0, 4.5, 0);
      camera.position.lerp(goalPos, 1 - Math.exp(-2 * delta));
      look.lerp(goalLook, 1 - Math.exp(-2 * delta));
    } else if (phase === "warp") {
      const k = Math.min(1, (performance.now() - warpStart.current) / WARP_MS);
      const e = easeInOutCubic(k);
      camera.position.set(
        MathUtils.lerp(CAMERA_INTRO.x, CAMERA_WORLD.x, e),
        MathUtils.lerp(CAMERA_INTRO.y, CAMERA_WORLD.y, e) + Math.sin(k * Math.PI) * 2.6,
        MathUtils.lerp(CAMERA_INTRO.z, CAMERA_WORLD.z, e),
      );
      goalLook.lerpVectors(new Vector3(0, 5.2, 0), LOOK_WORLD, e);
      look.copy(goalLook);
      fov = 50 + Math.sin(k * Math.PI) * 48;
      camera.rotation.z = Math.sin(k * Math.PI * 2) * 0.06;
      if (k >= 1 && !warpDone.current) {
        warpDone.current = true;
        onWarpDone();
      }
    } else {
      // Portrait screens need to stand further back to fit the portal arc
      const portrait = camera.aspect < 1;
      const pull = portrait ? Math.min(1.8, 1 / camera.aspect) : 1;
      if (focus) {
        // Stand in front of the chosen portal; on wide screens aim a little
        // to its right so the portal sits left of the info panel
        const toCam = CAMERA_WORLD.clone().sub(focus).setY(0).normalize();
        const right = new Vector3(toCam.z, 0, -toCam.x);
        goalPos
          .copy(focus)
          .addScaledVector(toCam, portrait ? 17 : 10.5)
          .setY(focus.y + 0.8);
        goalLook.copy(focus).addScaledVector(right, portrait ? 0 : 2.4);
        if (portrait) goalLook.setY(goalLook.y - 2.4);
      } else {
        goalPos.set(
          CAMERA_WORLD.x + state.pointer.x * 1.6,
          CAMERA_WORLD.y + state.pointer.y * 0.7 + (pull - 1) * 2,
          CAMERA_WORLD.z * pull,
        );
        goalLook.copy(LOOK_WORLD);
        // keep the hub centred between the HUD bars on tall screens
        if (portrait) goalLook.setY(goalLook.y + 1.2);
      }
      const k = 1 - Math.exp(-2.4 * delta);
      camera.position.lerp(goalPos, k);
      look.lerp(goalLook, k);
    }

    camera.lookAt(look);
    if (phase !== "warp") camera.rotation.z = 0;
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = phase === "warp" ? fov : MathUtils.damp(camera.fov, fov, 4, delta);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
