import type { Metadata } from "next";
import {
  FileText,
  Building2,
  Calculator,
  Receipt,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import ToolCard from "@/components/homepage/ToolCard";
import { PAYHIP_LINKS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Tools — Grade 13",
  description:
    "Free SA-specific calculators, quizzes and builders for graduates, side hustlers and first-time entrepreneurs. No account required.",
};

const tools = [
  {
    Icon: FileText,
    title: "SA CV Builder",
    description:
      "Build a print-ready, SA-formatted CV in under 5 minutes. Choose from 3 templates — The Graduate, The Hustler, or The Professional.",
    href: "/tools/cv-builder",
    pairedProduct: "CV & Interview Pack — R147",
    payhipLink: PAYHIP_LINKS.cvInterviewPack,
  },
  {
    Icon: Building2,
    title: "Business Structure Quiz",
    description:
      "7 plain-English questions tell you whether to register as Sole Prop, PTY Ltd, Partnership, or NPC — and exactly why.",
    href: "/tools/business-quiz",
    pairedProduct: "CIPC Registration Guide — R197",
    payhipLink: PAYHIP_LINKS.cipcGuide,
  },
  {
    Icon: Calculator,
    title: "Side Hustle Income Calculator",
    description:
      "Enter your hustle type, hours per week, and rate. See your real monthly take-home after costs and a SARS estimate.",
    href: "/tools/income-calculator",
    pairedProduct: "Side Hustle Starter Pack — R197",
    payhipLink: PAYHIP_LINKS.sideHustlePack,
  },
  {
    Icon: Receipt,
    title: "SARS Tax Estimator",
    description:
      "Freelancer or side hustler? Estimate your provisional tax so you know what to set aside before SARS sends a bill.",
    href: "/tools/tax-estimator",
    pairedProduct: "SARS Tax Guide — R97",
    payhipLink: PAYHIP_LINKS.sarsGuide,
    isNew: true,
  },
  {
    Icon: DollarSign,
    title: "USD Earnings Calculator",
    description:
      "Doing remote work or earning from international clients? See what your USD income looks like in ZAR — live exchange rate.",
    href: "/tools/usd-calculator",
    pairedProduct: "Earning in USD from SA — R97",
    payhipLink: PAYHIP_LINKS.usdEarning,
    isNew: true,
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Page header */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#0D1B2A",
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
          overflow: "hidden",
          borderBottom: "1px solid #1E3048",
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

        <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: "#7A9BB5",
              marginBottom: "1rem",
            }}
          >
            <a href="/" style={{ color: "#7A9BB5", textDecoration: "none" }}>
              Home
            </a>{" "}
            <span style={{ margin: "0 0.4rem" }}>›</span>{" "}
            <strong style={{ color: "#FFFFFF" }}>Free Tools</strong>
          </p>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#FFFFFF",
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}
          >
            Free Tools —{" "}
            <span style={{ color: "#F5A623" }}>No signup required</span>
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#7A9BB5",
              margin: "0 0 0.5rem",
              lineHeight: 1.65,
            }}
          >
            Every tool here solves{" "}
            <strong style={{ color: "#FFFFFF" }}>20% of a real problem</strong>.
            Use them free — no account, no paywall, no tricks.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9375rem",
              color: "#7A9BB5",
              margin: 0,
            }}
          >
            Want the other 80%? Each tool pairs with a step-by-step{" "}
            <a
              href="/guides"
              style={{
                color: "#F5A623",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              SA guide
            </a>
            .
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section
        style={{ backgroundColor: "#0D1B2A", padding: "3.5rem 1.5rem 5rem" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tools-grid">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>

          {/* Footnote */}
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#7A9BB5",
              textAlign: "center",
              marginTop: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            More tools coming soon.{" "}
            <a
              href="/guides"
              style={{
                color: "#F5A623",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Browse guides while you wait <ArrowRight size={13} />
            </a>
          </p>
        </div>
      </section>

      <style>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .tools-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .tools-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
