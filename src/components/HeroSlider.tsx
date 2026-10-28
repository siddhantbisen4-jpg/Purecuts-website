"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Building2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import banner from "../image/main banner.png";
import banner2 from "../image/banner8.png";
import sliderBanner from "../image/sliderbanner1.png";
import banner3 from "../image/banner3.png";
const HERO_SLIDES = [
  {
    id: 1,
    tag: "Pro Salon Machinery Sale",
    title: "Up to 50% Off on Ikonic & Wahl Clippers",
    subtitle:
      "Heavy-duty electromagnetic V5000 clippers, tourmaline straighteners & 2000W salon dryers.",
    badge: "Limited Time Barber Deals",
    badgeColor: "bg-amber-500 text-slate-950",
    bgGradient: "from-slate-950 via-slate-900 to-amber-950/80",
    link: "/category/machineries",
    cta: "Explore Machineries",
    image: sliderBanner.src,
    offer: "Flat 35% - 50% OFF",
  },
  {
    id: 2,
    tag: "Hair Care Heroes",
    title: "Matrix, L'Oréal & Schwarzkopf Salon Masques",
    subtitle:
      "Authentic Bonacure Peptide Repair, Biolage ColorLast, Scalppure & Majirel colors with 100% purity guarantee.",
    badge: "Salon Pro Formula",
    badgeColor: "bg-rose-600 text-white",
    bgGradient: "from-slate-950 via-purple-950 to-slate-900",
    link: "/category/haircare",
    cta: "Shop Haircare Heroes",
    image: banner3.src,
    offer: "Starting at ₹165",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openB2BModal } = useStore();

  useEffect(() => {
    setCurrentSlide(0);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide] ?? HERO_SLIDES[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4 pb-5 sm:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* =====================================================
            MAIN BANNER SLIDER
        ====================================================== */}
        <div
          className="
            lg:col-span-8
            relative
            rounded-3xl
            overflow-hidden
           min-h-0
h-[190px]
max-sm:aspect-auto
sm:h-auto
sm:min-h-[360px]
lg:min-h-[420px]
            flex
            items-center
            shadow-xl
border-0
           
          "
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center max-sm:bg-contain max-sm:bg-no-repeat transition-all duration-700"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div />
          </div>
          {/* ORDER NOW BUTTON — ONLY ON MACHINERY BANNER */}
          {currentSlide === 0 && (
            <Link
              href="/category/skincare"
              className="
      absolute
      bottom-5
      sm:bottom-14
      left-4
      sm:left-6
      lg:left-10
      z-20
      inline-flex
      items-center
      gap-2
      rounded-lg
bg-[#9A37D8]
hover:bg-[#AA2CCD]
px-2
py-2
text-xs
sm:text-sm
whitespace-nowrap
      font-bold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:scale-105
    "
            >
              <span>Order Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          {/* =====================================================
              SLIDE CONTENT
          ====================================================== */}
          <div
            className="
              relative
              z-10
              p-4
              sm:p-6
              lg:p-10
              max-w-xl
              text-white
              w-full
            "
          >
            {/* =====================================================
                CTA + OFFER
            ====================================================== */}
          </div>

          {/* =====================================================
              PREVIOUS BUTTON
          ====================================================== */}
          <button
            onClick={prevSlide}
            className="
              absolute
              left-2
              sm:left-3
              top-1/2
              -translate-y-1/2
              z-20
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-full
              bg-black/40
              hover:bg-black/70
              text-white
              backdrop-blur-xs
              flex
              items-center
              justify-center
              transition
              border
              border-white/20
            "
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* =====================================================
              NEXT BUTTON
          ====================================================== */}
          <button
            onClick={nextSlide}
            className="
              absolute
              right-2
              sm:right-3
              top-1/2
              -translate-y-1/2
              z-20
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-full
              bg-black/40
              hover:bg-black/70
              text-white
              backdrop-blur-xs
              flex
              items-center
              justify-center
              transition
              border
              border-white/20
            "
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* =====================================================
              SLIDER DOTS
          ====================================================== */}
          <div
            className="
              absolute
              bottom-3
              sm:bottom-4
              left-1/2
              -translate-x-1/2
              z-20
              flex
              items-center
              gap-2
            "
          >
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`
                  h-1.5
                  sm:h-2
                  rounded-full
                  transition-all
                  ${
                    i === currentSlide
                      ? "w-6 sm:w-7 bg-[#795BCB]"
                      : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
                  }
                `}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE PROMOTIONAL CARDS
        ====================================================== */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* =====================================================
              CARD 1 — B2B WHOLESALE
          ====================================================== */}
          <div
            className="
    lg:col-span-4
    relative
    rounded-3xl
    overflow-hidden
    shadow-xl
border-0"
          >
            <div />
            <Image
              src={banner}
              alt="Salon wholesale banner"
              className="object-contain object-center"
            />

            <Link
              href="/category/machineries?brand=wahl"
              className="
    absolute
    right-3
    bottom-3
    sm:right-4
    sm:bottom-4
    z-20
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-lg
    bg-[#9A37D8]
    px-4
    py-2
    text-xs
    sm:text-sm
    font-bold
    text-white
    shadow-lg
    transition-colors
    duration-200
    hover:bg-[#AA2CCD]
    whitespace-nowrap
  "
            >
              <span>Order Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/*<div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="
                    bg-slate-950
                    text-amber-400
                    text-[10px]
                    font-black
                    uppercase
                    px-2.5
                    py-0.5
                    rounded-full
                  "
                >
                  B2B Wholesale
                </span>*/}

            {/*<Building2 className="w-5 h-5 text-slate-900" />
              </div>*/}

            {/*<h3 className="text-lg sm:text-xl font-black leading-tight text-slate-950 mb-1">
                Salon Bulk Cartons & GST Billing
              </h3>

              <p className="text-xs text-amber-950/90 font-medium">
                Get up to 30% additional discount on bulk chemical cartons,
                salon furniture, clippers, and disposables.
              </p></div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-2">
              <button
                onClick={openB2BModal}
                className="
                  px-3
                  sm:px-4
                  py-2
                  bg-slate-950
                  hover:bg-black
                  text-white
                  text-xs
                  font-extrabold
                  rounded-xl
                  transition
                  flex
                  items-center
                  gap-1.5
                  shadow-md
                "
              >
                <span>Request B2B Quote</span>

                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] sm:text-[11px] font-bold text-amber-950 text-right">
                Pune Hub Dispatch
              </span>
            </div>*/}
          </div>

          {/* =====================================================
              CARD 2 — GUARANTEE
          ====================================================== */}
          <div
            className="
    lg:col-span-4
    relative
    rounded-3xl
    overflow-hidden
    shadow-xl
border-0
  "
          >
            <Image
              src={banner2}
              alt="Salon product promotional banner"
              className=" object-center"
            />
            <Link
              href="/category/all?brand=Streax%20Professional"
              className="
    absolute
    right-3
    bottom-3
    sm:right-4
    sm:bottom-4
    z-20
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-lg
    bg-[#9A37D8]
    px-4
    py-2
    text-xs
    sm:text-sm
    font-bold
    text-white
    shadow-lg
    transition-colors
    duration-200
    hover:bg-[#AA2CCD]
    whitespace-nowrap
  "
            >
              <span>Order Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/*<div className="flex items-center gap-3 mb-3">
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-emerald-500/20
                  text-emerald-400
                  flex
                  items-center
                  justify-center
                  border
                  border-emerald-500/30
                  shrink-0
                "
              >
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">
                  100% Genuine Guarantee
                </h4>

                <p className="text-[11px] text-slate-400">
                  Directly sourced salon inventory
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <div
                className="
                  p-2.5
                  bg-slate-800/80
                  rounded-xl
                  border
                  border-slate-700/60
                "
              >
                <span className="text-amber-400 font-extrabold block">
                  ₹499+ Orders
                </span>

                <span className="text-[11px] text-slate-400">
                  Free Express Delivery
                </span>
              </div>

              <div
                className="
                  p-2.5
                  bg-slate-800/80
                  rounded-xl
                  border
                  border-slate-700/60
                "
              >
                <span className="text-emerald-400 font-extrabold block">
                  COD Ready
                </span>

                <span className="text-[11px] text-slate-400">
                  Pay at Doorstep
                </span>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
