import { PRODUCTS_DATA } from "@/assets/data/products"
import { tool } from "ai"
import { z } from "zod"

// Only query and category as per your request
const productSearchSchema = z.object({
  query: z
    .string()
    .optional()
    .describe("Search term for equipment (e.g., 'treadmill', 'bench')"),
  category: z
    .string()
    .optional()
    .describe(
      "Filter by category: 'Multi-Station', 'Cardio', 'Strength', 'Crossfit', 'Free Weights', 'Accessories'",
    ),
})

export const searchProductsTool = tool({
  description:
    "Search for gym equipment in the Shakti Fitness catalog by name or category. Returns product details and shipping info.",
  inputSchema: productSearchSchema,
  execute: async ({ query, category }) => {
    // 1. Identical logging structure
    console.log("[SearchProducts] Query received:", {
      query,
      category,
    })

    try {
      let filtered = PRODUCTS_DATA

      // 2. Simple filtering logic
      if (category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase(),
        )
      }

      if (query) {
        const q = query.toLowerCase()
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q),
        )
      }

      console.log("[SearchProducts] Products found:", filtered.length)

      // 3. Identical "No results" structure
      if (filtered.length === 0) {
        return {
          found: false,
          message:
            "No products found matching your criteria. Try different search terms or categories.",
          products: [],
          filters: { query, category },
        }
      }

      // 4. Formatting results for the AI and Widget
      const formattedProducts = filtered.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        image: p.image,
        price: p.price,
        // UI uses priceFormatted. If null, AI will tell user to "Contact for Quote"
        priceFormatted: p.price
          ? `Rs. ${(p.price as number).toLocaleString()}`
          : null,
        description: p.description,
        // Combine technical data for AI context
        specs: Object.entries(p.specs)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", "),
        warranty: p.warranty.join(", "),
        shipping: p.shipping.join(", "),
        productUrl: `/products/${p.id}`,
      }))

      // 5. Standardized Return Object exactly as your old code
      return {
        found: true,
        message: `Found ${filtered.length} product${filtered.length === 1 ? "" : "s"} matching your search.`,
        totalResults: filtered.length,
        products: formattedProducts,
        filters: {
          query,
          category,
        },
      }
    } catch (error) {
      console.error("[SearchProducts] Error:", error)
      return {
        found: false,
        message: "An error occurred while searching for products.",
        products: [],
        error: error instanceof Error ? error.message : "Unknown error",
        filters: { query, category },
      }
    }
  },
})
