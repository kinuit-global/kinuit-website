import React from "react";
import Navbar from "@/Component/globalCompo/Nav";
import Footer from "@/Component/globalCompo/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

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
      {/* <CustomCursor /> */}
    </>
  );
}
