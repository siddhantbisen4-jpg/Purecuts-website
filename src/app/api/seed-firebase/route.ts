import { NextResponse } from "next/server";
import { seedProductsToFirestore } from "@/lib/firebaseProducts";

export async function POST() {
  try {
    const result = await seedProductsToFirestore();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await seedProductsToFirestore();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
