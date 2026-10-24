// src/lib/firebaseProducts.ts
import { collection, getDocs, doc, setDoc, query, where, getDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Product, ProductVariant, Category, FilterOptions } from "./types";
import { PRODUCTS_DATA, CATEGORIES_DATA } from "@/db/seed-data";

const PRODUCTS_COLLECTION = "products";
const CATEGORIES_COLLECTION = "categories";

// Simple slug generator
export function slugify(text: string): string {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Normalizes live Firestore category names to clean URL category slugs
 */
export function normalizeCategorySlug(categoryName?: string | null): string {
  if (!categoryName) return "all";
  const lower = categoryName.toLowerCase().trim();
  if (lower.includes("hair")) return "haircare";
  if (lower.includes("skin") || lower.includes("face") || lower.includes("body")) return "skincare";
  if (lower.includes("machin")) return "machineries";
  if (lower.includes("accessor")) return "accessories";
  if (lower.includes("furnitur")) return "furniture";
  if (lower.includes("dispos")) return "disposable";
  if (lower.includes("groom") || lower.includes("men")) return "mens-grooming";
  if (lower.includes("combo") || lower.includes("pack") || lower.includes("bulk")) return "salon-combos";
  return slugify(lower);
}

/**
 * Converts a raw Firestore product document into our strict Next.js Product interface
 * Guarantees NO Firestore Timestamps or functions are passed to Client Components.
 */
export function parseFirestoreProduct(data: any, docId: string, index: number): Product {
  const customerPrice = typeof data.sellingPrice === "number" && data.sellingPrice > 0
    ? data.sellingPrice
    : (typeof data.price === "number" ? data.price : (typeof data.salePrice === "number" && data.salePrice > 0 ? data.salePrice : 0));

  const originalPrice = typeof data.originalPrice === "number" && data.originalPrice > 0
    ? data.originalPrice
    : (customerPrice > 0 ? Math.round(customerPrice * 1.15) : 0);

  const discountPercent = originalPrice > customerPrice && originalPrice > 0
    ? Math.round(((originalPrice - customerPrice) / originalPrice) * 100)
    : (typeof data.discountPercent === "number" ? data.discountPercent : null);

  // 3-Tier Wholesale Pricing
  const salonPunePrice = typeof data.salonPunePrice === "number" && data.salonPunePrice > 0
    ? data.salonPunePrice
    : (typeof data.costPrice === "number" && data.costPrice > 0
        ? Math.max(data.costPrice, Math.round(customerPrice * 0.75))
        : Math.round(customerPrice * 0.75));

  const salonOutsidePunePrice = typeof data.salonOutsidePunePrice === "number" && data.salonOutsidePunePrice > 0
    ? data.salonOutsidePunePrice
    : Math.round(customerPrice * 0.82);

  const name = String(data.name || data.title || docId);
  const rawCategory = String(data.category || "");
  const categorySlug = normalizeCategorySlug(rawCategory);

  const rawSubcategory = data.subCategory || data.subcategory || null;
  const subcategory = rawSubcategory ? String(rawSubcategory) : null;
  const subcategorySlug = subcategory ? slugify(subcategory) : null;

  // Image extraction with multiple fallbacks
  const image = String(
    data.imageUrl ||
    data.image ||
    data.thumbnailUrl ||
    data.thumbnail ||
    data.thumb ||
    (Array.isArray(data.images) && data.images[0]) ||
    ""
  );

  const galleryImages: string[] = Array.isArray(data.images) && data.images.length > 0
    ? data.images.map(String)
    : (image ? [image] : []);

  // Highlights extraction
  const highlights: string[] = Array.isArray(data.highlights)
    ? data.highlights.map(String)
    : (typeof data.highlights === "string"
        ? data.highlights.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : []);

  const tags: string[] = Array.isArray(data.tags)
    ? data.tags.map(String)
    : [];

  const rawDesc = String(data.description || "");
  const shortDesc = data.shortDescription
    ? String(data.shortDescription)
    : (rawDesc ? (rawDesc.length > 150 ? rawDesc.slice(0, 150) + "..." : rawDesc) : null);

  const usage = data.howToUse || data.how_to_use || data.usage || null;
  const rating = data.rating && Number(data.rating) > 0 ? String(data.rating) : "4.8";
  const stock = typeof data.stock === "number" ? data.stock : 50;
  const inStock = data.manageStock ? (stock > 0) : (data.status !== "inactive" && data.visibility !== "draft");

  // Parse product variants if available
  let variants: ProductVariant[] | null = null;
  if (Array.isArray(data.variants) && data.variants.length > 0) {
    variants = data.variants.map((v: any, vIdx: number) => {
      const vPrice = typeof v.price === "number" && v.price > 0
        ? v.price
        : (typeof v.salePrice === "number" && v.salePrice > 0 ? v.salePrice : customerPrice);

      const vOrigPrice = typeof v.originalPrice === "number" && v.originalPrice > 0
        ? v.originalPrice
        : (typeof v.regularPrice === "number" && v.regularPrice > 0
            ? v.regularPrice
            : (vPrice > 0 ? Math.round(vPrice * 1.15) : originalPrice));

      const vSellingPrice = typeof v.sellingPrice === "number" && v.sellingPrice > 0
        ? v.sellingPrice
        : vPrice;

      const vCostPrice = typeof v.costPrice === "number" && v.costPrice > 0
        ? v.costPrice
        : (typeof v.cost === "number" ? v.cost : undefined);

      const vSalonPunePrice = typeof v.salonPunePrice === "number" && v.salonPunePrice > 0
        ? v.salonPunePrice
        : (vCostPrice ? Math.max(vCostPrice, Math.round(vPrice * 0.75)) : Math.round(vPrice * 0.75));

      const vSalonOutsidePunePrice = typeof v.salonOutsidePunePrice === "number" && v.salonOutsidePunePrice > 0
        ? v.salonOutsidePunePrice
        : Math.round(vPrice * 0.82);

      const vStock = typeof v.stock === "number" ? v.stock : stock;
      const vInStock = typeof v.inStock === "boolean"
        ? v.inStock
        : (data.manageStock ? vStock > 0 : true);

      const vName = String(v.name || v.shadeName || v.value || `Option ${vIdx + 1}`).trim();
      const vId = String(v.id || `${slugify(vName)}-${vIdx}`);

      return {
        id: vId,
        name: vName,
        value: v.value ? String(v.value) : vName,
        attribute: v.attribute ? String(v.attribute) : undefined,
        sku: v.sku ? String(v.sku) : undefined,
        price: vPrice,
        originalPrice: vOrigPrice,
        sellingPrice: vSellingPrice,
        costPrice: vCostPrice,
        salonPunePrice: vSalonPunePrice,
        salonOutsidePunePrice: vSalonOutsidePunePrice,
        stock: vStock,
        inStock: vInStock,
        image: v.image && typeof v.image === "string" && v.image.trim().length > 0 ? v.image.trim() : undefined,
        colorCode: v.colorCode && typeof v.colorCode === "string" ? v.colorCode.trim() : undefined,
        shadeName: v.shadeName ? String(v.shadeName) : undefined,
      };
    });
  }

  // Stable slug without non-alphanumeric chars
  const baseSlug = slugify(name);
  const slug = data.slug ? String(data.slug) : `${baseSlug}-${docId.slice(0, 8)}`;

  return {
    id: docId,
    slug,
    name,
    brand: String(data.brand || "PureCuts"),
    category: rawCategory || "General",
    categorySlug,
    subcategory,
    subcategorySlug,
    price: customerPrice,
    customerPrice,
    salonPunePrice,
    salonOutsidePunePrice,
    punePrice: salonPunePrice,
    outsidePunePrice: customerPrice,
    originalPrice,
    discountPercent,
    rating,
    reviewCount: typeof data.reviews === "number" ? data.reviews : 24,
    stock,
    inStock,
    image,
    galleryImages,
    description: rawDesc,
    shortDescription: shortDesc,
    highlights,
    usageInstructions: usage ? String(usage) : null,
    specifications: data.specifications && typeof data.specifications === "object" ? data.specifications : {},
    volumeSize: data.size || data.unit || data.volumeSize || null,
    variants: variants && variants.length > 0 ? variants : null,
    isFeatured: Boolean(data.isPopular || data.showInPopularProducts || data.isFeatured),
    isBestseller: Boolean(data.showInMostBought || data.isBestseller),
    isDealOfTheDay: Boolean(data.showInHotDeals || data.onSale || data.isDealOfTheDay),
    isHairCareHero: Boolean(categorySlug === "haircare" && (data.isPopular || data.showInRecommendedSalon)),
    isSkincareBestseller: Boolean(categorySlug === "skincare" && (data.isPopular || data.showInMostBought)),
    isSalonPro: Boolean(data.showInRecommendedSalon || data.pricingTiers?.length > 0 || true),
    tags,
  };
}

/**
 * Transforms raw seed product into our 3-tier Firestore product schema (for fallback)
 */
export function formatProductForFirestore(seed: any, index: number): Product {
  const customerPrice = seed.price;
  const salonPunePrice = seed.salonPunePrice ?? Math.round(seed.price * 0.75);
  const salonOutsidePunePrice = seed.salonOutsidePunePrice ?? Math.round(seed.price * 0.82);

  return {
    id: index + 1,
    slug: seed.slug,
    name: seed.name,
    brand: seed.brand,
    category: seed.category,
    categorySlug: seed.categorySlug,
    subcategory: seed.subcategory || null,
    subcategorySlug: seed.subcategorySlug || null,
    price: customerPrice,
    customerPrice,
    salonPunePrice,
    salonOutsidePunePrice,
    punePrice: salonPunePrice,
    outsidePunePrice: customerPrice,
    originalPrice: seed.originalPrice || customerPrice,
    discountPercent: seed.discountPercent || null,
    rating: seed.rating || "4.8",
    reviewCount: seed.reviewCount || 24,
    stock: seed.stock || 50,
    inStock: seed.inStock ?? true,
    image: seed.image,
    galleryImages: seed.galleryImages || [],
    description: seed.description,
    shortDescription: seed.shortDescription || null,
    highlights: seed.highlights || [],
    usageInstructions: seed.usageInstructions || null,
    specifications: seed.specifications || {},
    volumeSize: seed.volumeSize || null,
    isFeatured: seed.isFeatured ?? false,
    isBestseller: seed.isBestseller ?? false,
    isDealOfTheDay: seed.isDealOfTheDay ?? false,
    isHairCareHero: seed.isHairCareHero ?? false,
    isSkincareBestseller: seed.isSkincareBestseller ?? false,
    isSalonPro: seed.isSalonPro ?? false,
    tags: seed.tags || [],
  };
}

export const FALLBACK_PRODUCTS: Product[] = PRODUCTS_DATA.map((p, i) =>
  formatProductForFirestore(p, i)
);

// In-memory cache for live Firestore products (refreshed every 60s)
let cachedProducts: Product[] | null = null;
let lastCacheTimestamp = 0;

/**
 * Fetches all products from Firestore, parsed and sanitized into plain objects
 */
export async function fetchAllProductsFromFirebase(): Promise<Product[]> {
  if (!db || !isFirebaseConfigured) {
    return FALLBACK_PRODUCTS;
  }

  const now = Date.now();
  if (cachedProducts && now - lastCacheTimestamp < 60000) {
    return cachedProducts;
  }

  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      return FALLBACK_PRODUCTS;
    }

    const products: Product[] = [];
    let idx = 0;
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // Skip inactive items
      if (data.status === "inactive" || data.visibility === "draft") return;
      products.push(parseFirestoreProduct(data, docSnap.id, idx++));
    });

    if (products.length > 0) {
      cachedProducts = products;
      lastCacheTimestamp = now;
      return products;
    }
  } catch (error) {
    console.error("Error reading products from Firebase Firestore:", error);
  }

  return FALLBACK_PRODUCTS;
}

/**
 * Fetches products from Firestore filtered by categorySlug
 */
export async function fetchProductsByCategoryFromFirebase(categorySlug: string): Promise<Product[]> {
  const all = await fetchAllProductsFromFirebase();

  if (!categorySlug || categorySlug === "all") {
    return all;
  }

  const targetSlug = normalizeCategorySlug(categorySlug);

  return all.filter((p) => {
    if (p.categorySlug === targetSlug) return true;
    if (targetSlug === "hair-color" && (p.categorySlug === "hair-color" || p.subcategorySlug === "hair-color")) return true;
    if (targetSlug === "skincare" && (p.categorySlug === "skincare" || p.categorySlug === "body-care" || p.categorySlug === "face-body-care")) return true;
    return false;
  });
}

/**
 * Fetches single product by slug or id from Firestore
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const all = await fetchAllProductsFromFirebase();
  return (
    all.find((p) => p.slug === slug || String(p.id) === slug || p.slug.startsWith(slug)) ||
    FALLBACK_PRODUCTS.find((p) => p.slug === slug) ||
    null
  );
}

/**
 * Fetches categories with real live product counts from Firestore
 */
export async function fetchCategoriesFromFirebase(): Promise<Category[]> {
  const prods = await fetchAllProductsFromFirebase();

  const counts: Record<string, number> = {};
  for (const p of prods) {
    counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
  }

  return [
    {
      id: 1,
      name: "Haircare",
      slug: "haircare",
      icon: "Sparkles",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      description: "Professional salon shampoos, conditioners, hair spa masques, and styling treatments.",
      productCount: counts["haircare"] || 0,
      isFeatured: true,
      displayOrder: 1,
    },
    {
      id: 2,
      name: "Skincare & Bodycare",
      slug: "skincare",
      icon: "HeartHandshake",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
      description: "Facial kits, de-tan scrubs, serums, cleansers, and salon body lotions.",
      productCount: counts["skincare"] || 0,
      isFeatured: true,
      displayOrder: 2,
    },
    {
      id: 3,
      name: "Machineries & Tools",
      slug: "machineries",
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      description: "Professional clippers, hair straighteners, salon dryers, steamers, and trimmers.",
      productCount: counts["machineries"] || 0,
      isFeatured: true,
      displayOrder: 3,
    },
    {
      id: 4,
      name: "Salon Accessories",
      slug: "accessories",
      icon: "Scissors",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
      description: "Carbon combs, tint bowls, section clips, spray mists, and neck strips.",
      productCount: counts["accessories"] || 0,
      isFeatured: true,
      displayOrder: 4,
    },
    {
      id: 5,
      name: "Men's Grooming",
      slug: "mens-grooming",
      icon: "UserCheck",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      description: "Beard grooming, shaving foams, men's trimmers, and styling wax.",
      productCount: counts["mens-grooming"] || 0,
      isFeatured: true,
      displayOrder: 5,
    },
    {
      id: 6,
      name: "Salon Furniture",
      slug: "furniture",
      icon: "Armchair",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      description: "Hydraulic styling chairs, facial massage beds, and salon washing stations.",
      productCount: counts["furniture"] || 0,
      isFeatured: true,
      displayOrder: 6,
    },
    {
      id: 7,
      name: "Salon Disposables",
      slug: "disposable",
      icon: "Layers",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
      description: "Nitrile gloves, bed rolls, disposable aprons, and hygienic towels.",
      productCount: counts["disposable"] || 0,
      isFeatured: true,
      displayOrder: 7,
    },
    {
      id: 8,
      name: "Salon Combos & Bulk",
      slug: "salon-combos",
      icon: "PackageCheck",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80",
      description: "Wholesale salon master kits, bulk product cartons, and salon combos.",
      productCount: counts["salon-combos"] || 0,
      isFeatured: true,
      displayOrder: 8,
    },
  ];
}

/**
 * Seeds products from seed-data.ts into Firestore with 3-tier pricing
 */
export async function seedProductsToFirestore(): Promise<{ count: number; success: boolean; message: string }> {
  if (!db || !isFirebaseConfigured) {
    return {
      count: 0,
      success: false,
      message: "Firebase is not configured. Please supply environment keys in .env.local first.",
    };
  }

  try {
    let uploaded = 0;
    for (let i = 0; i < PRODUCTS_DATA.length; i++) {
      const prod = formatProductForFirestore(PRODUCTS_DATA[i], i);
      const docRef = doc(db, PRODUCTS_COLLECTION, prod.slug);
      await setDoc(docRef, prod, { merge: true });
      uploaded++;
    }

    // Also seed categories
    for (let i = 0; i < CATEGORIES_DATA.length; i++) {
      const cat = CATEGORIES_DATA[i];
      const docRef = doc(db, CATEGORIES_COLLECTION, cat.slug);
      await setDoc(docRef, { ...cat, id: i + 1 }, { merge: true });
    }

    // Invalidate cache
    cachedProducts = null;

    return {
      count: uploaded,
      success: true,
      message: `Successfully seeded ${uploaded} products with 3-tier pricing into Firestore!`,
    };
  } catch (err: any) {
    console.error("Error seeding Firestore:", err);
    return {
      count: 0,
      success: false,
      message: err.message || "Failed to seed Firestore products",
    };
  }
}
