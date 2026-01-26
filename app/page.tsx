import Navbar from "@/components/Navbar"
import TrustedClients from "@/section/TrustedClients"
import Hero from "@/section/Hero"
import { Metadata } from "next"
import WhyUs from "@/section/WhyUs"
import FeaturedInventory from "@/section/FeaturedInventory"
import BluePrint from "@/section/BluePrint"
import Testimonials from "@/section/Testimonials"
import FinalCTA from "@/section/FinalCTA"

export const metadata: Metadata = {
  title: {
    absolute: "Wellness Nepal Gym | Premium Fitness Equipment",
  },
  description:
    "Shop professional-grade gym equipment at Wellness Nepal Gym. From home setups to full commercial gym installations, we offer delivery across Nepal, expert setup, and full warranty support.",
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
      <div className="h-100"></div>
    </div>
  )
}
