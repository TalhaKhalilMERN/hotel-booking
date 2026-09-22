import Link from "next/link";
import { getFeaturedRooms } from "@/data/rooms";
import RoomCard from "./RoomCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedRooms() {
  const rooms = getFeaturedRooms();

  return (
    <section className="py-20 bg-bg-warm" id="rooms">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-gold">Accommodations & Rates</span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mt-3">
            Featured Rooms & Suites
          </h2>
          <p className="text-sm md:text-base text-muted-text mt-3 leading-relaxed">
            Each of our 45 guest rooms along GT Road is equipped with air conditioning, uninterrupted generator power backup, fast Wi-Fi, and plush bedding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/rooms" className="btn-outline">
            <span>Explore All 45 Rooms & Rates</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
