import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size    = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
  external?: boolean;
}

const sizeStyles: Record<Size, React.CSSProperties> = {
  sm: { padding: "0.4rem 1rem",   fontSize: "0.8125rem", gap: "0.3rem"  },
  md: { padding: "0.625rem 1.5rem", fontSize: "0.9375rem", gap: "0.375rem" },
  lg: { padding: "0.875rem 2rem", fontSize: "1.0625rem", gap: "0.5rem"  },
};

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#F5A623",
    color: "#0D1B2A",
    border: "none",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    border: "1.5px solid rgba(255,255,255,0.3)",
  },
  outline: {
    backgroundColor: "transparent",
    color: "#F5A623",
    border: "1.5px solid #F5A623",
  },
  danger: {
    backgroundColor: "transparent",
    color: "#EF4444",
    border: "1.5px solid #EF4444",
  },
};

const base: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "9999px",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
  transition: "background-color 0.2s, transform 0.15s, border-color 0.2s",
  lineHeight: 1,
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  type = "button",
  children,
  showArrow = false,
  external,
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...base,
    ...variantStyles[variant],
    ...sizeStyles[size],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const inner = (
    <>
      <strong>{children}</strong>
      {showArrow && <ArrowRight size={size === "lg" ? 18 : 14} strokeWidth={2.5} />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={style}
        className={`btn-${variant}`}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`btn-${variant}`}
    >
      {inner}
    </button>
  );
}
