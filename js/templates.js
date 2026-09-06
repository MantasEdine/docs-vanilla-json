/* ============================================================
   TEMPLATES — the single source of truth for turning data/
   into HTML. Used by BOTH:
     - the browser (js/render.js injects the output on load)
     - build.js   (prerenders the same output into index.html
                   so crawlers and link previews see real text)
   Pure functions only: no DOM, no globals read — data in,
   HTML strings out. You should not need to touch this file
   to change content.
   ============================================================ */
(function () {
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const tags = (list) =>
    list && list.length
      ? `<div class="tags">${list.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`
      : "";

  const linkRow = (links, cls) =>
    links && Object.keys(links).length
      ? `<div class="${cls}">${Object.entries(links)
          .map(([label, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`)
          .join("")}</div>`
      : "";

  function hero(p) {
    if (!p) return "";
    const links = p.links || {};
    return `
      <div class="hero-kicker">${esc(p.kicker || "")}</div>
      <h1 class="hero-name">${esc(p.name)}</h1>
      <p class="hero-tagline">${esc(p.tagline || "")}</p>
      <div class="hero-meta">
        ${links.github ? `<a href="${esc(links.github)}" target="_blank" rel="noopener">github</a>` : ""}
        ${links.email ? `<a href="mailto:${esc(links.email)}">email</a>` : ""}
        ${links.npm ? `<a href="${esc(links.npm)}" target="_blank" rel="noopener">npm</a>` : ""}
        ${links.cv ? `<a href="${esc(links.cv)}" download>cv ↓</a>` : ""}
        ${p.location ? `<span class="hero-loc">📍 ${esc(p.location)}</span>` : ""}
      </div>`;
  }

  function about(p) {
    if (!p || !p.about || !p.about.length) return "";
    return `
      <h2 class="section-title">about</h2>
      <div class="about">${p.about.map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
  }

  function footer(p) {
    if (!p) return "";
    const links = p.links || {};
    return `
      <p class="footer-cta">Let’s build something.</p>
      <p class="footer-line">Open to interesting work — especially anything close to the metal.</p>
      <div class="footer-links">
        ${links.email ? `<a href="mailto:${esc(links.email)}">${esc(links.email)}</a>` : ""}
        ${links.github ? `<a href="${esc(links.github)}" target="_blank" rel="noopener">github</a>` : ""}
        ${links.cv ? `<a href="${esc(links.cv)}" download>download cv</a>` : ""}
      </div>
      <p class="footer-tiny">© ${new Date().getFullYear()} ${esc(p.name)} · built with vanilla HTML/CSS/JS — no framework, obviously</p>`;
  }

  function experience(xp) {
    if (!xp || (!(xp.work && xp.work.length) && !(xp.education && xp.education.length))) return "";
    const work = (xp.work || [])
      .map(
        (j) => `
      <div class="xp-item">
        <div class="xp-period">${esc(j.period)}${j.current ? ' <span class="xp-now">● now</span>' : ""}</div>
        <div>
          <span class="xp-role">${esc(j.role)}</span> <span class="xp-company">— ${esc(j.company)}</span>
          <div class="xp-mode">${esc(j.mode || "")}</div>
          <p class="xp-summary">${esc(j.summary || "")}</p>
          ${tags(j.stack)}
        </div>
      </div>`
      )
      .join("");

    const edu =
      xp.education && xp.education.length
        ? `<div class="edu-title">// education</div>` +
          xp.education
            .map(
              (e) => `
        <div class="edu-item">
          <span class="edu-degree">${esc(e.degree)}</span>
          <span class="edu-school"> · ${esc(e.school)}</span>
          <span class="edu-period"> · ${esc(e.period)}</span>
        </div>`
            )
            .join("")
        : "";

    return `<h2 class="section-title">experience</h2>` + work + edu;
  }

  function projects(list) {
    if (!list || !list.length) return "";
    const featured = list.filter((x) => x.tier === "featured");
    const highlights = list.filter((x) => x.tier === "highlight");
    const clients = list.filter((x) => x.tier === "client");

    const card = (pr) => `
      <div class="project-card">
        <h3 class="project-name">${esc(pr.name)}</h3>
        <p class="project-oneliner">${esc(pr.oneLiner || "")}</p>
        <p class="project-desc">${esc(pr.description || "")}</p>
        ${tags(pr.stack)}
        ${linkRow(pr.links, "project-links")}
      </div>`;

    const wide = (pr) => `
      <div class="project-wide">
        <h3 class="project-name">${esc(pr.name)}</h3>
        <p class="project-oneliner">${esc(pr.oneLiner || "")}</p>
        <p class="project-desc">${esc(pr.description || "")}</p>
        ${tags(pr.stack)}
        ${linkRow(pr.links, "project-links")}
      </div>`;

    const clientRow = (pr) => {
      const firstLink = pr.links && Object.entries(pr.links)[0];
      return `
      <div class="client-row">
        <span class="client-name">${esc(pr.name)}</span>
        <span class="client-desc">${esc(pr.oneLiner || "")}</span>
        ${firstLink ? `<a class="client-link" href="${esc(firstLink[1])}" target="_blank" rel="noopener">→ ${esc(firstLink[0].toLowerCase())}</a>` : ""}
      </div>`;
    };

    return `
      <h2 class="section-title">projects</h2>
      ${featured.length ? `<div class="project-grid">${featured.map(card).join("")}</div>` : ""}
      ${highlights.map(wide).join("")}
      ${clients.length ? `<div class="client-title">// client work</div>${clients.map(clientRow).join("")}` : ""}`;
  }

  function skills(sk) {
    if (!sk || !sk.groups || !sk.groups.length) return "";
    return `
      <h2 class="section-title">skills</h2>
      ${sk.headline ? `<p class="skills-headline">${esc(sk.headline)}</p>` : ""}
      <div class="skills-grid">
        ${sk.groups
          .map(
            (g) => `
          <div class="skill-group">
            <h3 class="skill-group-title">${esc(g.title)}</h3>
            <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
          </div>`
          )
          .join("")}
      </div>`;
  }

  function articles(list) {
    if (!list || !list.length) return "";
    return `
      <h2 class="section-title">articles</h2>
      ${list
        .map(
          (a) => `
        <a class="article-item" href="${esc(a.url)}">
          <span class="article-title">${esc(a.title)}</span>
          <span class="article-date">${esc(a.date || "")}</span>
          <p class="article-summary">${esc(a.summary || "")}</p>
        </a>`
        )
        .join("")}`;
  }

  function certificates(list) {
    if (!list || !list.length) return "";
    const inner = (c) => `
      <div class="cert-title">${esc(c.title)}</div>
      <div class="cert-issuer">${esc(c.issuer)}</div>
      <div class="cert-date">${esc(c.date || "")}</div>
      ${c.note ? `<p class="cert-note">${esc(c.note)}</p>` : ""}`;

    return `
      <h2 class="section-title">certificates</h2>
      <div class="cert-grid">
        ${list
          .map((c) =>
            c.file
              ? `<a class="cert-card" href="${esc(c.file)}" target="_blank" rel="noopener">${inner(c)}</a>`
              : `<div class="cert-card">${inner(c)}</div>`
          )
          .join("")}
      </div>`;
  }

  function beyond(b) {
    if (!b || (!(b.languages && b.languages.length) && !(b.passions && b.passions.length))) return "";
    return `
      <h2 class="section-title">beyond the code</h2>
      ${
        b.languages && b.languages.length
          ? `<div class="langs">${b.languages
              .map((l) => `<span class="lang">${esc(l.name)} <span>· ${esc(l.level)}</span></span>`)
              .join("")}</div>`
          : ""
      }
      ${
        b.passions && b.passions.length
          ? `<div class="passion-grid">${b.passions
              .map((x) => `<div class="passion"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`)
              .join("")}</div>`
          : ""
      }`;
  }

  /* Returns { <element id>: <inner HTML> } for every container
     in index.html. An empty string means "section hidden". */
  function buildAll(data) {
    const D = data || {};
    return {
      hero: hero(D.profile),
      about: about(D.profile),
      experience: experience(D.experience),
      projects: projects(D.projects),
      skills: skills(D.skills),
      articles: articles(D.articles),
      certificates: certificates(D.certificates),
      beyond: beyond(D.beyond),
      footer: footer(D.profile),
    };
  }

  const TEMPLATES = { buildAll };
  if (typeof module !== "undefined" && module.exports) module.exports = TEMPLATES;
  else window.TEMPLATES = TEMPLATES;
})();
