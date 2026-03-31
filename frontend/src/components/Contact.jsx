// ── Contact.jsx ──────────────────────────────────────────────
// Contact form with three states: idle → sending → success/error.
// On submit it POSTs JSON to /api/contact (the Flask backend).
// The VITE_API_URL env var lets you point at local Flask in dev
// and a deployed Render URL in production.
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import config from "../config";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Initial blank form state — defined outside so we can reset easily
const EMPTY = { name: "", email: "", message: "" };

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  // Form field values
  const [form, setForm] = useState(EMPTY);

  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  // Update a single field while keeping the rest intact
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();           // don't reload the page
    setStatus("sending");

    try {
      // The API base URL comes from the .env file:
      //   VITE_API_URL=http://localhost:5000  (local dev)
      //   VITE_API_URL=https://your-app.onrender.com  (production)
      const base = import.meta.env.VITE_API_URL || "";

      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(EMPTY);            // clear the form on success
      } else {
        setStatus("error");
      }
    } catch {
      // Network failure (Flask not running, CORS issue, etc.)
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact" ref={ref}>
      <div className={`contact-inner reveal ${isVisible ? "visible" : ""}`}>
        {/* Heading */}
        <p className="section-label">// contact</p>
        <h2 className="contact-heading">
          Let's build<br />
          <span className="accent">something.</span>
        </h2>
        <p className="contact-sub">
          Reach out for opportunities, collaborations, or just to say hello.
          I'll get back to you within 24 hours.
        </p>
        {/* Direct contact links below the form */}
        <div className="contact-links">
          <a href={`mailto:${config.email}`} className="contact-link">
            {config.email}
          </a>
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
              LinkedIn ↗
            </a>
          )}
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer" className="contact-link">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
