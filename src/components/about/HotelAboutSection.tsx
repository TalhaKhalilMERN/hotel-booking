import { HOTEL_INFO } from "@/data/hotelInfo";
import { ShieldCheck, Star, BedDouble, Zap, Shield, Sparkles } from "lucide-react";

export default function HotelAboutSection() {
  return (
    <section className="py-20 lg:py-24 bg-bg scroll-mt-24" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Single Soft-Shadowed White Card Wrapping the Whole Section */}
        <div className="card-elevated p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-border/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Narrative Column */}
            <div className="lg:col-span-7">
              <span className="badge-blue mb-3">About Our Hotel</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mt-1 mb-4 leading-tight">
                A Reliable Stay for Travelers on GT Road
              </h2>

              <p className="text-base font-semibold text-text-primary leading-relaxed mb-3">
                {HOTEL_INFO.name} is a 45-room hotel built for travelers, road trips, and business guests visiting Hamilton along the GT Road corridor.
              </p>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                We focus on what matters most on the road: clean rooms, hot showers, dependable generators so AC stays running without interruption, guarded parking, and hot fresh meals made to order.
              </p>

              {/* Stat-Chip Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-blue bg-accent-blue-tint rounded-full border border-accent-blue/15">
                  <BedDouble size={14} />
                  <span>45 AC Guest Rooms</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-gold bg-accent-gold-tint rounded-full border border-accent-gold/20">
                  <Star size={14} className="fill-accent-gold" />
                  <span>4.8 Guest Rating</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-blue bg-accent-blue-tint rounded-full border border-accent-blue/15">
                  <Zap size={14} />
                  <span>24/7 Power Backup</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-text-primary bg-surface-warm rounded-full border border-border">
                  <Shield size={14} />
                  <span>Guarded GT Road Parking</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-accent-blue">45</div>
                  <div className="text-xs font-semibold text-text-muted mt-0.5">Rooms</div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-accent-blue">24/7</div>
                  <div className="text-xs font-semibold text-text-muted mt-0.5">Desk & Generator</div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-accent-blue">0%</div>
                  <div className="text-xs font-semibold text-text-muted mt-0.5">Middleman Fee</div>
                </div>
              </div>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden shadow-card border border-border/70 bg-surface-warm">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                  alt="Hamilton Hotel GT Road Lounge Interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Pill/Badge */}
              <div className="absolute -bottom-4 right-4 sm:right-6 bg-white rounded-2xl p-4 shadow-elevated border border-border/70 max-w-[220px]">
                <div className="flex items-center gap-1.5 text-accent-blue font-heading font-bold text-sm mb-0.5">
                  <ShieldCheck size={16} />
                  <span>Direct GT Road Access</span>
                </div>
                <p className="text-[11px] text-text-secondary leading-snug">
                  Guarded on-site parking lot with instant highway pull-in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
