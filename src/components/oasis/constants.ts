import { Vector3 } from "three";

export type Phase = "boot" | "warp" | "world";

/** Duration of the fly-through-the-gate sequence. */
export const WARP_MS = 3200;

/** Camera stations for each phase. */
export const CAMERA_INTRO = new Vector3(0, 2.6, 64);
export const CAMERA_WORLD = new Vector3(0, 3.4, 15);
export const LOOK_WORLD = new Vector3(0, 2.6, 0);

/** The entrance gate the camera flies through during the warp. */
export const GATE_Z = 40;

/** Nova hovers above the central platform. */
export const NOVA_POSITION = new Vector3(0, 2.3, 2.5);

export type PortalSlot = {
  position: Vector3;
  rotationY: number;
};

/** Portals stand on an arc behind Nova, each turned to face the viewer. */
export function portalLayout(count: number): PortalSlot[] {
  const radius = 11;
  const center = new Vector3(0, 0, 4);
  const spread = Math.min(Math.PI * 0.8, 0.62 * Math.max(count - 1, 1));
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = -spread / 2 + spread * t;
    const position = new Vector3(
      center.x + Math.sin(angle) * radius,
      3.4,
      center.z - Math.cos(angle) * radius,
    );
    const rotationY = Math.atan2(
      CAMERA_WORLD.x - position.x,
      CAMERA_WORLD.z - position.z,
    );
    return { position, rotationY };
  });
}
