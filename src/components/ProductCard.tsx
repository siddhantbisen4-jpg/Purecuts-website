"use client";
import { getProductPrice } from "@/lib/pricing";
import React from "react";
import { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import {
  Star,
  Heart,
  Eye,
  ShoppingBag,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    customerRegion,
  } = useStore();
  const displayPrice = getProductPrice(product.price, customerRegion);

  const inWish = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.productId === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  return (
    <div
      id={`product-${product.slug}`}
      data-product-slug={product.slug}
      className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-[#795BCB] hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden scroll-mt-24"
    >
      {/* Top Image Container */}
      <div className="relative bg-slate-50/70 p-2.5 sm:p-4 flex items-center justify-center aspect-square overflow-hidden border-b border-slate-100">
        {/* Sale / Discount Badge */}
        {product.discountPercent && product.discountPercent > 0 ? (
          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 bg-rose-600 text-white text-[10px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-xs uppercase tracking-wide">
            SALE -{product.discountPercent}%
          </span>
        ) : product.isBestseller ? (
          <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-xs uppercase tracking-wide">
            Bestseller
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-xs transition shadow-xs ${
            inWish
              ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
              : "bg-white/90 text-slate-400 hover:text-rose-600 hover:bg-white"
          }`}
          aria-label={inWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWish ? "fill-rose-500 text-rose-500" : ""}`}
          />
        </button>

        {/* Product Image */}
        <Link
          href={`/product/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[125px] sm:max-h-[190px] lg:max-h-[210px] w-auto max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openQuickView(product);
          }}
          className="hidden sm:flex absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900/90 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full items-center gap-1.5 shadow-md backdrop-blur-xs whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      {/* Content Area */}
      <div className="p-2 sm:p-4 flex flex-col flex-1">
        {/* Brand & Rating Row */}
        <div className="flex items-center justify-between gap-1 mb-1 text-xs min-w-0">
          {/*<span className="font-bold text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-800 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded truncate max-w-[75px] sm:max-w-[120px] lg:max-w-none">
            {product.brand}
          </span>*/}
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-700 bg-slate-100 px-1 sm:px-1.5 py-0.5 rounded shrink-0">
            {/*<span>{product.rating || "4.8"}</span>
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-slate-400 text-[9px] sm:text-[10px]">
              ({product.reviewCount || 18})
            </span>*/}
          </div>
        </div>

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="text-[11px] sm:text-sm font-semibold text-slate-800 hover:text-[#7950F2] transition line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] mt-1 mb-2 leading-snug flex-1"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Price & Action Row */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-end justify-between gap-1.5 sm:gap-2 min-w-0">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
              <span className="text-[13px] sm:text-lg lg:text-xl font-extrabold text-slate-950">
                ₹{displayPrice.toLocaleString("en-IN")}
              </span>

              {product.originalPrice > displayPrice && (
                <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          {/* Cart Stepper or Add Button */}
          {inCartQty > 0 ? (
            <div className="flex items-center border border-[#795BCB] bg-[#795BCB] rounded-xl overflow-hidden shadow-xs shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, inCartQty - 1)}
                className="px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs text-white hover:bg-[#795BCB] transition font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <span className="px-1.5 sm:px-2 text-xs font-extrabold text-white min-w-[18px] sm:min-w-[20px] text-center">
                {inCartQty}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, inCartQty + 1)}
                className="px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs text-white hover:bg-[#795BCB] transition font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="px-2 sm:px-3 py-1.5 bg-slate-900 hover:bg-[#795BCB] hover:text-white text-white text-[11px] sm:text-xs font-bold rounded-xl transition duration-200 flex items-center gap-1 sm:gap-1.5 shadow-xs shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
