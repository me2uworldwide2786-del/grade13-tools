import {
  FileText,
  Building2,
  Calculator,
  Receipt,
  DollarSign,
} from "lucide-react";
import ToolCard from "./ToolCard";

const tools = [
  {
    Icon: FileText,
    title: "SA CV Builder",
    description:
      "Build a print-ready SA CV in under 5 minutes. Choose from 3 templates designed for graduates, hustlers, and professionals.",
    href: "/tools/cv-builder",
    pairedProduct: "CV & Interview Pack",
  },
  {
    Icon: Building2,
    title: "Business Structure Quiz",
    description:
      "Find out if you should register as Sole Prop, PTY Ltd, Partnership, or NPC — with a 7-question quiz designed for SA.",
    href: "/tools/business-quiz",
    pairedProduct: "CIPC Registration Guide",
  },
  {
    Icon: Calculator,
    title: "Side Hustle Income Calculator",
    description:
      "Calculate your real take-home from any side hustle. Includes the Profit Leak Detector and a SARS tax estimate.",
    href: "/tools/income-calculator",
    pairedProduct: "Side Hustle Starter Pack",
  },
  {
    Icon: Receipt,
    title: "SARS Tax Estimator",
    description:
      "Estimate your provisional tax owed as a freelancer or side hustler. Know what to save before SARS comes calling.",
    href: "/tools/tax-estimator",
    pairedProduct: "SARS Tax Guide",
    isNew: true,
  },
  {
    Icon: DollarSign,
    title: "USD Earnings Calculator",
    description:
      "See what earning in USD looks like converted to ZAR. Understand how exchange rates affect your real income.",
    href: "/tools/usd-calculator",
    pairedProduct: "Earning in USD from SA",
    isNew: true,
  },
];

export default function ToolsGrid() {
  return (
    <section
      style={{
        backgroundColor: "rgba(13,27,42,0.70)",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#FFFFFF",
              margin: "0 0 0.75rem",
            }}
          >
            Free Tools —{" "}
            <span style={{ color: "#F5A623" }}>No signup required</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1.0625rem",
              color: "#7A9BB5",
              margin: 0,
            }}
          >
            Use them now. Learn something. Come back whenever.
          </p>
        </div>

        {/* Grid */}
        <div className="tools-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>

      <style>{`
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .tools-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
