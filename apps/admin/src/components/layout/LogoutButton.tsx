"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch {
      // Proceed with navigation regardless
    } finally {
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg border border-content-border transition-colors duration-150 cursor-pointer disabled:opacity-50"
      title="Sign out of admin session"
      aria-label="Log out"
    >
      {isLoggingOut ? (
        <Loader2 size={13} className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOut size={13} aria-hidden="true" />
      )}
      <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}
