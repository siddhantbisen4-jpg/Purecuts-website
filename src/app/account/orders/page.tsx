"use client";

import React from "react";
import Link from "next/link";
import { Package, Truck, CheckCircle2, ArrowRight, ShieldCheck, Clock } from "lucide-react";

const SAMPLE_ORDERS = [
  {
    orderNumber: "PC-98472-108",
    date: "Today, 11:30 AM",
    status: "Packing at Wagholi Hub",
    statusColor: "bg-amber-100 text-amber-900 border-amber-200",
    totalAmount: 3413,
    items: [
      { name: "Ikonic Professional S3+ Ceramic Hair Straightener", brand: "Ikonic", qty: 1, price: 3413 },
    ],
    trackingId: "EX-IN-89301928",
  },
  {
    orderNumber: "PC-89124-774",
    date: "3 days ago",
    status: "Delivered",
    statusColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    totalAmount: 1840,
    items: [
      { name: "Matrix Biolage Advanced Fiberstrong Mask 490g", brand: "Matrix", qty: 1, price: 818 },
      { name: "Dr. Rashel Pearl Face & Body Cream 380ml", brand: "Dr. Rashel", qty: 2, price: 218 },
      { name: "Gillette Wilkinson Sword Saloon Blades 50 pcs", brand: "Gillette", qty: 1, price: 90 },
    ],
    trackingId: "EX-IN-74910283",
  },
];

export default function OrdersHistoryPage() {
  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <Link href="/account" className="hover:text-amber-600 font-medium">Account</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">My Orders</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-xl font-black text-slate-900">My Orders & Shipments</h1>
              <p className="text-xs text-slate-500">Track current salon packages and view past receipts</p>
            </div>
            <Link
              href="/category/all"
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Order More Supplies →
            </Link>
          </div>

          <div className="space-y-4">
            {SAMPLE_ORDERS.map((order) => (
              <div
                key={order.orderNumber}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition space-y-3 bg-slate-50/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-slate-900 mr-2">
                      Order #{order.orderNumber}
                    </span>
                    <span className="text-[11px] text-slate-500">{order.date}</span>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>

                <div className="divide-y divide-slate-100 py-1 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800">{item.name}</span>
                        <span className="text-slate-400 block text-[11px]">
                          Brand: {item.brand} • Qty: {item.qty}
                        </span>
                      </div>
                      <span className="font-extrabold text-slate-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-slate-500">
                    Tracking ID: <strong className="text-slate-800">{order.trackingId}</strong> (Pune Wagholi Express)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">Total Paid:</span>
                    <span className="font-black text-amber-700 text-sm">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
