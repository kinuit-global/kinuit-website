import type { Metadata } from "next";
import { Barlow, Inter, Sora, Lato, Poppins, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  metadataBase: new URL('https://kinuit.com'),
  title: {
    default: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    template: "%s | Kinuit"
  },
  description:
    "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
  openGraph: {
    title: "Kinuit | Build, Design, Grow & Plan for Ambitious Brands",
    description: "Kinuit is a full-service agency for ambitious brands — strategy, branding, custom development, and growth, engineered for the new era.",
    url: "https://kinuit.com",
    siteName: "Kinuit",
    images: [
      {
        url: "/assets/og-preview.jpeg",
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
    images: ["/assets/og-preview.jpeg"],
  },
  icons: {
    icon: [
      { url: "https://kinuit.com/favicon.ico", sizes: "any" },
      { url: "https://kinuit.com/assets/16px.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "https://kinuit.com/assets/32px.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "https://kinuit.com/16px.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "https://kinuit.com/32px.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    shortcut: "https://kinuit.com/favicon.ico",
    apple: [
      { url: "https://kinuit.com/assets/180px.ico", sizes: "180x180", type: "image/x-icon" },
      { url: "https://kinuit.com/180px.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};


import { ToastProvider } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://kinuit.com/#organization",
    "name": "Kinuit",
    "url": "https://kinuit.com",
    "logo": "https://kinuit.com/favicon.ico",
    "tagline": "Global Reach. Zero Latency.",
    "sameAs": [
      "https://www.linkedin.com/company/kinuit-global",
      "https://www.instagram.com/kinuit_global/",
      "https://x.com/kinuit_global"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hello@kinuit.com",
      "contactType": "customer service"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kinuit.com/#website",
    "name": "Kinuit",
    "url": "https://kinuit.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kinuit.com/case-studies?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://kinuit.com/#service-build",
        "name": "Build (Custom Development)",
        "provider": { "@id": "https://kinuit.com/#organization" },
        "description": "Engineering high-performance custom websites, mobile apps, AI products, Web3 systems, E-commerce platforms, and ERP systems.",
        "url": "https://kinuit.com/services/build"
      },
      {
        "@type": "Service",
        "@id": "https://kinuit.com/#service-design",
        "name": "Design (Brand & UX/UI)",
        "provider": { "@id": "https://kinuit.com/#organization" },
        "description": "Creating premium brand identities, high-converting UX/UI designs, motion graphics, CGI assets, photography, and social creatives.",
        "url": "https://kinuit.com/services/design"
      },
      {
        "@type": "Service",
        "@id": "https://kinuit.com/#service-grow",
        "name": "Grow (Marketing & Analytics)",
        "provider": { "@id": "https://kinuit.com/#organization" },
        "description": "Data-driven growth services including SEO optimization, paid ads, social media management, crypto marketing, PR, and community growth.",
        "url": "https://kinuit.com/services/grow"
      },
      {
        "@type": "Service",
        "@id": "https://kinuit.com/#service-plan",
        "name": "Plan (Strategy & GTM)",
        "provider": { "@id": "https://kinuit.com/#organization" },
        "description": "Strategic advisory covering growth strategy, investor pitch decks, tokenomics design, go-to-market strategies, and HubSpot integrations.",
        "url": "https://kinuit.com/services/plan"
      }
    ]
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kinuit.com/#breadcrumbs",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kinuit.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://kinuit.com/about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Services",
        "item": "https://kinuit.com/services"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://kinuit.com/contact"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item": "https://kinuit.com/faq"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Case Studies",
        "item": "https://kinuit.com/case-studies"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${sora.variable} ${lato.variable} ${montserrat.variable} ${poppins.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      </head>
      <body>
        <ToastProvider />
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xd1cdjvnbu");
          `}
        </Script>
      </body>
    </html>
  );
}
