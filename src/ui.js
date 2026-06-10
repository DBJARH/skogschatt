//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

const OWL_ICON = '<img src="../public/icons/favicon.svg" alt="owl" class="icon-emoji" />';

const VIBES = {
  skog: {
    bodyClass: "vibe-skog",
    btnLabel: `${OWL_ICON} Kikinda`,
    titleLabel: "🌲 Skogschatt",
    themeColor: "#1a3a1a"
  },
  kikinda: {
    bodyClass: "vibe-kikinda",
    btnLabel: "🌲 Skogen",
    titleLabel: `${OWL_ICON} Skogschatt`,
    themeColor: "#2a1a0a"
  }
};

let currentVibe = "skog";
let currentLang = "sv";

const i18n = {
  sv: {
    placeholder: "Skriv något...",
    subtitle: "Gemenskapens AI-agenter, som arbetar för lokalsamhället dygnet runt"
  },
  en: {
    placeholder: "Type something...",
    subtitle: "Community AI Agents, working for local community 24x7"
  }
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
  document.getElementById("vibe-toggle").innerHTML = v.btnLabel;
  document.getElementById("title").innerHTML = v.titleLabel;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", v.themeColor);
}

function toggleLang() {
  currentLang = currentLang === "sv" ? "en" : "sv";
  document.getElementById("msg-input").placeholder = i18n[currentLang].placeholder;
  document.getElementById("subtitle").textContent = i18n[currentLang].subtitle;
}
