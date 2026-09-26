import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-100/60 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-amber-600 font-medium">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">Shipping & Delivery Policy</span>
        </nav>

        <h1 className="text-2xl font-black text-slate-900">Shipping & Delivery Policy</h1>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs">
          <strong>PureCuts Fulfillment Hub:</strong> EUREKA Building, Domkhel Road, Wagholi - 412207, Pune, Maharashtra.
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Delivery Coverage & Timelines</h2>
          <p>
            PureCuts delivers salon products, chemicals, electrical machineries, and furniture across 26,000+ Indian PIN codes through tier-1 courier partners (BlueDart, Delhivery, DTDC, Express Logistics).
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Pune & Mumbai Metro:</strong> Express 24 to 48 Hours.</li>
            <li><strong>Major Metros (Delhi, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 2 to 3 Business Days.</li>
            <li><strong>Rest of India:</strong> 3 to 5 Business Days.</li>
            <li><strong>Heavy Salon Furniture (Chairs, Wash Stations):</strong> 5 to 7 Days via freight transport.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Shipping Charges</h2>
          <p>
            Orders above <strong>₹499</strong> qualify for <strong>FREE Standard Shipping</strong> across India. For orders below ₹499, a nominal shipping charge of ₹49 is applied.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Cash on Delivery (COD)</h2>
          <p>
            Cash on Delivery is available for all consumable skincare, haircare, and accessory products up to ₹10,000 per order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Order Tracking</h2>
          <p>
            Once your package is dispatched from our Wagholi Pune hub, you will receive real-time SMS and WhatsApp tracking links.
          </p>
        </section>
      </div>
    </main>
  );
}
