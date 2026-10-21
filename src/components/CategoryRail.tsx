"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  HeartHandshake,
  Zap,
  Scissors,
  Armchair,
  Layers,
  Palette,
  PackageCheck,
  Flame,
} from "lucide-react";
import Image from "next/image";
const CATEGORY_ITEMS = [
  {
    name: "",
    slug: "haircare",
    image:
      "https://static.vecteezy.com/system/resources/previews/046/631/483/non_2x/hair-care-shampoo-treatment-outline-color-icon-vector.jpg",
    badge: "Haircare",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "",
    slug: "skincare",
    image:
      "https://i.pinimg.com/736x/24/7f/9a/247f9a5613d83a9442729b45024cbe0b.jpg",
    badge: "skincare & Bodycare",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "",
    slug: "machineries",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/075/365/015/small/hair-salon-equipment-silhouette-hair-dryer-comb-and-scissors-vector.jpg",
    badge: "machineries & Tools",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "",
    slug: "accessories",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDcvZ_4vEq-BrJuPt3DEwi3C8C3Ncp-5427EPKfjG1O65Iz87D3pjAj-8&s=10",
    badge: "accessories",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "",
    slug: "furniture",
    image: "https://cdn-icons-png.flaticon.com/512/3460/3460194.png",
    badge: "furniture",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "",
    slug: "disposable",
    image:
      "https://www.shutterstock.com/image-vector/barber-hair-salon-icon-single-260nw-1282664899.jpg",
    badge: "disposable",
    badgeColor: "bg-[#795BCB] text-white",
  },
];

export function CategoryRail() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#795BCB]" />
              Explore PureCuts Salon Categories
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Fast product discovery across beauty & professional salon
              departments
            </p>
          </div>
          <Link
            href="/category/all"
            className="text-xs font-bold text-[#7950F2] hover:text-[#7950F2] hover:underline shrink-0"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-7 sm:gap-4">
          {CATEGORY_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className="group flex flex-col items-center text-center justify-items-center justify-center py-1"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-500 shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-white flex items-center justify-center relative">
                  <img
                    src={item.image}
                    alt={item.badge || item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                </div>
                {item.badge && (
                  <span
                    className={`absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 w-max max-w-[120px] sm:max-w-[150px] text-center text-[8px] sm:text-[9px] font-extrabold px-2 py-1 rounded-full whitespace-normal break-words leading-tight shadow-xs uppercase tracking-wider ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition mt-2.5 line-clamp-1">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
