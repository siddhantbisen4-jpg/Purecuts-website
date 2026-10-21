"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FALLBACK_PRODUCTS } from "@/lib/firebaseProducts";
import { Product } from "@/lib/types";
import {
  Building2,
  Package,
  ShoppingBag,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Search,
  SlidersHorizontal,
  DollarSign,
  ShieldCheck,
  Smartphone,
  Globe,
  Database,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { profile, setDemoUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "salons" | "simulator">("products");

  // Seeding status
  const [seedingLoading, setSeedingLoading] = useState(false);
  const [seedingMessage, setSeedingMessage] = useState<string | null>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample salons queue
  const [salons, setSalons] = useState([
    {
      id: "sal_1",
      name: "Rohan Mehra",
      salonName: "Bliss Hair & Beauty Lounge",
      phone: "9822012345",
      pincode: "411038",
      city: "Pune",
      region: "pune" as const,
      gstin: "27ABCDE1234F1Z5",
      verified: true,
      registeredAt: "Yesterday, 3:45 PM",
      source: "Mobile App",
    },
    {
      id: "sal_2",
      name: "Sneha Patil",
      salonName: "Elegance Unisex Salon",
      phone: "9765432109",
      pincode: "411014",
      city: "Pune",
      region: "pune" as const,
      gstin: "27XYZPA5678Q1Z9",
      verified: true,
      registeredAt: "Today, 11:15 AM",
      source: "Website",
    },
    {
      id: "sal_3",
      name: "Vikram Rathi",
      salonName: "Crown Salon & Spa",
      phone: "9890123456",
      pincode: "400001",
      city: "Mumbai",
      region: "outside-pune" as const,
      gstin: "27MUMBA9876R1Z2",
      verified: false,
      registeredAt: "10 mins ago",
      source: "Mobile App",
    },
  ]);

  // Sample Unified Orders (Web & App)
  const [orders, setOrders] = useState([
    {
      id: "ORD-9821",
      source: "Mobile App",
      customerName: "Rohan Mehra (Bliss Lounge)",
      customerType: "Salon Owner (Pune)",
      pricingTier: "Pune Salon Pro Rate",
      items: "L'Oréal Serie Expert Shampoo x 12, Matrix Masque x 6",
      amount: 14250,
      status: "Processing",
      date: "Today, 2:10 PM",
    },
    {
      id: "ORD-9820",
      source: "Website",
      customerName: "Priya Kulkarni",
      customerType: "Retail Customer",
      pricingTier: "Standard Customer Rate",
      items: "Dr. Rashel De-Tan Facial Kit x 1",
      amount: 1049,
      status: "Shipped",
      date: "Today, 10:30 AM",
    },
    {
      id: "ORD-9819",
      source: "Website",
      customerName: "Crown Salon & Spa",
      customerType: "Salon Owner (Outside Pune)",
      pricingTier: "Outstation Salon Pro Rate",
      items: "Wahl Super Taper Pro Clipper x 2, Ikonic Dryer x 2",
      amount: 11400,
      status: "Delivered",
      date: "Yesterday",
    },
  ]);

  // 1-Click Seed to Firestore
  const handleSeedFirebase = async () => {
    setSeedingLoading(true);
    setSeedingMessage(null);
    try {
      const res = await fetch("/api/seed-firebase", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedingMessage(`✅ ${data.message || `Uploaded ${data.count} products to Firestore!`}`);
      } else {
        setSeedingMessage(`ℹ️ ${data.message || data.error || "Firebase keys needed in .env.local"}`);
      }
    } catch (err: any) {
      setSeedingMessage(`ℹ️ Firebase not yet connected in .env.local. Demo data active.`);
    } finally {
      setSeedingLoading(false);
    }
  };

  // Price modifier helper
  const handlePriceChange = (
    productId: number,
    field: "customerPrice" | "salonPunePrice" | "salonOutsidePunePrice" | "stock",
    val: number
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return { ...p, [field]: val };
        }
        return p;
      })
    );
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.categorySlug === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      {/* Top Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#795BCB] text-white flex items-center justify-center font-black text-xl shadow-md">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white">PureCuts Central Management Portal</h1>
                <span className="text-[10px] font-bold bg-[#795BCB]/30 text-purple-300 border border-purple-400/40 px-2 py-0.5 rounded-full uppercase">
                  Web & App Master Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Single unified control center for both the PureCuts Website and Salon Mobile App
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleSeedFirebase}
              disabled={seedingLoading}
              className="text-xs font-bold bg-[#795BCB] hover:bg-[#6847ba] text-white px-4 py-2 rounded-xl transition flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seedingLoading ? "animate-spin" : ""}`} />
              <span>{seedingLoading ? "Syncing to Firebase..." : "1-Click Sync to Firestore"}</span>
            </button>
          </div>
        </div>

        {seedingMessage && (
          <div className="bg-purple-950/70 text-purple-200 text-xs text-center py-2 px-4 border-t border-purple-800">
            {seedingMessage}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-slate-800 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "products"
                ? "border-[#795BCB] text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & 3-Tier Prices ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "orders"
                ? "border-[#795BCB] text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Unified Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("salons")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "salons"
                ? "border-[#795BCB] text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Salon Owner Approvals ({salons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("simulator")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "simulator"
                ? "border-[#795BCB] text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300">Live Role & Price Simulator</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* TAB 1: PRODUCTS & 3-TIER PRICING */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search product by title, brand, or SKU..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#795BCB]"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none text-slate-700"
                >
                  <option value="all">All Categories</option>
                  <option value="haircare">Haircare</option>
                  <option value="skincare">Skincare</option>
                  <option value="machineries">Machineries</option>
                </select>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products synced between Web & Mobile App
              </div>
            </div>

            {/* Pricing Schema Legend Card */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">
                  How Pricing Works in PureCuts
                </span>
                <p className="text-xs text-slate-200">
                  Every product below has 3 distinct price points stored in Firebase. Changes here immediately reflect across both platforms:
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  🛒 <strong>Customer Price:</strong> Retail website shoppers (all regions)
                </span>
                <span className="bg-purple-500/20 px-3 py-1.5 rounded-lg border border-purple-400/30 text-purple-200">
                  💈 <strong>Pune Salon Price:</strong> Pune salons on Web & App (25% off)
                </span>
                <span className="bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-400/30 text-indigo-200">
                  🚚 <strong>Outside Pune Salon:</strong> Outstation salons on Web & App (18% off)
                </span>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Brand / Cat</th>
                      <th className="py-3 px-4 text-center">MRP (Ref)</th>
                      <th className="py-3 px-4 text-center bg-slate-100/60 text-slate-900">
                        🛒 Customer Price (Web)
                      </th>
                      <th className="py-3 px-4 text-center bg-purple-50 text-[#795BCB]">
                        💈 Salon Pune Price (Web & App)
                      </th>
                      <th className="py-3 px-4 text-center bg-indigo-50 text-indigo-900">
                        🚚 Outside Pune Salon (Web & App)
                      </th>
                      <th className="py-3 px-4 text-center">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const customerPrice = p.customerPrice ?? p.price;
                      const salonPunePrice = p.salonPunePrice ?? Math.round(p.price * 0.75);
                      const salonOutPrice = p.salonOutsidePunePrice ?? Math.round(p.price * 0.82);

                      return (
                        <tr key={p.slug} className="hover:bg-slate-50/60 transition">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt=""
                                className="w-10 h-10 object-contain rounded-lg border border-slate-200 p-0.5 bg-white shrink-0"
                              />
                              <div className="min-w-0 max-w-[240px]">
                                <span className="font-bold text-slate-900 line-clamp-1">{p.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">slug: {p.slug}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-600">
                            <div className="font-semibold text-slate-900">{p.brand}</div>
                            <span className="text-[10px] text-slate-400 capitalize">{p.category}</span>
                          </td>

                          <td className="py-3 px-4 text-center text-slate-400 line-through">
                            ₹{p.originalPrice || customerPrice}
                          </td>

                          {/* Customer Price Column */}
                          <td className="py-3 px-4 text-center bg-slate-50/50 font-bold text-slate-950">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-slate-400">₹</span>
                              <input
                                type="number"
                                value={customerPrice}
                                onChange={(e) =>
                                  handlePriceChange(p.id, "customerPrice", Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 text-center bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-950 focus:outline-none focus:border-[#795BCB]"
                              />
                            </div>
                          </td>

                          {/* Pune Salon Price Column */}
                          <td className="py-3 px-4 text-center bg-purple-50/50 font-bold text-[#795BCB]">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-purple-400">₹</span>
                              <input
                                type="number"
                                value={salonPunePrice}
                                onChange={(e) =>
                                  handlePriceChange(p.id, "salonPunePrice", Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 text-center bg-white border border-purple-200 rounded-lg text-xs font-bold text-[#795BCB] focus:outline-none focus:border-[#795BCB]"
                              />
                            </div>
                          </td>

                          {/* Outside Pune Salon Price Column */}
                          <td className="py-3 px-4 text-center bg-indigo-50/50 font-bold text-indigo-900">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-indigo-400">₹</span>
                              <input
                                type="number"
                                value={salonOutPrice}
                                onChange={(e) =>
                                  handlePriceChange(p.id, "salonOutsidePunePrice", Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 text-center bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-900 focus:outline-none focus:border-indigo-600"
                              />
                            </div>
                          </td>

                          {/* Stock Column */}
                          <td className="py-3 px-4 text-center">
                            <input
                              type="number"
                              value={p.stock || 50}
                              onChange={(e) => handlePriceChange(p.id, "stock", Number(e.target.value))}
                              className="w-16 px-2 py-1 text-center bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UNIFIED ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900">All Incoming Orders (Web & Mobile App)</h2>
                <p className="text-xs text-slate-500">
                  Every order placed via Website or Mobile App appears here in one consolidated queue.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-purple-50 text-[#795BCB] px-3 py-1 rounded-full border border-purple-200">
                  📱 App Orders: 1
                </span>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                  💻 Web Orders: 2
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Platform Origin</th>
                    <th className="py-3 px-4">Customer / Salon</th>
                    <th className="py-3 px-4">Pricing Tier Applied</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4 text-right">Total Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4">
                        <span className="font-extrabold text-slate-900">{o.id}</span>
                        <div className="text-[10px] text-slate-400">{o.date}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            o.source === "Mobile App"
                              ? "bg-purple-100 text-[#795BCB]"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {o.source === "Mobile App" ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                          {o.source}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{o.customerName}</div>
                        <div className="text-[10px] text-slate-400">{o.customerType}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {o.pricingTier}
                        </span>
                      </td>

                      <td className="py-3 px-4 max-w-[240px] truncate text-slate-600">
                        {o.items}
                      </td>

                      <td className="py-3 px-4 text-right font-black text-slate-950 text-sm">
                        ₹{o.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            o.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-800"
                              : o.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SALON APPROVALS */}
        {activeTab === "salons" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-slate-900">Registered Salon Verification Queue</h2>
                <p className="text-xs text-slate-500">
                  Salon accounts registered via Web or Mobile App. Approving here unlocks wholesale rates on both platforms.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {salons.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-black text-sm text-slate-900">{s.salonName}</h3>
                      <p className="text-xs text-slate-500 font-medium">Owner: {s.name}</p>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        s.verified
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {s.verified ? "Verified Salon" : "Pending Verification"}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone:</span>
                      <span className="font-semibold">{s.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-semibold">
                        {s.city} ({s.pincode}) -{" "}
                        <strong className={s.region === "pune" ? "text-purple-600" : "text-indigo-600"}>
                          {s.region === "pune" ? "Pune Salon Rate" : "Outside Pune Rate"}
                        </strong>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">GSTIN / Udyam:</span>
                      <span className="font-mono font-bold text-slate-900">{s.gstin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Signed Up via:</span>
                      <span className="font-semibold text-slate-700">{s.source}</span>
                    </div>
                  </div>

                  {!s.verified ? (
                    <button
                      onClick={() =>
                        setSalons((prev) =>
                          prev.map((sal) => (sal.id === s.id ? { ...sal, verified: true } : sal))
                        )
                      }
                      className="w-full py-2 bg-[#795BCB] hover:bg-[#6847ba] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Unlock Salon Rates</span>
                    </button>
                  ) : (
                    <div className="text-center text-xs text-emerald-600 font-bold flex items-center justify-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Wholesale Pricing Active</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE ROLE & PRICING SIMULATOR */}
        {activeTab === "simulator" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black px-3 py-1 rounded-full uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Instant Storefront Preview Tool</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">Test Your Pricing Model in Real-Time</h2>
              <p className="text-xs text-slate-500 max-w-2xl mt-1">
                Click any of the three roles below to simulate how the website and product cards look for different customers. When you switch roles, your session is updated immediately:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Option 1 */}
              <button
                onClick={() => {
                  setDemoUser(null);
                }}
                className={`p-5 rounded-2xl border-2 text-left transition relative ${
                  !profile || profile.accountType !== "salon_owner"
                    ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🛒</span>
                  {(!profile || profile.accountType !== "salon_owner") && (
                    <span className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded-full uppercase">
                      Active Now
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">Retail Customer / Visitor</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sees <strong>Customer Price</strong> uniformly. No special discounts or salon badges.
                </p>
              </button>

              {/* Option 2 */}
              <button
                onClick={() => {
                  setDemoUser({
                    uid: "sim_salon_pune",
                    name: "Rahul Verma",
                    accountType: "salon_owner",
                    salonDetails: {
                      salonName: "Aura Unisex Studio",
                      city: "Pune",
                      pincode: "411038",
                      region: "pune",
                      isVerified: true,
                    },
                  });
                }}
                className={`p-5 rounded-2xl border-2 text-left transition relative ${
                  profile?.accountType === "salon_owner" && profile?.salonDetails?.region === "pune"
                    ? "border-[#795BCB] bg-purple-50/50 ring-2 ring-purple-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">💈</span>
                  {profile?.accountType === "salon_owner" && profile?.salonDetails?.region === "pune" && (
                    <span className="text-[10px] font-black bg-[#795BCB] text-white px-2 py-0.5 rounded-full uppercase">
                      Active Now
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">Pune Salon Owner</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sees <strong>Pune Salon Price</strong> (25% off) + <span className="text-purple-600 font-bold">Pune Salon Pro Rate</span> badge.
                </p>
              </button>

              {/* Option 3 */}
              <button
                onClick={() => {
                  setDemoUser({
                    uid: "sim_salon_out",
                    name: "Vikram Rathi",
                    accountType: "salon_owner",
                    salonDetails: {
                      salonName: "Crown Salon",
                      city: "Mumbai",
                      pincode: "400001",
                      region: "outside-pune",
                      isVerified: true,
                    },
                  });
                }}
                className={`p-5 rounded-2xl border-2 text-left transition relative ${
                  profile?.accountType === "salon_owner" && profile?.salonDetails?.region === "outside-pune"
                    ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🚚</span>
                  {profile?.accountType === "salon_owner" && profile?.salonDetails?.region === "outside-pune" && (
                    <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">
                      Active Now
                    </span>
                  )}
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">Outside Pune Salon Owner</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Sees <strong>Outside Pune Salon Price</strong> (18% off) + <span className="text-indigo-600 font-bold">Outstation Salon Pro Rate</span> badge.
                </p>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Current active test session:{" "}
                <strong className="text-slate-900">
                  {profile?.accountType === "salon_owner"
                    ? `Salon Owner (${profile.salonDetails?.region === "pune" ? "Pune" : "Outside Pune"})`
                    : "Retail Customer"}
                </strong>
              </span>

              <Link
                href="/"
                className="py-2.5 px-5 bg-slate-900 hover:bg-[#795BCB] text-white text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-xs"
              >
                <span>Preview Storefront with Active Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
