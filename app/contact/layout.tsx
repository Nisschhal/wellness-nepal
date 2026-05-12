import { Metadata } from "next"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Contact Wellness Nepal | Commercial Gym Setup & Quotes",
  description:
    "Get a professional pro-forma quote for industrial gym equipment in Nepal. Visit our Kathmandu showroom or contact our fitness consultants for gym planning.",
  keywords: [
    "gym equipment price Nepal",
    "commercial gym setup Kathmandu",
    "Wellness Nepal contact",
    "fitness equipment suppliers Nepal",
  ],
  openGraph: {
    title: "Request a Quote | Wellness Nepal Industrial Fitness",
    description:
      "Build your industrial gym with Nepal's #1 equipment supplier.",
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
    name: "Wellness Nepal Contact & Quote Request",
    description:
      "Professional inquiry portal for commercial gym equipment in Nepal.",
    mainEntity: {
      "@type": "LocalBusiness",
      name: COMPANY_DETAILS.brand.name,
      image: absoluteUrl("/wellness-dark.svg"),
      telephone: COMPANY_DETAILS.brand.phone,
      email: COMPANY_DETAILS.brand.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_DETAILS.brand.address,
        addressCountry: "NP",
      },
      areaServed: "Nepal",
    },
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Contact" },
  ])

  const faqs = faqJsonLd([
    {
      question: "How can I get a quote from Wellness Nepal?",
      answer:
        "You can request a quote by filling out the contact form on this page, calling us directly, or visiting our Kathmandu showroom. We respond within 24 hours.",
    },
    {
      question: "Does Wellness Nepal offer installation services?",
      answer:
        "Yes, standard installation is included within the Kathmandu Valley. Nationwide installation and site assessment services are also available.",
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
