// ============================================================
// PROJECTS — three tiers, rendered differently:
//   tier: "featured"  → big cards at the top (your coolest work)
//   tier: "highlight" → one wide card with a longer story
//   tier: "client"    → compact rows under "Client work"
// Copy a block of the tier you want, edit, save.
// "links" accepts any {label: url} pairs.
// ============================================================
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.projects = [
  {
    tier: "featured",
    name: "vanilla-json",
    oneLiner: "A JSON engine written from scratch in pure JavaScript.",
    description:
      "Hand-written tokenizer, recursive descent parser, and serializer — no eval, no native JSON.* anywhere in the implementation. Matches native behavior down to the weird parts: NaN → null, dropped undefined keys, circular-reference TypeErrors, position-aware SyntaxErrors. Published on npm, with its own hand-built documentation site that doubles as a tutorial for writing your own.",
    stack: ["JavaScript", "npm package", "zero dependencies"],
    links: {
      Repo: "https://github.com/MantasEdine/vanilla-json",
      Docs: "https://vanille-json-docs.netlify.app/",
      npm: "https://www.npmjs.com/package/@rabia_youcef/vanilla-json",
    },
  },
  {
    tier: "featured",
    name: "better-regex",
    oneLiner: "A regex engine built from scratch — parser + backtracking matcher.",
    description:
      "No native RegExp, no dependencies. A recursive descent parser turns the pattern into a tree, then a backtracking matcher walks it against the input, backing off when greedy quantifiers overshoot — the same mechanism that powers real-world engines. Supports alternation, quantifiers, wildcards, and fully nested groups. Published on npm.",
    stack: ["JavaScript", "npm package", "recursive descent"],
    links: {
      Repo: "https://github.com/MantasEdine/better-regex",
      npm: "https://www.npmjs.com/package/@rabia_youcef/better-regex",
    },
  },
  {
    tier: "featured",
    name: "NFA-based regex engine",
    oneLiner: "The same problem, solved the computer-science way: Thompson's construction.",
    description:
      "Every regex operation becomes a tiny state machine glued together with ε-transitions; a postfix expression is folded with a stack until one NFA remains. Runs all paths in parallel and never backtracks — the automata-theory counterpart to better-regex, built to understand both halves of how regex engines are made.",
    stack: ["JavaScript", "automata theory", "ε-NFA"],
    links: {
      Repo: "https://github.com/MantasEdine/NFA-based-regex-engine",
    },
  },
  {
    tier: "highlight",
    name: "Everything About Pointers",
    oneLiner: "A compile-everything reference for pointers in C and C++.",
    description:
      "A working reference where every section is code you can actually compile — pointer arithmetic, void*, pointers to pointers, arrays vs. pointers, 2-D and jagged arrays, stack vs. heap, and a hand-rolled memory allocation exercise — all built with -Wall -Wextra and AddressSanitizer wired in, because most pointer bugs are silent until they aren't. It ships with a Makefile, CI smoke tests, and a small htmx web server that serves the whole thing as a browsable book. I wrote it while studying software engineering at LETI in Saint Petersburg, and it ended up circulating among students there as study material — the thing I'm proudest of about it.",
    stack: ["C", "C++", "Make", "AddressSanitizer", "htmx"],
    links: {
      Repo: "https://github.com/MantasEdine/Everything-About-Pointers",
    },
  },
  {
    tier: "client",
    name: "Plugin.dz",
    oneLiner:
      "Bilingual FR/AR (RTL) wholesale e-commerce catalogue for the Algerian market — Next.js 15 storefront and back-office over an Express + Prisma + PostgreSQL API, with stock-derived navigation and Yalidine delivery flow.",
    links: {
      Repo: "https://github.com/MantasEdine/PluginDZ",
    },
  },
  {
    tier: "client",
    name: "Analytics Warehouse",
    oneLiner:
      "Client analytics dashboard built with React and Vite — data views and reporting for warehouse operations.",
    links: {
      Repo: "https://github.com/MantasEdine/analytics_warehouse",
    },
  },
];
