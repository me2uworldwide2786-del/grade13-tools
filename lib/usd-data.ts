import type { LucideIcon } from "lucide-react";
import {
  PenLine,
  Palette,
  Code2,
  Headphones,
  Smartphone,
  Video,
  Search,
  Database,
  Globe,
  BarChart3,
} from "lucide-react";

/* ── Exchange rate ────────────────────────────────────────────────
   Conservative mid-rate. Displayed to the user with an edit field
   so they can use today's live rate from Google Finance.          */
export const DEFAULT_USD_ZAR = 18.5;

/* ── SA Salary Benchmarks (2025 approximate) ─────────────────────
   Used for the "mind-blow" ZAR comparison.                        */
export const SA_BENCHMARKS = {
  minimumWageMonthly: 5_113,       // R27.58/hr × 185.33 hrs/month (2025)
  averageSalaryMonthly: 25_000,    // Statistics SA median (approximately)
  capeRent1Bed: 12_500,            // Cape Town 1-bed apartment
  jhbRent1Bed: 9_500,              // Johannesburg 1-bed apartment
} as const;

/* ── Skill types ──────────────────────────────────────────────── */

export interface SkillRate {
  label: string;
  beginner: number;   // USD/hr
  mid: number;
  experienced: number;
  suggested: number;  // pre-filled in the rate input
  platforms: string;
  pitch: string;      // One-line description of the opportunity
  Icon: LucideIcon;
}

export const SKILL_RATES: SkillRate[] = [
  {
    label: "Writing & Content",
    Icon: PenLine,
    beginner: 15,
    mid: 35,
    experienced: 80,
    suggested: 30,
    platforms: "Upwork, ProBlogger, Contently",
    pitch: "Blog posts, copywriting, ghostwriting, product descriptions",
  },
  {
    label: "Graphic Design",
    Icon: Palette,
    beginner: 20,
    mid: 50,
    experienced: 100,
    suggested: 45,
    platforms: "Upwork, 99designs, Fiverr",
    pitch: "Logos, branding, social media graphics, UI design",
  },
  {
    label: "Web / App Dev",
    Icon: Code2,
    beginner: 35,
    mid: 75,
    experienced: 150,
    suggested: 65,
    platforms: "Toptal, Upwork, Remote OK",
    pitch: "Frontend, backend, WordPress, React, mobile apps",
  },
  {
    label: "Virtual Assistant",
    Icon: Headphones,
    beginner: 12,
    mid: 22,
    experienced: 40,
    suggested: 18,
    platforms: "Upwork, Belay, Time Etc",
    pitch: "Admin, inbox management, scheduling, research",
  },
  {
    label: "Social Media Mgmt",
    Icon: Smartphone,
    beginner: 20,
    mid: 45,
    experienced: 85,
    suggested: 38,
    platforms: "Upwork, Contra, LinkedIn",
    pitch: "Content calendars, community management, paid ads",
  },
  {
    label: "Video Editing",
    Icon: Video,
    beginner: 25,
    mid: 55,
    experienced: 110,
    suggested: 50,
    platforms: "Upwork, Fiverr, YouTube creators",
    pitch: "YouTube, TikTok, reels, corporate video, podcasts",
  },
  {
    label: "SEO & Digital Mktg",
    Icon: Search,
    beginner: 25,
    mid: 55,
    experienced: 100,
    suggested: 50,
    platforms: "Upwork, Mayple, Fiverr",
    pitch: "On-page SEO, link building, Google Ads, analytics",
  },
  {
    label: "Data & Research",
    Icon: Database,
    beginner: 15,
    mid: 30,
    experienced: 60,
    suggested: 25,
    platforms: "Upwork, Fiverr, Clickworker",
    pitch: "Data entry, market research, lead lists, spreadsheets",
  },
  {
    label: "Translation",
    Icon: Globe,
    beginner: 20,
    mid: 40,
    experienced: 75,
    suggested: 35,
    platforms: "ProZ, Gengo, Upwork",
    pitch: "Documents, subtitles, websites — Afrikaans, Zulu, Xhosa pairs well",
  },
  {
    label: "Finance & Accounting",
    Icon: BarChart3,
    beginner: 30,
    mid: 65,
    experienced: 120,
    suggested: 55,
    platforms: "Upwork, Bench, Paro",
    pitch: "Bookkeeping, financial analysis, tax prep for US/UK clients",
  },
];

/* ── Calculation ──────────────────────────────────────────────── */

export interface UsdCalcResult {
  weeklyUsd: number;
  monthlyUsd: number;
  annualUsd: number;
  weeklyZar: number;
  monthlyZar: number;
  annualZar: number;
  /* Mind-blow comparisons */
  monthsOfMinWage: number;
  vsAverageSalaryPct: number;    // % of average SA salary
  monthsOfCapeRent: number;
  zarPerHour: number;            // effective ZAR/hr
}

const WEEKS_PER_MONTH = 4.33;

export function calculateUsdEarnings(
  usdPerHour: number,
  hoursPerWeek: number,
  exchangeRate: number
): UsdCalcResult {
  const weeklyUsd   = usdPerHour * hoursPerWeek;
  const monthlyUsd  = weeklyUsd * WEEKS_PER_MONTH;
  const annualUsd   = monthlyUsd * 12;

  const weeklyZar   = weeklyUsd  * exchangeRate;
  const monthlyZar  = monthlyUsd * exchangeRate;
  const annualZar   = annualUsd  * exchangeRate;
  const zarPerHour  = usdPerHour * exchangeRate;

  const monthsOfMinWage       = monthlyZar / SA_BENCHMARKS.minimumWageMonthly;
  const vsAverageSalaryPct    = (monthlyZar / SA_BENCHMARKS.averageSalaryMonthly) * 100;
  const monthsOfCapeRent      = monthlyZar / SA_BENCHMARKS.capeRent1Bed;

  return {
    weeklyUsd,   monthlyUsd,  annualUsd,
    weeklyZar,   monthlyZar,  annualZar,
    monthsOfMinWage,
    vsAverageSalaryPct,
    monthsOfCapeRent,
    zarPerHour,
  };
}
