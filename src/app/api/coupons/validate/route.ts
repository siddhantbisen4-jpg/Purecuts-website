import { NextRequest, NextResponse } from "next/server";
import { validateCoupon } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code) {
      return NextResponse.json({ valid: false, message: "Coupon code is required" }, { status: 400 });
    }

    const result = await validateCoupon(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/coupons/validate error:", error);
    return NextResponse.json({ valid: false, message: "Error validating coupon" }, { status: 500 });
  }
}
