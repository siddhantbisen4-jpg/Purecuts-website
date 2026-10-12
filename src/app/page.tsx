import React from "react";
import {
  getHairCareHeroes,
  getSkincareBestsellers,
  getMachineries,
  getDealsOfTheDay,
  getBlogPosts,
} from "@/lib/products";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryRail } from "@/components/CategoryRail";
import { DealsOfTheDay } from "@/components/DealsOfTheDay";
import { HairCareHeroes } from "@/components/HairCareHeroes";
import { SkincareBestsellers } from "@/components/SkincareBestsellers";
import { MachineriesSpotlight } from "@/components/MachineriesSpotlight";
import { BrandCarousel } from "@/components/BrandCarousel";
import { BulkSuppliesBanner } from "@/components/BulkSuppliesBanner";
import { WhyPureCuts } from "@/components/WhyPureCuts";
import { BlogHighlights } from "@/components/BlogHighlights";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [deals, hairHeroes, skincareHeroes, machineries, blogPosts] = await Promise.all([
    getDealsOfTheDay(),
    getHairCareHeroes(),
    getSkincareBestsellers(),
    getMachineries(),
    getBlogPosts(),
  ]);

  return (
    <main className="min-h-screen bg-slate-100/60 pb-12">
      {/* Dynamic Hero Promotional Carousel with Side Cards */}
      <HeroSlider />

      {/* Visual Category Rail */}
      <CategoryRail />

      {/* Deal of the Day / Flash Sale with Live Countdown */}
      {/*<DealsOfTheDay products={deals} />*/}

      {/* Hair Care Heroes (Matrix, L'Oréal, Schwarzkopf, Streax, Parachute) */}
      <HairCareHeroes products={hairHeroes} />

      {/* Skincare & Facial Cleanups (Dr. Rashel @ ₹109, VLCC, Lotus, Vel Aroma) */}
      <SkincareBestsellers products={skincareHeroes} />

      {/* Salon Machineries & Electricals (Ikonic, Wahl, VGR, Glista) */}
      <MachineriesSpotlight products={machineries} />

      {/* Shop by Brand Carousel */}
      <BrandCarousel />

      {/* Salon Disposables & B2B Cartons Strip */}
      <BulkSuppliesBanner />

      {/* Why Salons & Beauty Lovers Choose PureCuts 
      <WhyPureCuts />*/}

      {/* Blog Guides & Masterclasses 
      <BlogHighlights posts={blogPosts} />*/}
    </main>
  );
}


