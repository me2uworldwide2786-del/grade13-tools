import { CheckSquare, Square } from "lucide-react";
import { hustleTypes, profitLeaks } from "@/lib/calculator-data";
import type { HustleType } from "@/lib/calculator-data";

interface CalculatorFormProps {
  selectedHustle: HustleType | null;
  hoursPerWeek: number;
  rate: number;
  unitsPerHour: number;
  activeLeakIds: string[];
  materialsCost: number;
  platformFeePercent: number;
  onHustleSelect: (hustle: HustleType) => void;
  onHoursChange: (v: number) => void;
  onRateChange: (v: number) => void;
  onUnitsPerHourChange: (v: number) => void;
  onToggleLeak: (id: string) => void;
  onMaterialsCostChange: (v: number) => void;
  onPlatformFeeChange: (v: number) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#162236",
  border: "1px solid #1E3048",
  borderRadius: "8px",
  padding: "0.5rem 0.875rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.9375rem",
  color: "#FFFFFF",
  outline: "none",
  boxSizing: "border-box",
};

function Label({ children, htmlFor }: { children: string; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: "#FFFFFF",
        marginBottom: "0.375rem",
      }}
    >
      {children}
    </label>
  );
}

function Hint({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: "0.3rem 0 0" }}>
      {children}
    </p>
  );
}

export default function CalculatorForm({
  selectedHustle,
  hoursPerWeek,
  rate,
  unitsPerHour,
  activeLeakIds,
  materialsCost,
  platformFeePercent,
  onHustleSelect,
  onHoursChange,
  onRateChange,
  onUnitsPerHourChange,
  onToggleLeak,
  onMaterialsCostChange,
  onPlatformFeeChange,
}: CalculatorFormProps) {
  const isPerUnit = selectedHustle?.rateType === "per_unit";

  return (
    <div>
      {/* ── Step 1: Hustle type grid ─────────────────────────── */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h3
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "#7A9BB5",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: "0 0 0.875rem",
          }}
        >
          Step 1 — Select your hustle type
        </h3>

        <div className="hustle-grid">
          {hustleTypes.map((hustle) => {
            const isSelected = selectedHustle?.id === hustle.id;
            const { Icon } = hustle;
            return (
              <button
                key={hustle.id}
                type="button"
                onClick={() => onHustleSelect(hustle)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 0.5rem",
                  backgroundColor: isSelected ? "rgba(245,166,35,0.08)" : "#162236",
                  border: isSelected ? "2px solid #F5A623" : "1px solid #1E3048",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background-color 0.15s",
                  textAlign: "center",
                }}
                className={isSelected ? "" : "hustle-card-btn"}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: isSelected ? "rgba(245,166,35,0.15)" : "rgba(245,166,35,0.08)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} color="#F5A623" strokeWidth={1.75} />
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? "#FFFFFF" : "#7A9BB5",
                    lineHeight: 1.3,
                  }}
                >
                  {hustle.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step 2 & 3: Inputs (shown after hustle selected) ──── */}
      {selectedHustle && (
        <div>
          <h3
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "#7A9BB5",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 0.875rem",
            }}
          >
            Step 2 &amp; 3 — Your numbers
          </h3>

          <div
            style={{
              backgroundColor: "#111D2C",
              border: "1px solid #1E3048",
              borderRadius: "12px",
              padding: "1.25rem",
              marginBottom: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Hours per week */}
            <div>
              <Label htmlFor="hoursPerWeek">
                Hours available per week
              </Label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  id="hoursPerWeek"
                  type="number"
                  min={1}
                  max={80}
                  value={hoursPerWeek || ""}
                  onChange={(e) => onHoursChange(Math.max(0, +e.target.value))}
                  placeholder="e.g. 10"
                  style={{ ...inputStyle, maxWidth: "140px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                  onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
                />
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>
                  hrs / week
                </span>
              </div>
            </div>

            {/* Rate */}
            <div>
              <Label htmlFor="rate">
                {selectedHustle.rateLabel.charAt(0).toUpperCase() + selectedHustle.rateLabel.slice(1)}
              </Label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: "#F5A623", fontWeight: 700 }}>R</span>
                <input
                  id="rate"
                  type="number"
                  min={0}
                  value={rate || ""}
                  onChange={(e) => onRateChange(Math.max(0, +e.target.value))}
                  placeholder={String(selectedHustle.defaultRate)}
                  style={{ ...inputStyle, maxWidth: "160px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                  onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
                />
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>
                  {selectedHustle.unit}
                </span>
              </div>
              <Hint>{`Average for SA ${selectedHustle.label.toLowerCase()} hustles: R${selectedHustle.defaultRate} ${selectedHustle.unit}`}</Hint>
            </div>

            {/* Units per hour — only for per_unit hustles */}
            {isPerUnit && (
              <div>
                <Label htmlFor="unitsPerHour">{`How many ${selectedHustle.unit.replace("per ", "")}s can you complete per hour?`}</Label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    id="unitsPerHour"
                    type="number"
                    min={0.1}
                    step={0.5}
                    value={unitsPerHour || ""}
                    onChange={(e) => onUnitsPerHourChange(Math.max(0.1, +e.target.value))}
                    placeholder={String(selectedHustle.defaultUnitsPerHour)}
                    style={{ ...inputStyle, maxWidth: "120px" }}
                    onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                    onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
                  />
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>
                    {selectedHustle.unit.replace("per ", "")}s / hr
                  </span>
                </div>
                <Hint>
                  Used to estimate weekly output from your hours.
                </Hint>
              </div>
            )}
          </div>

          {/* ── Profit Leak Detector ─────────────────────────── */}
          <div>
            <h3
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#7A9BB5",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                margin: "0 0 0.5rem",
              }}
            >
              💸 Profit Leak Detector
            </h3>
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", margin: "0 0 0.875rem" }}>
              Tick everything that eats into your income. Watch your take-home update.
            </p>

            <div
              style={{
                backgroundColor: "#111D2C",
                border: "1px solid #1E3048",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {profitLeaks.map((leak, idx) => {
                const isActive = activeLeakIds.includes(leak.id);
                return (
                  <div key={leak.id}>
                    {idx > 0 && (
                      <div style={{ height: "1px", backgroundColor: "#1E3048" }} />
                    )}
                    <div style={{ padding: "0.875rem 1.125rem" }}>
                      {/* Checkbox row */}
                      <button
                        type="button"
                        onClick={() => onToggleLeak(leak.id)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          width: "100%",
                          textAlign: "left",
                        }}
                      >
                        {isActive ? (
                          <CheckSquare size={18} color="#F5A623" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} />
                        ) : (
                          <Square size={18} color="#3a4a5a" strokeWidth={2} style={{ flexShrink: 0, marginTop: "1px" }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontFamily: "'DM Sans', system-ui, sans-serif",
                              fontSize: "0.9rem",
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? "#FFFFFF" : "#7A9BB5",
                            }}
                          >
                            {leak.label}
                          </span>
                          {leak.estimatedMonthly > 0 && (
                            <span
                              style={{
                                fontFamily: "'DM Sans', system-ui, sans-serif",
                                fontSize: "0.75rem",
                                color: isActive ? "#EF4444" : "#3a4a5a",
                                marginLeft: "0.5rem",
                              }}
                            >
                              ~R{leak.estimatedMonthly}/mo
                            </span>
                          )}
                          {leak.id === "tax" && (
                            <span
                              style={{
                                fontFamily: "'DM Sans', system-ui, sans-serif",
                                fontSize: "0.75rem",
                                color: isActive ? "#EF4444" : "#3a4a5a",
                                marginLeft: "0.5rem",
                              }}
                            >
                              calculated below
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Extra input for materials cost */}
                      {isActive && leak.id === "materials" && (
                        <div style={{ marginTop: "0.625rem", marginLeft: "2.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#F5A623", fontWeight: 700 }}>R</span>
                          <input
                            type="number"
                            min={0}
                            value={materialsCost || ""}
                            onChange={(e) => onMaterialsCostChange(Math.max(0, +e.target.value))}
                            placeholder="Monthly materials cost"
                            style={{ ...inputStyle, maxWidth: "200px", fontSize: "0.875rem" }}
                            onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                            onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
                          />
                          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#7A9BB5" }}>/month</span>
                        </div>
                      )}

                      {/* Extra input for platform fee % */}
                      {isActive && leak.id === "platform" && (
                        <div style={{ marginTop: "0.625rem", marginLeft: "2.125rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <input
                            type="number"
                            min={0}
                            max={50}
                            value={platformFeePercent || ""}
                            onChange={(e) => onPlatformFeeChange(Math.max(0, Math.min(50, +e.target.value)))}
                            placeholder="e.g. 15"
                            style={{ ...inputStyle, maxWidth: "100px", fontSize: "0.875rem" }}
                            onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                            onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
                          />
                          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#F5A623", fontWeight: 700 }}>%</span>
                          <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#7A9BB5" }}>of monthly gross</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hustle-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.625rem;
        }
        .hustle-card-btn:hover {
          border-color: rgba(245,166,35,0.4) !important;
          background-color: rgba(245,166,35,0.04) !important;
        }
        @media (max-width: 900px) {
          .hustle-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .hustle-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
