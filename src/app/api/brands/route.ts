import { NextResponse } from "next/server";
import { getBrands } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json(brands);
  } catch (error) {
    console.error("API /api/brands error:", error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
