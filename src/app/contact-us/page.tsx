"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Building2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactUsPage() {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      showToast("Thank you! Your message has been sent to PureCuts Pune support.");
    }, 600);
  };

  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Contact PureCuts Support</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-8 text-white border border-slate-800 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Customer & Salon Support
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-3 mb-2">Get in Touch</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Have questions regarding salon wholesale orders, product authenticity, or delivery timelines? Our team in Wagholi, Pune is ready to help.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">Headquarters & Fulfillment Hub</strong>
                  <p className="text-slate-300">
                    EUREKA, A Building, GHRCEM Domkhel Road, Wagholi - 412207, Pune, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">Call & WhatsApp Support</strong>
                  <p className="text-slate-300">
                    <a href="tel:+919579177826" className="hover:text-amber-400 transition font-bold block">
                      +91 9579177826
                    </a>
                    <a href="tel:+917715950954" className="hover:text-amber-400 transition block mt-0.5">
                      +91 7715950954 (Customer Care)
                    </a>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">Email Inquiries</strong>
                  <p className="text-slate-300">
                    <a href="mailto:contact@purecuts.in" className="hover:text-amber-400 transition block">
                      contact@purecuts.in
                    </a>
                    <a href="mailto:support@purecuts.in" className="hover:text-amber-400 transition block mt-0.5">
                      support@purecuts.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-bold mb-0.5">Business Hours</strong>
                  <p className="text-slate-300">Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Send Us a Message</h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in the details below and a representative will reply within 2 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Our customer service team at Wagholi, Pune has received your inquiry. We will contact you on your provided phone/email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Anand More"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. anand@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject / Inquiry Type</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800"
                    >
                      <option value="">General Support Inquiry</option>
                      <option value="wholesale">Salon Bulk / Wholesale Order</option>
                      <option value="tracking">Order Tracking & Dispatch</option>
                      <option value="product">Product Information & Shade Guide</option>
                      <option value="return">Return or Refund Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you today? Provide order numbers or product names if applicable..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending Message..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
