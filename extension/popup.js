/* global chrome */

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0];
}

function getHostFromUrl(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

async function getSettings() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (res) => {
      resolve(res?.settings || { restrictToAllowed: false, allowedHosts: [], backendEnabled: false, backendUrl: "" });
    });
  });
}

async function toggleRestrict(v) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "TOGGLE_RESTRICT", value: v }, (res) => resolve(res?.settings));
  });
}

async function allowHost(host, allow) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "ALLOW_HOST", host, allow }, (res) => resolve(res?.settings));
  });
}

async function setBackendEnabled(v) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "SET_BACKEND_ENABLED", value: v }, (res) => resolve(res?.settings));
  });
}

async function setBackendUrl(url) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "SET_BACKEND_URL", value: url }, (res) => resolve(res?.settings));
  });
}

async function askTommy(tabId, question) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ type: "POPUP_ASK", tabId, question }, (res) => {
      resolve(res?.answer || "");
    });
  });
}

(async function init() {
  const tab = await getActiveTab();
  const host = getHostFromUrl(tab?.url || "");

  const restrictEl = document.getElementById("restrict");
  const useBackendEl = document.getElementById("use-backend");
  const backendUrlEl = document.getElementById("backend-url");
  const qEl = document.getElementById("q");
  const aEl = document.getElementById("a");
  const askBtn = document.getElementById("ask");
  const sitePill = document.getElementById("site-pill");
  const toggleSiteBtn = document.getElementById("toggle-site");
  const copyAnswerBtn = document.getElementById("copy-answer");

  sitePill.textContent = `site: ${host || "—"}`;

  let settings = await getSettings();
  restrictEl.checked = !!settings.restrictToAllowed;
  useBackendEl.checked = !!settings.backendEnabled;
  backendUrlEl.value = settings.backendUrl || "";

  const isAllowed = (settings.allowedHosts || []).includes(host);
  toggleSiteBtn.textContent = isAllowed ? "Remove site" : "Allow site";

  restrictEl.addEventListener("change", async (e) => {
    settings = await toggleRestrict(e.target.checked);
  });

  useBackendEl.addEventListener("change", async (e) => {
    settings = await setBackendEnabled(e.target.checked);
  });

  backendUrlEl.addEventListener("change", async (e) => {
    const url = e.target.value.trim();
    settings = await setBackendUrl(url);
  });

  toggleSiteBtn.addEventListener("click", async () => {
    const nowAllowed = !(settings.allowedHosts || []).includes(host);
    settings = await allowHost(host, nowAllowed);
    toggleSiteBtn.textContent = nowAllowed ? "Remove site" : "Allow site";
  });

  askBtn.addEventListener("click", async () => {
    const question = (qEl.value || "").trim();
    aEl.textContent = "…";
    const answer = await askTommy(tab.id, question);
    aEl.textContent = answer || "";
  });

  copyAnswerBtn.addEventListener("click", async () => {
    const text = (aEl.textContent || "").trim();
    if (!text) return;
    try { await navigator.clipboard.writeText(text); copyAnswerBtn.textContent = "Copied"; setTimeout(() => copyAnswerBtn.textContent = "Copy", 1200); } catch {}
  });
})();
