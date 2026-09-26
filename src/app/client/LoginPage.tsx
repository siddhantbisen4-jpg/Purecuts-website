"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
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

  const [mode, setMode] = useState<LoginMode>("signin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pincodeValue, setPincodeValue] = useState(savedPincode || "");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --------------------------------------------------
  // EMAIL VALIDATION
  // --------------------------------------------------

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // --------------------------------------------------
  // PINCODE VALIDATION
  // --------------------------------------------------

  const handlePincodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPincodeValue(value);
  };

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (!pincodeValue) {
      setError("Please enter your pincode.");
      return;
    }

    if (pincodeValue.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          pincode: pincodeValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Invalid email or password."
        );
      }

      // Save logged-in user
      if (data?.user) {
        localStorage.setItem(
          "purecuts_user",
          JSON.stringify(data.user)
        );
      }

      // Save pincode
      if (pincodeValue) {
        setPincode(pincodeValue);
        localStorage.setItem(
          "purecuts_pincode",
          pincodeValue
        );
      }

      // Notify other components
      window.dispatchEvent(new Event("purecuts-auth-change"));

      showToast?.("Login successful!");

      router.push("/account");
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong. Please try again."
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

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      /*
       * If your backend already has a forgot-password API,
       * this will use it.
       */
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Unable to process your request."
        );
      }

      setSuccessMessage(
        data?.message ||
          "If an account exists with this email, password reset instructions have been sent."
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
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

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="Enter your email"
                          autoComplete="email"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-semibold text-slate-700"
                        >
                          Password
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            setMode("forgot");
                            setError("");
                            setSuccessMessage("");
                          }}
                          className="text-sm font-semibold text-[#795BCB] transition hover:text-[#6246B0]"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                          id="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#795BCB]"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Pincode */}
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

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#795BCB] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#795BCB]/20 transition hover:bg-[#6246B0] hover:shadow-xl hover:shadow-[#795BCB]/25 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Signing in...
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
                        onClick={() => router.push("/register")}
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
                      <Lock className="h-6 w-6 text-[#795BCB]" />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900">
                      Forgot Password?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Enter the email address associated with
                      your PureCuts account and we'll help you
                      reset your password.
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
                    <div className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                      <span>{successMessage}</span>
                    </div>
                  )}

                  <form
                    onSubmit={handleForgotPassword}
                    className="space-y-5"
                  >

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="forgot-email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                          id="forgot-email"
                          type="email"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          placeholder="Enter your email"
                          autoComplete="email"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#795BCB] focus:ring-4 focus:ring-[#795BCB]/10"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#795BCB] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#795BCB]/20 transition hover:bg-[#6246B0] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Instructions
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                  </form>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                      Remember your password?{" "}
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