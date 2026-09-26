"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS_DATA } from "@/db/seed-data";
import { ProductCard } from "@/components/ProductCard";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useStore();

  const savedProducts = PRODUCTS_DATA.filter((_, idx) => wishlist.includes(idx + 1)).map((p, i) => ({
    id: i + 1,
    ...p,
    createdAt: new Date(),
  }));

  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Saved Wishlist ({wishlistCount})</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900">My Saved Wishlist</h1>
                <p className="text-xs text-slate-500">Items you marked to buy for your salon</p>
              </div>
            </div>
          </div>

          {savedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Your wishlist is empty</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Tap the heart icon on any hair masque, straightener, facial kit, or clipper to save it for later.
              </p>
              <Link
                href="/category/all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#795BCB] hover:bg-[#795BCB] text-white text-xs font-bold rounded-xl transition"
              >
                <span className="text-white">Browse Salon Products</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {savedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
