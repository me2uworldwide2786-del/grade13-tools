# CLAUDE.md — Grade 13: Free Tools Hub Website
> Master project brief for Claude Code. Read this entire file before writing a single line of code.

---

## 🎓 PROJECT OVERVIEW

**Brand:** Grade 13
**Legal Entity:** Me2UWorldWide PTY Ltd (SA registered)
**Tagline:** *"School ends at Grade 12. Life starts at Grade 13."* (always italicised)
**Mission:** SA's dedicated small business education hub. Practical, locally relevant tools and guides for young graduates, matrics, side hustlers, and aspiring entrepreneurs.
**This project:** A standalone Free Tools Hub website — the brand's "give before you take" engine. Every tool solves 20% of a problem. The paid Payhip guides solve the other 80%.

---

## 🎨 DESIGN SYSTEM

### Colour Palette

```css
:root {
  --color-primary:     #0D1B2A;  /* Deep Midnight Blue — backgrounds, navbars, headers */
  --color-secondary:   #F5A623;  /* Vibrant Gold — CTAs, highlights, accents, hover states */
  --color-white:       #FFFFFF;  /* Clean White — body text on dark, card backgrounds */
  --color-surface:     #111D2C;  /* Slightly lighter than primary — card/section backgrounds */
  --color-surface-2:   #162236;  /* Cards, input fields on dark backgrounds */
  --color-border:      #1E3048;  /* Subtle borders */
  --color-text-muted:  #7A9BB5;  /* Muted text, labels, helper copy */
  --color-success:     #22C55E;  /* Green for positive results */
  --color-warning:     #EF4444;  /* Red for warnings/tax alerts */
  --color-gold-light:  #FFD080;  /* Lighter gold for hover states */
  --color-gold-dark:   #D4851A;  /* Darker gold for pressed states */
}
```

### Typography

```css
/* Import in <head> */
/* Headings: Playfair Display — authoritative, premium, SA editorial energy */
/* Body: DM Sans — clean, modern, highly readable on mobile */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */
  --text-6xl:  3.75rem;   /* 60px */
}
```

### Spacing Scale

```css
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}
```

### Border Radius

```css
:root {
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;
}
```

### Shadows

```css
:root {
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.3);
  --shadow-md:   0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg:   0 8px 32px rgba(0,0,0,0.5);
  --shadow-gold: 0 0 24px rgba(245,166,35,0.25);
  --shadow-glow: 0 0 40px rgba(245,166,35,0.15);
}
```

---

## 🏗️ TECH STACK

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Next.js 14 (App Router)** | SEO-critical for SA search traffic, fast, free on Vercel |
| Styling | **Tailwind CSS v3** | Rapid UI, responsive out of the box |
| Animations | **Framer Motion** | Smooth tool transitions, page reveals |
| Icons | **Lucide React** | Clean, consistent icon set |
| Forms | **React Hook Form** | Fast, lightweight form handling for tools |
| PDF Export | **html2canvas + jsPDF** | CV download functionality |
| Email Capture | **Mailchimp Embedded Form / ConvertKit** | Builds the list on every tool |
| Deployment | **Vercel (free tier)** | Zero-config, instant deploys |
| Domain | **grade13.co.za** (register on Afrihost) | SA domain = trust signal |

---

## 📁 PROJECT STRUCTURE

```
grade13-tools/
├── app/
│   ├── layout.tsx              # Root layout with nav + footer
│   ├── page.tsx                # Homepage
│   ├── tools/
│   │   ├── page.tsx            # Tools hub index page
│   │   ├── cv-builder/
│   │   │   └── page.tsx        # SA CV Builder tool
│   │   ├── business-quiz/
│   │   │   └── page.tsx        # Business Structure Selector quiz
│   │   └── income-calculator/
│   │       └── page.tsx        # Side Hustle Income Calculator
│   ├── guides/
│   │   └── page.tsx            # Links to Payhip products
│   └── blog/
│       └── page.tsx            # Blog index (future)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── ProgressBar.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── EmailCapture.tsx
│   ├── homepage/
│   │   ├── Hero.tsx
│   │   ├── ToolsGrid.tsx
│   │   ├── BrandStory.tsx
│   │   └── ProductCTA.tsx
│   └── tools/
│       ├── cv-builder/
│       │   ├── CVForm.tsx
│       │   ├── CVPreview.tsx
│       │   └── CVTemplates.tsx
│       ├── business-quiz/
│       │   ├── QuizEngine.tsx
│       │   └── QuizResult.tsx
│       └── income-calculator/
│           ├── CalculatorForm.tsx
│           └── CalculatorResult.tsx
├── lib/
│   ├── cv-templates.ts         # CV template data
│   ├── quiz-data.ts            # Business quiz questions + logic
│   ├── calculator-data.ts      # Hustle types + rate data
│   └── utils.ts
├── public/
│   ├── logo.svg
│   └── og-image.png
└── tailwind.config.ts
```

---

## 🌐 PHASE 1 — HOMEPAGE

### Build Order
1. Navbar
2. Hero section
3. Tools grid section
4. Brand story section
5. Product/guide CTA section
6. Footer
7. Email capture component (reusable, placed in every tool)

### Navbar Spec

```
Logo left: Grade 13 (gold wordmark on midnight blue)
Nav links: Tools | Guides | Blog
CTA button right: "Browse Guides →" (gold button, primary)
Mobile: Hamburger → full-screen overlay menu
Sticky on scroll, slight blur + border-bottom on scroll
```

### Hero Section Spec

```
Background: Deep midnight blue (#0D1B2A)
Subtle texture: diagonal dot grid pattern (gold at 5% opacity)
Top badge: "🇿🇦 Built for South Africa" — pill badge, gold border
H1: "The tools nobody gave you in school."
  Font: Playfair Display 900, white, 60px desktop / 40px mobile
Subheading: "Free calculators, quizzes and builders for SA graduates,
  side hustlers and first-time entrepreneurs."
  Font: DM Sans 400, muted text colour, 20px
Tagline below: "School ends at Grade 12. Life starts at Grade 13."
  Italicised, gold colour, DM Sans
Two CTAs: "Explore Free Tools →" (gold filled) | "Browse Guides" (ghost)
Visual: Floating tool cards or dashboard mockup (animated with Framer Motion)
```

### Tools Grid Section Spec

```
Section header: "Free Tools — No signup required"
Sub: "Use them now. Learn something. Come back whenever."
Grid: 3 columns desktop, 2 tablet, 1 mobile
Each card:
  - Icon (Lucide, gold on dark surface)
  - Tool name (bold, white)
  - One-line description (muted text)
  - "→ Use for free" link (gold)
  - "Pairs with: [Guide Name]" badge at bottom (subtle, muted)
```

### Brand Story Section Spec

```
Two-column layout: text left, graphic/stats right
Headline: "We're the older sibling who figured it out."
Body copy (3 short paragraphs):
  - What Grade 13 is
  - Who it's for
  - Why it exists (no one else is doing this for SA young people)
Stats to display: "10 guides" | "5 free tools" | "100% SA-specific"
Tone: warm, direct, zero corporate language
```

### Footer Spec

```
Logo + tagline
Links: Tools | Guides | Blog | About
Legal: "© 2025 Me2UWorldWide PTY Ltd | Grade 13 is a registered brand"
Social: TikTok | Instagram | WhatsApp Community link
Bottom line: "School ends at Grade 12. Life starts at Grade 13." (italicised, gold)
```

---

## 🛠️ PHASE 2 — TOOL 1: SA CV BUILDER

**Route:** `/tools/cv-builder`
**Paired Product:** CV & Interview Pack for the SA Job Market — R147
**Purpose:** Generate a print-ready, SA-formatted CV in under 5 minutes

### User Flow

```
Step 1: Choose template (3 options shown as visual cards)
Step 2: Fill in personal details form
Step 3: Fill in education section
Step 4: Fill in experience / skills / hustle section
Step 5: Live preview updates in real time (split screen desktop)
Step 6: Download as PDF | Print | Email to self
Step 7: Email capture gate before download (optional — A/B test this)
CTA below result: "Want to ace the interview too? Get the full pack →"
```

### Three CV Templates

**Template A: "The Graduate"**
```
For: Matrics with no work experience
Layout: Clean single-column, education-first
Highlights: Matric results, subjects, extracurriculars, soft skills
SA-specific: Includes ID number field (optional), SA phone format
Colour: Midnight blue header bar, white body
```

**Template B: "The Hustler"**
```
For: Side hustlers converting to formal employment
Layout: Two-column, skills + projects on left, experience right
Highlights: Self-started projects, digital skills, income generated
SA-specific: "Projects / Side Businesses" section replaces "Work Experience"
Colour: Gold accent bar, clean white body
```

**Template C: "The Professional"**
```
For: 2–3 years experience, moving up
Layout: Traditional single-column, clean and corporate
Highlights: Career summary at top, reverse-chronological experience
SA-specific: References section with "available on request" default
Colour: Minimal — black and white with gold section dividers
```

### Form Fields

```typescript
interface CVFormData {
  // Personal
  fullName: string;
  email: string;
  phone: string;           // SA format: 0XX XXX XXXX
  location: string;        // City, Province only — no full address
  linkedin?: string;
  portfolio?: string;

  // Profile Summary
  summary: string;         // 2–3 sentence auto-suggested based on template

  // Education
  education: {
    institution: string;
    qualification: string;
    year: string;
    subjects?: string;     // Matric subjects + results
    achievements?: string;
  }[];

  // Experience / Projects
  experience: {
    title: string;
    company: string;       // Or "Self-employed / Freelance"
    startDate: string;
    endDate: string;       // Or "Present"
    description: string;   // 2–3 bullet points
  }[];

  // Skills
  skills: string[];        // Tag input, max 10

  // References
  referencesAvailable: boolean;  // Default: true → shows "Available on request"
}
```

### CV Download Logic

```typescript
// Use html2canvas to screenshot the CV preview div
// Pass to jsPDF as image
// Filename: "Grade13_CV_[FirstName]_[Year].pdf"
// A4 size: 210 x 297mm
// Print margin: 15mm all sides
```

### Email Gate (before download)

```
"Drop your email and we'll send you a bonus tip sheet:
'5 Things SA Employers Check Before They Even Read Your CV'"
[Email input] [Get My CV →]
Disclaimer: "No spam. Unsubscribe anytime. Grade 13 respects your inbox."
```

---

## 🛠️ PHASE 3 — TOOL 2: SA BUSINESS STRUCTURE QUIZ

**Route:** `/tools/business-quiz`
**Paired Product:** CIPC Registration Guide — All 4 SA Business Structures — R197
**Purpose:** Tell someone exactly which business structure to register, and why

### User Flow

```
Landing card: Brief explanation of why this matters
Progress bar: Shows Question X of 7
Each question: Large card, plain English, 2–4 answer options
Animated transition between questions (slide in)
Results page: Shows recommended structure with full explanation
CTA: "Here's how to register it step by step →" (links to CIPC Guide)
```

### The 7 Questions

```typescript
const quizQuestions = [
  {
    id: 1,
    question: "Are you starting this business alone, or with other people?",
    options: [
      { label: "Just me", value: "solo" },
      { label: "Me and at least one partner", value: "partners" },
      { label: "Me and investors (not friends/family)", value: "investors" },
      { label: "I want to start a non-profit or community org", value: "nonprofit" }
    ]
  },
  {
    id: 2,
    question: "If the business owes money and can't pay — should that debt follow you personally?",
    options: [
      { label: "No! Keep business and personal finances separate", value: "limited" },
      { label: "I'm fine with full personal responsibility for now", value: "unlimited" }
    ]
  },
  {
    id: 3,
    question: "Do you plan to hire staff in the next 12 months?",
    options: [
      { label: "Yes — or I already have people", value: "yes" },
      { label: "No, just me (or freelancers)", value: "no" }
    ]
  },
  {
    id: 4,
    question: "Will you be applying for government tenders or corporate contracts?",
    options: [
      { label: "Yes — this is part of the plan", value: "yes" },
      { label: "No — I'm selling to regular people or small businesses", value: "no" }
    ]
  },
  {
    id: 5,
    question: "How serious is this — right now, today?",
    options: [
      { label: "I'm testing an idea — not ready to spend money on registration", value: "testing" },
      { label: "It's real and I'm ready to make it official", value: "ready" },
      { label: "I'm already operating and need to formalise urgently", value: "urgent" }
    ]
  },
  {
    id: 6,
    question: "Do you need a business bank account or to invoice clients formally?",
    options: [
      { label: "Yes — clients need proper invoices and a business name", value: "yes" },
      { label: "No — cash or personal EFT is fine for now", value: "no" }
    ]
  },
  {
    id: 7,
    question: "What is your primary goal for registering?",
    options: [
      { label: "Look legitimate and build trust with clients", value: "trust" },
      { label: "Protect myself legally and financially", value: "protection" },
      { label: "Access funding, grants, or investment", value: "funding" },
      { label: "Comply with the law and avoid penalties", value: "compliance" }
    ]
  }
]
```

### Results Logic

```typescript
// Scoring matrix — maps answer combinations to one of 4 outcomes:

type BusinessStructure = 
  | "sole_proprietor"   // Sole Proprietor
  | "partnership"       // Partnership
  | "pty_ltd"           // Private Company (PTY Ltd)
  | "npc"               // Non-Profit Company (NPC)

function determineStructure(answers: Record<number, string>): BusinessStructure {
  if (answers[1] === "nonprofit") return "npc";
  if (answers[1] === "partners" && answers[2] === "unlimited") return "partnership";
  if (
    answers[2] === "limited" ||
    answers[4] === "yes" ||
    answers[6] === "yes" ||
    answers[7] === "funding" ||
    answers[7] === "protection"
  ) return "pty_ltd";
  return "sole_proprietor";
}
```

### Result Cards

Each result card must include:

```
Structure name: e.g. "Private Company (PTY Ltd)"
Plain-English explanation: 2–3 sentences max. What it is, why it suits them.
✔ Best for: [3 bullet points]
✘ Not ideal if: [2 bullet points]
Registration cost: Accurate CIPC fee (R175 for PTY Ltd as of 2025)
Time to register: e.g. "5–10 business days via BizPortal"
Difficulty: Easy / Moderate / Complex (badge)
CTA box: "Here's your exact step-by-step registration guide →" (gold button → Payhip)
Secondary CTA: "Not sure? Retake the quiz"
```

**The 4 result definitions:**

```typescript
const structureResults = {
  sole_proprietor: {
    name: "Sole Proprietor",
    tagline: "The simplest way to start — no registration needed.",
    explanation: "You trade under your own name with no formal company registration required. You and the business are legally the same person. Perfect for testing ideas and early-stage hustles before going official.",
    bestFor: ["Freelancers just starting out", "Side hustles testing the market", "Anyone not yet ready to spend on registration"],
    notIdealIf: ["You need a separate business bank account", "You're applying for tenders or corporate work"],
    cipcCost: "R0",
    timeToRegister: "Immediate — no registration needed",
    difficulty: "Easy"
  },
  partnership: {
    name: "Partnership",
    tagline: "Built for two or more — but tread carefully.",
    explanation: "A partnership is formed when two or more people run a business together. There's no liability protection — both partners are personally responsible for all business debts. A written partnership agreement is essential.",
    bestFor: ["Two people starting a business with equal contribution", "Informal joint ventures", "Businesses not yet needing a company account"],
    notIdealIf: ["You want limited liability", "One partner may leave the business"],
    cipcCost: "R0 (optional CIPC registration available)",
    timeToRegister: "Immediate — but draft a partnership agreement first",
    difficulty: "Easy"
  },
  pty_ltd: {
    name: "Private Company (PTY Ltd)",
    tagline: "The gold standard for serious SA businesses.",
    explanation: "A PTY Ltd is a separate legal entity — your personal assets are protected from business debts. It opens doors to business bank accounts, formal invoicing, government tenders, and investor funding. This is what most SA entrepreneurs should aim for.",
    bestFor: ["Anyone who wants to look 100% legit to clients", "Businesses targeting corporate or government contracts", "Founders seeking investment or wanting to protect personal assets"],
    notIdealIf: ["You're still testing an idea and not generating income yet", "You need zero-cost registration"],
    cipcCost: "R175 via BizPortal",
    timeToRegister: "5–10 business days",
    difficulty: "Moderate"
  },
  npc: {
    name: "Non-Profit Company (NPC)",
    tagline: "For community impact — not personal profit.",
    explanation: "An NPC is for organisations whose income goes back into the organisation's objectives — not to members or directors. This is the right structure for community projects, foundations, and social enterprises. It can qualify for tax exemption through SARS.",
    bestFor: ["Community organisations and charities", "Social enterprises and foundations", "Organisations seeking donor or grant funding"],
    notIdealIf: ["You want to pay yourself a salary from profits", "You're running a commercial business"],
    cipcCost: "R175 via BizPortal",
    timeToRegister: "5–10 business days",
    difficulty: "Moderate"
  }
}
```

---

## 🛠️ PHASE 4 — TOOL 3: SIDE HUSTLE INCOME CALCULATOR

**Route:** `/tools/income-calculator`
**Paired Product:** Side Hustle Starter Pack for South Africans — R197
**Purpose:** Show someone exactly how much they could earn, and what's eating their profit

### User Flow

```
Step 1: Select hustle type (visual icon grid — 12 options)
Step 2: Input hours per week available
Step 3: Input rate (price per item or hourly rate)
Step 4: Calculator shows live results as they type
Step 5: "Profit Leak Detector" — checkboxes reveal hidden costs
Step 6: Results summary with monthly/annual projections
Step 7: "What would it take to hit R10k/month?" — goal reversal section
CTA: "Ready to build this for real? Get the Starter Pack →"
```

### Hustle Types

```typescript
const hustleTypes = [
  { id: "tutoring",     label: "Tutoring",          icon: "BookOpen",   defaultRate: 150,  unit: "per hour",    rateLabel: "hourly rate (ZAR)" },
  { id: "baking",       label: "Baking / Food",      icon: "ChefHat",    defaultRate: 80,   unit: "per item",    rateLabel: "avg selling price (ZAR)" },
  { id: "reselling",    label: "Reselling",          icon: "ShoppingBag",defaultRate: 120,  unit: "per sale",    rateLabel: "avg profit per sale (ZAR)" },
  { id: "hair_nails",   label: "Hair & Nails",       icon: "Scissors",   defaultRate: 200,  unit: "per session", rateLabel: "avg service price (ZAR)" },
  { id: "design",       label: "Graphic Design",     icon: "Palette",    defaultRate: 350,  unit: "per project", rateLabel: "avg project rate (ZAR)" },
  { id: "photography",  label: "Photography",        icon: "Camera",     defaultRate: 800,  unit: "per session", rateLabel: "avg shoot rate (ZAR)" },
  { id: "writing",      label: "Writing / Content",  icon: "PenLine",    defaultRate: 300,  unit: "per article", rateLabel: "avg article rate (ZAR)" },
  { id: "social_media", label: "Social Media Mgmt",  icon: "Smartphone", defaultRate: 1500, unit: "per client",  rateLabel: "monthly retainer (ZAR)" },
  { id: "cleaning",     label: "Cleaning Services",  icon: "Sparkles",   defaultRate: 350,  unit: "per job",     rateLabel: "avg job rate (ZAR)" },
  { id: "delivery",     label: "Deliveries",         icon: "Truck",      defaultRate: 60,   unit: "per delivery",rateLabel: "avg delivery fee (ZAR)" },
  { id: "coding",       label: "Web / App Dev",      icon: "Code2",      defaultRate: 500,  unit: "per hour",    rateLabel: "hourly rate (ZAR)" },
  { id: "other",        label: "Something else",     icon: "Plus",       defaultRate: 200,  unit: "per unit",    rateLabel: "your rate (ZAR)" }
]
```

### Profit Leak Checkboxes

```typescript
const profitLeaks = [
  { id: "data",       label: "Mobile data / WiFi costs",          estimatedMonthly: 200  },
  { id: "transport",  label: "Transport to clients / deliveries",  estimatedMonthly: 400  },
  { id: "materials",  label: "Materials / stock / ingredients",    estimatedMonthly: 0    }, // user inputs
  { id: "platform",   label: "Platform fees (Takealot, Uber, etc)",estimatedMonthly: 0    }, // percentage
  { id: "packaging",  label: "Packaging / printing",               estimatedMonthly: 150  },
  { id: "marketing",  label: "Ads / boosted posts",                estimatedMonthly: 200  },
  { id: "tax",        label: "SARS tax (freelancers & side hustles)",estimatedMonthly: 0  }  // calculated from income
]
```

### Calculation Logic

```typescript
function calculateIncome(inputs: {
  hustleType: string;
  hoursPerWeek: number;
  rate: number;
  rateType: "hourly" | "per_unit";
  unitsPerHour?: number;     // For product-based hustles
  profitLeaks: string[];
  materialsCost?: number;
  platformFeePercent?: number;
}) {
  const weeksPerMonth = 4.33;

  // Gross income
  const weeklyGross = inputs.rateType === "hourly"
    ? inputs.hoursPerWeek * inputs.rate
    : inputs.hoursPerWeek * (inputs.unitsPerHour ?? 2) * inputs.rate;

  const monthlyGross = weeklyGross * weeksPerMonth;
  const annualGross  = monthlyGross * 12;

  // Deduct profit leaks
  const leakTotal = calculateLeaks(inputs.profitLeaks, monthlyGross, inputs.materialsCost, inputs.platformFeePercent);

  // SARS provisional tax estimate (simplified)
  const taxEstimate = annualGross > 95750  // 2025/26 threshold
    ? (annualGross - 95750) * 0.18         // Simplified first bracket
    : 0;

  const monthlyTax = taxEstimate / 12;
  const monthlyNet = monthlyGross - leakTotal - monthlyTax;

  // Goal reversal: what rate/hours needed to hit targets
  const targets = [5000, 10000, 20000];
  const goalReversal = targets.map(target => ({
    target,
    hoursNeeded: Math.ceil((target + leakTotal + monthlyTax) / (inputs.rate * weeksPerMonth)),
    rateNeeded:  Math.ceil((target + leakTotal + monthlyTax) / (inputs.hoursPerWeek * weeksPerMonth))
  }));

  return { weeklyGross, monthlyGross, annualGross, leakTotal, monthlyTax, monthlyNet, goalReversal };
}
```

### Results Display

```
Card 1: "Your Monthly Gross" — large gold number — animated count-up
Card 2: "Estimated Profit Leaks" — red total with breakdown
Card 3: "Estimated Tax" — with note "Don't ignore this — it's real"
Card 4: "What You Actually Keep" — highlighted, green if positive
---
Goal Reversal Section:
"To earn R10,000/month net — you need either:
  → [X] hours per week at your current rate, OR
  → Charge R[Y] per [unit] for your current hours"
---
Disclaimer: "This is an estimate for planning purposes only.
Consult a registered tax practitioner for accurate tax advice."
```

---

## 🔁 REUSABLE COMPONENTS

### Button

```tsx
// Variants: primary | ghost | outline | danger
// Sizes: sm | md | lg
// Always use var(--color-secondary) for primary
// Arrow icon (Lucide ArrowRight) on primary CTAs

<Button variant="primary" size="lg">
  Get the Side Hustle Starter Pack →
</Button>
```

### EmailCapture (placed at bottom of every tool result)

```tsx
// Props: productName, tipSheetTitle
// Shows after results are displayed
// Gold border card, DM Sans body text
// Connects to Mailchimp/ConvertKit via API route

<EmailCapture
  tipSheet="5 Things SA Employers Check Before They Read Your CV"
  pairedProduct="CV & Interview Pack — R147"
  payhipLink="https://payhip.com/..."
/>
```

### ToolCard (used on homepage grid and /tools index)

```tsx
interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  pairedProduct: string;
  isNew?: boolean;
}
```

### ProgressBar (used in quiz)

```tsx
// Gold fill on dark surface
// Shows "Question 3 of 7"
// Animated fill transition
```

### ResultCard

```tsx
// Used in both quiz result and calculator
// Dark surface background
// Gold heading
// White body copy
// CTA button at bottom
```

---

## 📋 FORMATTING RULES — NON-NEGOTIABLE

These apply to ALL on-page copy, tool labels, and CTA text:

- **Bold** ALL key information: section headings, product names, laws, stats, key terms, benefit statements, platform names
- *Italicise* the tagline every time it appears: *"School ends at Grade 12. Life starts at Grade 13."*
- **Arrow (→) and tick (✔) labels must be bolded**, with description text in normal weight
- No fluff. No filler. No generic advice. Every sentence earns its place
- All content is **South Africa-specific** — local laws, local platforms, local pricing in ZAR
- Written as if by someone who has actually done the thing — not academic, not corporate

---

## 🔗 PAYHIP PRODUCT LINKS

All CTAs must link to the correct Payhip product. Update these URLs once the Payhip store is live:

```typescript
export const PAYHIP_LINKS = {
  sideHustlePack:      "https://payhip.com/grade13/side-hustle-pack",
  sarsGuide:           "https://payhip.com/grade13/sars-guide",
  dropshippingBlueprint:"https://payhip.com/grade13/dropshipping",
  chineseSupplier:     "https://payhip.com/grade13/chinese-supplier",
  cipcGuide:           "https://payhip.com/grade13/cipc-guide",
  usdEarning:          "https://payhip.com/grade13/usd-earning",
  cvInterviewPack:     "https://payhip.com/grade13/cv-pack",
  loadSheddingGuide:   "https://payhip.com/grade13/load-shedding",
  popiaKit:            "https://payhip.com/grade13/popia",
  sarsMiniGuide:       "https://payhip.com/grade13/sars-mini",
}
```

---

## ✅ QUALITY CHECKLIST

Before considering any page or tool "done", verify:

- [ ] Renders correctly on mobile (375px) and desktop (1440px)
- [ ] All interactive states (hover, active, focus, disabled) are styled
- [ ] All form fields have proper validation with SA-specific error messages
- [ ] Every tool result shows a CTA linking to the correct Payhip product
- [ ] Email capture appears on every tool result
- [ ] Tagline is italicised wherever it appears
- [ ] All currency is in ZAR with R prefix
- [ ] Brand colours are consistent — no off-brand colours
- [ ] No Lorem Ipsum placeholder text anywhere
- [ ] Animations do not run if user has `prefers-reduced-motion: reduce`
- [ ] SARS/legal tools include appropriate disclaimer text
- [ ] Page has correct `<title>` and `<meta description>` for SEO
- [ ] Google Fonts load via `display=swap` for performance

---

## 🚀 BUILD SEQUENCE FOR CLAUDE CODE

Execute in this exact order:

```
1. npx create-next-app@latest grade13-tools --typescript --tailwind --app
2. Install: framer-motion lucide-react react-hook-form html2canvas jspdf
3. Set up tailwind.config.ts with brand colours and fonts
4. Build: globals.css with CSS custom properties
5. Build: layout.tsx (Navbar + Footer)
6. Build: Homepage (Hero → ToolsGrid → BrandStory → ProductCTA)
7. Build: /tools index page
8. Build: CV Builder (/tools/cv-builder)
9. Build: Business Structure Quiz (/tools/business-quiz)
10. Build: Income Calculator (/tools/income-calculator)
11. Build: /guides page (Payhip product links)
12. Deploy to Vercel
```

---

*Grade 13 — School ends at Grade 12. Life starts at Grade 13.*
*© Me2UWorldWide PTY Ltd*
