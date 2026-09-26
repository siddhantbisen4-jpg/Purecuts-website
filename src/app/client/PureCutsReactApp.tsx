"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/types";
import { LoginPage } from "./LoginPage";
import { BulkSuppliesBanner } from "@/components/BulkSuppliesBanner";
import { PRODUCTS_DATA, CATEGORIES_DATA } from "@/db/seed-data";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Heart,
  Layers,
  MapPin,
  Menu,
  Minus,
  Package,
  Palette,
  Plus,
  Search,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react";

const STATIC_PRODUCTS: Product[] = PRODUCTS_DATA.map((product, index) => ({
  id: index + 1,
  ...product,
  createdAt: new Date(),
}));

const FEATURED_CATEGORIES = CATEGORIES_DATA.slice(0, 8);

const CATEGORY_IMAGES: Record<string, string> = {
  haircare:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80",
  skincare:
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80",
  machineries:
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80",
  accessories:
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&q=80",
  furniture:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80",
  disposable:
    "https://images.unsplash.com/photo-1608248597359-20f592534579?w=700&q=80",
  "hair-color":
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=700&q=80",
  "salon-combos":
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=700&q=80",
};

const HERO_SLIDES = [
  {
    eyebrow: "PRO SALON MACHINERY SALE",
    title: "Up to 50% off Ikonic & Wahl tools",
    copy: "Heavy-duty clippers, tourmaline straighteners and 2000W dryers for busy professional stations.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1100&q=85",
    href: "/category/machineries",
    badge: "Limited-time barber deals",
  },
  {
    eyebrow: "HAIR CARE HEROES",
    title: "Matrix, L'Oréal & Schwarzkopf salon formulas",
    copy: "Authentic masks, shampoos, color and treatments, dispatched from our Pune hub.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1100&q=85",
    href: "/category/haircare",
    badge: "Starting at ₹165",
  },
  {
    eyebrow: "SKINCARE GLOW FESTIVAL",
    title: "Facial cleanups at direct salon rates",
    copy: "Dr. Rashel tubs, VLCC cleansers, Lotus scrubs and Vel Aroma facial kits for your next service.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1100&q=85",
    href: "/category/skincare",
    badge: "Dr. Rashel tubs @ ₹109",
  },
];

const BRANDS = [
  "L'Oréal Professionnel",
  "Matrix",
  "Schwarzkopf Professional",
  "Ikonic",
  "Wahl",
  "Dr. Rashel",
  "VLCC",
  "Streax Professional",
];

function navigate(path: string) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function ProductTile({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    openQuickView,
  } = useStore();
  const cartQuantity =
    cart.find((item) => item.productId === product.id)?.quantity || 0;
  const liked = isInWishlist(product.id);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square p-4 bg-slate-50 flex items-center justify-center overflow-hidden">
        {product.discountPercent ? (
          <span className="absolute top-3 left-3 z-10 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-md">
            SALE -{product.discountPercent}%
          </span>
        ) : product.isBestseller ? (
          <span className="absolute top-3 left-3 z-10 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-1 rounded-md">
            BESTSELLER
          </span>
        ) : null}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full ${liked ? "bg-rose-50 text-rose-600" : "bg-white text-slate-400 hover:text-rose-500"} shadow-sm transition`}
          aria-label="Save product"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-rose-500" : ""}`} />
        </button>
        <button
          onClick={() => onOpen(product)}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[185px] max-w-full object-contain group-hover:scale-110 transition duration-500"
            loading="lazy"
          />
        </button>
        <button
          onClick={() => openQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition whitespace-nowrap"
        >
          Quick view
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] text-amber-800 bg-amber-50 font-black uppercase tracking-wider px-2 py-1 rounded">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            {product.rating}
          </span>
        </div>
        <button
          onClick={() => onOpen(product)}
          className="text-left text-sm font-bold text-slate-900 hover:text-amber-600 line-clamp-2 leading-snug mb-2 transition"
        >
          {product.name}
        </button>
        {product.volumeSize && (
          <span className="text-[11px] text-slate-500 mb-3">
            Pack: <strong>{product.volumeSize}</strong>
          </span>
        )}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <strong className="text-lg font-black text-slate-950 block">
              {money(product.price)}
            </strong>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                {money(product.originalPrice)}
              </span>
            )}
          </div>
          {cartQuantity ? (
            <div className="flex items-center bg-amber-50 border border-amber-400 rounded-xl overflow-hidden">
              <button
                onClick={() => updateQuantity(product.id, cartQuantity - 1)}
                className="p-2 text-amber-900 hover:bg-amber-100"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-black">{cartQuantity}</span>
              <button
                onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                className="p-2 text-amber-900 hover:bg-amber-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold rounded-xl transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ReactHeader({
  onMenu,
  onB2B,
}: {
  onMenu: () => void;
  onB2B: () => void;
}) {
  const {
    itemCount,
    wishlistCount,
    subtotal,
    openCart,
    pincode,
    deliveryCity,
  } = useStore();
  const [query, setQuery] = useState("");

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/category/all?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="bg-slate-950 text-white px-4 py-1.5 text-[11px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="truncate">
            <strong className="text-amber-400">PureCuts Pro:</strong> 100%
            genuine salon products · Free delivery over ₹499 · Dispatch from
            Wagholi, Pune
          </span>
          <button
            onClick={onB2B}
            className="hidden md:flex items-center gap-1 text-amber-300 font-bold shrink-0"
          >
            <Building2 className="w-3.5 h-3.5" /> Salon wholesale & GST billing
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 lg:gap-5">
          <button
            onClick={onMenu}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 shrink-0 text-left"
          >
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md">
              <Scissors className="w-5 h-5 -rotate-45" />
            </span>
            <span>
              <strong className="block text-xl font-black text-slate-950 leading-none">
                Pure<span className="text-amber-600">Cuts</span>
              </strong>
              <small className="block text-[9px] font-bold tracking-wider uppercase text-slate-500 mt-1">
                Salon & beauty superstore
              </small>
            </span>
          </button>
          <button
            onClick={() => alert(`Delivering to ${pincode} · ${deliveryCity}`)}
            className="hidden xl:flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-left shrink-0"
          >
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>
              <small className="block text-[9px] uppercase font-bold text-slate-400">
                Deliver to
              </small>
              <strong className="text-xs">
                {pincode} · {deliveryCity.split(",")[0]}
              </strong>
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <form
            onSubmit={submitSearch}
            className="flex-1 flex items-center border-2 border-slate-200 focus-within:border-amber-500 rounded-2xl overflow-hidden bg-slate-50 focus-within:bg-white"
          >
            <select className="hidden md:block bg-slate-100 border-r border-slate-200 px-3 py-3 text-xs font-bold text-slate-700 focus:outline-none">
              <option>All Categories</option>
              <option>Haircare</option>
              <option>Skincare</option>
              <option>Machineries</option>
            </select>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Matrix, Wahl, Dr. Rashel, hair color..."
              className="flex-1 bg-transparent px-3 py-3 text-xs sm:text-sm font-medium focus:outline-none min-w-0"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-4 py-3 font-black text-xs flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>
          <button
            onClick={() => navigate("/wishlist")}
            className="hidden sm:flex relative p-2.5 rounded-xl hover:bg-rose-50 text-slate-700 hover:text-rose-600"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] flex items-center justify-center font-black">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="hidden md:flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100"
          >
            <User className="w-5 h-5" />
            <span className="hidden lg:block text-[11px] font-bold">
              Sign in
            </span>
          </button>
          <button
            onClick={openCart}
            className="flex items-center gap-2 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white px-3 py-2.5 rounded-xl transition"
          >
            <span className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black">
                  {itemCount}
                </span>
              )}
            </span>
            <span className="hidden sm:block text-left">
              <small className="block text-[9px] uppercase text-slate-300">
                {itemCount} items
              </small>
              <strong className="text-xs text-amber-400">
                {money(subtotal)}
              </strong>
            </span>
          </button>
        </div>
      </div>
      <nav className="bg-slate-50 border-t border-slate-200 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 text-xs font-bold whitespace-nowrap">
          <button
            onClick={() => navigate("/category/all")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 text-slate-950"
          >
            <Layers className="w-3.5 h-3.5" /> All Categories
          </button>
          {FEATURED_CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-800 text-slate-700"
            >
              {cat.name}
            </button>
          ))}
          <button
            onClick={() => navigate("/category/all?deal=true")}
            className="px-3 py-2 rounded-lg text-rose-600 flex items-center gap-1"
          >
            <Flame className="w-3.5 h-3.5 fill-rose-500" /> Deals Zone
          </button>
        </div>
      </nav>
    </header>
  );
}

function ReactFooter({ onB2B }: { onB2B: () => void }) {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-4"
          >
            <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <Scissors className="w-5 h-5 -rotate-45" />
            </span>
            <strong className="text-2xl text-white">
              Pure<span className="text-amber-500">Cuts</span>
            </strong>
          </button>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm mb-4">
            India's professional salon, beauty and personal care marketplace.
            Genuine products for salons, barbershops, academies and beauty
            lovers.
          </p>
          <div className="space-y-2 text-xs text-slate-400">
            <p className="flex gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> EUREKA, A
              Building, GHRCEM Domkhel Road, Wagholi - 412207, Pune
            </p>
            <p>☎ +91 9579177826 · +91 7715950954</p>
            <p>✉ contact@purecuts.in · info@purecuts.in</p>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-4">
            Top categories
          </h3>
          <div className="space-y-2 text-xs">
            {FEATURED_CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="block hover:text-white"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-4">
            Company & help
          </h3>
          <div className="space-y-2 text-xs">
            <button
              onClick={() => navigate("/about-us")}
              className="block hover:text-white"
            >
              About Us
            </button>
            <button
              onClick={() => navigate("/blog")}
              className="block hover:text-white"
            >
              Salon Blog & Tips
            </button>
            <button
              onClick={() => navigate("/contact-us")}
              className="block hover:text-white"
            >
              Contact Us
            </button>
            <button
              onClick={onB2B}
              className="block text-amber-300 font-bold hover:text-amber-200"
            >
              Salon Wholesale / B2B
            </button>
            <button
              onClick={() => navigate("/shipping-policy")}
              className="block hover:text-white"
            >
              Shipping & delivery
            </button>
            <button
              onClick={() => navigate("/privacy-policy")}
              className="block hover:text-white"
            >
              Privacy policy
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-4">
            Shop with confidence
          </h3>
          <div className="space-y-3 text-xs text-slate-400">
            <p className="flex gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" /> 100%
              genuine authorized stock
            </p>
            <p className="flex gap-2">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" /> Free
              delivery over ₹499
            </p>
            <p className="flex gap-2">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" /> GST
              billing for salons
            </p>
            <p className="flex gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-400 shrink-0" /> COD &
              secure payments
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 justify-between text-[11px] text-slate-500">
          <span>
            © {new Date().getFullYear()} PureCuts. All Rights Reserved.
          </span>
          <span>Built for professional salon shopping · Pune, Maharashtra</span>
        </div>
      </div>
    </footer>
  );
}

function Hero({ onShop }: { onShop: (href: string) => void }) {
  const [slide, setSlide] = useState(0);
  const active = HERO_SLIDES[slide];
  return (
    
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative min-h-[370px] rounded-3xl overflow-hidden flex items-center shadow-xl border border-slate-800">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${active.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/35" />
          </div>
          <div className="relative z-10 p-7 sm:p-10 max-w-2xl text-white">
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-amber-500 text-slate-950">
              {active.badge}
            </span>
            <span className="block text-xs text-amber-400 font-bold mt-5 tracking-widest">
              {active.eyebrow}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight mt-2 mb-3">
              {active.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed mb-6">
              {active.copy}
            </p>
            <button
              onClick={() => onShop(active.href)}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2"
            >
              Shop the collection <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() =>
              setSlide((slide + HERO_SLIDES.length - 1) % HERO_SLIDES.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSlide((slide + 1) % HERO_SLIDES.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-2"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setSlide(index)}
                className={`h-2 rounded-full ${slide === index ? "w-7 bg-amber-500" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 p-6 text-slate-950 flex flex-col justify-between min-h-[175px]">
            <span className="text-[10px] bg-slate-950 text-amber-400 font-black px-2 py-1 rounded-full w-fit">
              SALON B2B WHOLESALE
            </span>
            <div>
              <h2 className="text-xl font-black leading-tight mt-4">
                Bulk cartons with GST billing
              </h2>
              <p className="text-xs font-medium mt-1">
                Extra discounts for salons, academies and spas.
              </p>
            </div>
            <button onClick={() => useStore} className="hidden" />
          </div>
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 text-white flex flex-col justify-between min-h-[175px]">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <strong className="text-sm block">
                  100% genuine guarantee
                </strong>
                <span className="text-[11px] text-slate-400">
                  Authorized salon inventory
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mt-5">
              <div className="bg-slate-800 p-2.5 rounded-xl">
                <strong className="text-amber-400 block">₹499+</strong>
                <span className="text-slate-400">Free delivery</span>
              </div>
              <div className="bg-slate-800 p-2.5 rounded-xl">
                <strong className="text-emerald-400 block">COD Ready</strong>
                <span className="text-slate-400">At doorstep</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRail({ onShop }: { onShop: (href: string) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="bg-white rounded-3xl p-5 border border-slate-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Explore salon
              categories
            </h2>
            <p className="text-xs text-slate-500">
              Fast discovery across beauty and professional departments
            </p>
          </div>
          <button
            onClick={() => onShop("/category/all")}
            className="text-xs font-bold text-amber-700"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {FEATURED_CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => onShop(`/category/${category.slug}`)}
              className="group text-center"
            >
              <span className="block aspect-square rounded-2xl overflow-hidden bg-amber-100 border-2 border-amber-200 group-hover:border-amber-500 group-hover:shadow-lg transition">
                <img
                  src={CATEGORY_IMAGES[category.slug] || category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </span>
              <strong className="text-[11px] sm:text-xs text-slate-800 group-hover:text-amber-700 mt-2 block line-clamp-2">
                {category.name}
              </strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  title,
  subtitle,
  href,
  onShop,
  icon,
}: {
  title: string;
  subtitle: string;
  href: string;
  onShop: (href: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-5 pb-3 border-b border-slate-200">
      <div>
        <span className="text-[10px] uppercase tracking-wider font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
          {subtitle}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 mt-2">
          {icon}
          {title}
        </h2>
      </div>
      <button
        onClick={() => onShop(href)}
        className="text-xs font-bold text-amber-700 hover:underline shrink-0"
      >
        View all →
      </button>
    </div>
  );
}

function ProductRow({
  products,
  onOpen,
}: {
  products: Product[];
  onOpen: (product: Product) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.slice(0, 4).map((product) => (
        <ProductTile key={product.id} product={product} onOpen={onOpen} />
      ))}
    </div>
  );
}

function HomeView({
  onOpen,
  onShop,
}: {
  onOpen: (product: Product) => void;
  onShop: (href: string) => void;
}) {
  const deals = STATIC_PRODUCTS.filter(
    (product) => product.isDealOfTheDay,
  ).slice(0, 4);
  const hair = STATIC_PRODUCTS.filter(
    (product) => product.isHairCareHero,
  ).slice(0, 4);
  const skin = STATIC_PRODUCTS.filter(
    (product) => product.isSkincareBestseller,
  ).slice(0, 4);
  const tools = STATIC_PRODUCTS.filter(
    (product) => product.categorySlug === "machineries",
  ).slice(0, 4);
  return (
    <main className="bg-slate-100/60 pb-12">
      <Hero onShop={onShop} />
      <CategoryRail onShop={onShop} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="rounded-3xl bg-gradient-to-br from-rose-950 to-slate-950 p-5 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 px-2.5 py-1 rounded-full">
                Flash deals · limited stock
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-2">
                Deal of the day — up to 67% off
              </h2>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-200">
              <Clock3 className="w-4 h-4" /> Ends in 14h 35m
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deals.map((product) => (
              <ProductTile key={product.id} product={product} onOpen={onOpen} />
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200">
          <SectionHeading
            title="Hair care heroes"
            subtitle="Matrix · L'Oréal · Schwarzkopf"
            href="/category/haircare"
            onShop={onShop}
            icon={<Sparkles className="w-5 h-5 text-amber-500" />}
          />
          <ProductRow products={hair} onOpen={onOpen} />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200">
          <SectionHeading
            title="Skincare & facial cleanups"
            subtitle="Dr. Rashel tubs @ ₹109"
            href="/category/skincare"
            onShop={onShop}
            icon={<Heart className="w-5 h-5 text-rose-500" />}
          />
          <ProductRow products={skin} onOpen={onOpen} />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="bg-slate-950 rounded-3xl p-5 sm:p-8">
          <SectionHeading
            title="Salon machineries & styling tools"
            subtitle="Up to 50% off electricals"
            href="/category/machineries"
            onShop={onShop}
            icon={<Zap className="w-5 h-5 text-amber-400" />}
          />
          <ProductRow products={tools} onOpen={onOpen} />
        </div>
      </section>
      {/*<section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-amber-300">
              Salon bulk cartons & disposables
            </span>
            <h2 className="text-2xl font-black mt-2">
              Equip your salon with wholesale rates
            </h2>
            <p className="text-xs text-slate-300 mt-2 max-w-xl">
              Neck rolls, disposable cutting sheets, cotton, 1L shaving gels,
              and salon furniture shipped from the Wagholi, Pune distribution
              center.
            </p>
          </div>
          <button
            onClick={() => onShop("/contact-us?b2b=true")}
            className="px-5 py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-black flex items-center gap-2 shrink-0"
          >
            Request bulk quote <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>*/}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8">
          <SectionHeading
            title="Shop by top salon brands"
            subtitle="Authorized distributors"
            href="/brands"
            onShop={onShop}
            icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() =>
                  onShop(`/category/all?brand=${encodeURIComponent(brand)}`)
                }
                className="text-left rounded-2xl border border-slate-200 p-4 hover:border-amber-400 hover:shadow-sm transition"
              >
                <span className="text-[10px] uppercase text-slate-400 font-bold">
                  Official stock
                </span>
                <strong className="text-sm block mt-1 text-slate-900">
                  {brand}
                </strong>
                <span className="text-[11px] text-amber-700 mt-2 block">
                  Browse brand →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CatalogView({
  categorySlug,
  query,
  onOpen,
  onShop,
}: {
  categorySlug: string;
  query: string;
  onOpen: (product: Product) => void;
  onShop: (href: string) => void;
}) {
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [salonOnly, setSalonOnly] = useState(false);
  const [search, setSearch] = useState(query);
  const products = useMemo(
    () =>
      STATIC_PRODUCTS.filter((product) => {
        const matchesCategory =
          categorySlug === "all" || product.categorySlug === categorySlug;
        const value = search.toLowerCase();
        const matchesSearch =
          !value ||
          product.name.toLowerCase().includes(value) ||
          product.brand.toLowerCase().includes(value) ||
          product.category.toLowerCase().includes(value);
        const matchesBrand = !brand || product.brand === brand;
        const matchesPrice = product.price <= maxPrice;
        const matchesPro = !salonOnly || product.isSalonPro;
        return (
          matchesCategory &&
          matchesSearch &&
          matchesBrand &&
          matchesPrice &&
          matchesPro
        );
      }).sort((a, b) =>
        sort === "price-asc"
          ? a.price - b.price
          : sort === "price-desc"
            ? b.price - a.price
            : sort === "rating"
              ? Number(b.rating) - Number(a.rating)
              : sort === "discount"
                ? Number(b.discountPercent) - Number(a.discountPercent)
                : 0,
      ),
    [categorySlug, search, brand, maxPrice, salonOnly, sort],
  );
  const category = FEATURED_CATEGORIES.find(
    (item) => item.slug === categorySlug,
  );
  const brands = Array.from(
    new Set(STATIC_PRODUCTS.map((product) => product.brand)),
  );
  return (
    <main className="min-h-screen bg-slate-100/60 py-6 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => onShop("/")} className="hover:text-amber-600">
            Home
          </button>
          <span>/</span>
          <strong className="text-slate-800">
            {category?.name || "All Salon Products"}
          </strong>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 mb-6">
          <span className="text-[10px] uppercase font-black tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
            PureCuts catalog
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {category?.name || "All Salon Products"}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {category?.description ||
                  "Discover professional products, machinery, accessories and salon essentials from trusted brands."}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>{products.length} results</span>
              <span className="text-slate-300">·</span>
              <span>100% genuine stock</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-5 space-y-6 lg:sticky lg:top-32">
            <div className="flex items-center justify-between">
              <strong className="text-sm text-slate-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-600" /> Filters
              </strong>
              <button
                onClick={() => {
                  setBrand("");
                  setMaxPrice(20000);
                  setSalonOnly(false);
                  setSearch("");
                }}
                className="text-xs text-rose-600 font-bold"
              >
                Clear
              </button>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                Departments
              </span>
              <div className="mt-2 space-y-1">
                {FEATURED_CATEGORIES.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => onShop(`/category/${item.slug}`)}
                    className={`w-full text-left p-2 rounded-lg text-xs ${item.slug === categorySlug ? "bg-amber-50 text-amber-900 font-bold" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {item.name}
                    <span className="float-right text-slate-400">
                      {item.productCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                Brands
              </span>
              <div className="max-h-44 overflow-auto mt-2 space-y-1">
                {brands.map((item) => (
                  <button
                    key={item}
                    onClick={() => setBrand(brand === item ? "" : item)}
                    className={`block w-full text-left p-2 rounded-lg text-xs ${brand === item ? "bg-amber-50 text-amber-900 font-bold" : "text-slate-600 hover:bg-slate-50"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Maximum price</span>
                <span className="text-amber-700">{money(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="w-full accent-amber-500 mt-3"
              />
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={salonOnly}
                  onChange={(event) => setSalonOnly(event.target.checked)}
                  className="accent-amber-500"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Salon professional only
                </span>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-9">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[190px]">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search within this catalog..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="px-3 py-2 text-xs font-bold border border-slate-200 rounded-xl"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
            {products.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductTile
                    key={product.id}
                    product={product}
                    onOpen={onOpen}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Search className="w-10 h-10 mx-auto text-amber-500 mb-3" />
                <h2 className="font-black text-slate-900">No products found</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Try a different brand, search phrase or price range.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductView({
  product,
  onShop,
}: {
  product: Product;
  onShop: (href: string) => void;
}) {
  const {
    addToCart,
    openCart,
    toggleWishlist,
    isInWishlist,
    openB2BModal,
    pincode,
    setPincode,
  } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("overview");
  const [pin, setPin] = useState(pincode);
  const [message, setMessage] = useState(
    `Express delivery available to ${pincode}`,
  );
  const liked = isInWishlist(product.id);
  const buy = () => {
    addToCart(product, qty);
    onShop("/checkout");
  };
  const checkPin = (event: React.FormEvent) => {
    event.preventDefault();
    setPincode(pin);
    setMessage(
      pin.startsWith("41")
        ? "Pune hub express delivery: 24 hours and COD eligible"
        : `Standard delivery to ${pin}: 2-3 business days and COD eligible`,
    );
  };
  return (
    <main className="min-h-screen bg-slate-100/60 py-6 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => onShop("/")} className="hover:text-amber-600">
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onShop(`/category/${product.categorySlug}`)}
            className="hover:text-amber-600"
          >
            {product.category}
          </button>
          <span>/</span>
          <strong className="truncate text-slate-800">{product.name}</strong>
        </div>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-2xl bg-slate-50 p-6 flex items-center justify-center">
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-2 py-1 rounded">
                  SALE -{product.discountPercent}%
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full ${liked ? "bg-rose-50 text-rose-600" : "bg-white text-slate-400"}`}
                >
                  <Heart
                    className={`w-5 h-5 ${liked ? "fill-rose-500" : ""}`}
                  />
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[330px] max-w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[product.image, ...(product.galleryImages || [])]
                  .slice(0, 3)
                  .map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="rounded-xl bg-slate-50 border border-slate-200 p-2 aspect-square"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider font-black text-amber-800 bg-amber-50 px-3 py-1 rounded">
                  {product.brand}
                </span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4" /> In stock
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black leading-tight text-slate-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-1 rounded font-black">
                  {product.rating} <Star className="w-3 h-3 fill-white" />
                </span>
                <span className="text-slate-500">
                  {product.reviewCount} verified ratings
                </span>
              </div>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <div className="flex items-baseline gap-3">
                  <strong className="text-4xl font-black text-slate-950">
                    {money(product.price)}
                  </strong>
                  <span className="text-sm text-slate-400 line-through">
                    {money(product.originalPrice)}
                  </span>
                  <span className="text-xs font-black text-rose-600">
                    Save {money(product.originalPrice - product.price)}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Inclusive of all taxes · GST invoice available
                </p>
              </div>
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Salon bulk
                    volume pricing
                  </strong>
                  <button
                    onClick={openB2BModal}
                    className="text-[11px] text-amber-800 font-bold underline"
                  >
                    Request quote
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <span className="bg-white rounded-xl p-2 text-[10px] text-slate-500">
                    1-2 units
                    <strong className="block text-slate-900">
                      {money(product.price)}
                    </strong>
                  </span>
                  <span className="bg-white rounded-xl p-2 text-[10px] text-amber-700">
                    3+ units
                    <strong className="block text-amber-900">
                      {money(Math.round(product.price * 0.95))}
                    </strong>
                  </span>
                  <span className="bg-white rounded-xl p-2 text-[10px] text-emerald-700">
                    10+ units
                    <strong className="block text-emerald-900">
                      {money(Math.round(product.price * 0.88))}
                    </strong>
                  </span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {(product.highlights || []).slice(0, 4).map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold">Quantity</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 hover:bg-slate-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-black">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 hover:bg-slate-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  {product.volumeSize}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, qty);
                    openCart();
                  }}
                  className="py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to salon bag
                </button>
                <button
                  onClick={buy}
                  className="py-3.5 bg-slate-950 text-white font-black rounded-xl flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-400" /> Buy now
                </button>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <strong className="block text-xs mb-2">
                  Check delivery & COD availability
                </strong>
                <form onSubmit={checkPin} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      value={pin}
                      onChange={(event) =>
                        setPin(
                          event.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      placeholder="Enter pincode"
                      className="w-full pl-9 py-2 text-xs border border-slate-300 rounded-xl"
                    />
                  </div>
                  <button className="px-4 rounded-xl bg-slate-950 text-white text-xs font-bold">
                    Check
                  </button>
                </form>
                <p className="text-xs text-emerald-700 bg-emerald-50 rounded-xl p-2 mt-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> {message}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setTab("overview")}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap ${tab === "overview" ? "bg-amber-500 text-slate-950" : "text-slate-600"}`}
              >
                Product overview
              </button>
              <button
                onClick={() => setTab("usage")}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap ${tab === "usage" ? "bg-amber-500 text-slate-950" : "text-slate-600"}`}
              >
                How to use
              </button>
              <button
                onClick={() => setTab("specs")}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap ${tab === "specs" ? "bg-amber-500 text-slate-950" : "text-slate-600"}`}
              >
                Specifications
              </button>
            </div>
            <div className="pt-5 text-sm text-slate-600 leading-relaxed">
              {tab === "overview" && <p>{product.description}</p>}
              {tab === "usage" && (
                <p className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                  {product.usageInstructions}
                </p>
              )}
              {tab === "specs" && (
                <div className="grid sm:grid-cols-2 gap-2">
                  {Object.entries(product.specifications || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-4 bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs"
                      >
                        <span className="text-slate-500">{key}</span>
                        <strong className="text-slate-900 text-right">
                          {value}
                        </strong>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartView({ onShop }: { onShop: (href: string) => void }) {
  const {
    cart,
    subtotal,
    couponDiscount,
    deliveryFee,
    totalAmount,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    applyCoupon,
  } = useStore();
  const [code, setCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const apply = async () => {
    const result = await applyCoupon(code);
    setCouponMessage(result.message);
  };
  return (
    <main className="min-h-screen bg-slate-100/60 py-8 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <button onClick={() => onShop("/")}>Home</button>
          <span>/</span>
          <strong className="text-slate-800">Salon bag</strong>
        </div>
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-14 text-center border border-slate-200">
            <ShoppingBag className="w-12 h-12 mx-auto text-amber-500 mb-3" />
            <h1 className="text-xl font-black">Your salon bag is empty</h1>
            <p className="text-xs text-slate-500 mt-2 mb-5">
              Add professional products to begin your order.
            </p>
            <button
              onClick={() => onShop("/category/all")}
              className="bg-amber-500 px-5 py-3 rounded-xl text-xs font-black"
            >
              Explore products <ArrowRight className="inline w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200">
              <div className="flex justify-between pb-4 border-b border-slate-100">
                <h1 className="text-lg font-black">
                  Products in your bag ({cart.length})
                </h1>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> 100% genuine
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="py-4 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 bg-slate-50 rounded-xl object-contain p-2"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-black text-amber-800">
                        {item.brand}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900 line-clamp-2">
                        {item.name}
                      </h2>
                      <strong className="text-sm block mt-1">
                        {money(item.price * item.quantity)}
                      </strong>
                    </div>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-2"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="p-2"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 h-fit lg:sticky lg:top-32">
              <h2 className="font-black text-base pb-4 border-b border-slate-100">
                Order summary
              </h2>
              <div className="flex gap-2 my-4">
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2.5 border border-slate-300 rounded-xl text-xs uppercase"
                />
                <button
                  onClick={apply}
                  className="px-3 rounded-xl bg-slate-950 text-white text-xs font-bold"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className="text-[11px] text-emerald-700 mb-3">
                  {couponMessage}
                </p>
              )}
              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <strong>{money(subtotal)}</strong>
                </p>
                {couponDiscount > 0 && (
                  <p className="flex justify-between text-emerald-700">
                    <span>Coupon {appliedCoupon?.code}</span>
                    <strong>-{money(couponDiscount)}</strong>
                  </p>
                )}
                <p className="flex justify-between">
                  <span>Delivery</span>
                  <strong className="text-emerald-700">
                    {deliveryFee ? money(deliveryFee) : "FREE"}
                  </strong>
                </p>
                <p className="flex justify-between text-base font-black text-slate-950 border-t border-slate-200 pt-3">
                  <span>Total</span>
                  <strong className="text-amber-600">
                    {money(totalAmount)}
                  </strong>
                </p>
              </div>
              <button
                onClick={() => onShop("/checkout")}
                className="w-full mt-5 py-3.5 bg-amber-500 rounded-xl text-slate-950 font-black text-sm"
              >
                Proceed to checkout <ArrowRight className="inline w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-3">
                COD available · Free delivery over ₹499
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function CheckoutView({ onShop }: { onShop: (href: string) => void }) {
  const {
    cart,
    subtotal,
    couponDiscount,
    deliveryFee,
    totalAmount,
    appliedCoupon,
    clearCart,
  } = useStore();
  const [form, setForm] = useState({
    name: "Salon Partner",
    phone: "9876543210",
    email: "salon@example.com",
    address: "EUREKA Building, Domkhel Road, Wagholi",
    city: "Pune",
    state: "Maharashtra",
    pincode: "412207",
    salonName: "",
    gstNumber: "",
    paymentMethod: "COD",
  });
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          addressLine: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          salonName: form.salonName,
          gstNumber: form.gstNumber,
          paymentMethod: form.paymentMethod,
          subtotal,
          discount: couponDiscount,
          couponCode: appliedCoupon?.code,
          deliveryFee,
          totalAmount,
          items: cart,
        }),
      });
      const data = await response.json();
      clearCart();
      onShop(
        `/order-success?orderNumber=${data.order?.orderNumber || `PC-${Date.now().toString().slice(-6)}`}`,
      );
    } catch {
      clearCart();
      onShop(
        `/order-success?orderNumber=PC-${Date.now().toString().slice(-6)}`,
      );
    } finally {
      setSubmitting(false);
    }
  };
  const input = (
    key: keyof typeof form,
    label: string,
    placeholder: string,
    required = true,
  ) => (
    <label className="block">
      <span className="block text-xs font-bold text-slate-700 mb-1">
        {label}
      </span>
      <input
        required={required}
        value={form[key]}
        onChange={(event) => setForm({ ...form, [key]: event.target.value })}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
      />
    </label>
  );
  return (
    <main className="min-h-screen bg-slate-100/60 py-8 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <form onSubmit={submit} className="lg:col-span-8 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200">
              <h1 className="text-xl font-black text-slate-900 pb-4 border-b border-slate-100 flex gap-2">
                <Truck className="w-5 h-5 text-amber-600" /> Delivery address
              </h1>
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                {input("name", "Full name *", "Your name")}
                {input("phone", "Phone number *", "9876543210")}
                {input("email", "Email for invoice *", "salon@example.com")}
                {input(
                  "salonName",
                  "Salon / business name",
                  "Your salon",
                  false,
                )}
              </div>
              <div className="mt-4">
                {input(
                  "address",
                  "Street address / landmark *",
                  "Delivery address",
                )}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {input("city", "City *", "Pune")}
                {input("state", "State *", "Maharashtra")}
                {input("pincode", "Pincode *", "412207")}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-200">
              <h2 className="text-base font-black flex gap-2">
                <Building2 className="w-5 h-5 text-amber-600" /> Salon GST
                billing{" "}
                <span className="text-xs font-normal text-slate-500 mt-1">
                  (optional)
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Provide your GSTIN to receive a compliant input tax invoice.
              </p>
              <div className="mt-4">
                {input("gstNumber", "GSTIN", "27AAAAA0000A1Z5", false)}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-200">
              <h2 className="text-base font-black flex gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Payment
                method
              </h2>
              <div className="grid gap-3 mt-4">
                <label
                  className={`p-4 rounded-2xl border-2 ${form.paymentMethod === "COD" ? "border-amber-500 bg-amber-50" : "border-slate-200"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === "COD"}
                    onChange={() => setForm({ ...form, paymentMethod: "COD" })}
                  />{" "}
                  <strong className="ml-2 text-xs">Cash on Delivery</strong>
                  <span className="block text-[11px] text-slate-500 ml-6">
                    Pay when your salon package arrives.
                  </span>
                </label>
                <label
                  className={`p-4 rounded-2xl border-2 ${form.paymentMethod === "UPI" ? "border-amber-500 bg-amber-50" : "border-slate-200"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={form.paymentMethod === "UPI"}
                    onChange={() => setForm({ ...form, paymentMethod: "UPI" })}
                  />{" "}
                  <strong className="ml-2 text-xs">
                    UPI / Card / NetBanking
                  </strong>
                  <span className="block text-[11px] text-slate-500 ml-6">
                    Instant secure payment confirmation.
                  </span>
                </label>
              </div>
            </div>
          </form>
          <aside className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 h-fit lg:sticky lg:top-32">
            <h2 className="font-black pb-4 border-b border-slate-100">
              Confirm your order
            </h2>
            <div className="max-h-52 overflow-auto divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.productId} className="py-3 flex gap-2 text-xs">
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 rounded-lg bg-slate-50 object-contain"
                  />
                  <div className="flex-1 min-w-0">
                    <strong className="line-clamp-2">{item.name}</strong>
                    <span className="text-slate-500">Qty {item.quantity}</span>
                  </div>
                  <strong>{money(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4 mt-2">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </p>
              {couponDiscount > 0 && (
                <p className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <strong>-{money(couponDiscount)}</strong>
                </p>
              )}
              <p className="flex justify-between">
                <span>Delivery</span>
                <strong className="text-emerald-700">
                  {deliveryFee ? money(deliveryFee) : "FREE"}
                </strong>
              </p>
              <p className="flex justify-between text-lg font-black text-slate-950 border-t pt-3">
                <span>Total</span>
                <strong className="text-amber-600">{money(totalAmount)}</strong>
              </p>
            </div>
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full mt-5 py-3.5 bg-amber-500 rounded-xl text-slate-950 font-black text-sm disabled:opacity-50"
            >
              {submitting ? "Confirming order..." : "Confirm & place order"}
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-3">
              🔒 Secure checkout · 100% genuine products
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function B2BPanel({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    salonName: "",
    phone: "",
    email: "",
    requirements: "",
  });
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetch("/api/b2b-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => null);
    setDone(true);
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border-t-4 border-amber-500">
        {done ? (
          <div className="text-center py-8">
            <Check className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h2 className="text-2xl font-black">Inquiry received</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2">
              Our PureCuts Salon Account Manager will contact you within 2
              business hours with a custom quote.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-slate-950 text-white px-5 py-3 rounded-xl text-xs font-bold"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-[10px] uppercase font-black tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
              PureCuts Salon Partner
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-3">
              Salon wholesale & bulk inquiry
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Get wholesale rates, GST invoices and carton pricing on salon
              stock.
            </p>
            <form onSubmit={submit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Your name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border text-xs"
                />
                <input
                  placeholder="Salon / business name"
                  value={form.salonName}
                  onChange={(e) =>
                    setForm({ ...form, salonName: e.target.value })
                  }
                  className="px-3 py-2.5 rounded-xl border text-xs"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  required
                  placeholder="WhatsApp phone *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border text-xs"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-3 py-2.5 rounded-xl border text-xs"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Required products and quantities *"
                value={form.requirements}
                onChange={(e) =>
                  setForm({ ...form, requirements: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-xl border text-xs"
              />
              <button className="w-full py-3 bg-amber-500 rounded-xl text-slate-950 font-black text-xs flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" /> Get wholesale quotation
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function PureCutsReactApp({ embedded = false }: { embedded?: boolean }) {
  const store = useStore();
  const [location, setLocation] = useState(
    typeof window === "undefined"
      ? "/"
      : window.location.pathname + window.location.search,
  );
  const [mobileMenu, setMobileMenu] = useState(false);
  const [b2bOpen, setB2bOpen] = useState(false);

  useEffect(() => {
    const update = () =>
      setLocation(window.location.pathname + window.location.search);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const onShop = (href: string) => {
    if (href.includes("b2b=true")) {
      setB2bOpen(true);
      return;
    }
    navigate(href);
  };

  const parsed = useMemo(() => {
    const url = new URL(location, "http://purecuts.local");
    const path = url.pathname;
    const categoryMatch = path.match(/^\/category\/([^/]+)/);
    const productMatch = path.match(/^\/product\/([^/]+)/);
    return {
      path,
      query: url.searchParams.get("q") || "",
      category: categoryMatch?.[1] || "all",
      productSlug: productMatch?.[1] || "",
    };
  }, [location]);

  const product = STATIC_PRODUCTS.find(
    (item) => item.slug === parsed.productSlug,
  );
  const standalone = !embedded;
  const showHome = parsed.path === "/" || parsed.path === "";
  const showCategory = parsed.path.startsWith("/category/");
  const showProduct = parsed.path.startsWith("/product/");
  const showCart = parsed.path === "/cart";
  const showCheckout = parsed.path === "/checkout";
  const showLogin = parsed.path === "/login";
  const showStoreChrome = standalone && !showLogin;

  const content = showLogin ? (
    <LoginPage onNavigate={onShop} />
  ) : showProduct && product ? (
    <ProductView product={product} onShop={onShop} />
  ) : showCategory ? (
    <CatalogView
      categorySlug={parsed.category}
      query={parsed.query}
      onOpen={(item) => onShop(`/product/${item.slug}`)}
      onShop={onShop}
    />
  ) : showCart ? (
    <CartView onShop={onShop} />
  ) : showCheckout ? (
    <CheckoutView onShop={onShop} />
  ) : (
    <HomeView
      onOpen={(item) => onShop(`/product/${item.slug}`)}
      onShop={onShop}
    />
  );

  return (
    <div className="react-storefront">
      {showStoreChrome && (
        <ReactHeader
          onMenu={() => setMobileMenu(!mobileMenu)}
          onB2B={() => setB2bOpen(true)}
        />
      )}
      {mobileMenu && showStoreChrome && (
        <div className="lg:hidden fixed inset-x-0 top-24 z-30 bg-white border-b p-4 space-y-2">
          {FEATURED_CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => {
                setMobileMenu(false);
                onShop(`/category/${category.slug}`);
              }}
              className="block w-full text-left p-3 rounded-xl bg-slate-50 text-xs font-bold"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      {content}
      {showStoreChrome && <ReactFooter onB2B={() => setB2bOpen(true)} />}
      {b2bOpen && <B2BPanel onClose={() => setB2bOpen(false)} />}
    </div>
  );
}
