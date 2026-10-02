"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatters";
import { Calendar, ShieldCheck } from "lucide-react";

interface RoomBookingSidebarProps {
  roomName: string;
  pricePerNight: number;
  roomId?: string;
}

export default function RoomBookingSidebar({ roomName, pricePerNight, roomId = "dlx-02" }: RoomBookingSidebarProps) {
  // Start as empty strings — server and client render identically ("empty").
  // useEffect sets the real dates only after hydration on the client.
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const today = new Date();
    const checkOutDate = new Date();
    checkOutDate.setDate(today.getDate() + 2);

    setCheckIn(today.toISOString().split("T")[0]);
    setCheckOut(checkOutDate.toISOString().split("T")[0]);
  }, []);

  return (
    <div className="sticky top-24 card-elevated rounded-2xl bg-white border border-border/70 p-6 shadow-elevated flex flex-col gap-5">
      {/* Price Header */}
      <div className="flex items-baseline justify-between pb-4 border-b border-border/70">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
            Direct Rate
          </span>
          <div>
            <span className="font-heading text-3xl font-extrabold text-text-primary">
              {formatCurrency(pricePerNight)}
            </span>
            <span className="text-xs text-text-muted"> / night</span>
          </div>
        </div>
        <span className="badge-blue text-[11px]">Direct PKR</span>
      </div>

      {/* Date & Guest Inputs */}
      <div className="flex flex-col gap-3.5">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
            Check-In Date
          </label>
          <input
            type="date"
            value={checkIn}
            min={checkIn || undefined}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none transition-all cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
            Check-Out Date
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none transition-all cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
            Guests & Rooms
          </label>
          <select
            defaultValue="2 Adults"
            className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none cursor-pointer transition-all"
          >
            <option value="1 Adult">1 Adult</option>
            <option value="2 Adults">2 Adults</option>
            <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
            <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
          </select>
        </div>
      </div>

      <Link
        href={`/rooms/${roomId}/book`}
        className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        <Calendar size={17} />
        <span>Reserve {roomName}</span>
      </Link>

      <div className="bg-surface-warm border border-border/70 rounded-xl p-4 flex flex-col gap-1.5 text-xs text-text-secondary">
        <div className="flex items-center gap-1.5 font-bold text-text-primary">
          <ShieldCheck size={16} className="text-accent-blue" />
          <span>Direct Booking Benefits</span>
        </div>
        <span>
          Includes complimentary breakfast, fast Wi-Fi, generator power backup, and transparent direct pricing.
        </span>
      </div>
    </div>
  );
}
