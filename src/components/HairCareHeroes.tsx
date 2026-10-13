"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import banner2 from "../../src/image/banner2.png";
import Image from "next/image";
interface HairCareHeroesProps {
  products: Product[];
}

export function HairCareHeroes({ products }: HairCareHeroesProps) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="bg-slate-50/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/*<span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#795BCB] px-2.5 py-0.5 rounded-full">
                Salon Professional Choice
              </span>
              <span className="text-xs text-slate-500 font-medium">Matrix • L'Oréal • Schwarzkopf</span>*/}
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#795BCB]" />
              Hair Care Products
            </h2>
          </div>

          <Link
            href="/category/haircare"
            className="text-xs font-bold text-[#7950F2] hover:text-[#7950F2] hover:underline flex items-center gap-1 group shrink-0"
          >
            <span>Explore All Haircare</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs">
        <Image
          src={banner2}
          alt="PureCuts Professional Salon Hair Care Banner"
          width={1300}
          height={350}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
    </section>
  );
}
