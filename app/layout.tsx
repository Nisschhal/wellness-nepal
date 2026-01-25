import type { Metadata } from "next"
import { Bebas_Neue, Montserrat } from "next/font/google" // Import the fonts

import "./globals.css"
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap", // Ensures text appears immediately
})

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Wellness Nepal Gym | #1 Fitness Equipment Supplier in Nepal",
    template: "%s | Wellness Nepal Gym",
  },
  description:
    "Nepal’s leading distributor of commercial and home gym equipment. We provide high-quality treadmills, strength machines, and flooring for gyms nationwide.",
  icons: {
    icon: [
      { url: "/wellness-dark.svg" }, // Place in public folder
      { url: "/wellness-dark.svg", type: "image/svg+xml" }, // Place in public folder
    ],
    apple: [
      { url: "/wellness-dark.svg" }, // Place in public folder
    ],
  },
  keywords: [
    "gym equipment Nepal",
    "commercial fitness machines Kathmandu",
    "buy gym weights Nepal",
  ],

  metadataBase: new URL("https://wellnessnepalgym.com"),
  // This helps AI understand you are an e-commerce/supplier entity
  category: "Fitness Equipment Supplier",

  // For Open Graph and Twitter cards on Social Media shares
  openGraph: {
    title: "Wellness Nepal Gym | #1 Fitness Equipment Supplier",
    description:
      "Premium gym equipment delivery and installation across Nepal.",
    url: "https://wellnessnepalgym.com",
    siteName: "Wellness Nepal Gym",
    images: [
      {
        url: "/wellness-dark.png", // Create a 1200x630 image showing your best equipment
        width: 1200,
        height: 630,
        alt: "Wellness Nepal Gym Equipment Showroom",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Nepal Gym",
    description: "Best Gym Equipment in Nepal",
    images: ["/wellness-dark.png"],
  },
}

// AI-Search Schema (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store", // Or "WholesaleStore"
  name: "Wellness Nepal Gym",
  image: "https://wellnessnepalgym.com/logo.png",
  description:
    "Nepal’s leading distributor of commercial and home gym equipment.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Your Street Name",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "YOUR_LAT", // Optional but good for local AI search
    longitude: "YOUR_LONG",
  },
  url: "https://wellnessnepalgym.com",
  telephone: "+977-XXXXXXXXXX",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      {/* Add dark class here if you want dark mode by default */}
      <body className={`${bebas.variable} ${montserrat.variable} antialiased`}>
        {/* Injecting the JSON-LD for AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
