// observers.js
import { processNode, hasBeenProcessed, listenToEvent } from './helpers.js';
import { processImage, processVideo } from './processing2.js';

let observer = null;

function initMutationObserver(settings) {
  observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => observeNode(node, settings));
      if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
        observeNode(mutation.target, settings);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src']
  });
}

function observeNode(node, settings) {
  if (!processNode(node) || hasBeenProcessed(node)) return;
  if (node.tagName === 'IMG' && settings.detectImages) {
    processImage(node, settings);
  } else if (node.tagName === 'VIDEO' && settings.detectVideos) {
    processVideo(node, settings);
  }
}

function startObserving(settings) {
  if (observer) observer.disconnect();
  initMutationObserver(settings);
}

function killObserver() {
  if (observer) observer.disconnect();
}

function attachObserversListener(settings) {
  listenToEvent('settingsLoaded', ({ detail }) => startObserving(detail));
  listenToEvent('toggleOnOffStatus', ({ detail }) => {
    if (detail) startObserving(settings);
    else killObserver();
  });
}

export { startObserving, initMutationObserver, observeNode, killObserver, attachObserversListener };
