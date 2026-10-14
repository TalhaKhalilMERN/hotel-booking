import Link from "next/link";
import {
  BedDouble,
  Building2,
  Tag,
  TrendingUp,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import AdminTopbar from "@/components/layout/AdminTopbar";
import StatCard from "@/components/ui/StatCard";
import ErrorState from "@/components/ui/ErrorState";
import { getHotelWithRoomTypes } from "@/lib/api";
import { formatCurrency, formatCapacity } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
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
        <AdminTopbar title="Dashboard" subtitle="Overview and catalogue statistics" />
        <main className="p-6">
          <ErrorState
            title="Unable to load dashboard data"
            message={errorMsg || "An unexpected error occurred while communicating with the backend API."}
          />
        </main>
      </div>
    );
  }

  const { hotel, roomTypesResponse } = data;
  const roomTypes = roomTypesResponse.roomTypes;

  // Calculate pricing metrics
  const prices = roomTypes
    .map((r) => parseFloat(r.basePrice))
    .filter((p) => !isNaN(p));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return (
    <div>
      <AdminTopbar
        title="Dashboard"
        subtitle={`Operational overview for ${hotel.name}`}
      />

      <main className="p-6 space-y-6">
        {/* ── Stat Cards Grid ────────────────────────────────────────── */}
        <section aria-label="Key metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Room Types"
            value={roomTypes.length}
            sub="Catalogue categories"
            icon={<BedDouble size={18} />}
            accentColor="blue"
          />
          <StatCard
            label="Starting Rate"
            value={formatCurrency(minPrice, hotel.currency)}
            sub="Lowest nightly base rate"
            icon={<Tag size={18} />}
            accentColor="gold"
          />
          <StatCard
            label="Ceiling Rate"
            value={formatCurrency(maxPrice, hotel.currency)}
            sub="Highest nightly base rate"
            icon={<TrendingUp size={18} />}
            accentColor="green"
          />
          <StatCard
            label="Property"
            value={hotel.city}
            sub={`${hotel.country} · ${hotel.timezone}`}
            icon={<Building2 size={18} />}
            accentColor="neutral"
          />
        </section>

        {/* ── Content Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Room Types Overview (2 cols) */}
          <section className="lg:col-span-2 admin-card p-6" aria-labelledby="room-types-heading">
            <div className="flex items-center justify-between pb-4 border-b border-content-border">
              <div>
                <h2 id="room-types-heading" className="text-base font-semibold text-text-primary">
                  Room Types Overview
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  Currently configured room categories in the live catalogue
                </p>
              </div>
              <Link
                href="/room-types"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sidebar-accent hover:text-blue-700 transition-colors"
              >
                <span>View all</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Room Type</th>
                    <th>Bed Config</th>
                    <th>Capacity</th>
                    <th>Base Rate</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomTypes.map((room) => (
                    <tr key={room.id}>
                      <td className="font-medium text-text-primary">
                        <div>
                          <p className="font-semibold">{room.name}</p>
                          {room.sizeSqm && (
                            <span className="text-xs text-text-muted">{room.sizeSqm} m²</span>
                          )}
                        </div>
                      </td>
                      <td className="text-text-secondary text-xs">
                        {room.bedConfig || "Standard"}
                      </td>
                      <td className="text-text-secondary text-xs">
                        {formatCapacity(room.capacityAdults, room.capacityChildren)}
                      </td>
                      <td className="font-medium text-text-primary text-xs">
                        {formatCurrency(room.basePrice, hotel.currency)}
                      </td>
                      <td className="text-right">
                        <Link
                          href={`/room-types/${room.id}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-sidebar-accent hover:underline"
                        >
                          <span>Details</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {roomTypes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-text-muted text-sm">
                        No room types found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Side panels (1 col) */}
          <div className="space-y-6">
            {/* Hotel Information Card */}
            <section className="admin-card p-6" aria-labelledby="hotel-info-heading">
              <div className="flex items-center justify-between pb-3 border-b border-content-border">
                <h2 id="hotel-info-heading" className="text-base font-semibold text-text-primary">
                  Property Info
                </h2>
                <Link
                  href="/hotel"
                  className="text-xs font-medium text-sidebar-accent hover:underline"
                >
                  Manage
                </Link>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
                    Hotel Name
                  </p>
                  <p className="font-medium text-text-primary mt-0.5">{hotel.name}</p>
                </div>

                <div className="flex items-start gap-2 text-text-secondary">
                  <MapPin size={16} className="shrink-0 text-text-muted mt-0.5" aria-hidden="true" />
                  <p className="text-xs">
                    {hotel.address}, {hotel.city}, {hotel.country}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock size={16} className="shrink-0 text-text-muted" aria-hidden="true" />
                  <p className="text-xs">
                    Timezone: <span className="font-mono text-text-primary">{hotel.timezone}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-content-border flex items-center justify-between text-xs">
                  <span className="text-text-muted">Standard Currency</span>
                  <span className="badge-gold font-mono">{hotel.currency}</span>
                </div>
              </div>
            </section>

            {/* Auth & System Status Card */}
            <section className="admin-card p-6" aria-labelledby="security-heading">
              <div className="flex items-center gap-2 text-gold-dark pb-3 border-b border-content-border">
                <ShieldAlert size={18} aria-hidden="true" />
                <h2 id="security-heading" className="text-sm font-semibold">
                  Access & Security Status
                </h2>
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed text-text-secondary">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">System State:</span>
                  <span className="badge-gold">Read-Only</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">API Connection:</span>
                  <span className="badge-available">Live Backend</span>
                </div>
                <p className="bg-content-bg p-3 rounded-card border border-content-border text-text-muted text-[11px]">
                  Write operations (create, update, delete) are locked until backend
                  authentication and authorization (Argon2id + admin role) are implemented.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
