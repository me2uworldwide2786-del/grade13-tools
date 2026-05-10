"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* ── Product data ─────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: 0,
    name: "Side Hustle Starter Pack SA 2026",
    price: "R297",
    image: "/images/side-hustle-starter-pack.jpg",
    href: "https://payhip.com/b/TZebD",
    description:
      "15 proven SA-specific hustles you can start this week — zero capital required. Built for 2026 realities: load shedding, data costs, and SA's 32.9% unemployment rate.",
    icon: "💼",
  },
  {
    id: 1,
    name: "SARS Tax Guide 2026",
    price: "R247",
    image: "/images/sars-tax-guide.png",
    href: "https://payhip.com/b/wVXQg",
    description:
      "2025/2026 tax brackets in plain language. Every legal deduction you can claim, provisional tax explained, and eFiling step-by-step. No jargon. No accountant needed.",
    icon: "📋",
  },
  {
    id: 2,
    name: "CIPC Business Registration Guide",
    price: "R197",
    image: "/images/cipc-business-guide.jpg",
    href: "https://payhip.com/b/bmk4R",
    description:
      "All 4 SA business structures — Sole Trader, PTY Ltd, NPC, Co-operative — with step-by-step CIPC registration. Verified against 2026 fees and SA legislation.",
    icon: "🏢",
  },
  {
    id: 3,
    name: "CV & Interview Pack",
    price: "R147",
    image: "/images/cv-interview-pack.png",
    href: "https://payhip.com/b/kKSoQ",
    description:
      "3 ATS-safe CV templates, 3 cover letter templates, and a 25-question interview prep checklist. Built specifically for the SA job market — not generic advice.",
    icon: "📄",
  },
];

const CYCLE_INTERVAL = 3200;

/* ── Component ────────────────────────────────────────────────────── */

export default function ProductSelector() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % PRODUCTS.length);
    }, CYCLE_INTERVAL);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const handleClick = (id: number) => {
    setActive(id);
    setPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    // Resume auto-cycle after 8 seconds of user inactivity
    setTimeout(() => setPaused(false), 8000);
  };

  const product = PRODUCTS[active];

  return (
    <section
      style={{
        backgroundColor: "#0D1B2A",
        padding: "3.5rem 1.5rem",
        borderTop: "1px solid #1E3048",
        borderBottom: "1px solid #1E3048",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F5A623",
              margin: "0 0 0.75rem",
            }}
          >
            Grade 13 Guides
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "#FFFFFF",
              margin: "0 0 0.75rem",
              lineHeight: 1.15,
            }}
          >
            Everything they didn&apos;t teach you
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontStyle: "italic",
              fontSize: "0.9375rem",
              color: "#F5A623",
              margin: 0,
            }}
          >
            &ldquo;School ends at Grade 12. Life starts at Grade 13.&rdquo;
          </p>
        </div>

        {/* Selector layout */}
        <div className="ps-layout">

          {/* Left: panels */}
          <div className="ps-panels">
            {PRODUCTS.map((p) => {
              const isActive = p.id === active;
              return (
                <button
                  key={p.id}
                  onClick={() => handleClick(p.id)}
                  className={`ps-panel${isActive ? " ps-panel--active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.875rem",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    borderRadius: "14px",
                    outline: "none",
                  }}
                  aria-pressed={isActive}
                >
                  <div
                    className="ps-panel-inner"
                    style={{
                      width: "100%",
                      backgroundColor: isActive ? "#162236" : "#0F1F30",
                      border: isActive
                        ? "1.5px solid #F5A623"
                        : "1px solid #1E3048",
                      borderRadius: "14px",
                      padding: isActive ? "1.25rem 1.375rem" : "0.875rem 1.125rem",
                      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                      boxShadow: isActive
                        ? "0 0 24px rgba(245,166,35,0.18)"
                        : "none",
                    }}
                  >
                    {/* Always-visible row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: isActive ? "1.5rem" : "1.25rem",
                          lineHeight: 1,
                          flexShrink: 0,
                          transition: "font-size 0.3s ease",
                        }}
                        aria-hidden="true"
                      >
                        {p.icon}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontFamily: "'DM Sans', system-ui, sans-serif",
                            fontWeight: isActive ? 700 : 600,
                            fontSize: isActive ? "0.9375rem" : "0.875rem",
                            color: isActive ? "#FFFFFF" : "#7A9BB5",
                            margin: 0,
                            lineHeight: 1.3,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            transition: "color 0.3s ease, font-size 0.3s ease",
                          }}
                        >
                          {p.name}
                        </p>
                        {isActive && (
                          <p
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontWeight: 900,
                              fontSize: "1.0625rem",
                              color: "#F5A623",
                              margin: "0.2rem 0 0",
                              lineHeight: 1,
                            }}
                          >
                            {p.price}
                          </p>
                        )}
                        {!isActive && (
                          <p
                            style={{
                              fontFamily: "'DM Sans', system-ui, sans-serif",
                              fontSize: "0.75rem",
                              color: "#1E4060",
                              margin: "0.15rem 0 0",
                              lineHeight: 1,
                              transition: "color 0.3s ease",
                            }}
                          >
                            {p.price}
                          </p>
                        )}
                      </div>

                      {/* Progress indicator for active */}
                      {isActive && !paused && (
                        <div
                          style={{
                            width: "3px",
                            height: "40px",
                            backgroundColor: "#1E3048",
                            borderRadius: "3px",
                            flexShrink: 0,
                            overflow: "hidden",
                            position: "relative",
                          }}
                          aria-hidden="true"
                        >
                          <div
                            className="ps-progress-bar"
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              backgroundColor: "#F5A623",
                              borderRadius: "3px",
                              animationDuration: `${CYCLE_INTERVAL}ms`,
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Expanded: description */}
                    {isActive && (
                      <p
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "0.875rem",
                          color: "#7A9BB5",
                          margin: "0.875rem 0 0",
                          lineHeight: 1.65,
                          borderTop: "1px solid #1E3048",
                          paddingTop: "0.875rem",
                        }}
                      >
                        {p.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: active product card */}
          <div className="ps-preview">
            <div
              style={{
                backgroundColor: "#111D2C",
                border: "1px solid rgba(245,166,35,0.22)",
                borderRadius: "20px",
                overflow: "hidden",
                height: "100%",
              }}
            >
              {/* Product image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  backgroundColor: "#0D1B2A",
                  overflow: "hidden",
                }}
              >
                <Image
                  key={product.id}
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="ps-product-image"
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, transparent 50%, #111D2C 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem 1.75rem 2rem" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                    color: "#FFFFFF",
                    margin: "0 0 0.5rem",
                    lineHeight: 1.25,
                  }}
                >
                  {product.name}
                </h3>

                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "2rem",
                    color: "#F5A623",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {product.price}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    color: "#7A9BB5",
                    margin: "0 0 1.25rem",
                  }}
                >
                  once-off · instant download
                </p>

                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "#7A9BB5",
                    lineHeight: 1.65,
                    margin: "0 0 1.75rem",
                  }}
                >
                  {product.description}
                </p>

                {/* CTA button */}
                <a
                  href={product.href}
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
                    padding: "0.8125rem 1.75rem",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    transition: "background-color 0.2s ease, transform 0.15s ease",
                    boxShadow: "0 0 20px rgba(245,166,35,0.30)",
                  }}
                  className="ps-cta-btn"
                >
                  <strong>Get Instant Access</strong>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .ps-layout {
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 2rem;
          align-items: start;
        }
        .ps-panels {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ps-panel {
          transition: transform 0.2s ease;
        }
        .ps-panel:hover .ps-panel-inner {
          border-color: rgba(245,166,35,0.45) !important;
        }
        .ps-panel--active:hover {
          transform: none;
        }
        .ps-preview {
          position: sticky;
          top: 5rem;
        }

        /* Fade-in on image change */
        .ps-product-image {
          animation: psFadeIn 0.4s ease forwards;
        }
        @keyframes psFadeIn {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* CTA hover */
        .ps-cta-btn:hover {
          background-color: #FFD080 !important;
          transform: translateY(-1px);
        }
        .ps-cta-btn:active {
          transform: translateY(0);
        }

        /* Progress bar fill animation */
        .ps-progress-bar {
          height: 0%;
          animation: psProgress linear forwards;
        }
        @keyframes psProgress {
          from { height: 0%; }
          to   { height: 100%; }
        }

        /* Tablet */
        @media (max-width: 900px) {
          .ps-layout {
            grid-template-columns: 1fr;
          }
          .ps-preview {
            position: static;
            order: -1;
          }
        }

        /* Mobile */
        @media (max-width: 540px) {
          .ps-layout {
            gap: 1.25rem;
          }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ps-product-image { animation: none; }
          .ps-cta-btn:hover { transform: none !important; }
          .ps-progress-bar { animation: none; }
        }
      `}</style>
    </section>
  );
}
