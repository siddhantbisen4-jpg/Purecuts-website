"use client";

import React, { useState } from "react";
import { Product, Review } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "./ProductCard";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Share2,
  MapPin,
  Sparkles,
  Building2,
  FileCheck,
  ArrowRight,
  Plus,
  Minus,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  initialReviews: Review[];
}

export function ProductDetailView({
  product,
  relatedProducts,
  initialReviews,
}: ProductDetailViewProps) {
  const router = useRouter();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openCart,
    pincode,
    setPincode,
    deliveryCity,
    openB2BModal,
    showToast,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [qty, setQty] = useState(1);
  const [appliedQty, setAppliedQty] = useState(1);

  const totalPrice = product.price * appliedQty;
  const totalOriginalPrice = product.originalPrice * appliedQty;
  const totalSavings = (product.originalPrice - product.price) * appliedQty;
  const [activeTab, setActiveTab] = useState<"desc" | "usage" | "specs" | "reviews">("desc");
  const [checkPin, setCheckPin] = useState(pincode);
  const [pinResult, setPinResult] = useState<string | null>(
    `Delivery to ${pincode} (${deliveryCity.split(",")[0]}): Guaranteed by Tomorrow, 5:00 PM`
  );

  // Review form state
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const inWish = isInWishlist(product.id);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? [product.image, ...product.galleryImages.filter((img) => img !== product.image)]
    : [product.image];

  const handleAddToCart = () => {
    setAppliedQty(qty);
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    router.push("/checkout");
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(checkPin)) {
      setPincode(checkPin);
      if (checkPin.startsWith("411") || checkPin.startsWith("412")) {
        setPinResult(`Wagholi Pune Express: Same-Day / 24-Hour Delivery Available! COD Eligible.`);
      } else {
        setPinResult(`Standard Express Delivery to ${checkPin}: Estimated 2-3 Days. COD Eligible.`);
      }
    } else {
      setPinResult("Please enter a valid 6-digit Indian Pincode");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          userName: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReviewsList([
          {
            id: Date.now(),
            productId: product.id,
            userName: reviewName,
            rating: reviewRating,
            comment: reviewComment,
            verifiedPurchase: true,
            createdAt: new Date(),
          },
          ...reviewsList,
        ]);
        setReviewSubmitted(true);
        showToast("Review submitted successfully!");
      }
    } catch {
      setReviewSubmitted(true);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = (platform: "whatsapp" | "facebook") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${product.name} on PureCuts: `);
    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    } else {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-amber-600 font-medium">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-sm">{product.name}</span>
      </nav>

      {/* Main Product Presentation Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Area (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-slate-50 rounded-2xl p-6 aspect-square flex items-center justify-center border border-slate-100 overflow-hidden">
              {product.discountPercent && product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-xs uppercase">
                  SALE -{product.discountPercent}%
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-xs transition shadow-xs ${inWish ? "bg-rose-50 text-rose-600 ring-1 ring-rose-300" : "bg-white/90 text-slate-400 hover:text-rose-600"
                  }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWish ? "fill-rose-600" : ""}`} />
              </button>

              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-[320px] w-auto object-contain transition duration-300 hover:scale-108"
              />
            </div>

            {/* Thumbnail list */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 shrink-0 overflow-hidden transition ${selectedImage === img ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Social Share Strip */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> Share:
              </span>
              <button
                onClick={() => handleShare("whatsapp")}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold hover:bg-blue-100 transition"
              >
                Facebook
              </button>
            </div>
          </div>

          {/* Product Info & Purchase Actions (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Brand & Stock Status */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/category/all?brand=${encodeURIComponent(product.brand)}`}
                className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md transition"
              >
                Brand: {product.brand}
              </Link>

            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Review Counter 
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                <span>{product.rating || "4.8"}</span>
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {product.reviewCount || 24} Verified Ratings & Reviews
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">
                SKU: PC-{product.id}089
              </span>
            </div>*/}

            {/* Price Block */}

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-950">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>

                {product.originalPrice > product.price && (
                  <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                    ₹{totalOriginalPrice.toLocaleString("en-IN")}
                  </span>
                )}

                {product.discountPercent > 0 &&
                  product.originalPrice > product.price && (
                    <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                      Save ₹{totalSavings.toLocaleString("en-IN")} ({product.discountPercent}% OFF)
                    </span>
                  )}
              </div>

              <p className="text-xs font-semibold text-slate-700">
                Quantity: {qty}
              </p>

              <p className="text-[11px] text-slate-500">
                Inclusive of all taxes. 100% genuine product. GST input credit invoice available.
              </p>
            </div>


            {/* Bulk Salon Volume Discount Table */}
            <div className="bg-[#795BCB]-50/70 border border-[#795BCB] rounded-2xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#795BCB]" /> Salon Bulk Volume Pricing
                </span>
                {/*<button
                  onClick={openB2BModal}
                  className="text-xs text-[#795BCB] font-semibold hover:underline"
                >
                  Need Wholesale Carton?
                </button>*/}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2 rounded-xl border border-[#795BCB]">
                  <span className="text-[11px] text-slate-500 block">Buy 1-2 Units</span>
                  <strong className="text-slate-900">₹{product.price} each</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#795BCB]">
                  <span className="text-[11px] text-amber-700 font-bold block">Buy 3+ Units</span>
                  <strong className="text-amber-900 font-extrabold">₹{Math.round(product.price * 0.95)} each (5% OFF)</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-[#795BCB]">
                  <span className="text-[11px] text-emerald-700 font-bold block">Buy 10+ Units</span>
                  <strong className="text-emerald-900 font-extrabold">₹{Math.round(product.price * 0.88)} each (12% OFF)</strong>
                </div>
              </div>
            </div>

            {/* Short Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Product Key Features:
                </span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center border-2 border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3.5 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-extrabold text-slate-900 min-w-[36px] text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-3.5 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition"
                  >
                    +
                  </button>
                </div>
                {product.volumeSize && (
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                    Net Size: {product.volumeSize}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3.5 px-6 bg-[#795BCB] hover:bg-[#795BCB] text-white font-black text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                {/*<button
                  type="button"
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 bg-black hover:bg-black text-white font-black text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-slate-950/20"
                >
                  <Zap className="w-4 h-4 text-amber-400" /> Buy Now (Instant Checkout)
                </button>*/}
              </div>
            </div>

            {/* Delivery Pincode Checker 
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Check Delivery & COD Availability
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    maxLength={6}
                    value={checkPin}
                    onChange={(e) => setCheckPin(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-black transition"
                >
                  Check
                </button>
              </form>
              {pinResult && (
                <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl font-medium flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  {pinResult}
                </p>
              )}
            </div>*/}

            {/* Guarantees Badges 
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pune Hub Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>GST Tax Invoice</span>
              </div>
            </div>*/}
          </div>
        </div>
      </div>

      {/* Detailed Content Tabs (Description, Usage, Specs, Reviews) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("desc")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition whitespace-nowrap ${activeTab === "desc" ? "bg-[#795BCB] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab("usage")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition whitespace-nowrap ${activeTab === "usage" ? "bg-[#795BCB] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
          >
            How to Use / Salon Protocol
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition whitespace-nowrap ${activeTab === "specs" ? "bg-[#795BCB] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${activeTab === "reviews" ? "bg-[#795BCB] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <span>Customer Reviews</span>
            <span className="bg-slate-200 text-slate-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
              {reviewsList.length}
            </span>
          </button>
        </div>

        <div className="pt-6">
          {activeTab === "desc" && (
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-4">
              <p className="text-sm font-medium">{product.description}</p>
              {product.shortDescription && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-800">Salon Summary: </strong>
                  {product.shortDescription}
                </div>
              )}
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-4 text-slate-700 text-xs sm:text-sm">
              <h3 className="font-bold text-slate-900 text-sm">Professional Application Instructions:</h3>
              <p className="leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-200 text-amber-950 font-medium">
                {product.usageInstructions || "Apply evenly on clean hair/skin as per professional salon guidelines. For external professional use only."}
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Technical Specifications:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between text-xs">
                    <span className="font-semibold text-slate-500">{key}:</span>
                    <span className="font-bold text-slate-900 text-right">{val}</span>
                  </div>
                ))}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between text-xs">
                  <span className="font-semibold text-slate-500">Brand:</span>
                  <span className="font-bold text-slate-900">{product.brand}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between text-xs">
                  <span className="font-semibold text-slate-500">Category:</span>
                  <span className="font-bold text-slate-900">{product.category}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Review summary row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-center md:border-r border-slate-200">
                  <span className="text-4xl font-black text-slate-900">{product.rating || "4.8"}</span>
                  <div className="flex justify-center text-amber-500 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Based on {reviewsList.length} reviews</span>
                </div>

                <div className="md:col-span-2 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 font-medium">5 Star</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[85%]" />
                    </div>
                    <span className="w-8 text-right font-bold text-slate-700">85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 font-medium">4 Star</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[12%]" />
                    </div>
                    <span className="w-8 text-right font-bold text-slate-700">12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 font-medium">3 Star</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[3%]" />
                    </div>
                    <span className="w-8 text-right font-bold text-slate-700">3%</span>
                  </div>
                </div>
              </div>

              {/* Review list */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl border border-slate-100 bg-white shadow-xs space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                          {rev.userName[0]}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{rev.userName}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Salon Buyer
                          </span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    {rev.title && <h4 className="font-bold text-slate-800">{rev.title}</h4>}
                    <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Submit Review Form */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60">
                <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#795BCB]" />
                  Write a Verified Product Review
                </h3>
                <p className="text-xs text-slate-500 mb-4">Share your salon or personal experience with this product.</p>

                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
                    Thank you! Your verified review has been published.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Salon Stylist / Client Name"
                          className="w-full px-3.5 py-2 rounded-xl border border-[#795BCB] text-xs focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Rating *</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800"
                        >
                          <option value={5}>5 Stars - Outstanding Salon Quality</option>
                          <option value={4}>4 Stars - Very Good Product</option>
                          <option value={3}>3 Stars - Average</option>
                          <option value={2}>2 Stars - Below Expectation</option>
                          <option value={1}>1 Star - Poor</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review *</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Tell us about the scent, consistency, salon performance, and results..."
                        className="w-full px-3.5 py-2 rounded-xl border border-[#795BCB] text-xs focus:ring-2 focus:ring-[#795BCB]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <div>

              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                Related Products
              </h2>
            </div>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              View More in {product.category} →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
