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
//   build_stamp       - local time this page was loaded (set below)
//   lastProfileLookup - set by index.html after sign-in: { email, result|error }
// --------------------------------------------------
export const SKOGCHATT = {
  build_stamp: getTimestamp(),
  lastProfileLookup: "INITIAL_VALUE"
};

window.SKOGCHATT = SKOGCHATT;