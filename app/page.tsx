import Navbar from "@/components/Navbar"
import Hero from "@/section/Hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Wellness Nepal Gym | Premium Fitness Equipment",
  },
  description:
    "Shop professional-grade gym equipment at Wellness Nepal Gym. From home setups to full commercial gym installations, we offer delivery across Nepal, expert setup, and full warranty support.",
}
export default function Home() {
  return (
    <div className="font-montserrat ">
      <Navbar />
      <Hero />
      <div className="h-100"></div>
    </div>
  )
}
