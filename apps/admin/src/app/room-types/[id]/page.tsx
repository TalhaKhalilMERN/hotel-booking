import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  Users,
  Maximize2,
  Sparkles,
  Lock,
  Tag,
  KeyRound,
  Building,
  Info,
} from "lucide-react";
import AdminTopbar from "@/components/layout/AdminTopbar";
import ErrorState from "@/components/ui/ErrorState";
import { getHotelWithRoomTypes } from "@/lib/api";
import { formatCurrency, formatCapacity } from "@/lib/format";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRoomTypeDetailPage({ params }: PageProps) {
  const { id } = await params;

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
        <AdminTopbar title="Room Type Details" subtitle="Catalogue inspection" />
        <main className="p-6">
          <ErrorState
            title="Failed to load room type details"
            message={errorMsg || "Unable to reach the backend API."}
          />
        </main>
      </div>
    );
  }

  const { hotel, roomTypesResponse } = data;
  const room = roomTypesResponse.roomTypes.find((r) => r.id === id);

  if (!room) {
    return (
      <div>
        <AdminTopbar title="Room Type Not Found" subtitle="Catalogue inspection" />
        <main className="p-6">
          <div className="admin-card p-8 text-center max-w-lg mx-auto space-y-4">
            <h2 className="text-lg font-bold text-text-primary">Room Type Not Found</h2>
            <p className="text-xs text-text-secondary">
              No catalogue room type was found matching ID <code className="font-mono">{id}</code>.
            </p>
            <div>
              <Link
                href="/room-types"
                className="inline-flex items-center gap-2 text-xs font-semibold text-sidebar-accent hover:underline"
              >
                <ArrowLeft size={14} />
                <span>Return to Room Types</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar
        title={room.name}
        subtitle={`Catalogue item · ${hotel.name}`}
      />

      <main className="p-6 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/room-types"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Back to Room Types catalogue</span>
          </Link>
        </div>

        {/* Action / Warning Notice */}
        <div className="p-4 rounded-card bg-gold-light/40 border border-gold-DEFAULT/20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock size={16} className="text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
            <div className="text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">Read-Only Mode: </span>
              Modifications to this room type (rate adjustments, capacity edits, amenity assignments)
              require authenticated administrator access.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-muted bg-content-bg border border-content-border rounded-button cursor-not-allowed opacity-75"
              title="Editing requires authentication"
            >
              <Lock size={12} />
              <span>Edit Room Type</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information Card */}
            <section className="admin-card p-6 space-y-5" aria-labelledby="general-info-heading">
              <h2 id="general-info-heading" className="text-base font-semibold text-text-primary pb-3 border-b border-content-border">
                General Information
              </h2>

              <div>
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                  Room Name
                </span>
                <p className="text-xl font-bold text-text-primary mt-1">{room.name}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                  Description
                </span>
                <p className="text-sm text-text-secondary mt-1.5 leading-relaxed bg-content-bg p-4 rounded-card border border-content-border">
                  {room.description || "No public description provided for this room type."}
                </p>
              </div>

              {/* Physical & Occupancy Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-content-border">
                <div className="p-3 bg-content-bg rounded-card border border-content-border">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-semibold uppercase">
                    <BedDouble size={14} className="text-sidebar-accent" />
                    <span>Bed Config</span>
                  </div>
                  <p className="mt-1 font-semibold text-sm text-text-primary">
                    {room.bedConfig || "Standard"}
                  </p>
                </div>

                <div className="p-3 bg-content-bg rounded-card border border-content-border">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-semibold uppercase">
                    <Maximize2 size={14} className="text-sidebar-accent" />
                    <span>Room Size</span>
                  </div>
                  <p className="mt-1 font-semibold text-sm text-text-primary">
                    {room.sizeSqm ? `${room.sizeSqm} m²` : "Not specified"}
                  </p>
                </div>

                <div className="p-3 bg-content-bg rounded-card border border-content-border">
                  <div className="flex items-center gap-2 text-text-muted text-xs font-semibold uppercase">
                    <Users size={14} className="text-sidebar-accent" />
                    <span>Occupancy</span>
                  </div>
                  <p className="mt-1 font-semibold text-sm text-text-primary">
                    {formatCapacity(room.capacityAdults, room.capacityChildren)}
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Max adults: {room.capacityAdults} · Max children: {room.capacityChildren}
                  </p>
                </div>
              </div>
            </section>

            {/* Configured Amenities */}
            <section className="admin-card p-6" aria-labelledby="amenities-heading">
              <div className="flex items-center justify-between pb-3 border-b border-content-border">
                <h2 id="amenities-heading" className="text-base font-semibold text-text-primary">
                  Assigned Amenities ({room.amenities.length})
                </h2>
                <span className="text-xs text-text-muted">Database relations</span>
              </div>

              <div className="mt-4">
                {room.amenities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity.id}
                        className="flex items-center justify-between p-3 rounded-card bg-content-bg border border-content-border"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex items-center justify-center w-6 h-6 rounded bg-gold-light text-gold-dark">
                            <Sparkles size={12} />
                          </span>
                          <span className="text-xs font-medium text-text-primary">
                            {amenity.name}
                          </span>
                        </div>
                        {amenity.iconKey && (
                          <span className="text-[10px] font-mono text-text-muted bg-content-surface px-1.5 py-0.5 rounded border border-content-border">
                            {amenity.iconKey}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted italic py-4">
                    No amenities assigned to this room type.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Metadata (1 col) */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <section className="admin-card p-6" aria-labelledby="pricing-heading">
              <h2 id="pricing-heading" className="text-sm font-semibold text-text-secondary uppercase tracking-wider pb-3 border-b border-content-border">
                Pricing & Currency
              </h2>

              <div className="mt-4 space-y-4">
                <div>
                  <span className="text-xs text-text-muted">Nightly Base Rate</span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-text-primary">
                      {formatCurrency(room.basePrice, hotel.currency)}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted block mt-1">
                    Raw database value: <code className="font-mono font-semibold">{room.basePrice}</code>
                  </span>
                </div>

                <div className="pt-3 border-t border-content-border flex items-center justify-between text-xs">
                  <span className="text-text-muted">Settlement Currency</span>
                  <span className="badge-gold font-mono">{hotel.currency}</span>
                </div>
              </div>
            </section>

            {/* Technical Identifiers Card */}
            <section className="admin-card p-6" aria-labelledby="technical-heading">
              <h2 id="technical-heading" className="text-sm font-semibold text-text-secondary uppercase tracking-wider pb-3 border-b border-content-border">
                Technical Metadata
              </h2>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-text-muted block">Room Type UUID</span>
                  <code className="font-mono text-[11px] text-text-primary bg-content-bg p-1.5 rounded block mt-1 break-all border border-content-border select-all">
                    {room.id}
                  </code>
                </div>

                <div>
                  <span className="text-text-muted block">Hotel Property UUID</span>
                  <code className="font-mono text-[11px] text-text-primary bg-content-bg p-1.5 rounded block mt-1 break-all border border-content-border select-all">
                    {hotel.id}
                  </code>
                </div>

                <div className="pt-2 border-t border-content-border">
                  <span className="text-text-muted block">Property Name</span>
                  <span className="font-medium text-text-primary block mt-0.5">{hotel.name}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
