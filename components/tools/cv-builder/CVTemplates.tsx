import type { TemplateId } from "@/lib/cv-templates";
import { CV_TEMPLATES } from "@/lib/cv-templates";
import { ArrowRight, CheckCircle } from "lucide-react";

interface CVTemplatesProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
  onConfirm: () => void;
}

/* Mini layout thumbnails for each template */
function GraduateThumbnail() {
  return (
    <div style={{ width: "100%", aspectRatio: "0.707", backgroundColor: "#fff", borderRadius: "4px", overflow: "hidden", border: "1px solid #e5e5e5" }}>
      <div style={{ height: "22%", backgroundColor: "#0D1B2A", padding: "4px 6px" }}>
        <div style={{ height: "3px", width: "55%", backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "2px", marginBottom: "3px" }} />
        <div style={{ height: "2px", width: "75%", backgroundColor: "rgba(255,255,255,0.4)", borderRadius: "2px" }} />
      </div>
      <div style={{ padding: "5px 6px" }}>
        {[80, 90, 65, 85, 70, 90, 60].map((w, i) => (
          <div key={i} style={{ height: "2px", width: `${w}%`, backgroundColor: i % 3 === 0 ? "#0D1B2A" : "#ddd", borderRadius: "2px", marginBottom: "3px" }} />
        ))}
      </div>
    </div>
  );
}

function HustlerThumbnail() {
  return (
    <div style={{ width: "100%", aspectRatio: "0.707", backgroundColor: "#fff", borderRadius: "4px", overflow: "hidden", border: "1px solid #e5e5e5", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "4px", backgroundColor: "#F5A623", flexShrink: 0 }} />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "38%", backgroundColor: "#1B2538", padding: "4px" }}>
          <div style={{ height: "3px", width: "70%", backgroundColor: "rgba(255,255,255,0.8)", borderRadius: "2px", marginBottom: "4px" }} />
          {[60, 80, 50, 70].map((w, i) => (
            <div key={i} style={{ height: "2px", width: `${w}%`, backgroundColor: "rgba(245,166,35,0.5)", borderRadius: "2px", marginBottom: "3px" }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: "4px" }}>
          {[90, 70, 85, 60, 75, 80].map((w, i) => (
            <div key={i} style={{ height: "2px", width: `${w}%`, backgroundColor: "#ddd", borderRadius: "2px", marginBottom: "3px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfessionalThumbnail() {
  return (
    <div style={{ width: "100%", aspectRatio: "0.707", backgroundColor: "#fff", borderRadius: "4px", overflow: "hidden", border: "1px solid #e5e5e5", padding: "6px" }}>
      <div style={{ height: "3px", width: "60%", backgroundColor: "#1a1a1a", borderRadius: "2px", marginBottom: "2px" }} />
      <div style={{ height: "2px", width: "85%", backgroundColor: "#999", borderRadius: "2px", marginBottom: "3px" }} />
      <div style={{ height: "2px", backgroundColor: "#F5A623", marginBottom: "4px" }} />
      {[80, 90, 70, 85, 65, 90, 75].map((w, i) => (
        <div key={i} style={{ height: "2px", width: `${w}%`, backgroundColor: i % 3 === 0 ? "#555" : "#ddd", borderRadius: "2px", marginBottom: "3px" }} />
      ))}
    </div>
  );
}

const Thumbnails: Record<TemplateId, React.FC> = {
  graduate: GraduateThumbnail,
  hustler: HustlerThumbnail,
  professional: ProfessionalThumbnail,
};

export default function CVTemplates({ selected, onSelect, onConfirm }: CVTemplatesProps) {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 0 2rem" }}>
      <div className="template-cards-grid">
        {CV_TEMPLATES.map((tpl) => {
          const isSelected = selected === tpl.id;
          const Thumb = Thumbnails[tpl.id];

          return (
            <button
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              style={{
                backgroundColor: isSelected ? "rgba(245,166,35,0.06)" : "#111D2C",
                border: isSelected ? "2px solid #F5A623" : "1px solid #1E3048",
                borderRadius: "16px",
                padding: "1.25rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 0.2s, background-color 0.2s, transform 0.15s",
                position: "relative",
              }}
              className="template-card-btn"
            >
              {/* Selected indicator */}
              {isSelected && (
                <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                  <CheckCircle size={20} color="#F5A623" strokeWidth={2} />
                </div>
              )}

              {/* Thumbnail */}
              <div style={{ marginBottom: "1rem" }}>
                <Thumb />
              </div>

              {/* Template info */}
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: isSelected ? "rgba(245,166,35,0.15)" : "rgba(122,155,181,0.1)",
                  color: isSelected ? "#F5A623" : "#7A9BB5",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  padding: "0.2rem 0.625rem",
                  borderRadius: "9999px",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {tpl.bestFor}
              </div>

              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.1875rem",
                  color: "#FFFFFF",
                  margin: "0 0 0.25rem",
                }}
              >
                {tpl.name}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8125rem",
                  color: "#F5A623",
                  fontStyle: "italic",
                  margin: "0 0 0.625rem",
                }}
              >
                {tpl.tagline}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8125rem",
                  color: "#7A9BB5",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {tpl.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Confirm button */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={onConfirm}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "#F5A623",
            color: "#0D1B2A",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            padding: "0.75rem 2rem",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.15s",
          }}
          className="btn-gold"
        >
          <strong>Use {CV_TEMPLATES.find((t) => t.id === selected)?.name} Template</strong>
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A9BB5",
            marginTop: "0.75rem",
          }}
        >
          You can change your template at any time while building.
        </p>
      </div>

      <style>{`
        .template-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .template-card-btn:hover {
          border-color: rgba(245,166,35,0.5) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .template-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
