export interface Product {
  id: string
  name: string
  category: string
  series?: string
  image: string
  images?: string[]
  price: number | null
  description: string
  specs: Record<string, string>
  warranty?: string[]
  shipping?: string[]
  isFeatured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  image: string
}

export interface Project {
  id: string
  title: string
  location: string
  image: string
  description: string
  equipmentUsed: string[]
  challenge?: string
  solution?: string
}

export enum Category {
  Cardio = "Cardio",
  Strength = "Strength",
  FreeWeight = "Free Weight",
  Benches = "Benches",
}
