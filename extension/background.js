/* global chrome */
// Tommy background service worker (Manifest V3)

// Create context menu for quick asking
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "tommy-ask",
    title: "Ask Tommy",
    contexts: ["selection", "page"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "tommy-ask" || !tab?.id) return;
  const tabId = tab.id;
  const context = await getTabContext(tabId);
  if (!context) return;

  const restricted = await isRestrictedForHost(context.hostname);
  if (restricted) {
    await chrome.tabs.sendMessage(tabId, { type: "TOMMY_SHOW_ANSWER", payload: { question: info.selectionText || "", answer: "Restricted", hostname: context.hostname } });
    return;
  }

  const answer = generateConciseAnswer(info.selectionText || "", context);
  await chrome.tabs.sendMessage(tabId, { type: "TOMMY_SHOW_ANSWER", payload: { question: info.selectionText || "", answer, hostname: context.hostname } });
});

// Handle messages from popup or content
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "POPUP_ASK") {
    (async () => {
      const { tabId, question } = message;
      const context = await getTabContext(tabId);
      if (!context) {
        sendResponse({ ok: false, error: "No context" });
        return;
      }
      const restricted = await isRestrictedForHost(context.hostname);
      if (restricted) {
        sendResponse({ ok: true, answer: "Restricted" });
        return;
      }
      const answer = generateConciseAnswer(question || "", context);
      sendResponse({ ok: true, answer });
    })();
    return true; // keep channel open
  }

  if (message?.type === "GET_SETTINGS") {
    (async () => {
      const settings = await getSettings();
      sendResponse({ ok: true, settings });
    })();
    return true;
  }

  if (message?.type === "TOGGLE_RESTRICT") {
    (async () => {
      const current = await getSettings();
      const next = { ...current, restrictToAllowed: !!message.value };
      await chrome.storage.sync.set({ tommySettings: next });
      sendResponse({ ok: true, settings: next });
    })();
    return true;
  }

  if (message?.type === "ALLOW_HOST") {
    (async () => {
      const { host, allow } = message;
      const current = await getSettings();
      const set = new Set(current.allowedHosts || []);
      if (allow) set.add(host);
      else set.delete(host);
      const next = { ...current, allowedHosts: Array.from(set) };
      await chrome.storage.sync.set({ tommySettings: next });
      sendResponse({ ok: true, settings: next });
    })();
    return true;
  }
});

async function getSettings() {
  const { tommySettings } = await chrome.storage.sync.get({
    tommySettings: { restrictToAllowed: false, allowedHosts: [] }
  });
  return tommySettings;
}

async function isRestrictedForHost(hostname) {
  const settings = await getSettings();
  if (!settings.restrictToAllowed) return false;
  return !(settings.allowedHosts || []).includes(hostname);
}

async function getTabContext(tabId) {
  try {
    const res = await chrome.tabs.sendMessage(tabId, { type: "TOMMY_GET_CONTEXT" });
    return res;
  } catch (e) {
    return null;
  }
}

// Core concise answer logic: returns one word OR one short sentence
function generateConciseAnswer(question, context) {
  const text = (context?.selection || "").trim() || (context?.title || "").trim() || (context?.text || "").slice(0, 500);
  const q = (question || "").trim();

  // If prompt asks for one word explicitly
  if (/\b(one\s*word|single\s*word)\b/i.test(q)) {
    const w = topKeyword(text);
    return w || "OK";
  }

  // If short selection, produce one word
  if (text.split(/\s+/).length <= 3) {
    return topKeyword(text) || text || "OK";
  }

  // Otherwise produce one short sentence (max ~12 words)
  const sentence = summarizeToOneSentence(text, q);
  return sentence;
}

function topKeyword(text) {
  const stop = new Set(["the","a","an","and","or","of","to","in","on","for","with","is","are","was","were","be","as","by","at","from","that","this","it","its","into","over","under","than","then","but","so","if"]);
  const words = (text.toLowerCase().match(/[a-zA-Z][a-zA-Z\-']+/g) || []).filter(w => !stop.has(w));
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  let top = ""; let max = 0;
  for (const [w, c] of freq) if (c > max) { max = c; top = w; }
  return top.charAt(0).toUpperCase() + top.slice(1);
}

function summarizeToOneSentence(text, question) {
  const sentences = (text.match(/[^.!?]+[.!?]/g) || [text]).map(s => s.trim());
  let s = sentences[0] || text;
  // Prefer sentence that mentions keywords in question
  if (question) {
    const qWords = (question.toLowerCase().match(/[a-zA-Z][a-zA-Z\-']+/g) || []).slice(0, 5);
    const scored = sentences.map(sn => ({ sn, score: qWords.reduce((acc, qw) => acc + (sn.toLowerCase().includes(qw) ? 1 : 0), 0) }));
    scored.sort((a, b) => b.score - a.score);
    s = (scored[0] && scored[0].score > 0) ? scored[0].sn : s;
  }
  // Trim to ~12 words
  const words = s.split(/\s+/).slice(0, 12);
  let short = words.join(" ");
  if (!/[.!?]$/.test(short)) short += ".";
  return short;
}
