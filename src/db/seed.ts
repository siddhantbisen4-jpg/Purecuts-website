import { db } from "./index";
import { categories, products, blogPosts, coupons, reviews } from "./schema";
import { CATEGORIES_DATA, PRODUCTS_DATA, BLOG_POSTS_DATA, COUPONS_DATA } from "./seed-data";
import { count } from "drizzle-orm";

export async function seedDatabase() {
  try {
    const existingCount = await db.select({ val: count() }).from(categories);
    if (existingCount[0].val > 0) {
      console.log("Database already seeded with categories.");
      return;
    }

    console.log("Seeding categories...");
    await db.insert(categories).values(
      CATEGORIES_DATA.map((c) => ({
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        image: c.image,
        description: c.description,
        productCount: c.productCount,
        isFeatured: c.isFeatured,
        displayOrder: c.displayOrder,
      }))
    );

    console.log("Seeding products...");
    for (const p of PRODUCTS_DATA) {
      const inserted = await db.insert(products).values({
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        category: p.category,
        categorySlug: p.categorySlug,
        subcategory: p.subcategory,
        subcategorySlug: p.subcategorySlug,
        price: p.price,
        originalPrice: p.originalPrice,
        discountPercent: p.discountPercent,
        rating: p.rating,
        reviewCount: p.reviewCount,
        stock: p.stock,
        inStock: p.inStock,
        image: p.image,
        galleryImages: p.galleryImages,
        description: p.description,
        shortDescription: p.shortDescription,
        highlights: p.highlights,
        usageInstructions: p.usageInstructions,
        specifications: p.specifications,
        volumeSize: p.volumeSize,
        isFeatured: p.isFeatured ?? false,
        isBestseller: p.isBestseller ?? false,
        isDealOfTheDay: p.isDealOfTheDay ?? false,
        isHairCareHero: p.isHairCareHero ?? false,
        isSkincareBestseller: p.isSkincareBestseller ?? false,
        isSalonPro: p.isSalonPro ?? false,
        tags: p.tags,
      }).returning({ id: products.id });

      // Add sample reviews for products
      const prodId = inserted[0]?.id;
      if (prodId) {
        await db.insert(reviews).values([
          {
            productId: prodId,
            userName: "Pooja Sharma (Salon Stylist, Pune)",
            rating: 5,
            title: "100% Genuine product, fast Pune delivery",
            comment: "We order regular stock for our salon from PureCuts. The product is authentic, packaging was sealed, and reached Wagholi in 24 hours. Highly recommended!",
            verifiedPurchase: true,
          },
          {
            productId: prodId,
            userName: "Amit Verma (Unisex Salon Owner)",
            rating: 5,
            title: "Best wholesale rate and original guarantee",
            comment: "Getting salon-grade quality at such competitive prices directly with GST billing. Very happy with PureCuts service.",
            verifiedPurchase: true,
          },
        ]);
      }
    }

    console.log("Seeding blog posts...");
    for (const b of BLOG_POSTS_DATA) {
      await db.insert(blogPosts).values({
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        coverImage: b.coverImage,
        category: b.category,
        author: b.author,
        readTime: b.readTime,
      });
    }

    console.log("Seeding coupons...");
    for (const cp of COUPONS_DATA) {
      await db.insert(coupons).values({
        code: cp.code,
        discountType: cp.discountType,
        discountValue: cp.discountValue,
        minOrderValue: cp.minOrderValue,
        maxDiscount: cp.maxDiscount,
        description: cp.description,
        isActive: cp.isActive,
      });
    }

    console.log("Database successfully seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
