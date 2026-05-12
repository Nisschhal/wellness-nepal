import { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/section/Hero"
import TrustedClients from "@/section/TrustedClients"
import { absoluteUrl } from "@/lib/seo"

const WhyUs = dynamic(() => import("@/section/WhyUs"), {
  loading: () => <div className="min-h-[400px]" />,
})
const BluePrint = dynamic(() => import("@/section/BluePrint"), {
  loading: () => <div className="min-h-[400px]" />,
})
const FeaturedInventory = dynamic(() => import("@/section/FeaturedInventory"), {
  loading: () => <div className="min-h-[500px]" />,
})
const Testimonials = dynamic(() => import("@/section/Testimonials"), {
  loading: () => <div className="min-h-[400px]" />,
})
const FinalCTA = dynamic(() => import("@/section/FinalCTA"), {
  loading: () => <div className="min-h-[300px]" />,
})

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
