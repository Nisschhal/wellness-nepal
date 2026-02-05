import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import { tool } from "@langchain/core/tools"

export const getCompanyTool = tool(
  async () => {
    return COMPANY_DETAILS
  },
  {
    name: "search_company",
    description:
      "Company Details when user asks (example: what or who are you, what company are you or where are you located and so on) ",
  },
)
