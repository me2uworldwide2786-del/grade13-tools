"use client";

import { useState, useRef, useCallback } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { ArrowRight, ArrowLeft, Download, Printer, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import CVTemplates from "./CVTemplates";
import CVPreview from "./CVPreview";
import EmailCapture from "@/components/layout/EmailCapture";
import { PAYHIP_LINKS } from "@/lib/utils";
import {
  CV_TEMPLATES,
  DEFAULT_CV_DATA,
  SUMMARY_PLACEHOLDERS,
} from "@/lib/cv-templates";
import type { TemplateId, CVData } from "@/lib/cv-templates";

type FormTab = "personal" | "education" | "experience" | "skills";

const TABS: { id: FormTab; label: string; emoji: string }[] = [
  { id: "personal",   label: "Personal",   emoji: "🙋" },
  { id: "education",  label: "Education",  emoji: "🎓" },
  { id: "experience", label: "Experience", emoji: "💼" },
  { id: "skills",     label: "Skills",     emoji: "🧰" },
];

/* ── Shared label style ─────────────────────────────────────────── */
function Label({ children, htmlFor }: { children: string; htmlFor?: string }) {
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

/* ── Shared text input style ────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#162236",
  border: "1px solid #1E3048",
  borderRadius: "8px",
  padding: "0.5rem 0.875rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.875rem",
  color: "#FFFFFF",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "80px",
  lineHeight: 1.6,
};

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: "1rem" }}>{children}</div>;
}

function Hint({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", margin: "0.3rem 0 0" }}>
      {children}
    </p>
  );
}

function SectionCard({ children, title, onRemove, canRemove }: {
  children: React.ReactNode;
  title: string;
  onRemove?: () => void;
  canRemove?: boolean;
}) {
  return (
    <div style={{ backgroundColor: "#162236", border: "1px solid #1E3048", borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
        <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "#7A9BB5" }}>
          {title}
        </span>
        {canRemove && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            <Trash2 size={14} /> Remove
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */

export default function CVBuilderClient() {
  const [step, setStep] = useState<"template" | "build">("template");
  const [template, setTemplate] = useState<TemplateId>("graduate");
  const [activeTab, setActiveTab] = useState<FormTab>("personal");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CVData>({ defaultValues: DEFAULT_CV_DATA });

  const formData = useWatch({ control });

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "education" });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experience" });

  /* ── Template confirmation ─────────────────────────────────────── */
  function handleTemplateConfirm() {
    const placeholder = SUMMARY_PLACEHOLDERS[template];
    if (!getValues("summary")) setValue("summary", placeholder);
    setStep("build");
  }

  /* ── Skills helpers ─────────────────────────────────────────────── */
  function addSkill(raw: string) {
    const trimmed = raw.trim();
    if (trimmed && skills.length < 10 && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  }

  function removeSkill(idx: number) {
    setSkills((prev) => prev.filter((_, i) => i !== idx));
  }

  /* ── PDF download ───────────────────────────────────────────────── */
  const handleDownload = useCallback(async () => {
    if (!previewRef.current || downloading) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = previewRef.current;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: el.scrollWidth,
        height: el.scrollHeight,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = (canvas.height / canvas.width) * pageW;
      pdf.addImage(imgData, "PNG", 0, 0, pageW, pageH);

      const firstName = (getValues("fullName") || "CV").split(" ")[0];
      const year = new Date().getFullYear();
      pdf.save(`Grade13_CV_${firstName}_${year}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  }, [downloading, getValues]);

  /* ── Print ──────────────────────────────────────────────────────── */
  function handlePrint() {
    window.print();
  }

  /* ── Step 1: Template Selector ──────────────────────────────────── */
  if (step === "template") {
    return (
      <div style={{ padding: "0 1.5rem 3rem" }}>
        <CVTemplates
          selected={template}
          onSelect={setTemplate}
          onConfirm={handleTemplateConfirm}
        />
      </div>
    );
  }

  /* ── Step 2: Build (split screen) ──────────────────────────────── */
  const tplMeta = CV_TEMPLATES.find((t) => t.id === template)!;

  return (
    <>
      {/* Template switcher bar */}
      <div
        style={{
          backgroundColor: "#111D2C",
          borderBottom: "1px solid #1E3048",
          padding: "0.625rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.8125rem",
              color: "#7A9BB5",
            }}
          >
            Template:
          </span>
          <strong
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.875rem",
              color: "#F5A623",
            }}
          >
            {tplMeta.name}
          </strong>
          <button
            onClick={() => setStep("template")}
            style={{
              background: "none",
              border: "1px solid #1E3048",
              borderRadius: "9999px",
              color: "#7A9BB5",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.75rem",
              padding: "0.2rem 0.75rem",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            Change
          </button>
        </div>

        {/* Mobile preview toggle */}
        <button
          onClick={() => setShowPreviewMobile((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            background: "none",
            border: "1px solid #1E3048",
            borderRadius: "9999px",
            color: "#7A9BB5",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.75rem",
            padding: "0.2rem 0.875rem",
            cursor: "pointer",
          }}
          className="show-mobile-btn"
        >
          {showPreviewMobile ? <EyeOff size={13} /> : <Eye size={13} />}
          {showPreviewMobile ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {/* Split screen */}
      <div className="cv-split-screen">
        {/* ── LEFT: Form ────────────────────────────────────────────── */}
        <div className="cv-form-panel">
          {/* Section tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #1E3048",
              backgroundColor: "#0D1B2A",
              position: "sticky",
              top: "68px",
              zIndex: 10,
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: "0.75rem 0.25rem",
                    background: "none",
                    border: "none",
                    borderBottom: isActive ? "2px solid #F5A623" : "2px solid transparent",
                    color: isActive ? "#F5A623" : "#7A9BB5",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ marginRight: "0.3rem" }}>{tab.emoji}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form content */}
          <div style={{ padding: "1.5rem 1.25rem", overflowY: "auto" }}>

            {/* ── PERSONAL TAB ─────────────────────────────────── */}
            {activeTab === "personal" && (
              <div>
                <FieldGroup>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <input
                    id="fullName"
                    {...register("fullName", { required: true })}
                    placeholder="e.g. Sipho Dlamini"
                    style={{ ...inputStyle, borderColor: errors.fullName ? "#EF4444" : "#1E3048" }}
                  />
                  {errors.fullName && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>Full name is required</p>}
                </FieldGroup>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1rem" }}>
                  <FieldGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="sipho@gmail.com"
                      style={{ ...inputStyle, borderColor: errors.email ? "#EF4444" : "#1E3048" }}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <input
                      id="phone"
                      {...register("phone", { required: true, pattern: /^0\d{9}$/ })}
                      placeholder="0821234567"
                      style={{ ...inputStyle, borderColor: errors.phone ? "#EF4444" : "#1E3048" }}
                    />
                    {errors.phone && <p style={{ color: "#EF4444", fontSize: "0.75rem", margin: "0.25rem 0 0" }}>SA format: 0XXXXXXXXX</p>}
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <Label htmlFor="location">Location</Label>
                  <input
                    id="location"
                    {...register("location")}
                    placeholder="e.g. Johannesburg, Gauteng"
                    style={inputStyle}
                  />
                  <Hint>City and Province only — no street address on a CV</Hint>
                </FieldGroup>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1rem" }}>
                  <FieldGroup>
                    <Label htmlFor="linkedin">LinkedIn (optional)</Label>
                    <input
                      id="linkedin"
                      {...register("linkedin")}
                      placeholder="linkedin.com/in/sipho"
                      style={inputStyle}
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <Label htmlFor="portfolio">Portfolio / Website (optional)</Label>
                    <input
                      id="portfolio"
                      {...register("portfolio")}
                      placeholder="sipho.co.za"
                      style={inputStyle}
                    />
                  </FieldGroup>
                </div>

                <FieldGroup>
                  <Label htmlFor="summary">Profile Summary</Label>
                  <textarea
                    id="summary"
                    {...register("summary")}
                    style={textareaStyle}
                    rows={4}
                  />
                  <Hint>2–3 sentences. Edit the placeholder we&apos;ve pre-filled for your template.</Hint>
                </FieldGroup>

                <button
                  type="button"
                  onClick={() => setActiveTab("education")}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#F5A623", color: "#0D1B2A", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.625rem 1.5rem", borderRadius: "9999px", border: "none", cursor: "pointer" }}
                  className="btn-gold"
                >
                  Next: Education <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* ── EDUCATION TAB ────────────────────────────────── */}
            {activeTab === "education" && (
              <div>
                {eduFields.map((field, idx) => (
                  <SectionCard
                    key={field.id}
                    title={`Education ${idx + 1}`}
                    onRemove={() => removeEdu(idx)}
                    canRemove={eduFields.length > 1}
                  >
                    <FieldGroup>
                      <Label>Institution Name *</Label>
                      <input
                        {...register(`education.${idx}.institution`)}
                        placeholder="e.g. Greenside High School / UNISA"
                        style={inputStyle}
                      />
                    </FieldGroup>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.875rem", marginBottom: "1rem" }}>
                      <FieldGroup>
                        <Label>Qualification *</Label>
                        <input
                          {...register(`education.${idx}.qualification`)}
                          placeholder="e.g. National Senior Certificate / BCom"
                          style={inputStyle}
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label>Year</Label>
                        <input
                          {...register(`education.${idx}.year`)}
                          placeholder="2023"
                          style={{ ...inputStyle, width: "90px" }}
                        />
                      </FieldGroup>
                    </div>
                    <FieldGroup>
                      <Label>Subjects / Majors (optional)</Label>
                      <input
                        {...register(`education.${idx}.subjects`)}
                        placeholder="e.g. Mathematics (72%), English (85%), Accounting (78%)"
                        style={inputStyle}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <Label>Achievements (optional)</Label>
                      <input
                        {...register(`education.${idx}.achievements`)}
                        placeholder="e.g. Academic colours, Prefect, Bursary recipient"
                        style={inputStyle}
                      />
                    </FieldGroup>
                  </SectionCard>
                ))}

                <button
                  type="button"
                  onClick={() => appendEdu({ institution: "", qualification: "", year: "", subjects: "", achievements: "" })}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px dashed #1E3048", borderRadius: "8px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", padding: "0.625rem 1.25rem", cursor: "pointer", width: "100%", justifyContent: "center", marginBottom: "1.25rem" }}
                >
                  <Plus size={15} /> Add Another Qualification
                </button>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={() => setActiveTab("personal")} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid #1E3048", borderRadius: "9999px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", padding: "0.625rem 1.25rem", cursor: "pointer" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button type="button" onClick={() => setActiveTab("experience")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#F5A623", color: "#0D1B2A", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.625rem 1.5rem", borderRadius: "9999px", border: "none", cursor: "pointer" }} className="btn-gold">
                    Next: Experience <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── EXPERIENCE TAB ───────────────────────────────── */}
            {activeTab === "experience" && (
              <div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", marginBottom: "1rem" }}>
                  {template === "hustler"
                    ? "List your side businesses, freelance projects, and self-started work here."
                    : "List jobs, internships, learnerships, or part-time work."}
                </p>

                {expFields.map((field, idx) => (
                  <SectionCard
                    key={field.id}
                    title={template === "hustler" ? `Project / Experience ${idx + 1}` : `Job ${idx + 1}`}
                    onRemove={() => removeExp(idx)}
                    canRemove={expFields.length > 1}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1rem" }}>
                      <FieldGroup>
                        <Label>{template === "hustler" ? "Project / Role Title" : "Job Title"}</Label>
                        <input
                          {...register(`experience.${idx}.title`)}
                          placeholder={template === "hustler" ? "e.g. Freelance Graphic Designer" : "e.g. Sales Assistant"}
                          style={inputStyle}
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label>{template === "hustler" ? "Client / Business Name" : "Company"}</Label>
                        <input
                          {...register(`experience.${idx}.company`)}
                          placeholder={template === "hustler" ? "e.g. Self-employed / Freelance" : "e.g. Pick n Pay"}
                          style={inputStyle}
                        />
                      </FieldGroup>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "1rem" }}>
                      <FieldGroup>
                        <Label>Start Date</Label>
                        <input
                          {...register(`experience.${idx}.startDate`)}
                          placeholder="Jan 2023"
                          style={inputStyle}
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <Label>End Date</Label>
                        <input
                          {...register(`experience.${idx}.endDate`)}
                          placeholder="Dec 2023 or Present"
                          style={inputStyle}
                        />
                      </FieldGroup>
                    </div>
                    <FieldGroup>
                      <Label>Description (one bullet per line)</Label>
                      <textarea
                        {...register(`experience.${idx}.description`)}
                        placeholder={"Managed customer accounts and processed payments\nReduced stock losses by 15% through improved tracking\nTrained 3 new team members on store procedures"}
                        style={{ ...textareaStyle, minHeight: "90px" }}
                        rows={4}
                      />
                    </FieldGroup>
                  </SectionCard>
                ))}

                <button
                  type="button"
                  onClick={() => appendExp({ title: "", company: "", startDate: "", endDate: "", description: "" })}
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px dashed #1E3048", borderRadius: "8px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", padding: "0.625rem 1.25rem", cursor: "pointer", width: "100%", justifyContent: "center", marginBottom: "1.25rem" }}
                >
                  <Plus size={15} /> Add Another Entry
                </button>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={() => setActiveTab("education")} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid #1E3048", borderRadius: "9999px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", padding: "0.625rem 1.25rem", cursor: "pointer" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button type="button" onClick={() => setActiveTab("skills")} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#F5A623", color: "#0D1B2A", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.625rem 1.5rem", borderRadius: "9999px", border: "none", cursor: "pointer" }} className="btn-gold">
                    Next: Skills <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── SKILLS TAB ───────────────────────────────────── */}
            {activeTab === "skills" && (
              <div>
                <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", color: "#7A9BB5", marginBottom: "1rem" }}>
                  Add up to <strong style={{ color: "#FFFFFF" }}>10 skills</strong>. Type a skill and press{" "}
                  <strong style={{ color: "#F5A623" }}>Enter</strong> or click Add.
                </p>

                {/* Tag input */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addSkill(skillInput);
                      }
                    }}
                    placeholder="e.g. Microsoft Excel"
                    disabled={skills.length >= 10}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill(skillInput)}
                    disabled={skills.length >= 10 || !skillInput.trim()}
                    style={{ backgroundColor: skills.length >= 10 ? "#1E3048" : "#F5A623", color: skills.length >= 10 ? "#7A9BB5" : "#0D1B2A", border: "none", borderRadius: "8px", padding: "0 1rem", cursor: skills.length >= 10 ? "not-allowed" : "pointer", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    Add
                  </button>
                </div>

                {/* Skill pills */}
                {skills.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", backgroundColor: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.3)", color: "#F5A623", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.8125rem", fontWeight: 500, padding: "0.3rem 0.75rem", borderRadius: "9999px" }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(idx)}
                          style={{ background: "none", border: "none", color: "#F5A623", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", lineHeight: 1, fontSize: "1rem" }}
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <Hint>{`${skills.length}/10 skills added`}</Hint>

                {/* Popular skills for the template */}
                <div style={{ marginTop: "1.25rem" }}>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", marginBottom: "0.5rem" }}>
                    Popular for your template:
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {(template === "hustler"
                      ? ["Social Media", "Canva", "WhatsApp Business", "TikTok Marketing", "Client Management", "Budgeting", "Digital Marketing", "Content Creation"]
                      : template === "graduate"
                      ? ["Microsoft Office", "Google Docs", "Teamwork", "Communication", "Problem Solving", "Time Management", "Customer Service", "Attention to Detail"]
                      : ["Project Management", "Microsoft Excel", "Report Writing", "Team Leadership", "Stakeholder Management", "Budget Management", "Presentation Skills", "Data Analysis"]
                    ).map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={skills.includes(s) || skills.length >= 10}
                        onClick={() => addSkill(s)}
                        style={{ backgroundColor: skills.includes(s) ? "#1E3048" : "#162236", border: "1px solid #1E3048", borderRadius: "9999px", color: skills.includes(s) ? "#3a4a5a" : "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", padding: "0.25rem 0.75rem", cursor: skills.includes(s) || skills.length >= 10 ? "not-allowed" : "pointer" }}
                      >
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <button type="button" onClick={() => setActiveTab("experience")} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid #1E3048", borderRadius: "9999px", color: "#7A9BB5", fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.875rem", padding: "0.625rem 1.25rem", cursor: "pointer" }}>
                    <ArrowLeft size={14} /> Back
                  </button>
                </div>
              </div>
            )}

            {/* ── Download / print section (always visible at bottom) ── */}
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #1E3048",
              }}
            >
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: downloading ? "#D4851A" : "#F5A623", color: "#0D1B2A", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.9375rem", padding: "0.75rem 1.75rem", borderRadius: "9999px", border: "none", cursor: downloading ? "not-allowed" : "pointer", transition: "background-color 0.2s" }}
                >
                  <Download size={16} />
                  <strong>{downloading ? "Generating PDF…" : "Download PDF"}</strong>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "transparent", color: "#FFFFFF", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 600, fontSize: "0.9375rem", padding: "0.75rem 1.5rem", borderRadius: "9999px", border: "1.5px solid rgba(255,255,255,0.3)", cursor: "pointer" }}
                  className="btn-ghost"
                >
                  <Printer size={16} /> Print
                </button>
              </div>

              <EmailCapture
                tipSheet="5 Things SA Employers Check Before They Even Read Your CV"
                pairedProduct="CV & Interview Pack — R147"
                payhipLink={PAYHIP_LINKS.cvInterviewPack}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Live Preview ──────────────────────────────────── */}
        <div className={`cv-preview-panel${showPreviewMobile ? " preview-visible" : ""}`}>
          <div
            style={{
              position: "sticky",
              top: "68px",
              padding: "1rem",
              overflowY: "auto",
              maxHeight: "calc(100vh - 68px)",
            }}
          >
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.75rem", color: "#7A9BB5", marginBottom: "0.75rem", textAlign: "center" }}>
              Live Preview — updates as you type
            </p>

            {/* CV preview — ref for html2canvas */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                border: "1px solid #1E3048",
              }}
            >
              <div ref={previewRef}>
                <CVPreview
                  template={template}
                  data={formData as Partial<CVData>}
                  skills={skills}
                />
              </div>
            </div>

            {/* Download inside preview panel too */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", backgroundColor: downloading ? "#D4851A" : "#F5A623", color: "#0D1B2A", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "0.875rem", padding: "0.625rem", borderRadius: "9999px", border: "none", cursor: downloading ? "not-allowed" : "pointer", marginTop: "0.875rem", transition: "background-color 0.2s" }}
            >
              <Download size={15} />
              <strong>{downloading ? "Generating…" : "Download PDF"}</strong>
            </button>
          </div>
        </div>
      </div>

      {/* CTA below builder */}
      <div
        style={{
          backgroundColor: "#111D2C",
          borderTop: "1px solid #1E3048",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9375rem", color: "#7A9BB5", margin: "0 0 1rem" }}>
          Want to <strong style={{ color: "#FFFFFF" }}>ace the interview</strong> too?
        </p>
        <a
          href={PAYHIP_LINKS.cvInterviewPack}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#F5A623", color: "#0D1B2A", fontFamily: "'DM Sans', system-ui, sans-serif", fontWeight: 700, fontSize: "1rem", padding: "0.75rem 2rem", borderRadius: "9999px", textDecoration: "none" }}
          className="btn-gold"
        >
          <strong>Get the CV & Interview Pack — R147</strong>
          <ArrowRight size={16} strokeWidth={2.5} />
        </a>
      </div>

      <style>{`
        .cv-split-screen {
          display: grid;
          grid-template-columns: 420px 1fr;
          min-height: calc(100vh - 110px);
          align-items: start;
        }
        .cv-form-panel {
          background-color: #0D1B2A;
          border-right: 1px solid #1E3048;
          min-height: calc(100vh - 110px);
        }
        .cv-preview-panel {
          background-color: #0a1520;
          padding: 0;
        }
        .show-mobile-btn { display: none !important; }

        @media (max-width: 960px) {
          .cv-split-screen {
            grid-template-columns: 1fr;
          }
          .cv-preview-panel {
            display: none;
          }
          .cv-preview-panel.preview-visible {
            display: block;
          }
          .show-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
