import { HOTEL_INFO } from "@/data/hotelInfo";
import { MapPin, Navigation, Compass, ExternalLink } from "lucide-react";

export default function LocationSection() {
  const landmarks = [
    { name: "GT Road Main Corridor", distance: "Direct Access" },
    { name: "Hamilton Commercial District", distance: "3 mins drive" },
    { name: "Central Railway & Bus Terminal", distance: "10 mins drive" },
    { name: "Regional Airport Connection", distance: "35 mins drive" },
  ];

  return (
    <section className="py-20 bg-bg-warm" id="location">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Location Details */}
          <div className="lg:col-span-6">
            <span className="badge-gold">Hotel Location</span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mt-3 mb-4">
              Conveniently Situated on GT Road, Hamilton, Pakistan
            </h2>

            <div className="flex items-start gap-2.5 text-base font-medium text-primary mb-4">
              <MapPin size={22} className="text-accent-gold shrink-0 mt-0.5" />
              <span>{HOTEL_INFO.address}</span>
            </div>

            <p className="text-sm md:text-base text-muted-text leading-relaxed mb-6">
              Located directly along GT Road for quick road access and hassle-free arrival. On-site secure parking is available for all guest vehicles.
            </p>

            <div className="flex flex-col gap-3 pt-4 border-t border-border-light mb-8">
              {landmarks.map((lm, i) => (
                <div key={i} className="flex items-center justify-between text-sm text-text-main">
                  <div className="flex items-center gap-2">
                    <Navigation size={15} className="text-accent-gold" />
                    <span>{lm.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-accent-gold bg-gold-light px-2.5 py-1 rounded-full">
                    {lm.distance}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={HOTEL_INFO.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-accent inline-flex items-center gap-2"
            >
              <Compass size={16} />
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Location Map Graphic Box */}
          <div className="lg:col-span-6 h-[400px] bg-primary rounded-lg overflow-hidden relative border border-border-light shadow-md">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
              alt="Hamilton GT Road Map Area"
              className="w-full h-full object-cover opacity-80"
            />

            <div className="absolute bottom-6 left-6 right-6 bg-dark/95 backdrop-blur-md text-white p-5 rounded border border-accent-gold/30 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-white font-semibold">{HOTEL_INFO.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">GT Road, Hamilton, Pakistan</p>
              </div>
              <a
                href={HOTEL_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-accent px-3 py-2 text-xs shrink-0"
              >
                <span>View Pins</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
