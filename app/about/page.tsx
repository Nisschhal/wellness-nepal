// app/about/page.tsx
import { Metadata } from "next"
import AboutClient from "@/components/About"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"

// This is great for SEO. Google will see this before the JavaScript even loads.
export const metadata: Metadata = {
  title: "About Us | Gym Equipment Supplier in Butwal",
  description:
    "WN Wellness Gym Equipment Nepal (Wellness Gym Equipment Nepal Pvt. Ltd.) is a gym equipment supplier in Sukhanagar, Butwal, supplying and installing commercial and home gym equipment across Nepal.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About WN Wellness Gym Equipment Nepal",
    description: "Gym equipment supplier in Butwal, Nepal.",
    url: absoluteUrl("/about"),
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    ],
  },
}

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "About" },
  ])

  const faqs = faqJsonLd([
    {
      question: "Where is WN Wellness Gym Equipment Nepal located?",
      answer:
        "Our showroom is in Sukhanagar, Butwal-8, Rupandehi. The company is registered as Wellness Gym Equipment Nepal Pvt. Ltd. (PAN/VAT 622379544) and delivers and installs gym equipment across Nepal.",
    },
    {
      question: "Do you offer gym planning and consulting?",
      answer:
        "Yes, we provide B2B consulting including gym layout planning, equipment selection, membership strategy, and ROI advisory.",
    },
    {
      question: "What are your opening hours?",
      answer:
        "Our Sukhanagar, Butwal showroom is open every day from 10:00 to 17:00. Call or WhatsApp 984-0967865.",
    },
  ])

  const jsonLd = [breadcrumbs, faqs]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  )
}
