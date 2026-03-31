// ── Ticker.jsx ───────────────────────────────────────────────
// A continuously scrolling horizontal banner of tech keywords.
// The trick: we render the list TWICE side-by-side so the loop
// is seamless — when the first copy scrolls off-screen the
// second copy is already in place, and the animation resets.
// ──────────────────────────────────────────────────────────────

import config from "../config";

export default function Ticker() {
  // Duplicate the ticker array so the scroll loop is seamless
  const items = [...config.ticker, ...config.ticker];

  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-inner">
        {items.map((word, i) => (
          <span key={i}>
            {word}
            {/* Decorative dot separator between every word */}
            <span className="ticker-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
