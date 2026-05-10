"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowRight } from "lucide-react";
import EmailCapture from "@/components/layout/EmailCapture";
import { PAYHIP_LINKS, formatZAR } from "@/lib/utils";
import type { CalculationResult, GoalReversalRow } from "@/lib/calculator-data";

interface CalculatorResultProps {
  result: CalculationResult;
  hustleUnit: string;
  hasInputs: boolean;
}

/* ── Animated number hook ─────────────────────────────────────────── */

function useAnimatedNumber(target: number, duration = 500): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) {
      setDisplay(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    if (from === target) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setDisplay(Math.round(from + (target - from) * ease));
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, shouldReduce]);

  return display;
}

/* ── Result card component ────────────────────────────────────────── */

function ResultCard({
  label,
  value,
  sublabel,
  valueColor,
  icon,
  note,
  breakdown,
}: {
  label: string;
  value: number;
  sublabel?: string;
  valueColor: string;
  icon: React.ReactNode;
  note?: string;
  breakdown?: { label: string; amount: number }[];
}) {
  const displayed = useAnimatedNumber(value);

  return (
    <div
      style={{
        backgroundColor: "#111D2C",
        border: "1px solid #1E3048",
        borderRadius: "14px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
        {icon}
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#7A9BB5",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontSize: "1.875rem",
          color: valueColor,
          lineHeight: 1,
        }}
      >
        {value < 0 ? "−" : ""}R{Math.abs(displayed).toLocaleString("en-ZA")}
      </div>

      {sublabel && (
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.75rem",
            color: "#7A9BB5",
          }}
        >
          {sublabel}
        </span>
      )}

      {note && (
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.75rem",
            color: "#7A9BB5",
            margin: "0.375rem 0 0",
            lineHeight: 1.5,
          }}
        >
          {note}
        </p>
      )}

      {breakdown && breakdown.length > 0 && (
        <ul style={{ listStyle: "none", margin: "0.625rem 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {breakdown.map((item) => (
            <li
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.8125rem",
                color: "#7A9BB5",
              }}
            >
              <span>{item.label}</span>
              <span style={{ color: "#EF4444" }}>−{formatZAR(item.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Goal reversal row ───────────────────────────────────────────── */

function GoalRow({ row, unit }: { row: GoalReversalRow; unit: string }) {
  return (
    <div
      style={{
        backgroundColor: "#162236",
        border: "1px solid #1E3048",
        borderRadius: "12px",
        padding: "1.125rem 1.25rem",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: "1.0625rem",
          color: "#F5A623",
          marginBottom: "0.625rem",
        }}
      >
        To earn {formatZAR(row.target)}/month net:
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.9rem",
            color: "#FFFFFF",
          }}
        >
          <ArrowRight size={14} color="#F5A623" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "3px" }} />
          <span>
            <strong>{row.hoursNeeded > 0 ? row.hoursNeeded : "—"}</strong>{" "}
            hours per week at your current rate
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            paddingLeft: "1.5rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A9BB5",
          }}
        >
          — or —
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.9rem",
            color: "#FFFFFF",
          }}
        >
          <ArrowRight size={14} color="#F5A623" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "3px" }} />
          <span>
            Charge{" "}
            <strong>
              {row.rateNeeded > 0 ? formatZAR(row.rateNeeded) : "—"}
            </strong>{" "}
            {unit} at your current hours
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main exported component ─────────────────────────────────────── */

export default function CalculatorResult({
  result,
  hustleUnit,
  hasInputs,
}: CalculatorResultProps) {
  const netIsPositive = result.monthlyNet >= 0;
  // Hook must be called unconditionally — before any early returns
  const displayedNet = useDisplayNet(result.monthlyNet);

  if (!hasInputs) {
    return (
      <div
        style={{
          backgroundColor: "#111D2C",
          border: "1px dashed #1E3048",
          borderRadius: "16px",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.9375rem",
            color: "#7A9BB5",
            margin: 0,
          }}
        >
          Select a hustle type and fill in your hours + rate to see your projections.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* ── 4 result cards ──────────────────────────────────── */}
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
          Your monthly projections
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Card 1: Monthly Gross */}
          <ResultCard
            label="Your Monthly Gross"
            value={Math.round(result.monthlyGross)}
            sublabel={`R${Math.round(result.weeklyGross).toLocaleString("en-ZA")} / week  ·  R${Math.round(result.annualGross).toLocaleString("en-ZA")} / year`}
            valueColor="#F5A623"
            icon={<TrendingUp size={15} color="#F5A623" strokeWidth={2} />}
          />

          {/* Card 2: Profit Leaks */}
          <ResultCard
            label="Estimated Profit Leaks"
            value={Math.round(result.leakTotal)}
            sublabel={result.leakTotal === 0 ? "No leaks added yet — tick any that apply" : undefined}
            valueColor="#EF4444"
            icon={<TrendingDown size={15} color="#EF4444" strokeWidth={2} />}
            breakdown={result.leakBreakdown}
          />

          {/* Card 3: SARS Tax */}
          <ResultCard
            label="Estimated SARS Tax"
            value={Math.round(result.monthlyTax)}
            sublabel={result.monthlyTax === 0 ? "Below R95,750/year threshold — no tax due" : "Simplified first-bracket estimate"}
            valueColor="#EF4444"
            icon={<AlertTriangle size={15} color="#EF4444" strokeWidth={2} />}
            note={result.monthlyTax > 0 ? "Don't ignore this — it's real. Set aside this amount every month." : undefined}
          />

          {/* Card 4: Monthly Net */}
          <div
            style={{
              backgroundColor: netIsPositive ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
              border: `1px solid ${netIsPositive ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              borderRadius: "14px",
              padding: "1.25rem 1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: netIsPositive ? "#22C55E" : "#EF4444",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                ✔ What You Actually Keep
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 900,
                fontSize: "2.25rem",
                color: netIsPositive ? "#22C55E" : "#EF4444",
                lineHeight: 1,
              }}
            >
              {result.monthlyNet < 0 ? "−" : ""}R
              {Math.abs(displayedNet).toLocaleString("en-ZA")}
            </div>
            <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5" }}>
              per month after all costs and tax
            </span>
            {!netIsPositive && (
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#EF4444", margin: "0.5rem 0 0" }}>
                Your costs exceed your income. Lower expenses or increase your rate/hours.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Goal Reversal Section ──────────────────────────── */}
      <div>
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "1.125rem",
            color: "#FFFFFF",
            margin: "0 0 0.375rem",
          }}
        >
          What would it take to hit your goal?
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A9BB5",
            margin: "0 0 0.875rem",
          }}
        >
          Based on your current rate and costs — here&apos;s the maths for R5k, R10k, and R20k/month.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {result.goalReversal.map((row) => (
            <GoalRow key={row.target} row={row} unit={hustleUnit} />
          ))}
        </div>
      </div>

      {/* ── SARS Disclaimer ───────────────────────────────── */}
      <div
        style={{
          backgroundColor: "rgba(239,68,68,0.05)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: "10px",
          padding: "1rem 1.125rem",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}
      >
        <AlertTriangle size={16} color="#EF4444" strokeWidth={2} style={{ flexShrink: 0, marginTop: "2px" }} />
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A9BB5",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "#EF4444" }}>Disclaimer:</strong> This is an estimate for
          planning purposes only. Tax calculations are simplified and may not reflect your actual
          SARS liability. Consult a registered tax practitioner for accurate tax advice.
        </p>
      </div>

      {/* ── EmailCapture + CTA ────────────────────────────── */}
      <EmailCapture
        tipSheet="The 5 Side Hustle Mistakes That Kill Your Profit Before You Even Start"
        pairedProduct="Side Hustle Starter Pack — R197"
        payhipLink={PAYHIP_LINKS.sideHustlePack}
      />

      <div
        style={{
          backgroundColor: "#111D2C",
          border: "1px solid #1E3048",
          borderRadius: "14px",
          padding: "1.5rem",
          textAlign: "center",
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
          Ready to build this side hustle for real?{" "}
          <strong style={{ color: "#FFFFFF" }}>The Side Hustle Starter Pack</strong> gives you the
          step-by-step playbook — pricing, finding clients, managing money, and scaling.
        </p>
        <a
          href={PAYHIP_LINKS.sideHustlePack}
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
          <strong>Get the Side Hustle Starter Pack — R197</strong>
          <ArrowRight size={15} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

/* Small hook to animate the net value used inline in Card 4 */
function useDisplayNet(value: number) {
  const [d, setD] = useState(value);
  const fromRef = useRef(value);
  const frameRef = useRef<number | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) { setD(value); fromRef.current = value; return; }
    const from = fromRef.current;
    if (from === value) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 500, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setD(Math.round(from + (value - from) * ease));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value, shouldReduce]);

  return d;
}
