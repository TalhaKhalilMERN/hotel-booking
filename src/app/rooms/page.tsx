"use client";

import { useState } from "react";
import { ROOMS_DATA } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { Filter } from "lucide-react";

export default function RoomsPage() {
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "suite") return room.name.toLowerCase().includes("suite");
    if (filterCategory === "king") return room.bedType.toLowerCase().includes("king");
    if (filterCategory === "family") return room.bedType.toLowerCase().includes("queen") || room.name.toLowerCase().includes("family");
    return true;
  });

  return (
    <div className="bg-bg-warm min-h-screen">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="badge-gold">Hamilton Accommodations</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mt-3 mb-3">
            Rooms & Suite Rates
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            All room rates are in Pakistani Rupees (PKR) and include complimentary breakfast, high-speed Wi-Fi, and 24/7 reception support.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-surface border-b border-border-light py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase text-muted-text mr-2 flex items-center gap-1">
              <Filter size={13} className="text-accent-gold" />
              Filter By:
            </span>

            <button
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                filterCategory === "all"
                  ? "bg-primary text-white border-primary"
                  : "bg-bg-warm text-text-main border-border-light hover:border-accent-gold hover:text-accent-gold"
              }`}
              onClick={() => setFilterCategory("all")}
            >
              All Rooms ({ROOMS_DATA.length})
            </button>
            <button
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                filterCategory === "king"
                  ? "bg-primary text-white border-primary"
                  : "bg-bg-warm text-text-main border-border-light hover:border-accent-gold hover:text-accent-gold"
              }`}
              onClick={() => setFilterCategory("king")}
            >
              King Rooms
            </button>
            <button
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                filterCategory === "suite"
                  ? "bg-primary text-white border-primary"
                  : "bg-bg-warm text-text-main border-border-light hover:border-accent-gold hover:text-accent-gold"
              }`}
              onClick={() => setFilterCategory("suite")}
            >
              Master Suites
            </button>
            <button
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                filterCategory === "family"
                  ? "bg-primary text-white border-primary"
                  : "bg-bg-warm text-text-main border-border-light hover:border-accent-gold hover:text-accent-gold"
              }`}
              onClick={() => setFilterCategory("family")}
            >
              Family Rooms
            </button>
          </div>

          <div className="text-xs text-muted-text">
            Showing <strong className="text-primary">{filteredRooms.length}</strong> room categories
          </div>
        </div>
      </section>

      {/* Main Rooms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
