import Link from "next/link";
import { ShieldCheck, Coffee, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function BookingCTASection() {
  const perks = [
    {
      icon: <ShieldCheck size={20} className="text-accent-gold" />,
      title: "Best Rate Direct Guarantee",
      desc: "Guaranteed direct rates in PKR without third-party commission markups."
    },
    {
      icon: <Coffee size={20} className="text-accent-gold" />,
      title: "Complimentary Breakfast",
      desc: "Daily breakfast included with all direct room bookings."
    },
    {
      icon: <Clock size={20} className="text-accent-gold" />,
      title: "Flexible Reservation Terms",
      desc: "Easy booking adjustments with clear, guest-friendly cancellation policies."
    },
    {
      icon: <Sparkles size={20} className="text-accent-gold" />,
      title: "Secure On-Site Parking & Backup",
      desc: "Guaranteed power backup and secure vehicle parking along GT Road."
    }
  ];

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="badge-gold">Direct Room Reservation</span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-white mt-4 mb-4 leading-tight">
            Book Your Stay Directly at Hamilton Hotel
          </h2>

          <p className="text-base text-slate-300 leading-relaxed mb-10">
            Enjoy transparent Pakistani Rupee rates, instant confirmation, and dedicated GT Road hospitality.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left w-full mb-12">
            {perks.map((p, index) => (
              <div key={index} className="bg-white/5 border border-border-dark rounded p-5 flex items-start gap-3.5">
                <div className="shrink-0 mt-0.5">{p.icon}</div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-white mb-1">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/rooms" className="btn-accent px-8 py-4 text-sm">
              <span>Search Available Rooms & Rates</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
