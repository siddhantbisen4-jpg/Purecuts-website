"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Zap, ArrowRight, ShieldCheck, Wrench } from "lucide-react";

interface MachineriesSpotlightProps {
  products: Product[];
}

export function MachineriesSpotlight({ products }: MachineriesSpotlightProps) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 bg-amber-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-slate-950 fill-slate-950" /> Up to 50% Off Electricals
              </span>
              <span className="text-xs text-slate-400 font-medium">1-Year Official Warranty Included</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" />
              Salon Machineries & Styling Tools
            </h2>
          </div>

          <Link
            href="/category/machineries"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 group shrink-0"
          >
            <span>Explore All Machineries</span>
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
