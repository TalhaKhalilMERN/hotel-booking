import Link from "next/link";
import { getFeaturedRooms } from "@/data/rooms";
import RoomCard from "./RoomCard";
import { ArrowRight } from "lucide-react";

export default function FeaturedRooms() {
  const rooms = getFeaturedRooms();

  return (
    <section className="py-20 lg:py-24 bg-bg scroll-mt-24" id="rooms">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="badge-blue mb-2.5">Guest Accommodations</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mt-1">
              Popular Rooms & Rates
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-2 max-w-xl">
              Clean, quiet rooms with double-glazed windows, split AC, and uninterrupted generator power.
            </p>
          </div>

          <Link
            href="/rooms"
            className="btn-secondary self-start md:self-auto shrink-0 text-xs sm:text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>View all 45 rooms</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 3-Card Grid with items-start: Each card sizes strictly to natural content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {rooms.map((room, idx) => (
            <RoomCard
              key={room.id}
              room={room}
              highlighted={idx === 1}
              badgeText={idx === 1 ? "Most booked • Best value" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
