import { DoorOpen, Lock, AlertTriangle, CheckCircle, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AdminTopbar from "@/components/layout/AdminTopbar";
import ErrorState from "@/components/ui/ErrorState";
import { getHotelWithRooms } from "@/lib/api";
import type { RoomStatus } from "@/types/api";

export const dynamic = "force-dynamic";

// ── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  RoomStatus,
  { label: string; className: string; Icon: LucideIcon }
> = {
  AVAILABLE: {
    label: "Available",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Icon: CheckCircle,
  },
  OCCUPIED: {
    label: "Occupied",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Icon: DoorOpen,
  },
  MAINTENANCE: {
    label: "Maintenance",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Icon: Wrench,
  },
  OUT_OF_SERVICE: {
    label: "Out of Service",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
    Icon: AlertTriangle,
  },
};

function StatusBadge({ status }: { status: RoomStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.OUT_OF_SERVICE;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip text-[11px] font-semibold border ${cfg.className}`}
    >
      <cfg.Icon size={11} aria-hidden={true} />
      {cfg.label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminRoomsPage() {
  let data;
  let errorMsg: string | null = null;

  try {
    data = await getHotelWithRooms();
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  if (!data || errorMsg) {
    return (
      <div>
        <AdminTopbar title="Physical Rooms" subtitle="Room inventory" />
        <main className="p-6">
          <ErrorState
            title="Failed to load room inventory"
            message={errorMsg || "Unable to fetch physical rooms from the backend API."}
          />
        </main>
      </div>
    );
  }

  const { hotel, roomsResponse } = data;
  const rooms = roomsResponse.rooms;

  // Summary counts for status overview chips
  const counts = rooms.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<RoomStatus, number>
  );

  return (
    <div>
      <AdminTopbar
        title="Physical Rooms"
        subtitle={`Room inventory for ${hotel.name}`}
      />

      <main className="p-6 space-y-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              All Rooms ({rooms.length})
            </h2>
            <p className="text-xs text-text-secondary mt-1">
              Physical room inventory — operational status and room-type assignments.
            </p>
          </div>

          {/* Status summary pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(Object.entries(STATUS_CONFIG) as [RoomStatus, (typeof STATUS_CONFIG)[RoomStatus]][]).map(
              ([status, cfg]) =>
                counts[status] ? (
                  <span
                    key={status}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip text-[11px] font-semibold border ${cfg.className}`}
                  >
                    <cfg.Icon size={11} aria-hidden={true} />
                    {counts[status]} {cfg.label}
                  </span>
                ) : null
            )}
          </div>
        </div>

        {/* Read-only callout */}
        <div className="p-4 rounded-card bg-gold-light/40 border border-gold-DEFAULT/20 flex items-start gap-3">
          <Lock size={16} className="text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
          <div className="text-xs text-text-secondary">
            <span className="font-semibold text-text-primary">Read-Only Mode: </span>
            Room status changes and re-assignments are disabled in this milestone.
            All data is fetched live from the backend.
          </div>
        </div>

        {/* Table */}
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table" aria-label="Physical rooms inventory">
              <thead>
                <tr>
                  <th>Room No.</th>
                  <th>Floor</th>
                  <th>Room Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="group">
                    <td className="font-semibold text-text-primary group-hover:text-sidebar-accent transition-colors whitespace-nowrap">
                      {room.roomNumber}
                    </td>
                    <td className="text-xs text-text-secondary whitespace-nowrap">
                      Floor {room.floor}
                    </td>
                    <td className="text-xs text-text-secondary">
                      {room.roomType.name}
                    </td>
                    <td className="whitespace-nowrap">
                      <StatusBadge status={room.status} />
                    </td>
                  </tr>
                ))}

                {rooms.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-text-muted text-sm">
                      No physical rooms currently registered.
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
