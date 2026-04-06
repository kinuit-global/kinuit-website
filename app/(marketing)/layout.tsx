import React from "react";
import Navbar from "@/Component/globalCompo/Nav";
import Footer from "@/Component/globalCompo/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Toaster } from "react-hot-toast";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#121212",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            fontSize: "12px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            backdropFilter: "blur(8px)",
          },
          success: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#fff",
            },
          },
        }}
      />
      {/* <CustomCursor /> */}
    </>
  );
}
