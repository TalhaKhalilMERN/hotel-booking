"use client";

import { useState } from "react";
import Link from "next/link";
import { Room } from "@/data/rooms";
import { formatCurrency } from "@/utils/formatters";
import { Star, Heart, ArrowRight, Wifi, Wind, Coffee, Tv } from "lucide-react";

interface RoomCardProps {
  room: Room;
  highlighted?: boolean;
  badgeText?: string;
  horizontal?: boolean;
}

export default function RoomCard({
  room,
  highlighted = false,
  badgeText,
  horizontal = false,
}: RoomCardProps) {
  const [saved, setSaved] = useState(false);

  // Map 2-3 icon amenities for chips
  const amenityChips = [
    { label: "Free Wi-Fi", icon: <Wifi size={12} /> },
    { label: "Generator AC", icon: <Wind size={12} /> },
    { label: "Breakfast", icon: <Coffee size={12} /> },
  ];

  return (
    <div
      className={`card-base overflow-hidden flex flex-col group relative ${
        highlighted ? "border-accent-blue/40 shadow-elevated" : ""
      } ${horizontal ? "sm:flex-row" : ""}`}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden bg-surface-warm ${
          horizontal
            ? "sm:w-64 md:w-72 lg:w-80 h-56 sm:h-auto min-h-[200px] shrink-0"
            : "w-full h-56 sm:h-60"
        }`}
      >
        <img
          src={room.heroImage}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Rating Badge (Top-Left) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 text-xs font-bold text-text-primary shadow-sm border border-border/50 flex items-center gap-1">
          <Star size={12} className="fill-accent-gold text-accent-gold" />
          <span>4.8</span>
        </div>

        {/* Highlight Tag if provided */}
        {(highlighted || badgeText) && (
          <div className="absolute bottom-3 left-3 bg-accent-gold text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
            {badgeText || "Most booked"}
          </div>
        )}

        {/* Heart / Save Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSaved(!saved);
          }}
          aria-label="Save room"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-text-primary hover:text-red-500 hover:scale-110 shadow-sm border border-border/50 flex items-center justify-center transition-all cursor-pointer"
        >
          <Heart
            size={14}
            className={saved ? "fill-red-500 text-red-500" : "text-text-primary"}
          />
        </button>
      </div>

      {/* Body: Natural Content Flow without Forced Blank Space */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent-blue transition-colors">
              {room.name}
            </h3>
          </div>

          {/* Short Spec Line */}
          <p className="text-xs text-text-muted mb-3">
            Up to {room.capacity.adults} guests &bull; {room.bedType} &bull; {room.sizeSqM} m²
          </p>

          {/* Amenity Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            {amenityChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-accent-blue bg-accent-blue-tint rounded-full"
              >
                {chip.icon}
                <span>{chip.label}</span>
              </span>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
            {room.description}
          </p>
        </div>

        {/* Footer Pricing & CTA */}
        <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
              Direct rate
            </span>
            <div>
              <span className="font-heading text-lg sm:text-xl font-extrabold text-text-primary">
                {formatCurrency(room.pricePerNight)}
              </span>
              <span className="text-xs text-text-muted"> / night</span>
            </div>
          </div>

          <Link
            href={`/rooms/${room.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-accent-blue hover:bg-accent-blue-hover rounded-full transition-all duration-200 shadow-xs hover:shadow-sm"
          >
            <span>View</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
