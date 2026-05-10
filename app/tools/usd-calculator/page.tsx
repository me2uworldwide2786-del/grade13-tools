import type { Metadata } from "next";
import UsdCalculatorClient from "@/components/tools/usd-calculator/UsdCalculatorClient";

export const metadata: Metadata = {
  title: "USD Earnings Calculator — What Would You Earn in ZAR? | Grade 13",
  description:
    "See what earning in USD looks like converted to ZAR. Enter your skill, rate, and hours — watch the rand amount update live. Built for SA remote workers and freelancers.",
};

export default function UsdCalculatorPage() {
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
        <div className="dot-grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true" />
        <div className="gold-radial-glow" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true" />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          {/* Breadcrumb */}
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", marginBottom: "0.875rem" }}>
            <a href="/" style={{ color: "#7A9BB5", textDecoration: "none" }}>Home</a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <a href="/tools" style={{ color: "#7A9BB5", textDecoration: "none" }}>Free Tools</a>
            <span style={{ margin: "0 0.4rem" }}>›</span>
            <strong style={{ color: "#FFFFFF" }}>USD Earnings Calculator</strong>
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
            USD Earnings Calculator
          </h1>

          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: "#7A9BB5", margin: "0 0 0.5rem", lineHeight: 1.65 }}>
            See what <strong style={{ color: "#FFFFFF" }}>earning in USD</strong> actually looks like in your South African bank account.
            Pick your skill, set your rate, and watch the rand amount update live.
          </p>

          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>
            Pairs with:{" "}
            <strong style={{ color: "#F5A623" }}>Earning in USD from SA — R197</strong>
          </p>
        </div>
      </section>

      {/* ── Why USD? — 3 reasons strip ──────────────────────────── */}
      <section style={{ backgroundColor: "#111D2C", borderBottom: "1px solid #1E3048", padding: "1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="usd-why-grid">
            {[
              {
                emoji: "💵",
                title: "USD goes far in SA",
                body: "R18+ for every $1 means even modest USD rates translate to competitive SA income. $30/hr is R555/hr — more than most SA professional rates.",
              },
              {
                emoji: "🌍",
                title: "Skills are universal",
                body: "Writing, design, development, VA work — these are bought globally. Your location is irrelevant to most international clients. Your skills are the product.",
              },
              {
                emoji: "🏦",
                title: "Getting paid is solved",
                body: "Wise, Payoneer, and direct bank transfers make it straightforward. SARS wants you to declare it — the guide shows you exactly how.",
              },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.375rem", lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>
                <div>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#FFFFFF", margin: "0 0 0.25rem" }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", margin: 0, lineHeight: 1.6 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ backgroundColor: "#0D1B2A", padding: "2.5rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <UsdCalculatorClient />
        </div>
      </section>

      <style>{`
        .usd-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .usd-why-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>
    </>
  );
}
