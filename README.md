# Youcef Rabia — Portfolio

Pure static site. No backend, no build step, no framework. Open `index.html`
in a browser and it works; deploy the folder on Netlify and it works.

**All content lives in `data/` — one file per section. You never touch
HTML/CSS/JS to change what the site says.** Edit a data file, save, refresh.

```
portfolio/
├── index.html            page skeleton (section order lives here)
├── styles.css            all styling — colors at the top in :root
├── netlify.toml          Netlify config (serve as-is)
├── js/
│   └── render.js         turns data/ into the page (don't touch)
├── data/                 ★ EDIT THESE ★
│   ├── profile.js        name, tagline, links, About paragraphs, footer
│   ├── experience.js     jobs + education
│   ├── projects.js       all projects (3 tiers, see below)
│   ├── skills.js         skill groups
│   ├── articles.js       the article list on the homepage
│   ├── certificates.js   certificate cards
│   └── beyond.js         spoken languages + passions
├── articles/
│   ├── article.css       shared article style (vanilla-json docs look)
│   ├── _template.html    copy this to write a new article
│   └── build-your-own-json-serializer.html
└── assets/               put certificate PDFs / images here (optional)
```

---

## Deploy to Netlify

Either:

- **Drag & drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop),
  drag this folder in. Done.
- **Or from Git** — push this folder to a repo, "Import from Git" on Netlify.
  Build command: *none*. Publish directory: `.` (already set in `netlify.toml`).
- **Or CLI** — `npm i -g netlify-cli && netlify deploy --prod` inside this folder.

There is nothing to build. Netlify just serves the files.
(It works identically on Vercel or GitHub Pages if you ever move.)

---

## How the data files work

Every file in `data/` is plain JavaScript that fills one key of
`window.PORTFOLIO`. They're just object literals — if you can edit JSON,
you can edit these. Rules that apply everywhere:

- **Order in the file = order on the page.** Move a block up, it moves up.
- **Deleting works.** Empty a list (e.g. `window.PORTFOLIO.articles = []`)
  and its whole section disappears from the homepage — heading included.
- Keep the quotes and commas intact. If the page suddenly renders empty,
  you have a syntax error — open the browser console (F12) to see where.
- Text is inserted as *text*, not HTML, so you can safely use quotes,
  `<`, `&` etc. in any string.

### Common edits, recipe-style

**Change the tagline / about text** → `data/profile.js`

**Add a job** → `data/experience.js`, copy one block into `work`:

```js
{
  role: "Job Title",
  company: "Company",
  period: "2026 — present",
  current: true,               // shows the green "● now" dot
  mode: "Part-time · Remote",  // small line under the title
  summary: "One or two sentences about what you did.",
  stack: ["Tech", "Tech", "Tech"],
},
```

**Add a project** → `data/projects.js`. Pick a tier:

| tier | renders as | use for |
|---|---|---|
| `"featured"` | big card in the top grid | your coolest work |
| `"highlight"` | wide card with a long description | the medium-cool story pieces |
| `"client"` | one compact row under "client work" | client stuff, briefly |

```js
{
  tier: "featured",
  name: "project-name",
  oneLiner: "One yellow line under the name.",
  description: "The longer gray paragraph.",
  stack: ["JS", "whatever"],
  links: { Repo: "https://...", Docs: "https://...", npm: "https://..." },
},
```

`links` takes any `{Label: url}` pairs — add `Demo`, `Live`, anything.

**Add a certificate** → `data/certificates.js`, copy a block. To make the
card clickable, drop the PDF/image into `assets/` and set
`file: "assets/whatever.pdf"`.

**Publish an article** →
1. `cp articles/_template.html articles/my-article.html`
2. Write in it (plain HTML: `<h2>`, `<p>`, `<pre><code>` — the style is
   automatic and matches the vanilla-json docs).
3. Add a block in `data/articles.js` with `url: "articles/my-article.html"`.

**Take an article down** → delete its block from `data/articles.js`.
That's it — the page won't link to it anymore. Delete the HTML file too if
you want it fully gone. Empty list = no Articles section at all.

**Change colors / fonts** → top of `styles.css`, the `:root` block. The
whole site reads from those variables. Article pages have their own tiny
`:root` at the top of `articles/article.css`.

**Reorder / remove whole sections** → `index.html`, the `<section>` tags
inside `<main>` and the matching links in `<nav>`.

---

## Local preview

Double-clicking `index.html` works in most browsers. If your browser blocks
local scripts, run any static server:

```bash
python3 -m http.server 8080    # then open http://localhost:8080
```
