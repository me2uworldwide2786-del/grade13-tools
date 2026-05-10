"use client";

import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      {label && (
        <label
          htmlFor={selectId}
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

      <select
        id={selectId}
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
          cursor: "pointer",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237A9BB5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.875rem center",
          paddingRight: "2.5rem",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => {
          if (!error) (e.target as HTMLSelectElement).style.borderColor = "#F5A623";
        }}
        onBlur={(e) => {
          if (!error) (e.target as HTMLSelectElement).style.borderColor = "#1E3048";
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

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
