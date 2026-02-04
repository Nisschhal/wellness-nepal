export type ProjectCategory = "Commercial Gyms" | "Home Gyms" | "Hotel Fitness"

export interface Project {
  id: string
  title: string
  location: string
  geoDistrict: string // Specific for GEO-richness
  category: ProjectCategory
  image: string
  description: string
  equipmentUsed: string[]
  challenge: string
  solution: string
  year: string
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "elite-fitness",
    title: "Elite Fitness Center",
    location: "Baneshwor, Kathmandu",
    geoDistrict: "Kathmandu Valley",
    category: "Commercial Gyms",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    description:
      "A 5,000 sq. ft. high-performance commercial gym setup focusing on high-volume strength training.",
    equipmentUsed: [
      "Shakti Multi-Station X100",
      "Cardio Pro Treadmill T90",
      "Plate Loaded Leg Press",
    ],
    challenge:
      "Maximizing space for 200+ active morning members in a high-density urban hub.",
    solution:
      "Circular flow layout using industrial multi-stations to reduce footprint without sacrificing utility.",
    year: "2024",
  },
  {
    id: "grand-mountain",
    title: "Mountain View Resort",
    location: "Lakeside, Pokhara",
    geoDistrict: "Kaski District",
    category: "Hotel Fitness",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Boutique hotel fitness center with high-end cardio and strength aesthetics for international tourists.",
    equipmentUsed: [
      "Cardio Pro T90",
      "Polyurethane Dumbbell Set",
      "Shakti Elite Barbell",
    ],
    challenge:
      "Logistics for heavy iron transport through narrow mountain access routes.",
    solution:
      "Dedicated Shakti Logistics fleet and precision on-site assembly team.",
    year: "2023",
  },
]
