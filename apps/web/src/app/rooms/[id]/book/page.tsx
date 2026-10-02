import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoomById, ROOMS_DATA } from "@/data/rooms";
import BookingCheckoutWizard from "@/components/booking/BookingCheckoutWizard";
import { ArrowLeft } from "lucide-react";

interface RoomBookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ROOMS_DATA.map((room) => ({
    id: room.id,
  }));
}

export default async function RoomBookPage({ params }: RoomBookPageProps) {
  const resolvedParams = await params;
  const room = getRoomById(resolvedParams.id);

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
            Direct rate guarantee for {room.name} at Hamilton Hotel & Suites.
          </p>
        </div>

        {/* Wizard Client Component */}
        <BookingCheckoutWizard room={room} />
      </div>
    </div>
  );
}
