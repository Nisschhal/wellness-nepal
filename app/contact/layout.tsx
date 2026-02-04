import { Metadata } from "next"

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
    images: ["/og-contact.jpg"],
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
      name: "Wellness Nepal",
      image: "https://wellnessnepalgym.com/logo.png",
      telephone: "+977-1-XXXXXXX",
      email: "info@wellnessnepal.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ring Road",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      areaServed: "Nepal",
      openingHours: "Mo-Fr 09:00-18:00",
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
