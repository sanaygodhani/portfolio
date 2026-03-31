// ── Experience.jsx ───────────────────────────────────────────
// Renders work experience from config.experience[].
// Layout: left column = meta (date, company, location)
//         right column = role title + bullet points
// ──────────────────────────────────────────────────────────────

import config from "../config";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Experience() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="experience-section" id="experience" ref={ref}>
      <div className={`section-header reveal ${isVisible ? "visible" : ""}`}>
        <p className="section-label">// work history</p>
        <h2 className="section-heading">
          Where I've <span className="stroke-text">shipped.</span>
        </h2>
      </div>

      <div className="exp-list">
        {config.experience.map((job, i) => (
          <div
            key={i}
            className={`exp-item reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {/* LEFT: meta info */}
            <div className="exp-meta">
              <p className="exp-date">{job.date}</p>
              <p className="exp-company">{job.company}</p>
              <p className="exp-location">{job.location}</p>
            </div>

            {/* RIGHT: role + bullets */}
            <div className="exp-content">
              <h3 className="exp-role">{job.role}</h3>
              <ul className="exp-bullets">
                {job.bullets.map((b, j) => (
                  // Each bullet has a CSS `—` pseudo-element as the marker
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
