"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { NAV_CATEGORIES } from "./navCategories";
export function Footer() {
  const { openB2BModal, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (newsletterEmail) {
      setSubscribed(true);
      showToast("Thank you for subscribing to PureCuts Salon Deals!");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(121,91,203,0.16),transparent_38%),radial-gradient(ellipse_at_bottom_right,rgba(184,160,255,0.20),transparent_35%),linear-gradient(135deg,#fbfaff_0%,#ffffff_48%,#f5f1ff_100%)] text-slate-700 pt-8 sm:pt-14 lg:pt-16 pb-6 sm:pb-12 border-t border-[#795BCB]/20">
      {/* =========================================================
          GUARANTEES STRIP
      ```tsx
{/* TRUST BENEFITS */}
      <div className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-25">
            {/* Genuine Stock */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#795BCB]/20 bg-[#795BCB]/5 px-3.5 py-2.5 sm:px-5 sm:py-3">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#795BCB] shrink-0" />
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                  100% Genuine Stock
                </p>
                <p className="text-[9px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                  Direct from authorized brands
                </p>
              </div>
            </div>

            {/* Fast Delivery */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#795BCB]/20 bg-[#795BCB]/5 px-3.5 py-2.5 sm:px-5 sm:py-3">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#795BCB] shrink-0" />
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                  Fast Doorstep Delivery
                </p>
                <p className="text-[9px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                  Dispatch from Wagholi, Pune Hub
                </p>
              </div>
            </div>

            {/* Secure Payments */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#795BCB]/20 bg-[#795BCB]/5 px-3.5 py-2.5 sm:px-5 sm:py-3">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-[#795BCB] shrink-0" />
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-900 leading-tight">
                  COD & Secure Payments
                </p>
                <p className="text-[9px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                  Cash on delivery + 100% safe UPI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN FOOTER
          ========================================================= */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-7 sm:pt-10 lg:pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 sm:gap-10 lg:gap-10">
          {/* =====================================================
              COMPANY INFORMATION
              ===================================================== */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <img
                src="https://purecuts.in/wp-content/uploads/2025/06/purecuts_logo_no_bg-cropped.png"
                alt="PureCuts"
                width={120}
                height={50}
                className="w-[90px] sm:w-[120px] h-auto object-contain"
              />
            </Link>

            {/*<p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              PureCuts is India's dedicated professional salon, beauty, and
              personal care marketplace. We supply genuine salon essentials,
              electricals, furniture, colors, and treatments to salons,
              barbershops, academies, and consumers nationwide.
            </p>*/}

            <div className="space-y-2.5 sm:space-y-3 pt-1.5 sm:pt-2 text-[11px] sm:text-sm text-slate-600">
              {/* Address */}
              <div className="flex items-start gap-2 sm:gap-2.5">
                <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500 shrink-0 mt-0.5" />

                <span className="leading-relaxed">
                  <strong className="text-slate-900">EUREKA, A Building</strong>
                  , GHRCEM Domkhel Road, Wagholi - 412207, Pune, Maharashtra
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-500 shrink-0" />

                <a
                  href="tel:+919579177826"
                  className="hover:text-[#795BCB] transition leading-relaxed"
                >
                  +91 9579177826 / +91 7715950954
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 shrink-0" />

                <a
                  href="mailto:contact@purecuts.in"
                  className="hover:text-[#795BCB] transition leading-relaxed break-all sm:break-normal"
                >
                  contact@purecuts.in / info@purecuts.in
                </a>
              </div>

              {/* Timing */}
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-slate-500 shrink-0 mt-0.5" />

                <span className="leading-relaxed">
                  Mon - Sat: 9:00 AM - 8:00 PM IST
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              YOUR ACCOUNT
              ===================================================== */}

          {/* =====================================================
              TOP CATEGORIES
              ===================================================== */}
          <div>
            <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 sm:mb-4">
              <span className="text-[#795BCB]">Top Categories</span>
            </h4>

            <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-sm text-slate-600">
              {NAV_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#795BCB] transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              COMPANY & HELP
              ===================================================== */}
          <div>
            <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 sm:mb-4">
              <span className="text-[#795BCB]">More from Purecuts</span>
            </h4>

            <ul className="space-y-2 sm:space-y-2.5 text-[11px] sm:text-sm text-slate-600">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-[#795BCB] transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#795BCB] transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-[#795BCB] transition">
                  Salon Blog & Tips
                </Link>
              </li>

              <li>
                <button
                  onClick={openB2BModal}
                  className="hover:text-[#795BCB] transition text-left font-semibold"
                >
                  Salon Wholesale / B2B Inquiry
                </button>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#795BCB] transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-[#795BCB] transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              NEWSLETTER
              ===================================================== 
          <div className="space-y-3.5 sm:space-y-4 sm:col-span-2 lg:col-span-1">

            <h4 className="text-[11px] sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              <span className="text-[#795BCB]">
                Salon Deals Newsletter
              </span>
            </h4>

            <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
              Subscribe to receive weekly salon discount coupons, bulk deals,
              and new product arrival alerts.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-[11px] sm:text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />

                <span>
                  Subscribed! Use code{" "}
                  <strong>PURECUTS10</strong> for 10% off.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="space-y-2"
              >
                <div className="relative w-full min-w-0">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) =>
                      setNewsletterEmail(e.target.value)
                    }
                    placeholder="Enter salon email..."
                    className="w-full min-w-0 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl bg-white border border-[#795BCB] text-[12px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#795BCB]/20 focus:border-[#795BCB]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 bg-[#795BCB] hover:bg-[#6246B0] text-white font-bold rounded-xl text-[11px] sm:text-sm transition flex items-center justify-center gap-1.5"
                >
                  <span>Claim ₹100 Salon Voucher</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Authorized Brands 
            <div className="pt-1.5 sm:pt-2">
              <span className="text-[9px] sm:text-[11px] text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                Authorized Brands
              </span>

              <p className="text-[9px] sm:text-[11px] text-slate-500 leading-relaxed">
                L&apos;Oréal Professionnel • Schwarzkopf • Matrix • Ikonic •
                Wahl • Dr. Rashel • VLCC • Streax • Gillette
              </p>
            </div>
          </div> */}
        </div>

        {/* =========================================================
            BOTTOM COPYRIGHT
            ========================================================= */}
        <div className="mt-7 sm:mt-10 lg:mt-12 pt-5 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[9px] sm:text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} PureCuts. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
