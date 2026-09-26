// src/lib/pricing.ts

export type CustomerRegion = "pune" | "outside-pune" | "";

export function getProductPrice(
  basePrice: number,
  region: CustomerRegion
): number {
  if (region === "pune") {
    return Math.max(1, basePrice - 100);
  }

  if (region === "outside-pune") {
    return basePrice + 200;
  }

  // No pincode selected yet
  return basePrice;
}