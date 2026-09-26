"use client";

import React from "react";
import Link from "next/link";
import {
  Package,
  Building2,
  Truck,
  ShieldCheck,
  ArrowRight,
  Layers,
  LogOut,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import banner from "../../src/image/PureCutsbanner.png";
import Image from "next/image";
export function BulkSuppliesBanner() {
  const { openB2BModal } = useStore();

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs">
        <Image
          src={banner}
          alt="PureCuts Salon Bulk Supplies and Disposables Banner"
          width={1300}
          height={350}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
      {/*<div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-amber-500/20 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Background glow 
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
            <Package className="w-3.5 h-3.5" />
            <span>Salon Bulk Cartons & Disposables</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Equip Your Salon with Wholesale Prices & Direct GST Invoicing
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Neck paper rolls (500 strips), disposable cutting sheets, absorbent virgin cotton, 1L transparent shaving gels, and salon wash chairs dispatched directly from our Wagholi, Pune warehouse.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Tax-Compliant GST Invoicing
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-amber-400" /> Pan-India Freight & Courier
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 relative z-10 w-full sm:w-auto">
          <button
            onClick={openB2BModal}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Building2 className="w-4 h-4" />
            <span>Request Bulk Price List</span>
          </button>
          <Link
            href="/category/disposable"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2 border border-white/20"
          >
            <Layers className="w-4 h-4" />
            <span>Shop Disposables Online</span>
          </Link>
        </div>
      </div>*/}
    </section>
  );
}
