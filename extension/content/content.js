// content.js
import { init as initSettings, getWhitelist } from './settings.js';
import { startObserving, killObserver } from './observers.js';
import { initStylesheets, attachStyleListener } from './style.js';

function attachAllListeners() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getDomain') {
      sendResponse({ domain: window.location.hostname });
    }
  });
}

async function init() {
  if (window.self !== window.top) return; // Chỉ chạy trên top frame
  await initSettings();
  const whitelist = getWhitelist();
  if (whitelist.includes(window.location.hostname)) {
    killObserver();
    return;
  }
  initStylesheets();
  attachStyleListener();
  startObserving();
  attachAllListeners();
}

init();
