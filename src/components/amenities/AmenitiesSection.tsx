import { HOTEL_AMENITIES } from "@/data/hotelInfo";
import { Wifi, Car, Utensils, Coffee, Compass, Wind, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={22} />,
  Car: <Car size={22} />,
  Utensils: <Utensils size={22} />,
  Coffee: <Coffee size={22} />,
  Compass: <Compass size={22} />,
  Wind: <Wind size={22} />,
};

export default function AmenitiesSection() {
  return (
    <section className="py-20 bg-surface border-y border-border-light" id="amenities">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-gold">Hotel Services & Comfort</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mt-3">
            Amenities & Guest Facilities
          </h2>
          <p className="text-sm md:text-base text-muted-text mt-3 leading-relaxed">
            Designed for continuous comfort along GT Road with secure parking, high-speed fiber Wi-Fi, and 24/7 reception care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOTEL_AMENITIES.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-bg-warm border border-border-light rounded-lg hover:border-accent-gold hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded bg-primary text-accent-gold flex items-center justify-center mb-5">
                {ICON_MAP[item.iconName] || <CheckCircle2 size={22} />}
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-text leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
