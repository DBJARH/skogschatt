//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Sanity checks run after sign-in, before any chat/profile UI logic.
// Each check logs its own pass/fail. Returns true only if all checks pass;
// index.js must not proceed to app logic if this returns false.
export async function runTests(db, user) {
  console.log("[tests] starting, signed in as", user.email);

  if (!db) {
    console.log("[tests] FAIL: db is not initialized");
    return false;
  }
  console.log("[tests] PASS: db is initialized");

  if (!user || !user.email) {
    console.log("[tests] FAIL: no signed-in user / user.email");
    return false;
  }
  console.log("[tests] PASS: signed-in user has email", user.email);

  let usersSnap;
  try {
    usersSnap = await get(ref(db, "skogschatt/users"));
  } catch (err) {
    console.log("[tests] FAIL: get(skogschatt/users) threw:", err.message);
    return false;
  }

  const users = usersSnap.val();
  if (!users || Object.keys(users).length === 0) {
    console.log("[tests] FAIL: skogschatt/users is empty or null", users);
    return false;
  }
  console.log("[tests] PASS: skogschatt/users has", Object.keys(users).length, "entries", users);

  const profile = Object.values(users).find((u) => u.email === user.email);
  if (!profile) {
    console.log("[tests] FAIL: no skogschatt/users entry with email", user.email);
    return false;
  }
  console.log("[tests] PASS: found profile for", user.email, "->", profile);

  console.log("[tests] all checks passed");
  return true;
}
