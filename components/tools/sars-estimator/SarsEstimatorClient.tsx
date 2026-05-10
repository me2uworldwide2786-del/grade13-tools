"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calendar,
  TrendingDown,
  Info,
} from "lucide-react";
import EmailCapture from "@/components/layout/EmailCapture";
import { PAYHIP_LINKS, formatZAR } from "@/lib/utils";
import {
  calculateSarsTax,
  TAX_BRACKETS,
  THRESHOLDS,
  REBATES,
  PROVISIONAL_THRESHOLD,
  type AgeBracket,
} from "@/lib/sars-data";

/* ── Shared styles ──────────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  backgroundColor: "#162236",
  border: "1px solid #1E3048",
  borderRadius: "8px",
  padding: "0.5625rem 1rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.9375rem",
  color: "#FFFFFF",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
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

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: "0.3rem 0 0", lineHeight: 1.5 }}>
      {children}
    </p>
  );
}

/* ── Animated number hook ────────────────────────────────────────── */

function useAnimatedNumber(target: number, duration = 550): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) { setDisplay(target); fromRef.current = target; return; }
    const from = fromRef.current;
    if (from === target) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * e));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, shouldReduce]);

  return display;
}

/* ── Stat card ───────────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  sub,
  color,
  highlighted,
}: {
  label: string;
  value: number;
  sub?: string;
  color: string;
  highlighted?: boolean;
}) {
  const displayed = useAnimatedNumber(value);
  return (
    <div
      style={{
        backgroundColor: highlighted ? "rgba(245,166,35,0.07)" : "#111D2C",
        border: `1px solid ${highlighted ? "rgba(245,166,35,0.3)" : "#1E3048"}`,
        borderRadius: "12px",
        padding: "1.125rem 1.25rem",
      }}
    >
      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#7A9BB5", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 0.35rem" }}>
        {label}
      </p>
      <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.625rem", color, margin: "0 0 0.2rem", lineHeight: 1 }}>
        R{displayed.toLocaleString("en-ZA")}
      </p>
      {sub && (
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Tax bracket table ───────────────────────────────────────────── */

function BracketTable({ totalIncome }: { totalIncome: number }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1E3048" }}>
            {["Taxable Income", "Rate", ""].map((h) => (
              <th key={h} style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#7A9BB5", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.6875rem" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TAX_BRACKETS.slice(0, -1).map((b, i) => {
            const isActive = totalIncome > b.min && totalIncome <= b.max;
            const label =
              i === 0
                ? `R0 – R${b.max.toLocaleString("en-ZA")}`
                : `R${b.min.toLocaleString("en-ZA")} – R${b.max.toLocaleString("en-ZA")}`;
            return (
              <tr
                key={i}
                style={{
                  backgroundColor: isActive ? "rgba(245,166,35,0.06)" : "transparent",
                  borderBottom: "1px solid #1E3048",
                }}
              >
                <td style={{ padding: "0.5rem 0.75rem", color: isActive ? "#FFFFFF" : "#7A9BB5" }}>{label}</td>
                <td style={{ padding: "0.5rem 0.75rem", color: isActive ? "#F5A623" : "#7A9BB5", fontWeight: isActive ? 700 : 400 }}>
                  {(b.rate * 100).toFixed(0)}%
                </td>
                <td style={{ padding: "0.5rem 0.75rem" }}>
                  {isActive && (
                    <span style={{ backgroundColor: "rgba(245,166,35,0.15)", color: "#F5A623", fontSize: "0.6875rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px", letterSpacing: "0.05em" }}>
                      YOUR BRACKET
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
          {/* Top bracket */}
          <tr style={{ backgroundColor: totalIncome > 1_817_000 ? "rgba(245,166,35,0.06)" : "transparent" }}>
            <td style={{ padding: "0.5rem 0.75rem", color: "#7A9BB5" }}>R1,817,001+</td>
            <td style={{ padding: "0.5rem 0.75rem", color: totalIncome > 1_817_000 ? "#F5A623" : "#7A9BB5", fontWeight: totalIncome > 1_817_000 ? 700 : 400 }}>45%</td>
            <td style={{ padding: "0.5rem 0.75rem" }}>
              {totalIncome > 1_817_000 && (
                <span style={{ backgroundColor: "rgba(245,166,35,0.15)", color: "#F5A623", fontSize: "0.6875rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "9999px" }}>YOUR BRACKET</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */

export default function SarsEstimatorClient() {
  const [monthlyIncome, setMonthlyIncome] = useState<number | "">(0);
  const [age, setAge] = useState<AgeBracket>("under65");
  const [isEmployed, setIsEmployed] = useState(false);
  const [annualSalary, setAnnualSalary] = useState<number | "">(0);
  const [showBrackets, setShowBrackets] = useState(false);

  const monthly = typeof monthlyIncome === "number" ? monthlyIncome : 0;
  const salary  = typeof annualSalary  === "number" ? annualSalary  : 0;

  const result = useMemo(
    () => calculateSarsTax(monthly, age, isEmployed ? salary : 0),
    [monthly, age, isEmployed, salary]
  );

  const hasData = monthly > 0;

  const threshold = THRESHOLDS[age];
  const monthlyThreshold = Math.round(threshold / 12);

  return (
    <div className="sars-layout">
      {/* ── LEFT: Form ──────────────────────────────────────────── */}
      <div>
        <div
          style={{
            backgroundColor: "#111D2C",
            border: "1px solid #1E3048",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <h3
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "#7A9BB5",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "0 0 1.25rem",
            }}
          >
            Your income details
          </h3>

          {/* Monthly freelance income */}
          <div style={{ marginBottom: "1.125rem" }}>
            <Label htmlFor="monthlyIncome">
              Monthly freelance / side hustle income
            </Label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.0625rem", color: "#F5A623", fontWeight: 700 }}>R</span>
              <input
                id="monthlyIncome"
                type="number"
                min={0}
                value={monthlyIncome === 0 ? "" : monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value === "" ? "" : Math.max(0, +e.target.value))}
                placeholder="e.g. 8 000"
                style={{ ...inputStyle, maxWidth: "220px" }}
                onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
              />
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>/ month</span>
            </div>
            <Hint>
              Income NOT deducted via PAYE — freelance, contract, side hustle. Tax year: 1 March 2025 – 28 February 2026.
            </Hint>
          </div>

          {/* Age bracket */}
          <div style={{ marginBottom: "1.125rem" }}>
            <Label htmlFor="age">Your age bracket</Label>
            <select
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value as AgeBracket)}
              style={{ ...inputStyle, maxWidth: "260px", cursor: "pointer", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237A9BB5' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", paddingRight: "2.25rem", appearance: "none" as const }}
              onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
              onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
            >
              <option value="under65">Under 65</option>
              <option value="age65to74">65 – 74 years</option>
              <option value="age75plus">75 years and older</option>
            </select>
            <Hint>
              Affects your tax rebate and income threshold. Under 65: threshold R{threshold.toLocaleString("en-ZA")}/year (R{monthlyThreshold.toLocaleString("en-ZA")}/month).
            </Hint>
          </div>

          {/* Employment toggle */}
          <div style={{ marginBottom: isEmployed ? "1.125rem" : 0 }}>
            <button
              type="button"
              onClick={() => setIsEmployed((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "24px",
                  borderRadius: "9999px",
                  backgroundColor: isEmployed ? "#F5A623" : "#1E3048",
                  position: "relative",
                  transition: "background-color 0.2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "3px",
                    left: isEmployed ? "21px" : "3px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "#FFFFFF" }}>
                I also have PAYE employment income
              </span>
            </button>
          </div>

          {/* Annual salary (conditional) */}
          {isEmployed && (
            <div>
              <Label htmlFor="annualSalary">
                Annual gross salary from employer (before deductions)
              </Label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.0625rem", color: "#F5A623", fontWeight: 700 }}>R</span>
                <input
                  id="annualSalary"
                  type="number"
                  min={0}
                  value={annualSalary === 0 ? "" : annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value === "" ? "" : Math.max(0, +e.target.value))}
                  placeholder="e.g. 240 000"
                  style={{ ...inputStyle, maxWidth: "220px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#F5A623")}
                  onBlur={(e)  => (e.target.style.borderColor = "#1E3048")}
                />
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>/ year</span>
              </div>
              <Hint>
                Your PAYE employer handles tax on this income. We use it to find the marginal rate that applies to your side hustle income.
              </Hint>
            </div>
          )}
        </div>

        {/* Show/hide brackets toggle */}
        <button
          type="button"
          onClick={() => setShowBrackets((v) => !v)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1px solid #1E3048", borderRadius: "8px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", padding: "0.5rem 0.875rem", cursor: "pointer", width: "100%", justifyContent: "center", transition: "border-color 0.2s, color 0.2s" }}
        >
          <Info size={14} />
          {showBrackets ? "Hide" : "Show"} 2025/26 SARS tax brackets
        </button>

        {showBrackets && (
          <div style={{ backgroundColor: "#111D2C", border: "1px solid #1E3048", borderRadius: "12px", padding: "1rem", marginTop: "0.75rem", overflow: "hidden" }}>
            <BracketTable totalIncome={result.totalAnnualIncome} />
            <div style={{ borderTop: "1px solid #1E3048", marginTop: "0.75rem", paddingTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5" }}>
                <strong style={{ color: "#FFFFFF" }}>Primary rebate:</strong> R{REBATES.primary.toLocaleString("en-ZA")}
              </span>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5" }}>
                <strong style={{ color: "#FFFFFF" }}>Secondary (65+):</strong> +R{REBATES.secondary.toLocaleString("en-ZA")}
              </span>
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5" }}>
                <strong style={{ color: "#FFFFFF" }}>Tertiary (75+):</strong> +R{REBATES.tertiary.toLocaleString("en-ZA")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Results ───────────────────────────────────────── */}
      <div className="sars-result-col">

        {/* ── Provisional Tax Registration ─────────────────────── */}
        <div
          style={{
            backgroundColor: result.provisionalRequired
              ? "rgba(239,68,68,0.07)"
              : "rgba(34,197,94,0.07)",
            border: `1px solid ${result.provisionalRequired ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.25)"}`,
            borderRadius: "14px",
            padding: "1.125rem 1.25rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.875rem",
          }}
        >
          {result.provisionalRequired ? (
            <AlertTriangle size={20} color="#EF4444" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
          ) : (
            <CheckCircle size={20} color="#22C55E" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
          )}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                color: result.provisionalRequired ? "#EF4444" : "#22C55E",
                margin: "0 0 0.25rem",
              }}
            >
              {result.provisionalRequired
                ? "Provisional tax registration required"
                : monthly === 0
                  ? "Enter your income above"
                  : "No provisional tax registration needed yet"}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.8125rem",
                color: "#7A9BB5",
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              {result.provisionalRequired
                ? `Your annual freelance income (${formatZAR(result.annualFreelanceIncome)}) exceeds the R${PROVISIONAL_THRESHOLD.toLocaleString("en-ZA")} provisional tax threshold. Register on SARS eFiling before your first payment is due.`
                : monthly > 0
                  ? `Your annual freelance income (${formatZAR(result.annualFreelanceIncome)}) is below the R${PROVISIONAL_THRESHOLD.toLocaleString("en-ZA")}/year threshold. Earn more than R${Math.round(PROVISIONAL_THRESHOLD / 12).toLocaleString("en-ZA")}/month and you'll need to register.`
                  : ""}
            </p>
          </div>
        </div>

        {/* ── Tax figures ──────────────────────────────────────── */}
        {hasData && (
          <>
            {/* Income + bracket row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <StatCard
                label="Annual freelance income"
                value={result.annualFreelanceIncome}
                color="#FFFFFF"
              />
              <div
                style={{
                  backgroundColor: "#111D2C",
                  border: "1px solid #1E3048",
                  borderRadius: "12px",
                  padding: "1.125rem 1.25rem",
                }}
              >
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#7A9BB5", letterSpacing: "0.07em", textTransform: "uppercase", margin: "0 0 0.35rem" }}>
                  Tax bracket
                </p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.625rem", color: "#F5A623", margin: "0 0 0.2rem", lineHeight: 1 }}>
                  {result.marginalRate.toFixed(0)}%
                </p>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>
                  marginal rate
                </p>
              </div>
            </div>

            {/* Tax breakdown */}
            <div
              style={{
                backgroundColor: "#111D2C",
                border: "1px solid #1E3048",
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "0.75rem",
              }}
            >
              {/* Gross tax row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.25rem", borderBottom: "1px solid #1E3048" }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#FFFFFF", margin: "0 0 0.125rem", fontWeight: 500 }}>Gross tax (before rebate)</p>
                  {result.aboveThreshold ? (
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>
                      Applied {result.marginalRate.toFixed(0)}% bracket
                    </p>
                  ) : (
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#22C55E", margin: 0 }}>
                      Below threshold — no tax
                    </p>
                  )}
                </div>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700, color: result.grossTax > 0 ? "#EF4444" : "#22C55E" }}>
                  {result.grossTax > 0 ? `−${formatZAR(Math.round(result.grossTax))}` : "R0"}
                </span>
              </div>

              {/* Rebate row (only when self-employed only) */}
              {!result.hasEmployment && result.rebate > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.25rem", borderBottom: "1px solid #1E3048" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#FFFFFF", margin: "0 0 0.125rem", fontWeight: 500 }}>Primary rebate (2025/26)</p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>Deducted from gross tax</p>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", fontWeight: 700, color: "#22C55E" }}>
                    +{formatZAR(result.rebate)}
                  </span>
                </div>
              )}

              {/* PAYE note */}
              {result.hasEmployment && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.25rem", borderBottom: "1px solid #1E3048" }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#FFFFFF", margin: "0 0 0.125rem", fontWeight: 500 }}>Rebate applied via PAYE</p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>Your employer uses this against your salary tax</p>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>—</span>
                </div>
              )}

              {/* Net tax — highlighted */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", backgroundColor: "rgba(239,68,68,0.06)" }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 0.125rem" }}>
                    Estimated tax owed to SARS
                  </p>
                  {result.effectiveTaxRate > 0 && (
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>
                      {result.effectiveTaxRate.toFixed(1)}% effective rate on freelance income
                    </p>
                  )}
                </div>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.375rem", color: result.netAnnualTax > 0 ? "#EF4444" : "#22C55E" }}>
                  {formatZAR(Math.round(result.netAnnualTax))}
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 400, fontSize: "0.8rem", color: "#7A9BB5" }}>/year</span>
                </span>
              </div>
            </div>

            {/* Monthly provision — gold, prominent */}
            <StatCard
              label="Set aside every month"
              value={Math.round(result.monthlyProvision)}
              sub={result.monthlyProvision === 0 ? "No tax due at this income level" : "Transfer this to a separate savings account today"}
              color={result.monthlyProvision > 0 ? "#F5A623" : "#22C55E"}
              highlighted={result.monthlyProvision > 0}
            />

            {/* ── Provisional payment schedule ────────────────── */}
            {result.provisionalRequired && result.netAnnualTax > 0 && (
              <div style={{ marginTop: "0.75rem" }}>
                <h4
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "#7A9BB5",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    margin: "0 0 0.75rem",
                  }}
                >
                  Provisional tax payment schedule
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                  {/* First payment: August */}
                  <div
                    style={{
                      backgroundColor: "#111D2C",
                      border: "1px solid #1E3048",
                      borderRadius: "12px",
                      padding: "1rem 1.125rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <Calendar size={14} color="#7A9BB5" strokeWidth={1.75} />
                      <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#7A9BB5", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        1st Payment
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.1875rem", color: "#F5A623", margin: "0 0 0.25rem" }}>
                      {formatZAR(Math.round(result.firstPayment))}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>
                      Due <strong style={{ color: "#FFFFFF" }}>31 August 2025</strong>
                    </p>
                  </div>

                  {/* Second payment: February */}
                  <div
                    style={{
                      backgroundColor: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "12px",
                      padding: "1rem 1.125rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <Calendar size={14} color="#EF4444" strokeWidth={1.75} />
                      <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#EF4444", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        2nd Payment
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.1875rem", color: "#EF4444", margin: "0 0 0.25rem" }}>
                      {formatZAR(Math.round(result.secondPayment))}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: 0 }}>
                      Due <strong style={{ color: "#EF4444" }}>28 February 2026</strong>
                    </p>
                  </div>
                </div>

                {/* ── February Surprise Warning ──────────────────── */}
                <div
                  style={{
                    backgroundColor: "rgba(239,68,68,0.08)",
                    border: "1.5px solid rgba(239,68,68,0.4)",
                    borderRadius: "14px",
                    padding: "1.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <AlertTriangle size={20} color="#EF4444" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: "#EF4444",
                          margin: "0 0 0.5rem",
                        }}
                      >
                        Don&apos;t get surprised in February
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                          fontSize: "0.875rem",
                          color: "#7A9BB5",
                          margin: "0 0 0.625rem",
                          lineHeight: 1.6,
                        }}
                      >
                        <strong style={{ color: "#FFFFFF" }}>28 February</strong> is when your second provisional tax payment is due — and it&apos;s the bill that catches most SA freelancers off guard. By then, the money has already been spent.
                      </p>
                      <div
                        style={{
                          backgroundColor: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: "8px",
                          padding: "0.75rem 1rem",
                        }}
                      >
                        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#FFFFFF", margin: "0 0 0.25rem", fontWeight: 600 }}>
                          The fix: save <span style={{ color: "#F5A623" }}>{formatZAR(Math.round(result.monthlyProvision))}</span> every single month.
                        </p>
                        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", margin: 0 }}>
                          Open a separate savings account and transfer this amount the day you get paid. Never touch it.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── No provisional tax needed — threshold note ──── */}
            {!result.provisionalRequired && monthly > 0 && (
              <div
                style={{
                  backgroundColor: "rgba(34,197,94,0.05)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: "12px",
                  padding: "1rem 1.125rem",
                  marginTop: "0.75rem",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                }}
              >
                <CheckCircle size={16} color="#22C55E" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#22C55E", margin: "0 0 0.25rem", fontWeight: 600 }}>
                    Below the provisional tax threshold
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", margin: 0, lineHeight: 1.55 }}>
                    Your freelance income is under R{PROVISIONAL_THRESHOLD.toLocaleString("en-ZA")}/year — no provisional tax obligation. Keep this in mind as your income grows.
                  </p>
                </div>
              </div>
            )}

            {/* ── Disclaimer ────────────────────────────────────── */}
            <div
              style={{
                backgroundColor: "rgba(122,155,181,0.06)",
                border: "1px solid #1E3048",
                borderRadius: "10px",
                padding: "1rem 1.125rem",
                display: "flex",
                gap: "0.625rem",
                alignItems: "flex-start",
                marginBottom: "1.25rem",
              }}
            >
              <TrendingDown size={15} color="#7A9BB5" strokeWidth={1.75} style={{ flexShrink: 0, marginTop: "2px" }} />
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8125rem",
                  color: "#7A9BB5",
                  margin: 0,
                  lineHeight: 1.65,
                }}
              >
                <strong style={{ color: "#EF4444" }}>Disclaimer:</strong> This is a simplified estimate for planning purposes only, based on published 2025/2026 SARS tables. It does not account for deductible expenses, medical aid credits, retirement annuity contributions, or other tax adjustments. Consult a{" "}
                <strong style={{ color: "#FFFFFF" }}>registered tax practitioner</strong> for an accurate assessment.
              </p>
            </div>
          </>
        )}

        {/* ── Empty state ─────────────────────────────────────── */}
        {!hasData && (
          <div
            style={{
              backgroundColor: "#111D2C",
              border: "1px dashed #1E3048",
              borderRadius: "14px",
              padding: "3rem 2rem",
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#7A9BB5", margin: 0 }}>
              Enter your monthly freelance income above to see your tax estimate.
            </p>
          </div>
        )}

        {/* ── Email Capture ────────────────────────────────────── */}
        <EmailCapture
          tipSheet="The 5 SARS Tax Mistakes SA Freelancers Make — And How to Avoid Them"
          pairedProduct="SARS Tax Guide — R147"
          payhipLink={PAYHIP_LINKS.sarsGuide}
        />

        {/* ── CTA ─────────────────────────────────────────────── */}
        <div
          style={{
            backgroundColor: "#111D2C",
            border: "1px solid #1E3048",
            borderRadius: "14px",
            padding: "1.5rem",
            textAlign: "center",
            marginTop: "1.25rem",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9375rem",
              color: "#7A9BB5",
              margin: "0 0 1rem",
              lineHeight: 1.6,
            }}
          >
            Want to know exactly how to register for provisional tax, claim your deductible expenses, and never get a SARS penalty?
          </p>
          <a
            href={PAYHIP_LINKS.sarsGuide}
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
              padding: "0.75rem 1.75rem",
              borderRadius: "9999px",
              textDecoration: "none",
            }}
          >
            <strong>Get the SARS Tax Guide — R147</strong>
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <style>{`
        .sars-layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        .sars-result-col {
          position: sticky;
          top: 80px;
        }
        @media (max-width: 1024px) {
          .sars-layout { grid-template-columns: 1fr; }
          .sars-result-col { position: static; }
        }
      `}</style>
    </div>
  );
}
