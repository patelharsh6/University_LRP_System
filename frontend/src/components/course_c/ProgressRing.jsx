// src/components/course/ProgressRing.jsx
// Circular SVG progress indicator

export default function ProgressRing({
  percent = 0,
  size = 72,
  stroke = 6,
  color = "#2196f3",
  trackColor = "rgba(255,255,255,0.25)",
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(percent, 100) / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", display: "block" }}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={trackColor}
        strokeWidth={stroke}
      />
      {/* Fill */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }}
      />
    </svg>
  );
}
