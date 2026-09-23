"use client";

import { useState } from "react";
import { GALLERY_ITEMS } from "@/data/hotelInfo";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);

  const categories = [
    { id: "all", label: "All spaces" },
    { id: "rooms", label: "Rooms" },
    { id: "dining", label: "Dining" },
    { id: "atmosphere", label: "Grounds" },
  ];

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const activeIndex = featuredIndex % filteredItems.length;
  const currentItem = filteredItems[activeIndex] || filteredItems[0];
  const sideItems = filteredItems.filter((_, idx) => idx !== activeIndex).slice(0, 2);

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section className="py-20 bg-surface border-y border-border scroll-mt-28 relative z-10" id="gallery">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-blue mb-2.5">Hotel Spaces</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mt-1">
            Photos & Spaces on GT Road
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-2 leading-relaxed">
            Take a look around our guest rooms, dining hall, and secure entrance area on GT Road, Hamilton.
          </p>
        </div>

        {/* Filter Bar (Pill Chips) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setFeaturedIndex(0);
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${isActive
                  ? "bg-accent-blue text-white border-accent-blue shadow-xs"
                  : "bg-accent-blue-tint text-accent-blue border-accent-blue/15 hover:bg-accent-blue hover:text-white"
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 2:1 Large-Image + Side-Thumbnails Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Main Featured Large Image - 8 Columns */}
          <div className="lg:col-span-8 relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-border/70 shadow-elevated bg-surface-warm group">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Top-Right Image Counter Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold text-text-primary shadow-sm border border-border/50">
              {activeIndex + 1} / {filteredItems.length}
            </div>

            {/* Bottom-Left Caption Pill */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold text-text-primary shadow-sm border border-border/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-blue" />
              <span>{currentItem.title}</span>
            </div>

            {/* Left / Right Arrow Navigation Buttons */}
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-text-primary shadow-elevated hover:scale-105 transition-all flex items-center justify-center border border-border/60 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent-blue text-white shadow-elevated hover:bg-accent-blue-hover hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Side Stacked Smaller Thumbnails - 4 Columns */}
          <div className="lg:col-span-4 h-[380px] sm:h-[460px] flex flex-col sm:flex-row lg:flex-col gap-5">
            {sideItems.map((item) => {
              const originalIndex = filteredItems.findIndex((fi) => fi.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setFeaturedIndex(originalIndex >= 0 ? originalIndex : 0)}
                  className="flex-1 relative h-48 sm:h-52 lg:h-[218px] rounded-2xl overflow-hidden border border-border/70 shadow-sm bg-surface-warm group cursor-pointer hover:border-accent-blue/50 transition-all"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white bg-text-primary/60 backdrop-blur-xs px-2.5 py-1 rounded-full">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
