/** Editable vector identities. No external fonts, assets, or generation service. */
import fs from "node:fs/promises";

const dir = new URL("../public/art/logos/", import.meta.url);
await fs.mkdir(dir, { recursive: true });
const moon = '<path d="M145 34A76 76 0 1 0 145 166A70 70 0 0 1 145 34Z"/>';
const cube = '<path d="m100 26 67 36v76l-67 37-67-37V62Z M33 62l67 38 67-38 M100 100v75"/>';
const glyphs = {
  chanthra: moon + '<path d="M65 95q35-37 70 0-35 37-70 0Z"/><circle cx="100" cy="95" r="10"/>',
  tetrisvs: '<path d="M27 40h48v48h48v48H75v48H27Z M170 35l-33 58h38l-36 72"/>',
  snake: '<path d="M42 48h82q41 0 41 36t-41 36H82q-34 0-34 30t48 30h51"/><circle cx="54" cy="48" r="20"/><circle cx="48" cy="44" r="3"/>',
  "8ball": '<circle cx="100" cy="100" r="77"/><circle cx="100" cy="100" r="40"/><text x="100" y="126" text-anchor="middle" font-family="Arial" font-size="72" stroke="none" fill="currentColor">8</text>',
  snooker: '<circle cx="80" cy="117" r="46"/><path d="m142 30-86 148 M144 76l33 33 M134 164h46"/>',
  tetris: '<path d="M35 40h128v43h-43v43H77V83H35Z M35 140h42v42H35Z M120 140h43v42h-43Z"/>',
  "space-shooter": '<path d="m100 27 25 83 53 42-62-14-16 31-16-31-62 14 53-42Z M45 45v22 M157 25v30"/>',
  rollabrain: '<circle cx="100" cy="100" r="57"/><path d="M61 72q51 25 76 73 M124 51q-45 67-76 72 M28 153q61 46 147-22"/>',
  maze: '<path d="M174 174H27V27h147v105h-47V74H73v58h29 M27 75h24 M74 174v-19 M174 52h-23"/><circle cx="150" cy="152" r="5"/>',
  rublicx: cube + '<path d="M54 50v76l67 37 M144 50l-67 37v75 M33 87l67 38 67-38"/>',
  runeward: '<path d="M100 25 163 48v54q0 44-63 77-63-33-63-77V48Z M100 58v79 M76 79l24 22 24-22 M78 125l22-24 22 24"/>',
  lucky: '<rect x="44" y="41" width="115" height="115" rx="21" transform="rotate(-12 100 100)"/><circle cx="75" cy="75" r="6"/><circle cx="100" cy="100" r="6"/><circle cx="128" cy="125" r="6"/><path d="M28 170h147"/>',
  neon: '<path d="m100 25 73 132H27Z M100 73l14 40-36 25 19-39 22-2 M27 170h147"/><circle cx="100" cy="100" r="76"/>',
  cafe: '<path d="M34 88h109v34q0 40-54 40-55 0-55-40Z M143 91h12q39 0 15 34h-27 M28 179h132 M65 65q-18-15 0-33 M100 65q-18-15 0-33"/>',
  juntra: moon + '<path d="M50 118q25-10 50 5 25-15 50-5v42q-25-10-50 5-25-15-50-5Z M100 123v42"/>',
  "theone-sunkalp": '<path d="M100 24v119 M86 42h28 M70 120h60 M100 181l-18-25 18-24 18 24Z"/><circle cx="100" cy="100" r="74"/><path d="M24 100h35 M142 100h34"/>',
  xenon: '<path d="m100 29 28 57 49 25-65 11-12 47-12-47-65-11 49-25Z M30 50h31 M144 158h36"/>',
  "astral-pact": '<rect x="48" y="30" width="103" height="141" rx="12"/><path d="m100 60 11 30 31 10-31 10-11 30-11-30-31-10 31-10Z M28 57v114h97"/>',
  "type-nova": '<path d="m61 58-39 42 39 42 M139 58l39 42-39 42 M114 41l-29 119"/>',
  "soi-riot": '<circle cx="100" cy="100" r="73"/><path d="m100 63 36 25-14 43H78L64 88Z M100 63V27 M136 88l35-11 M122 131l23 29 M78 131l-23 29 M64 88 29 77"/>',
  "paradox-pinball": '<path d="M50 26h101l23 140H28Z M49 141l40 16 M153 141l-41 16"/><circle cx="100" cy="78" r="29"/><path d="M100 59v38 M80 78h40"/>',
  "lotus-ascension": '<path d="M100 24q48 54 0 113-48-59 0-113Z M100 137Q24 112 28 59q66 8 72 78Z M100 137q76-25 72-78-66 8-72 78Z M29 127q23 54 71 41 48 13 71-41-31-9-71 10-40-19-71-10Z"/>',
  skyshard: '<path d="m100 25 22 42-22 45-22-45Z M47 102h71v46H47Z M94 102l59-31 M33 149h127l18 27H23Z"/>',
};
const specs = [
  ["chanthra", "MAE MO CHANTHRA", "#f0ce83", "#b89cff", "serif"],
  ["tetrisvs", "TetrisVS", "#4fe3ff", "#b6ff4f"], ["snake", "SNAKE.IO", "#7cff76", "#4fe3ff"],
  ["8ball", "8 BALL POOL", "#ffe6af", "#4fd6bb"], ["snooker", "SNOOKER 2D", "#8be7b3", "#eb655e"],
  ["tetris", "TETRIS CLASSIC", "#ffbf6b", "#b78fff"], ["space-shooter", "SPACE SHOOTER", "#6bdeff", "#ffad66"],
  ["rollabrain", "ROLLABRAIN", "#84e8fb", "#baff88"], ["maze", "MAZE CHASE", "#ffde6e", "#77a4ff"],
  ["rublicx", "RUBLICX", "#ffd500", "#4ca4ff"], ["runeward", "RUNEWARD", "#b9f5e1", "#59e0ff", "serif"],
  ["lucky", "LUCKY ISLES", "#ffdc89", "#57d6f2"], ["neon", "NEON COVEN", "#ff70da", "#b69aff"],
  ["cafe", "CAFÉ PROJECT", "#f7d7b1", "#b9deb8", "serif"], ["juntra", "JUNTRA", "#f2dc9f", "#c6a9fb", "serif"],
  ["theone-sunkalp", "THE ONE · สูญกัป", "#e2d6bf", "#dc5f72", "serif"], ["xenon", "XENON", "#e0efff", "#7e89fa"],
  ["astral-pact", "ASTRAL PACT", "#ffd696", "#86ddeb", "serif"], ["type-nova", "TYPE//NOVA", "#b2f5eb", "#b298ff"],
  ["soi-riot", "SOI RIOT", "#ff9b67", "#48dedd"], ["paradox-pinball", "PARADOX PINBALL", "#73ecf4", "#f2b65e"],
  ["lotus-ascension", "LOTUS ASCENSION", "#f7c6e2", "#5be1d4", "serif"], ["skyshard", "SKYSHARD", "#b7eafa", "#af9eea"],
];
const esc = s => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
function svg(title, content, a, b) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="240" viewBox="0 0 900 240" role="img"><title>${esc(title)}</title><defs><linearGradient id="ink" x2="0" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>${content}</svg>\n`;
}
for (const [id, name, a, b, style] of specs) {
  const content = `<g transform="translate(8 20)" color="${a}" stroke="url(#ink)" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" fill="none">${glyphs[id]}</g><text x="228" y="144" font-family="${style === "serif" ? "Georgia, Noto Serif Thai, Tahoma, serif" : "Arial, Tahoma, sans-serif"}" font-weight="${style === "serif" ? 600 : 900}" font-size="${name.length > 14 ? 58 : 72}" textLength="640" lengthAdjust="spacingAndGlyphs" fill="url(#ink)">${esc(name)}</text><path d="M230 177h160" stroke="${b}" stroke-width="4"/><path d="M405 177h38" stroke="${a}" stroke-width="4"/>`;
  await fs.writeFile(new URL(`${id}.svg`, dir), svg(name, content, a, b));
}
// Preserve the playable games' original title-screen typography and colour identity.
await fs.writeFile(new URL("xnova.svg", dir), svg("X-NOVA", '<defs><linearGradient id="gold" x2="0" y2="1"><stop stop-color="#fff"/><stop offset=".55" stop-color="#ffd36a"/><stop offset="1" stop-color="#ff8a2a"/></linearGradient></defs><g font-family="Arial, sans-serif" font-size="156" font-weight="900" font-style="italic"><text x="26" y="174" fill="url(#gold)">X</text><text x="154" y="174" fill="#b89aff">-</text><text x="217" y="174" fill="url(#ink)" textLength="650" lengthAdjust="spacingAndGlyphs">NOVA</text></g>', "#fff", "#7b4dff"));
await fs.writeFile(new URL("theone.svg", dir), svg("THE ONE", '<text x="450" y="167" text-anchor="middle" font-family="Palatino Linotype, Georgia, serif" font-size="146" font-weight="700" letter-spacing="12" fill="url(#ink)">THE ONE</text>', "#fff0bd", "#f2c25a"));
await fs.writeFile(new URL("umbra.svg", dir), svg("NOVA·UMBRA", '<text x="450" y="158" text-anchor="middle" font-family="Georgia, serif" font-size="108" letter-spacing="8" fill="#f2efe6">NOVA<tspan fill="#b89cff">·</tspan>UMBRA</text>', "#f2efe6", "#b89cff"));
console.log("26 vector logos written. Existing raster game logos are preserved separately.");
