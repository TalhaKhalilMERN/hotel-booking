import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomById, ROOMS_DATA } from "@/data/rooms";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { formatCurrency } from "@/utils/formatters";
import { Users, BedDouble, Maximize, CheckCircle2, ArrowLeft, Sparkles, MapPin } from "lucide-react";
import RoomBookingSidebar from "@/components/booking/RoomBookingSidebar";

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
          <div className="md:col-span-2 relative min-h-0 h-[280px] sm:h-[360px] md:h-full rounded-2xl overflow-hidden shadow-card border border-border/70 bg-surface-warm">
            <img src={room.images[0] || room.heroImage} alt={room.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="flex flex-row md:flex-col gap-4 h-[140px] sm:h-[180px] md:h-full">
            {(room.images.slice(1, 3).length > 0 ? room.images.slice(1, 3) : [room.heroImage, room.heroImage]).map((img, idx) => (
              <div key={idx} className="flex-1 relative min-h-0 h-full md:h-0 rounded-2xl overflow-hidden shadow-xs border border-border/70 bg-surface-warm group">
                <img src={img} alt={`${room.name} detail ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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

          {/* Booking Sidebar — client component, handles date state after hydration */}
          <div className="lg:col-span-4">
            <RoomBookingSidebar
              roomName={room.name}
              pricePerNight={room.pricePerNight}
              roomId={room.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
