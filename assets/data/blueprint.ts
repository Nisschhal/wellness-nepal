// data/blueprint.ts
import { ClipboardCheck, Ruler, Settings, Truck, Rocket } from "lucide-react"
import React from "react"

export interface BlueprintStep {
  id: string
  title: string
  nepaliTitle: string
  icon: React.ElementType // Stores the component reference
  desc: string
}

export const BLUEPRINT_STEPS: BlueprintStep[] = [
  {
    id: "01",
    title: "INITIAL STRATEGY",
    nepaliTitle: "योजना",
    icon: ClipboardCheck,
    desc: "Free site assessment and goal alignment. We analyze your space to ensure maximum member density for Nepalese fitness hubs.",
  },
  {
    id: "02",
    title: "LAYOUT OPTIMIZATION",
    nepaliTitle: "नक्सा",
    icon: Ruler,
    desc: "Smart placement of iron. We design the floor flow to prevent congestion and maximize safety in high-traffic commercial gyms.",
  },
  {
    id: "03",
    title: "EQUIPMENT SELECTION",
    nepaliTitle: "छनोट",
    icon: Settings,
    desc: "Selecting the right Shakti Series tools for your specific target audience, local climate, and investment budget.",
  },
  {
    id: "04",
    title: "NATIONWIDE DEPLOYMENT",
    nepaliTitle: "जडान",
    icon: Truck,
    desc: "Safe delivery and expert assembly. Our Kathmandu team installs gear from Mechi to Mahakali with industrial precision.",
  },
  {
    id: "05",
    title: "LAUNCH & SUPPORT",
    nepaliTitle: "सहयोग",
    icon: Rocket,
    desc: "Final calibration and long-term maintenance scheduling to keep your fitness facility 100% operational 24/7.",
  },
]
