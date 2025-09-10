// settings.js
import { DEFAULT_SETTINGS } from './constants.js';
import { emitEvent } from './helpers.js';

let settings = { ...DEFAULT_SETTINGS };

async function init() {
  const stored = await chrome.storage.sync.get('settings');
  settings = { ...DEFAULT_SETTINGS, ...stored.settings };
  emitEvent('settingsLoaded', settings);
}

function shouldDetectMale() {
  return settings.detectMale;
}

function shouldDetectFemale() {
  return settings.detectFemale;
}

function shouldDetectImages() {
  return settings.detectImages;
}

function shouldBlurImages() {
  return settings.enabled;
}

function getWhitelist() {
  return settings.whitelist || [];
}

function getStrictness() {
  return settings.strictness;
}

function getBlurAmount() {
  return settings.blurAmount;
}

async function updateSettings(newSettings) {
  settings = { ...settings, ...newSettings };
  await chrome.storage.sync.set({ settings });
  emitEvent('settingsLoaded', settings);
}

export {
  init,
  shouldDetectMale,
  shouldDetectFemale,
  shouldDetectImages,
  shouldBlurImages,
  getWhitelist,
  getStrictness,
  getBlurAmount,
  updateSettings
};
