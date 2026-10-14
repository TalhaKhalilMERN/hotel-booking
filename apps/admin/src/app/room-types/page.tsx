import Link from "next/link";
import {
  BedDouble,
  Plus,
  Lock,
  ChevronRight,
  Sparkles,
  Users,
  Maximize2,
} from "lucide-react";
import AdminTopbar from "@/components/layout/AdminTopbar";
import ErrorState from "@/components/ui/ErrorState";
import { getHotelWithRoomTypes } from "@/lib/api";
import { formatCurrency, formatCapacity } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminRoomTypesPage() {
  let data;
  let errorMsg: string | null = null;

  try {
    data = await getHotelWithRoomTypes();
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  if (!data || errorMsg) {
    return (
      <div>
        <AdminTopbar
          title="Room Types"
          subtitle="Catalogue management"
        />
        <main className="p-6">
          <ErrorState
            title="Failed to load room types"
            message={errorMsg || "Unable to fetch room types from the backend API."}
          />
        </main>
      </div>
    );
  }

  const { hotel, roomTypesResponse } = data;
  const roomTypes = roomTypesResponse.roomTypes;

  return (
    <div>
      <AdminTopbar
        title="Room Types"
        subtitle={`Catalogue inventory for ${hotel.name}`}
      />

      <main className="p-6 space-y-6">
        {/* Action Header & Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              All Room Types ({roomTypes.length})
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Inspect current pricing, occupancy allowances, and configured amenities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-text-muted bg-content-bg border border-content-border rounded-button cursor-not-allowed opacity-75"
              title="Creating new room types requires administrative authentication."
            >
              <Lock size={13} className="text-text-muted" aria-hidden="true" />
              <span>New Room Type</span>
            </button>
          </div>
        </div>

        {/* Read-only Callout */}
        <div className="p-4 rounded-card bg-gold-light/40 border border-gold-DEFAULT/20 flex items-start gap-3">
          <Lock size={16} className="text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
          <div className="text-xs text-text-secondary">
            <span className="font-semibold text-text-primary">Catalogue Read-Only Mode: </span>
            Modifying room parameters, adjusting base rates, or adding new room categories is disabled
            until the Argon2id authentication and admin authorization backend milestone is completed.
          </div>
        </div>

        {/* Room Types Table Card */}
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Room Category</th>
                  <th>Bed & Size</th>
                  <th>Capacity</th>
                  <th>Base Rate</th>
                  <th>Amenities</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomTypes.map((room) => (
                  <tr key={room.id} className="group">
                    <td className="align-top font-medium text-text-primary max-w-xs">
                      <div>
                        <p className="font-semibold text-sm text-text-primary group-hover:text-sidebar-accent transition-colors">
                          {room.name}
                        </p>
                        {room.description && (
                          <p className="text-xs text-text-muted line-clamp-2 mt-1 font-normal">
                            {room.description}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="align-top text-xs text-text-secondary whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                          <BedDouble size={14} className="text-text-muted" aria-hidden="true" />
                          {room.bedConfig || "Standard"}
                        </span>
                        {room.sizeSqm ? (
                          <span className="inline-flex items-center gap-1.5 text-text-muted">
                            <Maximize2 size={13} className="text-text-muted" aria-hidden="true" />
                            {room.sizeSqm} m²
                          </span>
                        ) : (
                          <span className="text-text-muted italic">—</span>
                        )}
                      </div>
                    </td>

                    <td className="align-top text-xs text-text-secondary whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <Users size={14} className="text-text-muted" aria-hidden="true" />
                        {formatCapacity(room.capacityAdults, room.capacityChildren)}
                      </span>
                    </td>

                    <td className="align-top text-xs font-semibold text-text-primary whitespace-nowrap">
                      <span className="text-sm font-bold text-text-primary">
                        {formatCurrency(room.basePrice, hotel.currency)}
                      </span>
                      <span className="text-[10px] text-text-muted block font-normal">
                        per night
                      </span>
                    </td>

                    <td className="align-top max-w-sm">
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-chip text-[11px] bg-content-bg text-text-secondary border border-content-border"
                          >
                            <Sparkles size={10} className="text-gold-DEFAULT" aria-hidden="true" />
                            <span>{amenity.name}</span>
                          </span>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-chip text-[11px] text-text-muted bg-content-bg border border-content-border">
                            +{room.amenities.length - 4} more
                          </span>
                        )}
                        {room.amenities.length === 0 && (
                          <span className="text-xs text-text-muted italic">None specified</span>
                        )}
                      </div>
                    </td>

                    <td className="align-top text-right whitespace-nowrap">
                      <Link
                        href={`/room-types/${room.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-sidebar-accent hover:bg-sidebar-accent/10 transition-colors"
                      >
                        <span>Inspect</span>
                        <ChevronRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}

                {roomTypes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-text-muted text-sm">
                      No room types currently registered.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
