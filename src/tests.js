//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Each test unit (TU) returns true/false and never throws — it catches its
// own errors, logs the happy or sad path via console.log, and returns false
// on failure. runTests() runs them in order and stops at the first failure.

function tuDbInitialized(db) {
  if (!db) {
    console.log("[tests] tuDbInitialized: FAIL - db is not initialized");
    return false;
  }
  console.log("[tests] tuDbInitialized: PASS");
  return true;
}

function tuUserSignedIn(user) {
  if (!user || !user.email) {
    console.log("[tests] tuUserSignedIn: FAIL - no signed-in user / user.email");
    return false;
  }
  console.log("[tests] tuUserSignedIn: PASS - signed in as", user.email);
  return true;
}

async function tuUsersReadable(db) {
  let snap;
  try {
    snap = await get(ref(db, "skogschatt/users"));
  } catch (err) {
    console.log("[tests] tuUsersReadable: FAIL - get(skogschatt/users) threw:", err.message);
    return false;
  }
  const users = snap.val();
  if (!users || Object.keys(users).length === 0) {
    console.log("[tests] tuUsersReadable: FAIL - skogschatt/users is empty or null", users);
    return false;
  }
  console.log("[tests] tuUsersReadable: PASS -", Object.keys(users).length, "entries", users);
  return true;
}

async function tuProfileFound(db, user) {
  let snap;
  try {
    snap = await get(ref(db, "skogschatt/users"));
  } catch (err) {
    console.log("[tests] tuProfileFound: FAIL - get(skogschatt/users) threw:", err.message);
    return false;
  }
  const users = snap.val() || {};
  const profile = Object.values(users).find((u) => u.email === user.email);
  if (!profile) {
    console.log("[tests] tuProfileFound: FAIL - no entry with email", user.email);
    return false;
  }
  console.log("[tests] tuProfileFound: PASS -", user.email, "->", profile);
  return true;
}

// Sanity checks run after sign-in, before any chat/profile UI logic.
// Returns true only if all checks pass; index.js must not proceed to app
// logic if this returns false.
export async function runTests(db, user) {
  console.log("[tests] starting");

  if (!tuDbInitialized(db)) return false;
  if (!tuUserSignedIn(user)) return false;
  if (!(await tuUsersReadable(db))) return false;
  if (!(await tuProfileFound(db, user))) return false;

  console.log("[tests] all checks passed");
  return true;
}
