import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message: string;
}

export default function ErrorState({
  title = "Failed to load data",
  message,
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-12 text-center"
      role="alert"
    >
      <AlertCircle size={36} className="text-red-400" aria-hidden="true" />
      <div>
        <p className="font-semibold text-text-primary">{title}</p>
        <p className="text-sm text-text-secondary mt-1 max-w-sm">{message}</p>
      </div>
    </div>
  );
}
