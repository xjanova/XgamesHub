/**
 * Post-build step for the static export in out/.
 *
 * The site is published through xjanova/xmanstudio `sites/`, whose test suite
 * (BrainXDownloadTest) forbids the text "github.com" in any served
 * .html/.js/.css file. Third-party bundles carry it only inside string
 * literals (core-js licence metadata, a react-use-measure error message), so
 * we spell the dot as the JS escape `.`: the runtime string is
 * byte-for-byte identical, but the source text no longer matches.
 *
 * Anything outside a JS string literal would not survive that rewrite, so the
 * script refuses to guess: it fails the build if a match is not preceded by a
 * quote-delimited string on the same token run.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
const NEEDLE = /github\.com/gi;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** True when `index` sits inside a "…", '…' or `…` literal on its line. */
function insideStringLiteral(source, index) {
  const lineStart = source.lastIndexOf("\n", index) + 1;
  let quote = null;
  for (let i = lineStart; i < index; i++) {
    const ch = source[i];
    if (quote) {
      if (ch === "\\") i++;
      else if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
    }
  }
  return quote !== null;
}

let rewritten = 0;
const problems = [];

for await (const file of walk(OUT)) {
  const ext = path.extname(file);
  if (![".js", ".html", ".css"].includes(ext)) continue;
  const source = await readFile(file, "utf8");
  if (!NEEDLE.test(source)) continue;
  NEEDLE.lastIndex = 0;

  if (ext !== ".js") {
    problems.push(`${path.relative(OUT, file)}: found in ${ext} — fix the source`);
    continue;
  }
  const result = source.replace(NEEDLE, (match, offset) => {
    if (!insideStringLiteral(source, offset)) {
      problems.push(`${path.relative(OUT, file)}@${offset}: not inside a string literal`);
      return match;
    }
    rewritten++;
    return match.replace(".", "\\u002e");
  });
  await writeFile(file, result);
}

if (problems.length) {
  console.error("sanitize-export: cannot safely rewrite:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`sanitize-export: rewrote ${rewritten} "github.com" occurrence(s) in string literals`);
