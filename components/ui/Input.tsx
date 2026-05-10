"use client";

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export default function Input({ label, error, hint, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        style={{
          backgroundColor: "#162236",
          border: error ? "1px solid #EF4444" : "1px solid #1E3048",
          borderRadius: "8px",
          padding: "0.625rem 1rem",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.9375rem",
          color: "#FFFFFF",
          outline: "none",
          width: "100%",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => {
          if (!error) (e.target as HTMLInputElement).style.borderColor = "#F5A623";
        }}
        onBlur={(e) => {
          if (!error) (e.target as HTMLInputElement).style.borderColor = "#1E3048";
        }}
        {...props}
      />

      {error && (
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#EF4444",
          }}
        >
          {error}
        </span>
      )}

      {hint && !error && (
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A9BB5",
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
