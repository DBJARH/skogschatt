function getTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// --------------------------------------------------
// window.SKOGCHATT is the single diagnostic object, inspectable in the dev
// console via console.dir(SKOGCHATT). Defined fully here; other modules only
// set/append properties on it, never redefine it. Known properties:
//
//   build_stamp - local time this page was loaded (set below)
//   testsPassed - set by index.js after sign-in: result of tests.js runTests()
//
// See the dev console for [tests]/[index] log lines with full diagnostic
// detail (profile lookups, skogschatt/users contents, etc.).
// --------------------------------------------------
export const SKOGCHATT = {
  build_stamp: getTimestamp(),
  testsPassed: "INITIAL_VALUE"
};

window.SKOGCHATT = SKOGCHATT;