import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Multi-page build: homepage + write-up page
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        post: resolve(import.meta.dirname, 'post.html'),
      },
    },
  },
});
