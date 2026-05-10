import type { Metadata } from "next";
import SarsEstimatorClient from "@/components/tools/sars-estimator/SarsEstimatorClient";

export const metadata: Metadata = {
  title: "SARS Tax Estimator — How Much Tax Do You Owe as a Freelancer? | Grade 13",
  description:
    "Free SA provisional tax estimator for freelancers and side hustlers. Uses the actual 2025/2026 SARS tax brackets. See your annual tax, monthly savings target, and payment deadlines.",
};

export default function SarsTaxEstimatorPage() {
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
            <strong style={{ color: "#FFFFFF" }}>SARS Tax Estimator</strong>
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
            SARS Tax Estimator
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
            Estimate your <strong style={{ color: "#FFFFFF" }}>provisional tax owed</strong> as
            a freelancer or side hustler — using the actual{" "}
            <strong style={{ color: "#FFFFFF" }}>2025/2026 SARS tax brackets</strong>.
            Know what to save before SARS sends a bill.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#7A9BB5",
            }}
          >
            Pairs with:{" "}
            <strong style={{ color: "#F5A623" }}>SARS Tax Guide for Freelancers — R147</strong>
          </p>
        </div>
      </section>

      {/* ── What is provisional tax? — educational intro ────────────── */}
      <section
        style={{
          backgroundColor: "#111D2C",
          borderBottom: "1px solid #1E3048",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="prov-tax-info-grid">
            {[
              {
                emoji: "📋",
                title: "What is provisional tax?",
                body: "If you earn income that isn't subject to PAYE (Pay As You Earn), SARS requires you to estimate and pay your own tax twice a year — in August and February. This is called provisional tax.",
              },
              {
                emoji: "🔔",
                title: "Who must register?",
                body: "Anyone earning more than R30,000/year from non-PAYE sources must register as a provisional taxpayer on SARS eFiling. This includes freelancers, side hustlers, rental income, and investment returns.",
              },
              {
                emoji: "💸",
                title: "Why February matters",
                body: "28 February is your second provisional tax payment deadline. Most freelancers get caught out because they've already spent the money. The fix: save a fixed amount every single month.",
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
          <SarsEstimatorClient />
        </div>
      </section>

      <style>{`
        .prov-tax-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .prov-tax-info-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>
    </>
  );
}
