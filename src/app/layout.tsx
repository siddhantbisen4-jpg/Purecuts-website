import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { B2BModal } from "@/components/B2BModal";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: "PureCuts - Professional Salon, Beauty & Personal Care Superstore",
  description:
    "Official PureCuts Marketplace. Genuine salon supplies, Matrix, L'Oréal Majirel, Schwarzkopf Bonacure, Ikonic straighteners, Wahl clippers, and Dr. Rashel facial kits with express Pune Wagholi dispatch.",
  keywords:
    "PureCuts, salon supplies, beauty marketplace, hair color, loreal majirel, matrix masque, wahl super taper, ikonic hair dryer, dr rashel cream, salon furniture, salon disposables, pune wagholi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-[#333333] antialiased min-h-screen flex flex-col font-sans selection:bg-[#e31837] selection:text-white">
        <StoreProvider>
          <Header />

          <div
            className="flex-1"
            style={{ paddingTop: "var(--header-height, 0px)" }}
          >
            {children}
          </div>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <B2BModal />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
