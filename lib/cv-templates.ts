export type TemplateId = "graduate" | "hustler" | "professional";

export interface CVTemplate {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  accentColor: string;
}

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: "graduate",
    name: "The Graduate",
    tagline: "Education-first. Clean. Confident.",
    description:
      "Single-column layout that leads with your matric results and qualifications. Designed for job-seekers who don't have work experience yet — and aren't ashamed of it.",
    bestFor: "Matrics & recent graduates",
    accentColor: "#0D1B2A",
  },
  {
    id: "hustler",
    name: "The Hustler",
    tagline: "Skills and hustle. Front and centre.",
    description:
      "Two-column layout that puts your side projects, digital skills, and self-started work in the spotlight. Turn 'no formal experience' into undeniable proof of capability.",
    bestFor: "Side hustlers going formal",
    accentColor: "#F5A623",
  },
  {
    id: "professional",
    name: "The Professional",
    tagline: "Classic. Clean. Corporate-ready.",
    description:
      "Traditional single-column with a career summary upfront and reverse-chronological experience. The format that opens every door — from corporates to government.",
    bestFor: "2–3 years experience & up",
    accentColor: "#1a1a1a",
  },
];

/* ── Shared form types ─────────────────────────────────────────── */

export interface EducationEntry {
  institution: string;
  qualification: string;
  year: string;
  subjects: string;
  achievements: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  referencesAvailable: boolean;
}

export const DEFAULT_CV_DATA: CVData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  summary: "",
  education: [
    { institution: "", qualification: "", year: "", subjects: "", achievements: "" },
  ],
  experience: [
    { title: "", company: "", startDate: "", endDate: "", description: "" },
  ],
  referencesAvailable: true,
};

export const SUMMARY_PLACEHOLDERS: Record<TemplateId, string> = {
  graduate:
    "Motivated recent graduate with a passion for [field]. Strong academic foundation in [subjects], with proven ability to [soft skill]. Looking to contribute to [type of team/company] and grow my career in [industry].",
  hustler:
    "Self-driven entrepreneur with hands-on experience building [type of business]. Generated [income/clients] through [side hustle]. Bringing digital skills, client management, and results-focused thinking to a formal role.",
  professional:
    "Results-oriented [job title] with [X] years of experience in [industry]. Track record of [key achievement]. Skilled in [top skill 1], [top skill 2], and [top skill 3]. Seeking to bring this expertise to [type of role/company].",
};
