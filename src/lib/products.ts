import { db, isDbConnected } from "@/db";
import { products, categories, orders, reviews, blogPosts, coupons, b2bInquiries } from "@/db/schema";
import { eq, ilike, and, gte, lte, desc, asc, or, count, inArray, sql } from "drizzle-orm";
import { Product, Category, FilterOptions, BlogPost, Coupon, Review, Order, Brand } from "./types";
import { CATEGORIES_DATA, BLOG_POSTS_DATA, COUPONS_DATA } from "@/db/seed-data";
import { seedDatabase } from "@/db/seed";
import {
  fetchAllProductsFromFirebase,
  fetchProductsByCategoryFromFirebase,
  fetchCategoriesFromFirebase,
  fetchBrandsFromFirebase,
  FALLBACK_BRANDS,
  fetchProductBySlug as fetchFirebaseProductBySlug,
} from "./firebaseProducts";
import { isFirebaseConfigured } from "./firebase";

let hasInitialized = false;


export async function ensureDbInitialized() {
  if (hasInitialized || !isDbConnected) return;
  try {
    const existingCount = await db.select({ val: count() }).from(categories);
    if (existingCount[0].val === 0) {
      await seedDatabase();
    }
    hasInitialized = true;
  } catch (err) {
    console.error("ensureDbInitialized error:", err);
  }
}

export async function getCategories(): Promise<Category[]> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db.select().from(categories).orderBy(asc(categories.displayOrder));
      if (rows.length > 0) return rows as Category[];
    } catch (err) {
      console.error("getCategories db error:", err);
    }
  }

  if (isFirebaseConfigured) {
    try {
      const fbCats = await fetchCategoriesFromFirebase();
      if (fbCats && fbCats.length > 0) return fbCats as Category[];
    } catch (err) {
      console.warn("getCategories Firebase error, using fallback:", err);
    }
  }

  return CATEGORIES_DATA.map((c, i) => ({
    id: i + 1,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    image: c.image,
    description: c.description,
    productCount: c.productCount,
    isFeatured: c.isFeatured,
    displayOrder: c.displayOrder,
  }));
}

export async function getBrands(): Promise<Brand[]> {
  if (isFirebaseConfigured) {
    try {
      const fbBrands = await fetchBrandsFromFirebase();
      if (fbBrands && fbBrands.length > 0) return fbBrands;
    } catch (err) {
      console.warn("getBrands Firebase error, using fallback:", err);
    }
  }

  return FALLBACK_BRANDS;
}

export async function getProducts(options: FilterOptions = {}): Promise<{
  products: Product[];
  total: number;
  brands: { name: string; count: number }[];
  categories: { name: string; slug: string; count: number }[];
}> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();

      const conditions = [];

      if (options.category && options.category !== "all") {
        if (options.category === "hair-color") {
          conditions.push(or(eq(products.categorySlug, "hair-color"), eq(products.subcategorySlug, "hair-color")));
        } else {
          conditions.push(eq(products.categorySlug, options.category));
        }
      }

      if (options.subcategory && options.subcategory !== "all") {
        conditions.push(eq(products.subcategorySlug, options.subcategory));
      }

      if (options.brand && options.brand !== "all") {
        conditions.push(eq(products.brand, options.brand));
      }

      if (options.minPrice !== undefined && options.minPrice > 0) {
        conditions.push(gte(products.price, options.minPrice));
      }

      if (options.maxPrice !== undefined && options.maxPrice < 50000) {
        conditions.push(lte(products.price, options.maxPrice));
      }

      if (options.inStockOnly) {
        conditions.push(eq(products.inStock, true));
      }

      if (options.salonProOnly) {
        conditions.push(eq(products.isSalonPro, true));
      }

      if (options.isDeal) {
        conditions.push(eq(products.isDealOfTheDay, true));
      }

      if (options.isHero) {
        conditions.push(eq(products.isHairCareHero, true));
      }

      if (options.search && options.search.trim()) {
        const terms = options.search.trim().split(/\s+/).filter(Boolean);
        const termConditions = terms.map((term) => {
          const pattern = `%${term}%`;
          return or(
            ilike(products.name, pattern),
            ilike(products.brand, pattern),
            ilike(products.category, pattern),
            ilike(products.subcategory, pattern),
            ilike(products.shortDescription, pattern),
            ilike(products.description, pattern),
            sql`${products.tags}::text ILIKE ${pattern}`
          );
        });

        if (termConditions.length > 0) {
          conditions.push(and(...termConditions));
        }
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      let orderByClause = desc(products.isFeatured);
      if (options.sortBy === "price-asc") {
        orderByClause = asc(products.price);
      } else if (options.sortBy === "price-desc") {
        orderByClause = desc(products.price);
      } else if (options.sortBy === "rating") {
        orderByClause = desc(products.rating);
      } else if (options.sortBy === "discount") {
        orderByClause = desc(products.discountPercent);
      } else if (options.sortBy === "newest") {
        orderByClause = desc(products.createdAt);
      }

      const limit = options.limit || 24;
      const page = options.page || 1;
      const offset = (page - 1) * limit;

      let query = db.select().from(products);
      if (whereClause) {
        // @ts-ignore
        query = query.where(whereClause);
      }

      const rows = await query.orderBy(orderByClause).limit(limit).offset(offset);

      // Get counts for brands & categories facet
      const allProducts = await db.select({
        brand: products.brand,
        category: products.category,
        categorySlug: products.categorySlug,
      }).from(products);

      const brandMap = new Map<string, number>();
      const catMap = new Map<string, { name: string; slug: string; count: number }>();

      for (const p of allProducts) {
        brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
        const existing = catMap.get(p.categorySlug);
        if (existing) {
          existing.count += 1;
        } else {
          catMap.set(p.categorySlug, { name: p.category, slug: p.categorySlug, count: 1 });
        }
      }

      const brandsList = Array.from(brandMap.entries()).map(([name, count]) => ({ name, count }));
      const categoriesList = Array.from(catMap.values());

      return {
        products: rows as Product[],
        total: rows.length,
        brands: brandsList,
        categories: categoriesList,
      };
    } catch (err) {
      console.error("getProducts db error, returning static fallback:", err);
    }
  }

  // 1. Fetch from Firestore backend by category if Firebase is configured
  let sourceProducts: Product[] = [];
  if (isFirebaseConfigured) {
    try {
      sourceProducts = await fetchProductsByCategoryFromFirebase(options.category || "all");
    } catch (fbErr) {
      console.warn("Firestore fetch error, falling back to local dataset:", fbErr);
    }
  }

  if (!sourceProducts) {
    sourceProducts = [];
  }

  let filtered = [...sourceProducts];

  if (options.subcategory && options.subcategory !== "all") {
    filtered = filtered.filter((p) => p.subcategorySlug === options.subcategory);
  }

  if (options.brand && options.brand !== "all") {
    const brandLower = options.brand.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.brand.toLowerCase() === brandLower ||
        p.brand.toLowerCase().includes(brandLower) ||
        brandLower.includes(p.brand.toLowerCase())
    );
  }


  if (options.minPrice !== undefined && options.minPrice > 0) {
    filtered = filtered.filter((p) => p.price >= (options.minPrice ?? 0));
  }

  if (options.maxPrice !== undefined && options.maxPrice < 50000) {
    filtered = filtered.filter((p) => p.price <= (options.maxPrice ?? 50000));
  }

  if (options.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  if (options.salonProOnly) {
    filtered = filtered.filter((p) => p.isSalonPro);
  }

  if (options.search && options.search.trim()) {
    const terms = options.search.toLowerCase().trim().split(/\s+/).filter(Boolean);
    filtered = filtered.filter((p) => {
      const tagsStr = Array.isArray(p.tags) ? p.tags.join(" ") : (p.tags || "");
      const fullText = `${p.name} ${p.brand} ${p.category} ${p.subcategory || ""} ${tagsStr} ${p.description || ""} ${p.shortDescription || ""}`.toLowerCase();
      return terms.every((t) => fullText.includes(t));
    });
  }

  if (options.isDeal) {
    filtered = filtered.filter((p) => p.isDealOfTheDay);
  }

  if (options.isHero) {
    filtered = filtered.filter((p) => p.isHairCareHero);
  }

  // Sorting
  if (options.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (options.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (options.sortBy === "rating") {
    filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  } else if (options.sortBy === "discount") {
    filtered.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
  }

  const facetProducts: Product[] = isFirebaseConfigured
    ? (options.category && options.category !== "all" && sourceProducts.length > 0
        ? sourceProducts
        : await fetchAllProductsFromFirebase())
    : sourceProducts;

  const brandMap = new Map<string, number>();
  const catMap = new Map<string, { name: string; slug: string; count: number }>();
  facetProducts.forEach((p) => {
    if (p.brand) {
      brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
    }
    if (p.categorySlug) {
      const ex = catMap.get(p.categorySlug);
      if (ex) ex.count += 1;
      else catMap.set(p.categorySlug, { name: p.category, slug: p.categorySlug, count: 1 });
    }
  });

  const limit = options.limit || 24;
  const page = options.page || 1;
  const offset = (page - 1) * limit;
  const pagedProducts = filtered.slice(offset, offset + limit);

  return {
    products: pagedProducts,
    total: filtered.length,
    brands: Array.from(brandMap.entries()).map(([name, count]) => ({ name, count })),
    categories: Array.from(catMap.values()),
  };
}


export async function getProductBySlug(slug: string): Promise<{
  product: Product | null;
  relatedProducts: Product[];
  reviews: Review[];
}> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);

      if (rows.length > 0) {
        const product = rows[0] as Product;

        // Get related products from same category
        const related = await db
          .select()
          .from(products)
          .where(eq(products.categorySlug, product.categorySlug))
          .limit(6);

        const filteredRelated = related.filter((p: any) => p.slug !== product.slug) as Product[];

        // Get reviews
        const prodReviews = await db
          .select()
          .from(reviews)
          .where(eq(reviews.productId, Number(product.id)))
          .orderBy(desc(reviews.createdAt));

        return {
          product,
          relatedProducts: filteredRelated,
          reviews: prodReviews as Review[],
        };
      }
    } catch (err) {
      console.error("getProductBySlug db error:", err);
    }
  }

  // Firebase Firestore check
  if (isFirebaseConfigured) {
    try {
      const fbProd = await fetchFirebaseProductBySlug(slug);
      if (fbProd) {
        const related = (await fetchProductsByCategoryFromFirebase(fbProd.categorySlug))
          .filter((p) => p.slug !== slug)
          .slice(0, 4);
        return {
          product: fbProd,
          relatedProducts: related,
          reviews: [
            {
              id: 1,
              productId: fbProd.id,
              userName: "Ananya Deshmukh (Stylist, Pune)",
              rating: 5,
              title: "Outstanding salon quality & original product",
              comment: "We have been buying supplies from PureCuts. 100% genuine product and very prompt delivery in Pune.",
              verifiedPurchase: true,
              createdAt: new Date(),
            },
          ],
        };
      }
    } catch (e) {
      console.warn("Firebase getProductBySlug error:", e);
    }
  }

  return { product: null, relatedProducts: [], reviews: [] };
}

export async function getHairCareHeroes(): Promise<Product[]> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.isHairCareHero, true))
        .limit(10);
      if (rows.length > 0) return rows as Product[];
    } catch (err) {
      console.error("getHairCareHeroes error:", err);
    }
  }

  if (isFirebaseConfigured) {
    try {
      const prods = await fetchProductsByCategoryFromFirebase("haircare");
      const heroes = prods.filter((p) => p.isHairCareHero);
      if (heroes.length > 0) return heroes;
      if (prods.length > 0) return prods.slice(0, 8);
    } catch (e) {
      console.warn("Firebase getHairCareHeroes error:", e);
    }
  }

  return [];
}

export async function getSkincareBestsellers(): Promise<Product[]> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.isSkincareBestseller, true))
        .limit(10);
      if (rows.length > 0) return rows as Product[];
    } catch (err) {
      console.error("getSkincareBestsellers error:", err);
    }
  }

  if (isFirebaseConfigured) {
    try {
      const prods = await fetchProductsByCategoryFromFirebase("skincare");
      const best = prods.filter((p) => p.isSkincareBestseller);
      if (best.length > 0) return best;
      if (prods.length > 0) return prods.slice(0, 8);
    } catch (e) {
      console.warn("Firebase getSkincareBestsellers error:", e);
    }
  }

  return [];
}

export async function getMachineries(): Promise<Product[]> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.categorySlug, "machineries"))
        .limit(10);
      if (rows.length > 0) return rows as Product[];
    } catch (err) {
      console.error("getMachineries error:", err);
    }
  }

  if (isFirebaseConfigured) {
    try {
      const prods = await fetchProductsByCategoryFromFirebase("machineries");
      if (prods.length > 0) return prods.slice(0, 8);
    } catch (e) {
      console.warn("Firebase getMachineries error:", e);
    }
  }

  return [];
}

export async function getDealsOfTheDay(): Promise<Product[]> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.isDealOfTheDay, true))
        .limit(8);
      if (rows.length > 0) return rows as Product[];
    } catch (err) {
      console.error("getDealsOfTheDay error:", err);
    }
  }

  if (isFirebaseConfigured) {
    try {
      const all = await fetchProductsByCategoryFromFirebase("all");
      const deals = all.filter((p) => p.isDealOfTheDay);
      if (deals.length > 0) return deals.slice(0, 8);
    } catch (e) {
      console.warn("Firebase getDealsOfTheDay error:", e);
    }
  }

  return [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
      if (rows.length > 0) return rows as BlogPost[];
    } catch (err) {
      console.error("getBlogPosts error:", err);
    }
  }
  return BLOG_POSTS_DATA.map((b, i) => ({
    id: i + 1,
    ...b,
    publishedAt: new Date(),
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isDbConnected) {
    try {
      await ensureDbInitialized();
      const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
      if (rows.length > 0) return rows[0] as BlogPost;
    } catch (err) {
      console.error("getBlogPostBySlug error:", err);
    }
  }
  const found = BLOG_POSTS_DATA.find((b) => b.slug === slug);
  if (found) {
    return { id: 1, ...found, publishedAt: new Date() };
  }
  return null;
}


export async function validateCoupon(code: string, subtotal: number): Promise<{
  valid: boolean;
  discount: number;
  message: string;
  coupon?: Coupon;
}> {
  const normalized = code.trim().toUpperCase();
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(coupons).where(eq(coupons.code, normalized)).limit(1);
    if (rows.length > 0) {
      const c = rows[0] as Coupon;
      if (!c.isActive) {
        return { valid: false, discount: 0, message: "This coupon is no longer active." };
      }
      if (subtotal < c.minOrderValue) {
        return {
          valid: false,
          discount: 0,
          message: `Minimum order value for ${c.code} is ₹${c.minOrderValue}`,
        };
      }
      let discount = 0;
      if (c.discountType === "percentage") {
        discount = Math.min(Math.round((subtotal * c.discountValue) / 100), c.maxDiscount);
      } else {
        discount = Math.min(c.discountValue, subtotal);
      }
      return {
        valid: true,
        discount,
        message: `Coupon ${c.code} applied! You saved ₹${discount}`,
        coupon: c,
      };
    }
  } catch (err) {
    console.error("validateCoupon error:", err);
  }

  // Fallback
  const fallback = COUPONS_DATA.find((c) => c.code === normalized);
  if (fallback) {
    if (subtotal < fallback.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order value for ${fallback.code} is ₹${fallback.minOrderValue}`,
      };
    }
    let discount = 0;
    if (fallback.discountType === "percentage") {
      discount = Math.min(Math.round((subtotal * fallback.discountValue) / 100), fallback.maxDiscount);
    } else {
      discount = Math.min(fallback.discountValue, subtotal);
    }
    return {
      valid: true,
      discount,
      message: `Coupon ${fallback.code} applied! You saved ₹${discount}`,
    };
  }

  return { valid: false, discount: 0, message: "Invalid coupon code." };
}
