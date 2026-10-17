"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("from") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your administrator email address.");
      return;
    }
    if (!password) {
      setError("Please enter your administrator password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Generic failure message
        setError(data?.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      // Navigate to destination on success
      router.push(fromUrl);
      router.refresh();
    } catch {
      setError("Network error connecting to login service. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-sidebar-surface border border-sidebar-border rounded-xl shadow-sidebar p-8 backdrop-blur-sm">
      {error && (
        <div
          className="mb-6 flex items-start gap-3 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
          role="alert"
        >
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs font-semibold text-sidebar-text uppercase tracking-wider mb-2"
          >
            Admin Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sidebar-text/60">
              <Mail size={16} aria-hidden="true" />
            </div>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hamiltonhotel.pk"
              className="w-full pl-10 pr-4 py-2.5 bg-sidebar-bg border border-sidebar-border rounded-lg text-sidebar-text-active text-sm placeholder:text-sidebar-text/40 focus:outline-none focus:ring-2 focus:ring-sidebar-accent focus:border-sidebar-accent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block text-xs font-semibold text-sidebar-text uppercase tracking-wider mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sidebar-text/60">
              <Lock size={16} aria-hidden="true" />
            </div>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-sidebar-bg border border-sidebar-border rounded-lg text-sidebar-text-active text-sm placeholder:text-sidebar-text/40 focus:outline-none focus:ring-2 focus:ring-sidebar-accent focus:border-sidebar-accent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-sidebar-accent hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-sm disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <span>Sign In to Dashboard</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-sidebar-bg flex flex-col justify-center items-center px-4 py-12 selection:bg-gold-DEFAULT selection:text-white">
      {/* Decorative subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sidebar-surface via-sidebar-bg to-[#070b14] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gold-DEFAULT/20 text-gold-DEFAULT mb-3 ring-1 ring-gold-DEFAULT/30"
            aria-hidden="true"
          >
            <span className="font-bold text-xl select-none">H</span>
          </div>
          <h1 className="text-2xl font-bold text-sidebar-text-active tracking-tight">
            Hamilton Hotel
          </h1>
          <p className="text-sm text-sidebar-text mt-1">
            Management Panel Authentication
          </p>
        </div>

        {/* Suspense boundary for useSearchParams */}
        <Suspense
          fallback={
            <div className="bg-sidebar-surface border border-sidebar-border rounded-xl shadow-sidebar p-8 flex items-center justify-center">
              <Loader2 size={24} className="animate-spin text-sidebar-accent" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Footer info note */}
        <p className="text-center text-xs text-sidebar-text/50 mt-6">
          Restricted access · Authorized personnel only
        </p>
      </div>
    </div>
  );
}
