export interface SeedCategory {
  name: string;
  slug: string;
  icon: string;
  image: string;
  description: string;
  productCount: number;
  isFeatured: boolean;
  displayOrder: number;
}

export interface SeedProduct {
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  price: number;
  punePrice?: number;
  outsidePunePrice?: number;
  originalPrice: number;
  discountPercent: number;
  rating: string;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  shortDescription: string;
  highlights: string[];
  usageInstructions: string;
  specifications: Record<string, string>;
  volumeSize?: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isDealOfTheDay?: boolean;
  isHairCareHero?: boolean;
  isSkincareBestseller?: boolean;
  isSalonPro?: boolean;
  tags: string[];
}

export const CATEGORIES_DATA: SeedCategory[] = [
  {
    name: "Haircare",
    slug: "haircare",
    icon: "Sparkles",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    description: "",
    productCount: 48,
    isFeatured: true,
    displayOrder: 1,
  },
  {
    name: "Skincare & Bodycare",
    slug: "skincare",
    icon: "HeartHandshake",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    description: "",
    productCount: 42,
    isFeatured: true,
    displayOrder: 2,
  },
  {
    name: "Machineries & Tools",
    slug: "machineries",
    icon: "Zap",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    description: "",
    productCount: 30,
    isFeatured: true,
    displayOrder: 3,
  },
  {
    name: "Salon Accessories",
    slug: "accessories",
    icon: "Scissors",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    description: "",
    productCount: 26,
    isFeatured: true,
    displayOrder: 4,
  },
  {
    name: "Salon Furniture",
    slug: "furniture",
    icon: "Armchair",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    description: "",
    productCount: 14,
    isFeatured: true,
    displayOrder: 5,
  },
  {
    name: "Salon Disposables",
    slug: "disposable",
    icon: "Layers",
    image:
      "https://images.unsplash.com/photo-1608248597359-20f592534579?w=800&q=80",
    description: "",
    productCount: 20,
    isFeatured: true,
    displayOrder: 6,
  },
  {
    name: "Hair Color & Developers",
    slug: "hair-color",
    icon: "Palette",
    image:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    description: "",
    productCount: 35,
    isFeatured: true,
    displayOrder: 7,
  },
  {
    name: "Salon Combos & Bulk Packs",
    slug: "salon-combos",
    icon: "PackageCheck",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
    description: "",
    productCount: 18,
    isFeatured: true,
    displayOrder: 8,
  },
];

// Demo / mock product data has been removed in favor of live Firebase Firestore products
export const BASE_PRODUCTS_DATA: SeedProduct[] = [];

export const PRODUCTS_DATA: SeedProduct[] = [];

export const BLOG_POSTS_DATA = [
  {
    slug: "top-10-salon-hair-colors-for-indian-hair",
    title: "Top 10 Salon Professional Hair Colors for Indian Hair in 2026",
    excerpt:
      "Discover the best shades and developer ratios from L'Oréal Majirel, Schwarzkopf Igora, and Streax Argan Secrets for rich grey coverage and vibrant undertones.",
    content:
      "When selecting professional hair colors for Indian hair textures, stylists need formulations with deep pigment deposits, low ammonia damage, and conditioning agents like Argan oil and Ionène G. In this guide, we break down top-performing shades from L'Oréal Majirel 1 and 7.3, Schwarzkopf Igora Zero AMM, and Streax Pro Argan Secrets...",
    coverImage:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    category: "Hair Care Trends",
    author: "PureCuts Hair Artistry Team",
    readTime: "4 min read",
  },
  {
    slug: "how-to-choose-the-best-barber-clipper-wahl-vs-ikonic-vs-vgr",
    title: "How to Choose the Best Barber Clipper: Wahl vs Ikonic vs VGR",
    excerpt:
      "A comprehensive breakdown of motor types, blade geometry, battery runtime, and blade heat management for barbershop professionals.",
    content:
      "A reliable hair clipper is the backbone of every barber station. While Wahl Super Taper remains the time-tested standard for all-day continuous clipping with its V5000 electromagnetic motor, cordless tools like the Wahl Cordless Magic Clip and VGR V-901 Metal Housing offer unprecedented ergonomic flexibility...",
    coverImage:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    category: "Salon Tools & Equipment",
    author: "Master Barber Rahul Joshi",
    readTime: "5 min read",
  },
  {
    slug: "the-ultimate-salon-facial-protocol-with-dr-rashel-and-vlcc",
    title: "The Ultimate Salon Facial Protocol with Dr. Rashel and VLCC",
    excerpt:
      "Step-by-step masterclass on combining exfoliating scrubs, whitening creams, and tightening packs to deliver an instant glass-skin bridal glow.",
    content:
      "Delivering a salon facial that produces visible radiance requires an orderly 5-step methodology: Double Cleansing with VLCC Serum Face Wash, Micro-dermabrasion using Dr. Rashel Orange or Papaya scrub, deep dermal massage with Dr. Rashel Pearl Cream, followed by tightening clay mask and hydration sealing...",
    coverImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    category: "Skincare Masterclass",
    author: "Pooja Deshmukh (Lead Esthetician)",
    readTime: "6 min read",
  },
];

export const COUPONS_DATA = [
  {
    code: "PURECUTS10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 300,
    description: "Get 10% OFF on all orders above ₹499 (Max ₹300)",
    isActive: true,
  },
  {
    code: "SALONPRO20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 2500,
    maxDiscount: 1000,
    description:
      "Special 20% OFF for Salon Owners on orders above ₹2,500 (Max ₹1000)",
    isActive: true,
  },
  {
    code: "FIRST50",
    discountType: "flat",
    discountValue: 50,
    minOrderValue: 299,
    maxDiscount: 50,
    description: "Flat ₹50 OFF on your first PureCuts purchase",
    isActive: true,
  },
];
