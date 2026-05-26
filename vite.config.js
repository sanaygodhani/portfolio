import { defineConfig } from 'vite';

export default defineConfig({
  // Set base to './' for relative paths, or '/repo-name/' for GitHub Pages
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
  }
});
