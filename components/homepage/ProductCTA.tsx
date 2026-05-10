import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductCTA() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "rgba(13,27,42,0.70)",
        padding: "5rem 1.5rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Dot grid texture */}
      <div
        className="dot-grid-bg"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* Subtle gold radial glow from centre-bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 50% 110%, rgba(245,166,35,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: "48px",
            height: "3px",
            backgroundColor: "#F5A623",
            margin: "0 auto 1.75rem",
            borderRadius: "9999px",
          }}
        />

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            color: "#FFFFFF",
            margin: "0 0 1rem",
            lineHeight: 1.15,
          }}
        >
          Ready to go deeper?
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.1875rem)",
            color: "#7A9BB5",
            margin: "0 0 0.75rem",
            lineHeight: 1.65,
          }}
        >
          The free tools handle{" "}
          <strong style={{ color: "#FFFFFF" }}>20%</strong> of the problem. Our
          guides handle the other{" "}
          <strong style={{ color: "#FFFFFF" }}>80%</strong>.
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.9375rem",
            color: "#7A9BB5",
            margin: "0 0 2.5rem",
            lineHeight: 1.6,
          }}
        >
          Step-by-step SA-specific guides for{" "}
          <strong style={{ color: "#7A9BB5" }}>CIPC registration</strong>,{" "}
          <strong style={{ color: "#7A9BB5" }}>SARS tax</strong>,{" "}
          <strong style={{ color: "#7A9BB5" }}>side hustles</strong>,{" "}
          <strong style={{ color: "#7A9BB5" }}>earning in USD</strong> and more.
          Priced for South Africans.
        </p>

        <Link
          href="/guides"
          className="btn-gold"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#F5A623",
            color: "#0D1B2A",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "1.0625rem",
            padding: "0.875rem 2.25rem",
            borderRadius: "9999px",
            textDecoration: "none",
          }}
        >
          <strong>Browse All Guides</strong>
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
