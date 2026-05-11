import { Metadata } from "next"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import { absoluteUrl } from "@/lib/seo"

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
  const jsonLd = {
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
