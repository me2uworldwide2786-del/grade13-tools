export type BusinessStructure =
  | "sole_proprietor"
  | "partnership"
  | "pty_ltd"
  | "npc";

export type Difficulty = "Easy" | "Moderate" | "Complex";

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface StructureResult {
  name: string;
  tagline: string;
  explanation: string;
  bestFor: string[];
  notIdealIf: string[];
  cipcCost: string;
  timeToRegister: string;
  difficulty: Difficulty;
}

/* ── 7 Quiz Questions (exact from CLAUDE.md) ─────────────────────── */

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Are you starting this business alone, or with other people?",
    options: [
      { label: "Just me", value: "solo" },
      { label: "Me and at least one partner", value: "partners" },
      { label: "Me and investors (not friends/family)", value: "investors" },
      { label: "I want to start a non-profit or community org", value: "nonprofit" },
    ],
  },
  {
    id: 2,
    question:
      "If the business owes money and can't pay — should that debt follow you personally?",
    options: [
      { label: "No! Keep business and personal finances separate", value: "limited" },
      { label: "I'm fine with full personal responsibility for now", value: "unlimited" },
    ],
  },
  {
    id: 3,
    question: "Do you plan to hire staff in the next 12 months?",
    options: [
      { label: "Yes — or I already have people", value: "yes" },
      { label: "No, just me (or freelancers)", value: "no" },
    ],
  },
  {
    id: 4,
    question: "Will you be applying for government tenders or corporate contracts?",
    options: [
      { label: "Yes — this is part of the plan", value: "yes" },
      { label: "No — I'm selling to regular people or small businesses", value: "no" },
    ],
  },
  {
    id: 5,
    question: "How serious is this — right now, today?",
    options: [
      {
        label: "I'm testing an idea — not ready to spend money on registration",
        value: "testing",
      },
      { label: "It's real and I'm ready to make it official", value: "ready" },
      { label: "I'm already operating and need to formalise urgently", value: "urgent" },
    ],
  },
  {
    id: 6,
    question: "Do you need a business bank account or to invoice clients formally?",
    options: [
      {
        label: "Yes — clients need proper invoices and a business name",
        value: "yes",
      },
      { label: "No — cash or personal EFT is fine for now", value: "no" },
    ],
  },
  {
    id: 7,
    question: "What is your primary goal for registering?",
    options: [
      { label: "Look legitimate and build trust with clients", value: "trust" },
      { label: "Protect myself legally and financially", value: "protection" },
      { label: "Access funding, grants, or investment", value: "funding" },
      { label: "Comply with the law and avoid penalties", value: "compliance" },
    ],
  },
];

/* ── Result definitions (exact copy from CLAUDE.md) ──────────────── */

export const structureResults: Record<BusinessStructure, StructureResult> = {
  sole_proprietor: {
    name: "Sole Proprietor",
    tagline: "The simplest way to start — no registration needed.",
    explanation:
      "You trade under your own name with no formal company registration required. You and the business are legally the same person. Perfect for testing ideas and early-stage hustles before going official.",
    bestFor: [
      "Freelancers just starting out",
      "Side hustles testing the market",
      "Anyone not yet ready to spend on registration",
    ],
    notIdealIf: [
      "You need a separate business bank account",
      "You're applying for tenders or corporate work",
    ],
    cipcCost: "R0",
    timeToRegister: "Immediate — no registration needed",
    difficulty: "Easy",
  },
  partnership: {
    name: "Partnership",
    tagline: "Built for two or more — but tread carefully.",
    explanation:
      "A partnership is formed when two or more people run a business together. There's no liability protection — both partners are personally responsible for all business debts. A written partnership agreement is essential.",
    bestFor: [
      "Two people starting a business with equal contribution",
      "Informal joint ventures",
      "Businesses not yet needing a company account",
    ],
    notIdealIf: [
      "You want limited liability",
      "One partner may leave the business",
    ],
    cipcCost: "R0 (optional CIPC registration available)",
    timeToRegister: "Immediate — but draft a partnership agreement first",
    difficulty: "Easy",
  },
  pty_ltd: {
    name: "Private Company (PTY Ltd)",
    tagline: "The gold standard for serious SA businesses.",
    explanation:
      "A PTY Ltd is a separate legal entity — your personal assets are protected from business debts. It opens doors to business bank accounts, formal invoicing, government tenders, and investor funding. This is what most SA entrepreneurs should aim for.",
    bestFor: [
      "Anyone who wants to look 100% legit to clients",
      "Businesses targeting corporate or government contracts",
      "Founders seeking investment or wanting to protect personal assets",
    ],
    notIdealIf: [
      "You're still testing an idea and not generating income yet",
      "You need zero-cost registration",
    ],
    cipcCost: "R175 via BizPortal",
    timeToRegister: "5–10 business days",
    difficulty: "Moderate",
  },
  npc: {
    name: "Non-Profit Company (NPC)",
    tagline: "For community impact — not personal profit.",
    explanation:
      "An NPC is for organisations whose income goes back into the organisation's objectives — not to members or directors. This is the right structure for community projects, foundations, and social enterprises. It can qualify for tax exemption through SARS.",
    bestFor: [
      "Community organisations and charities",
      "Social enterprises and foundations",
      "Organisations seeking donor or grant funding",
    ],
    notIdealIf: [
      "You want to pay yourself a salary from profits",
      "You're running a commercial business",
    ],
    cipcCost: "R175 via BizPortal",
    timeToRegister: "5–10 business days",
    difficulty: "Moderate",
  },
};

/* ── Scoring logic (exact from CLAUDE.md) ────────────────────────── */

export function determineStructure(
  answers: Record<number, string>
): BusinessStructure {
  if (answers[1] === "nonprofit") return "npc";
  if (answers[1] === "partners" && answers[2] === "unlimited") return "partnership";
  if (
    answers[2] === "limited" ||
    answers[4] === "yes" ||
    answers[6] === "yes" ||
    answers[7] === "funding" ||
    answers[7] === "protection"
  )
    return "pty_ltd";
  return "sole_proprietor";
}
