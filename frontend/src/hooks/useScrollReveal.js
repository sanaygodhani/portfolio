// ── useScrollReveal.js ──────────────────────────────────────
// A custom React hook that watches when an element enters the
// viewport and returns a boolean `isVisible` you can use to
// trigger CSS animations. Uses the browser's IntersectionObserver
// API so it's performant — no scroll event listeners needed.
// ──────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);           // attach this to the DOM element you want to watch
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver fires whenever `el` crosses the threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // once revealed, stop watching (animate only once)
        }
      },
      { threshold: 0.12, ...options } // 12% of element must be visible to trigger
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
