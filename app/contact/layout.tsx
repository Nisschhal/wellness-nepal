import { Metadata } from "next"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  ORGANIZATION_JSON_LD,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact Us | Gym Equipment Quotes in Butwal, Nepal",
  description:
    "Get a quote for gym equipment in Nepal. Visit our showroom in Sukhanagar, Butwal, call 984-0967865 or message us on WhatsApp for a price list and a free gym layout.",
  keywords: [
    "gym equipment price Nepal",
    "gym equipment shop in Butwal",
    "WN Wellness Gym Equipment Nepal contact",
    "fitness equipment suppliers Nepal",
  ],
  openGraph: {
    title: "Request a Quote | WN Wellness Gym Equipment Nepal",
    description:
      "Gym equipment supplier in Butwal, delivering and installing across Nepal.",
    url: absoluteUrl("/contact"),
    images: ["/wellness-dark.svg"],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact WN Wellness Gym Equipment Nepal",
    description:
      "Professional inquiry portal for commercial gym equipment in Nepal.",
    mainEntity: { "@id": ORGANIZATION_JSON_LD["@id"] },
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Contact" },
  ])

  const faqs = faqJsonLd([
    {
      question: "How can I get a quote from WN Wellness Gym Equipment Nepal?",
      answer:
        "You can request a quote by filling out the contact form on this page, calling 984-0967865, or visiting our showroom in Sukhanagar, Butwal. We respond within 24 hours.",
    },
    {
      question: "Do you offer installation services?",
      answer:
        "Yes. We deliver and install gym equipment across Nepal, and offer site visits, gym layout planning and after-sales service.",
    },
    {
      question: "What are the payment terms for commercial gym orders?",
      answer:
        "For commercial/industrial orders, we require 50% advance payment. Prices are exclusive of 13% VAT. Quote validity is 7 days from generation.",
    },
  ])

  const jsonLd = [contactJsonLd, breadcrumbs, faqs]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
