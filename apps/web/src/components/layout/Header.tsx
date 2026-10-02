"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { Menu, X, Calendar } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Track in-page anchor sections (Amenities, Gallery) when on the homepage
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["amenities", "gallery"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    sections.forEach((sec) => observer.observe(sec));

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Determine active route or section
  const isHomeActive = pathname === "/" && activeSection === "";
  const isRoomsActive = pathname.startsWith("/rooms");
  const isAmenitiesActive = pathname === "/" && activeSection === "amenities";
  const isAboutActive = pathname === "/about";
  const isGalleryActive = pathname === "/" && activeSection === "gallery";
  const isContactActive = pathname === "/contact";

  const navItems = [
    { href: "/", label: "Home", isActive: isHomeActive },
    { href: "/rooms", label: "Rooms & Suites", isActive: isRoomsActive },
    { href: "/#amenities", label: "Amenities", isActive: isAmenitiesActive },
    { href: "/about", label: "About Us", isActive: isAboutActive },
    { href: "/#gallery", label: "Gallery", isActive: isGalleryActive },
    { href: "/contact", label: "Contact & Location", isActive: isContactActive },
  ];

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium py-1 transition-colors duration-200 ${
                item.isActive
                  ? "text-accent-blue"
                  : "text-text-secondary hover:text-accent-blue"
              }`}
            >
              <span>{item.label}</span>
              {/* Active Underline Indicator */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-accent-blue rounded-full transition-all duration-200 ${
                  item.isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
              />
            </Link>
          ))}
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
        <div className="md:hidden bg-white border-b border-border px-6 py-4 flex flex-col gap-1.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`relative flex items-center justify-between text-sm font-medium py-2.5 px-3.5 rounded-xl transition-all duration-200 ${
                item.isActive
                  ? "text-accent-blue bg-accent-blue-tint/50"
                  : "text-text-primary hover:text-accent-blue hover:bg-surface-warm"
              }`}
            >
              <span>{item.label}</span>
              {item.isActive && (
                <span className="w-1.5 h-4 bg-accent-blue rounded-full shrink-0" />
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
