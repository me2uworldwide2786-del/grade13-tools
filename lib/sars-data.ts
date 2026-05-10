/* ─────────────────────────────────────────────────────────────────
   SARS Individual Income Tax — 2025/2026 Tax Year
   Source: National Treasury Budget 2025
   ───────────────────────────────────────────────────────────────── */

export type AgeBracket = "under65" | "age65to74" | "age75plus";

export interface TaxBracket {
  min: number;
  max: number;
  base: number;
  rate: number;
}

/* ── 2025/2026 Tax Brackets ─────────────────────────────────────── */

export const TAX_BRACKETS: TaxBracket[] = [
  { min:       0, max:   237_100, base:        0, rate: 0.18 },
  { min: 237_101, max:   370_500, base:   42_678, rate: 0.26 },
  { min: 370_501, max:   512_800, base:   77_362, rate: 0.31 },
  { min: 512_801, max:   673_000, base:  121_475, rate: 0.36 },
  { min: 673_001, max:   857_900, base:  179_147, rate: 0.39 },
  { min: 857_901, max: 1_817_000, base:  251_258, rate: 0.41 },
  { min: 1_817_001, max: Infinity, base: 644_489, rate: 0.45 },
];

/* ── Rebates ────────────────────────────────────────────────────── */

export const REBATES = {
  primary:   17_235,  // All taxpayers
  secondary:  9_444,  // Age 65–74
  tertiary:   3_145,  // Age 75+
} as const;

/* ── Thresholds (below = no tax payable) ───────────────────────── */

export const THRESHOLDS: Record<AgeBracket, number> = {
  under65:    95_750,
  age65to74: 148_217,
  age75plus: 165_689,
};

/* ── Provisional tax trigger (non-PAYE income) ─────────────────── */
export const PROVISIONAL_THRESHOLD = 30_000;

/* ── Helpers ────────────────────────────────────────────────────── */

/** Gross tax before rebate, using 2025/26 brackets. */
export function calcGrossTax(income: number): number {
  if (income <= 0) return 0;
  for (const b of TAX_BRACKETS) {
    if (income <= b.max) {
      return b.base + (income - b.min) * b.rate;
    }
  }
  return 0; // unreachable
}

/** Rebate amount for a given age bracket. */
export function getAgeRebate(age: AgeBracket): number {
  let r = REBATES.primary;
  if (age === "age65to74" || age === "age75plus") r += REBATES.secondary;
  if (age === "age75plus") r += REBATES.tertiary;
  return r;
}

/** Marginal bracket rate for a given total income. */
export function getMarginalRate(totalIncome: number): number {
  for (const b of TAX_BRACKETS) {
    if (totalIncome <= b.max) return b.rate;
  }
  return 0.45;
}

/* ── Main calculation ───────────────────────────────────────────── */

export interface SarsTaxResult {
  /* Inputs echoed */
  annualFreelanceIncome: number;
  totalAnnualIncome: number;

  /* Tax figures */
  grossTax: number;           // Before rebate
  rebate: number;             // Age rebate applied
  netAnnualTax: number;       // After rebate — what you owe SARS
  effectiveTaxRate: number;   // % of freelance income
  marginalRate: number;       // Bracket rate on top income (%)

  /* Provisional tax */
  provisionalRequired: boolean;
  aboveThreshold: boolean;
  firstPayment: number;       // ~August (50%)
  secondPayment: number;      // ~February (50%)
  monthlyProvision: number;   // What to save each month

  /* Context flags */
  hasEmployment: boolean;
}

/**
 * Calculate estimated SARS tax liability for a freelancer / side hustler.
 *
 * When `annualEmploymentIncome` is provided, uses the marginal-rate method:
 * the side hustle income is taxed at the rate of the combined income bracket,
 * with the rebate attributed to the employment income.  This is a planning
 * estimate only — not a formal tax assessment.
 */
export function calculateSarsTax(
  monthlyFreelanceIncome: number,
  age: AgeBracket,
  annualEmploymentIncome = 0
): SarsTaxResult {
  const annualFreelanceIncome = monthlyFreelanceIncome * 12;
  const totalAnnualIncome = annualFreelanceIncome + annualEmploymentIncome;
  const rebate = getAgeRebate(age);
  const threshold = THRESHOLDS[age];
  const aboveThreshold = totalAnnualIncome > threshold;

  let netAnnualTax = 0;
  let grossTax = 0;
  let effectiveRebate = 0;

  if (aboveThreshold && annualFreelanceIncome > 0) {
    if (annualEmploymentIncome > 0) {
      /*
       * Marginal method:
       * PAYE covers the tax on employment income (including using up the rebate).
       * The side hustle is taxed at the marginal rate for the combined income,
       * with no additional rebate available.
       */
      const totalGross = calcGrossTax(totalAnnualIncome);
      const emplGross  = calcGrossTax(annualEmploymentIncome);
      grossTax = Math.max(0, totalGross - emplGross);
      effectiveRebate = 0; // rebate already consumed by PAYE
      netAnnualTax = Math.max(0, grossTax);
    } else {
      /*
       * Self-employed only: full brackets + rebate.
       */
      grossTax = calcGrossTax(annualFreelanceIncome);
      effectiveRebate = rebate;
      netAnnualTax = Math.max(0, grossTax - rebate);
    }
  }

  const firstPayment  = netAnnualTax / 2;
  const secondPayment = netAnnualTax / 2;
  const monthlyProvision = netAnnualTax / 12;
  const marginalRate = getMarginalRate(totalAnnualIncome) * 100;
  const effectiveTaxRate =
    annualFreelanceIncome > 0
      ? (netAnnualTax / annualFreelanceIncome) * 100
      : 0;

  return {
    annualFreelanceIncome,
    totalAnnualIncome,
    grossTax,
    rebate: effectiveRebate,
    netAnnualTax,
    effectiveTaxRate,
    marginalRate,
    provisionalRequired: annualFreelanceIncome > PROVISIONAL_THRESHOLD,
    aboveThreshold,
    firstPayment,
    secondPayment,
    monthlyProvision,
    hasEmployment: annualEmploymentIncome > 0,
  };
}
