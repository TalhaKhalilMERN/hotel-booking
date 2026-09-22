import AvailabilitySearch from "../booking/AvailabilitySearch";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { Sparkles, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] flex items-center bg-dark text-white overflow-hidden py-16 lg:py-24">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Hamilton Hotel GT Road Exterior Lounge"
          className="w-full h-full object-cover object-center brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/75 to-dark/95" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="mb-6">
            <span className="badge-gold">
              <Sparkles size={13} />
              {HOTEL_INFO.name} &bull; GT Road, Hamilton, Pakistan
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-5 tracking-tight">
            Refined Living & Tailored Hospitality along GT Road
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mb-10 font-sans font-light">
            An intimate retreat featuring 45 modern rooms, artisan dining, and seamless direct booking in Hamilton, Pakistan.
          </p>

          <div className="w-full mt-2">
            <AvailabilitySearch />
          </div>
        </div>
      </div>
    </section>
  );
}
