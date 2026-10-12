"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useStore } from "@/context/StoreContext";
import { MapPin, Truck, Compass, Loader2, X, ChevronRight } from "lucide-react";
import pincodes from "@/data/pincodes.json";

// Dynamically import LocationMapPicker with SSR disabled for Leaflet compatibility
const LocationMapPicker = dynamic(() => import("./LocationMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 text-center">
      <Loader2 className="w-8 h-8 text-[#795BCB] animate-spin mb-3" />
      <p className="text-sm font-bold text-slate-800">Opening interactive map...</p>
      <p className="text-xs text-slate-400 mt-1">Loading satellite streets & GPS detector</p>
    </div>
  ),
});

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { pincode, setPincode, showToast } = useStore();

  const [inputPin, setInputPin] = useState(pincode);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"options" | "map">("options");

  useEffect(() => {
    if (isOpen) {
      setInputPin(pincode);
      setError("");
      setViewMode("options");
    }
  }, [isOpen, pincode]);

  if (!isOpen) return null;

  // Handle location selection from interactive map
  const handleMapLocationSelected = (locationData: {
    pincode: string;
    city: string;
    district: string;
    state: string;
    fullAddress: string;
    areaName: string;
    lat: number;
    lng: number;
  }) => {
    const { pincode: detectedPin, city, areaName } = locationData;

    setInputPin(detectedPin);
    setPincode(detectedPin, city);

    showToast(
      `✓ Delivery location set to ${areaName || city} (${detectedPin})`
    );

    onClose();
  };

  // Handle manual pincode submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const cleanedPin = inputPin.replace(/\D/g, "").slice(0, 6);

    // Check 6-digit format first
    if (!/^\d{6}$/.test(cleanedPin)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    // Check pincode directly against pincodes.json
    const location = pincodes[cleanedPin as keyof typeof pincodes];

    if (!location) {
      setError("Pincode not found. Please enter a valid pincode.");
      return;
    }

    // Pincode is valid
    setError("");

    const cityName = location.district || "Pune";
    setPincode(cleanedPin, cityName);
    showToast(`✓ Delivering to ${cityName} (${cleanedPin})`);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 backdrop-blur-[3px] p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`relative w-full ${
          viewMode === "map" ? "max-w-xl" : "max-w-md"
        } transition-all duration-300`}
      >
        {viewMode === "map" ? (
          /* =========================================================
             MAP VIEW
             ========================================================= */
          <LocationMapPicker
            initialPincode={pincode}
            onLocationSelected={handleMapLocationSelected}
            onCancel={() => setViewMode("options")}
          />
        ) : (
          /* =========================================================
             OPTIONS VIEW (Detect Location vs Manual Pincode)
             ========================================================= */
          <div className="relative w-full rounded-2xl bg-white shadow-2xl border border-slate-200 p-5 sm:p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button (if user already has a saved pincode) */}
            {pincode && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#795BCB] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#795BCB]/25">
                <MapPin className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Where should we deliver?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Select your exact doorstep on the map or enter your pincode
                  to unlock real-time delivery estimates and pricing.
                </p>
              </div>
            </div>

            {/* Option 1: Detect Location on Map */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className="w-full group p-3.5 rounded-2xl border-2 border-[#795BCB] bg-[#795BCB]/5 hover:bg-[#795BCB] text-[#795BCB] hover:text-white transition-all duration-200 flex items-center justify-between text-left shadow-xs hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#795BCB] text-white group-hover:bg-white group-hover:text-[#795BCB] flex items-center justify-center shrink-0 transition-colors shadow-xs">
                    <Compass className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="block font-black text-sm text-slate-900 group-hover:text-white transition-colors">
                      Detect my location
                    </span>
                    <span className="block text-[11px] text-slate-500 group-hover:text-white/90 transition-colors">
                      Open interactive map & pinpoint automatically
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-white group-hover:bg-white/20 text-[#795BCB] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase">
                OR ENTER PINCODE
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Option 2: Pincode Form */}
            <form onSubmit={handleSubmit}>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Delivery pincode
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    autoFocus
                    inputMode="numeric"
                    type="text"
                    maxLength={6}
                    value={inputPin}
                    onChange={(event) => {
                      setInputPin(
                        event.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setError("");
                    }}
                    placeholder="Enter 6-digit pincode"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#795BCB]/30 focus:border-[#795BCB] text-sm font-semibold transition"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#795BCB] hover:bg-[#6246B0] text-white font-extrabold rounded-xl transition shadow-xs hover:shadow-md cursor-pointer shrink-0"
                >
                  Continue
                </button>
              </div>

              {error && (
                <p className="text-rose-600 text-xs font-semibold mt-2 animate-in fade-in">
                  {error}
                </p>
              )}
            </form>

            {/* Information Card */}
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center gap-2.5 text-[11px] text-slate-600">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Set your location once. You can change it anytime from{" "}
                <strong className="text-slate-800">Deliver to</strong> in the
                top header.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default LocationModal;
