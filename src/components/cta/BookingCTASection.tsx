import Link from "next/link";
import { ShieldCheck, Coffee, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function BookingCTASection() {
  const perks = [
    {
      icon: <ShieldCheck size={20} className="text-accent-blue" />,
      title: "Direct Rate Guarantee",
      desc: "Official room rates in PKR with no travel agency markups or surprise charges."
    },
    {
      icon: <Coffee size={20} className="text-accent-blue" />,
      title: "Complimentary Breakfast",
      desc: "Fresh morning breakfast included with every direct room booking."
    },
    {
      icon: <Clock size={20} className="text-accent-blue" />,
      title: "Flexible Cancellation",
      desc: "Easy date changes and guest-friendly cancellation terms on standard stays."
    },
    {
      icon: <Sparkles size={20} className="text-accent-blue" />,
      title: "Guaranteed Power & Parking",
      desc: "Heavy-duty generator backup and guarded parking lot right off GT Road."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-accent-blue-tint/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="card-elevated p-8 sm:p-12 rounded-3xl bg-white border border-border/70 max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="badge-blue mb-3">Direct Reservations</span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mt-1 mb-3 leading-tight">
            Reserve Your Room Direct
          </h2>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-xl">
            Clean accommodations, transparent PKR pricing, and dependable 24/7 service on GT Road, Hamilton.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full mb-10">
            {perks.map((p, index) => (
              <div key={index} className="bg-bg border border-border/70 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 hover:border-accent-blue/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-accent-blue-tint text-accent-blue flex items-center justify-center shrink-0 border border-accent-blue/15">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-text-primary mb-0.5">{p.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/rooms" className="btn-primary px-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg">
              <span>View Available Rooms & Book</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
