import { NextRequest, NextResponse } from "next/server";
import pincodes from "@/data/pincodes.json";

export async function POST(request: NextRequest) {
  try {
    let mobile = "";
    let otp = "";
    let pincode = "";

    try {
      const body = await request.json();
      mobile = body?.mobile || "";
      otp = body?.otp || "";
      pincode = body?.pincode || "";
    } catch {
      const raw = await request.text().catch(() => "");
      const mMatch = raw.match(/mobile["':\s]+(\d{10})/);
      const oMatch = raw.match(/otp["':\s]+(\d{6})/);
      const pMatch = raw.match(/pincode["':\s]+(\d{6})/);
      if (mMatch) mobile = mMatch[1];
      if (oMatch) otp = oMatch[1];
      if (pMatch) pincode = pMatch[1];
    }

    const cleanMobile = String(mobile || "").replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!otp || String(otp).trim().length !== 6) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit OTP." },
        { status: 400 }
      );
    }

    const cleanPin = String(pincode || "").replace(/\D/g, "").slice(0, 6);
    const pinEntry = pincodes[cleanPin as keyof typeof pincodes];
    const isPune =
      pinEntry?.district?.toUpperCase() === "PUNE" &&
      pinEntry?.state?.toUpperCase() === "MAHARASHTRA";

    const region: "pune" | "outside-pune" = isPune ? "pune" : "outside-pune";

    const user = {
      id: `user_${cleanMobile}`,
      phone: cleanMobile,
      name: "Valued Customer",
      accountType: "local_customer",
      pincode: cleanPin,
      region,
      city: pinEntry?.district || (isPune ? "Pune" : ""),
      state: pinEntry?.state || "Maharashtra",
      signedInAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to process login." },
      { status: 500 }
    );
  }
}
