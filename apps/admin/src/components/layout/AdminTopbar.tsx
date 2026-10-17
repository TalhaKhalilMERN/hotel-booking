import { ShieldCheck } from "lucide-react";
import LogoutButton from "./LogoutButton";

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

      <div className="flex items-center gap-3">
        {/* Authenticated Admin Badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-status-available-bg text-status-available text-xs font-medium"
          title="Authenticated with administrator privileges"
        >
          <ShieldCheck size={13} aria-hidden="true" />
          <span>Admin Authenticated</span>
        </div>

        {/* Logout Action */}
        <LogoutButton />
      </div>
    </header>
  );
}
