import { db } from "@/db";
import { products, categories, orders, reviews, blogPosts, coupons, b2bInquiries } from "@/db/schema";
import { eq, ilike, and, gte, lte, desc, asc, or, count, inArray } from "drizzle-orm";
import { Product, Category, FilterOptions, BlogPost, Coupon, Review, Order } from "./types";
import { PRODUCTS_DATA, CATEGORIES_DATA, BLOG_POSTS_DATA, COUPONS_DATA } from "@/db/seed-data";
import { seedDatabase } from "@/db/seed";

let hasInitialized = false;

export async function ensureDbInitialized() {
  if (hasInitialized) return;
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
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(categories).orderBy(asc(categories.displayOrder));
    if (rows.length > 0) return rows as Category[];
  } catch (err) {
    console.error("getCategories db error:", err);
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

export async function getProducts(options: FilterOptions = {}): Promise<{
  products: Product[];
  total: number;
  brands: { name: string; count: number }[];
  categories: { name: string; slug: string; count: number }[];
}> {
  try {
    await ensureDbInitialized();

    const conditions = [];

    if (options.category && options.category !== "all") {
      conditions.push(eq(products.categorySlug, options.category));
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
      const q = `%${options.search.trim()}%`;
      conditions.push(
        or(
          ilike(products.name, q),
          ilike(products.brand, q),
          ilike(products.category, q),
          ilike(products.description, q)
        )
      );
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
      // @ts-expect-error type override
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
    console.error("getProducts db error, returning static:", err);
    // Return filtered static products data
    let filtered = PRODUCTS_DATA.map((p, i) => ({
      id: i + 1,
      ...p,
      createdAt: new Date(),
    }));

    if (options.category && options.category !== "all") {
      filtered = filtered.filter((p) => p.categorySlug === options.category);
    }
    if (options.brand && options.brand !== "all") {
      filtered = filtered.filter((p) => p.brand.toLowerCase() === options.brand?.toLowerCase());
    }
    if (options.search) {
      const q = options.search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (options.isDeal) {
      filtered = filtered.filter((p) => p.isDealOfTheDay);
    }
    if (options.isHero) {
      filtered = filtered.filter((p) => p.isHairCareHero);
    }

    const brandMap = new Map<string, number>();
    const catMap = new Map<string, { name: string; slug: string; count: number }>();
    PRODUCTS_DATA.forEach((p) => {
      brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
      const ex = catMap.get(p.categorySlug);
      if (ex) ex.count += 1;
      else catMap.set(p.categorySlug, { name: p.category, slug: p.categorySlug, count: 1 });
    });

    return {
      products: filtered as Product[],
      total: filtered.length,
      brands: Array.from(brandMap.entries()).map(([name, count]) => ({ name, count })),
      categories: Array.from(catMap.values()),
    };
  }
}

export async function getProductBySlug(slug: string): Promise<{
  product: Product | null;
  relatedProducts: Product[];
  reviews: Review[];
}> {
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

      const filteredRelated = related.filter((p) => p.slug !== product.slug) as Product[];

      // Get reviews
      const prodReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.productId, product.id))
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

  // Fallback
  const found = PRODUCTS_DATA.find((p) => p.slug === slug);
  if (found) {
    const product: Product = {
      id: 1,
      ...found,
      createdAt: new Date(),
    };
    const related = PRODUCTS_DATA
      .filter((p) => p.categorySlug === found.categorySlug && p.slug !== found.slug)
      .slice(0, 4)
      .map((p, i) => ({ id: i + 2, ...p, createdAt: new Date() }));

    return {
      product,
      relatedProducts: related as Product[],
      reviews: [
        {
          id: 1,
          productId: 1,
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

  return { product: null, relatedProducts: [], reviews: [] };
}

export async function getHairCareHeroes(): Promise<Product[]> {
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
  return PRODUCTS_DATA.filter((p) => p.isHairCareHero).map((p, i) => ({
    id: i + 1,
    ...p,
    createdAt: new Date(),
  })) as Product[];
}

export async function getSkincareBestsellers(): Promise<Product[]> {
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
  return PRODUCTS_DATA.filter((p) => p.isSkincareBestseller).map((p, i) => ({
    id: i + 1,
    ...p,
    createdAt: new Date(),
  })) as Product[];
}

export async function getMachineries(): Promise<Product[]> {
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
  return PRODUCTS_DATA.filter((p) => p.categorySlug === "machineries").map((p, i) => ({
    id: i + 1,
    ...p,
    createdAt: new Date(),
  })) as Product[];
}

export async function getDealsOfTheDay(): Promise<Product[]> {
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
  return PRODUCTS_DATA.filter((p) => p.isDealOfTheDay).map((p, i) => ({
    id: i + 1,
    ...p,
    createdAt: new Date(),
  })) as Product[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
    if (rows.length > 0) return rows as BlogPost[];
  } catch (err) {
    console.error("getBlogPosts error:", err);
  }
  return BLOG_POSTS_DATA.map((b, i) => ({
    id: i + 1,
    ...b,
    publishedAt: new Date(),
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (rows.length > 0) return rows[0] as BlogPost;
  } catch (err) {
    console.error("getBlogPostBySlug error:", err);
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
