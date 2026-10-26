// Construit la version en ligne du site à partir des sources lisibles de _src/.
// Utilisation :  cd _src && npm install && npm run build
//
// - index.html, css/style.css et js/main.js sont compactés (code illisible en Ctrl+U)
// - chaque fichier reçoit un numéro de version (?v=…) pour que les navigateurs
//   rechargent toujours la dernière version au lieu d'une copie en cache
// - js/data.js n'est pas compacté : c'est le fichier de contenu, modifiable à la main

import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { minify as minifyJs } from "terser";
import CleanCSS from "clean-css";
import { minify as minifyHtml } from "html-minifier-terser";

const SRC = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SRC, "..");
const src = (p) => path.join(SRC, p);
const out = (p) => path.join(ROOT, p);
const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);

// CSS
const cssIn = await readFile(src("css/style.css"), "utf8");
const css = new CleanCSS({ level: 2 }).minify(cssIn);
if (css.errors.length) throw new Error(css.errors.join("\n"));
await writeFile(out("css/style.css"), css.styles);

// JS
const jsIn = await readFile(src("js/main.js"), "utf8");
const js = await minifyJs(jsIn, {
  compress: { passes: 2 },
  mangle: { toplevel: true },
  format: { comments: false },
});
await writeFile(out("js/main.js"), js.code);

// Numéros de version
const versions = {
  "css/style.css": hash(css.styles),
  "js/main.js": hash(js.code),
  "js/data.js": hash(await readFile(out("js/data.js"), "utf8")),
  "js/vendor/gsap.min.js": "3.12.5",
  "js/vendor/ScrollTrigger.min.js": "3.12.5",
  "js/vendor/lenis.min.js": "1.1.20",
};

// HTML
let html = await readFile(src("index.html"), "utf8");
for (const [file, v] of Object.entries(versions)) {
  html = html.replaceAll(`"${file}"`, `"${file}?v=${v}"`);
}
html = await minifyHtml(html, {
  collapseWhitespace: true,
  conservativeCollapse: false,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
});
await writeFile(out("index.html"), html);

console.log("Site construit :", Object.entries(versions).map(([f, v]) => `${f}?v=${v}`).join(", "));
