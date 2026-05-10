"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────────────────────────
   SpiralAnimation — GSAP canvas star-field
   • ~120 particles, each on a slow elliptical orbit around a
     local centre point, creating a living nebula / star-field.
   • Colour: brand gold #F5A623 (rgb 245,166,35) with varying opacity.
   • Uses gsap.ticker for the render loop; fully cleaned up on unmount.
   ───────────────────────────────────────────────────────────────── */

interface Star {
  cx: number;
  cy: number;
  angle: number;
  rx: number;
  ry: number;
  speed: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  x: number;
  y: number;
}

const PARTICLE_COUNT = 120;

function initStars(w: number, h: number): Star[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const cx    = Math.random() * w;
    const cy    = Math.random() * h;
    const angle = Math.random() * Math.PI * 2;
    const rx    = 15 + Math.random() * 55;
    const ry    =  8 + Math.random() * 30;
    return {
      cx, cy, angle, rx, ry,
      speed:        (0.0008 + Math.random() * 0.0018) * (i % 2 === 0 ? 1 : -1),
      size:          0.5 + Math.random() * 1.8,
      opacity:       0,
      maxOpacity:    0.08 + Math.random() * 0.35,
      twinkleSpeed:  0.012 + Math.random() * 0.025,
      twinklePhase:  Math.random() * Math.PI * 2,
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    };
  });
}

export default function SpiralAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;

    function resize() {
      if (!canvas || !ctx) return;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();

    let stars = initStars(w, h);
    let tick  = 0;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      tick++;

      for (const s of stars) {
        s.angle       += s.speed;
        s.x            = s.cx + Math.cos(s.angle) * s.rx;
        s.y            = s.cy + Math.sin(s.angle) * s.ry;
        s.twinklePhase += s.twinkleSpeed;
        s.opacity      = s.maxOpacity * (0.5 + 0.5 * Math.sin(s.twinklePhase));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        /* Gold particles: #F5A623 = rgb(245, 166, 35) */
        ctx.fillStyle = `rgba(245,166,35,${s.opacity.toFixed(3)})`;
        ctx.fill();
      }

      if (tick % 600 === 0) {
        const fresh = initStars(w, h);
        const slice = Math.floor(PARTICLE_COUNT / 4);
        for (let i = 0; i < slice; i++) {
          stars[Math.floor(Math.random() * PARTICLE_COUNT)] = fresh[i];
        }
      }
    }

    gsap.ticker.add(render);

    function handleResize() {
      resize();
      stars = initStars(w, h);
    }
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
