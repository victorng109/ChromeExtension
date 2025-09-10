// queues.js
const maxLoading = 100;
const maxProcessing = 1;
const loadingQueue = [];
const processingQueue = [];

async function handleElementLoading(element, loadFn) {
  if (loadingQueue.length >= maxLoading) return;
  loadingQueue.push(element);
  try {
    const data = await loadFn(element);
    loadingQueue.splice(loadingQueue.indexOf(element), 1);
    handleElementProcessing(element, data);
  } catch (error) {
    console.error('Loading error:', error);
    loadingQueue.splice(loadingQueue.indexOf(element), 1);
  }
}

async function handleElementProcessing(element, data) {
  if (processingQueue.length >= maxProcessing) {
    setTimeout(() => handleElementProcessing(element, data), 100);
    return;
  }
  processingQueue.push(element);
  try {
    const result = await processData(data);
    processingQueue.splice(processingQueue.indexOf(element), 1);
    return result;
  } catch (error) {
    console.error('Processing error:', error);
    processingQueue.splice(processingQueue.indexOf(element), 1);
  }
}

async function processData(data) {
  // Placeholder for actual processing logic
  return data;
}

export { handleElementLoading, handleElementProcessing };
