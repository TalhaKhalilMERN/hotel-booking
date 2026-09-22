import { HOTEL_INFO } from "@/data/hotelInfo";
import { ShieldCheck, MapPin } from "lucide-react";

export default function HotelAboutSection() {
  return (
    <section className="py-20 bg-bg-warm" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <span className="badge-gold">About Our Hotel</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mt-3 mb-5 leading-tight">
              Hospitality & Comfort in Hamilton along GT Road
            </h2>

            <p className="text-base font-medium text-primary leading-relaxed mb-4">
              {HOTEL_INFO.name} offers clean, modern guest accommodations tailored for business travelers, families, and road visitors along GT Road, Hamilton, Pakistan.
            </p>

            <p className="text-sm md:text-base text-muted-text leading-relaxed mb-8">
              Our 45 rooms feature comfortable bedding, independent air conditioning, hot shower water, generator backup, and high-speed Wi-Fi connectivity. Whether visiting Hamilton for work or stopping over during highway travel, enjoy our round-the-clock service and secure on-site parking.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border-light">
              <div>
                <div className="font-serif text-3xl font-bold text-accent-gold mb-1">45</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-text">Guest Rooms</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-accent-gold mb-1">24/7</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-text">Reception & Security</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-accent-gold mb-1">PKR</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-text">Direct Rates</div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="w-full h-[420px] rounded-lg overflow-hidden shadow-lg border border-border-light">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Hamilton Hotel GT Road Lounge Interior"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 right-6 bg-primary text-white p-5 rounded-lg border border-border-dark shadow-xl max-w-[240px]">
              <div className="flex items-center gap-1.5 text-accent-gold font-serif font-semibold text-base mb-1">
                <ShieldCheck size={16} />
                <span>Prime GT Road Location</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Easy highway access with subterranean secure parking and fast check-in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
