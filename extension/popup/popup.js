// popup.js
import { updateSettings, getWhitelist } from './settings.js';

async function loadLocalSettings() {
  const settings = await new Promise(resolve => {
    chrome.runtime.sendMessage({ type: 'getSettings' }, resolve);
  });
  updateUI(settings);
}

async function getCurrentWebsite() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tabs[0].url);
  return url.hostname;
}

function updateUI(settings) {
  document.getElementById('toggle').checked = settings.enabled;
  document.getElementById('blurAmount').value = settings.blurAmount;
  document.getElementById('detectImages').checked = settings.detectImages;
  document.getElementById('detectVideos').checked = settings.detectVideos;
  document.getElementById('detectMale').checked = settings.detectMale;
  document.getElementById('detectFemale').checked = settings.detectFemale;
}

async function init() {
  await loadLocalSettings();
  const domain = await getCurrentWebsite();
  document.getElementById('whitelist').value = getWhitelist().join('\n');

  document.getElementById('toggle').addEventListener('change', (e) => {
    updateSettings({ enabled: e.target.checked });
  });
  document.getElementById('blurAmount').addEventListener('input', (e) => {
    updateSettings({ blurAmount: parseInt(e.target.value) });
  });
  document.getElementById('detectImages').addEventListener('change', (e) => {
    updateSettings({ detectImages: e.target.checked });
  });
  document.getElementById('detectVideos').addEventListener('change', (e) => {
    updateSettings({ detectVideos: e.target.checked });
  });
  document.getElementById('detectMale').addEventListener('change', (e) => {
    updateSettings({ detectMale: e.target.checked });
  });
  document.getElementById('detectFemale').addEventListener('change', (e) => {
    updateSettings({ detectFemale: e.target.checked });
  });
  document.getElementById('whitelist').addEventListener('change', (e) => {
    updateSettings({ whitelist: e.target.value.split('\n').filter(Boolean) });
  });
}

document.addEventListener('DOMContentLoaded', init);
