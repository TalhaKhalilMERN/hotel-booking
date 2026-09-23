import { HOTEL_INFO } from "@/data/hotelInfo";
import { MapPin, Navigation, Compass, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const landmarks = [
    { name: "GT Road Main Highway", distance: "Direct Entry" },
    { name: "Hamilton Commercial Bazaar", distance: "3 mins drive" },
    { name: "Main Bus Terminal & Stop", distance: "8 mins drive" },
    { name: "City Center & Markets", distance: "12 mins drive" },
  ];

  return (
    <section className="py-20 lg:py-24 bg-surface border-y border-border scroll-mt-24" id="location">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Location Details */}
          <div className="lg:col-span-6">
            <span className="badge-blue mb-2.5">Location & Directions</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mt-1 mb-4">
              Direct Access on GT Road, Hamilton
            </h2>

            <div className="flex items-start gap-2.5 text-base font-semibold text-text-primary mb-3">
              <MapPin size={20} className="text-accent-blue shrink-0 mt-0.5" />
              <span>{HOTEL_INFO.address}</span>
            </div>

            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
              Located directly along the GT Road corridor for easy road access and hassle-free arrival. On-site secure parking is available for all guest vehicles.
            </p>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-border/60 mb-8">
              {landmarks.map((lm, i) => (
                <div key={i} className="flex items-center justify-between text-xs sm:text-sm text-text-primary">
                  <div className="flex items-center gap-2">
                    <Navigation size={14} className="text-accent-blue" />
                    <span className="font-medium">{lm.name}</span>
                  </div>
                  <span className="badge-blue text-[11px] py-0.5">
                    {lm.distance}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm font-bold"
            >
              <Compass size={16} />
              <span>Get Directions on Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Location Map Graphic Box */}
          <div className="lg:col-span-6 h-[380px] sm:h-[420px] rounded-2xl overflow-hidden relative border border-border/70 shadow-elevated bg-surface-warm">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
              alt="Hamilton GT Road Map Area"
              className="w-full h-full object-cover brightness-[0.95]"
            />

            {/* Floating Location Info Card */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md text-text-primary p-4 sm:p-5 rounded-2xl border border-border/70 shadow-elevated flex items-center justify-between gap-4">
              <div>
                <h4 className="font-heading text-base font-bold text-text-primary">{HOTEL_INFO.name}</h4>
                <p className="text-xs text-text-secondary mt-0.5">GT Road, Hamilton, Pakistan</p>
              </div>
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary px-4 py-2 text-xs font-bold shrink-0"
              >
                <span>Open Map</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
