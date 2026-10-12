import { getHotelWithRoomTypes } from "@/lib/api";
import { enrichRoomTypesWithPresentation } from "@/lib/roomPresentation";
import ErrorState from "@/components/ui/ErrorState";
import RoomsClient from "@/components/rooms/RoomsClient";

export const metadata = {
  title: "Rooms & Suites | Hamilton Hotel",
  description:
    "Browse all rooms and suites at Hamilton Hotel & Suites. Direct PKR pricing with breakfast included.",
};

export default async function RoomsPage() {
  let rooms: import("@/types/room").RoomType[];
  let fetchError = false;

  try {
    const { roomTypesResponse } = await getHotelWithRoomTypes();
    rooms = enrichRoomTypesWithPresentation(roomTypesResponse.roomTypes);
  } catch (error) {
    console.error("[RoomsPage] Failed to fetch room types:", error);
    fetchError = true;
    rooms = [];
  }

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-accent-blue-tint/50 border-b border-border py-12 lg:py-16 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="badge-blue mb-2.5">Hamilton Accommodations</span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-1 mb-3">
            Rooms &amp; Suite Rates
          </h1>
          <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            All room rates are direct in Pakistani Rupees (PKR) and include complimentary breakfast,
            high-speed Wi-Fi, and 24/7 power backup.
          </p>
        </div>
      </section>

      {/* Error State */}
      {fetchError ? (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
          <ErrorState />
        </div>
      ) : (
        <RoomsClient rooms={rooms} />
      )}
    </div>
  );
}
