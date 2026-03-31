// ── Navbar.jsx ──────────────────────────────────────────────
// Fixed top navigation bar. Reads name + email from config.
// Becomes slightly opaque on scroll via a CSS class toggle.
// ──────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Add the `scrolled` class once user scrolls 40px —
  // CSS will darken the background for readability
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="nav-logo">
        5.
        {/* {config.name.split(" ").map(w => w[0]).join("")}. */}
      </a>

      {/* Section links — smooth scroll via CSS scroll-behavior */}
      <ul className="nav-links">
        {["skills", "experience", "projects", "about", "contact"].map(id => (
          <li key={id}>
            <a href={`#${id}`}>{id}</a>
          </li>
        ))}
      </ul>

      {/* CTA button linking to contact section */}
      <a href="#contact" className="nav-cta">Get in touch →</a>
    </nav>
  );
}
