import type { Metadata } from "next";
import CVBuilderClient from "@/components/tools/cv-builder/CVBuilderClient";

export const metadata: Metadata = {
  title: "SA CV Builder — Build a Print-Ready CV in 5 Minutes | Grade 13",
  description:
    "Free SA CV builder. Choose from 3 templates — The Graduate, The Hustler, The Professional. Fill in your details, download as PDF. No account required.",
};

export default function CVBuilderPage() {
  return (
    <>
      {/* Page header */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#0D1B2A",
          padding: "2.5rem 1.5rem 2rem",
          borderBottom: "1px solid #1E3048",
          overflow: "hidden",
        }}
      >
        <div
          className="dot-grid-bg"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", marginBottom: "0.875rem" }}>
            <a href="/" style={{ color: "#7A9BB5", textDecoration: "none" }}>Home</a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <a href="/tools" style={{ color: "#7A9BB5", textDecoration: "none" }}>Free Tools</a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <strong style={{ color: "#FFFFFF" }}>SA CV Builder</strong>
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#FFFFFF",
              margin: "0 0 0.75rem",
              lineHeight: 1.15,
            }}
          >
            SA CV Builder
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#7A9BB5",
              margin: "0 0 0.5rem",
              lineHeight: 1.6,
            }}
          >
            Build a <strong style={{ color: "#FFFFFF" }}>print-ready, SA-formatted CV</strong> in under 5 minutes.
            Choose your template below.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#7A9BB5",
            }}
          >
            Pairs with:{" "}
            <strong style={{ color: "#F5A623" }}>CV &amp; Interview Pack for the SA Job Market — R147</strong>
          </p>
        </div>
      </section>

      {/* Template selector + form (client component) */}
      <section style={{ backgroundColor: "#0D1B2A" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 0" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#FFFFFF",
              margin: "0 0 0.375rem",
            }}
          >
            Step 1 — Choose your template
          </h2>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5", margin: "0 0 1.5rem" }}>
            Pick the template that matches where you are right now.
          </p>
        </div>

        <CVBuilderClient />
      </section>
    </>
  );
}
