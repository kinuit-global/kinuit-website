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

// Organisation JSON-LD — primary AEO/GEO signal
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.kinuit.com/#organization",
  "name": "Kinuit",
  "legalName": "Kinuit Agency",
  "url": "https://www.kinuit.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.kinuit.com/logo.svg",
    "width": 512,
    "height": 512
  },
  "image": "https://www.kinuit.com/assets/og-preview.jpeg",
  "description": "Kinuit is a full-service digital agency for ambitious brands — custom software development, brand design, growth marketing, and strategic planning, engineered for the new era.",
  "foundingDate": "2022",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 10,
    "maxValue": 49
  },
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Kingdom" },
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "Continent", "name": "Africa" }
  ],
  "knowsAbout": [
    "Custom Web Development",
    "Mobile App Development",
    "AI Product Development",
    "Web3 Development",
    "E-commerce Development",
    "Brand Identity Design",
    "UX/UI Design",
    "Motion Graphics",
    "SEO",
    "Paid Advertising",
    "Social Media Marketing",
    "Crypto Marketing",
    "Growth Strategy",
    "Go-to-Market Strategy",
    "Pitch Decks"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kinuit Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Build",
          "description": "Custom websites, mobile apps, AI products, Web3, e-commerce, and ERP systems.",
          "url": "https://www.kinuit.com/services/build"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Design",
          "description": "Brand identity, UX/UI, motion graphics, CGI, photography, and social creative.",
          "url": "https://www.kinuit.com/services/design"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Grow",
          "description": "SEO, paid ads, social media, crypto marketing, PR, email marketing, and community management.",
          "url": "https://www.kinuit.com/services/grow"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Plan",
          "description": "Growth strategy, pitch decks, tokenomics, investor marketing, and go-to-market strategy.",
          "url": "https://www.kinuit.com/services/plan"
        }
      }
    ]
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "email": "hello@kinuit.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    {
      "@type": "ContactPoint",
      "email": "hello@kinuit.com",
      "contactType": "sales",
      "availableLanguage": "English"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/kinuit",
    "https://twitter.com/kinuit",
    "https://www.instagram.com/kinuit"
  ]
};

// WebSite JSON-LD — enables Sitelinks Searchbox and signals to AI crawlers
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.kinuit.com/#website",
  "url": "https://www.kinuit.com",
  "name": "Kinuit",
  "description": "Full-service digital agency for ambitious brands.",
  "publisher": { "@id": "https://www.kinuit.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.kinuit.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// FAQPage JSON-LD — directly feeds AI answer boxes and voice search
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Kinuit do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kinuit is a full-service digital agency that helps ambitious brands build custom software, design compelling brand identities, grow their audience through data-driven marketing, and plan with strategic clarity. Their four pillars are Build, Design, Grow, and Plan."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Kinuit serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kinuit works with startups, scale-ups, and established brands across technology, crypto and Web3, e-commerce, SaaS, and consumer brands — primarily serving clients in the US, UK, UAE, and globally."
      }
    },
    {
      "@type": "Question",
      "name": "Can Kinuit build an AI product or Web3 application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Kinuit's Build team specialises in custom AI product development and Web3 applications, including smart contract integration, token-gated platforms, NFT marketplaces, and AI-powered SaaS tools."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get started with Kinuit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can start by visiting kinuit.com/contact to submit an enquiry, or email hello@kinuit.com directly. The team typically responds within one business day to scope your project."
      }
    },
    {
      "@type": "Question",
      "name": "Does Kinuit offer ongoing retainer services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Kinuit offers both project-based engagements and monthly retainer packages across all four service pillars — Build, Design, Grow, and Plan — giving clients a dedicated team and consistent output."
      }
    }
  ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
