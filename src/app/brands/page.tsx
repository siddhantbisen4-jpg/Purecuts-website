"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Brand } from "@/lib/types";
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
  Package,
} from "lucide-react";

// Initial fallback brands while live Firebase brands are loading
const INITIAL_FALLBACK_BRANDS: Brand[] = [];

export default function BrandsDirectoryPage() {
  const [brands, setBrands] = useState<Brand[]>(INITIAL_FALLBACK_BRANDS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveBrands() {
      try {
        const res = await fetch("/api/brands");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setBrands(data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch live brands:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchLiveBrands();
    return () => {
      isMounted = false;
    };
  }, []);

  // Alphabet letters list for quick jumping
  const alphabet = useMemo(() => {
    const letters = new Set<string>();
    brands.forEach((b) => {
      const first = (b.name || "").trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) {
        letters.add(first);
      }
    });
    return ["ALL", ...Array.from(letters).sort()];
  }, [brands]);

  // Filtered brands
  const filteredBrands = useMemo(() => {
    return brands.filter((b) => {
      const clean = b.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (clean === "purecuts" || clean === "purecut" || clean === "unknown" || clean === "na") {
        return false;
      }

      const name = b.name.toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      if (q && !name.includes(q)) {
        return false;
      }

      if (selectedLetter !== "ALL") {
        const first = (b.name || "").trim().charAt(0).toUpperCase();
        if (first !== selectedLetter) return false;
      }

      return true;
    });
  }, [brands, searchQuery, selectedLetter]);

  return (
    <main className="min-h-screen bg-[#faf8fe] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#795BCB] font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">All Salon Brands</span>
        </nav>

        {/* Hero Banner with purecuts purple gradient */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-gradient-to-r from-[#2c1257] via-[#4d2491] to-[#795BCB] border border-purple-900/40 shadow-xl">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Official Salon Brand Partners & Direct Supply</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Salon Brands Directory
            </h1>

            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              Explore 100% genuine domestic & international salon brands. Direct manufacturer batch
              authenticity, warranty certification, and tax-compliant GST invoicing across India.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-purple-200">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-300" /> 100% Original Stock
              </span>
              <span>•</span>
              <span className="text-white flex items-center gap-1.5 font-semibold">
                <Building2 className="w-4 h-4 text-amber-300" /> Wagholi Pune Distribution Hub
              </span>
              <span>•</span>
              <span className="text-white flex items-center gap-1.5 font-semibold">
                <Package className="w-4 h-4 text-purple-300" /> {brands.length}+ Live Brands
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
                placeholder="Search brand by name (e.g. L'Oréal, Wahl, Matrix, Ikonic, VGR)..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#795BCB] font-medium"
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
              {brands.length} brands
            </div>
          </div>

          {/* Alphabet Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#795BCB]" /> Index:
            </span>
            {alphabet.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition shrink-0 ${
                  selectedLetter === letter
                    ? "bg-[#795BCB] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-[#795BCB]"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-3xl bg-slate-200/60 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        )}

        {/* Brands Grid */}
        {!isLoading && filteredBrands.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-sm">
            <div className="w-16 h-16 bg-purple-50 text-[#795BCB] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-1">No brands found</h2>

            <p className="text-xs text-slate-500 mb-6">
              No brand matched &quot;{searchQuery}&quot;. Try searching for L&apos;Oréal, Matrix, Ikonic,
              Wahl, Streax, or VGR.
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLetter("ALL");
              }}
              className="px-6 py-2.5 bg-[#795BCB] hover:bg-[#6246B0] text-white text-xs font-bold rounded-xl transition"
            >
              Reset Search
            </button>
          </div>
        ) : !isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id || brand.slug || brand.name}
                href={`/category/all?brand=${encodeURIComponent(brand.name)}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-purple-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl"
              >
                {/* Decorative background glow on hover */}
                <div className="pointer-events-none absolute -top-10 -right-10 w-28 h-28 rounded-full bg-purple-50 transition-all duration-500 group-hover:scale-[1.8] group-hover:bg-purple-100/60" />

                {/* Top section: Logo and Verified Badge */}
                <div className="relative flex items-center justify-between gap-3">
                  {/* Brand Logo Container */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50/90 border border-slate-100 p-2 flex items-center justify-center shadow-xs overflow-hidden group-hover:border-purple-200 transition">
                    {brand.image ? (
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                          const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-[#795BCB] to-purple-600 text-white font-extrabold text-sm items-center justify-center ${
                        brand.image ? "hidden" : "flex"
                      }`}
                    >
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Authorised Badge 
                  <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-black tracking-wide text-[#795BCB] uppercase">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Authorised
                  </span>*/}
                </div>

                {/* Brand information */}
                <div className="relative mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black tracking-tight text-slate-900 transition-colors group-hover:text-[#795BCB] line-clamp-1">
                      {brand.name}
                    </h3>

                    <p className="mt-1 text-xs font-bold text-slate-500">
                      {brand.productCount > 0
                        ? `${brand.productCount} Products Available`
                        : "Salon Catalog Line"}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-xs font-black tracking-wide text-[#795BCB] uppercase group-hover:translate-x-1 transition-transform">
                    <span>Shop Brand</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Salon Wholesale Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#2c1257] to-[#795BCB] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-purple-100 px-2.5 py-0.5 rounded-full inline-block">
              Salon Bulk Orders
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Need Multi-Brand Carton Quotes with GST?
            </h3>
            <p className="text-xs text-purple-100/90 max-w-xl">
              Mix and match L&apos;Oréal, Matrix, Ikonic, Dr. Rashel, and Wahl orders under one single
              tax invoice directly from our Wagholi, Pune warehouse.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="px-6 py-3 bg-white text-slate-900 hover:bg-purple-50 font-black text-xs sm:text-sm rounded-xl transition shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Request Wholesale Rate Card</span>
            <ArrowRight className="w-4 h-4 text-purple-700" />
          </Link>
        </div>
      </div>
    </main>
  );
}
