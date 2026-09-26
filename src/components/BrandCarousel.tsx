"use client";

import React from "react";
import Link from "next/link";
import { Award, ArrowRight } from "lucide-react";

const BRANDS = [
  { name: "L'Oréal Professionnel", query: "L'Oréal", count: "48+ Products", badge: "Color & Spa" },
  { name: "Matrix Biolage", query: "Matrix", count: "35+ Products", badge: "Hair Masques" },
  { name: "Schwarzkopf Professional", query: "Schwarzkopf", count: "28+ Products", badge: "Bonacure & Igora" },
  { name: "Ikonic Professional", query: "Ikonic", count: "22+ Tools", badge: "Straighteners & Dryers" },
  { name: "Wahl Professional", query: "Wahl", count: "16+ Clippers", badge: "USA Barbers" },
  { name: "Dr. Rashel", query: "Dr. Rashel", count: "30+ Tubs", badge: "Facials @ ₹109" },
  { name: "VLCC Natural Sciences", query: "VLCC", count: "25+ Cleansers", badge: "Ayurvedic" },
  { name: "Streax Professional", query: "Streax", count: "18+ Colors", badge: "Argan Secrets" },
  { name: "Lotus Professional", query: "Lotus", count: "14+ Scrubs", badge: "Enzyme Glow" },
  { name: "Gillette Wilkinson", query: "Gillette", count: "12+ Blades", badge: "Barber Packs" },
];

export function BrandCarousel() {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#795BCB] px-2.5 py-0.5 rounded-full">
              Official Distributors
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 mt-1">
              <Award className="w-5 h-5 text-[#795BCB]" />
              Shop by Top Salon Brands
            </h2>
          </div>
          <Link
            href="/brands"
            className="text-xs font-bold text-amber-700 hover:text-[#795BCB] hover:underline shrink-0"
          >
            All Brands →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/category/all?brand=${encodeURIComponent(brand.query)}`}
              className="group p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-[#795BCB] hover:shadow-md transition-all flex flex-col justify-between text-left"
            >
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {brand.badge}
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#795BCB] transition leading-snug">
                  {brand.name}
                </h3>
              </div>
              <div className="mt-2.5 sm:mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-medium">
                <span>{brand.count}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#795BCB] group-hover:translate-x-0.5 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
