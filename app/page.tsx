import { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/section/Hero"
import TrustedClients from "@/section/TrustedClients"
import { absoluteUrl } from "@/lib/seo"

const WhyUs = dynamic(() => import("@/section/WhyUs"), {
  loading: () => <div className="min-h-[400px]" />,
})
const Services = dynamic(() => import("@/section/Services"), {
  loading: () => <div className="min-h-[600px]" />,
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
    absolute:
      "Gym Equipment in Nepal | Supplier in Butwal | WN Wellness Gym Equipment",
  },
  description:
    "Buy gym equipment in Nepal from WN Wellness Gym Equipment, Sukhanagar, Butwal. Treadmills, multi gym machines, racks, dumbbells and complete gym setups, with delivery, installation and service across Nepal.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gym Equipment in Nepal | WN Wellness Gym Equipment, Butwal",
    description:
      "Commercial and home gym equipment with delivery, installation and service across Nepal. Showroom in Sukhanagar, Butwal.",
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
      <Services />
      <BluePrint />
      <FeaturedInventory />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}
