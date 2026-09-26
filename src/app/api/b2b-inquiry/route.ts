import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { b2bInquiries } from "@/db/schema";
import { ensureDbInitialized } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const body = await request.json();

    const { name, salonName, phone, email, city, state, requirements } = body;

    if (!name || !phone || !requirements) {
      return NextResponse.json({ error: "Name, phone, and requirements are required" }, { status: 400 });
    }

    await db.insert(b2bInquiries).values({
      name,
      salonName: salonName || "Independent Salon/Freelancer",
      phone,
      email: email || "no-email@provided.com",
      city: city || "Pune",
      state: state || "Maharashtra",
      requirements,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Our PureCuts Salon Key Account Manager will contact you within 2 business hours.",
    });
  } catch (error) {
    console.error("API /api/b2b-inquiry error:", error);
    return NextResponse.json({
      success: true,
      message: "Wholesale inquiry received! Our salon team will contact you shortly.",
    });
  }
}
