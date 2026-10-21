"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  User,
  Package,
  Heart,
  Building2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Save,
} from "lucide-react";

export default function AccountPage() {
  const { pincode, deliveryCity, setPincode, openB2BModal, showToast } = useStore();

  const [profile, setProfile] = useState({
    name: "Pooja Sharma",
    phone: "9579177826",
    email: "pooja.stylist@purecuts.in",
    salonName: "Aura Unisex Hair Studio & Academy",
    gstin: "27AAACP1234F1Z9",
    address: "EUREKA Building, Domkhel Road, Wagholi",
    city: "Pune",
    state: "Maharashtra",
    pincode: pincode,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPincode(profile.pincode);
    showToast("Profile & Salon details saved!");
  };

  return (
    <main className="min-h-screen bg-slate-100/60 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Salon Account Profile</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Menu Sidebar (4 cols) */}
          <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-[#9A37D8] text-white font-black text-xl flex items-center justify-center">
                {profile.name[0]}
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900">{profile.name}</h2>
                <span className="text-[11px] text-white bg-[#9A37D8] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Verified Salon Member
                </span>
              </div>
            </div>

            <nav className="space-y-1 text-xs">
              <Link
                href="/account"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#9A37D8] text-white font-bold border border-white"
              >
                <User className="w-4 h-4 text-white" /> My Profile & Salon Details
              </Link>
              <Link
                href="/account/orders"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold"
              >
                <Package className="w-4 h-4 text-slate-400" /> Orders & Shipments
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold"
              >
                <Heart className="w-4 h-4 text-slate-400" /> Saved Wishlist
              </Link>
             {/* <button
                onClick={openB2BModal}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-amber-800 hover:bg-amber-50 font-semibold"
              >
                <Building2 className="w-4 h-4 text-amber-600" /> Salon Bulk Wholesale Account
              </button>*/}
            </nav>
          </div>

          {/* Right Form (8 cols) */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h1 className="text-xl font-black text-slate-900">Salon Profile & Billing Address</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved details will be prefilled automatically during your next checkout.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salon / Business Name</label>
                  <input
                    type="text"
                    value={profile.salonName}
                    onChange={(e) => setProfile({ ...profile, salonName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GSTIN (For 18% Tax Credit)</label>
                  <input
                    type="text"
                    value={profile.gstin}
                    onChange={(e) => setProfile({ ...profile, gstin: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={profile.pincode}
                    onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-amber-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" /> Save Profile Details
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
