"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Award, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { Brand } from "@/lib/types";

interface BrandCarouselProps {
  brands?: Brand[];
}

export function BrandCarousel({ brands: initialBrands }: BrandCarouselProps) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands || []);
  const [isLoading, setIsLoading] = useState(!initialBrands || initialBrands.length === 0);

  useEffect(() => {
    if (initialBrands && initialBrands.length > 0) {
      setBrands(initialBrands);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    async function loadBrands() {
      try {
        const res = await fetch("/api/brands");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setBrands(data);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch live brands for carousel:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadBrands();
    return () => {
      isMounted = false;
    };
  }, [initialBrands]);

  // Take top 12 brands for the homepage showcase (excluding purecuts store brand)
  const displayBrands = brands
    .filter((b) => {
      const clean = b.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      return clean !== "purecuts" && clean !== "purecut" && clean !== "unknown" && clean !== "na";
    })
    .slice(0, 12);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <div className="bg-gradient-to-b from-slate-50 to-purple-50/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-xs">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#795BCB] bg-purple-100/70 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-[#795BCB]" />
                Official Distributor & Direct Supply
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[#795BCB]" />
              Shop by Top Salon Brands
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              100% genuine salon professional products with manufacturer batch warranty & GST input credit.
            </p>
          </div>
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#795BCB] hover:text-[#5d41a7] bg-white hover:bg-purple-50 px-3.5 py-2 rounded-xl border border-purple-200/80 shadow-2xs transition shrink-0"
          >
            <span>View All Brands ({brands.length || "100+"})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="h-28 rounded-2xl bg-slate-200/60 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        )}

        {/* Brands Grid */}
        {!isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {displayBrands.map((brand) => {
              const productCountLabel =
                brand.productCount > 0 ? `${brand.productCount} Products` : "Salon Line";

              return (
                <Link
                  key={brand.id || brand.slug || brand.name}
                  href={`/category/all?brand=${encodeURIComponent(brand.name)}`}
                  className="group relative p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#795BCB] hover:shadow-lg transition-all duration-300 flex flex-col justify-between items-center text-center overflow-hidden"
                >
                  {/* Subtle top indicator */}
                  <div className="w-full flex items-center justify-between gap-1 mb-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[90px]">
                      {brand.badge || (brand.productCount > 15 ? "Popular" : "Verified")}
                    </span>
                    <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                      {productCountLabel}
                    </span>
                  </div>

                  {/* Brand Logo Container */}
                  <div className="w-full h-14 sm:h-16 flex items-center justify-center p-1.5 my-1 rounded-xl bg-slate-50/70 group-hover:bg-purple-50/30 transition">
                    {brand.image ? (
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="max-h-full max-w-[90%] object-contain mix-blend-multiply group-hover:scale-110 transition duration-300"
                        onError={(e) => {
                          // Hide image and fallback to styled text initials
                          (e.target as HTMLElement).style.display = "none";
                          const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-[#795BCB] text-white font-black text-sm items-center justify-center shadow-xs ${
                        brand.image ? "hidden" : "flex"
                      }`}
                    >
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div className="mt-2 w-full pt-1.5 border-t border-slate-100 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#795BCB] transition truncate max-w-[85%] text-left">
                      {brand.name}
                    </h3>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#795BCB] group-hover:translate-x-0.5 transition shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom Banner Strip */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#795BCB]" />
            <span className="font-semibold text-slate-700">
              Direct salon wholesale accounts available for all listed brands with GST input tax invoices.
            </span>
          </div>
          <Link
            href="/brands"
            className="font-bold text-[#795BCB] hover:underline"
          >
            Explore all {brands.length || "100+"} salon brands →
          </Link>
        </div>
      </div>
    </section>
  );
}
