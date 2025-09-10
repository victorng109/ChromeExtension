import * as nsfwjs from 'nsfwjs';
import * as Human from '@vladmandic/human';

const HUMAN_CONFIG = {
  modelBasePath: '/models',
  face: { enabled: true, detector: { rotation: false }, mesh: { enabled: false } },
  body: { enabled: false },
  hand: { enabled: false },
  object: { enabled: false },
};

const frameCache = new Map();
const CACHE_TIMEOUT = 5000; // 5 giây

let humanModel = null;
let nsfwModel = null;

async function initModels() {
  try {
    humanModel = new Human.Human(HUMAN_CONFIG);
    await humanModel.load();
    nsfwModel = await nsfwjs.load('/models/nsfwjs/');
    console.log('Models loaded successfully');
  } catch (error) {
    console.error('Error loading models:', error);
    throw error;
  }
}

async function detectNSFW(image) {
  if (!nsfwModel) await initModels();
  try {
    const predictions = await nsfwModel.classify(image);
    return predictions.reduce((acc, pred) => {
      acc[pred.className.toLowerCase()] = pred.probability;
      return acc;
    }, {});
  } catch (error) {
    console.error('NSFW detection error:', error);
    return null;
  }
}

async function detectFaceAndGender(image) {
  if (!humanModel) await initModels();
  try {
    const result = await humanModel.detect(image);
    const faces = result.face || [];
    return faces.map(face => ({
      gender: face.gender || 'unknown',
      confidence: face.genderScore || 0,
    }));
  } catch (error) {
    console.error('Face/Gender detection error:', error);
    return [];
  }
}

// Phát hiện nội dung với cache
async function detectContent(element, settings) {
  const cacheKey = element.src || element.currentSrc;
  const cached = frameCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
    return cached.result;
  }

  const image = await convertToImage(element);
  const nsfwResult = await detectNSFW(image);
  const faceResult = settings.shouldDetectFaces ? await detectFaceAndGender(image) : [];

  const result = { nsfw: nsfwResult, faces: faceResult };
  frameCache.set(cacheKey, { result, timestamp: Date.now() });

  if (frameCache.size > 1000) {
    const oldestKey = frameCache.keys().next().value;
    frameCache.delete(oldestKey);
  }

  return result;
}

// Chuyển đổi element thành image cho phân tích
async function convertToImage(element) {
  return new Promise((resolve, reject) => {
    if (element.tagName === 'IMG') {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = element.src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    } else if (element.tagName === 'VIDEO') {
      const canvas = document.createElement('canvas');
      canvas.width = element.videoWidth;
      canvas.height = element.videoHeight;
      canvas.getContext('2d').drawImage(element, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    } else {
      reject(new Error('Unsupported element type'));
    }
  });
}

export { initModels, detectContent };
