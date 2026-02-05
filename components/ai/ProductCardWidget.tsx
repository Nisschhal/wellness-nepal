// import Link from "next/link"
// import Image from "next/image"
// import { ExternalLink, Dumbbell } from "lucide-react"
// import type { SearchProduct } from "@/lib/ai/types"

// interface ProductCardWidgetProps {
//   product: SearchProduct
//   onClose: () => void
// }

// export function ProductCardWidget({
//   product,
//   onClose,
// }: ProductCardWidgetProps) {
//   // Determine price display: "Rs. X" or "Contact for Quote"
//   const priceDisplay = product.price
//     ? `Rs. ${product.price.toLocaleString()}`
//     : "Contact for Quote"

//   const handleClick = () => {
//     // Only close chat on mobile
//     if (window.matchMedia("(max-width: 767px)").matches) {
//       onClose()
//     }
//   }

//   return (
//     <Link
//       href={`/products/${product.id}`}
//       onClick={handleClick}
//       className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-3 transition-all duration-300 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/5 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-red-500"
//     >
//       {/* Product Image */}
//       <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//       </div>

//       {/* Info */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-start justify-between gap-2">
//           <div className="min-w-0">
//             <h4 className="truncate text-xs font-black uppercase italic text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 transition-colors">
//               {product.name}
//             </h4>
//             <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
//               {product.category}
//             </p>
//           </div>
//           <div className="text-right">
//             <span
//               className={`text-[11px] font-black ${product.price ? "text-zinc-900 dark:text-zinc-100" : "text-red-500 uppercase italic"}`}
//             >
//               {priceDisplay}
//             </span>
//           </div>
//         </div>

//         <div className="mt-2 flex items-center justify-between">
//           <span className="flex items-center gap-1 text-[9px] font-black text-zinc-400 uppercase tracking-tighter">
//             <ExternalLink className="h-2.5 w-2.5" />
//             View Gear Specs
//           </span>
//         </div>
//       </div>
//     </Link>
//   )
// }
