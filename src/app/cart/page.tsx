"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles,
  Check,
  ChevronRight,
  Scissors,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    itemCount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    totalAmount,
    freeShippingThreshold,
    pincode,
    deliveryCity,
  } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApply = async (codeToApply?: string) => {
    const code = codeToApply || couponCode;
    if (!code.trim()) return;
    setIsApplying(true);
    setCouponError("");
    const res = await applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode("");
    }
    setIsApplying(false);
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-[70vh] bg-slate-100/60 py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Your Salon Bag is Empty</h1>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Discover professional hair care, facial kits, clippers, salon equipment, and disposables at wholesale rates.
          </p>
          <Link
            href="/category/all"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md shadow-amber-500/20"
          >
            <span>Explore Salon Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Salon Shopping Bag ({itemCount} items)</span>
        </nav>

        {/* Free Shipping Notification Bar */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              {freeShippingLeft === 0 ? (
                <span className="text-xs font-bold text-emerald-800 block">
                  🎉 FREE Express Delivery unlocked for your order!
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-900 block">
                  Add ₹{freeShippingLeft} more to get <strong>FREE Express Delivery</strong> (Threshold: ₹499)
                </span>
              )}
              <span className="text-[11px] text-slate-500">
                Delivering to {pincode} ({deliveryCity.split(",")[0]})
              </span>
            </div>
          </div>
          <div className="w-full sm:w-48 h-2 bg-amber-200/80 rounded-full overflow-hidden shrink-0">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items List (8 cols) + Price Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">Products in Cart ({itemCount})</h2>
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y divide-slate-100 space-y-4">
              {cart.map((item) => (
                <div key={item.productId} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {item.brand}
                    </span>
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 transition block mt-0.5 line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    {item.volumeSize && (
                      <span className="text-xs text-slate-500 block">Pack: {item.volumeSize}</span>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 text-xs text-slate-700 hover:bg-slate-200 transition font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-extrabold text-slate-900 min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 text-xs text-slate-700 hover:bg-slate-200 transition font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary & Checkout Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Coupon Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Tag className="w-4 h-4 text-amber-600" />
                <span>Apply Promo Code</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block">{appliedCoupon.code}</span>
                    <span className="text-emerald-700">You saved ₹{couponDiscount}!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                      placeholder="ENTER COUPON CODE"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs uppercase font-bold focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={() => handleApply()}
                      disabled={isApplying || !couponCode.trim()}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
                    >
                      {isApplying ? "..." : "Apply"}
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-rose-500">{couponError}</p>}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      onClick={() => handleApply("PURECUTS10")}
                      className="text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200"
                    >
                      PURECUTS10 (10% OFF)
                    </button>
                    <button
                      onClick={() => handleApply("SALONPRO20")}
                      className="text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200"
                    >
                      SALONPRO20 (20% OFF {">"} ₹2.5k)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 pt-3 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-amber-600 text-xl font-black">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Check Out</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine
                </span>
                <span>•</span>
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
