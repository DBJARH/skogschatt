//-----------------------------------------------
// NOTE: This file relies on the host (index.html) loading it via
// <script type="module">. The `import`/`export` syntax below is only
// valid because of that — there is no in-language "module" keyword;
// module-ness is granted externally by the browser/HTML, not the file itself.
//-----------------------------------------------

import { ref, push, onChildAdded, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Writes to skogschatt/messages require sign-in (database.rules.json),
// enforced server-side. `_user` here is just a display label
// ("MALMO Andrey" / "KIKINDA Dusan") for rendering, not an access control.
let _db, _user;

export function initChat(db, user) {
  _db = db;
  _user = user;

  const messagesRef = ref(_db, "skogschatt/messages");

  // Listen for new messages
  onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    renderMessage(msg);
  });

  // Send on button click
  document.getElementById("send-btn").addEventListener("click", sendMessage);

  // Send on Enter key
  document.getElementById("msg-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

function sendMessage() {
  const input = document.getElementById("msg-input");
  const text = input.value.trim();
  if (!text) return;

  const messagesRef = ref(_db, "skogschatt/messages");
  push(messagesRef, {
    user: _user,
    text,
    ts: serverTimestamp()
  });

  input.value = "";
}

function renderMessage(msg) {
  const container = document.getElementById("messages");
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(msg.user === _user ? "me" : "them");

  div.innerHTML = `
    <span class="sender">${msg.user}</span>
    <span class="bubble">${escapeHtml(msg.text)}</span>
  `;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
