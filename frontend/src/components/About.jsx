// ── About.jsx ────────────────────────────────────────────────
// Two-column layout:
//   Left  → short bio paragraph derived from config fields
//   Right → education card with degree, school, and interest chips
// ──────────────────────────────────────────────────────────────

import config from "../config";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  const edu = config.education; // shorthand

  return (
    <section className="about-section" id="about" ref={ref}>
      {/* LEFT column */}
      <div className={`about-left reveal ${isVisible ? "visible" : ""}`}>
        <p className="section-label">// about me</p>
        <h2 className="section-heading" style={{ marginBottom: "32px" }}>
          The person<br />
          <span className="stroke-text">behind the code.</span>
        </h2>

        {/* Bio text — built from config.name, location, bio */}
        <div className="about-text">
          <p>
            I'm <strong>{config.name}</strong>, a software engineer based in{" "}
            {config.location}. {config.bio}
          </p>
          <p style={{ marginTop: "20px" }}>
            My research interests span {edu.interests.slice(0, 3).join(", ")},
            and {edu.interests[3]}. I care about writing systems that are both
            technically sound and genuinely useful.
          </p>
        </div>

        {/* External links */}
        <div className="about-links">
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="about-link">
              LinkedIn ↗
            </a>
          )}
          {config.github && (
            <a href={config.github} target="_blank" rel="noopener noreferrer" className="about-link">
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* RIGHT column — education card */}
      <div className={`about-right reveal ${isVisible ? "visible" : ""}`}
           style={{ transitionDelay: "150ms" }}>
        <div className="edu-card">
          <span className="edu-badge">Education</span>
          <h3 className="edu-name">{edu.school}</h3>
          <p className="edu-program">{edu.degree}</p>
          <p className="edu-program" style={{ opacity: 0.7 }}>{edu.minor}</p>
          <p className="edu-grad">{edu.graduated} · {edu.location}</p>

          {/* Interest/focus area chips */}
          <div className="interests-list">
            {edu.interests.map((interest, i) => (
              <span key={i} className="interest-chip">{interest}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
