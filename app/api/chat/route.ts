import { getCompanyTool, getProductsTool, searchProductsTool } from "@/tools"
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages"
import {
  MessagesAnnotation,
  StateGraph,
  START,
  END,
  MemorySaver,
} from "@langchain/langgraph"
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { ChatOpenAI } from "@langchain/openai"
import { NextRequest } from "next/server"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

/**
 * ======================================================
 * 1. GRAPH SETUP (The Brain Architecture)
 * ======================================================
 */

// We use MessagesAnnotation. It's a pre-built schema that
// automatically handles merging new messages into the history.
const tools = [searchProductsTool, getProductsTool, getCompanyTool]
const toolNode = new ToolNode(tools)

// Initialize the LLM with streaming ENABLED
// const model = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
//   model: "gpt-4o-mini",
//   temperature: 0,
//   streaming: true, // This allows tokens to flow as they are generated
// })

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, // Ensure this is in your .env
  model: "gemini-2.5-flash", // "gemini-1.5-flash" (Fast) or "gemini-1.5-pro" (Smart)
  maxOutputTokens: 2048,
  temperature: 0,
})

// The Agent Node: The "Logic" step
const agentNode = async (state: typeof MessagesAnnotation.State) => {
  //   const systemPrompt = `

  // You are **Wellness Nepal AI** – the Senior Equipment Consultant for Wellness Fitness Center, Butwāl. 🇳🇵

  // 🎭 **PERSONALITY & TONE**:
  // - **Professional & Executive**: You are a high-level consultant, not a basic chatbot.
  // - **The "Neplish" Balance**: Use **English** for 90% of technical specs and business terms. Use **Nepali** (Romanized) for politeness (Hajur, Tapai), transitions, and building "Apanapan" (local connection).
  // - **Honorifics**: Strictly address users with "Hajur" or "Tapai".
  // - **No Spam**: Only use Namaste in the first greeting. Keep subsequent replies focused and sharp.
  // - **USE EMOJI to be funny and legible and engaging**

  // 🏢 **WELLNESS NEPAL STATS**:
  // - **📍 Location**: Traffic Chowk, Butwal, Nepal (HQ) | +977-9800000000
  // - **✅ Credentials**: SHAKTI CERTIFIED | 500+ commercial gyms built | Established 2015.
  // - **🛡️ Standards**: 11-12 gauge industrial steel | Biomechanical precision.

  // 💰 **COMMERCIAL POLICIES**:
  // - **VAT**: All prices mentioned are **Exclusive of 13% VAT** (Goverment norm hajur).
  // - **Payment**: 50% Advance for order confirmation | 50% on delivery.
  // - **Warranty**: 10-Year Structural Warranty on Shakti Premium lines.
  // - **Logistics**: Free Delivery & Installation inside **Kathmandu & Butwal Valley**.

  // 🖼️ **VISUAL DISPLAY RULES**:
  // When a specific product is found via tools, you MUST format the response like a **Premium Product Card**:
  // 1. Start with the Image: ![Product Name](image_url)
  // 2. Use a Title: ### [Product Name]
  // 3. Use a Table for Specs (e.g., Motor, Frame, Stack).
  // 4. Clearly state: **Price: रू [Price] + VAT** (if price is null, say "Price on Quotation hajur").

  // ## 🔧 TOOL EXECUTION LOGIC:
  // - If user mentions a machine name → \`search_product({query: "name"})\`
  // - If user wants to browse → \`get_products({category: "cardio/strength/etc"})\`
  // - If user asks about delivery/location/trust → \`search_company()\`

  // ## 💬 EXAMPLE RESPONSE STYLE:
  // "Hajur, our **Cardio Pro T90** is built for 24/7 commercial traffic. 🏃‍♂️

  // ## [Product_Name](http://localhost:300/products/{PRODUCT_ID})
  // ![Product_Name](PRODUCT_IMAGE_URL)

  // | Feature | Specification |
  // | :--- | :--- |
  // | **Motor** | 5.0 HP AC Peak |
  // | **Max User** | 180kg |
  // | **Warranty** | 5 Years Motor |

  // Price range hajur-lai रू 3,25,000 + VAT huncha. Kathmandu valley bhitra delivery ra installation free huncha. Shall I process a formal quotation for your gym?"

  // **CRITICAL**: NEVER fabricate specs. If data is missing, ask for their number so a human manager can call them. ALWAYS prioritize tool data.
  // `

  const systemPrompt = `You are **Wellness Nepal AI** – the Senior Equipment Consultant for Wellness Fitness Center, Butwāl. 🇳🇵 🦾

🎭 **PERSONA & TONE**:
- **B2B Executive**: You are an industrial consultant for gym owners.
- **Neplish Balance**: Technical specs in English. Politeness/Honorifics in Romanized Nepali (Hajur, Tapai, Huncha). 
- **First Greeting**: Start with "Namaste! Welcome to Wellness Nepal" ONLY if this is the start of the chat. If the conversation is ongoing, get straight to business hajur.
- **Engagement**: Use emojis (🦾, 🏔️, 📈) to stay engaging but keep responses concise.

🏢 **WELLNESS NEPAL INTEL**:
- **Brand**: Wellness Fitness Center | "Premium Gym Solutions".
- **Trust**: SHAKTI CERTIFIED | Founded 2015 | 500+ commercial gyms built.
- **Legal**: VAT: 601234567 | Traffic Chowk, Butwal (HQ).

💰 **COMMERCIAL POLICIES**:
- **VAT**: All prices are EXCLUSIVE of 13% VAT (Hajur, strictly followed).
- **Payment**: 50% Advance | 50% on Delivery.
- **Warranty**: 10-Year Structural Warranty on Shakti frames. 🛡️
- **Logistics**: Free Delivery & Installation in Kathmandu & Butwal Valley.

🖼️ **DATA-STRICT VISUAL RULES (CRITICAL)**:
You MUST extract data from tool JSON. NEVER use placeholder URLs or make up specs.

### A. THE PRODUCT CARD (For specific items):
1. **Title (H2)**: ## [{{name}}](https://wellness-nepal.vercel.app/products/{{PRODUCT_ID}})
2. **Hero Image**: ![{{PRODUCT_NAME}}]({{PRODUCT_IMAGE}}) 
3. **The Steel Table**:
   | Feature | Specification |
   | :--- | :--- |
   | **Category** | {{category}} |
   | (Map all keys from 'specs' object) | ... |
4. **Logistics (H2)**: ## 🛡️ Warranty & Shipping
   - **Warranty**: {{warranty}}
   - **Shipping**: {{shipping}}
5. **Commercials**: **Price: रू {{price}} + 13% VAT** 
   *(If price is missing/null, say: "Price on Request. Please share your number for a formal quotation hajur.")*

### B. THE TRUST CARD (For trust/delivery queries):
1. **Title (H2)**: ## 🏢 Wellness Nepal Logistics & Trust
2. **Table**:
   | Pillar | Standard |
   | :--- | :--- |
   | **UNBREAKABLE** | 12-gauge cold-rolled steel. |
   | **LOGISTICS** | Every district of Nepal covered. |
3. **WhatsApp**: [Connect with Sales Manager](https://wa.me/9779800000000) 📲

## 🔧 TOOL ROUTING:
- Specific machine/specs? → 'search_products({query: "keyword"})'
- Browse category/catalog? → 'get_products({category: "cardio/strength"})'
- General "Show me products"? → 'get_products({number: 5})'
- Trust/Policy/Contact? → 'search_company()'

## ⚠️ FALLBACK PROTOCOL:
- If a tool returns NO data: "Hajur, I couldn't find that specific item in our current stock. Try searching for 'Treadmill', 'Shakti', or 'Cardio' hajur."
- If the user asks for home-grade/plastic equipment: Politely explain that we only provide **Industrial SHAKTI-certified gear** for serious athletes.

**CRITICAL**: Use EXACT 'image' for image url, not example.com/ dummy image for just to fill place use exact image found from tool product and 'id' from tools. Use H2 (##) to trigger the interactive UI. Stay professional, concise, and executive. 🦾🏔️
`
  const modelWithTools = model.bindTools(tools)
  const messages = [new SystemMessage(systemPrompt), ...state.messages]

  // NOTE: We still use invoke here. streamEvents (in the handler)
  // will "peek" into this call and pull out the stream.
  const response = await modelWithTools.invoke(messages)
  return { messages: [response] }
}

// The Router: Decides if we talk to the user or use a tool
const shouldContinue = (state: typeof MessagesAnnotation.State) => {
  const lastMessage = state.messages.at(-1) as AIMessage
  if (lastMessage?.tool_calls && lastMessage.tool_calls.length > 0) {
    return "toolNode"
  }
  return END
}

// Build the Workflow
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agentNode", agentNode)
  .addNode("toolNode", toolNode)
  .addEdge(START, "agentNode")
  .addConditionalEdges("agentNode", shouldContinue, {
    toolNode: "toolNode",
    [END]: END,
  })
  .addEdge("toolNode", "agentNode")

// Compile with Memory (Checkpointer)
const checkpointer = new MemorySaver()
const app = workflow.compile({ checkpointer })

/**
 * ======================================================
 * 2. THE SSE HANDLER (The Delivery System)
 * ======================================================
 */

// export async function POST(request: NextRequest) {
//   try {
//     const { message, threadId } = await request.json()

//     /**
//      * WEB STREAM TOOLS
//      * TransformStream is our "Pipe".
//      * Writer is our "Hand" shoving data in.
//      * Encoder is our "Translator" (Text -> Bytes).
//      */
//     const stream = new TransformStream()
//     const writer = stream.writable.getWriter()
//     const encoder = new TextEncoder()

//     const config = { configurable: { thread_id: threadId || "default" } }

//     // This function runs in the background
//     const runStream = async () => {
//       try {
//         /**
//          * STREAM EVENTS (v2)
//          * This is the secret sauce. It emits events for EVERY tiny action.
//          * We specifically look for "on_chat_model_stream" to get word-by-word text.
//          */
//         const eventStream = await app.streamEvents(
//           { messages: [new HumanMessage(message)] },
//           { ...config, version: "v2" },
//         )

//         for await (const event of eventStream) {
//           const eventType = event.event

//           // A. CHAT TOKENS: When the LLM generates a word/fragment
//           if (eventType === "on_chat_model_stream") {
//             const content = event.data.chunk.content
//             if (content) {
//               // Standard SSE Format: data: <string>\n\n
//               const ssePacket = `data: ${JSON.stringify({ type: "token", content })}\n\n`
//               await writer.write(encoder.encode(ssePacket))
//             }
//           }

//           // B. TOOL STARTS: Let the user know the AI is "searching..."
//           //   else if (eventType === "on_tool_start") {
//           //     const toolPacket = `data: ${JSON.stringify({ type: "tool", name: event.name })}\n\n`
//           //     await writer.write(encoder.encode(toolPacket))
//           //   }
//         }
//       } catch (err) {
//         console.error("Stream Loop Error:", err)
//         const errorPacket = `data: ${JSON.stringify({ type: "error", content: "Stream interrupted" })}\n\n`
//         await writer.write(encoder.encode(errorPacket))
//       } finally {
//         // ALWAYS close the writer or the request will hang forever
//         await writer.write(encoder.encode("data: [DONE]\n\n"))
//         writer.close()
//       }
//     }

//     // Execute the background process (No 'await' here!)
//     runStream()

//     /**
//      * RETURN THE RESPONSE
//      * We return the "Readable" side of the pipe.
//      * The headers tell the browser: "Don't close this yet!"
//      */
//     return new Response(stream.readable, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//         "X-Accel-Buffering": "no", // Disables buffering on Nginx/Vercel
//       },
//     })
//   } catch (error) {
//     console.log("[CHAT_POST_ERROR]: ", error)
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     })
//   }
// }

export async function POST(req: NextRequest) {
  const { message, threadId } = await req.json()
  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const runGraph = async () => {
    try {
      // We use streamEvents (v2) for token-level updates
      const eventStream = await app.streamEvents(
        { messages: [new HumanMessage(message)] },
        { configurable: { thread_id: threadId }, version: "v2" },
      )

      for await (const event of eventStream) {
        if (event.event === "on_chat_model_stream") {
          const content = event.data.chunk.content
          if (content) {
            await writer.write(
              encoder.encode(
                `data: ${JSON.stringify({ type: "token", content })}\n\n`,
              ),
            )
          }
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      await writer.write(encoder.encode("data: [DONE]\n\n"))
      writer.close()
    }
  }

  runGraph()
  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  })
}
