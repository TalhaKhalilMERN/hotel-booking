import { Metadata } from "next";
import { HOTEL_INFO } from "@/data/hotelInfo";
import ContactForm from "@/components/contact/ContactForm";
import LocationSection from "@/components/location/LocationSection";
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact & Location | ${HOTEL_INFO.name}`,
  description: "Contact Hamilton Hotel & Suites front desk, view GT Road map directions, phone numbers, email reservations, and reception hours.",
};

export default function ContactPage() {
  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-surface border-b border-border py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="badge-blue mb-3.5 inline-flex items-center gap-1.5">
              <MessageSquare size={13} />
              Contact & Location
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-text-primary mt-1 mb-4 leading-tight">
              Get in Touch with Front Desk
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              We are located directly along GT Road, Hamilton. Whether you need room reservations, directions, or corporate inquiry details, our front desk team is at your service 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area: Contact Cards & Form */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-blue-tint text-accent-blue border border-accent-blue/20 flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Phone</span>
                <a href={`tel:${HOTEL_INFO.phone}`} className="font-heading text-sm font-bold text-text-primary hover:text-accent-blue transition-colors mt-0.5 block">
                  {HOTEL_INFO.phone}
                </a>
                <span className="text-xs text-text-muted mt-0.5 block">24/7 Desk Line</span>
              </div>
            </div>

            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-blue-tint text-accent-blue border border-accent-blue/20 flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Email</span>
                <a href={`mailto:${HOTEL_INFO.email}`} className="font-heading text-sm font-bold text-text-primary hover:text-accent-blue transition-colors mt-0.5 block truncate max-w-[170px]">
                  {HOTEL_INFO.email}
                </a>
                <span className="text-xs text-text-muted mt-0.5 block">Reservations & Info</span>
              </div>
            </div>

            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-blue-tint text-accent-blue border border-accent-blue/20 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Address</span>
                <a href={HOTEL_INFO.googleMapsUrl} target="_blank" rel="noreferrer" className="font-heading text-sm font-bold text-text-primary hover:text-accent-blue transition-colors mt-0.5 flex items-center gap-1">
                  <span>{HOTEL_INFO.address}</span>
                  <ExternalLink size={12} />
                </a>
                <span className="text-xs text-text-muted mt-0.5 block">GT Road Corridor</span>
              </div>
            </div>

            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent-gold-tint text-accent-gold border border-accent-gold/20 flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block">Hours</span>
                <span className="font-heading text-sm font-bold text-text-primary mt-0.5 block">
                  Check-in: {HOTEL_INFO.checkInTime}
                </span>
                <span className="text-xs text-text-muted mt-0.5 block">Check-out: {HOTEL_INFO.checkOutTime}</span>
              </div>
            </div>
          </div>

          {/* Form & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Quick Info Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="card-base p-6 rounded-2xl bg-white border border-border/70 flex flex-col gap-4">
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Direct Booking Benefits
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Booking directly with our front desk or website guarantees the lowest available room rate with zero third-party platform fees.
                </p>
                <div className="flex flex-col gap-2 pt-2 border-t border-border/60 text-xs font-semibold text-text-primary">
                  {HOTEL_INFO.guarantees.map((guarantee, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                      <span>{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-base p-6 rounded-2xl bg-surface-warm border border-border/70">
                <h4 className="font-heading text-sm font-bold text-text-primary mb-1">
                  Driving Directions & Highway Entry
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Look for the prominent blue Hamilton Hotel & Suites entrance sign directly along the northbound lane of GT Road. Guarded entry is open 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Location Component */}
      <LocationSection />
    </div>
  );
}
