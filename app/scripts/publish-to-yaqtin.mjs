/**
 * Copies the static export (out/) into a yaqtin-website checkout at
 * /la-tarongeta, where Vercel serves it as part of yaqtin.net (that site has
 * no build step, so the exported app is committed there).
 *
 * Run via: npm run export:site            (uses ../../yaqtin-website)
 *      or: npm run export:site -- <path-to-yaqtin-website>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(appDir, "out");
const siteRepo = path.resolve(appDir, process.argv[2] ?? "../../yaqtin-website");
const target = path.join(siteRepo, "la-tarongeta");

if (!fs.existsSync(path.join(out, "index.html"))) {
  console.error("out/index.html not found — run `next build` first (npm run export:site does both).");
  process.exit(1);
}
if (!fs.existsSync(path.join(siteRepo, "vercel.json"))) {
  console.error(`${siteRepo} does not look like a yaqtin-website checkout (no vercel.json).`);
  process.exit(1);
}

// Keep the folders that live only in the site repo: the QR download files
// and the admin page (la-tarongeta/admin, served next to the form).
const KEEP = ["qr", "admin"];
const kept = KEEP.filter((name) => fs.existsSync(path.join(target, name))).map((name) => {
  const tmp = fs.mkdtempSync(path.join(siteRepo, `.${name}-keep-`));
  fs.cpSync(path.join(target, name), tmp, { recursive: true });
  return { name, tmp };
});

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(out, target, { recursive: true });
for (const { name, tmp } of kept) {
  fs.cpSync(tmp, path.join(target, name), { recursive: true });
  fs.rmSync(tmp, { recursive: true, force: true });
}

// Next requests the home route's RSC payload at `${basePath}.txt` (a sibling
// of the folder, not inside it) — mirror index.txt there so client-side
// navigation back to "/" never 404s.
const rscPayload = path.join(out, "index.txt");
if (fs.existsSync(rscPayload)) {
  fs.copyFileSync(rscPayload, path.join(siteRepo, "la-tarongeta.txt"));
}

const count = fs.readdirSync(target).length;
console.log(`published static export to ${target} (${count} top-level entries)`);
