import Link from "next/link";
import { Room } from "@/data/rooms";
import { formatCurrency } from "@/utils/formatters";
import { Users, Maximize, ArrowRight, BedDouble } from "lucide-react";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-surface border border-border-light rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-accent-gold/40 transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative w-full h-60 overflow-hidden bg-dark">
        <img
          src={room.heroImage}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-4 left-4 bg-dark/85 backdrop-blur-sm text-accent-gold text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-accent-gold/30">
          {room.bedType}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-accent-gold transition-colors">
          {room.name}
        </h3>

        {/* Quick Specs */}
        <div className="flex items-center gap-4 text-xs text-muted-text mb-3 pb-3 border-b border-border-light">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-accent-gold" />
            <span>Up to {room.capacity.adults} Guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize size={14} className="text-accent-gold" />
            <span>{room.sizeSqM} m²</span>
          </div>
        </div>

        <p className="text-sm text-muted-text leading-relaxed mb-6 line-clamp-2">
          {room.description}
        </p>

        {/* Footer Pricing & CTA */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-light">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-text">Starting from</span>
            <div>
              <span className="font-sans text-xl font-bold text-primary">{formatCurrency(room.pricePerNight)}</span>
              <span className="text-xs text-muted-text"> / night</span>
            </div>
          </div>

          <Link
            href={`/rooms/${room.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-gold group-hover:text-gold-hover group-hover:translate-x-1 transition-all"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
