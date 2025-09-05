// Function to scan all images on the page
function scanImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.src) {
      console.log('Scanning image:', img.src); // Log để debug
      // TODO: Integrate NSFW detection here (e.g., using NSFW.js or API)
      // If NSFW detected, block it: img.style.display = 'none'; or replace with placeholder
      // Example placeholder: img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent image
    }
  });
}

// Run scan when page loads
document.addEventListener('DOMContentLoaded', scanImages);

// Use MutationObserver to detect dynamic changes (e.g., search results loading via AJAX)
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach(node => {
        if (node.tagName === 'IMG' || node.querySelectorAll('img').length > 0) {
          scanImages(); // Re-scan when new images are added
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Optional: Listen for search events (e.g., on Google, but generalize)
window.addEventListener('load', scanImages); // Extra scan on full load
