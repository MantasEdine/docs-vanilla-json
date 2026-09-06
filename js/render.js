/* ============================================================
   RENDER (browser) — injects the output of js/templates.js
   into the page containers on load.

   The deployed index.html is already prerendered by build.js,
   so this pass normally re-produces identical markup — but it
   is what makes local editing work with a plain refresh: change
   a data/ file, reload, done, no build step needed. It also
   keeps the © year current.
   ============================================================ */
(function () {
  const out = window.TEMPLATES.buildAll(window.PORTFOLIO);
  for (const id of Object.keys(out)) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = out[id];
  }
})();
