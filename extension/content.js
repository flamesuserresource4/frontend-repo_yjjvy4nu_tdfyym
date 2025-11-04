// Tommy content script: provides context and shows a tiny overlay answer bubble

function getHostname() {
  try { return location.hostname.replace(/^www\./, ""); } catch { return ""; }
}

function extractText() {
  // Use body innerText for simplicity, capped to avoid bloat
  const t = (document.body?.innerText || "").replace(/\s+/g, " ").trim();
  return t.slice(0, 4000);
}

function getSelectionText() {
  return (window.getSelection()?.toString() || "").trim();
}

let bubbleRoot = null;
function showBubble(question, answer) {
  if (!bubbleRoot) {
    bubbleRoot = document.createElement("div");
    bubbleRoot.id = "tommy-bubble";
    Object.assign(bubbleRoot.style, {
      position: "fixed",
      right: "16px",
      bottom: "16px",
      zIndex: 2147483647,
      maxWidth: "360px",
      fontFamily: "-apple-system, system-ui, Segoe UI, Roboto, Inter, sans-serif"
    });
    document.documentElement.appendChild(bubbleRoot);
  }
  bubbleRoot.innerHTML = "";

  const card = document.createElement("div");
  Object.assign(card.style, {
    background: "white",
    color: "#0f172a",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(2,6,23,0.15)",
    overflow: "hidden"
  });

  const head = document.createElement("div");
  head.textContent = "Tommy";
  Object.assign(head.style, { padding: "10px 12px", fontWeight: 600, fontSize: "14px", borderBottom: "1px solid rgba(0,0,0,0.06)" });

  const body = document.createElement("div");
  Object.assign(body.style, { padding: "12px" });

  if (question) {
    const q = document.createElement("div");
    q.textContent = `Q: ${question}`;
    Object.assign(q.style, { fontSize: "12px", color: "#475569", marginBottom: "8px" });
    body.appendChild(q);
  }

  const a = document.createElement("div");
  a.textContent = answer || "";
  Object.assign(a.style, { fontSize: "14px", fontWeight: 600 });
  body.appendChild(a);

  const row = document.createElement("div");
  Object.assign(row.style, { display: "flex", gap: "8px", padding: "10px 12px", borderTop: "1px solid rgba(0,0,0,0.06)", alignItems: "center" });

  const close = document.createElement("button");
  close.textContent = "Close";
  Object.assign(close.style, { fontSize: "12px", padding: "6px 10px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.12)", background: "white", cursor: "pointer" });
  close.addEventListener("click", () => { bubbleRoot?.remove(); bubbleRoot = null; });
  row.appendChild(close);

  card.appendChild(head);
  card.appendChild(body);
  card.appendChild(row);
  bubbleRoot.appendChild(card);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "TOMMY_GET_CONTEXT") {
    sendResponse({
      title: document.title || "",
      text: extractText(),
      selection: getSelectionText(),
      hostname: getHostname()
    });
    return true;
  }
  if (message?.type === "TOMMY_SHOW_ANSWER") {
    const { question, answer } = message.payload || {};
    showBubble(question, answer);
  }
});
