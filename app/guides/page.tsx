import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import HeroBackground from "@/components/ui/HeroBackground";
import EmailCapture from "@/components/layout/EmailCapture";

export const metadata: Metadata = {
  title: "Guides — Grade 13",
  description:
    "Step-by-step SA-specific guides for graduates, side hustlers and first-time entrepreneurs. No jargon. No fluff. Just what you need to know.",
};

/* ── Guide data ───────────────────────────────────────────────────── */

const FEATURED = {
  title:
    "Side Hustle Starter Pack South Africa 2026 — 15 Proven Ways to Make Money with Zero Capital",
  price: "R297",
  description:
    "South Africa has a 32.9% unemployment rate. The system was never designed to give you financial freedom. This guide gives you 15 proven, tested, SA-specific ways to start making money this week with nothing but your phone, your skills, and your time.",
  bullets: [
    "15 proven SA-specific hustles you can start this week",
    "Zero capital required — just your phone, skills, and time",
    "SA-tested strategies built for 2026 realities",
  ],
  href: "https://payhip.com/b/TZebD",
};

const GUIDES = [
  {
    title: "CV & Interview Pack",
    price: "R147",
    description:
      "Most job seekers don't lack knowledge — they lack a finished CV and a preparation system. 5 ready-to-use, fill-in worksheets including 3 ATS-safe CV templates, 3 cover letter templates, and a 25-question interview prep checklist. Built for the SA job market.",
    bullets: [
      "3 ATS-safe CV templates (Graduate, Hustler, Professional)",
      "3 cover letter templates for different job types",
      "25-question interview prep checklist",
    ],
    href: "https://payhip.com/b/kKSoQ",
  },
  {
    title: "SARS Tax Guide",
    price: "R247",
    description:
      "Nobody taught us how SARS works. Not in school. Not at home. Not anywhere. This plain-language guide covers the 2025/2026 tax brackets, every legal deduction you can claim, provisional tax, eFiling step-by-step, and 4 free editable worksheets. No jargon.",
    bullets: [
      "2025/2026 tax brackets explained in plain language",
      "Every legal deduction you're entitled to claim",
      "4 free editable worksheets included",
    ],
    href: "https://payhip.com/b/wVXQg",
  },
  {
    title: "CIPC Business Registration Guide",
    price: "R197",
    description:
      "Every day thousands of South Africans start a business without registering it — because nobody explained how. Full step-by-step walkthrough of all 4 SA business structures: Sole Trader, PTY Ltd, NPC, and Co-operative. Verified against 2026 CIPC fees and SA legislation.",
    bullets: [
      "All 4 SA business structures explained + which suits you",
      "Step-by-step CIPC registration walkthrough",
      "Verified against 2026 CIPC fees and SA legislation",
    ],
    href: "https://payhip.com/b/bmk4R",
  },
];

const CHALLENGE_STEPS = [
  "Buy the Side Hustle Starter Pack",
  "Choose one hustle. Follow the guide exactly for 30 days",
  "Document your journey publicly every week",
  "Win R10,000 cash — no luck, no random draw. The most genuine transformation wins.",
];

const COMING_SOON = [
  "SA Dropshipping Blueprint",
  "Chinese Supplier Sourcing Guide",
  "Earning in USD from SA",
  "Load Shedding Survival Guide for Small Businesses",
  "POPIA Compliance Kit for Small SA Businesses",
  "SARS Side Hustle Tax Guide (mini-guide)",
];

/* ── Shared sub-components ────────────────────────────────────────── */

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {bullets.map((b, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
          <CheckCircle
            size={14}
            color="#22C55E"
            strokeWidth={2.5}
            style={{ flexShrink: 0, marginTop: "3px" }}
          />
          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#FFFFFF", lineHeight: 1.55 }}>
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTAButton({ href, label = "Get the Guide" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "#F5A623",
        color: "#0D1B2A",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: "0.9375rem",
        padding: "0.75rem 1.625rem",
        borderRadius: "9999px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      <strong>{label}</strong>
      <ArrowRight size={15} strokeWidth={2.5} />
    </a>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function GuidesPage() {
  return (
    <>
      {/* Fixed animated background — same as homepage */}
      <HeroBackground />

      {/* All page content above the background */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ── Page header ──────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            backgroundColor: "rgba(13,27,42,0.82)",
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
          <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
            {/* Breadcrumb */}
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", marginBottom: "1rem" }}>
              <Link href="/" style={{ color: "#7A9BB5", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 0.4rem" }}>›</span>
              <strong style={{ color: "#FFFFFF" }}>Guides</strong>
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "#FFFFFF",
                margin: "0 0 0.75rem",
                lineHeight: 1.1,
              }}
            >
              Guides
            </h1>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.0625rem", color: "#7A9BB5", margin: 0 }}>
              Step-by-step SA-specific guides. No jargon. No fluff. Just what you need to know.
            </p>
          </div>
        </section>

        {/* ── Guide cards ──────────────────────────────────────────── */}
        <section style={{ padding: "3rem 1.5rem", backgroundColor: "rgba(13,27,42,0.70)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            {/* Featured card */}
            <div
              className="guide-card-featured"
              style={{
                position: "relative",
                backgroundColor: "#111D2C",
                border: "1px solid rgba(245,166,35,0.25)",
                borderLeft: "4px solid #F5A623",
                borderRadius: "16px",
                padding: "2rem",
                marginBottom: "1.5rem",
                transition: "border-color 0.25s",
              }}
            >
              {/* R10k badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  backgroundColor: "rgba(245,166,35,0.12)",
                  border: "1px solid rgba(245,166,35,0.45)",
                  borderRadius: "9999px",
                  padding: "0.3rem 0.875rem",
                }}
              >
                <span style={{ fontSize: "0.875rem" }}>🏆</span>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#F5A623",
                    letterSpacing: "0.04em",
                  }}
                >
                  R10,000 Challenge
                </span>
              </div>

              {/* Inner layout */}
              <div className="featured-inner">
                {/* Left: text */}
                <div style={{ flex: 1, paddingRight: "2rem" }}>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                      color: "#F5A623",
                      margin: "0 0 1rem",
                      lineHeight: 1.25,
                      paddingRight: "8rem", /* space for badge on desktop */
                    }}
                  >
                    {FEATURED.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.9375rem",
                      color: "#7A9BB5",
                      lineHeight: 1.7,
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {FEATURED.description}
                  </p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#7A9BB5", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 0.625rem" }}>
                      What&apos;s inside
                    </p>
                    <BulletList bullets={FEATURED.bullets} />
                  </div>
                </div>

                {/* Right: price + CTA */}
                <div className="featured-cta-col">
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "2.25rem", color: "#FFFFFF", lineHeight: 1 }}>
                      {FEATURED.price}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", marginTop: "0.25rem" }}>
                      once-off · instant download
                    </div>
                  </div>
                  <CTAButton href={FEATURED.href} />
                </div>
              </div>
            </div>

            {/* 3-column standard guides */}
            <div className="guides-grid">
              {GUIDES.map((guide) => (
                <div
                  key={guide.title}
                  className="guide-card"
                  style={{
                    backgroundColor: "#111D2C",
                    border: "1px solid rgba(245,166,35,0.2)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.25s, box-shadow 0.25s",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "1.1875rem",
                      color: "#F5A623",
                      margin: "0 0 0.75rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {guide.title}
                  </h3>

                  {/* Price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.625rem", color: "#FFFFFF" }}>
                      {guide.price}
                    </span>
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5" }}>
                      once-off
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.875rem",
                      color: "#7A9BB5",
                      lineHeight: 1.65,
                      margin: "0 0 1.25rem",
                      flexGrow: 1,
                    }}
                  >
                    {guide.description}
                  </p>

                  {/* Bullets */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.6875rem", fontWeight: 700, color: "#7A9BB5", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>
                      What&apos;s inside
                    </p>
                    <BulletList bullets={guide.bullets} />
                  </div>

                  <CTAButton href={guide.href} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── R10,000 Challenge callout ─────────────────────────────── */}
        <section style={{ padding: "3rem 1.5rem", backgroundColor: "rgba(13,27,42,0.70)" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                backgroundColor: "#111D2C",
                border: "1px solid rgba(245,166,35,0.3)",
                borderRadius: "20px",
                padding: "2.5rem 2rem",
              }}
            >
              {/* Heading */}
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🏆</div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    color: "#FFFFFF",
                    margin: "0 0 0.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  The Grade 13 30-Day Challenge
                </h2>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: "#7A9BB5", margin: 0 }}>
                  Prove that one guide can change your financial reality in a month.
                </p>
              </div>

              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
                {CHALLENGE_STEPS.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(245,166,35,0.15)",
                        border: "1px solid rgba(245,166,35,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckCircle size={15} color="#F5A623" strokeWidth={2.5} />
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "0.9375rem",
                        color: "#FFFFFF",
                        margin: 0,
                        lineHeight: 1.55,
                        paddingTop: "0.25rem",
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Gold highlighted note */}
              <div
                style={{
                  backgroundColor: "rgba(245,166,35,0.07)",
                  border: "1px solid rgba(245,166,35,0.3)",
                  borderRadius: "10px",
                  padding: "1rem 1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.9375rem",
                    color: "#F5A623",
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  ✨{" "}
                  <strong style={{ fontStyle: "normal" }}>
                    The competition launches when we hit 50 sales.
                  </strong>{" "}
                  Your purchase is your entry ticket.
                </p>
              </div>

              {/* CTA */}
              <div style={{ textAlign: "center" }}>
                <CTAButton href="https://payhip.com/b/TZebD" label="Enter the Challenge" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Email capture ─────────────────────────────────────────── */}
        <section style={{ padding: "0 1.5rem 3rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <EmailCapture
              tipSheet="Which Grade 13 Guide Is Right for You? — A 60-Second Decision Guide"
              pairedProduct="Side Hustle Starter Pack — R297"
              payhipLink="https://payhip.com/b/TZebD"
            />
          </div>
        </section>

        {/* ── Coming soon ───────────────────────────────────────────── */}
        <section style={{ padding: "0 1.5rem 4rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Section header */}
            <div style={{ marginBottom: "1.75rem" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.375rem",
                  color: "#FFFFFF",
                  margin: "0 0 0.375rem",
                }}
              >
                More guides on the way
              </h2>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9rem", color: "#7A9BB5", margin: 0 }}>
                Every guide is being tested by real South Africans before it ships.
              </p>
            </div>

            {/* 6 greyed cards */}
            <div className="coming-soon-grid">
              {COMING_SOON.map((title) => (
                <div
                  key={title}
                  style={{
                    backgroundColor: "#111D2C",
                    border: "1px solid #1E3048",
                    borderRadius: "14px",
                    padding: "1.5rem",
                    opacity: 0.55,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.875rem",
                  }}
                >
                  {/* Badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      backgroundColor: "#1E3048",
                      borderRadius: "9999px",
                      padding: "0.2rem 0.75rem",
                      width: "fit-content",
                    }}
                  >
                    <Clock size={11} color="#7A9BB5" strokeWidth={2} />
                    <span
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        color: "#7A9BB5",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Coming Soon
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#7A9BB5",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Responsive layout styles */}
      <style>{`
        /* Featured card inner layout */
        .featured-inner {
          display: flex;
          flex-direction: row;
          gap: 0;
        }
        .featured-cta-col {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          flex-shrink: 0;
          min-width: 180px;
        }

        /* Standard guide cards */
        .guides-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        /* Guide card hover */
        .guide-card:hover {
          border-color: rgba(245,166,35,0.6) !important;
          box-shadow: 0 0 20px rgba(245,166,35,0.08);
        }
        .guide-card-featured:hover {
          border-color: rgba(245,166,35,0.5) !important;
          box-shadow: 0 0 24px rgba(245,166,35,0.1);
        }

        /* Coming soon grid */
        .coming-soon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .guides-grid { grid-template-columns: repeat(2, 1fr); }
          .coming-soon-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .featured-inner { flex-direction: column; }
          .featured-inner > div:first-child { padding-right: 0 !important; }
          .featured-cta-col { min-width: unset; width: 100%; }
          .guides-grid { grid-template-columns: 1fr; }
          .coming-soon-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
