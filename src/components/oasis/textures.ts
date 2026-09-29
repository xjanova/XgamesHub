import { CanvasTexture, SRGBColorSpace } from "three";

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

const DISPLAY_FONT = "'Orbitron', 'Kanit', system-ui, sans-serif";

/** Big emoji drawn onto a transparent square. */
export function emojiTexture(emoji: string) {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font =
    "180px 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif";
  ctx.fillText(emoji, 128, 140);
  return toTexture(canvas);
}

/** Neon title + subtitle label, e.g. a portal name plate. */
export function labelTexture(title: string, subtitle: string, color: string) {
  const { canvas, ctx } = makeCanvas(1024, 256);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dark glass plate keeps the text readable against the bright sun
  ctx.font = `900 112px ${DISPLAY_FONT}`;
  const plateWidth = Math.min(1000, ctx.measureText(title.toUpperCase()).width + 120);
  ctx.fillStyle = "rgba(8, 3, 26, 0.72)";
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect((1024 - plateWidth) / 2, 20, plateWidth, 216, 36);
  ctx.fill();
  ctx.stroke();

  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = "#ffffff";
  ctx.font = `900 112px ${DISPLAY_FONT}`;
  ctx.fillText(title.toUpperCase(), 512, 100);

  ctx.shadowBlur = 16;
  ctx.fillStyle = color;
  ctx.font = `700 52px ${DISPLAY_FONT}`;
  ctx.fillText(subtitle.toUpperCase(), 512, 200);
  return toTexture(canvas);
}
