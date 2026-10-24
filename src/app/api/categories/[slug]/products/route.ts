import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const subcategory = searchParams.get("subcategory") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const search = searchParams.get("q") || undefined;
    const sortBy = (searchParams.get("sort") as any) || "featured";
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 100;
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    const data = await getProducts({
      category: slug === "all" ? undefined : slug,
      subcategory,
      brand,
      search,
      sortBy,
      limit,
      page,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("API /api/categories/[slug]/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products for category" }, { status: 500 });
  }
}
