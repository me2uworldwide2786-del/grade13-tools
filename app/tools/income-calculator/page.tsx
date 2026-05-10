import type { Metadata } from "next";
import IncomeCalculatorClient from "@/components/tools/income-calculator/IncomeCalculatorClient";

export const metadata: Metadata = {
  title: "Side Hustle Income Calculator — See Your Real Take-Home | Grade 13",
  description:
    "Free SA side hustle calculator. Enter your hustle type, hours per week, and rate to see weekly gross, profit leaks, SARS tax estimate, and monthly net income.",
};

export default function IncomeCalculatorPage() {
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
            maxWidth: "760px",
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
            <a href="/" style={{ color: "#7A9BB5", textDecoration: "none" }}>Home</a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <a href="/tools" style={{ color: "#7A9BB5", textDecoration: "none" }}>Free Tools</a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <strong style={{ color: "#FFFFFF" }}>Side Hustle Income Calculator</strong>
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
            Side Hustle Income Calculator
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#7A9BB5",
              margin: "0 0 0.5rem",
              lineHeight: 1.65,
            }}
          >
            See your{" "}
            <strong style={{ color: "#FFFFFF" }}>real monthly take-home</strong> after profit
            leaks and SARS tax. Then find out what it would take to hit{" "}
            <strong style={{ color: "#FFFFFF" }}>R10k/month</strong>.
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
              Side Hustle Starter Pack for South Africans — R197
            </strong>
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section
        style={{
          backgroundColor: "#0D1B2A",
          padding: "2.5rem 1.5rem 5rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <IncomeCalculatorClient />
        </div>
      </section>
    </>
  );
}
