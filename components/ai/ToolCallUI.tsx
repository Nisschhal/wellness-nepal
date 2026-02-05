// import { Dumbbell, CheckCircle2, Loader2, Search } from "lucide-react"
// import type { SearchProductsResult } from "@/lib/ai/types"
// import { ProductCardWidget } from "./ProductCardWidget"

// interface ToolCallUIProps {
//   toolPart: any // Use any for flexibility with AI SDK tool states
//   closeChat: () => void
// }

// export function ToolCallUI({ toolPart, closeChat }: ToolCallUIProps) {
//   const toolName = toolPart.toolName

//   // We only care about product searches for the Gym Agent
//   if (toolName !== "searchProducts") return null

//   // Tool States
//   const isComplete = toolPart.state === "result" || !!toolPart.result
//   const searchQuery = toolPart.args?.query
//   const result = toolPart.result as SearchProductsResult | undefined

//   return (
//     <div className="space-y-3 my-4">
//       {/* Tool Status Header */}
//       <div className="flex gap-3">
//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500 shadow-lg shadow-red-500/20">
//           <Dumbbell className="h-4 w-4 text-white" />
//         </div>

//         <div
//           className={`flex items-center gap-3 rounded-2xl px-4 py-2 border transition-all duration-300 ${
//             isComplete
//               ? "bg-zinc-100 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
//               : "bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/30 animate-pulse"
//           }`}
//         >
//           {isComplete ? (
//             <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
//           ) : (
//             <Loader2 className="h-4 w-4 text-red-500 animate-spin shrink-0" />
//           )}

//           <div className="flex flex-col">
//             <span
//               className={`text-[11px] font-black uppercase tracking-wider ${
//                 isComplete ? "text-zinc-600 dark:text-zinc-400" : "text-red-600"
//               }`}
//             >
//               {isComplete ? "Gear Found" : "Scanning Shakti Catalog..."}
//             </span>
//             {searchQuery && !isComplete && (
//               <span className="text-[10px] text-zinc-400 font-bold uppercase truncate max-w-[150px]">
//                 Seeking: {searchQuery}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Results Container */}
//       {isComplete && result?.found && (
//         <div className="ml-11 space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
//           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-1">
//             Matches Found ({result.products.length})
//           </p>
//           <div className="grid gap-2">
//             {result.products.map((product) => (
//               <ProductCardWidget
//                 key={product.id}
//                 product={product}
//                 onClose={closeChat}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
