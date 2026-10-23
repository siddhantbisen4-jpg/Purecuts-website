import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc, or, ilike, count } from "drizzle-orm";
import { ensureDbInitialized } from "@/lib/products";

async function ensureOrdersSeeded() {
  try {
    const existing = await db.select({ val: count() }).from(orders);
    if (existing[0]?.val > 0) return;

    await db.insert(orders).values([
      {
        orderNumber: "PC-928410-842",
        customerName: "Pooja Sharma",
        customerEmail: "pooja.stylist@purecuts.in",
        customerPhone: "9579177826",
        salonName: "Aura Unisex Hair Studio & Academy",
        gstNumber: "27AAACP1234F1Z9",
        customerType: "SALON_OWNER",
        udyamNumber: "UDYAM-MH-26-0091823",
        addressLine: "EUREKA Building, Domkhel Road, Near Wagholi Vegetable Market",
        city: "Pune",
        state: "Maharashtra",
        pincode: "412207",
        subtotal: 3828,
        discount: 300,
        couponCode: "SALONPRO20",
        deliveryFee: 0,
        totalAmount: 3528,
        paymentMethod: "UPI",
        paymentStatus: "PAID",
        orderStatus: "IN_TRANSIT",
        trackingId: "EX-IN-48201948",
        createdAt: new Date(Date.now() - 42 * 60 * 1000), // ~42 mins ago
        items: [
          {
            productId: 1,
            name: "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask 500ml",
            brand: "Schwarzkopf Professional",
            price: 1237,
            quantity: 2,
            image: "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-1.png",
            volumeSize: "500 ml",
          },
          {
            productId: 3,
            name: "Matrix Biolage ColorLast Color Protecting Masque",
            brand: "Matrix",
            price: 554,
            quantity: 1,
            image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-6-1.png",
            volumeSize: "490 g",
          },
          {
            productId: 2,
            name: "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask 200ml",
            brand: "Schwarzkopf Professional",
            price: 862,
            quantity: 1,
            image: "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-2.png",
            volumeSize: "200 ml",
          },
        ],
      },
      {
        orderNumber: "PC-810492-317",
        customerName: "Pooja Sharma",
        customerEmail: "pooja.stylist@purecuts.in",
        customerPhone: "9579177826",
        salonName: "Aura Unisex Hair Studio & Academy",
        gstNumber: "27AAACP1234F1Z9",
        customerType: "SALON_OWNER",
        udyamNumber: "UDYAM-MH-26-0091823",
        addressLine: "EUREKA Building, Domkhel Road, Near Wagholi Vegetable Market",
        city: "Pune",
        state: "Maharashtra",
        pincode: "412207",
        subtotal: 4299,
        discount: 400,
        couponCode: "PURECUTS10",
        deliveryFee: 0,
        totalAmount: 3899,
        paymentMethod: "COD",
        paymentStatus: "PAID",
        orderStatus: "DELIVERED",
        trackingId: "EX-IN-31094821",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 4 * 3600 * 1000), // ~3 days ago
        items: [
          {
            productId: 1,
            name: "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask 500ml",
            brand: "Schwarzkopf Professional",
            price: 1237,
            quantity: 1,
            image: "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-1.png",
            volumeSize: "500 ml",
          },
          {
            productId: 3,
            name: "Matrix Biolage ColorLast Color Protecting Masque",
            brand: "Matrix",
            price: 554,
            quantity: 3,
            image: "https://purecuts.in/wp-content/uploads/2026/02/matrix-6-1.png",
            volumeSize: "490 g",
          },
          {
            productId: 2,
            name: "Schwarzkopf Professional Bonacure Peptide Repair Rescue Deep Conditioning Treatment Hair Mask 200ml",
            brand: "Schwarzkopf Professional",
            price: 862,
            quantity: 1,
            image: "https://purecuts.in/wp-content/uploads/2026/03/Untitled-design-2.png",
            volumeSize: "200 ml",
          },
        ],
      },
    ]);
  } catch (err) {
    console.error("ensureOrdersSeeded error:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const body = await request.json();

    const orderNumber = `PC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const trackingId = `EX-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const {
      customerType = "GUEST",

      customerName,
      customerEmail,
      customerPhone,

      salonName,
      gstNumber,
      udyamNumber,
      addressLine,
      city,
      state,
      pincode,
      subtotal,
      discount = 0,
      couponCode,
      deliveryFee = 0,
      totalAmount,
      paymentMethod = "COD",
      items = [],
    } = body;

    if (
      customerType !== "SALON_OWNER" &&
      customerType !== "GUEST" &&
      customerType !== "LOCAL_CUSTOMER"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid customer type",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !customerName ||
      !customerPhone ||
      !addressLine ||
      !pincode ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required order information",
        },
        {
          status: 400,
        }
      );
    }
    if (
      customerType === "SALON_OWNER" &&
      !gstNumber?.trim() &&
      !udyamNumber?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Salon Owner must provide either GSTIN or UDYAM number",
        },
        {
          status: 400,
        }
      );
    }
    const newOrder = await db.insert(orders).values({
      orderNumber,

      customerType:
        customerType === "SALON_OWNER"
          ? "SALON_OWNER"
          : "GUEST",

      customerName,
      customerEmail: customerEmail || `${customerPhone}@customer.purecuts.in`,
      customerPhone,
      salonName:
        customerType === "SALON_OWNER"
          ? salonName || null
          : null,

      gstNumber:
        customerType === "SALON_OWNER"
          ? gstNumber || null
          : null,

      udyamNumber:
        customerType === "SALON_OWNER"
          ? udyamNumber || null
          : null,
      addressLine,
      city: city || "Pune",
      state: state || "Maharashtra",
      pincode,
      subtotal: Number(subtotal),
      discount: Number(discount),
      couponCode: couponCode || null,
      deliveryFee: Number(deliveryFee),
      totalAmount: Number(totalAmount),
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
      orderStatus: "CONFIRMED",
      items,
      trackingId,
    }).returning();

    return NextResponse.json({
      success: true,
      order: newOrder[0] || {
        orderNumber,
        trackingId,
        customerName,
        totalAmount,
        createdAt: new Date(),
      },
    });
  } catch (error) {
    console.error("API /api/orders POST error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save order. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");
    const customerPhone = searchParams.get("customerPhone");
    const trackingId = searchParams.get("trackingId");
    const search = searchParams.get("search");

    await ensureDbInitialized();
    await ensureOrdersSeeded();

    // Fetch one order when an order number is supplied.
    if (orderNumber) {
      const rows = await db
        .select()
        .from(orders)
        .where(eq(orders.orderNumber, orderNumber))
        .limit(1);

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "Order not found", success: false, orders: [] },
          { status: 404 }
        );
      }

      // Return both flat object (for backwards compatibility) and nested structure
      return NextResponse.json({
        ...rows[0],
        success: true,
        order: rows[0],
        orders: rows,
      });
    }

    // Fetch by tracking ID
    if (trackingId) {
      const rows = await db
        .select()
        .from(orders)
        .where(eq(orders.trackingId, trackingId))
        .limit(1);

      return NextResponse.json({
        success: true,
        orders: rows,
        order: rows[0] || null,
      });
    }

    // Fetch all orders belonging to this customer phone.
    if (customerPhone) {
      const rows = await db
        .select()
        .from(orders)
        .where(eq(orders.customerPhone, customerPhone))
        .orderBy(desc(orders.createdAt));

      return NextResponse.json({
        success: true,
        orders: rows,
      });
    }

    // Fetch orders matching search string
    if (search) {
      const pattern = `%${search.trim()}%`;
      const rows = await db
        .select()
        .from(orders)
        .where(
          or(
            ilike(orders.orderNumber, pattern),
            ilike(orders.trackingId, pattern),
            ilike(orders.customerPhone, pattern),
            ilike(orders.customerName, pattern),
            ilike(orders.salonName, pattern)
          )
        )
        .orderBy(desc(orders.createdAt))
        .limit(15);

      return NextResponse.json({
        success: true,
        orders: rows,
      });
    }

    // Default: Return recent orders so page can always display active orders
    const rows = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(20);

    return NextResponse.json({
      success: true,
      orders: rows,
    });
  } catch (error) {
    console.error("API /api/orders GET error:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders", success: false, orders: [] },
      { status: 500 }
    );
  }
}