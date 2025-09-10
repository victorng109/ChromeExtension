// background.js
import { DEFAULT_SETTINGS } from './constants.js';
import { updateSettings } from './settings.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ settings: DEFAULT_SETTINGS });
  createContextMenus();
});

async function createOffscreenDoc() {
  if (!(await chrome.offscreen.hasDocument())) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['WORKER'],
      justification: 'Run ML models for content detection'
    });
  }
}

function createContextMenus() {
  chrome.contextMenus.create({
    id: 'toggleHaramBlur',
    title: 'Toggle HaramBlur',
    contexts: ['all']
  });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'toggleHaramBlur') {
    chrome.storage.sync.get('settings', ({ settings }) => {
      updateSettings({ enabled: !settings.enabled });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getSettings') {
    chrome.storage.sync.get('settings', ({ settings }) => sendResponse(settings));
  } else if (message.type === 'processImage' || message.type === 'processVideoFrame') {
    createOffscreenDoc().then(() => {
      chrome.runtime.sendMessage(message, sendResponse);
    });
    return true; // Keep message channel open
  } else if (message.type === 'reloadExtension') {
    chrome.runtime.reload();
  }
  return true;
});
