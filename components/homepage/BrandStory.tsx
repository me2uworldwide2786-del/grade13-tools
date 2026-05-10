const statCards = [
  {
    number: "10",
    label: "Guides",
    sublabel: "Step-by-step SA business guides",
    span: false,
  },
  {
    number: "5",
    label: "Free Tools",
    sublabel: "No account. No paywall.",
    span: false,
  },
  {
    number: "100%",
    label: "SA-Specific",
    sublabel: "SARS. CIPC. BizPortal. Load shedding and all.",
    span: true,
  },
];

export default function BrandStory() {
  return (
    <section
      style={{
        backgroundColor: "rgba(17,29,44,0.70)",
        padding: "5rem 1.5rem",
        borderTop: "1px solid #1E3048",
        borderBottom: "1px solid #1E3048",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto" }}
        className="brand-story-grid"
      >
        {/* Left — copy */}
        <div style={{ maxWidth: "540px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#FFFFFF",
              margin: "0 0 2rem",
              lineHeight: 1.2,
            }}
          >
            We&apos;re the older sibling who figured it out.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#7A9BB5",
              lineHeight: 1.75,
              margin: "0 0 1.25rem",
            }}
          >
            <strong style={{ color: "#FFFFFF" }}>Grade 13</strong> is a free
            tools and paid guides platform built for South Africans navigating
            the real world after school. Whether you&apos;re registering a
            business, filing tax for the first time, or trying to earn your
            first{" "}
            <strong style={{ color: "#FFFFFF" }}>R5k from a side hustle</strong>{" "}
            — we&apos;ve got the tools and the step-by-step guides to help you
            do it.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#7A9BB5",
              lineHeight: 1.75,
              margin: "0 0 1.25rem",
            }}
          >
            We build for matrics, recent graduates, side hustlers, and young
            entrepreneurs who are figuring things out without a blueprint. No
            corporate jargon, no one-size-fits-all advice imported from the US.
            Everything here is built for{" "}
            <strong style={{ color: "#FFFFFF" }}>South African realities</strong>{" "}
            — <strong style={{ color: "#FFFFFF" }}>SARS</strong>,{" "}
            <strong style={{ color: "#FFFFFF" }}>CIPC</strong>,{" "}
            <strong style={{ color: "#FFFFFF" }}>BizPortal</strong>, load
            shedding and all.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "1rem",
              color: "#7A9BB5",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Nobody teaches you this stuff in school. The entrepreneurs, the
            freelancers, the small business owners — they all figured it out
            the hard way.{" "}
            <strong style={{ color: "#FFFFFF" }}>
              Grade 13 exists so the next generation doesn&apos;t have to.
            </strong>
          </p>
        </div>

        {/* Right — stats grid */}
        <div className="stats-grid-wrap">
          <div className="stats-inner-grid">
            {statCards.map((s) => (
              <div
                key={s.label}
                className={`stat-card${s.span ? " stat-card-full" : ""}`}
                style={{
                  backgroundColor: "#162236",
                  border: "1px solid #1E3048",
                  borderRadius: "16px",
                  padding: "1.75rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "2.75rem",
                    color: "#F5A623",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.number}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "#FFFFFF",
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.8125rem",
                    color: "#7A9BB5",
                    lineHeight: 1.5,
                  }}
                >
                  {s.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .brand-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .stats-inner-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .stat-card-full {
          grid-column: 1 / -1;
        }
        @media (max-width: 900px) {
          .brand-story-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .stats-grid-wrap {
            max-width: 480px;
          }
        }
        @media (max-width: 480px) {
          .stats-inner-grid {
            grid-template-columns: 1fr;
          }
          .stat-card-full {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  );
}
