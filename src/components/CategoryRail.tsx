"use client";

import React, { useEffect, useRef } from "react";
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
type CategoryRailItem = {
  name: string;
  slug: string;
  image: string;
  badge?: string;
  badgeColor?: string;
};

const CATEGORY_ITEMS: CategoryRailItem[] = [
  {
    name: "Haircare",
    slug: "haircare",
    image:
      "https://static.vecteezy.com/system/resources/previews/046/631/483/non_2x/hair-care-shampoo-treatment-outline-color-icon-vector.jpg",
    badge: "Hot",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "Skincare & Bodycare",
    slug: "skincare",
    image:
      "https://i.pinimg.com/736x/24/7f/9a/247f9a5613d83a9442729b45024cbe0b.jpg",
    badgeColor: "bg-white text-slate-800 border border-slate-200",
  },
  {
    name: "Machineries",
    slug: "machineries",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/075/365/015/small/hair-salon-equipment-silhouette-hair-dryer-comb-and-scissors-vector.jpg",
    badge: "Up to 50% Off",
    badgeColor: "bg-[#795BCB] text-white",
  },

  {
    name: "Accessories",
    slug: "accessories",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDcvZ_4vEq-BrJuPt3DEwi3C8C3Ncp-5427EPKfjG1O65Iz87D3pjAj-8&s=10",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "Furniture",
    slug: "furniture",
    image: "https://cdn-icons-png.flaticon.com/512/3460/3460194.png",
    badgeColor: "bg-[#795BCB] text-white",
  },
  {
    name: "Disposables",
    slug: "disposable",
    image:
      "https://www.shutterstock.com/image-vector/barber-hair-salon-icon-single-260nw-1282664899.jpg",
    badge: "Wholesale",
    badgeColor: "bg-[#795BCB] text-white",
  },
];

export function CategoryRail() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  
useEffect(() => {
  const container = categoriesRef.current;
  if (!container) return;

  let intervalId: ReturnType<typeof setInterval> | undefined;
  let restartTimeout: ReturnType<typeof setTimeout> | undefined;
  let isPaused = false;

  const isMobile = () => window.innerWidth < 640;

  const stopAutoScroll = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();

    if (!isMobile() || isPaused) return;

    intervalId = setInterval(() => {
      if (isPaused || !isMobile()) return;

      const cards = Array.from(container.children) as HTMLElement[];
      if (cards.length < 2) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 2) return;

      const currentScroll = container.scrollLeft;
      const containerRect = container.getBoundingClientRect();

      // Find the first card that has not yet reached the left edge.
      const nextCard = cards.find((card) => {
        const cardRect = card.getBoundingClientRect();
        return cardRect.left > containerRect.left + 4;
      });

      // If the last card is reached, smoothly return to the beginning.
      if (!nextCard || currentScroll >= maxScroll - 4) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetLeft = Math.min(
        currentScroll + nextCard.getBoundingClientRect().left - containerRect.left,
        maxScroll
      );

      container.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });
    }, 2000);
  };

  const handleInteractionStart = () => {
    isPaused = true;
    stopAutoScroll();

    if (restartTimeout) {
      clearTimeout(restartTimeout);
      restartTimeout = undefined;
    }
  };

  const handleInteractionEnd = () => {
    if (restartTimeout) clearTimeout(restartTimeout);

    restartTimeout = setTimeout(() => {
      isPaused = false;
      startAutoScroll();
    }, 1500);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  container.addEventListener("touchstart", handleInteractionStart, {
    passive: true,
  });
  container.addEventListener("touchend", handleInteractionEnd, {
    passive: true,
  });
  container.addEventListener("touchcancel", handleInteractionEnd, {
    passive: true,
  });
  container.addEventListener("pointerdown", handleInteractionStart, {
    passive: true,
  });
  container.addEventListener("pointerup", handleInteractionEnd, {
    passive: true,
  });
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("resize", startAutoScroll);

  startAutoScroll();

  return () => {
    stopAutoScroll();

    if (restartTimeout) clearTimeout(restartTimeout);

    container.removeEventListener("touchstart", handleInteractionStart);
    container.removeEventListener("touchend", handleInteractionEnd);
    container.removeEventListener("touchcancel", handleInteractionEnd);
    container.removeEventListener("pointerdown", handleInteractionStart);
    container.removeEventListener("pointerup", handleInteractionEnd);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("resize", startAutoScroll);
  };
}, []);



  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              Explore PureCuts Salon Categories
            </h2>
            
          </div>
          <Link
            href="/category/all"
            className="text-xs font-bold text-[#7950F2] hover:text-[#7950F2] hover:underline shrink-0"
          >
            View All →
          </Link>
        </div>

        <div
  ref={categoriesRef}
  className="mx-auto grid w-full max-w-5xl grid-cols-2 justify-items-center gap-x-4 gap-y-10 max-sm:flex max-sm:justify-start max-sm:overflow-x-auto max-sm:overflow-y-hidden max-sm:snap-x max-sm:snap-mandatory max-sm:gap-2 max-sm:pb-2 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 lg:gap-x-4"
>
          {CATEGORY_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className="group flex w-full max-w-[150px] flex-col items-center justify-start rounded-xl px-1 py-3 text-center transition duration-200 hover:-translate-y-1 hover:bg-slate-50 max-sm:w-[calc((100%-1rem)/3)] max-sm:max-w-none max-sm:shrink-0 max-sm:snap-start"
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

              <span className="w-full text-[10px] leading-tight sm:text-xs font-bold text-slate-800 group-hover:text-[#795BCB] transition mt-2.5 whitespace-normal break-words text-center">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
