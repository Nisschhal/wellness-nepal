import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import { tool } from "ai"
import { z } from "zod"

export const getCompanyInfoTool = tool({
  description:
    "Get Wellness Nepal location, contact, warranty terms, and company pillars.",
  inputSchema: z
    .object({
      topic: z
        .enum(["contact", "terms", "about", "all"])
        .optional()
        .default("all"),
    })
    .passthrough(),
  execute: async ({ topic }) => {
    const d = COMPANY_DETAILS
    return {
      success: true,
      brand: d.brand,
      socials: d.socials,
      pillars: d.pillars,
      terms: d.terms,
      whatsapp: d.brand.whatsapp,
      showroom:
        "Visit us at Traffic Chowk, Butwal or our Kathmandu partner facility.",
    }
  },
})
