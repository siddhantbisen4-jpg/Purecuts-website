"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import dry from "@/image/dryer.png";
import Image from "next/image";

interface MachineriesSpotlightProps {
  products: Product[];
}

export function MachineriesSpotlight({ products }: MachineriesSpotlightProps) {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E8DFFF] bg-gradient-to-br from-white via-[#FCFAFF] to-[#F3EEFF] p-3.5 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgba(121,91,203,0.08)]">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#795BCB]/[0.07] blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-[#B9A3F5]/[0.12] blur-2xl" />

        {/* Section Header */}
        <div className="relative mb-5 flex flex-col gap-3 border-b border-[#E8DFFF] pb-4 sm:mb-7 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E8DFFF] bg-white shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">
                <Image
                  src={dry}
                  alt="Hair dryer"
                  width={36}
                  height={36}
                  className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-black leading-tight tracking-tight text-[#35245F] sm:text-2xl lg:text-3xl">
                  Salon Machineries
                  <span className="text-[#795BCB]"> & Styling Tools</span>
                </h2>
              </div>
            </div>
          </div>

          <Link
            href="/category/machineries"
            className="group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl border border-[#795BCB] bg-[#795BCB] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#795BCB]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6246B0] hover:shadow-lg hover:shadow-[#795BCB]/30 sm:px-5 sm:py-3 sm:text-sm"
          >
            <span>Explore All Machineries</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}

       
{/* Modern Product Grid */}
<div className="relative grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
  {products.slice(0, 8).map((product) => (
    <div
      key={product.id}
      className="
        group relative min-w-0 overflow-hidden
        rounded-2xl border border-slate-100
        bg-white
        shadow-[0_3px_15px_rgba(30,20,60,0.04)]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:border-[#D6C8F5]
        hover:shadow-[0_14px_35px_rgba(121,91,203,0.15)]
        sm:rounded-3xl
      "
    >
      {/* Animated purple top border */}
      <div
        className="
          absolute inset-x-0 top-0 z-20 h-[3px]
          origin-left scale-x-0
          bg-gradient-to-r from-[#795BCB] via-[#A58BEA] to-[#D6C8F5]
          transition-transform duration-500 ease-out
          group-hover:scale-x-100
        "
      />

      {/* Soft purple background glow on hover */}
      <div
        className="
          pointer-events-none absolute -right-12 -top-12
          z-0 h-28 w-28 rounded-full
          bg-[#795BCB]/0 blur-2xl
          transition-all duration-500
          group-hover:bg-[#795BCB]/10
        "
      />

      {/* Existing product component */}
      <div className="relative z-10">
        <ProductCard product={product} />
      </div>

      {/* Subtle bottom accent */}
      <div
        className="
          pointer-events-none absolute inset-x-6 bottom-0
          h-px bg-gradient-to-r from-transparent
          via-[#D6C8F5] to-transparent
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />
    </div>
  ))}
</div>

       

        {/* Bottom Explore Link */}
        <div className="relative mt-5 flex justify-center sm:mt-7">
          <Link
            href="/category/machineries"
            className="group inline-flex items-center gap-2 rounded-full border border-[#E4D8FF] bg-white/80 px-4 py-2 text-xs font-semibold text-[#795BCB] transition-all duration-300 hover:border-[#795BCB] hover:bg-[#F3EEFF] sm:text-sm"
          >
            Discover more salon equipment
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
