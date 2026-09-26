"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scissors,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Lock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import logo from "../image/logo.png";
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
    <footer className="bg-white text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">100% Genuine Stock</h4>
              <p className="text-xs text-black">Direct from authorized brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">Fast Doorstep Delivery</h4>
              <p className="text-xs text-black">Dispatch from Wagholi Pune Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">Salon B2B Wholesale</h4>
              <p className="text-xs text-black">GST billing & bulk carton rates</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">COD & Secure Payments</h4>
              <p className="text-xs text-black">Cash on delivery + 100% safe UPI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
         
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="https://purecuts.in/wp-content/uploads/2025/06/purecuts_logo_no_bg-cropped.png" width="120px" />
            </Link>
          

            <p className="text-xs text-black leading-relaxed max-w-sm">
              PureCuts is India's dedicated professional salon, beauty, and personal care marketplace. We supply genuine salon essentials, electricals, furniture, colors, and treatments to salons, barbershops, academies, and consumers nationwide.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-black">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>EUREKA, A Building</strong>, GHRCEM Domkhel Road, Wagholi - 412207, Pune, Maharashtra
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-6 h-6 text-emerald-400 shrink-0" />
                <a href="tel:+919579177826" className="hover:text-amber-400 transition">
                  +91 9579177826 / +91 7715950954
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-6 h-6 text-blue-400 shrink-0" />
                <a href="mailto:contact@purecuts.in" className="hover:text-amber-400 transition">
                  contact@purecuts.in / info@purecuts.in
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-black">
                <Clock className="w-6 h-6 text-slate-500 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Quick Categories Column */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4 text-amber-400">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-black">
              <li>
                <Link href="/category/haircare" className="hover:text-white transition">
                  Haircare & Treatments
                </Link>
              </li>
              <li>
                <Link href="/category/skincare" className="hover:text-white transition">
                  Skincare & Facial Kits
                </Link>
              </li>
              <li>
                <Link href="/category/machineries" className="hover:text-white transition">
                  Clippers, Trimmers & Dryers
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="hover:text-white transition">
                  Blades, Scissors & Shaving
                </Link>
              </li>
              <li>
                <Link href="/category/furniture" className="hover:text-white transition">
                  Salon Chairs & Wash Units
                </Link>
              </li>
              <li>
                <Link href="/category/disposable" className="hover:text-white transition">
                  Neck Rolls & Disposables
                </Link>
              </li>
              <li>
                <Link href="/category/hair-color" className="hover:text-white transition">
                  Hair Color & Developers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support (Includes About Us, Blog, Contact Us) */}
          <div>
            <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4 text-amber-400">
              Company & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-black">
              <li>
                <Link href="/about-us" className="hover:text-white transition font-medium text-slate-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition font-medium text-slate-200">
                  Salon Blog & Tips
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition font-medium text-slate-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  onClick={openB2BModal}
                  className="hover:text-amber-400 transition text-left text-black font-semibold"
                >
                  Salon Wholesale / B2B Inquiry
                </button>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Salon Discount Voucher Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-black uppercase tracking-wider text-amber-400">
              Salon Deals Newsletter
            </h4>
            <p className="text-xs text-black leading-relaxed">
              Subscribe to receive weekly salon discount coupons, bulk deals, and new product arrival alerts.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Use code <strong>PURECUTS10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter salon email..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#795BCB] text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#795BCB] hover:bg-[#795BCB] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Claim ₹100 Salon Voucher</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                Authorized Brands
              </span>
              <p className="text-[11px] text-slate-400">
                L'Oréal Professionnel • Schwarzkopf • Matrix • Ikonic • Wahl • Dr. Rashel • VLCC • Streax • Gillette
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PureCuts. All Rights Reserved. Domkhel Road, Wagholi, Pune.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms</Link>
            <span>•</span>
            <Link href="/contact-us" className="hover:text-slate-300 transition">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
