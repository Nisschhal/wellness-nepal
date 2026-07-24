import { Product, Testimonial, Project } from "../types"
import cloudinaryProducts from "../data/cloudinary-products.json"
import { TESTIMONIALS_DATA } from "../data/testimonials"
import { PROJECTS_DATA } from "../data/projects"

// Product catalog from Cloudinary (static JSON, no API calls)
export const PRODUCTS: Product[] = cloudinaryProducts as any
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
