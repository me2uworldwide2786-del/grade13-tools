"use client";

import { useState, useMemo } from "react";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";
import { hustleTypes, calculateIncome } from "@/lib/calculator-data";
import type { HustleType } from "@/lib/calculator-data";

export default function IncomeCalculatorClient() {
  /* ── Form state ─────────────────────────────────────────────────── */
  const [selectedHustle, setSelectedHustle] = useState<HustleType | null>(null);
  const [hoursPerWeek,    setHoursPerWeek]   = useState(10);
  const [rate,            setRate]           = useState(0);
  const [unitsPerHour,    setUnitsPerHour]   = useState(2);
  const [activeLeakIds,   setActiveLeakIds]  = useState<string[]>([]);
  const [materialsCost,   setMaterialsCost]  = useState(0);
  const [platformFee,     setPlatformFee]    = useState(0);

  /* ── Hustle selection ───────────────────────────────────────────── */
  function handleHustleSelect(hustle: HustleType) {
    setSelectedHustle(hustle);
    setRate(hustle.defaultRate);
    setUnitsPerHour(hustle.defaultUnitsPerHour);
    // Reset leaks on hustle change
    setActiveLeakIds([]);
    setMaterialsCost(0);
    setPlatformFee(0);
  }

  /* ── Leak toggle ────────────────────────────────────────────────── */
  function handleToggleLeak(id: string) {
    setActiveLeakIds((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  }

  /* ── Live calculation (derived, no useEffect needed) ───────────── */
  const hasInputs = selectedHustle !== null && rate > 0 && hoursPerWeek > 0;

  const result = useMemo(() => {
    if (!selectedHustle) {
      return calculateIncome({
        hustleId: "other", hoursPerWeek: 0, rate: 0, rateType: "hourly",
        unitsPerHour: 1, activeLeakIds: [], materialsCost: 0, platformFeePercent: 0,
      });
    }
    return calculateIncome({
      hustleId:          selectedHustle.id,
      hoursPerWeek,
      rate,
      rateType:          selectedHustle.rateType,
      unitsPerHour,
      activeLeakIds,
      materialsCost,
      platformFeePercent: platformFee,
    });
  }, [selectedHustle, hoursPerWeek, rate, unitsPerHour, activeLeakIds, materialsCost, platformFee]);

  return (
    <div className="calc-layout">
      {/* Left — form */}
      <div className="calc-form-col">
        <CalculatorForm
          selectedHustle={selectedHustle}
          hoursPerWeek={hoursPerWeek}
          rate={rate}
          unitsPerHour={unitsPerHour}
          activeLeakIds={activeLeakIds}
          materialsCost={materialsCost}
          platformFeePercent={platformFee}
          onHustleSelect={handleHustleSelect}
          onHoursChange={setHoursPerWeek}
          onRateChange={setRate}
          onUnitsPerHourChange={setUnitsPerHour}
          onToggleLeak={handleToggleLeak}
          onMaterialsCostChange={setMaterialsCost}
          onPlatformFeeChange={setPlatformFee}
        />
      </div>

      {/* Right — live results */}
      <div className="calc-result-col">
        <CalculatorResult
          result={result}
          hustleUnit={selectedHustle?.unit ?? "per unit"}
          hasInputs={hasInputs}
        />
      </div>

      <style>{`
        .calc-layout {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 2.5rem;
          align-items: start;
        }
        .calc-result-col {
          position: sticky;
          top: 80px;
        }
        @media (max-width: 1024px) {
          .calc-layout {
            grid-template-columns: 1fr;
          }
          .calc-result-col {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
