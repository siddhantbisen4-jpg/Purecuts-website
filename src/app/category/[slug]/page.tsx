import React from "react";
import { getProducts, getCategories } from "@/lib/products";
import { CategoryCatalog } from "@/components/CategoryCatalog";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    q?: string;
    brand?: string;
    sort?: string;
    deal?: string;
    subcategory?: string;
    subsubcategory?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;

  const [productsData, categoriesList] = await Promise.all([
    getProducts({
      category: slug === "all" ? undefined : slug,
      subcategory: sParams.subcategory && sParams.subcategory !== "all" ? sParams.subcategory : undefined,
      search: sParams.q,
      brand: sParams.brand,
      sortBy: (sParams.sort as any) || "featured",
      isDeal: sParams.deal === "true",
      limit: 100,
    }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-slate-100/60 pb-16">
      <CategoryCatalog
        initialProducts={productsData.products}
        categories={categoriesList}
        currentCategorySlug={slug}
        brands={productsData.brands}
        initialSearch={sParams.q || ""}
        initialBrand={sParams.brand || ""}
        initialSort={sParams.sort || "featured"}
        initialDeal={sParams.deal === "true"}
        initialSubcategory={sParams.subcategory || "all"}
      />
    </main>
  );
}

