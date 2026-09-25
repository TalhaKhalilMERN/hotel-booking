import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something Went Wrong",
  message = "We encountered an issue loading room details or availability. Please try refreshing or retrying.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="card-elevated p-8 sm:p-12 rounded-3xl bg-white border border-border/70 text-center flex flex-col items-center justify-center gap-4 my-6">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center">
        <AlertTriangle size={32} />
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary mt-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2"
        >
          <RefreshCw size={14} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
