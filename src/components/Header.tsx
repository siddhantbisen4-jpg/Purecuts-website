"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Sparkles,
  Flame,
  ShieldCheck,
  Building2,
  Package,
  Menu,
  X,
  PhoneCall,
} from "lucide-react";
import { LocationModal } from "./LocationModal";
import logo from "../image/purecuts_logo_no_bg-cropped.png";
import Image from "next/image";

const POPULAR_SEARCH_TAGS = [
  "Wahl Clipper",
  "Matrix Masque",
  "L'Oréal Majirel",
  "Dr. Rashel Gel",
  "Ikonic Straightener",
  "Shaving Gel",
  "Neck Strips",
  "Facial Kit",
];

const NAV_CATEGORIES = [
  { name: "Haircare", slug: "haircare", badge: "Hot" },
  { name: "Skincare & Bodycare", slug: "skincare" },
  {
    name: "Machineries & Tools",
    slug: "machineries",
    badge: "Up to 50% Off",
  },
  { name: "Salon Accessories", slug: "accessories" },
  { name: "Salon Furniture", slug: "furniture" },
  { name: "Salon Disposables", slug: "disposable", badge: "Wholesale" },
  { name: "Hair Color & Developers", slug: "hair-color" },
  { name: "Deals Zone", slug: "deals", isDeal: true },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const {
    itemCount,
    wishlistCount,
    subtotal,
    openCart,
    pincode,
    deliveryCity,
    openB2BModal,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchSuggestion, setSearchSuggestion] = useState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Dynamically update CSS custom property --header-height for sticky subcategory and sidebar positioning
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && !isMobileMenuOpen) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`,
        );
      }
    };

    updateHeaderHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [isMobileMenuOpen]);

  /*
   * Check whether a navbar category is currently active.
   *
   * Examples:
   *
   * /category/haircare
   * /category/haircare?subcategory=shampoo
   * /category/haircare?subcategory=hair-color
   *
   * All of the above keep "Haircare" active.
   */
  const isCategoryActive = (slug: string, isDeal?: boolean) => {
    if (isDeal) {
      return (
        pathname === "/category/all" &&
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("deal") === "true"
      );
    }

    return pathname === `/category/${slug}`;
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }

      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show pincode popup automatically on first visit
  useEffect(() => {
    const savedPin = localStorage.getItem("purecuts_pincode");

    if (!savedPin) {
      setIsLocationModalOpen(true);
    }
  }, []);

  const handleSearch = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();

    const query = customQuery !== undefined ? customQuery : searchQuery;

    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);

    let url = `/category/all?q=${encodeURIComponent(query.trim())}`;

    if (selectedCat !== "all") {
      url = `/category/${selectedCat}?q=${encodeURIComponent(query.trim())}`;
    }

    router.push(url);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 bg-white border-b border-[#e5e5e5]"
      >
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Image src={logo} width={130} alt="PureCuts" />
            </Link>

            {/* Delivery Location */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#795BCB] hover:bg-[#6246B0] border border-slate-200 hover:border-[#795BCB] transition text-left shrink-0"
            >
              <div className="w-7 h-7 rounded-lg bg-[#795BCB] text-amber-800 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>

              <div className="leading-tight">
                <span className="text-[10px] uppercase font-bold text-white block">
                  Deliver to
                </span>

                <span className="text-xs font-bold text-white flex items-center gap-1">
                  {pincode || "Set pincode"}

                  <span className="text-white font-normal truncate max-w-[110px]">
                    ({deliveryCity.split(",")[0]})
                  </span>

                  <ChevronDown className="w-3 h-3 text-white" />
                </span>
              </div>
            </button>

            {/* Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-2xl relative">
              <form
                onSubmit={handleSearch}
                className="flex-1 max-w-2xl mx-auto"
              >
                <div className="flex h-11 border border-[#dddddd] rounded-sm overflow-hidden bg-white">
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="hidden sm:block px-3 text-sm text-white border-r border-[#dddddd] bg-[#795BCB] outline-none"
                  >
                    <option value="all">All Categories</option>

                    <option value="haircare">Haircare</option>

                    <option value="skincare">Skincare</option>

                    <option value="machineries">Machineries</option>

                    <option value="accessories">Accessories</option>

                    <option value="furniture">Furniture</option>
                  </select>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="I'm shopping for..."
                    className="flex-1 px-4 text-sm outline-none text-[#333] placeholder:text-[#999]"
                  />

                  <button
                    type="submit"
                    className="w-12 bg-[#795BCB] text-white flex items-center justify-center hover:bg-[#6246B0] transition"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Autocomplete / Trending Search Drawer */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-500" />
                      Trending Salon Searches
                    </span>

                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Close
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {POPULAR_SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          handleSearch(undefined, tag);
                        }}
                        className="text-xs font-medium text-slate-700 bg-slate-100 hover:bg-[#795BCB]/10 hover:text-[#795BCB] px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-slate-200/60"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      100% Genuine Brands Guarantee
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        openB2BModal();
                      }}
                      className="text-[#795BCB] hover:underline font-semibold"
                    >
                      Need Salon Wholesale Quotation?
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />

                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Dropdown */}
              <div ref={accountRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                  aria-label="Account menu"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <User className="w-4 h-4" />
                  </div>

                  <div className="hidden lg:block text-left leading-none">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      Account
                    </span>

                    <span className="text-xs font-bold text-slate-800 flex items-center gap-0.5">
                      Salon Profile
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </span>
                  </div>
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                    <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl mb-1 border border-amber-100">
                      <p className="text-xs font-bold text-slate-900">
                        Welcome to PureCuts
                      </p>

                      <p className="text-[11px] text-slate-500">
                        Professional Salon Superstore
                      </p>
                    </div>

                    <Link
                      href="/login"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#795BCB] hover:bg-[#795BCB]/10 rounded-lg transition"
                    >
                      <User className="w-4 h-4 text-[#795BCB]" />
                      Sign in to PureCuts
                    </Link>

                    <Link
                      href="/account"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>

                    <Link
                      href="/account/orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      My Orders & Tracking
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Saved Wishlist ({wishlistCount})
                    </Link>

                    <button
                      onClick={() => {
                        setIsAccountOpen(false);
                        openB2BModal();
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#795BCB] hover:bg-[#795BCB]/10 rounded-lg transition"
                    >
                      <Building2 className="w-4 h-4 text-[#795BCB]" />
                      Salon Bulk GST Account
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                type="button"
                onClick={openCart}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-[#795BCB] hover:text-slate-950 text-white font-bold transition shadow-md shadow-slate-900/10 group"
                aria-label="Open Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#795BCB] group-hover:text-slate-950 transition" />

                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-slate-300 group-hover:text-slate-900 uppercase tracking-wider font-semibold">
                    {itemCount} {itemCount === 1 ? "Item" : "Items"}
                  </span>

                  <span className="text-xs font-extrabold text-[#795BCB] group-hover:text-slate-950">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="bg-slate-50 border-t border-slate-200/80 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-2 text-xs font-semibold text-black">
            {/* Category Links */}
            {/* Category Links */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {NAV_CATEGORIES.map((cat) => {
                const active = isCategoryActive(cat.slug, cat.isDeal);

                return (
                  <Link
                    key={cat.slug}
                    href={
                      cat.isDeal
                        ? "/category/all?deal=true"
                        : `/category/${cat.slug}`
                    }
                    className={`
          px-3 py-1.5 rounded-lg whitespace-nowrap
          transition-all duration-200
          flex items-center gap-1.5
          ${
            active
              ? "!bg-[#795BCB] !text-white shadow-sm"
              : "text-slate-700 hover:bg-[#795BCB]/10 hover:text-[#795BCB]"
          }
        `}
                  >
                    {/* Deal Icon */}
                    {cat.isDeal && (
                      <Flame
                        className={`
              w-3.5 h-3.5
              ${active ? "!text-white !fill-white" : "text-[#795BCB]"}
            `}
                      />
                    )}

                    {/* Category Name */}
                    <span className={active ? "!text-white" : "text-slate-700"}>
                      {cat.name}
                    </span>

                    {/* Badge */}
                    {cat.badge && (
                      <span
                        className={`
              text-[9px]
              font-extrabold
              px-1.5
              py-0.5
              rounded-full
              uppercase
              tracking-wider
              ${
                active ? "!bg-white !text-[#795BCB]" : "bg-[#795BCB] text-white"
              }
            `}
                      >
                        {cat.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Delivery Guarantee */}
            <div className="hidden 2xl:flex items-center gap-2 text-slate-500 text-[11px] shrink-0 ml-4 pl-4 border-l border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />

              <span>Doorstep Delivery across India</span>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 p-4 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl max-h-[80vh] overflow-y-auto">
            {/* Mobile Location */}
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-left"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#795BCB]" />

                <span className="text-xs font-bold text-slate-800">
                  Deliver to {pincode || "Set pincode"} (
                  {deliveryCity.split(",")[0]})
                </span>
              </div>

              <span className="text-xs text-[#795BCB] font-semibold">
                Change
              </span>
            </button>

            {/* Mobile Categories */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Shop by Salon Categories
              </span>

              <div className="grid grid-cols-2 gap-2">
                {NAV_CATEGORIES.map((cat) => {
                  const active = isCategoryActive(cat.slug, cat.isDeal);

                  return (
                    <Link
                      key={cat.slug}
                      href={
                        cat.isDeal
                          ? "/category/all?deal=true"
                          : `/category/${cat.slug}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        p-2.5
                        rounded-xl
                        border
                        text-xs
                        font-bold
                        transition
                        flex
                        items-center
                        justify-between
                        ${
                          active
                            ? "bg-[#795BCB] text-white border-[#795BCB]"
                            : "border-slate-200 bg-slate-50 text-slate-800 hover:border-[#795BCB] hover:bg-[#795BCB]/10 hover:text-[#795BCB]"
                        }
                      `}
                    >
                      <span>{cat.name}</span>

                      {cat.badge && (
                        <span
                          className={`
                            text-[9px]
                            px-1
                            py-0.5
                            rounded
                            ${
                              active
                                ? "bg-white text-[#795BCB]"
                                : "bg-[#795BCB]/10 text-[#795BCB]"
                            }
                          `}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openB2BModal();
                }}
                className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Request Salon Wholesale B2B Quote
              </button>

              <Link
                href="/account/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                Track Existing Order
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
