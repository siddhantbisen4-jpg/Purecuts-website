import { NextRequest, NextResponse } from "next/server";
import pincodes from "@/data/pincodes.json";

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const phone = normalize(body.phone);
    const accountType = body.accountType === "salon_owner" ? "salon_owner" : "local_customer";

    const address = normalize(body.address);
    const city = normalize(body.city);
    const state = normalize(body.state);
    const pincode = normalize(body.pincode);

    const salonName = normalize(body.salonName);
    const gstNumber = normalize(body.gstNumber).toUpperCase();
    const udyamNumber = normalize(body.udyamNumber).toUpperCase();

    if (!name) {
      return NextResponse.json({ success: false, error: "Please enter your full name." }, { status: 400 });
    }
    if (!phone || phone.replace(/\D/g, "").length !== 10) {
      return NextResponse.json({ success: false, error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
    }
    if (!pincode || pincode.replace(/\D/g, "").length !== 6) {
      return NextResponse.json({ success: false, error: "Please enter a valid 6-digit pincode." }, { status: 400 });
    }

    const cleanPin = pincode.replace(/\D/g, "").slice(0, 6);
    const pinEntry = pincodes[cleanPin as keyof typeof pincodes];
    const isPune =
      pinEntry?.district?.toUpperCase() === "PUNE" ||
      city.toUpperCase().includes("PUNE");

    const region: "pune" | "outside-pune" = isPune ? "pune" : "outside-pune";

    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      accountType,
      salonName: accountType === "salon_owner" ? salonName : undefined,
      gstNumber: accountType === "salon_owner" ? gstNumber : undefined,
      udyamNumber: accountType === "salon_owner" ? udyamNumber : undefined,
      addressLine: address,
      city: city || (isPune ? "Pune" : ""),
      state: state || "Maharashtra",
      pincode: cleanPin,
      region,
      salonMember: accountType === "salon_owner",
      signedInAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Registration completed successfully!",
      user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to register account." },
      { status: 500 }
    );
  }
}
