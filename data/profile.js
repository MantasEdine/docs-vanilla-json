// ============================================================
// PROFILE — who you are. Edit any value, save, refresh.
// This fills the hero (top of page), the About section,
// and the contact footer.
// ============================================================
window.PORTFOLIO = window.PORTFOLIO || {};

window.PORTFOLIO.profile = {
  name: "Youcef Rabia",

  // Short line under your name in the hero
  tagline: "Software developer. JavaScript and C++ expert.",

  // Small mono line above your name (terminal-style prompt)
  kicker: "~/youcef-rabia",

  location: "Algiers, Algeria",

  // Links shown in the hero and the footer.
  // "cv" points at the PDF in assets/ — replace that file to update
  // your CV, or set cv: "" to hide the download button.
  links: {
    github: "https://github.com/MantasEdine",
    email: "rabiayoucef77@gmail.com",
    npm: "https://www.npmjs.com/~rabia_youcef",
    cv: "assets/Youcef_Rabia_CV.pdf",
  },

  // The About section — one string per paragraph.
  // Add / remove / reorder paragraphs freely.
  about: [
    "I write JavaScript for a living and C for the love of it. My favorite projects are the ones where I rebuild a tool I use every day — a JSON engine, a regex engine — from nothing, just to see exactly what's under the floorboards.",
    "I've shipped NestJS microservices with Kafka and Docker at Emploitic, spent two years freelancing across the MERN stack, and studied software engineering at LETI in Saint Petersburg before coming back to Algiers, where I'm now studying hydraulic engineering at USTHB while working in tech part-time.",
    "I contribute to open source when I can — including a contribution to the official TypeScript website, validated by Jake Bailey himself. Daily drivers: Arch Linux, Neovim, and a terminal.",
    "My workflow leans hard on AI — I let it build fast, then I test, debug, and rebuild the result by hand until I understand and control every line. Deployment I keep boring on purpose: Vercel, Railway, and Neon handle the ops so I can stay in the code.",
  ],
};
