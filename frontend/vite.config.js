// vite.config.js
// ──────────────────────────────────────────────────────────────
// Vite build configuration.
// `base` is set to './' so the built HTML uses relative paths —
// required for GitHub Pages where your site lives at
// https://username.github.io/repo-name/
// ──────────────────────────────────────────────────────────────
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/portfolio/",

  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
