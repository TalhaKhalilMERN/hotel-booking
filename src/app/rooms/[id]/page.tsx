import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomById, ROOMS_DATA } from "@/data/rooms";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { formatCurrency } from "@/utils/formatters";
import { Users, BedDouble, Maximize, CheckCircle2, ArrowLeft, Calendar, ShieldCheck, Sparkles, MapPin } from "lucide-react";

interface RoomDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ROOMS_DATA.map((room) => ({
    id: room.id,
  }));
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const resolvedParams = await params;
  const room = getRoomById(resolvedParams.id);

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-bg-warm min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        {/* Back Link */}
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-gold transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          <span>Back to All Rooms</span>
        </Link>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-auto md:h-[460px]">
          <div className="md:col-span-2 h-full rounded-lg overflow-hidden shadow-md bg-dark">
            <img src={room.images[0] || room.heroImage} alt={room.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-full">
            {(room.images.slice(1, 3).length > 0 ? room.images.slice(1, 3) : [room.heroImage, room.heroImage]).map((img, idx) => (
              <div key={idx} className="h-full min-h-[140px] rounded-lg overflow-hidden shadow-sm bg-dark group">
                <img src={img} alt={`${room.name} detail ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="badge-gold">
                <Sparkles size={13} />
                {room.floor} &bull; {room.view}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-primary mt-2 mb-2">
                {room.name}
              </h1>
              <p className="text-base font-medium text-accent-gold mb-6">{room.tagline}</p>
            </div>

            {/* Quick Specs Bar */}
            <div className="flex flex-wrap items-center gap-6 p-5 bg-surface border border-border-light rounded-lg mb-8 shadow-sm text-sm font-medium text-primary">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-accent-gold" />
                <span>Capacity: {room.capacity.adults} Adults, {room.capacity.children} Children</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="text-accent-gold" />
                <span>Bedding: {room.bedType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-accent-gold" />
                <span>Size: {room.sizeSqM} m²</span>
              </div>
            </div>

            {/* Room Overview */}
            <h3 className="font-serif text-xl font-semibold text-primary mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent-gold">
              Room Overview
            </h3>
            <p className="text-base text-text-main leading-relaxed mb-10">
              {room.longDescription}
            </p>

            {/* Room Amenities */}
            <h3 className="font-serif text-xl font-semibold text-primary mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-accent-gold">
              Room Amenities & Facilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3.5 bg-surface border border-border-light rounded text-sm font-medium text-primary">
                  <CheckCircle2 size={16} className="text-accent-gold shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            {/* Location Reference */}
            <div className="p-5 bg-surface border border-border-light rounded-lg flex items-start gap-3">
              <MapPin size={20} className="text-accent-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base font-semibold text-primary">Location Reference</h4>
                <p className="text-xs text-muted-text mt-0.5">
                  Located at {HOTEL_INFO.name}, {HOTEL_INFO.address}. Convenient access to GT Road with secure on-site parking.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-surface border border-border-light rounded-lg p-6 shadow-md flex flex-col gap-6">
              <div className="flex items-baseline justify-between pb-5 border-b border-border-light">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-text block">Rate Per Night</span>
                  <div>
                    <span className="font-sans text-3xl font-bold text-primary">{formatCurrency(room.pricePerNight)}</span>
                    <span className="text-xs text-muted-text"> / night</span>
                  </div>
                </div>
                <span className="badge-gold text-[10px]">PKR Direct Rate</span>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-text block mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 rounded border border-border-light text-sm bg-bg-warm focus:bg-white focus:border-accent-gold outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-text block mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]}
                    className="w-full p-3 rounded border border-border-light text-sm bg-bg-warm focus:bg-white focus:border-accent-gold outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-text block mb-1">
                    Guests & Rooms
                  </label>
                  <select className="w-full p-3 rounded border border-border-light text-sm bg-bg-warm focus:bg-white focus:border-accent-gold outline-none cursor-pointer">
                    <option>1 Adult</option>
                    <option selected>2 Adults</option>
                    <option>2 Adults + 1 Child</option>
                    <option>2 Adults + 2 Children</option>
                  </select>
                </div>
              </div>

              <button className="w-full p-3.5 text-sm font-semibold text-white bg-accent-gold hover:bg-gold-hover rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                <Calendar size={18} />
                <span>Reserve {room.name}</span>
              </button>

              <div className="bg-bg-warm border border-border-light rounded p-4 flex flex-col gap-1.5 text-xs text-muted-text">
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <ShieldCheck size={16} className="text-accent-gold" />
                  <span>Direct Booking Benefits</span>
                </div>
                <span>Includes complimentary breakfast, fast Wi-Fi, power backup, and transparent PKR pricing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
