import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  pairedProduct: string;
  isNew?: boolean;
}

export default function ToolCard({
  Icon,
  title,
  description,
  href,
  pairedProduct,
  isNew,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="tool-card-link"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111D2C",
        border: "1px solid #1E3048",
        borderRadius: "16px",
        padding: "1.5rem",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Icon row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "rgba(245,166,35,0.1)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={22} color="#F5A623" strokeWidth={1.75} />
        </div>

        {isNew && (
          <span
            style={{
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              fontSize: "0.6875rem",
              fontWeight: 600,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              padding: "0.2rem 0.625rem",
              borderRadius: "9999px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            New
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: "1.0625rem",
          color: "#FFFFFF",
          margin: "0 0 0.5rem",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>

      {/* Description — flex-grow pushes footer to bottom */}
      <p
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.875rem",
          color: "#7A9BB5",
          margin: "0 0 1.25rem",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {description}
      </p>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          color: "#F5A623",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.875rem",
          marginBottom: "1rem",
        }}
      >
        <ArrowRight size={14} strokeWidth={2.5} />
        <strong>Use for free</strong>
      </div>

      {/* Paired product badge */}
      <div
        style={{
          paddingTop: "0.875rem",
          borderTop: "1px solid #1E3048",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.75rem",
          color: "#7A9BB5",
        }}
      >
        Pairs with:{" "}
        <strong style={{ color: "#7A9BB5" }}>{pairedProduct}</strong>
      </div>
    </Link>
  );
}
