import React from "react";
import { getProductBySlug } from "@/lib/products";
import { ProductDetailView } from "@/components/ProductDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getProductBySlug(slug);
  if (!product) {
    return { title: "Product Not Found - PureCuts" };
  }
  return {
    title: `${product.name} - PureCuts Salon Marketplace`,
    description: product.shortDescription || product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { product, relatedProducts, reviews } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100/60 pb-16">
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        initialReviews={reviews}
      />
    </main>
  );
}
