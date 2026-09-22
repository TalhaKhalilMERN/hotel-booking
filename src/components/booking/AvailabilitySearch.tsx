"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, DoorOpen, Search, UserCheck } from "lucide-react";
import { HOTEL_INFO } from "@/data/hotelInfo";

interface AvailabilitySearchProps {
  compact?: boolean;
}

export default function AvailabilitySearch({ compact = false }: AvailabilitySearchProps) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 2);
  const tomorrow = tomorrowObj.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [rooms, setRooms] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
    }).toString();
    
    router.push(`/rooms?${query}`);
  };

  return (
    <div className="bg-surface border border-border-light rounded-lg p-5 lg:p-6 shadow-xl relative z-10">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Check-In */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-text flex items-center gap-1">
            <Calendar size={13} className="text-accent-gold" />
            <span>Check-In</span>
          </label>
          <div className="relative flex items-center">
            <Calendar size={16} className="absolute left-3 text-accent-gold pointer-events-none" />
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium text-primary bg-bg-warm border border-border-light rounded outline-none focus:border-accent-gold focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Check-Out */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-text flex items-center gap-1">
            <Calendar size={13} className="text-accent-gold" />
            <span>Check-Out</span>
          </label>
          <div className="relative flex items-center">
            <Calendar size={16} className="absolute left-3 text-accent-gold pointer-events-none" />
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium text-primary bg-bg-warm border border-border-light rounded outline-none focus:border-accent-gold focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        {/* Adults */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-text flex items-center gap-1">
            <Users size={13} className="text-accent-gold" />
            <span>Adults</span>
          </label>
          <div className="relative flex items-center">
            <Users size={16} className="absolute left-3 text-accent-gold pointer-events-none" />
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium text-primary bg-bg-warm border border-border-light rounded outline-none focus:border-accent-gold focus:bg-white transition-all cursor-pointer appearance-none"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>
        </div>

        {/* Children */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-text flex items-center gap-1">
            <UserCheck size={13} className="text-accent-gold" />
            <span>Children</span>
          </label>
          <div className="relative flex items-center">
            <UserCheck size={16} className="absolute left-3 text-accent-gold pointer-events-none" />
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium text-primary bg-bg-warm border border-border-light rounded outline-none focus:border-accent-gold focus:bg-white transition-all cursor-pointer appearance-none"
            >
              <option value="0">0 Children</option>
              <option value="1">1 Child</option>
              <option value="2">2 Children</option>
              <option value="3">3 Children</option>
            </select>
          </div>
        </div>

        {/* Rooms */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-text flex items-center gap-1">
            <DoorOpen size={13} className="text-accent-gold" />
            <span>Rooms</span>
          </label>
          <div className="relative flex items-center">
            <DoorOpen size={16} className="absolute left-3 text-accent-gold pointer-events-none" />
            <select
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm font-medium text-primary bg-bg-warm border border-border-light rounded outline-none focus:border-accent-gold focus:bg-white transition-all cursor-pointer appearance-none"
            >
              <option value="1">1 Room</option>
              <option value="2">2 Rooms</option>
              <option value="3">3 Rooms</option>
            </select>
          </div>
        </div>

        {/* Search CTA Button */}
        <div>
          <button type="submit" className="w-full h-11 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent-gold hover:bg-gold-hover rounded transition-all shadow-sm cursor-pointer">
            <Search size={16} />
            <span>Search Rooms</span>
          </button>
        </div>
      </form>

      {!compact && (
        <div className="mt-4 pt-3 border-t border-dashed border-border-light flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-text">
          <span>Direct booking rate code: <strong className="text-primary">DIRECT-PKR</strong></span>
          <span className="text-accent-gold font-semibold">&bull; Complimentary breakfast included with all rooms</span>
        </div>
      )}
    </div>
  );
}
