/** Copy generated production logos from a local manifest. Alpha is preserved. */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const manifest = process.argv[2];
if (!manifest) throw new Error("Pass the private local generation manifest path.");
const rows = JSON.parse(await fs.readFile(manifest, "utf8"));
const dir = path.resolve("public/art/logos");
await fs.mkdir(dir, { recursive: true });
const registry = {};
for (const row of rows) {
  if (!row.source) throw new Error(`Missing logo: ${row.id}`);
  const src = sharp(row.source);
  const metadata = await src.metadata();
  const stats = await src.stats();
  if (!metadata.hasAlpha || stats.channels[3].min !== 0) throw new Error(`Missing transparency: ${row.id}`);
  // Ship the full-resolution PNG, plus an optimised alpha WebP for browsing.
  await fs.copyFile(row.source, path.join(dir, `${row.id}.png`));
  const web = await src.resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(dir, `${row.id}.webp`));
  registry[row.id] = { src: `/art/logos/${row.id}.webp`, png: `/art/logos/${row.id}.png`, width: web.width, height: web.height };
}
// Convert the studio's existing originals to downloadable PNG without redesign.
const existing = [
  ["hive-breach", "public/art/corewar-logo.webp"],
  ["breaker", "public/art/breaker/logo.webp"],
  ["siam-speed", "public/art/logos/siam-speed.webp"],
  // the game's own title logo, cropped to its alpha bounds (PNG master checked in)
  ["krungsri", "public/art/logos/krungsri.webp"],
];
for (const [id, source] of existing) {
  const metadata = await sharp(source).metadata();
  const png = path.join(dir, `${id}.png`);
  // A checked-in original PNG takes precedence over a decoded web preview.
  const originalExists = await fs.access(png).then(() => true, () => false);
  if (!originalExists) await sharp(source).png().toFile(png);
  registry[id] = { src: `/${source.replace(/^public\//, "")}`, png: `/art/logos/${id}.png`, width: metadata.width, height: metadata.height };
}
if (Object.keys(registry).length !== 30) throw new Error("Expected all 30 games.");
await fs.writeFile("src/data/game-logos.ts", `/** Production raster identities; PNG masters and optimised alpha previews. */\nexport type GameLogo = { src: string; png: string; width: number; height: number };\nexport const gameLogos: Record<string, GameLogo> = ${JSON.stringify(registry, null, 2)};\n`);
console.log(`Prepared ${Object.keys(registry).length} production identities.`);
