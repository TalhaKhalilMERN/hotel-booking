import Link from "next/link";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { MapPin, Phone, Mail, Check, Globe, Share2, Compass, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-200 border-t border-border-dark pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-accent-gold text-dark flex items-center justify-center rounded font-serif font-bold text-base shadow-sm">
                HH
              </div>
              <span className="font-serif text-xl font-semibold text-white">{HOTEL_INFO.name}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{HOTEL_INFO.tagline}</p>

            <div className="flex flex-col gap-2 mt-2">
              {HOTEL_INFO.guarantees.map((perk, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-accent-gold">
                  <Check size={14} className="shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-6 after:h-0.5 after:bg-accent-gold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/#amenities" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Hotel Amenities
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Location & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Rooms */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-6 after:h-0.5 after:bg-accent-gold">
              Rooms & Rates
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>
                <Link href="/rooms/std-01" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Classic King Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/dlx-02" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Deluxe Executive Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/exe-03" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Hamilton Master Suite
                </Link>
              </li>
              <li>
                <Link href="/rooms/twn-04" className="hover:text-accent-gold hover:translate-x-1 inline-block transition-all">
                  Family Twin Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-6 after:h-0.5 after:bg-accent-gold">
              Location & Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-accent-gold shrink-0 mt-0.5" />
                <a
                  href={HOTEL_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>{HOTEL_INFO.address}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={18} className="text-accent-gold shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={18} className="text-accent-gold shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Check-in: {HOTEL_INFO.checkInTime} &bull; Check-out: {HOTEL_INFO.checkOutTime}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {HOTEL_INFO.name}, {HOTEL_INFO.address}. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <a href={HOTEL_INFO.googleMapsUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-border-dark flex items-center justify-center text-slate-400 hover:border-accent-gold hover:text-accent-gold transition-all" aria-label="Google Maps Location">
              <Globe size={15} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-border-dark flex items-center justify-center text-slate-400 hover:border-accent-gold hover:text-accent-gold transition-all" aria-label="Share Location">
              <Share2 size={15} />
            </a>
            <a href="#location" className="w-8 h-8 rounded-full border border-border-dark flex items-center justify-center text-slate-400 hover:border-accent-gold hover:text-accent-gold transition-all" aria-label="Location Guide">
              <Compass size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
