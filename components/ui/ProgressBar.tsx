interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div style={{ width: "100%" }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            color: "#7A9BB5",
          }}
        >
          {label ?? `Question ${current} of ${total}`}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#F5A623",
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          width: "100%",
          height: "6px",
          backgroundColor: "#1E3048",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={label ?? `Step ${current} of ${total}`}
      >
        {/* Fill */}
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: "#F5A623",
            borderRadius: "9999px",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}
