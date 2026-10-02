"use client";

import { useState, useMemo } from "react";
import { ROOMS_DATA } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { RoomsSkeleton } from "@/components/ui/RoomCardSkeleton";
import { Filter, RotateCcw, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

export default function RoomsPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "empty" | "error" | "success">("idle");
  const [bedType, setBedType] = useState<string>("all");
  const [guestCount, setGuestCount] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [viewFilter, setViewFilter] = useState<string>("all");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setBedType("all");
    setGuestCount("all");
    setMaxPrice(25000);
    setViewFilter("all");
  };

  const filteredRooms = useMemo(() => {
    return ROOMS_DATA.filter((room) => {
      // Bed Type
      if (bedType !== "all") {
        if (bedType === "king" && !room.bedType.toLowerCase().includes("king")) return false;
        if (bedType === "queen" && !room.bedType.toLowerCase().includes("queen")) return false;
      }

      // Guest Count
      if (guestCount !== "all") {
        const count = parseInt(guestCount);
        if (room.capacity.adults < count) return false;
      }

      // Max Price
      if (room.pricePerNight > maxPrice) return false;

      // View
      if (viewFilter !== "all") {
        if (!room.view.toLowerCase().includes(viewFilter.toLowerCase())) return false;
      }

      return true;
    });
  }, [bedType, guestCount, maxPrice, viewFilter]);

  const activeFiltersCount =
    (bedType !== "all" ? 1 : 0) +
    (guestCount !== "all" ? 1 : 0) +
    (maxPrice < 25000 ? 1 : 0) +
    (viewFilter !== "all" ? 1 : 0);

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-accent-blue-tint/50 border-b border-border py-12 lg:py-16 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="badge-blue mb-2.5">Hamilton Accommodations</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-1 mb-3">
            Rooms & Suite Rates
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            All room rates are direct in Pakistani Rupees (PKR) and include complimentary breakfast, high-speed Wi-Fi, and 24/7 power backup.
          </p>
        </div>
      </section>

      {/* Main Container: Filter Sidebar + Room Results List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="btn-secondary px-4 py-2.5 text-xs font-bold inline-flex items-center gap-2"
          >
            <SlidersHorizontal size={15} className="text-accent-blue" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${mobileFilterOpen ? "rotate-180" : ""}`}
            />
          </button>

          <span className="text-xs text-text-secondary">
            Showing <strong className="text-text-primary">{filteredRooms.length}</strong> rooms
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          {/* Left Filter Sidebar */}
          <aside
            className={`lg:col-span-4 xl:col-span-3 ${
              mobileFilterOpen ? "block" : "hidden lg:block"
            } relative h-full`}
          >
            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 shadow-sm sticky top-24 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/70">
                <div className="flex items-center gap-2 font-heading font-bold text-base text-text-primary">
                  <Filter size={16} className="text-accent-blue" />
                  <span>Filter Results</span>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-accent-blue hover:text-accent-blue-hover inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Price Range Filter */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                    Max Price Per Night
                  </label>
                  <span className="text-xs font-bold text-accent-blue">
                    Rs. {maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </div>
                <input
                  type="range"
                  min="8500"
                  max="25000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-accent-blue cursor-pointer h-2 bg-surface-warm rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1">
                  <span>Rs. 8,500</span>
                  <span>Rs. 25,000</span>
                </div>
              </div>

              {/* Bed Type */}
              <div className="pt-2 border-t border-border/60">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                  Bedding Type
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "all", label: "All Bed Types" },
                    { id: "king", label: "King Bed" },
                    { id: "queen", label: "Queen / Twin Beds" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBedType(item.id)}
                      className={`text-left text-xs font-medium px-3 py-1.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        bedType === item.id
                          ? "bg-accent-blue-tint text-accent-blue font-bold"
                          : "text-text-secondary hover:bg-surface-warm"
                      }`}
                    >
                      <span>{item.label}</span>
                      {bedType === item.id && <Check size={14} className="text-accent-blue" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Count */}
              <div className="pt-2 border-t border-border/60">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                  Min Guests
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: "all", label: "Any" },
                    { id: "2", label: "2+" },
                    { id: "3", label: "3+" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setGuestCount(item.id)}
                      className={`text-center text-xs py-1.5 rounded-xl border transition-all cursor-pointer font-semibold ${
                        guestCount === item.id
                          ? "bg-accent-blue text-white border-accent-blue shadow-xs"
                          : "bg-surface-warm text-text-secondary border-border hover:border-accent-blue/40"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room View */}
              <div className="pt-2 border-t border-border/60">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                  Room View
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "all", label: "All Views" },
                    { id: "gt road", label: "GT Road Avenue View" },
                    { id: "courtyard", label: "Courtyard View" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setViewFilter(item.id)}
                      className={`text-left text-xs font-medium px-3 py-1.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                        viewFilter === item.id
                          ? "bg-accent-blue-tint text-accent-blue font-bold"
                          : "text-text-secondary hover:bg-surface-warm"
                      }`}
                    >
                      <span>{item.label}</span>
                      {viewFilter === item.id && <Check size={14} className="text-accent-blue" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right Results Column (Vertical List) */}
          <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {/* Header info bar */}
            <div className="hidden lg:flex items-center justify-between pb-3 border-b border-border/70 text-xs text-text-secondary">
              <span>
                Showing <strong className="text-text-primary font-bold">{filteredRooms.length}</strong> available rooms & suites
              </span>
              <span className="text-accent-blue font-medium">Direct Booking Guarantee &bull; PKR</span>
            </div>

            {/* Room List Cards & UI States */}
            {status === "loading" ? (
              <RoomsSkeleton />
            ) : status === "error" ? (
              <ErrorState onRetry={() => setStatus("idle")} />
            ) : filteredRooms.length === 0 ? (
              <EmptyState onAction={resetFilters} />
            ) : (
              filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} horizontal={true} />
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
