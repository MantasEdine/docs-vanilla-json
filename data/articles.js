// ============================================================
// ARTICLES — the list on the homepage. Each entry points to an
// HTML file inside articles/.
//
// To ADD an article: copy articles/_template.html to a new file,
// write in it, then copy one { ... } block here and point "url"
// at your new file.
//
// To TAKE DOWN an article: delete its { ... } block here
// (and optionally the file). Empty list = the whole Articles
// section disappears from the page automatically.
// ============================================================
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.articles = [
  {
    title: "Build your own JSON serializer",
    date: "2025",
    summary:
      "How to write JSON.stringify from scratch in pure JavaScript — escaping strings the hard way, the primitive types, toJSON, and circular references. From the vanilla-json docs.",
    url: "articles/build-your-own-json-serializer.html",
  },
];
