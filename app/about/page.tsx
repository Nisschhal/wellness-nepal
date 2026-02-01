// app/about/page.tsx
import { Metadata } from "next"
import AboutClient from "@/components/About"

// This is great for SEO. Google will see this before the JavaScript even loads.
export const metadata: Metadata = {
  title: "About Wellness Nepal | Forged in Kathmandu",
  description:
    "Building gym empires since 2015. Wellness Nepal merges global standards with local Shakti engineering to provide unbreakable gym equipment.",
  openGraph: {
    title: "About Wellness Nepal",
    description: "B2B Fitness Advisory and Industrial Grade Gym Equipment.",
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      {/* 
        By keeping text in the Client Component, it is still indexable, 
        but the Server component ensures the 'metadata' is delivered 
        instantly for social sharing and search ranking.
      */}
      <AboutClient />
    </>
  )
}
