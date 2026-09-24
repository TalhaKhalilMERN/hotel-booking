"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface AvailabilitySearchProps {
  compact?: boolean;
}

export default function AvailabilitySearch({ compact = false }: AvailabilitySearchProps) {
  const router = useRouter();

  // Initialize as empty strings so server and client render identically on first pass.
  // useEffect computes real dates only after hydration completes on the client.
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");

  useEffect(() => {
    const todayDate = new Date();
    const checkOutDate = new Date();
    checkOutDate.setDate(todayDate.getDate() + 2);

    setCheckIn(todayDate.toISOString().split("T")[0]);
    setCheckOut(checkOutDate.toISOString().split("T")[0]);
  }, []);

  // Derived today string for the `min` attribute — safe because this also
  // runs on the client (inside a "use client" component, attributes are
  // only meaningful after hydration anyway).
  const todayMin = checkIn || undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      rooms: "1",
    }).toString();

    router.push(`/rooms?${query}`);
  };

  return (
    <div className="bg-surface border border-border/80 rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-elevated relative z-20">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4 lg:gap-6">
        {/* 3 Fields Container: Evenly-spaced columns with vertical dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border flex-1 items-center">
          {/* Check-In Field */}
          <div className="flex flex-col text-left px-2 sm:px-4 py-2 sm:py-0">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-text-muted mb-1 block">
              CHECK-IN
            </span>
            <input
              type="date"
              value={checkIn}
              min={todayMin}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full font-heading text-sm sm:text-base font-bold text-text-primary bg-transparent outline-none cursor-pointer p-0 border-0 focus:ring-0"
              required
            />
          </div>

          {/* Check-Out Field */}
          <div className="flex flex-col text-left px-2 sm:px-4 py-2 sm:py-0">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-text-muted mb-1 block">
              CHECK-OUT
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || undefined}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full font-heading text-sm sm:text-base font-bold text-text-primary bg-transparent outline-none cursor-pointer p-0 border-0 focus:ring-0"
              required
            />
          </div>

          {/* Guests Field */}
          <div className="flex flex-col text-left px-2 sm:px-4 py-2 sm:py-0">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-text-muted mb-1 block">
              GUESTS
            </span>
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-full font-heading text-sm sm:text-base font-bold text-text-primary bg-transparent outline-none cursor-pointer p-0 border-0 focus:ring-0 appearance-none"
            >
              <option value="1">1 adult</option>
              <option value="2">2 adults</option>
              <option value="3">3 adults</option>
              <option value="4">4 adults</option>
              <option value="family">Family (2+2)</option>
            </select>
          </div>
        </div>

        {/* Search CTA Button */}
        <div className="md:pl-2 shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto h-12 px-7 sm:px-8 flex items-center justify-center gap-2 text-sm font-bold text-white bg-accent-blue hover:bg-accent-blue-hover rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98]"
          >
            <span>Search</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {!compact && (
        <div className="mt-3 pt-3 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-text-muted">
          <span>Official Direct Rate: <strong className="text-text-primary font-semibold">DIRECT-PKR</strong></span>
          <span className="text-accent-blue font-medium">&bull; Free breakfast and flexible cancellation included</span>
        </div>
      )}
    </div>
  );
}
