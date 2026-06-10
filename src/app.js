//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

// Firebase config — fill in after creating your Firebase project
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Change this per device: "Dusan" on your machine, "Andrey" on Andrey's
export const LOCAL_USER = "Dusan";

// Client-side sanity check only — catches typos in LOCAL_USER above.
// This is NOT the security boundary: actual write access is enforced by
// Firebase Auth (anonymous sign-in) + the UID allowlist in
// database.rules.json, on the backend.
export const ALLOWED_USERS = ["Dusan", "Andrey"];
