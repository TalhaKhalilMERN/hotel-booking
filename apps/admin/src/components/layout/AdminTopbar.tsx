import { AlertTriangle } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
}

export default function AdminTopbar({ title, subtitle }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-content-surface border-b border-content-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-text-primary leading-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Read-only notice */}
      <div
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-light text-gold-dark text-xs font-medium"
        title="Write operations require authentication. See roadmap."
      >
        <AlertTriangle size={12} aria-hidden="true" />
        <span>Read-only · No auth yet</span>
      </div>
    </header>
  );
}
