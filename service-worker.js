const CACHE = "skogschatt-v29";
const ASSETS = [
  "./src/index.html",
  "./src/forest.css",
  "./src/app.js",
  "./src/chat.js",
  "./src/ui.js",
  "./src/index.js",
  "./src/tests.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request))
  );
});
