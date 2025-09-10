// offscreen.js
import { initModels, detectContent } from './detector.js';

async function loadModels() {
  await initModels();
}

async function handleImageDetection(blob, settings) {
  const img = await createImageBitmap(blob);
  return detectContent(img, settings);
}

async function handleVideoDetection(blob, settings) {
  const img = await createImageBitmap(blob);
  return detectContent(img, settings);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'processImage') {
    handleImageDetection(message.blob, message.settings).then(sendResponse);
  } else if (message.type === 'processVideoFrame') {
    handleVideoDetection(message.blob, message.settings).then(sendResponse);
  }
  return true; // Keep message channel open
});

loadModels();
