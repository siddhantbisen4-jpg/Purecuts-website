import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ensureDbInitialized } from "@/lib/products";

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

    await ensureDbInitialized();

    // Fetch one order when an order number is supplied.
    if (orderNumber) {
      const rows = await db
        .select()
        .from(orders)
        .where(eq(orders.orderNumber, orderNumber))
        .limit(1);

      if (rows.length === 0) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(rows[0]);
    }

    // Fetch all orders belonging to this customer.
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

    return NextResponse.json(
      { error: "Order number or customer phone is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("API /api/orders GET error:", error);

    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}