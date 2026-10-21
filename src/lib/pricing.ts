// src/lib/pricing.ts
import { Product, UserProfile } from "./types";

export type CustomerRegion = "pune" | "outside-pune" | "";

export interface ResolvedPrice {
  price: number;
  originalPrice: number;
  tier: "customer" | "salon_pune" | "salon_outside";
  badge?: string;
  savings?: number;
}

/**
 * Resolves product pricing based on:
 * - Salon Owner in Pune -> salonPunePrice
 * - Salon Owner Outside Pune -> salonOutsidePunePrice
 * - Regular Customer / Guest -> customerPrice (same everywhere)
 */
export function resolveProductPricing(
  product: Product,
  user?: UserProfile | null,
  fallbackRegion?: CustomerRegion
): ResolvedPrice {
  const originalPrice = product.originalPrice || product.price || 0;

  // 1. If logged in as salon owner
  if (user && user.accountType === "salon_owner") {
    const salonRegion = user.salonDetails?.region || fallbackRegion || "pune";

    if (salonRegion === "pune") {
      const price = product.salonPunePrice ?? Math.max(1, Math.round(product.price * 0.75));
      return {
        price,
        originalPrice,
        tier: "salon_pune",
        badge: "Pune Salon Pro Rate",
        savings: Math.max(0, originalPrice - price),
      };
    } else {
      const price = product.salonOutsidePunePrice ?? Math.max(1, Math.round(product.price * 0.82));
      return {
        price,
        originalPrice,
        tier: "salon_outside",
        badge: "Outstation Salon Pro Rate",
        savings: Math.max(0, originalPrice - price),
      };
    }
  }

  // 2. Regular retail customer / guest -> uniform customer price everywhere
  const price = product.customerPrice ?? product.price;
  return {
    price,
    originalPrice,
    tier: "customer",
    savings: Math.max(0, originalPrice - price),
  };
}

/**
 * Backward-compatible helper for legacy components
 */
export function getProductPrice(
  basePrice: number,
  _region?: CustomerRegion
): number {
  return basePrice;
}