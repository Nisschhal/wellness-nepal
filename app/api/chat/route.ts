import { createAgentUIStreamResponse, type UIMessage } from "ai"
import { createShoppingAgent } from "@/lib/ai/gym-agent"

export async function POST(request: Request) {
  try {
    let body
    try {
      body = await request.json()
    } catch {
      return errorResponse("Invalid JSON", 400)
    }

    const { messages }: { messages: UIMessage[] } = body || {}
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return errorResponse("Missing or invalid messages", 400)
    }

    // Agent is now public (No userId)
    let agent
    try {
      agent = createShoppingAgent()
    } catch (agentError) {
      console.error("Agent creation failed:", agentError)
      return errorResponse("Service temporarily unavailable", 503)
    }

    return createAgentUIStreamResponse({
      agent,
      uiMessages: messages,
    })
  } catch (error) {
    console.error("[Chat API] Fatal error:", error)
    return errorResponse("Coach is taking a break. Try again!", 500)
  }
}

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}
