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
  // Alternate tint themes for visual variety
  const getTintStyle = (index: number, category: string) => {
    if (category === "comfort" || index % 3 === 0) {
      return {
        bg: "bg-accent-blue-tint",
        text: "text-accent-blue",
        border: "border-accent-blue/15",
      };
    }
    if (category === "dining" || index % 3 === 1) {
      return {
        bg: "bg-accent-gold-tint",
        text: "text-accent-gold",
        border: "border-accent-gold/20",
      };
    }
    return {
      bg: "bg-accent-blue-tint",
      text: "text-accent-blue",
      border: "border-accent-blue/15",
    };
  };

  return (
    <section className="py-20 bg-surface border-y border-border scroll-mt-24" id="amenities">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-blue mb-2.5">Hotel Facilities</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mt-1">
            Practical Amenities for Road & City Travelers
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-2 leading-relaxed">
            Reliable 24/7 electricity backup, guarded parking right on GT Road, and fast fiber Wi-Fi in every room.
          </p>
        </div>

        {/* Compact Horizontal Row Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {HOTEL_AMENITIES.map((item, index) => {
            const tint = getTintStyle(index, item.category);
            return (
              <div
                key={item.id}
                className="card-base p-4 sm:p-5 rounded-2xl flex items-center gap-4 hover:shadow-elevated hover:border-border hover:-translate-y-0.5 transition-all bg-white"
              >
                {/* Tinted Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${tint.bg} ${tint.text} ${tint.border}`}
                >
                  {ICON_MAP[item.iconName] || <CheckCircle2 size={22} />}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-sm sm:text-base font-bold text-text-primary truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
