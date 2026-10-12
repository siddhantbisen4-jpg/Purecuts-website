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
} from "lucide-react";

import { NAV_CATEGORIES } from "./navCategories";
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
{/*export const NAV_CATEGORIES = [
  { name: "Haircare", slug: "haircare", badge: "Hot" },
  { name: "Skincare & Bodycare", slug: "skincare" },
  { name: "Machineries & Tools", slug: "machineries", badge: "Up to 50% Off" },
  { name: "Salon Accessories", slug: "accessories" },
  { name: "Salon Furniture", slug: "furniture" },
  { name: "Salon Disposables", slug: "disposable", badge: "Wholesale" },


];*/}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  /* ========================================================= HEADER HEIGHT ========================================================= */ useEffect(() => {
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
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [isMobileMenuOpen]);
  /* ========================================================= CATEGORY ACTIVE STATE ========================================================= */ const isCategoryActive =
    (slug: string, isDeal?: boolean) => {
      if (isDeal) {
        return (
          pathname === "/category/all" &&
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("deal") === "true"
        );
      }
      return pathname === `/category/${slug}`;
    };
  /* ========================================================= CLOSE DROPDOWNS ========================================================= */ useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;
        if (searchRef.current && !searchRef.current.contains(target)) {
          setIsSearchOpen(false);
        }
        if (accountRef.current && !accountRef.current.contains(target)) {
          setIsAccountOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  /* ========================================================= FIRST VISIT LOCATION POPUP ========================================================= */ useEffect(() => {
      const savedPin = localStorage.getItem("purecuts_pincode");
      if (!savedPin) {
        setIsLocationModalOpen(true);
      }
    }, []);
  /* ========================================================= SEARCH ========================================================= */ const handleSearch =
    (e?: React.FormEvent, customQuery?: string) => {
      if (e) {
        e.preventDefault();
      }
      const query = customQuery !== undefined ? customQuery : searchQuery;
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      let url = `/category/all?q=${encodeURIComponent(query.trim())}`;
      if (selectedCat !== "all") {
        url = `/category/${selectedCat}?q=${encodeURIComponent(query.trim())}`;
      }
      router.push(url);
    };
  /* ========================================================= MOBILE MENU CLOSE ========================================================= */ const closeMobileMenu =
    () => {
      setIsMobileMenuOpen(false);
    };
  return (
    <>

      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-[#e5e5e5]"
      >

        {/* ===================================================== DESKTOP HEADER IMPORTANT: Existing desktop design is preserved. Visible from lg and above. ===================================================== */}
        <div className="hidden lg:block">
          {" "}
          {/* Main Navbar */}{" "}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
            {" "}
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              {" "}
              {/* Logo */}{" "}
              <Link href="/" className="flex items-center gap-2 shrink-0 group">
                {" "}
                <Image src={logo} width={130} alt="PureCuts" />{" "}
              </Link>{" "}
              {/* Delivery Location */}{" "}
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#795BCB] hover:bg-[#6246B0] border border-slate-200 hover:border-[#795BCB] transition text-left shrink-0"
              >
                {" "}
                <div className="w-7 h-7 rounded-lg bg-[#795BCB] text-amber-800 flex items-center justify-center shrink-0">
                  {" "}
                  <MapPin className="w-4 h-4 text-white" />{" "}
                </div>{" "}
                <div className="leading-tight">
                  {" "}
                  <span className="text-[10px] uppercase font-bold text-white block">
                    {" "}
                    Deliver to{" "}
                  </span>{" "}
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    {" "}
                    {pincode || "Set pincode"}{" "}
                    {pincode && deliveryCity && (
                      <span className="text-white font-normal truncate max-w-[110px]">
                        {" "}
                        ({deliveryCity.split(",")[0]}){" "}
                      </span>
                    )}{" "}
                    <ChevronDown className="w-3 h-3 text-white" />{" "}
                  </span>{" "}
                </div>{" "}
              </button>{" "}
              {/* Search */}{" "}
              <div ref={searchRef} className="flex-1 max-w-2xl relative">
                {" "}

                <form
                  id="header-search"
                  onSubmit={handleSearch}
                  className="flex-1 max-w-2xl mx-auto scroll-mt-24"
                >

                  {" "}
                  <div className="flex h-11 border border-[#dddddd] rounded-sm overflow-hidden bg-white">
                    {" "}
                    {/* <select
                      value={selectedCat}
                      onChange={(e) => setSelectedCat(e.target.value)}
                      className="px-3 text-sm text-white border-r border-[#dddddd] bg-[#795BCB] outline-none"
                    >
                      {" "}
                      <option value="all"> All Categories </option>{" "}
                      <option value="haircare"> Haircare </option>{" "}
                      <option value="skincare"> Skincare </option>{" "}
                      <option value="machineries"> Machineries </option>{" "}
                      <option value="accessories"> Accessories </option>{" "}
                      <option value="furniture"> Furniture </option>{" "}
                    </select>{" "}*/}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchOpen(true)}
                      placeholder="I'm shopping for..."
                      className="flex-1 px-4 text-sm outline-none text-[#333] placeholder:text-[#999]"
                    />{" "}
                    <button
                      type="submit"
                      className="w-12 bg-[#795BCB] text-white flex items-center justify-center hover:bg-[#6246B0] transition"
                    >
                      {" "}
                      <Search className="w-5 h-5" />{" "}
                    </button>{" "}
                  </div>{" "}
                </form>{" "}
                {/* Desktop Search Drawer */}{" "}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in duration-150">
                    {" "}
                    <div className="flex items-center justify-between mb-2">
                      {" "}
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        {" "}
                        <Flame className="w-3.5 h-3.5 text-rose-500" /> Trending
                        Salon Searches{" "}
                      </span>{" "}
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="text-xs text-slate-400 hover:text-slate-600"
                      >
                        {" "}
                        Close{" "}
                      </button>{" "}
                    </div>{" "}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {" "}
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
                          {" "}
                          <Search className="w-3 h-3 text-slate-400" />{" "}
                          {tag}{" "}
                        </button>
                      ))}{" "}
                    </div>{" "}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      {" "}
                      <span className="flex items-center gap-1">
                        {" "}
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />{" "}
                        100% Genuine Brands Guarantee{" "}
                      </span>{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          openB2BModal();
                        }}
                        className="text-[#795BCB] hover:underline font-semibold"
                      >
                        {" "}
                        Need Salon Wholesale Quotation?{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>
                )}{" "}
              </div>{" "}
              {/* Desktop Right Actions */}{" "}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {" "}
                {/* Wishlist */}{" "}
                <Link
                  href="/wishlist"
                  className="relative p-2.5 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                  aria-label="Wishlist"
                >
                  {" "}
                  <Heart className="w-5 h-5" />{" "}
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                      {" "}
                      {wishlistCount}{" "}
                    </span>
                  )}{" "}
                </Link>{" "}
                {/* Account */}{" "}
                <div ref={accountRef} className="relative">
                  {" "}
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center gap-1.5 p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                    aria-label="Account menu"
                  >
                    {" "}
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                      {" "}
                      <User className="w-4 h-4" />{" "}
                    </div>{" "}
                    <div className="text-left leading-none">
                      {" "}
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                        {" "}
                        Account{" "}
                      </span>{" "}
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-0.5">
                        {" "}
                        Salon Profile{" "}
                        <ChevronDown className="w-3 h-3 text-slate-400" />{" "}
                      </span>{" "}
                    </div>{" "}
                  </button>{" "}
                  {isAccountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in duration-150">
                      {" "}
                      <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl mb-1 border border-amber-100">
                        {" "}
                        <p className="text-xs font-bold text-slate-900">
                          {" "}
                          Welcome to PureCuts{" "}
                        </p>{" "}
                        <p className="text-[11px] text-slate-500">
                          {" "}
                          Professional Salon Superstore{" "}
                        </p>{" "}
                      </div>{" "}
                      <Link
                        href="/login"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#795BCB] hover:bg-[#795BCB]/10 rounded-lg transition"
                      >
                        {" "}
                        <User className="w-4 h-4 text-[#795BCB]" /> Sign in to
                        PureCuts{" "}
                      </Link>{" "}
                      <Link
                        href="/account"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        {" "}
                        <User className="w-4 h-4 text-slate-400" /> My
                        Profile{" "}
                      </Link>{" "}
                      <Link
                        href="/account/orders"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        {" "}
                        <Package className="w-4 h-4 text-slate-400" /> My Orders
                        & Tracking{" "}
                      </Link>{" "}
                      <Link
                        href="/wishlist"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition"
                      >
                        {" "}
                        <Heart className="w-4 h-4 text-slate-400" /> Saved
                        Wishlist ({wishlistCount}){" "}
                      </Link>{" "}

                    </div>
                  )}{" "}
                </div>{" "}
                {/* Cart */}{" "}
                <button
                  type="button"
                  onClick={openCart}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-[#795BCB] hover:text-slate-950 text-white font-bold transition shadow-md shadow-slate-900/10 group"
                  aria-label="Open Cart"
                >
                  {" "}
                  <div className="relative">
                    {" "}
                    <ShoppingBag className="w-5 h-5 text-[#795BCB] group-hover:text-slate-950 transition" />{" "}
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                        {" "}
                        {itemCount}{" "}
                      </span>
                    )}{" "}
                  </div>{" "}
                  <div className="flex flex-col text-left leading-tight">
                    {" "}
                    <span className="text-[10px] text-slate-300 group-hover:text-slate-900 uppercase tracking-wider font-semibold">
                      {" "}
                      {itemCount} {itemCount === 1 ? "Item" : "Items"}{" "}
                    </span>{" "}
                    <span className="text-xs font-extrabold text-[#795BCB] group-hover:text-slate-950">
                      {" "}
                      ₹{subtotal.toLocaleString("en-IN")}{" "}
                    </span>{" "}
                  </div>{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Desktop Category Navigation */}{" "}


          {/* Desktop Category Navigation */}
          <div className="bg-slate-50 border-t border-slate-200/80 px-4 mt-4">
            <div className="h-2 bg-white" />

            <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-0 text-xs font-semibold text-black">
              <div className="flex items-center gap-1 sm:gap-9 shrink-0">
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
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${active
                        ? "!bg-[#795BCB] !text-white shadow-sm"
                        : "text-slate-700 hover:bg-[#795BCB]/10 hover:text-[#795BCB]"
                        }`}
                    >
                      {cat.isDeal && (
                        <Flame
                          className={`w-3.5 h-3.5 ${active ? "!text-white !fill-white" : "text-[#795BCB]"
                            }`}
                        />
                      )}

                      <span className={active ? "!text-white" : "text-slate-700"}>
                        {cat.name}
                      </span>

                      {cat.badge && (
                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${active
                            ? "!bg-white !text-[#795BCB]"
                            : "bg-[#795BCB] text-white"
                            }`}
                        >
                          {cat.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>


        </div>{" "}
        {/* ===================================================== MOBILE HEADER Professional mobile layout. Visible below lg. ===================================================== */}{" "}
        <div className="lg:hidden bg-white">
          {" "}
          {/* Mobile Top Row */}{" "}
          <div className="px-3 py-2.5">
            {" "}
            <div className="flex items-center justify-between gap-2">
              {" "}
              {/* Logo */}{" "}
              <Link href="/" className="shrink-0 flex items-center">
                {" "}
                <Image
                  src={logo}
                  width={112}
                  alt="PureCuts"
                  className="w-[105px] h-auto"
                  priority
                />{" "}
              </Link>{" "}
              {/* Mobile Actions */}{" "}
              <div className="flex items-center gap-1">
                {" "}
                {/* Wishlist */}{" "}
                <Link
                  href="/wishlist"
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 active:bg-slate-100"
                  aria-label="Wishlist"
                >
                  {" "}
                  <Heart className="w-[19px] h-[19px]" />{" "}
                  {wishlistCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-extrabold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center">
                      {" "}
                      {wishlistCount}{" "}
                    </span>
                  )}{" "}
                </Link>{" "}
                {/* Cart */}{" "}
                <button
                  type="button"
                  onClick={openCart}
                  className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 active:bg-slate-100"
                  aria-label="Open Cart"
                >
                  {" "}
                  <ShoppingBag className="w-[19px] h-[19px]" />{" "}
                  {itemCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[9px] font-extrabold min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center">
                      {" "}
                      {itemCount}{" "}
                    </span>
                  )}{" "}
                </button>{" "}
                {/* Account */}{" "}
                <Link
                  href="/account"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 active:bg-slate-100"
                  aria-label="Account"
                >
                  {" "}
                  <User className="w-[19px] h-[19px]" />{" "}
                </Link>{" "}
                {/* Menu */}{" "}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 active:bg-slate-100"
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {" "}
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Mobile Search */}{" "}
          <div className="px-3 pb-2.5">
            {" "}
            <div ref={searchRef} className="relative w-full">
              {" "}
              <form onSubmit={handleSearch} className="w-full">
                {" "}
                <div className="flex h-11 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-[#795BCB] focus-within:ring-2 focus-within:ring-[#795BCB]/10 transition">
                  {" "}
                  <div className="flex-1 flex items-center min-w-0">
                    {" "}
                    <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />{" "}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchOpen(true)}
                      placeholder="Search salon products..."
                      className="w-full min-w-0 bg-transparent px-2.5 text-sm outline-none text-slate-800 placeholder:text-slate-400"
                    />{" "}
                  </div>{" "}
                  <button
                    type="submit"
                    className="w-11 shrink-0 bg-[#795BCB] text-white flex items-center justify-center active:bg-[#6246B0] transition"
                    aria-label="Search"
                  >
                    {" "}
                    <Search className="w-[18px] h-[18px]" />{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
              {/* Mobile Search Suggestions */}{" "}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-[60]">
                  {" "}
                  <div className="flex items-center justify-between mb-2">
                    {" "}
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      {" "}
                      <Flame className="w-3.5 h-3.5 text-rose-500" /> Trending
                      Searches{" "}
                    </span>{" "}
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-[11px] text-slate-400 px-2 py-1"
                    >
                      {" "}
                      Close{" "}
                    </button>{" "}
                  </div>{" "}
                  <div className="flex flex-wrap gap-1.5">
                    {" "}
                    {POPULAR_SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          handleSearch(undefined, tag);
                        }}
                        className="text-[11px] font-medium text-slate-700 bg-slate-100 active:bg-[#795BCB]/10 px-2.5 py-1.5 rounded-lg border border-slate-200"
                      >
                        {" "}
                        {tag}{" "}
                      </button>
                    ))}{" "}
                  </div>{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
          {/* Mobile Delivery Location */}{" "}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="mx-3 mb-2.5 w-[calc(100%-24px)] flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#795BCB]/5 border border-[#795BCB]/15 text-left active:bg-[#795BCB]/10"
          >
            {" "}
            <div className="flex items-center gap-2 min-w-0">
              {" "}
              <div className="w-8 h-8 rounded-lg bg-[#795BCB] flex items-center justify-center shrink-0">
                {" "}
                <MapPin className="w-4 h-4 text-white" />{" "}
              </div>{" "}
              <div className="min-w-0 leading-tight">
                {" "}
                <span className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-400">
                  {" "}
                  Deliver to{" "}
                </span>{" "}
                <span className="block text-xs font-bold text-slate-800 truncate">
                  {" "}
                  {pincode || "Set your delivery location"}{" "}
                  {pincode && (
                    <span className="font-normal text-slate-500">
                      {" "}
                      · {deliveryCity.split(",")[0]}{" "}
                    </span>
                  )}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex items-center gap-1 shrink-0">
              {" "}
              <span className="text-[11px] font-extrabold text-[#795BCB]">
                {" "}
                Change{" "}
              </span>{" "}
              <ChevronDown className="w-3.5 h-3.5 text-[#795BCB]" />{" "}
            </div>{" "}
          </button>{" "}
          {/* Mobile Category Strip */}{" "}
          <div className="border-t border-slate-100 bg-white">
            {" "}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-3 py-2">
              {" "}
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
                    className={` shrink-0 px-3 py-1.5 rounded-full whitespace-nowrap text-[11px] font-bold border transition flex items-center gap-1 ${active ? "bg-[#795BCB] text-white border-[#795BCB]" : "bg-white text-slate-700 border-slate-200 active:bg-[#795BCB]/10"} `}
                  >
                    {" "}
                    {cat.isDeal && (
                      <Flame
                        className={`w-3 h-3 ${active ? "text-white fill-white" : "text-[#795BCB]"}`}
                      />
                    )}{" "}
                    <span>{cat.name}</span>{" "}
                    {cat.badge === "Hot" && (
                      <span
                        className={`text-[8px] font-extrabold px-1 py-0.5 rounded ${active ? "bg-white text-[#795BCB]" : "bg-[#795BCB]/10 text-[#795BCB]"}`}
                      >
                        {" "}
                        HOT{" "}
                      </span>
                    )}{" "}
                  </Link>
                );
              })}{" "}
            </div>{" "}
          </div>{" "}
          {/* =================================================== MOBILE MENU =================================================== */}{" "}
          {isMobileMenuOpen && (
            <div className="bg-white border-t border-slate-200 shadow-xl max-h-[75vh] overflow-y-auto">
              {" "}
              <div className="p-3 space-y-4">
                {" "}
                {/* Location */}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    closeMobileMenu();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-left"
                >
                  {" "}
                  <div className="flex items-center gap-2 min-w-0">
                    {" "}
                    <MapPin className="w-4 h-4 text-[#795BCB] shrink-0" />{" "}
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {" "}
                      Deliver to {pincode || "Set pincode"}{" "}
                      {pincode && (
                        <span className="font-normal text-slate-500">
                          {" "}
                          ({deliveryCity.split(",")[0]}){" "}
                        </span>
                      )}{" "}
                    </span>{" "}
                  </div>{" "}
                  <span className="text-xs text-[#795BCB] font-semibold shrink-0">
                    {" "}
                    Change{" "}
                  </span>{" "}
                </button>{" "}
                {/* Categories */}{" "}
                <div>
                  {" "}
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                    {" "}
                    Shop by Salon Categories{" "}
                  </span>{" "}
                  <div className="grid grid-cols-2 gap-2">
                    {" "}
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
                          onClick={closeMobileMenu}
                          className={` min-h-[42px] p-2.5 rounded-xl border text-[11px] font-bold transition flex items-center justify-between gap-2 ${active ? "bg-[#795BCB] text-white border-[#795BCB]" : "border-slate-200 bg-slate-50 text-slate-800 active:bg-[#795BCB]/10"} `}
                        >
                          {" "}
                          <span className="leading-tight">
                            {" "}
                            {cat.name}{" "}
                          </span>{" "}
                          {cat.badge && (
                            <span
                              className={` text-[8px] px-1 py-0.5 rounded shrink-0 ${active ? "bg-white text-[#795BCB]" : "bg-[#795BCB]/10 text-[#795BCB]"} `}
                            >
                              {" "}
                              {cat.badge}{" "}
                            </span>
                          )}{" "}
                        </Link>
                      );
                    })}{" "}
                  </div>{" "}
                </div>{" "}
                {/* Account / Wishlist */}{" "}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {" "}
                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    {" "}
                    <User className="w-4 h-4" /> My Account{" "}
                  </Link>{" "}
                  <Link
                    href="/wishlist"
                    onClick={closeMobileMenu}
                    className="py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    {" "}
                    <Heart className="w-4 h-4" /> Wishlist{" "}
                  </Link>{" "}
                </div>{" "}
                {/* B2B */}{" "}
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    openB2BModal();
                  }}
                  className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:bg-amber-400"
                >
                  {" "}
                  <Sparkles className="w-4 h-4" /> Request Salon Wholesale B2B
                  Quote{" "}
                </button>{" "}
                {/* Track Order */}{" "}
                <Link
                  href="/account/orders"
                  onClick={closeMobileMenu}
                  className="w-full py-3 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  {" "}
                  <Package className="w-4 h-4" /> Track Existing Order{" "}
                </Link>{" "}
                {/* Genuine Guarantee */}{" "}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  {" "}
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />{" "}
                  <span className="text-[10px] text-emerald-800 font-semibold">
                    {" "}
                    100% Genuine Salon Products · Trusted PureCuts
                    Inventory{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </header>{" "}
      {/* Location Modal */}{" "}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />{" "}
    </>
  );
}
