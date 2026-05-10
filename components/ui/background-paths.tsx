"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   BackgroundPaths — animated gold SVG sweep lines (21.dev style)

   Two sets of 36 paths each:
     FloatingPaths position={1}  — paths lean left → right
     FloatingPaths position={-1} — paths lean right → left
   They cross naturally in the centre, creating the wave effect.

   viewBox="0 0 696 316" + preserveAspectRatio="xMidYMid slice"
   crops the paths to fill the container without distortion.

   Path formula is unchanged from 21.dev reference.
   ───────────────────────────────────────────────────────────────── */

const PATH_COUNT = 36;

interface PathData {
  id: number;
  d: string;
  width: number;     // 0.5 → 1.55 across the 36 paths
  opacity: number;   // 0.10 → 1.10+ (clamped to 1 by the browser)
  speed: number;     // 20 – 28 s
  delay: number;     // staggered start
}

function generatePaths(position: 1 | -1): PathData[] {
  return Array.from({ length: PATH_COUNT }, (_, i) => ({
    id: i,
    /* Exact 21.dev path formula — do not modify the math */
    d: `M-${380 - i * 5 * position} -${189 + i * 6}` +
       `C-${380 - i * 5 * position} -${189 + i * 6}` +
       ` -${312 - i * 5 * position} ${216 - i * 6}` +
       ` ${152 - i * 5 * position} ${343 - i * 6}` +
       `C${616 - i * 5 * position} ${470 - i * 6}` +
       ` ${684 - i * 5 * position} ${875 - i * 6}` +
       ` ${684 - i * 5 * position} ${875 - i * 6}`,
    width:   0.5 + i * 0.03,
    opacity: 0.08 + i * 0.025,
    speed:   45 + (i % 6) * 3,
    delay:   i * 0.45,
  }));
}

function FloatingPaths({ position }: { position: 1 | -1 }) {
  const paths = generatePaths(position);

  return (
    <svg
      viewBox="0 0 696 316"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      {paths.map((path) => (
        <motion.path
          key={`${position}-${path.id}`}
          d={path.d}
          fill="none"
          stroke="#F5A623"
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity:    [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration:    path.speed,
            repeat:      Infinity,
            ease:        "linear",
            delay:       path.delay,
          }}
        />
      ))}
    </svg>
  );
}

export default function BackgroundPaths() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <FloatingPaths position={1}  />
      <FloatingPaths position={-1} />
    </div>
  );
}
