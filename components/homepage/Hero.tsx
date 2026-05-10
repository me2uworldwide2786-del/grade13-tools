"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const stats = [
    { number: "5", label: "Free Tools" },
    { number: "10", label: "SA Guides" },
    { number: "100%", label: "SA Specific" },
  ];

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "transparent",
        overflow: "hidden",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
      }}
    >
      {/* Content — sits above the fixed HeroBackground in app/page.tsx */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        {/* SA badge — animated border comet */}
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            /* Subtle gold border — the white comet provides the visual interest */
            border: "1px solid rgba(245,166,35,0.2)",
            borderRadius: "9999px",
            padding: "0.35rem 1rem",
            backgroundColor: "rgba(245,166,35,0.07)",
          }}
        >
          {/*
           * Mask wrapper — restricts the comet's visibility to the 1px border
           * region only, so the glow travels on the border rather than flooding
           * the interior.
           *
           * Technique: mask-composite exclude (XOR) of two opaque layers clipped
           * to padding-box and border-box respectively cancels out in the
           * padding area (both opaque → XOR = 0) and passes through in the
           * border area (only border-box layer present → XOR = 1).
           *
           * The mask wrapper needs its own border so border-box ≠ padding-box.
           */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              /* 1px border defines the mask's border region */
              border: "1px solid transparent",
              /* XOR mask: visible only where border-box ∖ padding-box */
              maskImage:
                "linear-gradient(#000,#000), linear-gradient(#000,#000)",
              maskClip: "padding-box, border-box",
              maskComposite: "exclude",
              WebkitMaskImage:
                "linear-gradient(#000,#000), linear-gradient(#000,#000)",
              WebkitMaskClip: "padding-box, border-box",
              WebkitMaskComposite: "xor",
            } as React.CSSProperties}
          >
            {/* The comet — travels along the badge border using CSS offset-path */}
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "20px",
                height: "20px",
                /* White gradient oriented in the direction of travel */
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.8), white)",
                borderRadius: "9999px",
                /* Traces the containing block's border outline */
                offsetPath: "rect(0 auto auto 0 round 9999px)",
                /* Rotate element to face direction of travel */
                offsetRotate: "auto",
              } as React.CSSProperties}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Badge label — above the comet layer */}
          <span
            style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "#F5A623",
              letterSpacing: "0.04em",
            }}
          >
            Built for South Africa
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          The tools nobody gave you in school.
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#7A9BB5",
            maxWidth: "560px",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Free calculators, quizzes and builders for SA graduates, side
          hustlers and first-time entrepreneurs.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.875rem",
            justifyContent: "center",
            marginTop: "0.25rem",
          }}
        >
          <Link
            href="/tools"
            className="btn-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#F5A623",
              color: "#0D1B2A",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "9999px",
              textDecoration: "none",
            }}
          >
            <strong>Explore Free Tools</strong>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>

          <Link
            href="/guides"
            className="btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border: "1.5px solid rgba(255,255,255,0.3)",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "9999px",
              textDecoration: "none",
              backgroundColor: "transparent",
            }}
          >
            Browse Guides
          </Link>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            marginTop: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "#F5A623",
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.8125rem",
                    color: "#7A9BB5",
                    marginTop: "0.25rem",
                    letterSpacing: "0.03em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <div
                  style={{
                    width: "1px",
                    height: "36px",
                    backgroundColor: "#1E3048",
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .hero-stats-divider { display: none; }
        }
      `}</style>
    </section>
  );
}
