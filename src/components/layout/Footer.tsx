import Link from "next/link";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { MapPin, Phone, Mail, Check, Globe, Share2, Compass, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-text-primary border-t border-border pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-text-primary text-white flex items-center justify-center rounded-xl font-heading font-bold text-sm tracking-tight shadow-xs">
                HH
              </div>
              <span className="font-heading text-lg font-bold text-text-primary">{HOTEL_INFO.name}</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">{HOTEL_INFO.tagline}</p>

            <div className="flex flex-col gap-2 mt-2">
              {HOTEL_INFO.guarantees.map((perk, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-accent-blue font-medium">
                  <Check size={14} className="shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border/80">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-secondary">
              <li>
                <Link href="/" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/#amenities" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Hotel Amenities
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Location & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border/80">
              Rooms & Rates
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-text-secondary">
              <li>
                <Link href="/rooms/std-01" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Classic King Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/dlx-02" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Deluxe Executive Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/exe-03" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Hamilton Master Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms/twn-04" className="hover:text-accent-blue hover:translate-x-1 inline-block transition-all">
                  Family Twin Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-text-primary uppercase tracking-wider mb-4 pb-2 border-b border-border/80">
              Location & Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-text-secondary">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-accent-blue shrink-0 mt-0.5" />
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-blue transition-colors inline-flex items-center gap-1 font-medium text-text-primary"
                >
                  <span>{HOTEL_INFO.address}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={18} className="text-accent-blue shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={18} className="text-accent-blue shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </div>
              <div className="mt-2 text-xs text-text-muted">
                Check-in: {HOTEL_INFO.checkInTime} &bull; Check-out: {HOTEL_INFO.checkOutTime}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} {HOTEL_INFO.name}, {HOTEL_INFO.address}. All rights reserved.
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-surface-warm border border-border flex items-center justify-center text-text-secondary hover:bg-accent-blue hover:text-white hover:border-accent-blue transition-all"
              aria-label="Google Maps Location"
            >
              <Globe size={14} />
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-surface-warm border border-border flex items-center justify-center text-text-secondary hover:bg-accent-blue hover:text-white hover:border-accent-blue transition-all"
              aria-label="Share Location"
            >
              <Share2 size={14} />
            </a>
            <a
              href="#location"
              className="w-8 h-8 rounded-full bg-surface-warm border border-border flex items-center justify-center text-text-secondary hover:bg-accent-blue hover:text-white hover:border-accent-blue transition-all"
              aria-label="Location Guide"
            >
              <Compass size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
