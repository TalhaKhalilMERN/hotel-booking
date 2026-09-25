"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message content is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="card-elevated p-8 sm:p-10 rounded-2xl bg-white border border-border/70 flex flex-col items-center text-center gap-4 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-text-primary">
          Message Sent Successfully!
        </h3>
        <p className="text-sm text-text-secondary max-w-md leading-relaxed">
          Thank you, <span className="font-semibold text-text-primary">{formData.name}</span>. Our front desk team at Hamilton Hotel & Suites has received your message and will reply to <span className="font-semibold text-text-primary">{formData.email}</span> shortly.
        </p>
        <button
          onClick={handleReset}
          className="mt-2 btn-primary px-6 py-2.5 text-xs font-bold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-elevated p-6 sm:p-8 rounded-2xl bg-white border border-border/70 flex flex-col gap-5">
      <div>
        <h3 className="font-heading text-xl font-bold text-text-primary">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-text-secondary mt-1">
          Have a question about room availability, group bookings, or GT Road directions? Fill out the form below.
        </p>
      </div>

      {/* Name Input */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Tariq Mehmood"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          className={`w-full h-11 px-3.5 rounded-xl border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
            errors.name ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
          }`}
        />
        {errors.name && (
          <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email & Phone Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. tariq@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            className={`w-full h-11 px-3.5 rounded-xl border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
              errors.email ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
            }`}
          />
          {errors.email && (
            <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            placeholder="e.g. +92 300 1234567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full h-11 px-3.5 rounded-xl border border-border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white focus:border-accent-blue outline-none transition-all"
          />
        </div>
      </div>

      {/* Message Area */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-1">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Specify room preferences, check-in dates, or any special requests..."
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          className={`w-full p-3.5 rounded-xl border text-sm font-semibold text-text-primary bg-surface-warm/80 focus:bg-white outline-none transition-all ${
            errors.message ? "border-red-400 focus:border-red-500" : "border-border focus:border-accent-blue"
          }`}
        />
        {errors.message && (
          <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md mt-1"
      >
        <Send size={16} />
        <span>Send Message</span>
      </button>
    </form>
  );
}
