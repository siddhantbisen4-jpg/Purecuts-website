"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, Check, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    totalAmount,
    freeShippingThreshold,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const router = useRouter();

  if (!isCartOpen) return null;

  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;
    setIsApplying(true);
    setCouponError("");
    const res = await applyCoupon(code.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
    setIsApplying(false);
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#795BCB]" />
              <h2 className="text-base font-bold">Your Salon Bag</h2>
              <span className="bg-amber-400/20 text-amber-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping meter */}
          <div className="bg-amber-50/80 px-4 py-3 border-b border-amber-100">
            <div className="flex items-center justify-between text-xs font-medium text-amber-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#795BCB]" />
                {freeShippingLeft === 0 ? (
                  <strong className="text-[#795BCB]">🎉 FREE Delivery unlocked!</strong>
                ) : (
                  <span>Add <strong>₹{freeShippingLeft}</strong> more for <strong>FREE Delivery</strong></span>
                )}
              </span>
              <span className="font-bold">{freeShippingPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-[#7950F2] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Your salon bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Explore professional hair care, facial kits, clippers, salon equipment, and disposables.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition shadow-xs"
                >
                  <div className="w-18 h-18 bg-slate-50 rounded-xl p-2 shrink-0 flex items-center justify-center border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#795BCB] px-1.5 py-0.5 rounded">
                      {item.brand}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 mt-0.5 leading-snug">
                      {item.name}
                    </h4>
                    {item.volumeSize && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Size: {item.volumeSize}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 transition"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-slate-400 hover:text-rose-500 transition self-start p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 space-y-3.5">
              {/* Coupon Code Section 
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-xs font-bold text-emerald-900">{appliedCoupon.code}</span>
                        <p className="text-[11px] text-emerald-700">Applied! You save ₹{couponDiscount}</p>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value);
                            setCouponError("");
                          }}
                          placeholder="Coupon Code"
                          className="w-full pl-8 pr-3 py-2 text-xs border border-[#795BCB] rounded-xl uppercase font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <button
                        onClick={() => handleApplyCoupon()}
                        disabled={isApplying || !couponInput.trim()}
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black transition disabled:opacity-50"
                      >
                        {isApplying ? "..." : "Apply"}
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <button
                        onClick={() => handleApplyCoupon("PURECUTS10")}
                        className="text-[10px] bg-[#795BCB] hover:bg-[#795BCB] text-white font-semibold px-2 py-0.5 rounded-md border border-[#795BCB]"
                      >
                        PURECUTS10 (10% OFF)
                      </button>
                      <button
                        onClick={() => handleApplyCoupon("FIRST50")}
                        className="text-[10px] bg-[#795BCB] hover:bg-[#795BCB] text-white font-semibold px-2 py-0.5 rounded-md border border-[#795BCB]"
                      >
                        FIRST50 (Flat ₹50)
                      </button>
                    </div>
                  </div>
                )}
              </div>*/}

              {/* Price Breakdown */}


              <div className="flex justify-between">
                <span>Quantity</span>
                <span className="font-semibold text-slate-900">
                  {itemCount}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span className="text-base text-[#795BCB]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Action Buttons */}

              {/* Action Buttons */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#795BCB] hover:bg-[#6246B0] text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                {/* Continue Shopping */}
                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full py-3 bg-white border border-[#795BCB] text-[#795BCB] hover:bg-[#795BCB]/5 font-bold rounded-xl transition text-sm"
                >
                  Continue Shopping
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Genuine
                  </span>
                  <span>•</span>
                  <span>Cash on Delivery Available</span>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
