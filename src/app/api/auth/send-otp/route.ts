import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let mobile = "";

    try {
      const body = await request.json();
      mobile = body?.mobile || "";
    } catch {
      const raw = await request.text().catch(() => "");
      const match = raw.match(/(\d{10})/);
      if (match) {
        mobile = match[1];
      }
    }

    const cleanMobile = String(mobile).replace(/\D/g, "");

    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to +91 ${cleanMobile}! (Demo OTP: 123456)`,
      otp: "123456",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to send OTP." },
      { status: 500 }
    );
  }
}
