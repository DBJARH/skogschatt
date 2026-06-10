# Skogschatt

A two-person (Dusan & Andrej) bilingual (SV/EN) chat PWA with two visual "vibes":
- **Skog** — Swedish forest, dimmed forest-path SVG background
- **Kikinda** — dimmed long-eared owl portrait SVG background (Kikinda, Serbia, is famous for its owl colony)

## Stack
- Vanilla JS (no React, no framework, no build step)
- Firebase Realtime Database for chat + Google Sign-In auth (config in `src/app.js`)
- Static PWA, deployed via GitHub Pages from `master` branch root

## Layout
```
public/
  manifest.json
  images/forest-path.svg
  images/kikinda-owls.svg
src/
  index.html   - entry point
  app.js       - Firebase config + USERS_BY_UID (UID -> "Dusan"/"Andrey")
  chat.js      - Firebase realtime chat logic
  ui.js        - vibe switching (Skog/Kikinda) + language toggle
  forest.css   - all styling, including vibe backgrounds
service-worker.js - PWA cache (bump CACHE version when assets change)
database.rules.json - RTDB security rules (UID allowlist for writes)
```

## Conventions
- Keep it vanilla JS — no frameworks.
- Background images live in `public/images/` and are applied via CSS
  `background-image` with a dark `linear-gradient` overlay for dimming.
  Don't bake dimming into the SVGs themselves — keep the overlay in `forest.css`.
- All paths must stay relative (GitHub Pages serves from `/skogschatt/` subpath).
- Both devices load the same deployed `app.js` — there is no per-device
  config file. Each person's display name ("Dusan"/"Andrey") is derived at
  runtime from their signed-in Google account UID via `USERS_BY_UID` in
  `src/app.js`. Adding a new person means adding their Google UID to both
  `USERS_BY_UID` and the allowlist in `database.rules.json`.
- Auth uses `signInWithRedirect` (not popup) for Google Sign-In — this is a
  `display: standalone` PWA, and OAuth popups are unreliable in iOS Safari
  standalone mode. A login screen (`#login-screen` in `index.html`) is shown
  until `onAuthStateChanged` reports a recognized user.
- Bump `CACHE` in `service-worker.js` whenever cached assets (HTML/CSS/JS/images) change.

## Deployment
- Live at: https://dbjarh.github.io/skogschatt/src/index.html
- Push to `master` → GitHub Pages rebuilds automatically.
