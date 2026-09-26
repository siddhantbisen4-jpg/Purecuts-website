"use client";

import React from "react";
import { ShieldCheck, Truck, Banknote, Sparkles, Star, CheckCircle, Store, HeartHandshake } from "lucide-react";

const REVIEWS = [
  {
    name: "Rohan Kulkarni",
    role: "Studio Owner, Kothrud Pune",
    rating: 5,
    text: "We order monthly salon supplies, Matrix masques, and neck strips from PureCuts. Original products with sealed batch codes and prompt Wagholi dispatch.",
  },
  {
    name: "Dr. Shreya Patel",
    role: "Aesthetician & Spa Director",
    rating: 5,
    text: "Dr. Rashel facial creams and VLCC kits at ₹109 have helped our cleanup margins substantially. Genuine products and smooth doorstep delivery.",
  },
  {
    name: "Nitin Sharma",
    role: "Master Barber, Grooming Lounge",
    rating: 5,
    text: "Bought 3 Wahl Super Taper clippers and Ikonic straighteners. 100% genuine with warranty cards. Best salon supply marketplace in India.",
  },
];

export function WhyPureCuts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Why Choose PureCuts (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Why PureCuts?
              </span>
              <span className="text-xs text-slate-500 font-semibold">The Salon Industry's Trusted Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-4">
              Designed for Salons, Barbershops & Beauty Enthusiasts
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">100% Genuine Guarantee</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Direct manufacturer & authorized distributor stock only.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Truck className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Express Pune Dispatch</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Orders packed & shipped directly from Wagholi Domkhel Hub.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800 shrink-0">
                <Store className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Direct Wholesale Margins</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">High profit margins for salons on bulk chemicals & kits.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 shrink-0">
                <Banknote className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">COD & Easy Returns</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Pay cash upon delivery or via instant UPI / NetBanking.</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <CheckCircle className="w-4 h-4" /> Over 10,000+ Salon Orders Fulfilled
            </span>
            <span className="text-slate-400">Domestic & International Brands</span>
          </div>
        </div>

        {/* Verified Salon Testimonials (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> Verified Salon Reviews
              </span>
              <span className="text-xs text-slate-400">4.9 / 5.0 Rating</span>
            </div>

            <div className="space-y-4">
              {REVIEWS.map((rev, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white">{rev.name}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">"{rev.text}"</p>
                  <span className="block text-[10px] text-amber-400/80 font-medium mt-1">
                    {rev.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
