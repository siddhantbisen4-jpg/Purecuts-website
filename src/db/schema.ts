import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  image: text("image"),
  description: text("description"),
  productCount: integer("product_count").default(0),
  isFeatured: boolean("is_featured").default(false),
  displayOrder: integer("display_order").default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  slug: text("slug").notNull().unique(),

  name: text("name").notNull(),

  brand: text("brand").notNull(),

  category: text("category").notNull(),

  categorySlug: text("category_slug").notNull(),

  subcategory: text("subcategory"),

  subcategorySlug: text("subcategory_slug"),

  // Base product price.
  // Pune/outside-Pune pricing is handled by src/lib/pricing.ts
  // using the customer's region.
  price: integer("price").notNull(),

  originalPrice: integer("original_price").notNull(),

  discountPercent: integer("discount_percent").default(0),

  rating: numeric("rating", {
    precision: 3,
    scale: 1,
  }).default("4.5"),

  reviewCount: integer("review_count").default(12),

  stock: integer("stock").default(50),

  inStock: boolean("in_stock").default(true),

  image: text("image").notNull(),

  galleryImages: jsonb("gallery_images")
    .$type<string[]>()
    .default([]),

  description: text("description").notNull(),

  shortDescription: text("short_description"),

  highlights: jsonb("highlights")
    .$type<string[]>()
    .default([]),

  usageInstructions: text("usage_instructions"),

  specifications: jsonb("specifications")
    .$type<Record<string, string>>()
    .default({}),

  volumeSize: text("volume_size"),

  isFeatured: boolean("is_featured").default(false),

  isBestseller: boolean("is_bestseller").default(false),

  isDealOfTheDay: boolean("is_deal_of_the_day").default(false),

  isHairCareHero: boolean("is_hair_care_hero").default(false),

  isSkincareBestseller: boolean("is_skincare_bestseller").default(false),

  isSalonPro: boolean("is_salon_pro").default(false),

  tags: jsonb("tags")
    .$type<string[]>()
    .default([]),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  orderNumber: text("order_number").notNull().unique(),

  customerName: text("customer_name").notNull(),

  customerEmail: text("customer_email").notNull(),

  customerPhone: text("customer_phone").notNull(),

  salonName: text("salon_name"),

  gstNumber: text("gst_number"),

  customerType: text("customer_type")
    .notNull()
    .default("GUEST"),

  udyamNumber: text("udyam_number"),

  addressLine: text("address_line").notNull(),

  city: text("city").notNull(),

  state: text("state").notNull(),

  pincode: text("pincode").notNull(),

  subtotal: integer("subtotal").notNull(),

  discount: integer("discount").default(0),

  couponCode: text("coupon_code"),

  deliveryFee: integer("delivery_fee").default(0),

  totalAmount: integer("total_amount").notNull(),

  paymentMethod: text("payment_method")
    .notNull()
    .default("COD"),

  paymentStatus: text("payment_status")
    .notNull()
    .default("PENDING"),

  orderStatus: text("order_status")
    .notNull()
    .default("CONFIRMED"),

  items: jsonb("items")
    .$type<
      Array<{
        productId: number;
        name: string;
        brand: string;
        price: number;
        quantity: number;
        image: string;
        volumeSize?: string;
      }>
    >()
    .notNull(),

  trackingId: text("tracking_id"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  phone: text("phone").notNull(),

  // Optional because your current registration flow
  // does not collect a password.
  passwordHash: text("password_hash"),

  accountType: text("account_type")
    .notNull()
    .default("local_customer"),

  salonName: text("salon_name"),

  gstNumber: text("gst_number"),

  udyamNumber: text("udyam_number"),

  addressLine: text("address_line").notNull(),

  city: text("city").notNull(),

  state: text("state").notNull(),

  pincode: text("pincode").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),

  productId: integer("product_id").notNull(),

  userName: text("user_name").notNull(),

  rating: integer("rating").notNull(),

  title: text("title"),

  comment: text("comment").notNull(),

  verifiedPurchase: boolean("verified_purchase").default(true),

  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),

  slug: text("slug").notNull().unique(),

  title: text("title").notNull(),

  excerpt: text("excerpt").notNull(),

  content: text("content").notNull(),

  coverImage: text("cover_image").notNull(),

  category: text("category").notNull(),

  author: text("author").notNull(),

  readTime: text("read_time").notNull(),

  publishedAt: timestamp("published_at").defaultNow(),
});

export const b2bInquiries = pgTable("b2b_inquiries", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  salonName: text("salon_name").notNull(),

  phone: text("phone").notNull(),

  email: text("email").notNull(),

  city: text("city").notNull(),

  state: text("state").notNull(),

  requirements: text("requirements").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),

  code: text("code").notNull().unique(),

  // "percentage" | "flat"
  discountType: text("discount_type").notNull(),

  discountValue: integer("discount_value").notNull(),

  minOrderValue: integer("min_order_value").default(0),

  maxDiscount: integer("max_discount").default(500),

  description: text("description").notNull(),

  isActive: boolean("is_active").default(true),
});