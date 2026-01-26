export interface Product {
  id: string
  name: string
  category: string
  image: string
  price: string
  description: string
  specs: Record<string, string>
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
  MultiStation = "Multi-Station",
  Cardio = "Cardio",
  Strength = "Strength",
  Crossfit = "Crossfit",
  FreeWeights = "Free Weights",
  Accessories = "Accessories",
}
