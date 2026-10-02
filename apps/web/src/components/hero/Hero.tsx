"use client";

import AvailabilitySearch from "../booking/AvailabilitySearch";
import { MapPin, Star } from "lucide-react";

export default function Hero() {
  const heroImage = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85";

  return (
    <section className="relative bg-accent-blue-tint/30 pt-6 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main Hero Container / Card */}
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-border/70 shadow-elevated min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          {/* Background Image: Crisp & clear with subtle lower-third gradient */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt="Hamilton Hotel GT Road"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle gradient overlay strictly on lower portion for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>

          {/* Top Row: Location Pill (Left) & Star Rating Badge (Right) */}
          <div className="relative z-10 flex items-start justify-between gap-4 w-full">
            {/* Location Pill */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-accent-blue bg-white/95 backdrop-blur-md border border-border/70 rounded-full shadow-sm">
              <MapPin size={13} className="text-accent-blue" />
              <span>GT Road, Hamilton</span>
            </span>

            {/* Floating Star-Rating Badge Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 px-4 sm:px-5 shadow-elevated border border-border/70 flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent-gold-tint flex items-center justify-center text-accent-gold shrink-0">
                <Star size={16} className="fill-accent-gold text-accent-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xs sm:text-sm font-bold text-text-primary leading-tight">
                  4.8 rating
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-text-secondary">
                  320 direct reviews
                </span>
              </div>
            </div>
          </div>

          {/* Hero Content (Bottom-anchored) */}
          <div className="relative z-10 max-w-2xl mt-auto pt-16 sm:pt-20">
            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-text-primary leading-[1.15] mb-2.5 tracking-tight">
              Comfortable stays on GT Road, Hamilton
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-text-secondary font-normal leading-relaxed mb-2 max-w-xl">
              45 rooms, free breakfast, easy direct booking.
            </p>
          </div>
        </div>

        {/* Floating Booking Widget Card */}
        <div className="relative -mt-8 sm:-mt-10 max-w-5xl mx-auto z-30 px-2 sm:px-4">
          <AvailabilitySearch />
        </div>
      </div>
    </section>
  );
}
