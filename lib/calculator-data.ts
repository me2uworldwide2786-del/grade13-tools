import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ChefHat,
  ShoppingBag,
  Scissors,
  Palette,
  Camera,
  PenLine,
  Smartphone,
  Sparkles,
  Truck,
  Code2,
  Plus,
} from "lucide-react";

export type RateType = "hourly" | "per_unit";

export interface HustleType {
  id: string;
  label: string;
  Icon: LucideIcon;
  defaultRate: number;
  unit: string;
  rateLabel: string;
  rateType: RateType;
  defaultUnitsPerHour: number;
}

export interface ProfitLeak {
  id: string;
  label: string;
  estimatedMonthly: number;
  inputType: "fixed" | "amount" | "percent";
}

export interface CalculationInputs {
  hustleId: string;
  hoursPerWeek: number;
  rate: number;
  rateType: RateType;
  unitsPerHour: number;
  activeLeakIds: string[];
  materialsCost: number;
  platformFeePercent: number;
}

export interface GoalReversalRow {
  target: number;
  hoursNeeded: number;
  rateNeeded: number;
}

export interface CalculationResult {
  weeklyGross: number;
  monthlyGross: number;
  annualGross: number;
  leakTotal: number;
  leakBreakdown: { label: string; amount: number }[];
  monthlyTax: number;
  monthlyNet: number;
  goalReversal: GoalReversalRow[];
}

/* ── Hustle types (exact from CLAUDE.md) ─────────────────────────── */

export const hustleTypes: HustleType[] = [
  { id: "tutoring",     label: "Tutoring",          Icon: BookOpen,    defaultRate: 150,  unit: "per hour",    rateLabel: "hourly rate (ZAR)",             rateType: "hourly",   defaultUnitsPerHour: 1   },
  { id: "baking",       label: "Baking / Food",      Icon: ChefHat,     defaultRate: 80,   unit: "per item",    rateLabel: "avg selling price (ZAR)",       rateType: "per_unit", defaultUnitsPerHour: 4   },
  { id: "reselling",    label: "Reselling",          Icon: ShoppingBag, defaultRate: 120,  unit: "per sale",    rateLabel: "avg profit per sale (ZAR)",     rateType: "per_unit", defaultUnitsPerHour: 3   },
  { id: "hair_nails",   label: "Hair & Nails",       Icon: Scissors,    defaultRate: 200,  unit: "per session", rateLabel: "avg service price (ZAR)",       rateType: "per_unit", defaultUnitsPerHour: 1   },
  { id: "design",       label: "Graphic Design",     Icon: Palette,     defaultRate: 350,  unit: "per project", rateLabel: "avg project rate (ZAR)",        rateType: "per_unit", defaultUnitsPerHour: 0.5 },
  { id: "photography",  label: "Photography",        Icon: Camera,      defaultRate: 800,  unit: "per session", rateLabel: "avg shoot rate (ZAR)",          rateType: "per_unit", defaultUnitsPerHour: 0.5 },
  { id: "writing",      label: "Writing / Content",  Icon: PenLine,     defaultRate: 300,  unit: "per article", rateLabel: "avg article rate (ZAR)",        rateType: "per_unit", defaultUnitsPerHour: 0.5 },
  { id: "social_media", label: "Social Media Mgmt",  Icon: Smartphone,  defaultRate: 1500, unit: "per client",  rateLabel: "monthly retainer per client (ZAR)", rateType: "per_unit", defaultUnitsPerHour: 0.1 },
  { id: "cleaning",     label: "Cleaning Services",  Icon: Sparkles,    defaultRate: 350,  unit: "per job",     rateLabel: "avg job rate (ZAR)",            rateType: "per_unit", defaultUnitsPerHour: 1   },
  { id: "delivery",     label: "Deliveries",         Icon: Truck,       defaultRate: 60,   unit: "per delivery",rateLabel: "avg delivery fee (ZAR)",        rateType: "per_unit", defaultUnitsPerHour: 2   },
  { id: "coding",       label: "Web / App Dev",      Icon: Code2,       defaultRate: 500,  unit: "per hour",    rateLabel: "hourly rate (ZAR)",             rateType: "hourly",   defaultUnitsPerHour: 1   },
  { id: "other",        label: "Something else",     Icon: Plus,        defaultRate: 200,  unit: "per unit",    rateLabel: "your rate (ZAR)",               rateType: "per_unit", defaultUnitsPerHour: 2   },
];

/* ── Profit leaks (exact from CLAUDE.md) ─────────────────────────── */

export const profitLeaks: ProfitLeak[] = [
  { id: "data",       label: "Mobile data / WiFi costs",           estimatedMonthly: 200, inputType: "fixed"   },
  { id: "transport",  label: "Transport to clients / deliveries",  estimatedMonthly: 400, inputType: "fixed"   },
  { id: "materials",  label: "Materials / stock / ingredients",    estimatedMonthly: 0,   inputType: "amount"  },
  { id: "platform",   label: "Platform fees (Takealot, Uber, etc)",estimatedMonthly: 0,   inputType: "percent" },
  { id: "packaging",  label: "Packaging / printing",               estimatedMonthly: 150, inputType: "fixed"   },
  { id: "marketing",  label: "Ads / boosted posts",                estimatedMonthly: 200, inputType: "fixed"   },
  { id: "tax",        label: "SARS provisional tax",               estimatedMonthly: 0,   inputType: "fixed"   },
];

/* ── calculateLeaks ───────────────────────────────────────────────── */

export function calculateLeaks(
  activeLeakIds: string[],
  monthlyGross: number,
  materialsCost: number,
  platformFeePercent: number
): { total: number; breakdown: { label: string; amount: number }[] } {
  const breakdown: { label: string; amount: number }[] = [];

  if (activeLeakIds.includes("data")) {
    breakdown.push({ label: "Mobile data / WiFi", amount: 200 });
  }
  if (activeLeakIds.includes("transport")) {
    breakdown.push({ label: "Transport", amount: 400 });
  }
  if (activeLeakIds.includes("materials") && materialsCost > 0) {
    breakdown.push({ label: "Materials / stock", amount: materialsCost });
  }
  if (activeLeakIds.includes("platform") && platformFeePercent > 0) {
    const fee = Math.round((monthlyGross * platformFeePercent) / 100);
    breakdown.push({ label: `Platform fees (${platformFeePercent}%)`, amount: fee });
  }
  if (activeLeakIds.includes("packaging")) {
    breakdown.push({ label: "Packaging / printing", amount: 150 });
  }
  if (activeLeakIds.includes("marketing")) {
    breakdown.push({ label: "Ads / marketing", amount: 200 });
  }
  // "tax" is handled separately — not added to leakTotal

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);
  return { total, breakdown };
}

/* ── calculateIncome (exact spec logic) ──────────────────────────── */

const WEEKS_PER_MONTH = 4.33;
const SARS_THRESHOLD  = 95750;  // 2025/26
const SARS_RATE       = 0.18;   // First bracket

export function calculateIncome(inputs: CalculationInputs): CalculationResult {
  const { hoursPerWeek, rate, rateType, unitsPerHour, activeLeakIds, materialsCost, platformFeePercent } = inputs;

  // Guard against zero/invalid inputs
  if (!rate || !hoursPerWeek) {
    const empty: CalculationResult = {
      weeklyGross: 0, monthlyGross: 0, annualGross: 0,
      leakTotal: 0, leakBreakdown: [],
      monthlyTax: 0, monthlyNet: 0,
      goalReversal: [5000, 10000, 20000].map(target => ({ target, hoursNeeded: 0, rateNeeded: 0 })),
    };
    return empty;
  }

  const weeklyGross =
    rateType === "hourly"
      ? hoursPerWeek * rate
      : hoursPerWeek * (unitsPerHour ?? 2) * rate;

  const monthlyGross = weeklyGross * WEEKS_PER_MONTH;
  const annualGross  = monthlyGross * 12;

  const { total: leakTotal, breakdown: leakBreakdown } = calculateLeaks(
    activeLeakIds, monthlyGross, materialsCost, platformFeePercent
  );

  const taxEstimate = annualGross > SARS_THRESHOLD
    ? (annualGross - SARS_THRESHOLD) * SARS_RATE
    : 0;
  const monthlyTax = taxEstimate / 12;

  const monthlyNet = monthlyGross - leakTotal - monthlyTax;

  const goalReversal = [5000, 10000, 20000].map((target) => ({
    target,
    hoursNeeded: Math.ceil((target + leakTotal + monthlyTax) / (rate * WEEKS_PER_MONTH)),
    rateNeeded:  Math.ceil((target + leakTotal + monthlyTax) / (hoursPerWeek * WEEKS_PER_MONTH)),
  }));

  return { weeklyGross, monthlyGross, annualGross, leakTotal, leakBreakdown, monthlyTax, monthlyNet, goalReversal };
}
