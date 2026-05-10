import type { ReactNode } from "react";

type BadgeVariant = "gold" | "muted" | "success" | "warning" | "new";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const styles: Record<BadgeVariant, React.CSSProperties> = {
  gold: {
    backgroundColor: "rgba(245,166,35,0.15)",
    color: "#F5A623",
    border: "1px solid rgba(245,166,35,0.3)",
  },
  muted: {
    backgroundColor: "rgba(122,155,181,0.12)",
    color: "#7A9BB5",
    border: "1px solid rgba(122,155,181,0.2)",
  },
  success: {
    backgroundColor: "rgba(34,197,94,0.12)",
    color: "#22C55E",
    border: "1px solid rgba(34,197,94,0.25)",
  },
  warning: {
    backgroundColor: "rgba(239,68,68,0.12)",
    color: "#EF4444",
    border: "1px solid rgba(239,68,68,0.25)",
  },
  new: {
    backgroundColor: "rgba(245,166,35,0.15)",
    color: "#F5A623",
    border: "none",
  },
};

export default function Badge({ variant = "muted", children }: BadgeProps) {
  return (
    <span
      style={{
        ...styles[variant],
        display: "inline-block",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "0.6875rem",
        fontWeight: 600,
        padding: "0.2rem 0.625rem",
        borderRadius: "9999px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </span>
  );
}
