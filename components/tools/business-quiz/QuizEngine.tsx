"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import QuizResult from "./QuizResult";
import { quizQuestions, determineStructure } from "@/lib/quiz-data";
import type { BusinessStructure } from "@/lib/quiz-data";

type Phase = "intro" | "quiz" | "result";

export default function QuizEngine() {
  const shouldReduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0); // 0-based index
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [justSelected, setJustSelected] = useState<string | null>(null);
  const [result, setResult] = useState<BusinessStructure | null>(null);
  const [slideDir, setSlideDir] = useState<1 | -1>(1); // 1=forward, -1=back

  const question   = quizQuestions[currentIndex];
  const totalQ     = quizQuestions.length;
  const isLastQ    = currentIndex === totalQ - 1;

  /* ── Start quiz ────────────────────────────────────────────────── */
  function startQuiz() {
    setPhase("quiz");
    setCurrentIndex(0);
    setAnswers({});
    setJustSelected(null);
    setResult(null);
  }

  /* ── Handle option selection ───────────────────────────────────── */
  function handleSelect(questionId: number, value: string) {
    if (justSelected !== null) return; // prevent double-tap during advance delay

    setJustSelected(value);
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const delay = shouldReduceMotion ? 100 : 650;

    setTimeout(() => {
      setJustSelected(null);
      if (isLastQ) {
        const determined = determineStructure(newAnswers);
        setResult(determined);
        setPhase("result");
      } else {
        setSlideDir(1);
        setCurrentIndex((i) => i + 1);
      }
    }, delay);
  }

  /* ── Retake quiz ───────────────────────────────────────────────── */
  function retake() {
    setPhase("intro");
    setCurrentIndex(0);
    setAnswers({});
    setJustSelected(null);
    setResult(null);
  }

  /* ── Animation variants ────────────────────────────────────────── */
  const variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir * 48,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir * -48,
      opacity: 0,
    }),
  };

  /* ── Intro phase ───────────────────────────────────────────────── */
  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1rem" }}
      >
        <div
          style={{
            backgroundColor: "#111D2C",
            border: "1px solid #1E3048",
            borderRadius: "20px",
            padding: "2.5rem 2rem",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "rgba(245,166,35,0.1)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              fontSize: "1.75rem",
            }}
          >
            🏛️
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#FFFFFF",
              margin: "0 0 1rem",
              lineHeight: 1.2,
            }}
          >
            Find your business structure in{" "}
            <span style={{ color: "#F5A623" }}>7 questions</span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9375rem",
              color: "#7A9BB5",
              lineHeight: 1.7,
              margin: "0 0 0.875rem",
            }}
          >
            Picking the wrong structure costs you money, time, and opportunities.
            Should you register a{" "}
            <strong style={{ color: "#FFFFFF" }}>PTY Ltd</strong>,{" "}
            <strong style={{ color: "#FFFFFF" }}>Sole Proprietor</strong>,{" "}
            <strong style={{ color: "#FFFFFF" }}>Partnership</strong>, or{" "}
            <strong style={{ color: "#FFFFFF" }}>NPC</strong>?
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9375rem",
              color: "#7A9BB5",
              lineHeight: 1.7,
              margin: "0 0 2rem",
            }}
          >
            Answer 7 plain-English questions and we&apos;ll tell you exactly
            which structure fits — and why. No jargon. No confusion. Just a
            clear recommendation.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginBottom: "2rem",
              padding: "1rem 0",
              borderTop: "1px solid #1E3048",
              borderBottom: "1px solid #1E3048",
            }}
          >
            {[
              ["7", "Questions"],
              ["4", "Possible results"],
              ["~2 min", "To complete"],
            ].map(([num, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "1.5rem",
                    color: "#F5A623",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "0.75rem",
                    color: "#7A9BB5",
                    marginTop: "0.25rem",
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={startQuiz}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#F5A623",
              color: "#0D1B2A",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.875rem 2rem",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
            }}
            className="btn-gold"
          >
            <strong>Start the Quiz</strong>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.75rem",
              color: "#7A9BB5",
              marginTop: "0.875rem",
              marginBottom: 0,
            }}
          >
            Free. No signup required.
          </p>
        </div>
      </motion.div>
    );
  }

  /* ── Result phase ──────────────────────────────────────────────── */
  if (phase === "result" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <QuizResult structure={result} onRetake={retake} />
      </motion.div>
    );
  }

  /* ── Quiz phase ────────────────────────────────────────────────── */
  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1rem" }}>

      {/* Progress bar */}
      <div style={{ marginBottom: "2rem" }}>
        <ProgressBar
          current={currentIndex + 1}
          total={totalQ}
          label={`Question ${currentIndex + 1} of ${totalQ}`}
        />
      </div>

      {/* Animated question card */}
      <AnimatePresence mode="wait" custom={slideDir}>
        <motion.div
          key={question.id}
          custom={slideDir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <div
            style={{
              backgroundColor: "#111D2C",
              border: "1px solid #1E3048",
              borderRadius: "20px",
              padding: "2rem 1.75rem 1.75rem",
            }}
          >
            {/* Question */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(1.1875rem, 2.5vw, 1.5rem)",
                color: "#FFFFFF",
                margin: "0 0 1.75rem",
                lineHeight: 1.3,
              }}
            >
              {question.question}
            </h3>

            {/* Answer options */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {question.options.map((opt) => {
                const isSelected =
                  justSelected === opt.value ||
                  (justSelected === null && answers[question.id] === opt.value);

                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(question.id, opt.value)}
                    disabled={justSelected !== null}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.875rem",
                      textAlign: "left",
                      backgroundColor: isSelected
                        ? "rgba(245,166,35,0.08)"
                        : "#162236",
                      border: isSelected
                        ? "2px solid #F5A623"
                        : "1px solid #1E3048",
                      borderRadius: "12px",
                      padding: "1rem 1.125rem",
                      cursor: justSelected !== null ? "default" : "pointer",
                      transition: "border-color 0.2s, background-color 0.15s",
                    }}
                    className={isSelected ? "" : "quiz-option-btn"}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        fontSize: "0.9375rem",
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? "#FFFFFF" : "#FFFFFF",
                        lineHeight: 1.45,
                        flex: 1,
                      }}
                    >
                      {opt.label}
                    </span>

                    {isSelected && (
                      <CheckCircle
                        size={20}
                        color="#F5A623"
                        strokeWidth={2}
                        style={{ flexShrink: 0 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Helper text */}
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.8125rem",
          color: "#7A9BB5",
          textAlign: "center",
          marginTop: "1.25rem",
        }}
      >
        {justSelected
          ? isLastQ
            ? "Calculating your result…"
            : "Moving to next question…"
          : "Select an option to continue"}
      </p>

      <style>{`
        .quiz-option-btn:hover {
          border-color: rgba(245,166,35,0.4) !important;
          background-color: rgba(245,166,35,0.04) !important;
        }
      `}</style>
    </div>
  );
}
