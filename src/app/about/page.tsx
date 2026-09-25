import { Metadata } from "next";
import Link from "next/link";
import { HOTEL_INFO } from "@/data/hotelInfo";
import GallerySection from "@/components/gallery/GallerySection";
import { BedDouble, Star, Zap, Shield, ShieldCheck, HeartHandshake, Utensils, Compass, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${HOTEL_INFO.name}`,
  description: "Learn about Hamilton Hotel & Suites — family-run 45-room hotel along GT Road, Hamilton, Pakistan. Clean rooms, 24/7 generator backup, and secure parking.",
};

export default function AboutPage() {
  const whyChooseUsPillars = [
    {
      icon: <Zap className="text-accent-blue" size={20} />,
      title: "24/7 Heavy-Duty Power Backup",
      description: "Equipped with dual heavy-duty commercial generators, ensuring uninterruptible AC, heating, and lighting at all hours regardless of local grid load shedding."
    },
    {
      icon: <Shield className="text-accent-blue" size={20} />,
      title: "Guarded On-Site GT Road Parking",
      description: "Spacious private parking compound directly off GT Road with 24/7 security guards and high-definition CCTV coverage for absolute vehicle safety."
    },
    {
      icon: <Utensils className="text-accent-blue" size={20} />,
      title: "Fresh In-House Hamilton Dining",
      description: "Our dedicated kitchen serves freshly prepared local Pakistani meals, hot chai, and continental breakfast items made to order for room service or dining hall."
    },
    {
      icon: <HeartHandshake className="text-accent-blue" size={20} />,
      title: "Grounded Family-Run Hospitality",
      description: "Established in 2012, our front desk and housekeeping staff take personal pride in maintaining clean, spotless linen and prompt, courteous guest assistance."
    }
  ];

  return (
    <div className="bg-bg min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-surface border-b border-border py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="badge-blue mb-3.5 inline-flex items-center gap-1.5">
              <Compass size={13} />
              About Hamilton Hotel & Suites
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-text-primary mt-1 mb-4 leading-tight">
              A Reliable & Comfortable Stopover on GT Road
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6">
              Founded in 2012, {HOTEL_INFO.name} offers clean, well-maintained accommodations designed specifically for highway travelers, business professionals, and visiting families.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/rooms" className="btn-primary px-6 py-3 text-sm font-bold">
                <span>View Rooms & Rates</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="px-6 py-3 text-sm font-semibold text-text-primary bg-white border border-border rounded-full hover:border-accent-blue/40 transition-all shadow-xs">
                Contact Reception
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & History */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Copy */}
            <div className="lg:col-span-7">
              <span className="badge-blue mb-2.5">Our Story</span>
              <h2 className="font-heading text-2xl sm:text-4xl font-bold text-text-primary mt-1 mb-5">
                Over a Decade of Serving GT Road Travelers
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                <p>
                  {HOTEL_INFO.name} began with a simple mission: to create a dependable, clean, and safe haven along the busy GT Road transit route. When we opened our doors in 2012 with just 15 rooms, GT Road travelers frequently struggled to find lodging that guaranteed uninterrupted power, clean bathrooms, and secure overnight vehicle parking.
                </p>
                <p>
                  Over the past 12+ years, we have grown into a 45-room property while keeping our family-run values intact. Every room features split climate control, pristine bedding, fast Wi-Fi, and 24/7 commercial generator backup so your rest is never compromised.
                </p>
                <p>
                  Whether you are driving across the province, attending corporate meetings in Hamilton, or traveling with extended family, our team ensures a hassle-free, comfortable stay.
                </p>
              </div>

              {/* Stat Chips Row */}
              <div className="flex flex-wrap items-center gap-2.5 mt-8 pt-8 border-t border-border/70">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-blue bg-accent-blue-tint rounded-full border border-accent-blue/15">
                  <BedDouble size={14} />
                  <span>45 Guest Rooms</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-gold bg-accent-gold-tint rounded-full border border-accent-gold/20">
                  <Star size={14} className="fill-accent-gold" />
                  <span>4.8 Rating (1,200+ Reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-accent-blue bg-accent-blue-tint rounded-full border border-accent-blue/15">
                  <Zap size={14} />
                  <span>Established 2012</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-text-primary bg-surface-warm rounded-full border border-border">
                  <Shield size={14} />
                  <span>24/7 Security & Parking</span>
                </span>
              </div>
            </div>

            {/* Feature Image Grid */}
            <div className="lg:col-span-5">
              <div className="card-base p-3 rounded-3xl bg-white border border-border/70 shadow-elevated">
                <div className="relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-surface-warm">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
                    alt="Hamilton Hotel Lobby & Lounge"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-border/60 shadow-md">
                    <div className="flex items-center gap-2 text-accent-blue font-bold text-xs uppercase tracking-wider mb-1">
                      <ShieldCheck size={16} />
                      <span>GT Road Benchmark</span>
                    </div>
                    <p className="text-xs text-text-primary font-semibold">
                      Trusted by over 45,000 satisfied guests since 2012.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Guests Choose Us (4 Pillars) */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-blue mb-2.5">Why Choose Us</span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-text-primary mt-1">
              Four Core Promises to Every Guest
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-2">
              We focus on executing the travel essentials with high reliability and zero fuss.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPillars.map((pillar, idx) => (
              <div key={idx} className="card-base p-6 rounded-2xl bg-white border border-border/70 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-blue-tint border border-accent-blue/20 flex items-center justify-center shrink-0">
                  {pillar.icon}
                </div>
                <h3 className="font-heading text-base font-bold text-text-primary mt-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reused Gallery Section */}
      <GallerySection />
    </div>
  );
}
