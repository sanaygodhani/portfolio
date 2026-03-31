// ── main.jsx ─────────────────────────────────────────────────
// Vite's entry point. Mounts the React app into <div id="root">
// in index.html, and imports global CSS.
// ──────────────────────────────────────────────────────────────

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";   // all global styles live here
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
