import { Product, Testimonial, Project } from "../types"
import { PRODUCTS_DATA } from "./products"
import { TESTIMONIALS_DATA } from "./testimonials"
import { PROJECTS_DATA } from "./projects"

// Simulated API Service Layer
export const PRODUCTS: Product[] = PRODUCTS_DATA as any
export const TESTIMONIALS: Testimonial[] = TESTIMONIALS_DATA
export const PROJECTS: Project[] = PROJECTS_DATA

export const CLIENT_LOGOS = [
  "Gold's Gym Nepal",
  "Cult.Fit",
  "Snap Fitness",
  "Anytime Fitness",
  "Iron Paradise",
  "The Himalayan Gym",
  "Elite Strength",
  "Kathmandu Cardio",
  "Army Sports Complex",
  "APF Club",
]
