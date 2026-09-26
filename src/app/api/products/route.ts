import { NextRequest, NextResponse } from "next/server";
import { getProducts, getCategories } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const subcategory = searchParams.get("subcategory") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const search = searchParams.get("q") || undefined;
    const sortBy = (searchParams.get("sort") as "featured" | "price-asc" | "price-desc" | "rating" | "discount" | "newest") || "featured";
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const inStockOnly = searchParams.get("inStock") === "true";
    const salonProOnly = searchParams.get("salonPro") === "true";
    const isDeal = searchParams.get("isDeal") === "true";
    const isHero = searchParams.get("isHero") === "true";
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 24;

    const data = await getProducts({
      category,
      subcategory,
      brand,
      search,
      sortBy,
      minPrice,
      maxPrice,
      inStockOnly,
      salonProOnly,
      isDeal,
      isHero,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("API /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
