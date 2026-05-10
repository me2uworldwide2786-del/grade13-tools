import { CheckCircle, XCircle, Clock, Banknote, BarChart3, ArrowRight, RefreshCw } from "lucide-react";
import { structureResults } from "@/lib/quiz-data";
import type { BusinessStructure, Difficulty } from "@/lib/quiz-data";
import EmailCapture from "@/components/layout/EmailCapture";
import { PAYHIP_LINKS } from "@/lib/utils";

interface QuizResultProps {
  structure: BusinessStructure;
  onRetake: () => void;
}

const difficultyColors: Record<Difficulty, { bg: string; color: string }> = {
  Easy:     { bg: "rgba(34,197,94,0.12)",  color: "#22C55E" },
  Moderate: { bg: "rgba(245,166,35,0.12)", color: "#F5A623" },
  Complex:  { bg: "rgba(239,68,68,0.12)",  color: "#EF4444" },
};

const structureIcons: Record<BusinessStructure, string> = {
  sole_proprietor: "🧑‍💼",
  partnership:     "🤝",
  pty_ltd:         "🏢",
  npc:             "❤️",
};

export default function QuizResult({ structure, onRetake }: QuizResultProps) {
  const result = structureResults[structure];
  const diff   = difficultyColors[result.difficulty];

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 0 3rem" }}>

      {/* ── Result header ──────────────────────────────────────── */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          padding: "0 1rem",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>
          {structureIcons[structure]}
        </div>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(245,166,35,0.12)",
            border: "1px solid rgba(245,166,35,0.3)",
            borderRadius: "9999px",
            padding: "0.3rem 1rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#F5A623",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "0.875rem",
          }}
        >
          Your recommended structure
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "#FFFFFF",
            margin: "0 0 0.5rem",
            lineHeight: 1.15,
          }}
        >
          {result.name}
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontStyle: "italic",
            fontSize: "1.0625rem",
            color: "#F5A623",
            margin: 0,
          }}
        >
          {result.tagline}
        </p>
      </div>

      {/* ── Main result card ───────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#111D2C",
          border: "1px solid #1E3048",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {/* Gold accent top bar */}
        <div style={{ height: "4px", backgroundColor: "#F5A623" }} />

        <div style={{ padding: "2rem 2rem 0" }}>
          {/* Explanation */}
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#FFFFFF",
              lineHeight: 1.7,
              margin: "0 0 1.75rem",
            }}
          >
            {result.explanation}
          </p>

          {/* Best for / Not ideal — two columns */}
          <div className="result-bullets-grid">
            {/* Best for */}
            <div
              style={{
                backgroundColor: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#22C55E",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 0.875rem",
                }}
              >
                ✔ Best for
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {result.bestFor.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "#FFFFFF",
                      lineHeight: 1.45,
                    }}
                  >
                    <CheckCircle
                      size={15}
                      color="#22C55E"
                      strokeWidth={2.5}
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not ideal if */}
            <div
              style={{
                backgroundColor: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "12px",
                padding: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#EF4444",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 0.875rem",
                }}
              >
                ✘ Not ideal if
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {result.notIdealIf.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      color: "#FFFFFF",
                      lineHeight: 1.45,
                    }}
                  >
                    <XCircle
                      size={15}
                      color="#EF4444"
                      strokeWidth={2.5}
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats row — cost / time / difficulty */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0",
              borderTop: "1px solid #1E3048",
              margin: "1.75rem -2rem 0",
            }}
          >
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderRight: "1px solid #1E3048",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.375rem",
                }}
              >
                <Banknote size={14} color="#7A9BB5" strokeWidth={1.75} />
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
                  Registration Cost
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.1875rem",
                  color: "#F5A623",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {result.cipcCost}
              </p>
            </div>

            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderRight: "1px solid #1E3048",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.375rem",
                }}
              >
                <Clock size={14} color="#7A9BB5" strokeWidth={1.75} />
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
                  Time to Register
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#FFFFFF",
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                {result.timeToRegister}
              </p>
            </div>

            <div style={{ padding: "1.25rem 1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.375rem",
                }}
              >
                <BarChart3 size={14} color="#7A9BB5" strokeWidth={1.75} />
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
                  Difficulty
                </span>
              </div>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: diff.bg,
                  color: diff.color,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  padding: "0.25rem 0.875rem",
                  borderRadius: "9999px",
                }}
              >
                {result.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* CTA box */}
        <div
          style={{
            backgroundColor: "rgba(245,166,35,0.07)",
            borderTop: "1px solid rgba(245,166,35,0.25)",
            padding: "1.5rem 2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9375rem",
              color: "#7A9BB5",
              margin: "0 0 1rem",
            }}
          >
            Ready to make it official? Our step-by-step{" "}
            <strong style={{ color: "#FFFFFF" }}>CIPC Registration Guide</strong>{" "}
            walks you through registering a{" "}
            <strong style={{ color: "#FFFFFF" }}>{result.name}</strong> in South
            Africa — without the confusion.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <a
              href={PAYHIP_LINKS.cipcGuide}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#F5A623",
                color: "#0D1B2A",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "0.75rem 1.75rem",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              className="btn-gold"
            >
              <strong>Here&apos;s your exact step-by-step registration guide</strong>
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>

            <button
              onClick={onRetake}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "none",
                border: "none",
                color: "#7A9BB5",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.875rem",
                cursor: "pointer",
                padding: "0.5rem 0",
                transition: "color 0.2s",
              }}
            >
              <RefreshCw size={13} />
              Not sure? Retake the quiz
            </button>
          </div>
        </div>
      </div>

      {/* ── Email capture ─────────────────────────────────────── */}
      <EmailCapture
        tipSheet="The 3 Business Structure Mistakes SA Entrepreneurs Make Before They Even Register"
        pairedProduct="CIPC Registration Guide — All 4 SA Structures — R197"
        payhipLink={PAYHIP_LINKS.cipcGuide}
      />

      {/* Responsive styles */}
      <style>{`
        .result-bullets-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 0;
        }
        @media (max-width: 600px) {
          .result-bullets-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
