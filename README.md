# 🚀 Chrome Extension (Modified from HaramBlur)

## 📌 Introduction
This repository is a **modified Chrome Extension** based on the original project [HaramBlur](https://github.com/alganzory/HaramBlur).  

This extension is designed to **blur NSFW or sensitive images and videos** on websites.  
It aims to support **parents and educational institutions** by helping prevent children from being exposed to inappropriate content online.  

The project is being developed and maintained by **XDynamic**.

---

## 📂 Repository Structure
The repo is organized in a modular way (background, content, modules, offscreen, ui, assets...).  
Some key modules include:
- **detector.js** → Detects NSFW content / faces / gender.
- **helpers.js** → Utility functions for DOM, media, and canvas handling.
- **observers.js** → Monitors dynamic DOM changes using MutationObserver.
- **processing2.js** → Handles video & image processing and applies blur.
- **queues.js** → Manages processing queues.
- **settings.js** → Manages user configuration and preferences.
- **style.js** → Applies CSS blur and visual effects.
- **background.js** → Controls background logic & global state.
- **content.js** → Main entry point injected into each page.
- **offscreen.js** → Heavy AI processing in offscreen documents.
- **popup.js** → Currently no corresponding `popup.html`.
- **manifest.json** → Chrome extension configuration file.

---

## 📦 Requirements
To make the extension functional, additional **models** must be placed inside the `assets/` directory, as described in the original HaramBlur repo.  

For example (illustration from HaramBlur):  
<img width="1468" height="238" alt="image" src="https://github.com/user-attachments/assets/097cec82-a54a-4357-bbfc-af2a74da98d0" />


---

## 🖥️ Current Status
- The repo **does not include `popup.html`** yet, only `popup.js`.  
- A popup page can be added later to let users toggle the extension or adjust settings from the UI.  
- The extension was tested by loading in **Chrome (chrome://extensions/ → Load unpacked)** but is **not functional yet**.  
- Models and configuration adjustments are required before it can work properly.  

---

## 📚 References
- Original repository: [HaramBlur](https://github.com/alganzory/HaramBlur)  
- Chrome Extension Docs: [Chrome Developers](https://developer.chrome.com/docs/extensions/)

---
