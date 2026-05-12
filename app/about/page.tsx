// app/about/page.tsx
import { Metadata } from "next"
import AboutClient from "@/components/About"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"

// This is great for SEO. Google will see this before the JavaScript even loads.
export const metadata: Metadata = {
  title: "About Wellness Nepal | Forged in Kathmandu",
  description:
    "Building gym empires since 2015. Wellness Nepal merges global standards with local Shakti engineering to provide unbreakable gym equipment.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Wellness Nepal",
    description: "B2B Fitness Advisory and Industrial Grade Gym Equipment.",
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
      question: "When was Wellness Nepal founded?",
      answer:
        "Wellness Nepal was founded in 2015 in Kathmandu with a mission to bring industrial-grade fitness equipment to Nepal.",
    },
    {
      question: "Does Wellness Nepal offer gym planning and consulting?",
      answer:
        "Yes, Wellness Nepal provides B2B consulting including gym layout planning, equipment selection, membership strategy, and ROI advisory.",
    },
    {
      question: "What is the Shakti series?",
      answer:
        "The Shakti series is Wellness Nepal's proprietary line of commercial-grade gym equipment engineered with global metallurgical standards for durability under high-volume use.",
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
