import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  surface?: "default" | "raised";
  hover?: boolean;
}

export default function Card({
  children,
  className,
  style,
  surface = "default",
  hover = false,
}: CardProps) {
  const bg = surface === "raised" ? "#162236" : "#111D2C";

  return (
    <div
      className={hover ? `stat-card ${className ?? ""}` : className}
      style={{
        backgroundColor: bg,
        border: "1px solid #1E3048",
        borderRadius: "16px",
        padding: "1.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
