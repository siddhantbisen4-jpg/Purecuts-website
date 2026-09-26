import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Refund & Cancellation Policy</span>
        </nav>

        <h1 className="text-2xl font-black text-slate-900">Refund & Replacement Policy</h1>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Damaged or Defective Deliveries</h2>
          <p>
            If any item arrives physically damaged, leaking, or defective during transit, please contact our Pune customer support within <strong>48 hours of delivery</strong> with unboxing photos/video via WhatsApp at <strong>+91 9579177826</strong> or email <strong>contact@purecuts.in</strong>. We will issue an immediate free replacement or full refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Salon Machineries & Electrical Warranty</h2>
          <p>
            All electrical machines (Ikonic straighteners/dryers, Wahl clippers, VGR trimmers) carry their respective manufacturer official warranties (typically 1 to 2 years).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Hygiene & Chemical Products Policy</h2>
          <p>
            Due to strict beauty and salon hygiene guidelines, opened hair colors, bleach developers, facial creams, or used blades cannot be returned once their factory seals are broken.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Refund Processing Time</h2>
          <p>
            Approved refunds are credited back to the original payment source (or UPI / Bank Transfer for COD orders) within 3 to 5 business days.
          </p>
        </section>
      </div>
    </main>
  );
}
