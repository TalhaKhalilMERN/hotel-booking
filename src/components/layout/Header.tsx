"use client";

import { useState } from "react";
import Link from "next/link";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { Menu, X, Calendar } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-light transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
          <div className="w-10 h-10 bg-primary text-accent-gold flex items-center justify-center rounded font-serif font-bold text-lg tracking-tight shadow-sm">
            HH
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-semibold text-primary leading-none group-hover:text-accent-gold transition-colors">
              {HOTEL_INFO.name}
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-accent-gold mt-1">
              GT Road, Hamilton &bull; Pakistan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-text-main hover:text-accent-gold transition-colors py-1">
            Home
          </Link>
          <Link href="/rooms" className="text-sm font-medium text-text-main hover:text-accent-gold transition-colors py-1">
            Rooms & Suites
          </Link>
          <Link href="/#amenities" className="text-sm font-medium text-text-main hover:text-accent-gold transition-colors py-1">
            Amenities
          </Link>
          <Link href="/#about" className="text-sm font-medium text-text-main hover:text-accent-gold transition-colors py-1">
            About Us
          </Link>
          <Link href="/#gallery" className="text-sm font-medium text-text-main hover:text-accent-gold transition-colors py-1">
            Gallery
          </Link>
          <Link href="/#location" className="text-sm font-medium text-text-main hover:text-accent-gold transition-colors py-1">
            Location
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link href="/rooms" className="btn-accent px-4 py-2.5 text-xs">
            <Calendar size={15} />
            <span>Book Now</span>
          </Link>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-transparent border border-border-light rounded text-primary hover:border-accent-gold transition-colors cursor-pointer"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border-light px-6 py-4 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <Link href="/" className="text-base font-medium text-primary py-2 border-b border-dashed border-border-light" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link href="/rooms" className="text-base font-medium text-primary py-2 border-b border-dashed border-border-light" onClick={closeMobileMenu}>
            Rooms & Suites
          </Link>
          <Link href="/#amenities" className="text-base font-medium text-primary py-2 border-b border-dashed border-border-light" onClick={closeMobileMenu}>
            Amenities
          </Link>
          <Link href="/#about" className="text-base font-medium text-primary py-2 border-b border-dashed border-border-light" onClick={closeMobileMenu}>
            About Us
          </Link>
          <Link href="/#gallery" className="text-base font-medium text-primary py-2 border-b border-dashed border-border-light" onClick={closeMobileMenu}>
            Gallery
          </Link>
          <Link href="/#location" className="text-base font-medium text-primary py-2 border-b border-dashed border-border-light" onClick={closeMobileMenu}>
            Location & Directions
          </Link>
        </div>
      )}
    </header>
  );
}
