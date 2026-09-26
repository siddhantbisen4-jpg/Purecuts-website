"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { HeartHandshake, ArrowRight, Tag } from "lucide-react";

interface SkincareBestsellersProps {
  products: Product[];
}

export function SkincareBestsellers({ products }: SkincareBestsellersProps) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3 text-rose-600" /> Dr. Rashel Tubs @ ₹109 (-56% OFF)
              </span>
              <span className="text-xs text-slate-500 font-medium">VLCC • Lotus • Vel Aroma</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-rose-500" />
              Skincare & Facial Cleanups
            </h2>
          </div>

          <Link
            href="/category/skincare"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1 group shrink-0"
          >
            <span>Explore All Skincare</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
