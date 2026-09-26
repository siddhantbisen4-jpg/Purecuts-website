"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/context/StoreContext";
import { MapPin, Truck } from "lucide-react";
import pincodes from "@/data/pincodes.json";
interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { pincode, setPincode } = useStore();

  const [inputPin, setInputPin] = useState(pincode);
  const [error, setError] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputPin(pincode);
      setError("");
    }
  }, [isOpen, pincode]);

  if (!isOpen) return null;
  const handleDetectLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Location detection is not supported by your browser.");
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
          );

          if (!response.ok) {
            throw new Error("Unable to detect address");
          }

          const data = await response.json();

          const detectedPin = data?.address?.postcode
            ?.replace(/\D/g, "")
            .slice(0, 6);

          if (!detectedPin || !/^\d{6}$/.test(detectedPin)) {
            setError(
              "Could not find a valid pincode for your current location. Please enter it manually.",
            );
            return;
          }

          const location = pincodes[detectedPin as keyof typeof pincodes];

          if (!location) {
            setError(
              `Pincode ${detectedPin} is currently not available for delivery.`,
            );
            return;
          }

          setInputPin(detectedPin);
          setPincode(detectedPin);
          onClose();
        } catch (error) {
          console.error("Location detection error:", error);

          setError(
            "Unable to detect your location. Please enter your pincode manually.",
          );
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);

        setIsDetectingLocation(false);

        if (error.code === error.PERMISSION_DENIED) {
          setError(
            "Location permission was denied. Please allow location access or enter your pincode manually.",
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setError(
            "Your current location could not be determined. Please enter your pincode manually.",
          );
        } else if (error.code === error.TIMEOUT) {
          setError(
            "Location detection timed out. Please try again or enter your pincode manually.",
          );
        } else {
          setError(
            "Unable to detect your location. Please enter your pincode manually.",
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };
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

    // StoreContext will save:
    // - pincode
    // - Pune/outside-Pune region
    // - localStorage
    setPincode(cleanedPin);

    // Close only after successful JSON validation
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/45 backdrop-blur-[2px] px-4 pt-20 sm:pt-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-slate-200 p-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#795BCB] text-white flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Where should we deliver?
            </h3>

            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Use your current location or enter your pincode to check delivery
              availability and pricing.
            </p>
          </div>
        </div>
        {/* Pincode Form */}
        {/* Detect Current Location */}
        <div className="mt-5">
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetectingLocation}
            className="w-full py-3 rounded-xl border-2 border-[#795BCB] text-[#795BCB] hover:bg-[#795BCB]/10 font-extrabold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <MapPin className="w-4 h-4" />

            {isDetectingLocation
              ? "Detecting your location..."
              : "Detect my current location"}
          </button>
        </div>
        {/* OR Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-200" />

          <span className="text-[11px] font-bold text-slate-400 uppercase">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-200" />
        </div>
        {/* Pincode Form */}{" "}
        <form onSubmit={handleSubmit} className="mt-5">
          {" "}
          <label className="block text-xs font-bold text-slate-700 mb-2">
            {" "}
            Delivery pincode{" "}
          </label>{" "}
          <div className="flex gap-2">
            {" "}
            <div className="relative flex-1">
              {" "}
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />{" "}
              <input
                autoFocus
                inputMode="numeric"
                type="text"
                maxLength={6}
                value={inputPin}
                onChange={(event) => {
                  setInputPin(
                    event.target.value.replace(/\D/g, "").slice(0, 6),
                  );
                  setError("");
                }}
                placeholder="Enter 6-digit pincode"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-semibold"
              />{" "}
            </div>{" "}
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#795BCB] hover:bg-[#6246B0] text-white font-extrabold rounded-xl transition"
            >
              {" "}
              Continue{" "}
            </button>{" "}
          </div>{" "}
          {error && (
            <p className="text-rose-600 text-xs mt-2"> {error} </p>
          )}{" "}
        </form>
        {/* Information */}
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center gap-2 text-[11px] text-slate-600">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />

          <span>
            Set your location once. You can change it later from
            <strong> Deliver to </strong>
            in the header.
          </span>
        </div>
      </div>
    </div>
  );
}
