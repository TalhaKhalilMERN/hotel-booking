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
    <div className="bg-bg min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8">
        {/* Back Link */}
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-secondary hover:text-accent-blue transition-colors mb-6 bg-white px-4 py-2 rounded-full border border-border shadow-xs hover:border-accent-blue/30"
        >
          <ArrowLeft size={15} />
          <span>Back to All Rooms</span>
        </Link>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-auto md:h-[460px]">
          <div className="md:col-span-2 h-full rounded-2xl overflow-hidden shadow-card border border-border/70 bg-surface-warm">
            <img src={room.images[0] || room.heroImage} alt={room.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 h-full">
            {(room.images.slice(1, 3).length > 0 ? room.images.slice(1, 3) : [room.heroImage, room.heroImage]).map((img, idx) => (
              <div key={idx} className="h-full min-h-[140px] rounded-2xl overflow-hidden shadow-xs border border-border/70 bg-surface-warm group">
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
              <span className="badge-blue mb-2.5">
                <Sparkles size={13} />
                {room.floor} &bull; {room.view}
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mt-1 mb-2">
                {room.name}
              </h1>
              <p className="text-base font-semibold text-accent-blue mb-6">{room.tagline}</p>
            </div>

            {/* Quick Specs Bar */}
            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 mb-8 flex flex-wrap items-center gap-6 text-sm font-semibold text-text-primary">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-accent-blue" />
                <span>Up to {room.capacity.adults} Adults, {room.capacity.children} Children</span>
              </div>
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="text-accent-blue" />
                <span>{room.bedType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-accent-blue" />
                <span>{room.sizeSqM} m² floor space</span>
              </div>
            </div>

            {/* Room Overview */}
            <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
              Room Overview
            </h2>
            <p className="text-base text-text-secondary leading-relaxed mb-10">
              {room.longDescription}
            </p>

            {/* Room Amenities */}
            <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
              Room Amenities & Facilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="card-base p-3.5 px-4 rounded-xl bg-white border border-border/70 flex items-center gap-3 text-sm font-semibold text-text-primary">
                  <CheckCircle2 size={16} className="text-accent-blue shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            {/* Location Reference */}
            <div className="card-base p-5 rounded-2xl bg-white border border-border/70 flex items-start gap-3">
              <MapPin size={20} className="text-accent-blue shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-base font-bold text-text-primary">Location Reference</h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Located at {HOTEL_INFO.name}, {HOTEL_INFO.address}. Convenient access to GT Road with secure on-site parking.
                </p>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 card-elevated rounded-2xl bg-white border border-border/70 p-6 shadow-elevated flex flex-col gap-5">
              <div className="flex items-baseline justify-between pb-4 border-b border-border/70">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">Direct Rate</span>
                  <div>
                    <span className="font-heading text-3xl font-extrabold text-text-primary">{formatCurrency(room.pricePerNight)}</span>
                    <span className="text-xs text-text-muted"> / night</span>
                  </div>
                </div>
                <span className="badge-blue text-[11px]">Direct PKR</span>
              </div>

              <div className="flex flex-col gap-3.5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none transition-all cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]}
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none transition-all cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Guests & Rooms
                  </label>
                  <select
                    defaultValue="2 Adults"
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none cursor-pointer transition-all"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                    <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <Calendar size={17} />
                <span>Reserve {room.name}</span>
              </button>

              <div className="bg-surface-warm border border-border/70 rounded-xl p-4 flex flex-col gap-1.5 text-xs text-text-secondary">
                <div className="flex items-center gap-1.5 font-bold text-text-primary">
                  <ShieldCheck size={16} className="text-accent-blue" />
                  <span>Direct Booking Benefits</span>
                </div>
                <span>Includes complimentary breakfast, fast Wi-Fi, generator power backup, and transparent direct pricing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
