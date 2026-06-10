# Skogschatt

A two-person (Dusan & Andrej) bilingual (SV/EN) chat PWA with two visual "vibes":
- **Skog** — Swedish forest, dimmed forest-path SVG background
- **Kikinda** — dimmed long-eared owl portrait SVG background (Kikinda, Serbia, is famous for its owl colony)

## Stack
- Vanilla JS (no React, no framework, no build step)
- Firebase Realtime Database for chat (config in `src/app.js`)
- Static PWA, deployed via GitHub Pages from `master` branch root

## Layout
```
public/
  manifest.json
  images/forest-path.svg
  images/kikinda-owls.svg
src/
  index.html   - entry point
  app.js       - Firebase config + LOCAL_USER ("Dusan" or "Andrej")
  chat.js      - Firebase realtime chat logic
  ui.js        - vibe switching (Skog/Kikinda) + language toggle
  forest.css   - all styling, including vibe backgrounds
service-worker.js - PWA cache (bump CACHE version when assets change)
```

## Conventions
- Keep it vanilla JS — no frameworks.
- Background images live in `public/images/` and are applied via CSS
  `background-image` with a dark `linear-gradient` overlay for dimming.
  Don't bake dimming into the SVGs themselves — keep the overlay in `forest.css`.
- All paths must stay relative (GitHub Pages serves from `/skogschatt/` subpath).
- `LOCAL_USER` in `src/app.js` differs per device (Dusan vs Andrej) — don't
  commit a "fix" that hardcodes one user as default for both.
- Bump `CACHE` in `service-worker.js` whenever cached assets (HTML/CSS/JS/images) change.

## Deployment
- Live at: https://dbjarh.github.io/skogschatt/src/index.html
- Push to `master` → GitHub Pages rebuilds automatically.
