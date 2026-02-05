import { PRODUCTS_DATA } from "@/assets/data/products"
import { tool } from "@langchain/core/tools"
import { z } from "zod"

export const getProductsTool = tool(
  async ({ number = "5" }: { number?: string }) => {
    // 1. Calculate count
    const count = Math.min(parseInt(number) || 5, 20)

    // 2. Get the raw product objects
    const products = PRODUCTS_DATA.slice(0, count)

    /**
     * ✅ THE FIX: Return the WHOLE object as a JSON string.
     * This ensures the AI has access to 'image', 'id', 'specs', etc.
     */
    return JSON.stringify(
      products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        image: p.image, // AI needs this for ![alt](image)
        price: p.price,
        description: p.description,
        specs: p.specs, // AI needs this for the table
        warranty: p.warranty,
        shipping: p.shipping,
      })),
    )
  },
  {
    name: "get_products",
    description:
      "Get featured products. Use 'number' for custom count (5, 10, 20)",
    schema: z.object({
      number: z
        .string()
        .optional()
        .describe("Number of products to show (5, 10, 20). Default: 5"),
    }),
  },
)

export const searchProductsTool = tool(
  async ({ query }: { query: string }) => {
    console.log("🔍 Smart search:", query)

    const matchedProducts = PRODUCTS_DATA.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        Object.values(product.specs).join(" "),
        ...product.warranty,
        ...product.shipping,
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(query.toLowerCase())
    })

    if (matchedProducts.length === 0) {
      return `No products match "${query}" hajur.`
    }

    /**
     * ✅ THE FIX: Return ALL fields as JSON.
     */
    return JSON.stringify(
      matchedProducts.slice(0, 5).map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        image: p.image,
        price: p.price,
        description: p.description,
        specs: p.specs,
        warranty: p.warranty,
        shipping: p.shipping,
      })),
    )
  },
  {
    name: "search_product",
    description: "Smart search ALL or any product fields with ONE query",
    schema: z.object({
      query: z.string().describe("ANY keyword: 'cardio', 'treadmill', '100kg'"),
    }),
  },
)
