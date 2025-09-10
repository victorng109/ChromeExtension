// Tải hình ảnh với CORS
async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
}

// Tải frame video
async function loadVideo(videoElement) {
  return new Promise((resolve, reject) => {
    if (videoElement.readyState >= 2) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    } else {
      videoElement.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        resolve(canvas);
      }, { once: true });
      videoElement.onerror = () => reject(new Error('Failed to load video'));
    }
  });
}

// Kiểm tra kích thước hình ảnh
function isImageTooSmall(img) {
  return img.width < 50 || img.height < 50;
}

// Tính toán resize
function calcResize(width, height, maxSize = 512) {
  const ratio = Math.min(maxSize / width, maxSize / height, 1);
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) };
}

// Xử lý node
function processNode(node) {
  if (node.tagName === 'IMG' || node.tagName === 'VIDEO') {
    node.dataset.processed = 'true';
    return true;
  }
  return false;
}

// Kiểm tra trạng thái xử lý
function hasBeenProcessed(node) {
  return node.dataset.processed === 'true';
}

// Reset phần tử
function resetElement(node) {
  delete node.dataset.processed;
  node.style.filter = '';
}

// Tạo canvas
function getCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// Chuyển canvas sang blob
async function canvToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(blob => resolve(blob));
  });
}

// Bật/tắt video
function disableVideo(video) {
  video.pause();
  video.style.display = 'none';
}

function enableVideo(video) {
  video.style.display = '';
  video.play();
}

// Cập nhật trạng thái video nền
function updateBGvideoStatus(video, status) {
  video.dataset.bgStatus = status;
}

// Phát sự kiện
function emitEvent(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

// Lắng nghe sự kiện
function listenToEvent(name, callback) {
  window.addEventListener(name, callback);
}

// Đo thời gian
function timeTaken(callback) {
  const start = performance.now();
  callback();
  return performance.now() - start;
}

export {
  loadImage,
  loadVideo,
  isImageTooSmall,
  calcResize,
  processNode,
  hasBeenProcessed,
  resetElement,
  getCanvas,
  canvToBlob,
  disableVideo,
  enableVideo,
  updateBGvideoStatus,
  emitEvent,
  listenToEvent,
  timeTaken
};
