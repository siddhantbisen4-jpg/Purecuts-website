"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type OrderItem = {
  productId: number;
  name: string;
  brand?: string;
  price: number;
  quantity: number;
  image?: string;
  volumeSize?: string;
};

type Order = {
  id: number;
  orderNumber: string;
  createdAt: string | null;
  orderStatus: string;
  totalAmount: number;
  items: OrderItem[];
  trackingId: string | null;
};

export default function OrdersHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const phone = localStorage
          .getItem("purecuts_customer_phone")
          ?.trim();

        if (!phone) {
          setOrders([]);
          return;
        }

        const response = await fetch(
          `/api/orders?customerPhone=${encodeURIComponent(phone)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load orders.");
        }

        setOrders(data.orders ?? []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError("Unable to load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/"
            className="hover:text-amber-600 font-medium"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/account"
            className="hover:text-amber-600 font-medium"
          >
            Account
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">
            My Orders
          </span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h1 className="text-xl font-black text-slate-900">
                My Orders &amp; Shipments
              </h1>
              <p className="text-xs text-slate-500">
                Track current salon packages and view past receipts
              </p>
            </div>

            <Link
              href="/category/all"
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              Order More Supplies →
            </Link>
          </div>

          <div className="space-y-4">
            {loading && (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading your orders...
              </p>
            )}

            {!loading && error && (
              <p className="py-8 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && orders.length === 0 && (
              <div className="py-10 text-center">
                <p className="font-bold text-slate-800">
                  No orders found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Orders placed using your checkout phone number will
                  appear here.
                </p>
                <Link
                  href="/category/all"
                  className="mt-4 inline-block text-sm font-bold text-amber-700 hover:underline"
                >
                  Start shopping
                </Link>
              </div>
            )}

            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition space-y-3 bg-slate-50/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-black text-slate-900 mr-2">
                      Order #{order.orderNumber}
                    </span>

                    <span className="text-[11px] text-slate-500">
                      {order.createdAt
                        ? new Intl.DateTimeFormat("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        }).format(new Date(order.createdAt))
                        : "Date unavailable"}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full border ${order.orderStatus?.toUpperCase() === "DELIVERED"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                      : "bg-amber-100 text-amber-900 border-amber-200"
                      }`}
                  >
                    {order.orderStatus
                      ? order.orderStatus.replace(/_/g, " ")
                      : "Processing"}
                  </span>
                </div>

                <div className="divide-y divide-slate-100 py-1 text-xs">
                  {order.items?.map((item, idx) => (
                    <div
                      key={`${item.productId}-${idx}`}
                      className="py-2 flex justify-between items-center gap-4"
                    >
                      <div>
                        <span className="font-bold text-slate-800">
                          {item.name}
                        </span>

                        <span className="text-slate-400 block text-[11px]">
                          Brand: {item.brand || "N/A"} • Qty:{" "}
                          {item.quantity}
                        </span>

                        {item.volumeSize && (
                          <span className="text-slate-400 block text-[11px]">
                            Size: {item.volumeSize}
                          </span>
                        )}
                      </div>

                      <span className="font-extrabold text-slate-900 whitespace-nowrap">
                        ₹
                        {(item.price * item.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-slate-500">
                    Tracking ID:{" "}
                    <strong className="text-slate-800">
                      {order.trackingId || "Not assigned yet"}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">
                      Total Paid:
                    </span>
                    <span className="font-black text-amber-700 text-sm">
                      ₹
                      {Number(order.totalAmount).toLocaleString(
                        "en-IN"
                      )}
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