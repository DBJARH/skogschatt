//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup,
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { initChat } from "./chat.js";
import { initUI } from "./ui.js";
import { firebaseConfig } from "./app.js";
import { runTests } from "./tests.js";
import "./SKOGCHATT.js";

console.log("[index] loading, build_stamp =", window.SKOGCHATT.build_stamp);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js');
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

initUI();

const loginScreen = document.getElementById("login-screen");
const loginStatus = document.getElementById("login-status");
const signoutBtn = document.getElementById("signout-btn");

document.getElementById("google-signin-btn").addEventListener("click", () => {
  console.log("[index] sign-in button clicked");
  signInWithPopup(auth, new GoogleAuthProvider()).catch((err) => {
    console.log("[index] sign-in failed:", err.message);
    loginStatus.textContent = `Sign-in failed: ${err.message}`;
  });
});

signoutBtn.addEventListener("click", () => {
  console.log("[index] sign-out button clicked");
  signOut(auth);
});

// Writes to skogschatt/messages require sign-in (database.rules.json). The
// display label ("MALMO Andrey" / "KIKINDA Dusan") is looked up by scanning
// skogschatt/users for a matching email field.
let chatStarted = false;
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    console.log("[index] onAuthStateChanged: no user, showing login screen");
    loginScreen.hidden = false;
    signoutBtn.hidden = true;
    loginStatus.textContent = "";
    return;
  }

  console.log("[index] onAuthStateChanged: signed in as", user.email);

  const ok = await runTests(db, user);
  window.SKOGCHATT.testsPassed = ok;
  if (!ok) {
    console.log("[index] tests failed, not proceeding");
    loginScreen.hidden = false;
    signoutBtn.hidden = false;
    loginStatus.textContent =
      `Unrecognized account (${user.email}) — add it to skogschatt/users in the Firebase console. Sign out to try a different account.`;
    return;
  }

  const usersSnap = await get(ref(db, "skogschatt/users"));
  const users = usersSnap.val();
  const profile = Object.values(users).find((u) => u.email === user.email);

  const label = `${profile.community} ${profile.name}`;
  console.log("[index] profile resolved, label =", label);
  loginScreen.hidden = true;
  signoutBtn.hidden = false;
  if (!chatStarted) {
    chatStarted = true;
    initChat(db, label);
  }
});
