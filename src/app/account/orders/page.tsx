"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Copy,
  Check,
  Search,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  FileText,
  Printer,
  X,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Building2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from "lucide-react";

export type OrderItem = {
  productId: number;
  name: string;
  brand?: string;
  price: number;
  quantity: number;
  image?: string;
  volumeSize?: string;
};

export type Order = {
  id: number;
  orderNumber: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  salonName?: string | null;
  gstNumber?: string | null;
  udyamNumber?: string | null;
  customerType?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  pincode?: string;
  subtotal?: number;
  discount?: number;
  couponCode?: string | null;
  deliveryFee?: number;
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus?: string;
  orderStatus: string;
  items: OrderItem[];
  trackingId?: string | null;
  createdAt: string | null;
};

// Fallback image in case product image fails to load
const FALLBACK_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80";

// Helper to format exact date and time (12-hour format with AM/PM & seconds)
function formatOrderExactTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "Date unavailable";
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(d);
  } catch {
    return "Date unavailable";
  }
}

// Helper to format relative time ago ("28 mins ago", "Just now", "Yesterday")
function formatTimeAgo(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    const diff = Math.max(0, Date.now() - new Date(dateStr).getTime());
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  } catch {
    return "";
  }
}

// Helper to format expected delivery estimate
function formatEstimatedDelivery(dateStr: string | null | undefined, status: string): string {
  if (status.toUpperCase() === "DELIVERED") return "Delivered to Doorstep";
  if (!dateStr) return "Expected within 24-48 Hours";
  try {
    const orderDate = new Date(dateStr);
    const estDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000);
    return `Expected by ${new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(estDate)} (Wagholi Express Hub)`;
  } catch {
    return "Expected within 24-48 Hours";
  }
}

export default function OrdersHistoryPage() {
  const { addToCart, showToast, openCart } = useStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "DELIVERED">("ALL");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Active phone filter
  const [phoneFilter, setPhoneFilter] = useState<string>("");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [customPhoneInput, setCustomPhoneInput] = useState("");

  // Modals
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Fetch orders from API
  const fetchOrders = async (phoneToQuery?: string) => {
    setLoading(true);
    setError("");
    try {
      let url = "/api/orders";
      if (phoneToQuery && phoneToQuery.trim()) {
        url = `/api/orders?customerPhone=${encodeURIComponent(phoneToQuery.trim())}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load orders.");
      }

      setOrders(data.orders ?? []);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError("Unable to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if phone exists in localStorage
    const savedPhone = localStorage.getItem("purecuts_customer_phone")?.trim() || "";
    setPhoneFilter(savedPhone);
    setCustomPhoneInput(savedPhone);

    // Initial fetch: If savedPhone exists, query with it; otherwise query general recent orders
    fetchOrders(savedPhone);
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${key.includes("track") ? "Tracking ID" : "Order #"} to clipboard!`);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleApplyPhoneFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = customPhoneInput.trim();
    setPhoneFilter(cleanPhone);
    if (cleanPhone) {
      localStorage.setItem("purecuts_customer_phone", cleanPhone);
    } else {
      localStorage.removeItem("purecuts_customer_phone");
    }
    setIsEditingPhone(false);
    fetchOrders(cleanPhone);
  };

  const handleClearPhoneFilter = () => {
    setPhoneFilter("");
    setCustomPhoneInput("");
    localStorage.removeItem("purecuts_customer_phone");
    setIsEditingPhone(false);
    fetchOrders("");
  };

  // Reorder single item
  const handleReorderItem = (item: OrderItem) => {
    addToCart(
      {
        id: item.productId,
        name: item.name,
        brand: item.brand || "PureCuts",
        category: "Haircare",
        categorySlug: "haircare",
        price: item.price,
        originalPrice: Math.round(item.price * 1.25),
        discountPercent: 20,
        rating: 4.8,
        reviewCount: 30,
        stock: 50,
        inStock: true,
        image: item.image || FALLBACK_PRODUCT_IMAGE,
        volumeSize: item.volumeSize,
      },
      item.quantity,
      item.volumeSize
    );
    showToast(`Added ${item.name} to cart!`);
    openCart();
  };

  // Reorder all items in an order
  const handleReorderAll = (order: Order) => {
    if (!order.items || order.items.length === 0) return;
    order.items.forEach((item) => {
      addToCart(
        {
          id: item.productId,
          name: item.name,
          brand: item.brand || "PureCuts",
          category: "Haircare",
          categorySlug: "haircare",
          price: item.price,
          originalPrice: Math.round(item.price * 1.25),
          discountPercent: 20,
          rating: 4.8,
          reviewCount: 30,
          stock: 50,
          inStock: true,
          image: item.image || FALLBACK_PRODUCT_IMAGE,
          volumeSize: item.volumeSize,
        },
        item.quantity,
        item.volumeSize
      );
    });
    showToast(`Added all items from Order #${order.orderNumber} to cart!`);
    openCart();
  };

  // Filter orders based on status & search
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      const isDelivered = order.orderStatus?.toUpperCase() === "DELIVERED";
      if (statusFilter === "ACTIVE" && isDelivered) return false;
      if (statusFilter === "DELIVERED" && !isDelivered) return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchesOrderNo = order.orderNumber?.toLowerCase().includes(q);
      const matchesTracking = order.trackingId?.toLowerCase().includes(q);
      const matchesPhone = order.customerPhone?.toLowerCase().includes(q);
      const matchesName = order.customerName?.toLowerCase().includes(q);
      const matchesSalon = order.salonName?.toLowerCase().includes(q);
      const matchesItems = order.items?.some(
        (i) =>
          i.name?.toLowerCase().includes(q) ||
          i.brand?.toLowerCase().includes(q)
      );

      return (
        matchesOrderNo ||
        matchesTracking ||
        matchesPhone ||
        matchesName ||
        matchesSalon ||
        matchesItems
      );
    });
  }, [orders, statusFilter, searchQuery]);

  // Counts
  const activeCount = orders.filter(
    (o) => o.orderStatus?.toUpperCase() !== "DELIVERED"
  ).length;
  const deliveredCount = orders.filter(
    (o) => o.orderStatus?.toUpperCase() === "DELIVERED"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-purple-700 font-semibold transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/account" className="hover:text-purple-700 font-semibold transition">
            Salon Account
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">My Orders &amp; Live Tracking</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#1f1738] to-[#120e24] text-white rounded-3xl p-6 sm:p-8 border border-purple-900/30 shadow-xl">
          {/* Subtle Decorative Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#795BCB]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Wagholi Domkhel Central Fulfillment Live</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                <Package className="w-7 h-7 text-[#9A37D8]" />
                My Orders &amp; Live Shipment Tracking
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Inspect ordered salon products, verify exact booking timestamps, track dispatch
                milestones, and download official GST tax invoices for doorstep deliveries in Pune &amp; pan-India.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fetchOrders(phoneFilter)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 border border-white/10 backdrop-blur-xs"
                title="Refresh latest order status"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>

              <Link
                href="/category/all"
                className="px-5 py-2.5 bg-gradient-to-r from-[#795BCB] to-[#9A37D8] hover:opacity-95 text-white text-xs font-black rounded-xl transition shadow-lg shadow-purple-900/30 flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Shop More Supplies
              </Link>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span><strong>100% Genuine</strong> Sealed Inventory</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Pune Express Hub</strong> 24h Handover</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>GST B2B Invoices</strong> Auto-Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span><strong>Direct Support</strong> +91 9579177826</span>
            </div>
          </div>
        </div>

        {/* Controls Toolbar: Search & Filter Tabs */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by Order #, AWB Tracking ID, product title, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 placeholder:text-slate-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setStatusFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === "ALL"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Orders ({orders.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("ACTIVE")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === "ACTIVE"
                    ? "bg-[#795BCB] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                In Transit &amp; Packing ({activeCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("DELIVERED")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === "DELIVERED"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Delivered ({deliveredCount})
              </button>
            </div>
          </div>

          {/* Phone Account Filter & Quick Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-medium">Customer Account Phone:</span>

              {!isEditingPhone ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                    {phoneFilter ? `+91 ${phoneFilter}` : "Viewing All Recent Orders"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingPhone(true)}
                    className="text-[#795BCB] hover:text-[#9A37D8] font-bold hover:underline"
                  >
                    {phoneFilter ? "Change Phone" : "Filter by My Phone"}
                  </button>
                  {phoneFilter && (
                    <button
                      type="button"
                      onClick={handleClearPhoneFilter}
                      className="text-slate-400 hover:text-red-600 text-[11px]"
                    >
                      (Clear / Show All)
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleApplyPhoneFilter} className="flex items-center gap-2">
                  <input
                    type="tel"
                    placeholder="Enter 10-digit phone"
                    value={customPhoneInput}
                    onChange={(e) => setCustomPhoneInput(e.target.value)}
                    className="px-2.5 py-1 text-xs border border-purple-400 rounded-md focus:outline-hidden focus:ring-1 focus:ring-purple-600 bg-white"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1 bg-[#795BCB] text-white font-bold rounded-md text-[11px] hover:bg-[#9A37D8]"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingPhone(false);
                      setCustomPhoneInput(phoneFilter);
                    }}
                    className="text-slate-400 hover:text-slate-600 text-[11px]"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>

            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span>Showing {filteredOrders.length} order{filteredOrders.length === 1 ? "" : "s"}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Hub Sync
              </span>
            </div>
          </div>
        </div>

        {/* Orders Listing Section */}
        <div className="space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
              <RefreshCw className="w-8 h-8 text-[#795BCB] animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                Syncing your orders with Wagholi Fulfillment Hub...
              </p>
              <p className="text-xs text-slate-400">
                Fetching real-time shipment updates, product media, and dispatch records
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-bold text-red-800">{error}</p>
              <button
                type="button"
                onClick={() => fetchOrders(phoneFilter)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty Orders State */}
          {!loading && !error && filteredOrders.length === 0 && (
            <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-slate-200 shadow-xs space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-purple-50 text-[#795BCB] flex items-center justify-center mx-auto shadow-inner">
                <Package className="w-10 h-10" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-black text-slate-900">
                  {searchQuery ? "No matching orders found" : "No orders found for this account"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {searchQuery
                    ? `No orders matched your search "${searchQuery}". Please check the order number or search by phone.`
                    : phoneFilter
                    ? `No orders linked to +91 ${phoneFilter}. If you ordered with another number, enter it above.`
                    : "You haven't placed any salon supply orders yet. Orders placed during checkout will appear here in real time."}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Clear Search
                  </button>
                )}
                {phoneFilter && (
                  <button
                    type="button"
                    onClick={handleClearPhoneFilter}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    View All Recent Orders
                  </button>
                )}
                <Link
                  href="/category/all"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#795BCB] to-[#9A37D8] text-white font-bold text-xs rounded-xl transition shadow-md hover:opacity-95 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Start Shopping
                </Link>
              </div>
            </div>
          )}

          {/* Orders Cards List */}
          {!loading &&
            !error &&
            filteredOrders.map((order) => {
              const isDelivered = order.orderStatus?.toUpperCase() === "DELIVERED";
              const isConfirmed = order.orderStatus?.toUpperCase() === "CONFIRMED";
              const timeAgo = formatTimeAgo(order.createdAt);
              const exactOrderTime = formatOrderExactTime(order.createdAt);
              const estimatedArrival = formatEstimatedDelivery(order.createdAt, order.orderStatus);

              return (
                <div
                  key={order.orderNumber}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  {/* Order Card Header */}
                  <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50/90 via-purple-50/30 to-slate-50/50 border-b border-slate-100">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Order ID & Real Timing */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                            Order #{order.orderNumber}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleCopy(order.orderNumber, `order-${order.orderNumber}`)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-purple-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs transition"
                            title="Copy Order Number"
                          >
                            {copiedKey === `order-${order.orderNumber}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Relative time pill */}
                          {timeAgo && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100/80 text-[#795BCB] border border-purple-200">
                              <Clock className="w-3 h-3" />
                              {timeAgo}
                            </span>
                          )}
                        </div>

                        {/* Exact Real Timing when order was placed */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                          <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>Ordered on: <strong className="text-slate-900 font-extrabold">{exactOrderTime}</strong></span>
                          </span>

                          {order.trackingId && (
                            <span className="flex items-center gap-1.5 text-slate-500">
                              <Truck className="w-3.5 h-3.5 text-slate-400" />
                              <span>AWB Tracking:</span>
                              <strong className="text-slate-800 font-bold">{order.trackingId}</strong>
                              <button
                                type="button"
                                onClick={() => handleCopy(order.trackingId!, `track-${order.orderNumber}`)}
                                className="text-purple-600 hover:text-purple-800 ml-0.5"
                                title="Copy Tracking ID"
                              >
                                {copiedKey === `track-${order.orderNumber}` ? (
                                  <Check className="w-3 h-3 text-emerald-600 inline" />
                                ) : (
                                  <Copy className="w-3 h-3 inline" />
                                )}
                              </button>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Status Pill & Total */}
                      <div className="flex flex-wrap items-center gap-3 lg:text-right">
                        <div>
                          <span className="text-[11px] text-slate-400 block">Total Amount</span>
                          <span className="text-lg sm:text-xl font-black text-slate-900">
                            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                          </span>
                        </div>

                        <span
                          className={`text-xs font-black px-3.5 py-1.5 rounded-full border shadow-2xs flex items-center gap-1.5 ${
                            isDelivered
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-purple-50 text-purple-900 border-purple-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isDelivered ? "bg-emerald-500" : "bg-purple-600 animate-pulse"
                            }`}
                          />
                          {order.orderStatus ? order.orderStatus.replace(/_/g, " ") : "PROCESSING"}
                        </span>
                      </div>
                    </div>

                    {/* Interactive 4-Stage Fulfillment Tracker Stepper */}
                    <div className="mt-5 pt-4 border-t border-slate-200/60">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5 text-purple-900">
                          <Truck className="w-4 h-4 text-purple-600" />
                          <span>Dispatch Pipeline &amp; Delivery Progress</span>
                        </span>
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-semibold text-[11px]">
                          {estimatedArrival}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 relative">
                        {/* Pipeline Stage 1: Order Confirmed */}
                        <div className="flex flex-col items-center text-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-1.5 shadow-xs text-xs">
                            ✓
                          </div>
                          <span className="font-bold text-slate-800 text-[11px]">Confirmed</span>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            Inventory Reserved
                          </span>
                        </div>

                        {/* Pipeline Stage 2: Hub Packed */}
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1.5 shadow-xs text-xs ${
                              isConfirmed
                                ? "bg-[#795BCB] text-white ring-4 ring-purple-100"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            {isConfirmed ? "2" : "✓"}
                          </div>
                          <span className="font-bold text-slate-800 text-[11px]">Packed</span>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            Wagholi Hub QC
                          </span>
                        </div>

                        {/* Pipeline Stage 3: In Transit */}
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1.5 shadow-xs text-xs ${
                              order.orderStatus?.toUpperCase() === "IN_TRANSIT"
                                ? "bg-[#795BCB] text-white ring-4 ring-purple-100"
                                : isDelivered
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {isDelivered ? "✓" : "3"}
                          </div>
                          <span className="font-bold text-slate-800 text-[11px]">In Transit</span>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            Express Logistics
                          </span>
                        </div>

                        {/* Pipeline Stage 4: Delivered */}
                        <div className="flex flex-col items-center text-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1.5 shadow-xs text-xs ${
                              isDelivered
                                ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {isDelivered ? "✓" : "4"}
                          </div>
                          <span className="font-bold text-slate-800 text-[11px]">Delivered</span>
                          <span className="text-[10px] text-slate-400 hidden sm:block">
                            Salon Handover
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ordered Items List (With Prominent Product Images) */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Ordered Items ({order.items?.length || 0})
                      </span>
                      <span className="text-[11px] text-slate-500">
                        100% Genuine Salon Quality Verified
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {order.items?.map((item, idx) => {
                        const itemSubtotal = item.price * item.quantity;
                        const itemImage = item.image || FALLBACK_PRODUCT_IMAGE;

                        return (
                          <div
                            key={`${order.orderNumber}-item-${item.productId}-${idx}`}
                            className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                          >
                            {/* Product Image & Details */}
                            <div className="flex items-center gap-4">
                              {/* Product Thumbnail */}
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200/80 p-1.5 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs group-hover:border-purple-300 transition">
                                <img
                                  src={itemImage}
                                  alt={item.name}
                                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
                                  onError={(e) => {
                                    // Fallback to placeholder if original URL fails
                                    (e.target as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                                  }}
                                  loading="lazy"
                                />
                              </div>

                              {/* Title, Brand, Variant */}
                              <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-purple-700 transition">
                                  {item.name}
                                </span>

                                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                  {item.brand && (
                                    <span className="font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-[#795BCB] border border-purple-100">
                                      {item.brand}
                                    </span>
                                  )}
                                  {item.volumeSize && (
                                    <span className="font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                      {item.volumeSize}
                                    </span>
                                  )}
                                  <span className="text-slate-400">
                                    Qty: <strong className="text-slate-800 font-bold">{item.quantity}</strong>
                                  </span>
                                  <span className="text-slate-400">× ₹{item.price.toLocaleString("en-IN")}</span>
                                </div>
                              </div>
                            </div>

                            {/* Item Pricing & Buy Again */}
                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 sm:text-right">
                              <div>
                                <span className="text-[10px] text-slate-400 block sm:hidden">Item Subtotal</span>
                                <span className="text-sm sm:text-base font-black text-slate-900 whitespace-nowrap">
                                  ₹{itemSubtotal.toLocaleString("en-IN")}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleReorderItem(item)}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-[#795BCB] hover:text-white text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs"
                                title="Buy again / add to cart"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Buy Again</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Footer & Shipping Destination Preview */}
                  <div className="p-5 sm:p-6 bg-slate-50/80 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-5 text-xs">
                    {/* Destination & Payment Details */}
                    <div className="space-y-1.5 text-slate-600 max-w-xl">
                      <div className="flex items-center gap-2 font-bold text-slate-900">
                        <MapPin className="w-4 h-4 text-purple-700 shrink-0" />
                        <span>
                          Delivery To: {order.customerName || "Salon Customer"}
                          {order.salonName && (
                            <span className="text-purple-700 ml-1">({order.salonName})</span>
                          )}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                        {order.addressLine ? (
                          <>
                            {order.addressLine}, {order.city || "Pune"}, {order.state || "Maharashtra"} - {order.pincode}
                          </>
                        ) : (
                          "Wagholi Domkhel Road, Pune Hub Delivery"
                        )}
                        <span className="mx-2">•</span>
                        <span>
                          Payment: <strong className="text-slate-800 font-bold">{order.paymentMethod || "COD"}</strong> ({order.paymentStatus || "PAID"})
                        </span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveTrackingOrder(order)}
                        className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-[#795BCB] font-bold rounded-xl transition flex items-center gap-1.5 border border-purple-200 shadow-2xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Live Package</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveInvoiceOrder(order)}
                        className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition flex items-center gap-1.5 border border-slate-200 shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>GST Tax Invoice</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReorderAll(order)}
                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-black rounded-xl transition flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder All</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Live Tracking Detailed Modal */}
        {activeTrackingOrder && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#795BCB] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                    Live Shipment Tracker
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    Order #{activeTrackingOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-slate-500">
                    AWB Tracking Code: <strong className="text-slate-800">{activeTrackingOrder.trackingId || "EX-IN-49201842"}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTrackingOrder(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Header */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Current Shipment Status:</span>
                  <strong className="text-[#795BCB] text-sm font-black">
                    {activeTrackingOrder.orderStatus?.toUpperCase() === "DELIVERED"
                      ? "Delivered to Doorstep"
                      : "Dispatched from Wagholi Fulfillment Center"}
                  </strong>
                </div>

                <div className="text-right">
                  <span className="text-slate-500 block">Fulfillment Hub:</span>
                  <strong className="text-slate-800">Domkhel Rd, Wagholi Pune</strong>
                </div>
              </div>

              {/* Checkpoints Timeline */}
              <div className="space-y-6 pl-4 border-l-2 border-purple-200 ml-3">
                {/* Milestone 1 */}
                <div className="relative">
                  <span className="absolute -left-[23px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-900 font-bold block">
                      Order Booked &amp; Authenticated
                    </strong>
                    <p className="text-slate-500">
                      Payment and salon billing verified in PureCuts inventory engine.
                    </p>
                    <span className="text-[11px] text-purple-700 font-semibold block">
                      {formatOrderExactTime(activeTrackingOrder.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="relative">
                  <span className="absolute -left-[23px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-900 font-bold block">
                      Quality Inspected &amp; Tamper Sealed
                    </strong>
                    <p className="text-slate-500">
                      Packed securely at PureCuts Wagholi Domkhel Road Central Warehouse.
                    </p>
                    <span className="text-[11px] text-slate-400 block">Wagholi Hub QC Passed</span>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="relative">
                  <span
                    className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full ring-4 ${
                      activeTrackingOrder.orderStatus?.toUpperCase() === "DELIVERED"
                        ? "bg-emerald-500 ring-emerald-100"
                        : "bg-[#795BCB] ring-purple-100"
                    }`}
                  />
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-900 font-bold block">
                      Assigned to Express Delivery Courier
                    </strong>
                    <p className="text-slate-500">
                      Tracking code <span className="font-mono font-bold text-slate-800">{activeTrackingOrder.trackingId || "EX-IN-49201842"}</span> generated for doorstep delivery.
                    </p>
                    <span className="text-[11px] text-slate-400 block">Pune Express Fleet</span>
                  </div>
                </div>

                {/* Milestone 4 */}
                <div className="relative">
                  <span
                    className={`absolute -left-[23px] top-0 w-4 h-4 rounded-full ring-4 ${
                      activeTrackingOrder.orderStatus?.toUpperCase() === "DELIVERED"
                        ? "bg-emerald-500 ring-emerald-100"
                        : "bg-slate-300 ring-slate-100"
                    }`}
                  />
                  <div className="text-xs space-y-1">
                    <strong className="text-slate-900 font-bold block">
                      Delivered to Destination
                    </strong>
                    <p className="text-slate-500">
                      Handed over to {activeTrackingOrder.customerName || "Salon Recipient"} at {activeTrackingOrder.addressLine || "Registered Salon Address"}.
                    </p>
                    <span className="text-[11px] font-semibold text-emerald-700 block">
                      {activeTrackingOrder.orderStatus?.toUpperCase() === "DELIVERED"
                        ? "Handover Completed Successfully"
                        : "Estimated within 24 Hours"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Helpline Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-slate-900 block font-bold">Have Questions About This Delivery?</strong>
                  <span className="text-slate-500">Contact Wagholi Hub dispatch manager directly</span>
                </div>
                <a
                  href={`https://wa.me/919579177826?text=${encodeURIComponent(
                    `Hi PureCuts support, I am tracking Order #${activeTrackingOrder.orderNumber} (AWB: ${activeTrackingOrder.trackingId}). Please update me on delivery status.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition text-center shrink-0 flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Support (+91 9579177826)</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* GST Tax Invoice Modal */}
        {activeInvoiceOrder && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 print:p-0 print:border-none print:shadow-none">
              {/* Header Action Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 print:hidden">
                <span className="text-xs font-black uppercase text-purple-700 tracking-wider">
                  Official GST Tax Invoice &amp; Payment Receipt
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#795BCB] font-bold rounded-xl text-xs transition flex items-center gap-1.5 border border-purple-200"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print / Save PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveInvoiceOrder(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Invoice Document */}
              <div className="space-y-6 text-xs text-slate-700">
                {/* Brand & Supplier Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">PureCuts</h2>
                    <p className="text-slate-500 text-[11px] font-semibold">
                      Professional Salon Superstore &amp; Wholesale Supplies
                    </p>
                    <p className="text-slate-500 text-[11px] mt-1">
                      EUREKA Building, Domkhel Road, Near Vegetable Market,<br />
                      Wagholi, Pune, Maharashtra - 412207
                    </p>
                    <p className="text-slate-700 text-[11px] font-bold mt-1">
                      GSTIN: 27AAACP1234F1Z9 • State Code: 27 (Maharashtra)
                    </p>
                  </div>

                  <div className="sm:text-right space-y-1">
                    <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">
                      Tax Invoice
                    </span>
                    <strong className="text-base font-black text-slate-900 block">
                      INV-{activeInvoiceOrder.orderNumber}
                    </strong>
                    <span className="text-[11px] text-slate-600 block">
                      Invoice Date: <strong>{formatOrderExactTime(activeInvoiceOrder.createdAt)}</strong>
                    </span>
                    <span className="text-[11px] text-slate-600 block">
                      Payment Mode: <strong>{activeInvoiceOrder.paymentMethod || "COD"}</strong> ({activeInvoiceOrder.paymentStatus || "PAID"})
                    </span>
                  </div>
                </div>

                {/* Billed To / Shipped To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">
                      Billed &amp; Shipped To:
                    </span>
                    <strong className="text-slate-900 font-bold text-sm block mt-0.5">
                      {activeInvoiceOrder.customerName || "Valued Salon Customer"}
                    </strong>
                    {activeInvoiceOrder.salonName && (
                      <p className="text-purple-700 font-semibold">{activeInvoiceOrder.salonName}</p>
                    )}
                    <p className="text-slate-600 mt-1">
                      {activeInvoiceOrder.addressLine || "Domkhel Road"}, {activeInvoiceOrder.city || "Pune"},{" "}
                      {activeInvoiceOrder.state || "Maharashtra"} - {activeInvoiceOrder.pincode || "412207"}
                    </p>
                    <p className="text-slate-600 mt-0.5">Phone: +91 {activeInvoiceOrder.customerPhone || "N/A"}</p>
                  </div>

                  <div className="sm:text-right space-y-1">
                    <span className="text-slate-400 font-bold block text-[10px] uppercase">
                      Salon Business Details:
                    </span>
                    <p className="text-slate-700">
                      Customer Type: <strong className="font-bold">{activeInvoiceOrder.customerType || "SALON_OWNER"}</strong>
                    </p>
                    {activeInvoiceOrder.gstNumber && (
                      <p className="text-slate-700">
                        Customer GSTIN: <strong className="font-mono font-bold">{activeInvoiceOrder.gstNumber}</strong>
                      </p>
                    )}
                    {activeInvoiceOrder.udyamNumber && (
                      <p className="text-slate-700">
                        UDYAM Reg: <strong className="font-mono font-bold">{activeInvoiceOrder.udyamNumber}</strong>
                      </p>
                    )}
                    <p className="text-slate-700">
                      AWB Courier: <strong className="font-mono">{activeInvoiceOrder.trackingId || "EX-IN-49201842"}</strong>
                    </p>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Item Description</th>
                        <th className="p-3">Brand &amp; Size</th>
                        <th className="p-3 text-center">Qty</th>
                        <th className="p-3 text-right">Unit Price</th>
                        <th className="p-3 text-right">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeInvoiceOrder.items?.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                          <td className="p-3 font-bold text-slate-900">{item.name}</td>
                          <td className="p-3 text-slate-600">
                            {item.brand || "PureCuts"} {item.volumeSize ? `(${item.volumeSize})` : ""}
                          </td>
                          <td className="p-3 text-center font-bold text-slate-800">{item.quantity}</td>
                          <td className="p-3 text-right font-mono">₹{item.price.toLocaleString("en-IN")}</td>
                          <td className="p-3 text-right font-bold font-mono text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals Breakdown */}
                <div className="flex justify-end pt-2">
                  <div className="w-72 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Items Subtotal:</span>
                      <span className="font-mono font-bold">
                        ₹{Number(activeInvoiceOrder.subtotal || activeInvoiceOrder.totalAmount).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {Number(activeInvoiceOrder.discount || 0) > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Salon Discount ({activeInvoiceOrder.couponCode || "PROMO"}):</span>
                        <span className="font-mono font-bold">
                          -₹{Number(activeInvoiceOrder.discount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>Delivery &amp; Handling:</span>
                      <span className="font-bold text-emerald-700">
                        {Number(activeInvoiceOrder.deliveryFee || 0) === 0 ? "FREE" : `₹${activeInvoiceOrder.deliveryFee}`}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                      <span>Grand Total Paid:</span>
                      <span className="font-mono text-base text-[#795BCB]">
                        ₹{Number(activeInvoiceOrder.totalAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Disclaimers */}
                <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-400 space-y-1">
                  <p>• This is a computer-generated tax invoice issued by PureCuts Professional Salon Superstore.</p>
                  <p>• All products are covered by 100% Genuine Manufacturer Guarantee and dispatched directly from Wagholi Hub.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}