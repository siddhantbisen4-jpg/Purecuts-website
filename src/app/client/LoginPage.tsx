"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  KeyRound,
} from "lucide-react";

import logo from "../../image/purecuts_logo_no_bg-cropped.png";
import { useStore } from "@/context/StoreContext";

type LoginMode = "signin" | "forgot";

export default function LoginPage() {
  const router = useRouter();

  const {
    showToast,
    pincode: savedPincode,
    setPincode,
  } = useStore();

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [mode, setMode] = useState<LoginMode>("signin");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [pincodeValue, setPincodeValue] = useState(
    savedPincode || ""
  );

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  // --------------------------------------------------
  // MOBILE NUMBER VALIDATION
  // --------------------------------------------------

  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setMobile(value);

    // Reset OTP state if mobile number changes
    if (otpSent) {
      setOtpSent(false);
      setOtp("");
    }

    setError("");
    setSuccessMessage("");
  };

  // --------------------------------------------------
  // OTP INPUT
  // --------------------------------------------------

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);

    setError("");
  };

  // --------------------------------------------------
  // PINCODE INPUT
  // --------------------------------------------------

  const handlePincodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setPincodeValue(value);

    setError("");
  };

  // --------------------------------------------------
  // SEND OTP
  // --------------------------------------------------

  const handleSendOtp = async () => {
    setError("");
    setSuccessMessage("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (mobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to send OTP."
        );
      }

      setOtpSent(true);
      setOtp("");

      setSuccessMessage(
        data?.message ||
          "OTP has been sent to your mobile number."
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // LOGIN WITH OTP
  // --------------------------------------------------

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (mobile.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!otpSent) {
      setError("Please send the OTP first.");
      return;
    }

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!pincodeValue) {
      setError("Please enter your pincode.");
      return;
    }

    if (pincodeValue.length !== 6) {
      setError(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: mobile.trim(),
            otp: otp.trim(),
            pincode: pincodeValue,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Invalid mobile number or OTP."
        );
      }

      // --------------------------------------------------
      // SAVE LOGGED-IN USER
      // --------------------------------------------------

      if (data?.user) {
        localStorage.setItem(
          "purecuts_user",
          JSON.stringify(data.user)
        );
      }

      // --------------------------------------------------
      // SAVE PINCODE
      // --------------------------------------------------

      if (pincodeValue) {
        setPincode(pincodeValue);

        localStorage.setItem(
          "purecuts_pincode",
          pincodeValue
        );
      }

      // --------------------------------------------------
      // NOTIFY OTHER COMPONENTS
      // --------------------------------------------------

      window.dispatchEvent(
        new Event("purecuts-auth-change")
      );

      showToast?.("Login successful!");

      // --------------------------------------------------
      // GO TO ACCOUNT
      // --------------------------------------------------

      router.push("/account");
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // FORGOT PASSWORD
  // --------------------------------------------------

  const handleForgotPassword = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    setError(
      "Password login has been replaced with mobile OTP login."
    );
  };

  // --------------------------------------------------
  // BACK TO SIGN IN
  // --------------------------------------------------

  const handleBackToLogin = () => {
    setMode("signin");

    setError("");
    setSuccessMessage("");
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#F8F7FC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-[0_20px_70px_rgba(70,45,130,0.12)] border border-[#E9E4F7]">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <section className="hidden lg:flex relative overflow-hidden bg-[#795BCB] text-white p-12 xl:p-16">

            {/* Decorative circles */}

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10" />

            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-white/10" />

            <div className="absolute top-1/2 right-10 h-24 w-24 rounded-full bg-white/5" />

            <div className="relative z-10 flex flex-col justify-between w-full">

              {/* Logo */}

              <div>
                <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3 shadow-lg">

                  <Image
                    src={logo}
                    alt="PureCuts"
                    width={150}
                    height={60}
                    priority
                    className="h-auto w-[150px] object-contain"
                  />

                </div>
              </div>

              {/* Main content */}

              <div className="max-w-xl py-12">

                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm mb-6">

                  <ShieldCheck className="h-4 w-4" />

                  Trusted Salon Marketplace

                </div>

                <h1 className="text-4xl xl:text-5xl font-bold leading-tight tracking-tight">

                  Everything your salon

                  <span className="block text-white/85">
                    needs, in one place.
                  </span>

                </h1>

                <p className="mt-6 text-base xl:text-lg leading-8 text-white/80 max-w-lg">

                  Discover genuine salon products, professional
                  equipment and accessories from trusted brands
                  through PureCuts.

                </p>

                <div className="mt-10 space-y-5">

                  {/* Genuine Products */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">

                      <CheckCircle2 className="h-5 w-5" />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Genuine Salon Products
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        Authorized brands from the PureCuts Pune hub.
                      </p>

                    </div>

                  </div>

                  {/* Salon Shopping */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">

                      <ShoppingBag className="h-5 w-5" />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Salon-focused Shopping
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        Professional products and equipment for your salon.
                      </p>

                    </div>

                  </div>

                  {/* Location Pricing */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">

                      <MapPin className="h-5 w-5" />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Location-based Pricing
                      </p>

                      <p className="mt-1 text-sm text-white/70">
                        Get pricing and delivery information based on your
                        location.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom */}

              <div className="text-sm text-white/60">

                © {new Date().getFullYear()} PureCuts. All rights reserved.

              </div>

            </div>

          </section>

          {/* ==================================================
              RIGHT SIDE - LOGIN
          ================================================== */}

          <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}

              <div className="flex justify-center lg:hidden mb-8">

                <Image
                  src={logo}
                  alt="PureCuts"
                  width={150}
                  height={60}
                  priority
                  className="h-auto w-[150px] object-contain"
                />

              </div>

              {/* ==================================================
                  SIGN IN
              ================================================== */}

              {mode === "signin" && (
                <>

                  <div className="mb-8">

                    <p className="text-sm font-semibold text-[#795BCB] mb-2">
                      WELCOME TO PURECUTS
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">
                      Sign in to your account
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Sign in to continue shopping professional
                      salon products.
                    </p>

                  </div>

                  {/* Best price message */}

                  <div className="mb-6 rounded-2xl border border-[#DDD5F4] bg-[#F7F4FD] px-4 py-3">

                    <p className="text-sm font-medium text-[#6246B0]">
                      For best price for product you want to login.
                    </p>

                  </div>

                  {/* Error */}

                  {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Success */}

                  {successMessage && (
                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      {successMessage}
                    </div>
                  )}

                  <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                  >

                    {/* ==================================================
                        MOBILE NUMBER
                    ================================================== */}

                    <div>

                      <label
                        htmlFor="mobile"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Mobile Number
                      </label>

                      <div className="relative">

                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                          +91
                        </span>

                        <input
                          id="mobile"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={mobile}
                          onChange={handleMobileChange}
                          placeholder="Enter 10-digit mobile number"
                          autoComplete="tel"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-24 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />

                      </div>

                    </div>

                    {/* ==================================================
                        OTP
                    ================================================== */}

                    <div>

                      <div className="mb-2 flex items-center justify-between">

                        <label
                          htmlFor="otp"
                          className="block text-sm font-semibold text-slate-700"
                        >
                          OTP
                        </label>

                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={
                            loading ||
                            mobile.length !== 10
                          }
                          className="text-sm font-semibold text-[#795BCB] transition hover:text-[#6246B0] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {otpSent
                            ? "Resend OTP"
                            : "Send OTP"}
                        </button>

                      </div>

                      <div className="relative">

                        <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                          id="otp"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={otp}
                          onChange={handleOtpChange}
                          placeholder="Enter 6-digit OTP"
                          autoComplete="one-time-code"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm tracking-[0.35em] text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />

                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        Enter the OTP sent to your mobile number.
                      </p>

                    </div>

                    {/* ==================================================
                        PINCODE
                    ================================================== */}

                    <div>

                      <label
                        htmlFor="pincode"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Pincode
                      </label>

                      <div className="relative">

                        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                          id="pincode"
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={pincodeValue}
                          onChange={handlePincodeChange}
                          placeholder="Enter 6-digit pincode"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />

                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        Your pincode helps us show accurate
                        delivery information and pricing.
                      </p>

                    </div>

                    {/* ==================================================
                        SIGN IN BUTTON
                    ================================================== */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#795BCB] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#795BCB]/20 transition hover:bg-[#6246B0] hover:shadow-xl hover:shadow-[#795BCB]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {loading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          Verifying OTP...
                        </>
                      ) : (
                        <>
                          Sign In

                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}

                    </button>

                  </form>

                  {/* Register */}

                  <div className="mt-8 text-center">

                    <p className="text-sm text-slate-500">

                      Don't have an account?{" "}

                      <button
                        type="button"
                        onClick={() =>
                          router.push("/register")
                        }
                        className="font-bold text-[#795BCB] hover:text-[#6246B0]"
                      >
                        Create Account
                      </button>

                    </p>

                  </div>

                </>
              )}

              {/* ==================================================
                  FORGOT PASSWORD
              ================================================== */}

              {mode === "forgot" && (
                <>

                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="mb-7 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#795BCB]"
                  >
                    <ArrowLeft className="h-4 w-4" />

                    Back to Sign In
                  </button>

                  <div className="mb-8">

                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0ECFA]">

                      <KeyRound className="h-6 w-6 text-[#795BCB]" />

                    </div>

                    <h2 className="text-3xl font-bold text-slate-900">
                      Mobile OTP Login
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Sign in securely using your mobile
                      number and one-time password.
                    </p>

                  </div>

                  {error && (
                    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                      <span>
                        {successMessage}
                      </span>

                    </div>
                  )}

                  <div className="space-y-5">

                    {/* Mobile */}

                    <div>

                      <label
                        htmlFor="forgot-mobile"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Mobile Number
                      </label>

                      <div className="relative">

                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                          +91
                        </span>

                        <input
                          id="forgot-mobile"
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          value={mobile}
                          onChange={handleMobileChange}
                          placeholder="Enter 10-digit mobile number"
                          autoComplete="tel"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-24 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />

                      </div>

                    </div>

                    {/* Send OTP */}

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#795BCB] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#795BCB]/20 transition hover:bg-[#6246B0] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {loading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send OTP

                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}

                    </button>

                  </div>

                  <div className="mt-8 text-center">

                    <p className="text-sm text-slate-500">

                      Want to sign in?{" "}

                      <button
                        type="button"
                        onClick={handleBackToLogin}
                        className="font-bold text-[#795BCB] hover:text-[#6246B0]"
                      >
                        Sign In
                      </button>

                    </p>

                  </div>

                </>
              )}

            </div>

          </section>

        </div>
      </div>
    </main>
  );
}