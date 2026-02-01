// "use client"

// import React, { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Shield,
//   Truck,
//   Package,
//   Check,
//   ArrowLeft,
//   MessageSquare,
//   Plus,
// } from "lucide-react"

// export default function ProductDetail({ product }: { product: any }) {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = useState("specs")
//   const [selectedImage, setSelectedImage] = useState(0)

//   const images = product.images || [product.image]
//   const handleEnquiry = () => router.push(`/contact?item=${product.id}`)

//   return (
//     <main className="bg-surface min-h-screen pt-32 pb-24 transition-colors relative">
//       <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

//       <div className="container mx-auto px-6 relative z-10">
//         <nav className="mb-12">
//           <Link
//             href="/category"
//             className="flex items-center gap-2 text-surface-muted hover:text-surface-text transition-colors font-bebas tracking-widest text-sm"
//           >
//             <ArrowLeft size={16} /> BACK TO FULL CATALOG
//           </Link>
//         </nav>

//         <article className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
//           {/* LEFT: IMAGES */}
//           <div className="space-y-6">
//             <div className="bg-surface-darker industrial-border relative group overflow-hidden">
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={selectedImage}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   src={images[selectedImage]}
//                   alt={product.name}
//                   className="w-full aspect-square object-cover [@media(hover:hover)]:grayscale group-hover:grayscale-0 transition-all duration-700"
//                 />
//               </AnimatePresence>
//               <div className="absolute top-6 left-6 bg-brand-red text-white px-4 py-1 font-bebas text-sm -skew-x-12">
//                 SHAKTI LINE // NEPAL
//               </div>
//             </div>

//             {images.length > 1 && (
//               <div className="grid grid-cols-4 gap-4">
//                 {images.map((img: string, idx: number) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`aspect-square border-2 transition-all overflow-hidden ${selectedImage === idx ? "border-brand-red opacity-100" : "border-surface-border opacity-40 hover:opacity-100"}`}
//                   >
//                     <img
//                       src={img}
//                       className="w-full h-full object-cover"
//                       alt={`${product.name} view ${idx + 1}`}
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}

//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-6 industrial-border bg-surface-darker flex items-center gap-4">
//                 <Shield className="text-brand-red shrink-0" size={24} />
//                 <span className="text-surface-text font-bebas tracking-widest text-sm">
//                   ELITE WARRANTY
//                 </span>
//               </div>
//               <div className="p-6 industrial-border bg-surface-darker flex items-center gap-4">
//                 <Truck className="text-brand-red shrink-0" size={24} />
//                 <span className="text-surface-text font-bebas tracking-widest text-sm">
//                   NEPAL-WIDE INSTALL
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: CONTENT */}
//           <div className="space-y-12">
//             <header>
//               <span className="text-brand-red font-bebas tracking-[0.4em] text-xs block mb-4 uppercase">
//                 SHAKTI SERIES // {product.category}
//               </span>
//               <h1 className="text-surface-text font-bebas text-7xl md:text-9xl italic leading-none tracking-tighter mb-8 uppercase">
//                 {product.name}
//               </h1>
//               <p className="text-surface-muted text-xl leading-relaxed font-light mb-10 italic">
//                 {product.description}
//               </p>

//               <div className="p-8 bg-surface-darker border-l-4 border-brand-red mb-10 flex justify-between items-center">
//                 <div>
//                   <p className="text-surface-text font-bebas text-3xl tracking-widest uppercase">
//                     {product.price
//                       ? `NPR ${product.price.toLocaleString()}`
//                       : "Price on Enquiry"}
//                   </p>
//                 </div>
//                 <div className="text-surface-text opacity-20 hidden md:block">
//                   <Package size={40} />
//                 </div>
//               </div>

//               <button
//                 onClick={handleEnquiry}
//                 className="skew-button bg-brand-red w-full py-6 text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-2xl shadow-xl shadow-brand-red/20 flex items-center justify-center gap-4 group"
//               >
//                 <MessageSquare
//                   size={24}
//                   className="group-hover:scale-110 transition-transform"
//                 />
//                 <span>REQUEST B2B QUOTE</span>
//               </button>
//             </header>

//             {/* TABS SECTION */}
//             <section className="border-t border-surface-border pt-12">
//               <div className="flex gap-10 mb-10 overflow-x-auto no-scrollbar pb-2">
//                 {["specs", "warranty", "delivery"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`font-bebas tracking-widest text-xl transition-all relative whitespace-nowrap ${
//                       activeTab === tab
//                         ? "text-brand-red border-b-2 border-brand-red pb-2"
//                         : "text-surface-muted hover:text-surface-text"
//                     }`}
//                   >
//                     {tab.toUpperCase()}
//                   </button>
//                 ))}
//               </div>

//               <div className="min-h-[250px]">
//                 {activeTab === "specs" && (
//                   <div className="grid grid-cols-1 gap-2">
//                     {Object.entries(product.specs).map(
//                       ([key, value]: [string, any]) => (
//                         <div
//                           key={key}
//                           className="flex justify-between items-center py-4 border-b border-surface-border"
//                         >
//                           <span className="text-surface-muted font-bold tracking-[0.2em] text-[10px] uppercase italic">
//                             {key}
//                           </span>
//                           <span className="text-surface-text font-bebas text-xl">
//                             {value}
//                           </span>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 )}
//                 {activeTab === "warranty" && (
//                   <ul className="space-y-4">
//                     {(
//                       product.warranty || [
//                         "Lifetime Structural Frame Warranty",
//                         "1 Year on wear parts",
//                       ]
//                     ).map((w: string, i: number) => (
//                       <li
//                         key={i}
//                         className="flex items-center gap-4 text-surface-muted italic"
//                       >
//                         <Check size={18} className="text-brand-red shrink-0" />
//                         <span>{w}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//                 {activeTab === "delivery" && (
//                   <ul className="space-y-4">
//                     {(
//                       product.shipping || [
//                         "Free installation in Kathmandu",
//                         "Nationwide site assessment available",
//                       ]
//                     ).map((s: string, i: number) => (
//                       <li
//                         key={i}
//                         className="flex items-center gap-4 text-surface-muted italic"
//                       >
//                         <Plus size={18} className="text-brand-red shrink-0" />
//                         <span>{s}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </section>
//           </div>
//         </article>
//       </div>
//     </main>
//   )
// }
"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Truck,
  Package,
  Check,
  ArrowLeft,
  MessageSquare,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ProductClient({ product }: { product: any }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("specs")
  const [selectedImage, setSelectedImage] = useState(0)

  const images = product.images || [product.image]

  // Industry Standard 4s for product viewing
  const AUTO_PLAY_INTERVAL = 5000

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-cycle logic
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(nextImage, AUTO_PLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [nextImage, images.length])

  // Premium Fade Variants
  const fadeVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <main className="bg-surface min-h-screen pt-32 pb-24 transition-colors relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <nav className="mb-12">
          <Link
            href="/category"
            className="flex items-center gap-2 text-surface-muted hover:text-surface-text transition-colors font-bebas tracking-widest text-sm uppercase"
          >
            <ArrowLeft size={16} /> BACK TO FULL CATALOG
          </Link>
        </nav>

        <article className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN: THE PREMIUM CROSS-FADE CAROUSEL */}
          <div className="space-y-6">
            <div className="bg-surface-darker industrial-border relative aspect-square overflow-hidden group">
              {/* mode="wait" ensures one image fades out completely before next fades in, 
                  or remove it for a smoother overlapping cross-fade */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  variants={fadeVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover [@media(hover:hover)]:grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    prevImage()
                  }}
                  className="pointer-events-auto bg-black/40 backdrop-blur-sm p-3 text-white hover:bg-brand-red transition-all -skew-x-12"
                >
                  <ChevronLeft className="skew-x-12" size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    nextImage()
                  }}
                  className="pointer-events-auto bg-black/40 backdrop-blur-sm p-3 text-white hover:bg-brand-red transition-all -skew-x-12"
                >
                  <ChevronRight className="skew-x-12" size={24} />
                </button>
              </div>

              {/* Industrial Tag */}
              <div className="absolute top-6 left-6 z-20 bg-brand-red text-white px-4 py-1 font-bebas text-sm -skew-x-12 shadow-xl">
                SHAKTI LINE // NEPAL
              </div>
            </div>

            {/* Thumbnail Selection - Horizontal Scroll */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 border-2 transition-all overflow-hidden relative ${
                      selectedImage === idx
                        ? "border-brand-red opacity-100"
                        : "border-surface-border opacity-40 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 industrial-border bg-surface-darker flex items-center gap-4">
                <Shield className="text-brand-red shrink-0" size={24} />
                <span className="text-surface-text font-bebas tracking-widest text-sm uppercase">
                  Elite Warranty
                </span>
              </div>
              <div className="p-6 industrial-border bg-surface-darker flex items-center gap-4">
                <Truck className="text-brand-red shrink-0" size={24} />
                <span className="text-surface-text font-bebas tracking-widest text-sm uppercase">
                  Nationwide Install
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO */}
          <div className="space-y-12">
            <header>
              <span className="text-brand-red font-bebas tracking-[0.4em] text-xs block mb-4 uppercase">
                SHAKTI SERIES // {product.category}
              </span>
              <h1 className="text-surface-text font-bebas text-7xl md:text-9xl italic leading-none tracking-tighter mb-8 uppercase">
                {product.name}
              </h1>
              <p className="text-surface-muted text-xl leading-relaxed font-light mb-10 italic">
                {product.description}
              </p>

              <div className="p-8 bg-surface-darker border-l-4 border-brand-red mb-10 flex justify-between items-center relative overflow-hidden">
                <p className="text-surface-text font-bebas text-3xl md:text-4xl tracking-widest uppercase">
                  {product.price
                    ? `NPR ${product.price.toLocaleString()}`
                    : "Price on Enquiry"}
                </p>
                <Package
                  size={80}
                  className="absolute right-4 text-surface-text opacity-5 -rotate-12"
                />
              </div>

              <button
                onClick={() => router.push(`/contact?item=${product.id}`)}
                className="skew-button bg-brand-red w-full py-6 text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-2xl shadow-xl shadow-brand-red/20 flex items-center justify-center gap-4 group"
              >
                <MessageSquare
                  size={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>REQUEST B2B QUOTE</span>
              </button>
            </header>

            {/* INFO TABS */}
            <section className="border-t border-surface-border pt-12">
              <div className="flex gap-10 mb-10 overflow-x-auto no-scrollbar pb-2">
                {["specs", "warranty", "delivery"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-bebas tracking-widest text-xl transition-all relative whitespace-nowrap ${
                      activeTab === tab
                        ? "text-brand-red border-b-2 border-brand-red pb-2"
                        : "text-surface-muted hover:text-surface-text"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "specs" && (
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(product.specs).map(
                          ([key, value]: [string, any]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-4 border-b border-surface-border"
                            >
                              <span className="text-surface-muted font-bold tracking-[0.2em] text-[10px] uppercase italic">
                                {key}
                              </span>
                              <span className="text-surface-text font-bebas text-xl">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                    {activeTab === "warranty" && (
                      <ul className="space-y-6">
                        {(
                          product.warranty || [
                            "Lifetime Structural Frame",
                            "1 Year wear parts",
                          ]
                        ).map((w: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-center gap-4 text-surface-muted italic text-lg"
                          >
                            <Check
                              size={20}
                              className="text-brand-red shrink-0"
                            />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeTab === "delivery" && (
                      <ul className="space-y-6">
                        {(
                          product.shipping || [
                            "Standard Kathmandu Install",
                            "Regional Freight available",
                          ]
                        ).map((s: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-center gap-4 text-surface-muted italic text-lg"
                          >
                            <Plus
                              size={20}
                              className="text-brand-red shrink-0"
                            />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
