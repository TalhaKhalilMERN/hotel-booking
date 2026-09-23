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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border transition-all duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
          <div className="w-10 h-10 bg-text-primary text-white flex items-center justify-center rounded-xl font-heading font-bold text-sm tracking-tight shadow-xs">
            HH
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg md:text-xl font-bold text-text-primary leading-none group-hover:text-accent-blue transition-colors">
              {HOTEL_INFO.name}
            </span>
            <span className="text-[11px] font-medium text-text-muted mt-1">
              GT Road, Hamilton &bull; Pakistan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link href="/" className="text-sm font-medium text-text-secondary hover:text-accent-blue transition-colors py-1">
            Home
          </Link>
          <Link href="/rooms" className="text-sm font-medium text-text-secondary hover:text-accent-blue transition-colors py-1">
            Rooms & Suites
          </Link>
          <Link href="/#amenities" className="text-sm font-medium text-text-secondary hover:text-accent-blue transition-colors py-1">
            Amenities
          </Link>
          <Link href="/#about" className="text-sm font-medium text-text-secondary hover:text-accent-blue transition-colors py-1">
            About Us
          </Link>
          <Link href="/#gallery" className="text-sm font-medium text-text-secondary hover:text-accent-blue transition-colors py-1">
            Gallery
          </Link>
          <Link href="/#location" className="text-sm font-medium text-text-secondary hover:text-accent-blue transition-colors py-1">
            Location
          </Link>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <Link href="/rooms" className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-text-primary bg-surface border border-border rounded-full hover:bg-surface-warm transition-all">
            Rooms
          </Link>

          <Link href="/rooms" className="btn-primary px-4 py-2 text-xs font-semibold">
            <Calendar size={14} />
            <span>Book now</span>
          </Link>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 bg-transparent border border-border rounded-full text-text-primary hover:border-accent-blue hover:text-accent-blue transition-colors cursor-pointer"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border px-6 py-5 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <Link href="/" className="text-sm font-medium text-text-primary py-2 border-b border-border/60 hover:text-accent-blue" onClick={closeMobileMenu}>
            Home
          </Link>
          <Link href="/rooms" className="text-sm font-medium text-text-primary py-2 border-b border-border/60 hover:text-accent-blue" onClick={closeMobileMenu}>
            Rooms & Suites
          </Link>
          <Link href="/#amenities" className="text-sm font-medium text-text-primary py-2 border-b border-border/60 hover:text-accent-blue" onClick={closeMobileMenu}>
            Amenities
          </Link>
          <Link href="/#about" className="text-sm font-medium text-text-primary py-2 border-b border-border/60 hover:text-accent-blue" onClick={closeMobileMenu}>
            About Us
          </Link>
          <Link href="/#gallery" className="text-sm font-medium text-text-primary py-2 border-b border-border/60 hover:text-accent-blue" onClick={closeMobileMenu}>
            Gallery
          </Link>
          <Link href="/#location" className="text-sm font-medium text-text-primary py-2 border-b border-border/60 hover:text-accent-blue" onClick={closeMobileMenu}>
            Location & Directions
          </Link>
        </div>
      )}
    </header>
  );
}
