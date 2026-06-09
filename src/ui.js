const VIBES = {
  skog: {
    bodyClass: "vibe-skog",
    btnLabel: "🦉 Kikinda",
    titleLabel: "🌲 Skogschatt",
    themeColor: "#1a3a1a"
  },
  kikinda: {
    bodyClass: "vibe-kikinda",
    btnLabel: "🌲 Skogen",
    titleLabel: "🦉 Skogschatt",
    themeColor: "#2a1a0a"
  }
};

let currentVibe = "skog";
let currentLang = "sv";

const i18n = {
  sv: { placeholder: "Skriv något..." },
  en: { placeholder: "Type something..." }
};

export function initUI() {
  document.getElementById("vibe-toggle").addEventListener("click", toggleVibe);
  document.getElementById("lang-toggle").addEventListener("click", toggleLang);
  applyVibe();
}

function toggleVibe() {
  currentVibe = currentVibe === "skog" ? "kikinda" : "skog";
  applyVibe();
}

function applyVibe() {
  const v = VIBES[currentVibe];
  document.body.className = v.bodyClass;
  document.getElementById("vibe-toggle").textContent = v.btnLabel;
  document.getElementById("title").textContent = v.titleLabel;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", v.themeColor);
}

function toggleLang() {
  currentLang = currentLang === "sv" ? "en" : "sv";
  document.getElementById("msg-input").placeholder = i18n[currentLang].placeholder;
}
