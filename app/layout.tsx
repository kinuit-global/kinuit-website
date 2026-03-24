import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Inter, Sora, Lato, Poppins, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/Component/globalCompo/Nav";
import Footer from "@/Component/globalCompo/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: "italic",
  variable: "--font-cormorant",
  display: "swap",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    template: "%s | Kinuit"
  },
  description:
    "A globally distributed partner for Branding, Development, and Strategy. We help ambitious brands build products that work, design identities that last, and grow with sustainable momentum.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${sora.variable} ${lato.variable} ${montserrat.variable} ${poppins.variable} ${cormorant.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <CustomCursor />
      </body>
    </html>
  );
}
