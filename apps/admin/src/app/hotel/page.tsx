import {
  Building2,
  MapPin,
  Clock,
  Coins,
  Lock,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import AdminTopbar from "@/components/layout/AdminTopbar";
import ErrorState from "@/components/ui/ErrorState";
import { getHotel } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AdminHotelPage() {
  let hotel;
  let errorMsg: string | null = null;

  try {
    hotel = await getHotel();
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : String(err);
  }

  if (!hotel || errorMsg) {
    return (
      <div>
        <AdminTopbar title="Hotel Details" subtitle="Property configuration" />
        <main className="p-6">
          <ErrorState
            title="Unable to load hotel information"
            message={errorMsg || "Failed to communicate with the backend hotel API endpoint."}
          />
        </main>
      </div>
    );
  }

  return (
    <div>
      <AdminTopbar
        title="Hotel Details"
        subtitle="Property configuration and operational settings"
      />

      <main className="p-6 space-y-6">
        {/* Action Header & Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-text-primary">{hotel.name}</h2>
            <p className="text-xs text-text-secondary mt-1">
              Active primary property configured in the backend database.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-text-muted bg-content-bg border border-content-border rounded-button cursor-not-allowed opacity-75"
              title="Updating hotel details requires administrative authentication."
            >
              <Lock size={13} className="text-text-muted" aria-hidden="true" />
              <span>Edit Hotel Details</span>
            </button>
          </div>
        </div>

        {/* Read-only Callout */}
        <div className="p-4 rounded-card bg-gold-light/40 border border-gold-DEFAULT/20 flex items-start gap-3">
          <ShieldAlert size={16} className="text-gold-dark mt-0.5 shrink-0" aria-hidden="true" />
          <div className="text-xs text-text-secondary">
            <span className="font-semibold text-text-primary">Administrative Protection: </span>
            Updating property name, address, timezone, or currency configurations is restricted until
            the backend authentication layer and administrative RBAC guards are established.
          </div>
        </div>

        {/* Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Property Profile (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <section className="admin-card p-6 space-y-5" aria-labelledby="profile-heading">
              <h3 id="profile-heading" className="text-base font-semibold text-text-primary pb-3 border-b border-content-border">
                Property Profile
              </h3>

              <div>
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                  Official Hotel Name
                </span>
                <p className="text-lg font-bold text-text-primary mt-1">{hotel.name}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                  Property Description
                </span>
                <p className="text-sm text-text-secondary mt-1.5 leading-relaxed bg-content-bg p-4 rounded-card border border-content-border">
                  {hotel.description || "No property description configured."}
                </p>
              </div>

              <div className="pt-3 border-t border-content-border">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                  Location & Postal Details
                </span>
                <div className="mt-2 space-y-2 text-sm text-text-primary">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-sidebar-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{hotel.address}</p>
                      <p className="text-xs text-text-secondary">
                        {hotel.city}, {hotel.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Operational Settings & Identifiers (1 col) */}
          <div className="space-y-6">
            <section className="admin-card p-6" aria-labelledby="settings-heading">
              <h3 id="settings-heading" className="text-sm font-semibold text-text-secondary uppercase tracking-wider pb-3 border-b border-content-border">
                Localization & Billing
              </h3>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <span className="text-text-muted flex items-center gap-1.5">
                    <Clock size={13} className="text-sidebar-accent" />
                    <span>Hotel Timezone</span>
                  </span>
                  <p className="font-mono font-semibold text-sm text-text-primary mt-1">
                    {hotel.timezone}
                  </p>
                  <span className="text-[11px] text-text-muted mt-0.5 block">
                    Used for check-in / check-out schedules
                  </span>
                </div>

                <div className="pt-3 border-t border-content-border">
                  <span className="text-text-muted flex items-center gap-1.5">
                    <Coins size={13} className="text-gold-DEFAULT" />
                    <span>Settlement Currency</span>
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="badge-gold font-mono text-sm px-3 py-1">
                      {hotel.currency}
                    </span>
                  </div>
                  <span className="text-[11px] text-text-muted mt-0.5 block">
                    Catalog rates & transaction settlement currency
                  </span>
                </div>
              </div>
            </section>

            <section className="admin-card p-6" aria-labelledby="id-heading">
              <h3 id="id-heading" className="text-sm font-semibold text-text-secondary uppercase tracking-wider pb-3 border-b border-content-border">
                Database Identifiers
              </h3>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-text-muted flex items-center gap-1.5">
                    <KeyRound size={13} className="text-sidebar-accent" />
                    <span>Hotel UUID</span>
                  </span>
                  <code className="font-mono text-[11px] text-text-primary bg-content-bg p-2 rounded block mt-1.5 break-all border border-content-border select-all">
                    {hotel.id}
                  </code>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
