import { notFound } from "next/navigation";
import Link from "next/link";
import { getHotelWithRoomTypes } from "@/lib/api";
import { enrichRoomTypesWithPresentation } from "@/lib/roomPresentation";
import BookingCheckoutWizard from "@/components/booking/BookingCheckoutWizard";
import { ArrowLeft } from "lucide-react";

interface RoomBookPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generates static params using real room type UUIDs from the live API.
 * Falls back to empty (dynamic rendering) if the API is unavailable at build time.
 */
export async function generateStaticParams() {
  try {
    const { roomTypesResponse } = await getHotelWithRoomTypes();
    const rooms = enrichRoomTypesWithPresentation(roomTypesResponse.roomTypes);
    return rooms.map((room) => ({ id: room.id }));
  } catch {
    return [];
  }
}

export default async function RoomBookPage({ params }: RoomBookPageProps) {
  const resolvedParams = await params;
  const paramId = resolvedParams.id;

  let room;
  try {
    const { roomTypesResponse } = await getHotelWithRoomTypes();
    const rooms = enrichRoomTypesWithPresentation(roomTypesResponse.roomTypes);
    room = rooms.find((r) => r.id === paramId || r.slug === paramId);
  } catch (error) {
    console.error("[RoomBookPage] Failed to fetch room types:", error);
  }

  if (!room) {
    notFound();
  }

  return (
    <div className="bg-bg min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8">
        {/* Back Navigation */}
        <Link
          href={`/rooms/${room.id}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-secondary hover:text-accent-blue transition-colors mb-6 bg-white px-4 py-2 rounded-full border border-border shadow-xs hover:border-accent-blue/30"
        >
          <ArrowLeft size={15} />
          <span>Back to {room.name}</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="badge-blue mb-2.5">Checkout Wizard</span>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-text-primary mt-1">
            Complete Your Reservation
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Direct rate guarantee for {room.name} at Hamilton Hotel &amp; Suites.
          </p>
        </div>

        {/* Wizard Client Component */}
        <BookingCheckoutWizard room={room} />
      </div>
    </div>
  );
}
