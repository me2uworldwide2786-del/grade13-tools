import type { Metadata } from "next";
import QuizEngine from "@/components/tools/business-quiz/QuizEngine";

export const metadata: Metadata = {
  title: "SA Business Structure Quiz — PTY Ltd, Sole Prop, Partnership or NPC? | Grade 13",
  description:
    "7 plain-English questions tell you exactly which business structure to register in South Africa — and why. Free. No signup.",
};

export default function BusinessQuizPage() {
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
        <div
          className="gold-radial-glow"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          aria-hidden="true"
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "680px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          {/* Breadcrumb */}
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: "#7A9BB5",
              marginBottom: "0.875rem",
            }}
          >
            <a href="/" style={{ color: "#7A9BB5", textDecoration: "none" }}>
              Home
            </a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <a href="/tools" style={{ color: "#7A9BB5", textDecoration: "none" }}>
              Free Tools
            </a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <strong style={{ color: "#FFFFFF" }}>Business Structure Quiz</strong>
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
            Business Structure Quiz
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#7A9BB5",
              margin: "0 0 0.625rem",
              lineHeight: 1.65,
            }}
          >
            Find out if you should register as a{" "}
            <strong style={{ color: "#FFFFFF" }}>Sole Proprietor</strong>,{" "}
            <strong style={{ color: "#FFFFFF" }}>PTY Ltd</strong>,{" "}
            <strong style={{ color: "#FFFFFF" }}>Partnership</strong>, or{" "}
            <strong style={{ color: "#FFFFFF" }}>NPC</strong> — in under 2
            minutes.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#7A9BB5",
            }}
          >
            Pairs with:{" "}
            <strong style={{ color: "#F5A623" }}>
              CIPC Registration Guide — All 4 SA Business Structures — R197
            </strong>
          </p>
        </div>
      </section>

      {/* Quiz section */}
      <section
        style={{
          backgroundColor: "#0D1B2A",
          padding: "3rem 1.5rem 5rem",
          minHeight: "60vh",
        }}
      >
        <QuizEngine />
      </section>
    </>
  );
}
