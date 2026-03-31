// ── Hero.jsx ─────────────────────────────────────────────────
// Full-viewport landing section. Reads tagline, bio, stats,
// and the `available` flag from config.js — no editing needed here.
//
// Structure:
//   • Animated radial glow blobs (purely decorative)
//   • "Available" badge (conditionally rendered)
//   • 3-line heading from config.tagline[]
//   • Bio subtitle
//   • CTA buttons
//   • Stats row
// ──────────────────────────────────────────────────────────────

import config from "../config";

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Decorative blobs — positioned with CSS, animated with keyframes */}
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow2" aria-hidden="true" />

      {/* Green badge — only shown if config.available === true */}
      {config.available && (
        <div className="hero-badge">Available for full-time roles</div>
      )}

      {/* Main heading — config.tagline is an array of 3 strings.
          Index 1 gets the blue accent colour, index 2 gets the outline stroke. */}
      <h1 className="hero-heading">
        {config.tagline[0]}<br />
        <span className="accent">{config.tagline[1]}</span><br />
        <span className="stroke">{config.tagline[2]}</span>
      </h1>

      {/* One-liner description */}
      <p className="hero-sub">{config.bio}</p>

      {/* Primary CTA → projects, Ghost CTA → experience */}
      <div className="hero-actions">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#experience" className="btn-ghost">Experience</a>
      </div>

      {/* Stat chips from config.stats array */}
      <div className="hero-stats">
        {config.stats.map((s, i) => (
          <div key={i}>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
