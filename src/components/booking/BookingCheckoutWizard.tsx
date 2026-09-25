"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Room } from "@/data/rooms";
import { HOTEL_INFO } from "@/data/hotelInfo";
import { formatCurrency } from "@/utils/formatters";
import {
  CheckCircle2,
  Calendar,
  Users,
  BedDouble,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  User,
  AlertCircle,
  Printer,
  Sparkles,
} from "lucide-react";

interface BookingCheckoutWizardProps {
  room: Room;
}

interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function BookingCheckoutWizard({ room }: BookingCheckoutWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Dates & Guests State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [nights, setNights] = useState(2);

  // Initialize client-only default dates after hydration
  useEffect(() => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 2);

    const inStr = today.toISOString().split("T")[0];
    const outStr = futureDate.toISOString().split("T")[0];

    setCheckIn(inStr);
    setCheckOut(outStr);
  }, []);

  // Calculate nights dynamically when check-in or check-out changes
  useEffect(() => {
    if (checkIn && checkOut) {
      const dIn = new Date(checkIn);
      const dOut = new Date(checkOut);
      const diffTime = dOut.getTime() - dIn.getTime();
      const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setNights(calculatedNights);
    }
  }, [checkIn, checkOut]);

  // Step 2: Guest Details State & Errors
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [guestErrors, setGuestErrors] = useState<Partial<GuestDetails>>({});

  // Step 3: Payment Details State & Errors
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [paymentErrors, setPaymentErrors] = useState<Partial<PaymentDetails>>({});

  // Step 4: Generated Booking Reference
  const [bookingRef, setBookingRef] = useState("");

  // Price Math
  const subtotal = room.pricePerNight * nights;
  const taxAmount = Math.round(subtotal * 0.16); // 16% GST
  const grandTotal = subtotal + taxAmount;

  // Step 2 Validation
  const validateGuestDetails = (): boolean => {
    const errs: Partial<GuestDetails> = {};
    if (!guestDetails.firstName.trim()) errs.firstName = "First name is required";
    if (!guestDetails.lastName.trim()) errs.lastName = "Last name is required";
    if (!guestDetails.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestDetails.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!guestDetails.phone.trim()) {
      errs.phone = "Phone number is required for booking confirmation";
    }

    setGuestErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation
  const validatePaymentDetails = (): boolean => {
    const errs: Partial<PaymentDetails> = {};
    if (!paymentDetails.cardName.trim()) errs.cardName = "Cardholder name is required";
    
    const cleanNum = paymentDetails.cardNumber.replace(/\s+/g, "");
    if (!cleanNum) {
      errs.cardNumber = "Card number is required";
    } else if (cleanNum.length < 13 || cleanNum.length > 19) {
      errs.cardNumber = "Enter a valid card number (13 to 19 digits)";
    }

    if (!paymentDetails.expiry.trim()) {
      errs.expiry = "Expiry date required";
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentDetails.expiry.trim())) {
      errs.expiry = "Use MM/YY format (e.g. 12/28)";
    }

    if (!paymentDetails.cvv.trim()) {
      errs.cvv = "CVV required";
    } else if (paymentDetails.cvv.trim().length < 3) {
      errs.cvv = "3-4 digits";
    }

    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePaymentDetails()) {
      // Generate realistic booking reference number
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setBookingRef(`HAM-${randomNum}`);
      setStep(4);
    }
  };

  const stepsList = [
    { num: 1, label: "Summary" },
    { num: 2, label: "Guest Details" },
    { num: 3, label: "Payment" },
    { num: 4, label: "Confirmation" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Wizard Progress Indicator */}
      <div className="mb-10 card-base p-4 sm:p-5 rounded-2xl bg-white border border-border/70 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          {stepsList.map((s, idx) => {
            const isCompleted = step > s.num;
            const isActive = step === s.num;
            return (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                    isCompleted
                      ? "bg-accent-blue text-white"
                      : isActive
                      ? "bg-accent-blue text-white ring-4 ring-accent-blue/15"
                      : "bg-surface-warm text-text-muted border border-border"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold hidden sm:inline ${
                    isActive ? "text-text-primary font-bold" : isCompleted ? "text-accent-blue" : "text-text-muted"
                  }`}
                >
                  {s.label}
                </span>
                {idx < stepsList.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded-full ${step > s.num ? "bg-accent-blue" : "bg-border/60"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: BOOKING SUMMARY */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          {/* Room Details Card */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="card-elevated rounded-2xl bg-white border border-border/70 p-6 flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="w-24 h-20 rounded-xl object-cover border border-border shrink-0 bg-surface-warm"
                />
                <div>
                  <span className="badge-blue text-[10px] mb-1">
                    <Sparkles size={10} />
                    {room.floor}
                  </span>
                  <h2 className="font-heading text-lg font-bold text-text-primary">{room.name}</h2>
                  <p className="text-xs text-text-muted mt-0.5">{room.bedType} &bull; {room.sizeSqM} m²</p>
                </div>
              </div>

              {/* Editable Dates & Guests Inputs */}
              <div className="pt-4 border-t border-border/70 flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Stay Dates & Capacity
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Guests Selection
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none cursor-pointer"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                    <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown Sidebar */}
          <div className="lg:col-span-5">
            <div className="card-elevated rounded-2xl bg-white border border-border/70 p-6 flex flex-col gap-4 shadow-elevated">
              <h3 className="font-heading text-base font-bold text-text-primary pb-3 border-b border-border/70">
                Price Breakdown
              </h3>

              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center justify-between text-text-secondary">
                  <span>{formatCurrency(room.pricePerNight)} &times; {nights} Night{nights > 1 ? "s" : ""}</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary">
                  <span>Taxes & Fees (16% GST)</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(taxAmount)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/70 flex items-center justify-between font-heading font-bold text-base text-text-primary">
                <span>Total Amount Payable</span>
                <span className="text-xl font-extrabold text-accent-blue">{formatCurrency(grandTotal)}</span>
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 mt-2"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: GUEST DETAILS FORM */}
      {step === 2 && (
        <div className="card-elevated rounded-2xl bg-white border border-border/70 p-6 sm:p-8 animate-in fade-in duration-200">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-1">
            Guest Information
          </h2>
          <p className="text-xs text-text-secondary mb-6">
            Enter the primary guest details for booking registration at Hamilton Hotel & Suites.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Tariq"
                value={guestDetails.firstName}
                onChange={(e) => {
                  setGuestDetails({ ...guestDetails, firstName: e.target.value });
                  if (guestErrors.firstName) setGuestErrors({ ...guestErrors, firstName: undefined });
                }}
                className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                  guestErrors.firstName ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                }`}
              />
              {guestErrors.firstName && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{guestErrors.firstName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mehmood"
                value={guestDetails.lastName}
                onChange={(e) => {
                  setGuestDetails({ ...guestDetails, lastName: e.target.value });
                  if (guestErrors.lastName) setGuestErrors({ ...guestErrors, lastName: undefined });
                }}
                className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                  guestErrors.lastName ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                }`}
              />
              {guestErrors.lastName && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{guestErrors.lastName}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="e.g. tariq@example.com"
                value={guestDetails.email}
                onChange={(e) => {
                  setGuestDetails({ ...guestDetails, email: e.target.value });
                  if (guestErrors.email) setGuestErrors({ ...guestErrors, email: undefined });
                }}
                className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                  guestErrors.email ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                }`}
              />
              {guestErrors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{guestErrors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. +92 300 1234567"
                value={guestDetails.phone}
                onChange={(e) => {
                  setGuestDetails({ ...guestDetails, phone: e.target.value });
                  if (guestErrors.phone) setGuestErrors({ ...guestErrors, phone: undefined });
                }}
                className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                  guestErrors.phone ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                }`}
              />
              {guestErrors.phone && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{guestErrors.phone}</span>
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
              Special Requests / Estimated Arrival Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Late night arrival around 10 PM, quiet room preference..."
              value={guestDetails.specialRequests}
              onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
              className="w-full p-3 rounded-xl border border-border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/70">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 text-xs font-bold text-text-secondary hover:text-text-primary border border-border rounded-full hover:bg-surface-warm transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Back to Summary</span>
            </button>

            <button
              onClick={() => {
                if (validateGuestDetails()) {
                  // Pre-fill card name if empty
                  if (!paymentDetails.cardName) {
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cardName: `${guestDetails.firstName} ${guestDetails.lastName}`.trim(),
                    }));
                  }
                  setStep(3);
                }
              }}
              className="btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-1.5"
            >
              <span>Proceed to Payment</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: MOCK PAYMENT STEP */}
      {step === 3 && (
        <form onSubmit={handleConfirmBooking} className="card-elevated rounded-2xl bg-white border border-border/70 p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-text-primary">
                Payment Details
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                Complete your mock booking reservation for {room.name}.
              </p>
            </div>
            <div className="badge-blue text-[10px] px-3 py-1">
              Demo Checkout Mode
            </div>
          </div>

          {/* Demo Notice Banner */}
          <div className="bg-accent-blue-tint/70 border border-accent-blue/20 rounded-xl p-3.5 mb-6 text-xs text-accent-blue flex items-center gap-2">
            <ShieldCheck size={18} className="shrink-0" />
            <span>
              <strong>Mock Checkout:</strong> No real payment is processed. You can enter any mock card details to test confirmation.
            </span>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                Cardholder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Name on card"
                value={paymentDetails.cardName}
                onChange={(e) => {
                  setPaymentDetails({ ...paymentDetails, cardName: e.target.value });
                  if (paymentErrors.cardName) setPaymentErrors({ ...paymentErrors, cardName: undefined });
                }}
                className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                  paymentErrors.cardName ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                }`}
              />
              {paymentErrors.cardName && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{paymentErrors.cardName}</span>
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                Card Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="4000 0000 0000 0000"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => {
                    setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value });
                    if (paymentErrors.cardNumber) setPaymentErrors({ ...paymentErrors, cardNumber: undefined });
                  }}
                  className={`w-full h-11 pl-10 pr-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                    paymentErrors.cardNumber ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                  }`}
                />
                <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              </div>
              {paymentErrors.cardNumber && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{paymentErrors.cardNumber}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                  Expiry (MM/YY) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="12/28"
                  value={paymentDetails.expiry}
                  onChange={(e) => {
                    setPaymentDetails({ ...paymentDetails, expiry: e.target.value });
                    if (paymentErrors.expiry) setPaymentErrors({ ...paymentErrors, expiry: undefined });
                  }}
                  className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                    paymentErrors.expiry ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                  }`}
                />
                {paymentErrors.expiry && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={11} />
                    <span>{paymentErrors.expiry}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                  CVV / CVC <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  maxLength={4}
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => {
                    setPaymentDetails({ ...paymentDetails, cvv: e.target.value });
                    if (paymentErrors.cvv) setPaymentErrors({ ...paymentErrors, cvv: undefined });
                  }}
                  className={`w-full h-11 px-3.5 rounded-xl border text-xs font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
                    paymentErrors.cvv ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
                  }`}
                />
                {paymentErrors.cvv && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle size={11} />
                    <span>{paymentErrors.cvv}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/70">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 text-xs font-bold text-text-secondary hover:text-text-primary border border-border rounded-full hover:bg-surface-warm transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Back to Guest Details</span>
            </button>

            <button
              type="submit"
              className="btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <span>Confirm & Pay {formatCurrency(grandTotal)}</span>
              <CheckCircle2 size={16} />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: CONFIRMATION / SUCCESS SCREEN */}
      {step === 4 && (
        <div className="card-elevated rounded-2xl bg-white border border-border/70 p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
              <CheckCircle2 size={36} />
            </div>
            <span className="badge-blue text-xs">Booking Confirmed</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
              Reservation Successful!
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md">
              We look forward to welcoming you to {HOTEL_INFO.name}. A confirmation email has been dispatched.
            </p>
          </div>

          {/* Reference Number Box */}
          <div className="bg-surface-warm border border-border/70 rounded-2xl p-5 text-center flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Booking Reference Number
            </span>
            <span className="font-heading text-2xl font-extrabold text-accent-blue tracking-wider">
              {bookingRef}
            </span>
          </div>

          {/* Reservation Summary */}
          <div className="border border-border/70 rounded-2xl p-5 flex flex-col gap-4 text-xs">
            <h3 className="font-heading text-sm font-bold text-text-primary pb-2 border-b border-border/70">
              Reservation Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-text-muted block">Room Type:</span>
                <span className="font-semibold text-text-primary">{room.name}</span>
              </div>
              <div>
                <span className="text-text-muted block">Primary Guest:</span>
                <span className="font-semibold text-text-primary">{guestDetails.firstName} {guestDetails.lastName}</span>
              </div>
              <div>
                <span className="text-text-muted block">Check-In / Out:</span>
                <span className="font-semibold text-text-primary">{checkIn} to {checkOut} ({nights} Night{nights > 1 ? "s" : ""})</span>
              </div>
              <div>
                <span className="text-text-muted block">Total Paid:</span>
                <span className="font-semibold text-accent-blue">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="bg-white border border-border/70 rounded-2xl p-4 flex items-start gap-3 text-xs text-text-secondary">
            <ShieldCheck size={20} className="text-accent-blue shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-text-primary mb-0.5">Check-in Instructions</h4>
              <p>
                Present reference ID <strong className="text-text-primary">{bookingRef}</strong> or your phone number upon arrival at the front desk. Check-in starts at 2:00 PM. Guarded GT Road parking is ready for your arrival.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/70">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 text-xs font-bold text-text-primary bg-surface border border-border rounded-full hover:bg-surface-warm transition-all flex items-center gap-1.5"
            >
              <Printer size={15} />
              <span>Print / Save Confirmation</span>
            </button>

            <Link href="/rooms" className="btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-1.5">
              <span>Return to All Rooms</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
