"use client";

import { useState } from "react";
import { GALLERY_ITEMS } from "@/data/hotelInfo";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Spaces" },
    { id: "rooms", label: "Rooms & Suites" },
    { id: "dining", label: "Dining" },
    { id: "atmosphere", label: "Atmosphere & Grounds" },
  ];

  const filteredItems = activeCategory === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-surface border-y border-border-light" id="gallery">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-gold">Photo Gallery</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mt-3">
            Hotel Spaces & Interior Overview
          </h2>
          <p className="text-sm md:text-base text-muted-text mt-3 leading-relaxed">
            Take a look inside Hamilton Hotel & Suites along GT Road, Pakistan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-white border-primary"
                  : "bg-transparent text-muted-text border-border-light hover:border-accent-gold hover:text-accent-gold"
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="relative h-72 rounded-lg overflow-hidden shadow-sm bg-dark group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-gold mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg text-white font-medium">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
