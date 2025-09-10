// processing2.js
import { loadImage, loadVideo, getCanvas, canvToBlob, applyBlurryStart, setStyle } from './helpers.js';
import { detectContent } from './detector.js';
import { FRAME_RATE, POSITIVE_THRESHOLD, NEGATIVE_THRESHOLD } from './constants.js';

async function processImage(element, settings) {
  applyBlurryStart(element);
  const blob = await canvToBlob(await loadImage(element.src));
  const result = await new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'processImage', blob }, resolve);
  });
  if (shouldBlur(result, settings)) {
    setStyle(element, true);
  } else {
    setStyle(element, false);
  }
}

async function processVideo(element, settings) {
  let positiveCount = 0;
  let negativeCount = 0;
  const canvas = getCanvas(element.videoWidth, element.videoHeight);

  async function videoDetectionLoop() {
    if (!element.isConnected || !settings.enabled) return;
    const frame = await loadVideo(element);
    const blob = await canvToBlob(frame);
    const result = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'processVideoFrame', blob }, resolve);
    });

    if (shouldBlur(result, settings)) {
      positiveCount++;
      negativeCount = 0;
      if (positiveCount >= POSITIVE_THRESHOLD) {
        setStyle(element, true);
      }
    } else {
      negativeCount++;
      positiveCount = 0;
      if (negativeCount >= NEGATIVE_THRESHOLD) {
        setStyle(element, false);
      }
    }

    setTimeout(videoDetectionLoop, 1000 / FRAME_RATE);
  }

  videoDetectionLoop();
}

function shouldBlur(result, settings) {
  if (!result) return false;
  const { nsfw, faces } = result;
  const isNSFW = nsfw && (nsfw.porn > settings.strictness || nsfw.hentai > settings.strictness || nsfw.sexy > settings.strictness);
  const hasFace = faces.some(face => 
    (settings.shouldDetectMale && face.gender === 'male') ||
    (settings.shouldDetectFemale && face.gender === 'female')
  );
  return isNSFW || hasFace;
}

export { processImage, processVideo };
