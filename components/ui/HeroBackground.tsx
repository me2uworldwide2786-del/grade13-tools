"use client";

import dynamic from "next/dynamic";

const BackgroundPaths = dynamic(() => import("./background-paths"), {
  ssr: false,
  loading: () => null,
});

/* ─────────────────────────────────────────────────────────────────
   HeroBackground — fixed full-page animated background

   Layer stack (bottom → top):
   1. BackgroundPaths — two sets of framer-motion gold SVG sweep lines
                        crossing from both sides (position 1 and -1)
   2. Radial gradient — transparent centre → rgba(13,27,42,0.6) at edges
                        so text stays readable without killing visibility

   Positioned fixed so it spans the entire viewport behind all page
   sections. pointer-events-none, z-0.
   ───────────────────────────────────────────────────────────────── */

export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0D1B2A",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Gold sweeping SVG paths — both directions */}
      <BackgroundPaths />

      {/* Radial vignette — max opacity 0.6 at edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, transparent 0%, rgba(13,27,42,0.25) 55%, rgba(13,27,42,0.6) 85%)",
        }}
      />
    </div>
  );
}
