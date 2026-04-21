"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader({ progress }) {
  const [displayPct, setDisplayPct] = useState(0);
  const displayPctRef = useRef(0);
  const rafRef = useRef(null);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Animate the number smoothly toward the target progress (500ms ease-out)
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const start = displayPctRef.current;
    // Cap at 99 while loading, only go to 100 when progress hits 100
    // Never animate backwards — take the max of current ref and new target
    const rawEnd = progress >= 100 ? 100 : Math.min(progress, 99);
    const end = Math.max(start, rawEnd);
    const duration = 500;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) ** 3; // ease-out cubic
      const value = Math.min(
        100,
        Math.max(0, Math.round(start + (end - start) * eased)),
      );
      displayPctRef.current = value;
      setDisplayPct(value);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress]);

  // Trigger exit animation when done — fade out right away after counter finishes
  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setExiting(true), 550);
      const t2 = setTimeout(() => setHidden(true), 1350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [progress]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col justify-end pb-16 px-12"
      style={{ opacity: exiting ? 0 : 1, transition: "opacity 0.75s ease" }}
    >
      {/* Noise overlay */}
      <div className="noise" />

      {/* Big counter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div
          className="leading-none tracking-tight font-logo"
          style={{ fontSize: "clamp(120px, 20vw, 200px)" }}
        >
          <span className="text-white">{displayPct}</span>
          <span className="text-accent">%</span>
        </div>
      </div>

      {/* Progress bar + labels */}
      <div className="relative z-10">
        <div className="w-full h-[1px] bg-[#1a1a1a] overflow-hidden">
          <div
            className="h-full bg-accent"
            style={{
              width: `${progress}%`,
              transition: "width 0.5s ease-in-out",
            }}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-[#333]">
            Loading
          </span>
          <span className="font-mono text-[10px] tracking-[1px] text-[#333]">
            {displayPct}%
          </span>
        </div>
      </div>
    </div>
  );
}
