import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import { tool } from "ai"
import { z } from "zod"

export const getCompanyInfoTool = tool({
  description:
    "Get details about Wellness Nepal, including contact info, address, terms, and company history.",
  inputSchema: z.object({
    topic: z
      .enum(["contact", "about", "terms", "socials", "all"])
      .describe("The specific info the user is looking for"),
  }),
  execute: async ({ topic }) => {
    console.log("[GetCompanyInfo] Topic requested:", topic)

    switch (topic) {
      case "contact":
        return {
          found: true,
          data: {
            address: COMPANY_DETAILS.brand.address,
            phone: COMPANY_DETAILS.brand.phone,
            whatsapp: COMPANY_DETAILS.brand.whatsapp,
            email: COMPANY_DETAILS.brand.email,
          },
        }
      case "terms":
        return { found: true, data: COMPANY_DETAILS.terms }
      case "socials":
        return { found: true, data: COMPANY_DETAILS.socials }
      case "about":
        return {
          found: true,
          data: {
            manifesto:
              "Wellness Nepal merges global standards with local SHAKTI engineering.",
            pillars: COMPANY_DETAILS.pillars,
            stats: COMPANY_DETAILS.stats,
          },
        }
      default:
        return { found: true, data: COMPANY_DETAILS }
    }
  },
})
