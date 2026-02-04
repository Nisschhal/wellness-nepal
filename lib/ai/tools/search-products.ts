import { PRODUCTS_DATA } from "@/assets/data/products"
import { tool } from "ai"
import { z } from "zod"

export const searchProductsTool = tool({
  description:
    "Search the Wellness Nepal armory for gym equipment by name, category, or count.",
  inputSchema: z
    .object({
      query: z
        .string()
        .nullable()
        .optional()
        .describe("Search term like 'treadmill' or 'bench'"),
      category: z
        .string()
        .nullable()
        .optional()
        .describe("Category: Cardio, Strength, Multi-Station, etc."),
    })
    .passthrough(),
  execute: async ({ query, category }) => {
    try {
      const q = (query || "").toLowerCase().trim()
      const cat = (category || "").toLowerCase().trim()

      // Clean query: "2 treadmills" -> "treadmills"
      const cleanedQuery = q.replace(/\d+/g, "").trim()

      let filtered = [...PRODUCTS_DATA]

      if (cat) {
        filtered = filtered.filter((p) =>
          p.category.toLowerCase().includes(cat),
        )
      }

      if (cleanedQuery) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(cleanedQuery) ||
            p.description.toLowerCase().includes(cleanedQuery),
        )
      }

      // NO-FAIL LOGIC: If nothing found, show top 5 items as "Trending"
      const foundMatch = filtered.length > 0
      const finalSelection = foundMatch ? filtered : PRODUCTS_DATA.slice(0, 5)

      return {
        success: true,
        found: foundMatch,
        products: finalSelection.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
          description: p.description,
          specs: Object.entries(p.specs)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" | "),
          shipping: p.shipping.join(", "),
          warranty: p.warranty.join(", "),
        })),
      }
    } catch (e) {
      // Emergency recovery
      return { success: true, products: PRODUCTS_DATA.slice(0, 3) }
    }
  },
})
