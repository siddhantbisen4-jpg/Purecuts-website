"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_BRANDS_DATA, BrandDetail } from "@/lib/brands-data";
import {
  Award,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  SlidersHorizontal,
  X,
  ExternalLink,
} from "lucide-react";

export default function BrandsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    ALL_BRANDS_DATA.forEach((b) => set.add(b.categoryFocus.split("&")[0].trim()));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredBrands = useMemo(() => {
    return ALL_BRANDS_DATA.filter((b) => {
      if (selectedCategory !== "all") {
        if (!b.categoryFocus.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.categoryFocus.toLowerCase().includes(q) ||
          b.origin.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#faf8fe] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">All Salon Brands</span>
        </nav>

        {/* Hero Banner with purecuts purple gradient */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white pc-gradient-hero border border-purple-900/40 shadow-xl">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-black text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Official Salon Brand Partners</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-black">
              All Top Salon & Barber Brands at PureCuts
            </h1>

            <p className="text-xs sm:text-sm text-black leading-relaxed">
              Explore 100% genuine domestic & international salon brands. Direct manufacturer batch
              authenticity, warranty certification, and tax-compliant GST invoicing across India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-purple-200">
              <span className="flex items-center gap-1.5 font-semibold text-black">
                <ShieldCheck className="w-4 h-4 text-emerald-300" /> 100% Original Stock
              </span>
              <span>•</span>
              <span className="text-black flex items-center gap-1.5 font-semibold">
                <Building2 className="w-4 h-4 text-amber-300" /> Wagholi Pune Distribution Hub
              </span>
              
              
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand by name (e.g. L'Oréal, Wahl, Matrix, Ikonic)..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Results */}
            <div className="text-xs text-slate-500 font-semibold">
              Showing <strong className="text-slate-900">{filteredBrands.length}</strong> of{" "}
              {ALL_BRANDS_DATA.length} brands
            </div>
          </div>

          {/* Category Filter Chips 
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>*/}
        </div>

        {/* Brands Grid */}
        {/* Brands Grid */}
{filteredBrands.length === 0 ? (
  <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-sm">
    <div className="w-16 h-16 bg-purple-50 text-[#795BCB] rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Search className="w-8 h-8" />
    </div>

    <h2 className="text-lg font-bold text-slate-900 mb-1">
      No brands found
    </h2>

    <p className="text-xs text-slate-500 mb-6">
      No brand matched "{searchQuery}". Try searching for L&apos;Oréal,
      Matrix, Ikonic, Wahl, or Dr. Rashel.
    </p>

    <button
      onClick={() => {
        setSearchQuery("");
        setSelectedCategory("all");
      }}
      className="px-6 py-2.5 bg-[#795BCB] hover:bg-[#6246B0] text-white text-xs font-bold rounded-xl transition"
    >
      Reset Search
    </button>
  </div>
) : (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
    {filteredBrands.map((brand) => (
      <div
        key={brand.slug}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-purple-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl"
      >
        {/* Decorative circle */}
        <div className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-purple-50 transition-all duration-500 group-hover:scale-[1.8] group-hover:bg-purple-100" />

        {/* Top section */}
        <div className="relative flex items-start justify-between gap-3">
          {/* Brand image/logo */}
          <span className="grid  place-items-center rounded-2xl bg-black shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 overflow-hidden">
            <img
              src={brand.heroImage}
              alt={brand.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </span>

          {/* Authorised badge */}
          <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-black tracking-wide text-[#795BCB] uppercase">
            <CheckCircle2 className="w-3 h-3" />
            Authorised
          </span>
        </div>

        {/* Brand information */}
        <div className="relative mt-5">
          <h3 className="text-lg font-black tracking-tight text-slate-900 transition-colors group-hover:text-[#795BCB]">
            {brand.name}
          </h3>

          <p className="mt-1 text-[12.5px] font-bold text-slate-500">
            {brand.productCount}+ products
          </p>

          {/* Existing brand information */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#795BCB]">
              {brand.categoryFocus}
            </span>

            <span className="text-[10px] font-semibold text-slate-400">
              {brand.origin}
            </span>
          </div>

          <span className="mt-5 flex items-center gap-1.5 border-t border-purple-50 pt-4 text-[12px] font-black tracking-wide text-[#795BCB] uppercase transition-all group-hover:gap-2.5">
            <Link
              href={`/category/all?brand=${encodeURIComponent(brand.query)}`}
              className="flex items-center gap-1.5"
            >
              View Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </span>
        </div>
      </div>
    ))}
  </div>
)}
        {/* Salon Wholesale Banner 
        <div className="rounded-3xl p-6 sm:p-8 pc-gradient-primary text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-purple-100 px-2.5 py-0.5 rounded-full inline-block">
              Salon Bulk Orders
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Need Multi-Brand Carton Quotes with GST?
            </h3>
            <p className="text-xs text-purple-100/90 max-w-xl">
              Mix and match L'Oréal, Matrix, Ikonic, Dr. Rashel, and Wahl orders under one single
              tax invoice directly from our Wagholi, Pune warehouse.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="px-6 py-3 bg-white text-slate-900 hover:bg-purple-50 font-black text-xs sm:text-sm rounded-xl transition shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Request Wholesale Rate Card</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>*/}
      </div>
    </main>
  );
}
