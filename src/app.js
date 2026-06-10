//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

// Firebase config — fill in after creating your Firebase project
export const firebaseConfig = {
  apiKey: "AIzaSyCRh_Dcp5sXpYT8FOKfNrI5fk918BLSBD4",
  authDomain: "skogschatt-f5a2a.firebaseapp.com",
  databaseURL: "https://skogschatt-f5a2a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "skogschatt-f5a2a",
  storageBucket: "skogschatt-f5a2a.firebasestorage.app",
  messagingSenderId: "309154824117",
  appId: "1:309154824117:web:ebae499cf4a85edbf523fc"
};

// Maps each person's Google account UID (from Firebase Google Sign-In) to a
// display name. Both devices load this same deployed app.js, so the display
// name can't be a hardcoded constant — it's derived from the signed-in
// user's UID at runtime (see index.html). These UIDs must match the
// allowlist in database.rules.json (that file is the actual security
// boundary). Unlike anonymous-auth UIDs, these are tied to a Google account
// and stay stable across cache clears, browser switches, and reinstalls —
// only changing if a different Google account signs in.
//
// PLACEHOLDER VALUES below are the old anonymous-auth UIDs. After enabling
// Google Sign-In in the Firebase Console and signing in once per device,
// replace these with the new Google UIDs (see PLAN.md).
export const USERS_BY_UID = {
  "gMGU7BE9XaM9tcDOaVirBPlQ2032": "Dusan",
  "U5zgSRvu8OhOudwDV0BfDuP9Dvp1": "Andrey"
};
