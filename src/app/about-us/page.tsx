"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Scissors,
  ShieldCheck,
  Truck,
  Building2,
  Award,
  Heart,
  Sparkles,
  Play,
  X,
  CheckCircle2,
  Star,
  Quote,
  Package,
  Users,
  Palette,
  Home,
  BadgeCheck,
  Beaker,
  CalendarCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

/* ── helpers ─────────────────────────────────────────────────────── */
function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

/* ── data ────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Haircare Essentials",
    desc: "L'Oréal Majirel, Matrix Biolage, Schwarzkopf Bonacure & more",
    href: "/category/haircare",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Skincare & Bodycare",
    desc: "Dr. Rashel, VLCC, Lotus facial kits & body treatments",
    href: "/category/skincare",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Machineries & Tools",
    desc: "Wahl USA, Ikonic, VGR clippers, dryers & salon furniture",
    href: "/category/machineries",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop",
  },
];

const USP = [
  {
    icon: Home,
    title: "Homelike Ordering",
    desc: "Risus auctor egestas dolor tempus and vitae rhoncus — wholesale cartons delivered to your salon doorstep.",
  },
  {
    icon: Users,
    title: "Team of Professionals",
    desc: "Purus mauris egestas ociis tempus and vitae sodales — dedicated B2B managers for repeat academy orders.",
  },
  {
    icon: Beaker,
    title: "Professional Materials",
    desc: "Morbi egestas dolor auctor tempus and fusce suscipit — only batch-coded, authorized brand formulations.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Online Booking",
    desc: "Turpis auctor egestas dolor tempus in rhoncus magna — re-order in 2 clicks, COD & UPI at checkout.",
  },
];

const TESTIMONIALS = [
  {
    name: "Carmen H.",
    role: "Salon Owner, Mumbai",
    ago: "28 days ago",
    text: "Sagittis congue augue and ligula fusce molestie an egestas magna vitae purus dolor primis hendrerit laoreet augue — PureCuts never delays dispatch.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-5.jpg",
    stars: 5,
  },
  {
    name: "Josie Moore",
    role: "Academy Lead, Pune",
    ago: "1 month ago",
    text: "Mauris hendrerit gestas magnis sapien diam molestie etiam and sapien a congue augue egestas ultrice ipsum vitae purus integer.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-6.jpg",
    stars: 5,
  },
  {
    name: "Sarah L.",
    role: "Stylist, Delhi",
    ago: "2 month ago",
    text: "Sagittis congue augue and ligula fusce molestie — the BEST salon supply partner ever, genuine products every time.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-7.jpg",
    stars: 5,
  },
  {
    name: "Rachel A.",
    role: "Spa Manager, Hyderabad",
    ago: "2 month ago",
    text: "Augue congue purus in tempus fusce egestas volutpat dignissim augue cubilia laoreet magna dolor suscipit luctus turpis.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-8.jpg",
    stars: 5,
  },
  {
    name: "Amanda R.",
    role: "Barber, Bengaluru",
    ago: "3 days ago",
    text: "Etiam sapien sagittis congue and augue massa varius — amazing! Wahl clippers arrived factory sealed with warranty.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-1.jpg",
    stars: 5,
  },
  {
    name: "Mason W.",
    role: "Salon Chain, Nagpur",
    ago: "13 days ago",
    text: "Mauris hendrerit gestas magnis sapien diam molestie — LOVE PureCuts, bulk discounts saved us 18% this quarter.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-2.jpg",
    stars: 5,
  },
  {
    name: "Elizabeth F.",
    role: "Freelance MUA, Pune",
    ago: "18 days ago",
    text: "Etiam sapien sagittis congue and augue massa varius — my all time favourite for authentic L'Oréal stock.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-3.jpg",
    stars: 5,
  },
  {
    name: "Nicole M.",
    role: "Wellness Studio, Jaipur",
    ago: "24 days ago",
    text: "Sagittis congue augue and ligula fusce molestie — great experience, support team resolved my invoice in minutes.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/review-author-4.jpg",
    stars: 5,
  },
];

const BRAND_LOGOS = [
  "https://purecuts.in/wp-content/uploads/2025/06/purecuts_logo_no_bg-cropped.png",
  "https://placehold.co/160x64/ffffff/222222?text=L%27OR%C3%89AL",
  "https://placehold.co/160x64/ffffff/222222?text=MATRIX",
  "https://placehold.co/160x64/ffffff/222222?text=SCHWARZKOPF",
  "https://placehold.co/160x64/ffffff/222222?text=WAHL+USA",
  "https://placehold.co/160x64/ffffff/222222?text=IKONIC",
  "https://placehold.co/160x64/ffffff/222222?text=VLCC",
  "https://placehold.co/160x64/ffffff/222222?text=STREAX",
  "https://placehold.co/160x64/ffffff/222222?text=DR.RASHEL",
  "https://placehold.co/160x64/ffffff/222222?text=GILLETTE",
];

const BLOG_POSTS = [
  {
    date: "Jun 20",
    title: "Salon Services to Enhance Beauty at Wholesale",
    excerpt: "Velna molestie purus magna ipsum suscipit egestas magna vitae auctor — how pros choose authentic formulations.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/img-01-360x270.jpg",
    href: "/blog",
  },
  {
    date: "Jun 08",
    title: "2025 Top Hair Color & Care Trends Report",
    excerpt: "Velna molestie purus magna ipsum suscipit egestas magna vitae cursus — color-safe care decoded.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/img-02-360x270.jpg",
    href: "/blog",
  },
  {
    date: "May 28",
    title: "The Best Salon Machinery Buying Guide 2025",
    excerpt: "Velna molestie purus magna ipsum suscipit egestas magna vitae dapibus — clippers, dryers & chairs.",
    img: "https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/img-03-360x270.jpg",
    href: "/blog",
  },
];

/* ── small reveal wrapper ────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.18,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(threshold);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────── */
export default function AboutUsPage() {
  const { openB2BModal } = useStore();
  const [showVideo, setShowVideo] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // counters
  const statsIn = useInView<HTMLDivElement>(0.35);
  const c1 = useCountUp(8960, statsIn.visible, 1800);
  const c2 = useCountUp(298, statsIn.visible, 1300);

  // close video on Esc
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && setShowVideo(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  // lock scroll when video open
  useEffect(() => {
    if (showVideo) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showVideo]);

  return (
    <main className="bg-white text-[#1a1a1a] antialiased overflow-x-clip">
      {/* global animations for this page */}
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes pulseRing { 0% { transform: scale(0.85); opacity: .85 } 100% { transform: scale(1.55); opacity: 0 } }
        @keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      `}</style>

      {/* ── 0. Breadcrumb ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-3">
        <nav className="flex items-center gap-2 text-[11px] tracking-wide text-slate-500">
          <Link href="/" className="hover:text-[#795BCB] transition font-semibold">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-bold">About PureCuts</span>
        </nav>
      </div>

      {/* ── 1. Intro Split — Lakrua block 1 ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-10 items-center">
          {/* left copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#795BCB]/15 bg-[#795BCB]/[0.07] px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#795BCB]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#795BCB] animate-pulse" />
                Come, Relax and Enjoy
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-4 text-[28px] sm:text-[42px] lg:text-[46px] font-black leading-[0.95] tracking-[-0.04em] text-slate-900">
                Professional supplies
                <br />
                <span className="text-[#795BCB]">where salons</span> trust
                <br />
                PureCuts.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-4 text-[11px] font-bold tracking-[0.14em] uppercase text-slate-400">
                Luxury salon where you will feel unique — now as a marketplace
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 text-sm leading-7 text-slate-600 max-w-[560px]">
                Headquartered in Wagholi, Pune, PureCuts was founded to empower salon owners, hairstylists, beauty therapists, and discerning consumers with{" "}
                <strong className="text-slate-900">100% authentic, salon-grade products</strong> at genuine wholesale pricing.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-4 text-sm leading-7 text-slate-600 max-w-[560px]">
                Sapien tempor sodales bibendum convallis volutpat morbi veles fusce laoreet sapien and neque mauris vitae habitant inceptos — we partner directly with leading manufacturers so every tub, tube, and clipper is fresh, batch-coded, and warranty-backed.
              </p>
            </Reveal>

            {/* signature */}
            <Reveal delay={340} className="mt-7">
              <img
                src="https://jthemes.net/themes/wp/lakrua/demo2/wp-content/uploads/sites/4/2026/10/signature.png"
                alt="Signature"
                width={180}
                height={48}
                className="h-10 w-auto object-contain opacity-90"
              />
              <p className="mt-2 text-sm font-bold text-slate-900">Martha Ronkie — Founder & CEO</p>
              <p className="text-xs text-slate-500">PureCuts Marketplace, Pune</p>
            </Reveal>
          </div>

          {/* right image — like img-04.png */}
          <Reveal delay={120} className="relative">
            <div className="relative overflow-hidden rounded-[28px] bg-[#f8f8f8] border border-slate-200 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80&auto=format&fit=crop"
                alt="PureCuts salon supplies"
                className="w-full h-[420px] sm:h-[520px] lg:h-[560px] object-cover"
                loading="eager"
              />
              {/* soft top highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/5" />
            </div>
            {/* floating badge */}
            <div
              className="absolute -bottom-4 -left-3 sm:bottom-6 sm:-left-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
              style={{ animation: "floatY 4.5s ease-in-out infinite" }}
            >
              <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div className="leading-tight">
                <p className="text-xs font-black text-slate-900">100% Genuine Stock</p>
                <p className="text-[11px] text-slate-500">Authorized distributors only</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. Services — Lakrua block 2 ─────────────────────────── */}
      <section className="bg-[#f8f8f8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#795BCB] shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Look Good. Feel Better
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-[26px] sm:text-[36px] font-black tracking-[-0.03em] leading-[0.95] text-slate-900">
                The exceptional supplies
                <br />
                for the best salon experience
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-3 text-sm leading-6 text-slate-500 max-w-2xl mx-auto">
                Ligula risus auctor tempus magna fusce feugiat lacinia in litora hendrerit suscipit quaerat and sapien suscipit integer — curated across haircare, skincare, and pro tools.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className="group">
                <Link
                  href={s.href}
                  className="block overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 sm:p-6 text-center">
                    <h3 className="text-[15px] font-black text-slate-900 group-hover:text-[#795BCB] transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-slate-500 line-clamp-2">{s.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#795BCB] group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="text-center mt-8">
            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-6 py-3 text-xs font-extrabold tracking-wide hover:bg-black hover:-translate-y-[1px] hover:shadow-lg transition-all"
            >
              Services & Prices <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Video + USP — Lakrua block 3 ──────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">
          {/* video */}
          <Reveal>
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              aria-label="Play video"
              className="group relative w-full overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 shadow-xl text-left"
            >
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&q=80&auto=format&fit=crop"
                alt="Salon video thumbnail"
                className="w-full aspect-video object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="relative w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)] group-hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 text-slate-900 ml-0.5 fill-slate-900" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full border border-white/70"
                    style={{ animation: "pulseRing 1.8s cubic-bezier(0.4,0,0.6,1) infinite" }}
                  />
                </span>
                <span className="text-xs font-extrabold tracking-[0.14em] uppercase text-white drop-shadow">Play video</span>
              </div>
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 backdrop-blur px-3 py-1.5 text-[11px] font-bold text-white border border-white/15">
                Watch our Wagholi hub film — 1:42
              </span>
            </button>
          </Reveal>

          {/* USP 2x2 */}
          <div>
            <Reveal>
              <h3 className="text-[22px] sm:text-[26px] font-black tracking-[-0.03em] leading-tight text-slate-900">
                Built for salons,
                <br />
                trusted by professionals
              </h3>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USP.map((u, i) => (
                <Reveal key={u.title} delay={i * 90} className="rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <span className="w-10 h-10 rounded-xl bg-[#795BCB]/10 border border-[#795BCB]/15 flex items-center justify-center text-[#795BCB]">
                    <u.icon className="w-5 h-5" />
                  </span>
                  <h4 className="mt-3 text-sm font-black text-slate-900">{u.title}</h4>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{u.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Stats — Lakrua block 4 ─────────────────────────────── */}
      <section ref={statsIn.ref} className="relative overflow-hidden bg-gradient-to-br from-[#fff7ed]/60 via-white to-[#f5f1ff] border-y border-[#795BCB]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/15 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase text-amber-700">
                  Time to be beautiful
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 text-[26px] sm:text-[34px] font-black tracking-[-0.03em] leading-[1] text-slate-900">
                  Give the pleasure
                  <br />
                  of beautiful to yourself
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-4 text-sm leading-7 text-slate-600 max-w-[620px]">
                  Sapien tempor sodales bibendum convallis volutpat morbi veles fusce laoreet sapien and neque mauris vitae habitant inceptos and ligula luctus ipsum habitant dignissim feugiat varius rhoncus vitae blandit magna sagittis hendrerit ipsum neque auctor vitae feugiat dolor luctus placerat bibendum.
                </p>
              </Reveal>

              <div className="mt-8 grid grid-cols-2 gap-6 max-w-[420px]">
                <Reveal delay={180}>
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm">
                    <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-none">
                      {c1.toLocaleString("en-IN")}
                      <span className="text-[#795BCB]">+</span>
                    </p>
                    <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Satisfied Salons</p>
                    <p className="text-[11px] text-slate-400">Across India since 2018</p>
                  </div>
                </Reveal>
                <Reveal delay={260}>
                  <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm">
                    <p className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-none">
                      {c2.toLocaleString("en-IN")}
                      <span className="text-[#795BCB]">+</span>
                    </p>
                    <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-wide">Verified Brands</p>
                    <p className="text-[11px] text-slate-400">Including L&apos;Oréal, Wahl, Matrix</p>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={120} className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1634449571010-02389ed0f357?w=640&q=80&auto=format&fit=crop"
                alt="Nail polish / salon products"
                className="w-full h-[380px] object-cover rounded-[28px] border border-slate-200 shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. Testimonials marquee — Lakrua block 5 ─────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                <Quote className="w-3.5 h-3.5 text-amber-300" /> They&apos;re Talking
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-[26px] sm:text-[36px] font-black tracking-[-0.03em] leading-[0.95] text-slate-900">
                What salon owners say
                <br />
                about PureCuts
              </h2>
            </Reveal>
          </div>

          {/* marquee */}
          <div className="relative mt-8">
            <div
              ref={marqueeRef}
              className="overflow-hidden rounded-[20px] border border-slate-200 bg-[#f8f8f8] py-6"
            >
              <div
                className="flex w-max gap-5 will-change-transform"
                style={{ animation: "marquee 52s linear infinite" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
              >
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                  <article
                    key={`${t.name}-${idx}`}
                    className="min-w-[300px] max-w-[360px] shrink-0 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow text-left"
                  >
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < t.stars ? "fill-amber-400" : "fill-transparent"}`} />
                      ))}
                    </div>
                    <p className="mt-3 text-[13px] leading-6 text-slate-700 line-clamp-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-4 flex items-center gap-3">
                      <img src={t.img} alt={t.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                      <div className="leading-tight">
                        <p className="text-xs font-black text-slate-900">{t.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {t.role} · {t.ago}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* arrows like Lakrua ‹› */}
            <div className="hidden sm:flex items-center justify-center gap-2 mt-4">
              <button
                aria-label="Previous testimonials"
                onClick={() => marqueeRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next testimonials"
                onClick={() => marqueeRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* spacing */}
        <div className="h-8 sm:h-10" />
      </section>

      {/* ── 6. Promo split + brand wall — Lakrua block 6 ─────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-center">
          <Reveal className="relative overflow-hidden rounded-[28px] border border-slate-200 shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80&auto=format&fit=crop"
              alt="Color your nails with your dreams — salon model"
              className="w-full h-[420px] sm:h-[520px] object-cover"
              loading="lazy"
            />
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-[#795BCB]/15 bg-[#795BCB]/10 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#795BCB]">
                A whole new you
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-[26px] sm:text-[34px] font-black tracking-[-0.03em] leading-[1] text-slate-900">
                Stock your salon
                <br />
                with your dreams
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Sapien tempor sodales bibendum convallis volutpat morbi veles fusce laoreet sapien and neque mauris vitae habitant inceptos and ligula luctus ipsum undo feugiat varius dignissim rhoncus vitae blandit magna and sagittis ipsum hendrerit neque auctor fusce.
              </p>
            </Reveal>

            <ul className="mt-6 space-y-3">
              {["Luxury, Quality & Comfort — premium salon-grade only", "High Quality Products — 100% batch-coded & warranted", "Medical Grade Sterilization — hygienic disposables & tools"].map((b, i) => (
                <Reveal key={b} delay={180 + i * 70}>
                  <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    {b}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={360} className="mt-8">
              <p className="text-[11px] font-extrabold tracking-[0.12em] uppercase text-slate-400">PureCuts in the press & brand partners:</p>
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                {BRAND_LOGOS.slice(0, 10).map((src, i) => (
                  <div
                    key={i}
                    className="h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-200"
                  >
                    <img src={src} alt="brand logo" className="max-h-8 max-w-full object-contain" loading="lazy" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. Blog — Lakrua block 7 ───────────────────────────────── */}
      <section className="bg-[#f8f8f8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal>
              <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase text-[#795BCB]">From the Blog</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 text-[26px] sm:text-[34px] font-black tracking-[-0.03em] text-slate-900 leading-tight">Latest News & Insight</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-2 text-sm text-slate-500 leading-6">We share fresh thoughts, expert insights, beauty tips, treatments and the latest trends in beauty and salon management.</p>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.title} delay={i * 110}>
                <Link
                  href={post.href}
                  className="group block overflow-hidden rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 rounded-xl bg-white border border-slate-200 px-2.5 py-1.5 text-[11px] font-black leading-none text-slate-900 shadow-sm">
                      {post.date}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-sm font-black leading-snug text-slate-900 group-hover:text-[#795BCB] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-500 line-clamp-2">{post.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#795BCB]">Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Final CTA — Lakrua block 8 ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-[#18181b] border border-white/10 text-center px-6 sm:px-10 py-12 sm:py-16">
          {/* subtle gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(121,91,203,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.14),transparent_45%)]" />
          <div className="relative">
            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase text-amber-300">It&apos;s time for a change!</span>
            <h2 className="mt-4 text-[24px] sm:text-[38px] font-black tracking-[-0.04em] leading-[0.95] text-white">
              Enhance your salon with
              <br />
              <span className="text-amber-300">PureCuts</span> professional range
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/70 max-w-2xl mx-auto">Sodales dapibus libero suscipit quisque congue tempus ociis posuere blandit and tristique a lectus hendrerit habitant — wholesale pricing, express Pune dispatch.</p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={openB2BModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#795BCB] hover:bg-[#6246B0] text-white px-7 py-3.5 text-sm font-black shadow-[0_10px_30px_rgba(121,91,203,0.35)] hover:-translate-y-0.5 transition-all"
              >
                Booking Online <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact-us"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 px-7 py-3.5 text-sm font-black hover:bg-slate-50 border border-slate-200 transition"
              >
                Contact Sales <Scissors className="w-4 h-4" />
              </Link>
            </div>

            {/* duplicate CTA as per Lakrua: Booking Online x2 visually— we keep one primary + one ghost */}
            <div className="mt-3 flex justify-center">
              <Link href="/category/all" className="text-xs font-bold text-white/60 hover:text-white transition underline decoration-white/20 underline-offset-4">
                Booking Online → browse wholesale catalog
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── video lightbox ───────────────────────────────────────── */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Salon video"
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition"
              aria-label="Close video"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/7e90gBu4pas?autoplay=1&rel=0"
                title="PureCuts salon video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
