import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import { tool } from "ai"
import { z } from "zod"

export const getCompanyInfoTool = tool({
  description:
    "Get contact, location, and business details for Wellness Nepal.",
  inputSchema: z.object({
    topic: z
      .enum(["contact", "about", "terms", "socials", "all"])
      .default("all")
      .describe("The specific info the user is looking for"),
  }),
  execute: async ({ topic }) => {
    const data = COMPANY_DETAILS
    switch (topic) {
      case "contact":
        return {
          address: data.brand.address,
          phone: data.brand.phone,
          whatsapp: data.brand.whatsapp,
        }
      case "about":
        return {
          manifesto: "Nepal's premium fitness provider.",
          pillars: data.pillars,
        }
      default:
        return data
    }
  },
})
