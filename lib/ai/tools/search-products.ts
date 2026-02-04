import { PRODUCTS_DATA } from "@/assets/data/products"
import { tool } from "ai"
import { z } from "zod"

const productSearchSchema = z.object({
  query: z
    .string()
    .nullable() // Crucial: Allows the AI to send null without crashing
    .optional()
    .describe("Search term for equipment (e.g., 'treadmill', 'bench')"),
  category: z
    .string()
    .nullable() // Crucial: Allows the AI to send null without crashing
    .optional()
    .describe(
      "Filter by category: 'Multi-Station', 'Cardio', 'Strength', 'Crossfit', 'Free Weights', 'Accessories'",
    ),
})

export const searchProductsTool = tool({
  description: "Search for gym equipment in the Shakti Fitness catalog.",
  inputSchema: productSearchSchema,
  execute: async ({ query, category }) => {
    // 1. Defensive: Convert null/undefined to empty strings
    const safeQuery = (query || "").toLowerCase().trim()
    const safeCategory = (category || "").toLowerCase().trim()

    console.log(`[Search] Query: "${safeQuery}", Category: "${safeCategory}"`)

    try {
      let filtered = [...PRODUCTS_DATA]

      // 2. Filter by Category
      if (safeCategory) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === safeCategory,
        )
      }

      // 3. Filter by Query (Name or Description)
      if (safeQuery) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(safeQuery) ||
            p.description.toLowerCase().includes(safeQuery),
        )
      }

      if (filtered.length === 0) {
        return {
          found: false,
          message: "No iron matches that spec. Try a different term, Sathi.",
          products: [],
        }
      }

      // 4. Map to AI-friendly format
      const formattedProducts = filtered.slice(0, 5).map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        image: p.image,
        priceFormatted: p.price
          ? `Rs. ${Number(p.price).toLocaleString()}`
          : "Inquiry Required",
        specs: Object.entries(p.specs)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
        warranty: Array.isArray(p.warranty)
          ? p.warranty.join(", ")
          : p.warranty,
        shipping: Array.isArray(p.shipping)
          ? p.shipping.join(", ")
          : p.shipping,
        productUrl: `https://wellness-nepal.vercel.app/products/${p.id}`,
      }))

      return {
        found: true,
        message: `Found ${filtered.length} products.`,
        products: formattedProducts,
      }
    } catch (error) {
      console.error("[Search Error]", error)
      return { found: false, message: "System error during search." }
    }
  },
})
