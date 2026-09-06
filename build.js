#!/usr/bin/env node
/* ============================================================
   BUILD — prerenders the site's content into index.html so the
   served HTML contains the full text of every section (for
   crawlers, link previews, and anything that doesn't run JS).

   Node standard library only. Run:  node build.js
   Netlify runs it automatically on every deploy (netlify.toml).

   index.html is the SOURCE: everything outside the ten container
   elements (head, nav, section tags, script tags) is hand-
   authored and never touched. Only each container's INNER HTML
   is a generated region, replaced wholesale on every build with
   output derived purely from data/ — which is what makes
   repeated builds idempotent: run it twice, identical file.

   The same js/templates.js module renders in the browser
   (via js/render.js), so there is exactly one copy of the
   template code and the two outputs cannot diverge.
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;

// --- 1. Load data/*.js the same way a browser would: run each
//        file against a stub `window`, then read window.PORTFOLIO.
const sandbox = { window: {} };
vm.createContext(sandbox);
const dataDir = path.join(ROOT, "data");
for (const f of fs.readdirSync(dataDir).filter((f) => f.endsWith(".js")).sort()) {
  vm.runInContext(fs.readFileSync(path.join(dataDir, f), "utf8"), sandbox, { filename: `data/${f}` });
}
const data = sandbox.window.PORTFOLIO || {};

// --- 2. Render every section with the shared template module.
const { buildAll } = require(path.join(ROOT, "js", "templates.js"));
const sections = buildAll(data);

// --- 3. Splice each rendered section into its container.
//        Containers are matched by id; their inner HTML is
//        replaced entirely, so the operation is idempotent.
const CONTAINERS = {
  hero: "header",
  about: "section",
  experience: "section",
  projects: "section",
  skills: "section",
  articles: "section",
  certificates: "section",
  beyond: "section",
  footer: "footer",
};

const indexPath = path.join(ROOT, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

for (const [id, tag] of Object.entries(CONTAINERS)) {
  const inner = sections[id] ?? "";
  // Safety: the generated markup must not close its own container,
  // or the non-greedy match below would corrupt the file.
  if (inner.includes(`</${tag}>`)) {
    throw new Error(`generated HTML for #${id} contains </${tag}> — refusing to build`);
  }
  const re = new RegExp(`(<${tag} id="${id}"[^>]*>)[\\s\\S]*?(</${tag}>)`);
  if (!re.test(html)) {
    throw new Error(`container <${tag} id="${id}"> not found in index.html`);
  }
  html = html.replace(re, (_m, open, close) => open + inner + close);
}

fs.writeFileSync(indexPath, html);

const bytes = Buffer.byteLength(html);
console.log(`build ok — index.html prerendered (${bytes} bytes, ${Object.keys(CONTAINERS).length} sections)`);
