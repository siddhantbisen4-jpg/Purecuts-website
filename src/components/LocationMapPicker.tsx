"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  MapPin,
  Crosshair,
  Search,
  Loader2,
  Check,
  Truck,
  Sparkles,
  AlertCircle,
  X,
} from "lucide-react";
import pincodes from "@/data/pincodes.json";

interface LocationMapPickerProps {
  initialPincode?: string;
  onLocationSelected: (locationData: {
    pincode: string;
    city: string;
    district: string;
    state: string;
    fullAddress: string;
    areaName: string;
    lat: number;
    lng: number;
  }) => void;
  onCancel?: () => void;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    suburb?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
  };
}

export default function LocationMapPicker({
  initialPincode,
  onLocationSelected,
  onCancel,
}: LocationMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const isMountedRef = useRef(true);

  // Default coordinate: Wagholi / Pune (PureCuts Hub)
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 18.5793,
    lng: 73.9814,
  });

  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [detectedAddress, setDetectedAddress] = useState<string>("");
  const [areaTitle, setAreaTitle] = useState<string>("");
  const [detectedPin, setDetectedPin] = useState<string>(initialPincode || "");
  const [detectedCity, setDetectedCity] = useState<string>("Pune");
  const [detectedState, setDetectedState] = useState<string>("Maharashtra");
  const [manualPinInput, setManualPinInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPuneRegion, setIsPuneRegion] = useState<boolean>(true);

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reverse geocode coordinate to get address & pincode
  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      setIsLoadingAddress(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch address details");
        }

        const data = await response.json();
        const addr = data?.address || {};

        const rawPostcode = (addr.postcode || "").replace(/\D/g, "").slice(0, 6);
        const city =
          addr.city ||
          addr.town ||
          addr.village ||
          addr.county ||
          addr.state_district ||
          "";
        const district = addr.state_district || addr.county || city;
        const state = addr.state || "";

        const area =
          addr.suburb ||
          addr.neighbourhood ||
          addr.residential ||
          addr.road ||
          addr.commercial ||
          city ||
          "Selected Location";

        const formattedAddress = data?.display_name || `${area}, ${city}, ${state}`;

        setAreaTitle(area);
        setDetectedAddress(formattedAddress);
        setDetectedCity(city || district || "Pune");
        setDetectedState(state);

        // Check if Pune
        const isPune =
          district?.toUpperCase().includes("PUNE") ||
          city?.toUpperCase().includes("PUNE") ||
          state?.toUpperCase().includes("MAHARASHTRA") &&
            (rawPostcode.startsWith("411") || rawPostcode.startsWith("412"));

        setIsPuneRegion(isPune);

        // Check pincode
        if (rawPostcode && /^\d{6}$/.test(rawPostcode)) {
          setDetectedPin(rawPostcode);
          setManualPinInput(rawPostcode);
        } else {
          // If OSM has no pincode at exact spot, provide smart suggestion or let user confirm
          const fallback = isPune ? "411001" : "";
          if (fallback) {
            setDetectedPin(fallback);
            setManualPinInput(fallback);
          }
        }
      } catch (err) {
        console.error("Reverse geocoding error:", err);
        setErrorMessage("Could not load address for this point. You can still set your pincode.");
      } finally {
        setIsLoadingAddress(false);
      }
    },
    []
  );

  // Initialize Leaflet map safely on client
  useEffect(() => {
    let isDestroyed = false;
    let localMap: any = null;

    const initMap = async () => {
      if (!mapContainerRef.current || isDestroyed) return;

      // Import Leaflet dynamically to avoid SSR errors
      const L = (await import("leaflet")).default;

      if (isDestroyed || !mapContainerRef.current) return;

      // Ensure no leftover leaflet id on container
      if ((mapContainerRef.current as any)._leaflet_id) {
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove();
          } catch {}
          mapInstanceRef.current = null;
        }
        delete (mapContainerRef.current as any)._leaflet_id;
      }

      // Custom PureCuts Purple SVG Marker Icon
      const customPinIcon = L.divIcon({
        className: "custom-purecuts-pin",
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: grab; transform: translate(-50%, -100%);">
            <div style="
              width: 38px;
              height: 38px;
              background: linear-gradient(135deg, #795BCB 0%, #5B3EA6 100%);
              border: 3px solid #ffffff;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              box-shadow: 0 8px 20px rgba(121, 91, 203, 0.45);
              display: flex;
              align-items: center;
              justify-content: center;
              transition: transform 0.15s ease;
            ">
              <div style="
                width: 14px;
                height: 14px;
                background: #ffffff;
                border-radius: 50%;
                transform: rotate(45deg);
                box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
              "></div>
            </div>
            <div style="
              width: 16px;
              height: 6px;
              background: rgba(0, 0, 0, 0.28);
              border-radius: 50%;
              filter: blur(1.5px);
              margin-top: 2px;
            "></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      // Initialize map instance
      localMap = L.map(mapContainerRef.current, {
        center: [coords.lat, coords.lng],
        zoom: 14,
        zoomControl: false,
      });

      if (isDestroyed) {
        localMap.remove();
        return;
      }

      // Add modern CartoDB Voyager tiles (clean, beautiful typography, crisp streets)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(localMap);

      // Add Zoom control in bottom right
      L.control.zoom({ position: "bottomright" }).addTo(localMap);

      // Add Draggable marker
      const marker = L.marker([coords.lat, coords.lng], {
        icon: customPinIcon,
        draggable: true,
      }).addTo(localMap);

      markerRef.current = marker;
      mapInstanceRef.current = localMap;

      // Handle map clicks -> move marker & reverse geocode
      localMap.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCoords({ lat, lng });
        reverseGeocode(lat, lng);
      });

      // Handle marker drag end
      marker.on("dragend", (e: any) => {
        const pos = e.target.getLatLng();
        setCoords({ lat: pos.lat, lng: pos.lng });
        reverseGeocode(pos.lat, pos.lng);
      });

      // Trigger initial reverse geocode
      reverseGeocode(coords.lat, coords.lng);

      // Auto-detect user's GPS location on initial map open
      if (navigator.geolocation) {
        setIsDetectingGps(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (isDestroyed) return;
            setIsDetectingGps(false);
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;

            setCoords({ lat: userLat, lng: userLng });
            if (mapInstanceRef.current && markerRef.current) {
              mapInstanceRef.current.flyTo([userLat, userLng], 16, {
                animate: true,
                duration: 1.2,
              });
              markerRef.current.setLatLng([userLat, userLng]);
            }
            reverseGeocode(userLat, userLng);
          },
          (err) => {
            console.warn("Initial GPS request ignored or denied:", err.message);
            setIsDetectingGps(false);
          },
          { enableHighAccuracy: true, timeout: 8000 }
        );
      }
    };

    initMap();

    return () => {
      isDestroyed = true;
      if (localMap) {
        try {
          localMap.remove();
        } catch {}
        localMap = null;
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
    };
  }, []); // Run once on mount

  // User clicks "Locate Me" button to re-trigger GPS
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetectingGps(true);
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGps(false);
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        setCoords({ lat: userLat, lng: userLng });

        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.flyTo([userLat, userLng], 16, {
            animate: true,
            duration: 1.2,
          });
          markerRef.current.setLatLng([userLat, userLng]);
        }

        reverseGeocode(userLat, userLng);
      },
      (err) => {
        setIsDetectingGps(false);
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMessage("Location permission denied. Please click on the map to choose location.");
        } else {
          setErrorMessage("Unable to retrieve device GPS. Please pick your location on the map.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Autocomplete search handler
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!val.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            val
          )}&countrycodes=in&limit=5&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data || []);
          setShowSearchResults(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    const targetLat = parseFloat(result.lat);
    const targetLng = parseFloat(result.lon);

    setCoords({ lat: targetLat, lng: targetLng });
    setShowSearchResults(false);
    setSearchQuery(result.display_name.split(",")[0] || "");

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([targetLat, targetLng], 16, {
        animate: true,
        duration: 1.2,
      });
      markerRef.current.setLatLng([targetLat, targetLng]);
    }

    reverseGeocode(targetLat, targetLng);
  };

  // Confirm and set location automatically
  const handleConfirmLocation = () => {
    const pinToUse = manualPinInput.trim() || detectedPin.trim();

    if (!pinToUse || !/^\d{6}$/.test(pinToUse)) {
      setErrorMessage("Please enter or verify a valid 6-digit delivery pincode.");
      return;
    }

    // Verify against pincodes.json
    const locationInfo = pincodes[pinToUse as keyof typeof pincodes];
    const city = detectedCity || locationInfo?.district || (isPuneRegion ? "Pune" : "Maharashtra");
    const district = locationInfo?.district || detectedCity || "Pune";
    const state = locationInfo?.state || detectedState || "MAHARASHTRA";

    onLocationSelected({
      pincode: pinToUse,
      city,
      district,
      state,
      fullAddress: detectedAddress || `${areaTitle}, ${city}`,
      areaName: areaTitle || city,
      lat: coords.lat,
      lng: coords.lng,
    });
  };

  return (
    <div className="relative w-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
      {/* Top Map Header & Search Bar */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-slate-100 flex flex-col gap-2.5 z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#795BCB]/10 text-[#795BCB] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#795BCB]" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Select Delivery Location
              </h3>
              <p className="text-[11px] text-slate-500">
                Click anywhere on map or drag pin to your delivery doorstep
              </p>
            </div>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() => {
                if (searchResults.length > 0) setShowSearchResults(true);
              }}
              placeholder="Search area, landmark, locality (e.g. Wagholi, Kalyani Nagar)..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#795BCB] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#795BCB]/20 transition"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 w-4 h-4 text-[#795BCB] animate-spin" />
            )}
            {searchQuery && !isSearching && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 max-h-52 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.place_id}
                  type="button"
                  onClick={() => handleSelectSearchResult(result)}
                  className="w-full text-left px-3 py-2 hover:bg-[#795BCB]/5 flex items-start gap-2.5 transition border-b border-slate-50 last:border-b-0"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#795BCB] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">
                      {result.display_name.split(",")[0]}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {result.display_name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating "Locate Me" Button */}
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={isDetectingGps}
          title="Use my current GPS location"
          className="absolute top-3 right-3 z-[400] flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-800 hover:text-[#795BCB] shadow-md border border-slate-200 text-xs font-bold transition hover:shadow-lg backdrop-blur-sm disabled:opacity-75"
        >
          {isDetectingGps ? (
            <Loader2 className="w-4 h-4 text-[#795BCB] animate-spin" />
          ) : (
            <Crosshair className="w-4 h-4 text-[#795BCB]" />
          )}
          <span>{isDetectingGps ? "Detecting GPS..." : "Locate Me"}</span>
        </button>

        {/* Subtle Map Drag Hint Pill */}
        <div className="absolute top-3 left-3 z-[400] pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Tap or drag pin to change
          </span>
        </div>
      </div>

      {/* Bottom Selected Location Preview & Auto-Set Action */}
      <div className="p-3.5 sm:p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col gap-3">
        {errorMessage && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex items-start justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#795BCB] text-white flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  {isLoadingAddress ? "Locating selected area..." : areaTitle || "Selected Location"}
                </h4>

                {isPuneRegion && (
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[#795BCB] font-extrabold text-[10px] flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Pune Hub
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                {isLoadingAddress
                  ? "Fetching address details from map..."
                  : detectedAddress || "Pune, Maharashtra"}
              </p>
            </div>
          </div>

          {/* Pincode display & edit */}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Pincode
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <input
                type="text"
                maxLength={6}
                value={manualPinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setManualPinInput(val);
                  setDetectedPin(val);
                }}
                placeholder="6-digit"
                className="w-18 px-1.5 py-1 text-center font-black text-xs sm:text-sm bg-slate-100 rounded-md border border-slate-300 focus:bg-white focus:border-[#795BCB] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Region & Dispatch Info */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {isPuneRegion
                ? "⚡ Express Wagholi / Pune doorstep delivery available"
                : "🚚 Pan-India standard shipping available"}
            </span>
          </div>
        </div>

        {/* Confirm and Set Location Button */}
        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirmLocation}
            disabled={isLoadingAddress}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#795BCB] hover:bg-[#6246B0] text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoadingAddress ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Locating address...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>
                  Confirm & Set Location {detectedPin ? `(${detectedPin})` : ""}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
