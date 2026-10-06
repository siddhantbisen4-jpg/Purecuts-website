"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Flame, Clock, ArrowRight, Zap } from "lucide-react";

interface DealsOfTheDayProps {
  products: Product[];
}

export function DealsOfTheDay({ products }: DealsOfTheDayProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 35,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        }

        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <div className="bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header with Countdown Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-rose-800/60 relative z-10">
          {/* Heading */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
              <span className="bg-rose-600 text-white text-[9px] sm:text-xs font-black uppercase px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white animate-bounce" />
                Flash Deals
              </span>

              <span className="text-[9px] sm:text-xs text-rose-300 font-bold uppercase tracking-wider">
                Limited Salon Quantities
              </span>
            </div>

            <h2 className="text-lg sm:text-3xl font-black text-white tracking-tight leading-tight">
              Deal of the Day — Up to 67% OFF
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[10px] sm:text-xs text-rose-200 font-semibold flex items-center gap-1 mr-0.5 sm:mr-1 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
              Ends in:
            </span>

            <div className="flex items-center gap-1 sm:gap-1.5 font-mono">
              {/* HOURS */}
              <div className="bg-black/50 border border-rose-500/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-center min-w-[32px] sm:min-w-[38px]">
                <span className="text-xs sm:text-base font-black text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>

                <span className="block text-[7px] sm:text-[8px] uppercase text-rose-300 -mt-0.5 sm:-mt-1">
                  hrs
                </span>
              </div>

              <span className="text-rose-400 font-bold text-xs sm:text-base">
                :
              </span>

              {/* MINUTES */}
              <div className="bg-black/50 border border-rose-500/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-center min-w-[32px] sm:min-w-[38px]">
                <span className="text-xs sm:text-base font-black text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>

                <span className="block text-[7px] sm:text-[8px] uppercase text-rose-300 -mt-0.5 sm:-mt-1">
                  min
                </span>
              </div>

              <span className="text-rose-400 font-bold text-xs sm:text-base">
                :
              </span>

              {/* SECONDS */}
              <div className="bg-black/50 border border-rose-500/30 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-center min-w-[32px] sm:min-w-[38px]">
                <span className="text-xs sm:text-base font-black text-rose-400">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>

                <span className="block text-[7px] sm:text-[8px] uppercase text-rose-300 -mt-0.5 sm:-mt-1">
                  sec
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 pt-4 sm:pt-6 relative z-10">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-5 sm:mt-8 pt-3 sm:pt-4 border-t border-rose-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] sm:text-xs text-rose-200">
          <span className="flex items-start gap-1.5 leading-relaxed min-w-0">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 mt-0.5" />

            <span>
              Guaranteed dispatch within 24 hours from Pune Wagholi Hub
            </span>
          </span>

          <Link
            href="/category/all?deal=true"
            className="font-bold text-white hover:text-amber-300 transition flex items-center gap-1 shrink-0 self-end sm:self-auto whitespace-nowrap"
          >
            <span>View All Flash Deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}