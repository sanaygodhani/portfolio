// ── Footer.jsx ───────────────────────────────────────────────
// Simple footer bar: name on the left, copyright on the right.
// ──────────────────────────────────────────────────────────────

import config from "../config";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-name">{config.name}</span>
      <span className="footer-copy">
        © {new Date().getFullYear()} — Built with React
      </span>
    </footer>
  );
}
