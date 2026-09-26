import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { randomBytes, scryptSync } from "node:crypto";

import { db } from "@/db";
import { users } from "@/db/schema";

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");

  const hash = scryptSync(
    password,
    salt,
    64
  ).toString("hex");

  return `${salt}:${hash}`;
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = normalize(body.name);
    const email = normalize(body.email).toLowerCase();
    const phone = normalize(body.phone);

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const accountType =
      body.accountType === "salon_owner"
        ? "salon_owner"
        : "local_customer";

    const address = normalize(body.address);
    const city = normalize(body.city);
    const state = normalize(body.state);
    const pincode = normalize(body.pincode);

    const salonName = normalize(body.salonName);
    const gstNumber = normalize(body.gstNumber).toUpperCase();
    const udyamNumber = normalize(body.udyamNumber).toUpperCase();

    // -----------------------------
    // BASIC VALIDATION
    // -----------------------------

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your full name.",
        },
        { status: 400 }
      );
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid 10-digit phone number.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your address.",
        },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your city.",
        },
        { status: 400 }
      );
    }

    if (!state) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your state.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid six-digit pincode.",
        },
        { status: 400 }
      );
    }

    // Salon owner must provide business name
    if (accountType === "salon_owner" && !salonName) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your salon or business name.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // CHECK EXISTING ACCOUNT
    // -----------------------------

    const existingUser = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "An account already exists with this email address.",
        },
        { status: 409 }
      );
    }

    // -----------------------------
    // CREATE USER
    // -----------------------------

    const passwordHash = hashPassword(password);

    const [createdUser] = await db
      .insert(users)
      .values({
        name,
        email,
        phone: phone.replace(/\D/g, ""),
        passwordHash,
        accountType,

        salonName:
          accountType === "salon_owner"
            ? salonName
            : null,

        gstNumber:
          accountType === "salon_owner" && gstNumber
            ? gstNumber
            : null,

        udyamNumber:
          accountType === "salon_owner" && udyamNumber
            ? udyamNumber
            : null,

        addressLine: address,
        city,
        state,
        pincode,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        accountType: users.accountType,
        salonName: users.salonName,
        gstNumber: users.gstNumber,
        udyamNumber: users.udyamNumber,
        addressLine: users.addressLine,
        city: users.city,
        state: users.state,
        pincode: users.pincode,
      });

    return NextResponse.json(
      {
        success: true,
        message: "Your PureCuts account has been created successfully.",
        user: createdUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to create your account right now. Please try again.",
      },
      { status: 500 }
    );
  }
}