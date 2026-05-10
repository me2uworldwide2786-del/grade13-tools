"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, DollarSign, RefreshCw } from "lucide-react";
import EmailCapture from "@/components/layout/EmailCapture";
import { PAYHIP_LINKS, formatZAR } from "@/lib/utils";
import {
  SKILL_RATES,
  DEFAULT_USD_ZAR,
  SA_BENCHMARKS,
  calculateUsdEarnings,
  type SkillRate,
} from "@/lib/usd-data";

/* ── Animated number ─────────────────────────────────────────────── */

function useAnimatedNumber(target: number, duration = 550): number {
  const [display, setDisplay] = useState(target);
  const fromRef  = useRef(target);
  const frameRef = useRef<number | null>(null);
  const reduce   = useReducedMotion();

  useEffect(() => {
    if (reduce) { setDisplay(target); fromRef.current = target; return; }
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
  }, [target, duration, reduce]);

  return display;
}

/* ── Shared input style ──────────────────────────────────────────── */

const inputStyle: React.CSSProperties = {
  backgroundColor: "#162236",
  border: "1px solid #1E3048",
  borderRadius: "8px",
  padding: "0.5625rem 1rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.9375rem",
  color: "#FFFFFF",
  outline: "none",
  boxSizing: "border-box",
};

function focusGold(e: React.FocusEvent<HTMLInputElement>) {
  e.target.style.borderColor = "#F5A623";
}
function blurGold(e: React.FocusEvent<HTMLInputElement>) {
  e.target.style.borderColor = "#1E3048";
}

function Label({ children, htmlFor }: { children: string; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} style={{ display: "block", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.375rem" }}>
      {children}
    </label>
  );
}

/* ── Rate range bar ──────────────────────────────────────────────── */

function RateRangeBar({ skill, usdRate }: { skill: SkillRate; usdRate: number }) {
  const max   = skill.experienced * 1.1;
  const clamp = (v: number) => Math.min(Math.max(v, 0), 100);
  const pctBeg = clamp((skill.beginner  / max) * 100);
  const pctMid = clamp((skill.mid       / max) * 100);
  const pctExp = clamp((skill.experienced / max) * 100);
  const pctCur = clamp((usdRate          / max) * 100);

  return (
    <div style={{ marginTop: "0.5rem" }}>
      {/* Bar */}
      <div style={{ position: "relative", height: "8px", backgroundColor: "#1E3048", borderRadius: "9999px", marginBottom: "0.375rem" }}>
        {/* Beginner → experienced fill */}
        <div style={{ position: "absolute", left: `${pctBeg}%`, width: `${pctExp - pctBeg}%`, height: "100%", backgroundColor: "rgba(245,166,35,0.25)", borderRadius: "9999px" }} />
        {/* Current rate dot */}
        <div style={{ position: "absolute", left: `${pctCur}%`, top: "50%", transform: "translate(-50%, -50%)", width: "14px", height: "14px", backgroundColor: "#F5A623", borderRadius: "50%", border: "2px solid #0D1B2A", zIndex: 2, transition: "left 0.3s ease" }} />
      </div>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.6875rem", color: "#7A9BB5" }}>
        <span>Beginner <strong style={{ color: "#7A9BB5" }}>${skill.beginner}</strong></span>
        <span>Mid <strong style={{ color: "#7A9BB5" }}>${skill.mid}</strong></span>
        <span>Experienced <strong style={{ color: "#7A9BB5" }}>${skill.experienced}</strong></span>
      </div>
    </div>
  );
}

/* ── Mind-blow line builder ──────────────────────────────────────── */

function getMindBlowLine(
  hours: number,
  usdRate: number,
  monthlyZar: number,
  monthsMinWage: number,
  vsAvg: number
): string {
  if (hours <= 0 || usdRate <= 0) return "";

  if (vsAvg >= 200) {
    return `That's ${(vsAvg / 100).toFixed(1)}× the average SA salary — working remotely.`;
  }
  if (vsAvg >= 100) {
    return `That's more than the average South African salary — working your own hours.`;
  }
  if (monthsMinWage >= 2) {
    return `Equivalent to ${monthsMinWage.toFixed(1)}× the SA minimum wage — from international clients.`;
  }
  if (monthsMinWage >= 1) {
    return `Already above the SA minimum monthly wage — and you're just getting started.`;
  }
  return `${hours}hrs/week × $${usdRate}/hr = ${formatZAR(Math.round(monthlyZar))}/month into your SA bank account.`;
}

/* ── Main component ──────────────────────────────────────────────── */

export default function UsdCalculatorClient() {
  const [selectedSkill, setSelectedSkill] = useState<SkillRate | null>(null);
  const [usdRate,       setUsdRate]       = useState<number | "">(0);
  const [hoursPerWeek,  setHoursPerWeek]  = useState<number | "">(10);
  const [exchangeRate,  setExchangeRate]  = useState(DEFAULT_USD_ZAR);
  const [editingRate,   setEditingRate]   = useState(false);

  const rate  = typeof usdRate      === "number" ? usdRate      : 0;
  const hours = typeof hoursPerWeek === "number" ? hoursPerWeek : 0;
  const hasData = selectedSkill !== null && rate > 0 && hours > 0;

  const result = useMemo(
    () => calculateUsdEarnings(rate, hours, exchangeRate),
    [rate, hours, exchangeRate]
  );

  /* Animated values */
  const displayMonthlyZar = useAnimatedNumber(Math.round(result.monthlyZar));
  const displayMonthlyUsd = useAnimatedNumber(Math.round(result.monthlyUsd));
  const displayAnnualZar  = useAnimatedNumber(Math.round(result.annualZar));

  function handleSkillSelect(skill: SkillRate) {
    setSelectedSkill(skill);
    setUsdRate(skill.suggested);
  }

  const mindBlowLine = getMindBlowLine(hours, rate, result.monthlyZar, result.monthsOfMinWage, result.vsAverageSalaryPct);

  return (
    <div className="usd-layout">

      {/* ── LEFT: Form ───────────────────────────────────────────── */}
      <div>

        {/* Step 1 — Skill selector */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#7A9BB5", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 0.875rem" }}>
            Step 1 — What do you do?
          </h3>
          <div className="skill-grid">
            {SKILL_RATES.map((skill) => {
              const isSelected = selectedSkill?.label === skill.label;
              const { Icon } = skill;
              return (
                <button
                  key={skill.label}
                  type="button"
                  onClick={() => handleSkillSelect(skill)}
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
                    textAlign: "center",
                    transition: "border-color 0.2s, background-color 0.15s",
                  }}
                  className={isSelected ? "" : "skill-card-btn"}
                >
                  <div style={{ width: "36px", height: "36px", backgroundColor: isSelected ? "rgba(245,166,35,0.15)" : "rgba(245,166,35,0.08)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color="#F5A623" strokeWidth={1.75} />
                  </div>
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: isSelected ? 600 : 400, color: isSelected ? "#FFFFFF" : "#7A9BB5", lineHeight: 1.3 }}>
                    {skill.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 — Rate + hours (visible after skill selected) */}
        {selectedSkill && (
          <div style={{ backgroundColor: "#111D2C", border: "1px solid #1E3048", borderRadius: "14px", padding: "1.375rem", marginBottom: "1.25rem" }}>
            <h3 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#7A9BB5", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 1.125rem" }}>
              Step 2 — Your numbers
            </h3>

            {/* Skill context */}
            <div style={{ backgroundColor: "#162236", borderRadius: "10px", padding: "0.875rem 1rem", marginBottom: "1.125rem", border: "1px solid #1E3048" }}>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", margin: "0 0 0.25rem" }}>
                {selectedSkill.pitch}
              </p>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#3a4a5a", margin: 0 }}>
                Platforms: <strong style={{ color: "#7A9BB5" }}>{selectedSkill.platforms}</strong>
              </p>
            </div>

            {/* USD rate input + range bar */}
            <div style={{ marginBottom: "1.125rem" }}>
              <Label htmlFor="usdRate">Your USD hourly rate</Label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1.0625rem", color: "#22C55E", fontWeight: 700 }}>$</span>
                <input
                  id="usdRate"
                  type="number"
                  min={1}
                  value={usdRate === 0 ? "" : usdRate}
                  onChange={(e) => setUsdRate(e.target.value === "" ? "" : Math.max(0, +e.target.value))}
                  placeholder={String(selectedSkill.suggested)}
                  style={{ ...inputStyle, maxWidth: "140px" }}
                  onFocus={focusGold}
                  onBlur={blurGold}
                />
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>/ hour</span>
              </div>
              <RateRangeBar skill={selectedSkill} usdRate={rate} />
            </div>

            {/* Hours per week */}
            <div>
              <Label htmlFor="hoursPerWeek">Hours available per week</Label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  id="hoursPerWeek"
                  type="number"
                  min={1}
                  max={80}
                  value={hoursPerWeek === 0 ? "" : hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value === "" ? "" : Math.max(0, +e.target.value))}
                  placeholder="10"
                  style={{ ...inputStyle, maxWidth: "120px" }}
                  onFocus={focusGold}
                  onBlur={blurGold}
                />
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>hrs / week</span>
              </div>
            </div>
          </div>
        )}

        {/* Exchange rate editor */}
        <div style={{ backgroundColor: "#111D2C", border: "1px solid #1E3048", borderRadius: "12px", padding: "1rem 1.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", fontWeight: 600, color: "#7A9BB5", margin: "0 0 0.125rem" }}>
                USD → ZAR exchange rate
              </p>
              {!editingRate && (
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.25rem", color: "#FFFFFF", margin: 0 }}>
                  R{exchangeRate.toFixed(2)} per $1
                </p>
              )}
            </div>
            {!editingRate ? (
              <button
                type="button"
                onClick={() => setEditingRate(true)}
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "1px solid #1E3048", borderRadius: "9999px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", padding: "0.3rem 0.875rem", cursor: "pointer" }}
              >
                <RefreshCw size={11} /> Update rate
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5" }}>R</span>
                <input
                  type="number"
                  step={0.01}
                  min={1}
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(+e.target.value || DEFAULT_USD_ZAR)}
                  style={{ ...inputStyle, maxWidth: "90px", fontSize: "0.875rem" }}
                  autoFocus
                  onFocus={focusGold}
                  onBlur={(e) => { blurGold(e); setEditingRate(false); }}
                />
                <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8rem", color: "#7A9BB5" }}>/$</span>
              </div>
            )}
          </div>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#3a4a5a", margin: "0.5rem 0 0" }}>
            Default: R{DEFAULT_USD_ZAR} — check <strong style={{ color: "#7A9BB5" }}>Google Finance</strong> for today&apos;s rate and update above.
          </p>
        </div>
      </div>

      {/* ── RIGHT: Results ───────────────────────────────────────── */}
      <div className="usd-result-col">

        {/* ── MIND-BLOW moment — always shown ─────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(245,166,35,0.12) 0%, rgba(245,166,35,0.04) 100%)",
            border: "1.5px solid rgba(245,166,35,0.4)",
            borderRadius: "18px",
            padding: "1.875rem 1.625rem",
            marginBottom: "1rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,166,35,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Sparkles size={16} color="#F5A623" strokeWidth={1.75} />
              <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#F5A623", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Your monthly ZAR income
              </span>
              <Sparkles size={16} color="#F5A623" strokeWidth={1.75} />
            </div>

            {hasData ? (
              <>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 3.5rem)", color: "#F5A623", lineHeight: 1, marginBottom: "0.5rem" }}>
                  R{displayMonthlyZar.toLocaleString("en-ZA")}
                </div>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem", color: "#7A9BB5", marginBottom: "1.25rem" }}>
                  from{" "}
                  <strong style={{ color: "#22C55E", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem" }}>
                    ${displayMonthlyUsd.toLocaleString("en-ZA")}
                  </strong>
                  {" "}USD/month
                </div>

                {/* The equation line */}
                <div
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.9375rem",
                    color: "#FFFFFF",
                    marginBottom: "1rem",
                  }}
                >
                  <strong>{hours}</strong> hrs/week × <strong style={{ color: "#22C55E" }}>${rate}/hr</strong> ×{" "}
                  <strong>4.33 weeks</strong> × <strong>R{exchangeRate}</strong> = <strong style={{ color: "#F5A623" }}>R{Math.round(result.monthlyZar).toLocaleString("en-ZA")}</strong>
                </div>

                {/* Mind-blow line */}
                {mindBlowLine && (
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#FFFFFF", fontStyle: "italic", margin: 0, lineHeight: 1.5 }}>
                    &ldquo;{mindBlowLine}&rdquo;
                  </p>
                )}
              </>
            ) : (
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "2.5rem", color: "rgba(245,166,35,0.3)", lineHeight: 1, marginBottom: "0.75rem" }}>
                  R———
                </div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#7A9BB5", margin: 0 }}>
                  Select a skill and fill in your rate to see the maths.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Income breakdown cards ────────────────────────────── */}
        {hasData && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem", marginBottom: "1rem" }}>
              {[
                { label: "Weekly",  usd: Math.round(result.weeklyUsd),  zar: Math.round(result.weeklyZar)  },
                { label: "Monthly", usd: Math.round(result.monthlyUsd), zar: Math.round(result.monthlyZar) },
                { label: "Annual",  usd: Math.round(result.annualUsd),  zar: Math.round(result.annualZar)  },
              ].map(({ label, usd, zar }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: "#111D2C",
                    border: "1px solid #1E3048",
                    borderRadius: "10px",
                    padding: "0.875rem 0.75rem",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#7A9BB5", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 0.375rem" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: "1.0625rem", color: "#22C55E", margin: "0 0 0.2rem", lineHeight: 1 }}>
                    ${usd.toLocaleString("en-ZA")}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#F5A623", margin: 0 }}>
                    R{zar.toLocaleString("en-ZA")}
                  </p>
                </div>
              ))}
            </div>

            {/* ── ZAR per hour ─────────────────────────────────── */}
            <div
              style={{
                backgroundColor: "#111D2C",
                border: "1px solid #1E3048",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <TrendingUp size={16} color="#F5A623" strokeWidth={1.75} />
                <div>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", margin: 0 }}>
                    Effective ZAR hourly rate
                  </p>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#3a4a5a", margin: 0 }}>
                    At R{exchangeRate}/$ exchange rate
                  </p>
                </div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.375rem", color: "#F5A623" }}>
                R{Math.round(result.zarPerHour).toLocaleString("en-ZA")}/hr
              </div>
            </div>

            {/* ── SA Comparisons ───────────────────────────────── */}
            <div style={{ marginBottom: "1rem" }}>
              <h4 style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", color: "#7A9BB5", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>
                What this looks like in SA context
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  {
                    label: "vs SA minimum wage",
                    value: result.monthsOfMinWage,
                    suffix: "× minimum wage",
                    sub: `SA min: ${formatZAR(SA_BENCHMARKS.minimumWageMonthly)}/month`,
                    positive: result.monthsOfMinWage >= 1,
                  },
                  {
                    label: "vs average SA salary",
                    value: result.vsAverageSalaryPct / 100,
                    suffix: "× average salary",
                    sub: `Average: ${formatZAR(SA_BENCHMARKS.averageSalaryMonthly)}/month`,
                    positive: result.vsAverageSalaryPct >= 100,
                  },
                  {
                    label: "months of Cape Town rent",
                    value: result.monthsOfCapeRent,
                    suffix: "months rent",
                    sub: `1-bed Cape Town avg: ${formatZAR(SA_BENCHMARKS.capeRent1Bed)}/month`,
                    positive: result.monthsOfCapeRent >= 1,
                  },
                ].map(({ label, value, suffix, sub, positive }) => (
                  <div
                    key={label}
                    style={{
                      backgroundColor: "#111D2C",
                      border: "1px solid #1E3048",
                      borderRadius: "10px",
                      padding: "0.75rem 1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#FFFFFF", margin: "0 0 0.125rem", fontWeight: 500 }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.725rem", color: "#7A9BB5", margin: 0 }}>
                        {sub}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontWeight: 900,
                          fontSize: "1.125rem",
                          color: positive ? "#22C55E" : "#7A9BB5",
                          margin: "0 0 0.1rem",
                          lineHeight: 1,
                        }}
                      >
                        {value.toFixed(1)}×
                      </p>
                      <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.7rem", color: "#7A9BB5", margin: 0 }}>
                        {suffix}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual ZAR */}
            <div
              style={{
                backgroundColor: "rgba(34,197,94,0.05)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "12px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <DollarSign size={16} color="#22C55E" strokeWidth={1.75} />
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5", margin: 0 }}>
                  Annual ZAR (if consistent)
                </p>
              </div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "1.25rem", color: "#22C55E" }}>
                R{displayAnnualZar.toLocaleString("en-ZA")}
              </div>
            </div>
          </>
        )}

        {/* ── EmailCapture ─────────────────────────────────────── */}
        <EmailCapture
          tipSheet="The 5 Platforms SA Freelancers Use to Land Their First USD Client"
          pairedProduct="Earning in USD from SA — R197"
          payhipLink={PAYHIP_LINKS.usdEarning}
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
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#7A9BB5", margin: "0 0 0.375rem", lineHeight: 1.6 }}>
            Ready to actually land international clients?
          </p>
          <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", color: "#7A9BB5", margin: "0 0 1.125rem", lineHeight: 1.6 }}>
            The <strong style={{ color: "#FFFFFF" }}>Earning in USD from SA</strong> guide covers: which platforms to use, how to set your rate, how to get paid without losing money on fees, and how to handle SARS for foreign income.
          </p>
          <a
            href={PAYHIP_LINKS.usdEarning}
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
            <strong>Get the Guide — R197</strong>
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <style>{`
        .usd-layout {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 2.5rem;
          align-items: start;
        }
        .usd-result-col {
          position: sticky;
          top: 80px;
        }
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.625rem;
        }
        .skill-card-btn:hover {
          border-color: rgba(245,166,35,0.45) !important;
          background-color: rgba(245,166,35,0.04) !important;
        }
        @media (max-width: 1100px) {
          .usd-layout { grid-template-columns: 1fr; }
          .usd-result-col { position: static; }
        }
        @media (max-width: 700px) {
          .skill-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 460px) {
          .skill-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
