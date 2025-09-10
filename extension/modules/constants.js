// constants.js
export const DEFAULT_SETTINGS = {
  enabled: true,
  blurAmount: 10,
  detectImages: true,
  detectVideos: true,
  detectMale: true,
  detectFemale: true,
  strictness: 0.7,
  whitelist: []
};

export const STATUSES = {
  ERROR: 'error',
  OBSERVED: 'observed',
  QUEUED: 'queued',
  LOADING: 'loading',
  PROCESSING: 'processing',
  PROCESSED: 'processed'
};

export const FRAME_RATE = 25; // FPS cho xử lý video
export const POSITIVE_THRESHOLD = 3; // Số frame dương tính để áp dụng blur
export const NEGATIVE_THRESHOLD = 5; // Số frame âm tính để gỡ blur
