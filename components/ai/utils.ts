// import type { UIMessage } from "ai"
// import type { ToolCallPart } from "./types"

// // Extract text content from message parts
// export function getMessageText(message: UIMessage): string {
//   if (!message.parts || message.parts.length === 0) {
//     return ""
//   }
//   return message.parts
//     .filter((part) => part.type === "text")
//     .map((part) => (part as { type: "text"; text: string }).text)
//     .join("\n")
// }

// // Check if message has tool calls (parts starting with "tool-")
// export function getToolParts(message: UIMessage): ToolCallPart[] {
//   if (!message.parts || message.parts.length === 0) {
//     return []
//   }
//   return message.parts
//     .filter((part) => part.type.startsWith("tool-"))
//     .map((part) => part as unknown as ToolCallPart)
// }

// // Get human-readable tool name
// export function getToolDisplayName(toolName: string): string {
//   const toolNames: Record<string, string> = {
//     searchGymEquipment: "Searching gym equipment",
//     searchCompanyDetails: "Getting company details",
//   }
//   return toolNames[toolName] || toolName
// }

// We can significantly simplify this file

// Since we are now using raw strings in our custom SSE,
// the content is already the text. We keep this for compatibility.
export function getMessageText(message: { content: string }): string {
  return message.content || ""
}

// Updated to handle tool names from our SSE JSON
export function getToolDisplayName(toolName: string): string {
  const toolNames: Record<string, string> = {
    searchProductsTool: "Searching Industrial Catalog",
    getProductsTool: "Fetching Gear Database",
    getCompanyTool: "Accessing Logistical Intel",
  }
  return toolNames[toolName] || "Consulting Database"
}
