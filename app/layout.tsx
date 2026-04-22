import type { Metadata } from "next";
import { Barlow, Inter, Sora, Lato, Poppins, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL('https://www.kinuit.com'),
  title: {
    default: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    template: "%s | Kinuit"
  },
  description:
    "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
  openGraph: {
    title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    description: "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
    url: "https://www.kinuit.com",
    siteName: "Kinuit",
    images: [
      {
        url: "https://www.kinuit.com/assets/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    description: "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
    images: ["https://www.kinuit.com/assets/og-preview.jpg"],
  },
  icons: {
    icon: [
      { url: "/16px.svg", sizes: "16x16" },
      { url: "/32px.svg", sizes: "32x32" },
    ],
    apple: [
      { url: "/180px.svg", sizes: "180x180" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kinuit",
  "url": "https://www.kinuit.com",
  "logo": "https://www.kinuit.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@kinuit.com",
    "contactType": "customer service"
  },
  "description": "Full-service agency for ambitious brands."
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
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
