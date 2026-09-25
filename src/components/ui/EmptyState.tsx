import { FilterX, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = "No Rooms Found",
  description = "No guest rooms match your selected price range, bed options, or view preferences. Try broadening your filter criteria.",
  actionLabel = "Clear All Filters",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="card-elevated p-8 sm:p-12 rounded-3xl bg-white border border-border/70 text-center flex flex-col items-center justify-center gap-4 my-6">
      <div className="w-16 h-16 rounded-2xl bg-accent-blue-tint text-accent-blue border border-accent-blue/20 flex items-center justify-center">
        <FilterX size={32} />
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-2 btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2"
        >
          <RefreshCw size={14} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
