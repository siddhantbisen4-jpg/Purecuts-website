import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Truck,
  PackageCheck,
  Building2,
  PhoneCall,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface OrderSuccessProps {
  searchParams: Promise<{ orderNumber?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessProps) {
  const sParams = await searchParams;
  const orderNumber = sParams.orderNumber || `PC-${Date.now().toString().slice(-6)}`;
  const trackingNumber = `EX-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-2">
            Thank You for Shopping at PureCuts!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Your salon supplies have been booked and routed to our Wagholi, Pune fulfillment center.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Order Number</span>
              <strong className="text-slate-900 font-extrabold text-sm">{orderNumber}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Tracking ID</span>
              <strong className="text-amber-800 font-bold">{trackingNumber}</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[11px]">Estimated Arrival</span>
              <strong className="text-emerald-700 font-bold">Within 24-48 Hours</strong>
            </div>
          </div>

          {/* Live Tracking Milestones */}
          <div className="py-4 border-t border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 text-left">
              Fulfillment & Dispatch Pipeline
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-1 shadow-sm">
                  ✓
                </div>
                <span className="font-bold text-slate-800">Confirmed</span>
                <span className="text-[10px] text-slate-400">Inventory Reserved</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#795BCB] text-white flex items-center justify-center font-bold mb-1 ">
                  2
                </div>
                <span className="font-bold text-slate-800">Packing</span>
                <span className="text-[10px] text-slate-400">Wagholi Pune Hub</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold mb-1">
                  3
                </div>
                <span className="font-medium text-slate-500">In Transit</span>
                <span className="text-[10px] text-slate-400">Express Courier</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold mb-1">
                  4
                </div>
                <span className="font-medium text-slate-500">Delivered</span>
                <span className="text-[10px] text-slate-400">Doorstep Handover</span>
              </div>
            </div>
          </div>

          {/* Help & Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/category/all"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#795BCB] hover:bg-[#795BCB] text-slate-950 font-black text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
            >
              <span className="text-white">Continue Shopping</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            <Link
              href="/account/orders"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
            >
              <span className="text-white">View All My Orders</span>
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-amber-600" /> Wagholi Domkhel Rd Warehouse
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Support: +91 9579177826
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
