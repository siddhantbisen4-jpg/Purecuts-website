"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProductPrice } from "@/lib/pricing";
import { ProductVariant } from "@/lib/types";

export function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    isInWishlist,
    toggleWishlist,
    openCart,
    customerRegion,
  } = useStore();
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const router = useRouter();

  // Sync selected variant when quickViewProduct changes
  React.useEffect(() => {
    if (quickViewProduct?.variants && quickViewProduct.variants.length > 0) {
      setSelectedVariant(quickViewProduct.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentPrice = selectedVariant?.price ?? quickViewProduct.price;
  const currentOriginalPrice = selectedVariant?.originalPrice ?? quickViewProduct.originalPrice;
  const displayPrice = getProductPrice(currentPrice, customerRegion);
  const currentImage = selectedVariant?.image || quickViewProduct.image;
  const inWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(
      { ...quickViewProduct, price: displayPrice },
      qty,
      selectedVariant ? selectedVariant.name : undefined,
      selectedVariant
    );
  };

  const handleBuyNow = () => {
    addToCart(
      { ...quickViewProduct, price: displayPrice },
      qty,
      selectedVariant ? selectedVariant.name : undefined,
      selectedVariant
    );
    closeQuickView();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image Container */}
          <div className="relative bg-slate-50 rounded-2xl p-6 flex items-center justify-center border border-slate-100 overflow-hidden aspect-square">
            {quickViewProduct.discountPercent &&
              quickViewProduct.discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs">
                  SALE -{quickViewProduct.discountPercent}%
                </span>
              )}
            <img
              src={currentImage}
              alt={quickViewProduct.name}
              className="max-h-[260px] w-auto object-contain transition duration-300 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#7950F2] px-2.5 py-0.5 rounded-md">
                {quickViewProduct.brand}
              </span>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-2 rounded-full border transition ${
                  inWish
                    ? "text-rose-500 border-rose-200 bg-rose-50"
                    : "text-slate-400 border-slate-200 hover:text-rose-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${inWish ? "fill-rose-500" : ""}`} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug mt-1 mb-2">
              {quickViewProduct.name}
            </h3>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-2xl font-extrabold text-slate-900">
                ₹{displayPrice.toLocaleString("en-IN")}
              </span>

              {currentOriginalPrice && currentOriginalPrice > displayPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{currentOriginalPrice.toLocaleString("en-IN")}
                </span>
              )}

              {currentOriginalPrice && currentOriginalPrice > displayPrice && (
                <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md">
                  Save ₹
                  {(
                    currentOriginalPrice - displayPrice
                  ).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Highlights */}
            {quickViewProduct.highlights &&
              quickViewProduct.highlights.length > 0 && (
                <ul className="text-xs text-slate-600 space-y-1 mb-3">
                  {quickViewProduct.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

            {/* Variant Chips */}
            {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
              <div className="mb-4 space-y-1.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  {selectedVariant?.attribute
                    ? `${selectedVariant.attribute.replace(/^choose_/, "").replace(/_/g, " ")}: `
                    : "Option: "}
                  <span className="text-[#7950F2] font-semibold">{selectedVariant?.name}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? "border-[#7950F2] bg-purple-50 text-[#7950F2] font-bold ring-1 ring-[#7950F2]"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {v.colorCode && (
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 border border-slate-300 align-middle"
                          style={{ backgroundColor: v.colorCode }}
                        />
                      )}
                      {v.name} - ₹{v.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Actions */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">
                  Quantity:
                </span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-slate-800 min-w-[32px] text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
                {quickViewProduct.volumeSize && (
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    Pack: {quickViewProduct.volumeSize}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-2.5 bg-[#7950F2] hover:bg-[#7950F2] text-white font-bold rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-white" /> Add to Cart
                </button>
                {/*<button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Zap className="w-4 h-4 text-amber-400" /> Buy Now
                </button>*/}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  href={`/product/${quickViewProduct.slug}`}
                  onClick={closeQuickView}
                  className="text-[#7950F2] hover:text-[#7950F2] font-semibold flex items-center gap-1 group"
                >
                  View Full Product Details & Specs
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
