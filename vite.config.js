// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        background: 'background.js',
        content: 'content.js',
        offscreen: 'offscreen.js',
        popup: 'popup.js'
      }
    }
  }
});
