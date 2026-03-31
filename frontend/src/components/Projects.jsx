// ── Projects.jsx ─────────────────────────────────────────────
// Renders project cards from config.projects[].
// If a project has a `link` string, a "View →" anchor is shown.
// Stack tags use a different colour (purple) than skill tags (grey).
// ──────────────────────────────────────────────────────────────

import config from "../config";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Projects() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className={`section-header reveal ${isVisible ? "visible" : ""}`}>
        <p className="section-label">// selected work</p>
        <h2 className="section-heading">
          Things I've <span className="accent">built.</span>
        </h2>
      </div>

      <div className="projects-grid">
        {config.projects.map((project, i) => (
          <div
            key={i}
            className={`project-card reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Zero-padded project number — purely decorative */}
            <p className="project-num">
              {String(i + 1).padStart(2, "0")}
            </p>

            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">{project.description}</p>

            {/* Bottom row: stack tags + optional link */}
            <div className="project-stack">
              {project.stack.map((s, j) => (
                <span key={j} className="stack-tag">{s}</span>
              ))}
            </div>

            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
