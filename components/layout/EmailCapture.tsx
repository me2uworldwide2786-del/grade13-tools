"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";

interface EmailCaptureProps {
  tipSheet: string;
  pairedProduct: string;
  payhipLink: string;
}

export default function EmailCapture({
  tipSheet,
  pairedProduct,
  payhipLink,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");

    /* Stub — wire to Mailchimp/ConvertKit API route in production */
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      style={{
        border: "1px solid rgba(245,166,35,0.35)",
        borderRadius: "16px",
        padding: "2rem",
        backgroundColor: "rgba(245,166,35,0.04)",
        marginTop: "2.5rem",
      }}
    >
      {submitted ? (
        /* Success state */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0.75rem",
          }}
        >
          <CheckCircle size={36} color="#22C55E" strokeWidth={1.75} />
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            You&apos;re in!
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.9375rem",
              color: "#7A9BB5",
              margin: 0,
              maxWidth: "420px",
            }}
          >
            Check your inbox for{" "}
            <strong style={{ color: "#FFFFFF" }}>{tipSheet}</strong>.
          </p>
          <a
            href={payhipLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              backgroundColor: "#F5A623",
              color: "#0D1B2A",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "0.9375rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "9999px",
              textDecoration: "none",
              marginTop: "0.5rem",
            }}
          >
            <strong>Get {pairedProduct}</strong>
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      ) : (
        /* Form state */
        <>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <Mail
              size={20}
              color="#F5A623"
              strokeWidth={1.75}
              style={{ flexShrink: 0, marginTop: "2px" }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#FFFFFF",
                  margin: "0 0 0.25rem",
                }}
              >
                Drop your email — get a free bonus tip sheet:
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.9375rem",
                  color: "#F5A623",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{tipSheet}&rdquo;
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="your@email.com"
              required
              style={{
                flex: "1 1 200px",
                backgroundColor: "#162236",
                border: error ? "1px solid #EF4444" : "1px solid #1E3048",
                borderRadius: "9999px",
                padding: "0.625rem 1.25rem",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.9375rem",
                color: "#FFFFFF",
                outline: "none",
                minWidth: "0",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "#F5A623";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "#1E3048";
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                backgroundColor: loading ? "#D4851A" : "#F5A623",
                color: "#0D1B2A",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "0.625rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s",
              }}
            >
              <strong>{loading ? "Sending…" : "Get My Tip Sheet"}</strong>
              {!loading && <ArrowRight size={14} strokeWidth={2.5} />}
            </button>
          </form>

          {error && (
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.8125rem",
                color: "#EF4444",
                margin: "0.5rem 0 0 1.25rem",
              }}
            >
              {error}
            </p>
          )}

          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.75rem",
              color: "#7A9BB5",
              margin: "0.875rem 0 0",
            }}
          >
            No spam. Unsubscribe anytime.{" "}
            <strong style={{ color: "#7A9BB5" }}>Grade 13</strong> respects
            your inbox. Pairs with:{" "}
            <a
              href={payhipLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#F5A623", textDecoration: "underline" }}
            >
              {pairedProduct}
            </a>
          </p>
        </>
      )}
    </div>
  );
}
