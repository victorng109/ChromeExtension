{
  "manifest_version": 3,
  "name": "HaramBlur",
  "version": "1.0.0",
  "description": "A Chrome extension to detect and blur sensitive content.",
  "permissions": [
    "storage",
    "offscreen",
    "contextMenus"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": [
        "constants.js",
        "helpers.js",
        "detector.js",
        "style.js",
        "processing2.js",
        "observers.js",
        "queues.js",
        "settings.js",
        "content.js"
      ]
    }
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "web_accessible_resources": [
    {
      "resources": ["models/*"],
      "matches": ["<all_urls>"]
    }
  ],
  "icons": {
    "128": "assets/icon128.png"
  }
}
