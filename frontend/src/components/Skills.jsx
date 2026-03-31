// ── Skills.jsx ───────────────────────────────────────────────
// Renders skill cards from config.skills[].
// Each card has: category label, title, and a list of tag chips.
// The useScrollReveal hook triggers a CSS fade-up animation
// when the section enters the viewport.
// ──────────────────────────────────────────────────────────────

import config from "../config";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Skills() {
  // `ref` goes on the section element, `isVisible` triggers the animation class
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="skills-section" id="skills" ref={ref}>
      {/* Section label + heading — same pattern used across all sections */}
      <div className={`section-header reveal ${isVisible ? "visible" : ""}`}>
        <p className="section-label">// capabilities</p>
        <h2 className="section-heading">
          What I <span className="accent">build</span> with.
        </h2>
      </div>

      {/* Grid of skill cards — one card per item in config.skills */}
      <div className="skills-grid">
        {config.skills.map((skill, i) => (
          // Each card delays its animation slightly so they stagger in
          <div
            key={i}
            className={`skill-card reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {/* Small label above the title */}
            <p className="skill-category">{skill.category}</p>
            <h3 className="skill-title">{skill.title}</h3>

            {/* Tag chips — just strings from the tags array */}
            <div className="skill-tags">
              {skill.tags.map((tag, j) => (
                <span key={j} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
