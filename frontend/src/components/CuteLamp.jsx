import { useRef, useState } from "react";

export default function CuteLamp({ lampOn, onToggle = () => {} }) {
  const startYRef = useRef(0);
  const toggledThisDrag = useRef(false);
  const [dragY, setDragY] = useState(0);

  const THRESHOLD = 28;

  const startDrag = (e) => {
    startYRef.current = e.clientY || e.touches[0].clientY;
    toggledThisDrag.current = false;

    const move = (ev) => {
      const y = ev.clientY || ev.touches[0].clientY;
      const delta = Math.max(0, y - startYRef.current);

      const clamped = Math.min(delta, 35);
      setDragY(clamped);

      if (clamped >= THRESHOLD && !toggledThisDrag.current) {
        toggledThisDrag.current = true;
        onToggle(!lampOn);
      }
    };

    const end = () => {
      setDragY(0);

      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  };

  return (
    <svg
      width="220"
      height="260"
      viewBox="0 0 220 260"
      className={`lamp-svg ${lampOn ? "on" : ""}`}
    >
      {/* Glow */}
      <ellipse cx="110" cy="70" rx="60" ry="40" className="lamp-glow" />

      {/* ===== CYLINDRICAL SHADE (NEW) ===== */}
      <g className="lamp-shade">
        <ellipse cx="110" cy="40" rx="55" ry="16" />
        <rect x="55" y="40" width="110" height="65" rx="18" />
        <ellipse cx="110" cy="105" rx="55" ry="16" />
      </g>

      {/* Eyes */}
      <path
        d={lampOn ? "M90 75 q6 -4 12 0" : "M90 75 q6 6 12 0"}
        className="lamp-eye"
      />
      <path
        d={lampOn ? "M118 75 q6 -4 12 0" : "M118 75 q6 6 12 0"}
        className="lamp-eye"
      />

      {/* Stem */}
      <rect x="104" y="105" width="12" height="80" rx="6" className="lamp-stem" />

      {/* Base */}
      <ellipse cx="110" cy="200" rx="48" ry="10" className="lamp-base" />

      {/* Cord (UNCHANGED) */}
      <g
        className="lamp-cord-group"
        style={{ transform: `translateY(${dragY}px)` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <line x1="95" y1="105" x2="95" y2="125" className="lamp-cord" />
        <circle cx="95" cy="130" r="4" className="lamp-cord-end" />
      </g>
    </svg>
  );
}
