import React from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "@/context/StoreContext";
import { PureCutsReactApp } from "./PureCutsReactApp";;
import "@/app/globals.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <PureCutsReactApp />
    </StoreProvider>
  </React.StrictMode>
);
