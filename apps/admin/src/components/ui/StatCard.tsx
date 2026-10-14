interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: React.ReactNode;
  accentColor?: "blue" | "gold" | "green" | "neutral";
}

const ACCENT_CLASSES: Record<string, string> = {
  blue: "text-blue-600 bg-blue-50",
  gold: "text-gold-dark bg-gold-light",
  green: "text-status-available bg-status-available-bg",
  neutral: "text-text-secondary bg-content-bg border border-content-border",
};

export default function StatCard({
  label,
  value,
  sub,
  icon,
  accentColor = "neutral",
}: StatCardProps) {
  return (
    <article className="stat-card" aria-label={`${label}: ${value}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider leading-tight">
          {label}
        </p>
        {icon && (
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${ACCENT_CLASSES[accentColor]}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary leading-none">{value}</p>
      {sub && <p className="text-xs text-text-muted leading-tight">{sub}</p>}
    </article>
  );
}
