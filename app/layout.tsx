import type { Metadata } from "next"
import { Bebas_Neue, Montserrat } from "next/font/google" // Import the fonts

import "./globals.css"
import Navbar from "@/components/Navbar"
import { ChatStoreProvider } from "@/lib/store/chat-store-provider"
import ChatSheetLazy from "@/components/ChatSheetLazy"
import Footer from "@/section/Footer"
import {
  DEFAULT_KEYWORDS,
  ORGANIZATION_JSON_LD,
  SITE_URL,
  WEBSITE_JSON_LD,
} from "@/lib/seo"
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wellness Nepal | Fitness Equipment Supplier in Nepal",
    template: "%s | Wellness Nepal",
  },
  description:
    "Commercial and home gym equipment supplier in Nepal. Wellness Nepal offers planning, delivery, installation, and after-sales support nationwide.",
  category: "Fitness Equipment Supplier",
  applicationName: "Wellness Nepal",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/wellness-dark.svg" },
      { url: "/wellness-dark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/wellness-dark.svg" }],
  },
  keywords: DEFAULT_KEYWORDS,

  openGraph: {
    title: "Wellness Nepal | Fitness Equipment Supplier in Nepal",
    description:
      "Commercial and home gym equipment with installation and support across Nepal.",
    url: SITE_URL,
    siteName: "Wellness Nepal",
    images: [
      {
        url: "/wellness-dark.svg",
        width: 1200,
        height: 630,
        alt: "Wellness Nepal fitness equipment",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Nepal",
    description:
      "Commercial and home fitness equipment supplier in Nepal with setup support.",
    images: ["/wellness-dark.svg"],
  },
}

const jsonLd = [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Kathmandu" />
      </head>
      <body className={`${bebas.variable} ${montserrat.variable} antialiased`}>
        <ChatStoreProvider>
          <Navbar />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <ChatSheetLazy />
        </ChatStoreProvider>
        <Footer />
      </body>
    </html>
  )
}
