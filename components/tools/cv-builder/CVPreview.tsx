import type { CVData, TemplateId, EducationEntry, ExperienceEntry } from "@/lib/cv-templates";

interface CVPreviewProps {
  template: TemplateId;
  data: Partial<CVData>;
  skills: string[];
}

/* ── Shared inline-style helpers (html2canvas-safe) ─────────────── */

function SectionDivider({ color = "#0D1B2A" }: { color?: string }) {
  return (
    <div
      style={{
        borderTop: `1.5px solid ${color}`,
        marginBottom: "6px",
        marginTop: "2px",
      }}
    />
  );
}

function SectionTitle({
  children,
  color = "#0D1B2A",
  light = false,
}: {
  children: string;
  color?: string;
  light?: boolean;
}) {
  return (
    <p
      style={{
        fontSize: "9px",
        fontWeight: "bold",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,0.6)" : color,
        margin: "0 0 3px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {children}
    </p>
  );
}

function BodyText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: "9.5px",
        color: "#333",
        lineHeight: 1.5,
        margin: "0 0 3px",
        fontFamily: "Arial, Helvetica, sans-serif",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function BulletLines({ text }: { text: string }) {
  if (!text) return null;
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return (
    <ul style={{ margin: "2px 0 0 12px", padding: 0 }}>
      {lines.map((line, i) => (
        <li
          key={i}
          style={{
            fontSize: "9.5px",
            color: "#333",
            lineHeight: 1.5,
            marginBottom: "1px",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {line.replace(/^[•\-]\s*/, "")}
        </li>
      ))}
    </ul>
  );
}

function EducationBlock({ edu }: { edu: EducationEntry }) {
  if (!edu.institution && !edu.qualification) return null;
  return (
    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: "bold",
            color: "#1a1a1a",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {edu.institution || "Institution"}
        </span>
        <span
          style={{
            fontSize: "9px",
            color: "#555",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {edu.year}
        </span>
      </div>
      <BodyText>{edu.qualification || "Qualification"}</BodyText>
      {edu.subjects && (
        <BodyText style={{ color: "#555" }}>Subjects: {edu.subjects}</BodyText>
      )}
      {edu.achievements && (
        <BodyText style={{ color: "#555" }}>{edu.achievements}</BodyText>
      )}
    </div>
  );
}

function ExperienceBlock({
  exp,
  accentColor,
}: {
  exp: ExperienceEntry;
  accentColor?: string;
}) {
  if (!exp.title && !exp.company) return null;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: "bold",
            color: "#1a1a1a",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {exp.title || "Job Title"}
        </span>
        <span
          style={{
            fontSize: "9px",
            color: "#555",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
        </span>
      </div>
      <BodyText style={{ color: accentColor ?? "#555", fontWeight: "bold" }}>
        {exp.company || "Company"}
      </BodyText>
      <BulletLines text={exp.description} />
    </div>
  );
}

function SkillPill({
  skill,
  bg,
  color,
}: {
  skill: string;
  bg: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: bg,
        color,
        fontSize: "8.5px",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "2px 7px",
        borderRadius: "3px",
        marginRight: "4px",
        marginBottom: "4px",
      }}
    >
      {skill}
    </span>
  );
}

/* ── TEMPLATE A — The Graduate ─────────────────────────────────── */

function GraduateTemplate({ data, skills }: { data: Partial<CVData>; skills: string[] }) {
  const edu = data.education ?? [];
  const exp = data.experience ?? [];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
        minHeight: "840px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#0D1B2A",
          padding: "24px 28px 18px",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
          }}
        >
          {data.fullName || "Your Full Name"}
        </div>
        <div
          style={{
            fontSize: "9.5px",
            color: "rgba(255,255,255,0.7)",
            marginTop: "6px",
          }}
        >
          {[data.email, data.phone, data.location]
            .filter(Boolean)
            .join("  ·  ")}
        </div>
        {(data.linkedin || data.portfolio) && (
          <div
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.55)",
              marginTop: "3px",
            }}
          >
            {[data.linkedin, data.portfolio].filter(Boolean).join("  ·  ")}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 28px 24px" }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: "14px" }}>
            <SectionTitle>Profile Summary</SectionTitle>
            <SectionDivider />
            <BodyText>{data.summary}</BodyText>
          </div>
        )}

        {/* Education */}
        {edu.some((e) => e.institution || e.qualification) && (
          <div style={{ marginBottom: "14px" }}>
            <SectionTitle>Education</SectionTitle>
            <SectionDivider />
            {edu.map((e, i) => (
              <EducationBlock key={i} edu={e} />
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: "14px" }}>
            <SectionTitle>Skills</SectionTitle>
            <SectionDivider />
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "4px" }}>
              {skills.map((s, i) => (
                <SkillPill key={i} skill={s} bg="#EEF2F6" color="#333" />
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {exp.some((e) => e.title || e.company) && (
          <div style={{ marginBottom: "14px" }}>
            <SectionTitle>Work Experience</SectionTitle>
            <SectionDivider />
            {exp.map((e, i) => (
              <ExperienceBlock key={i} exp={e} />
            ))}
          </div>
        )}

        {/* References */}
        <div>
          <SectionTitle>References</SectionTitle>
          <SectionDivider />
          <BodyText style={{ color: "#555" }}>Available on request</BodyText>
        </div>
      </div>
    </div>
  );
}

/* ── TEMPLATE B — The Hustler ──────────────────────────────────── */

function HustlerTemplate({ data, skills }: { data: Partial<CVData>; skills: string[] }) {
  const edu = data.education ?? [];
  const exp = data.experience ?? [];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
        minHeight: "840px",
      }}
    >
      {/* Gold accent bar */}
      <div style={{ height: "5px", backgroundColor: "#F5A623", width: "100%" }} />

      {/* Two-column layout */}
      <div style={{ display: "flex", minHeight: "835px" }}>
        {/* Left column — dark */}
        <div
          style={{
            width: "38%",
            backgroundColor: "#1B2538",
            padding: "22px 18px",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#FFFFFF",
              lineHeight: 1.2,
              marginBottom: "4px",
            }}
          >
            {data.fullName || "Your Name"}
          </div>
          <div
            style={{
              width: "28px",
              height: "3px",
              backgroundColor: "#F5A623",
              marginBottom: "12px",
            }}
          />

          {/* Contact */}
          <div style={{ marginBottom: "16px" }}>
            {[data.email, data.phone, data.location, data.linkedin, data.portfolio]
              .filter(Boolean)
              .map((val, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "8.5px",
                    color: "rgba(255,255,255,0.65)",
                    margin: "0 0 3px",
                    wordBreak: "break-all",
                  }}
                >
                  {val}
                </p>
              ))}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <SectionTitle light>Skills</SectionTitle>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  marginBottom: "8px",
                  marginTop: "3px",
                }}
              />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {skills.map((s, i) => (
                  <SkillPill key={i} skill={s} bg="rgba(245,166,35,0.2)" color="#F5A623" />
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {edu.some((e) => e.institution || e.qualification) && (
            <div>
              <SectionTitle light>Education</SectionTitle>
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  marginBottom: "8px",
                  marginTop: "3px",
                }}
              />
              {edu.map((e, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <p
                    style={{
                      fontSize: "9.5px",
                      fontWeight: "bold",
                      color: "#fff",
                      margin: "0 0 1px",
                    }}
                  >
                    {e.institution || "Institution"}
                  </p>
                  <p
                    style={{
                      fontSize: "8.5px",
                      color: "rgba(255,255,255,0.6)",
                      margin: "0 0 1px",
                    }}
                  >
                    {e.qualification}
                  </p>
                  <p
                    style={{
                      fontSize: "8px",
                      color: "#F5A623",
                      margin: 0,
                    }}
                  >
                    {e.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column — white */}
        <div style={{ flex: 1, padding: "22px 22px" }}>
          {/* Summary */}
          {data.summary && (
            <div style={{ marginBottom: "14px" }}>
              <SectionTitle color="#F5A623">About Me</SectionTitle>
              <SectionDivider color="#F5A623" />
              <BodyText>{data.summary}</BodyText>
            </div>
          )}

          {/* Experience — titled "Projects / Side Businesses" for hustler */}
          {exp.some((e) => e.title || e.company) && (
            <div style={{ marginBottom: "14px" }}>
              <SectionTitle color="#F5A623">Projects & Experience</SectionTitle>
              <SectionDivider color="#F5A623" />
              {exp.map((e, i) => (
                <ExperienceBlock key={i} exp={e} accentColor="#F5A623" />
              ))}
            </div>
          )}

          {/* References */}
          <div>
            <SectionTitle color="#F5A623">References</SectionTitle>
            <SectionDivider color="#F5A623" />
            <BodyText style={{ color: "#555" }}>Available on request</BodyText>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── TEMPLATE C — The Professional ────────────────────────────── */

function ProfessionalTemplate({ data, skills }: { data: Partial<CVData>; skills: string[] }) {
  const edu = data.education ?? [];
  const exp = data.experience ?? [];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        fontFamily: "Arial, Helvetica, sans-serif",
        minHeight: "840px",
        padding: "28px 32px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}
        >
          {data.fullName || "Your Full Name"}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#555",
            marginTop: "5px",
          }}
        >
          {[data.email, data.phone, data.location, data.linkedin, data.portfolio]
            .filter(Boolean)
            .join("  |  ")}
        </div>
        {/* Gold divider */}
        <div
          style={{
            height: "2px",
            backgroundColor: "#F5A623",
            marginTop: "10px",
          }}
        />
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: "14px" }}>
          <SectionTitle>Profile Summary</SectionTitle>
          <SectionDivider color="#ddd" />
          <BodyText>{data.summary}</BodyText>
        </div>
      )}

      {/* Experience */}
      {exp.some((e) => e.title || e.company) && (
        <div style={{ marginBottom: "14px" }}>
          <SectionTitle>Work Experience</SectionTitle>
          <SectionDivider color="#ddd" />
          {exp.map((e, i) => (
            <ExperienceBlock key={i} exp={e} />
          ))}
        </div>
      )}

      {/* Education */}
      {edu.some((e) => e.institution || e.qualification) && (
        <div style={{ marginBottom: "14px" }}>
          <SectionTitle>Education</SectionTitle>
          <SectionDivider color="#ddd" />
          {edu.map((e, i) => (
            <EducationBlock key={i} edu={e} />
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: "14px" }}>
          <SectionTitle>Skills</SectionTitle>
          <SectionDivider color="#ddd" />
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "4px" }}>
            {skills.map((s, i) => (
              <SkillPill key={i} skill={s} bg="#F5F5F5" color="#333" />
            ))}
          </div>
        </div>
      )}

      {/* References */}
      <div>
        <SectionTitle>References</SectionTitle>
        <SectionDivider color="#ddd" />
        <BodyText style={{ color: "#555" }}>Available on request</BodyText>
      </div>
    </div>
  );
}

/* ── Exported component ─────────────────────────────────────────── */

export default function CVPreview({ template, data, skills }: CVPreviewProps) {
  return (
    <>
      {template === "graduate" && <GraduateTemplate data={data} skills={skills} />}
      {template === "hustler" && <HustlerTemplate data={data} skills={skills} />}
      {template === "professional" && <ProfessionalTemplate data={data} skills={skills} />}
    </>
  );
}
