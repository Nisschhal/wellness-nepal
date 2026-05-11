import { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/section/Hero"
import TrustedClients from "@/section/TrustedClients"
import { absoluteUrl } from "@/lib/seo"

const WhyUs = dynamic(() => import("@/section/WhyUs"))
const BluePrint = dynamic(() => import("@/section/BluePrint"))
const FeaturedInventory = dynamic(() => import("@/section/FeaturedInventory"))
const Testimonials = dynamic(() => import("@/section/Testimonials"))
const FinalCTA = dynamic(() => import("@/section/FinalCTA"))

export const metadata: Metadata = {
  title: {
    absolute: "Wellness Nepal Gym | Premium Fitness Equipment",
  },
  description:
    "Shop professional-grade gym equipment at Wellness Nepal Gym. From home setups to full commercial gym installations, we offer delivery across Nepal, expert setup, and full warranty support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wellness Nepal | Premium Fitness Equipment",
    description:
      "Commercial and home fitness equipment with delivery, installation, and warranty support across Nepal.",
    url: absoluteUrl("/"),
    images: ["/wellness-dark.svg"],
    type: "website",
  },
}
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-montserrat selection:bg-brand-red selection:text-white">
      <Hero />
      <TrustedClients />
      <WhyUs />
      <BluePrint />
      <FeaturedInventory />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}
