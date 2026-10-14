"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  Building2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/room-types", label: "Room Types", icon: BedDouble },
  { href: "/hotel", label: "Hotel Details", icon: Building2 },
];

const COMING_SOON: NavItem[] = [
  { href: "#", label: "Bookings", icon: AlertCircle, badge: "Soon" },
  { href: "#", label: "Physical Rooms", icon: AlertCircle, badge: "Soon" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar shadow-sidebar" aria-label="Admin navigation">
      {/* ── Logo / Brand ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-DEFAULT/20 shrink-0"
          aria-hidden="true"
        >
          <span className="text-gold-DEFAULT font-bold text-sm select-none">H</span>
        </div>
        <div className="min-w-0">
          <p className="text-sidebar-text-active font-semibold text-sm leading-tight truncate">
            Hamilton Hotel
          </p>
          <p className="text-sidebar-text text-xs leading-tight truncate">
            Admin Panel
          </p>
        </div>
      </div>

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Main admin navigation">
        <p className="px-3 pb-2 text-[10px] font-semibold text-sidebar-text/50 uppercase tracking-widest">
          Overview
        </p>

        <ul className="space-y-0.5" role="list">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 group ${
                    active
                      ? "bg-sidebar-accent/20 text-sidebar-text-active font-medium"
                      : "text-sidebar-text hover:bg-sidebar-surface hover:text-sidebar-text-active"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    size={16}
                    className={active ? "text-sidebar-accent" : "text-sidebar-text group-hover:text-sidebar-text-active"}
                  />
                  <span className="flex-1 truncate">{label}</span>
                  {active && (
                    <ChevronRight size={14} className="text-sidebar-accent shrink-0" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Coming soon section */}
        <p className="px-3 pt-5 pb-2 text-[10px] font-semibold text-sidebar-text/50 uppercase tracking-widest">
          Management
        </p>
        <ul className="space-y-0.5" role="list">
          {COMING_SOON.map(({ href, label, icon: Icon, badge }) => (
            <li key={label}>
              <span
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-text/40 cursor-not-allowed select-none"
                aria-label={`${label} — coming soon`}
                title="Coming soon — requires authentication"
              >
                <Icon size={16} className="text-sidebar-text/30" aria-hidden="true" />
                <span className="flex-1 truncate">{label}</span>
                {badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sidebar-surface text-sidebar-text/50 font-medium">
                    {badge}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-text/40 leading-tight">
          Read-only view
          <br />
          Auth required for writes
        </p>
      </div>
    </aside>
  );
}
