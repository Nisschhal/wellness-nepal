// "use client"

// import React, { useState, useMemo, useEffect, Suspense } from "react"
// import { useSearchParams } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Phone,
//   Mail,
//   CheckCircle,
//   X,
//   Printer,
//   Briefcase,
//   Dumbbell,
//   Send,
//   Layers,
//   ChevronDown,
// } from "lucide-react"
// import { PRODUCTS_DATA } from "@/assets/data/products"

// // Import your data here

// const SITE_CONFIG = {
//   brand: {
//     phone: "+977-98XXXXXXXX", // Replace with actual
//     email: "info@wellnessnepal.com",
//     address: "Kathmandu, Nepal",
//   },
//   terms: [
//     "Prices are exclusive of 13% VAT.",
//     "Quote validity: 7 Days from generation.",
//     "Installation: Standard setup included within KTM Valley.",
//     "Payment: 50% Advance for industrial orders.",
//   ],
// }

// const SectionHeading = ({
//   title,
//   subtitle,
// }: {
//   title: string
//   subtitle: string
// }) => (
//   <div className="space-y-2">
//     <h2 className="text-brand-red font-bebas text-2xl tracking-[0.3em] italic">
//       {subtitle}
//     </h2>
//     <h1 className="text-surface-text font-bebas text-6xl md:text-8xl leading-none italic uppercase tracking-tighter">
//       {title}
//     </h1>
//   </div>
// )

// function ContactContent() {
//   const searchParams = useSearchParams()
//   const initialItem = searchParams.get("item")

//   const [enquiryMode, setEnquiryMode] = useState<"specific" | "general">(
//     initialItem ? "specific" : "general",
//   )
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     company: "",
//     message: "",
//   })
//   const [selectedItems, setSelectedItems] = useState<string[]>(
//     initialItem ? [initialItem] : [],
//   )
//   const [showInvoice, setShowInvoice] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

//   // Grouping logic for your PRODUCTS_DATA
//   const productsByCategory = useMemo(() => {
//     return PRODUCTS_DATA.reduce(
//       (acc, product) => {
//         if (!acc[product.category]) acc[product.category] = []
//         acc[product.category].push(product)
//         return acc
//       },
//       {} as Record<string, typeof PRODUCTS_DATA>,
//     )
//   }, [])

//   const toggleItem = (id: string) => {
//     setSelectedItems((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
//     )
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setTimeout(() => {
//       setIsSubmitting(false)
//       setShowInvoice(true)
//     }, 1200)
//   }

//   return (
//     <div className="bg-surface min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 relative">
//       <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
//           {/* INFO SIDE */}
//           <div className="space-y-8 md:space-y-12">
//             <SectionHeading
//               title="PROJECT INQUIRY"
//               subtitle="SHAKTI CONSULTATION"
//             />

//             <p className="text-surface-muted text-lg md:text-2xl mb-8 leading-relaxed italic border-l-4 border-brand-red pl-6">
//               Nepal&apos;s leading industrial-grade gym supplier. Build your{" "}
//               <span className="text-surface-text font-bold underline decoration-brand-red/30 uppercase tracking-widest">
//                 Pro-forma Quote
//               </span>{" "}
//               below.
//             </p>

//             {/* Mode Switcher */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() => setEnquiryMode("general")}
//                 className={`flex-1 p-6 border transition-all flex flex-col gap-4 text-left skew-x-[-12deg] ${enquiryMode === "general" ? "bg-brand-red border-brand-red text-white" : "bg-surface-darker border-surface-border text-surface-muted"}`}
//               >
//                 <div className="skew-x-[12deg]">
//                   <Briefcase size={32} className="mb-4" />
//                   <p className="font-bebas text-2xl md:text-3xl uppercase italic">
//                     GENERAL INQUIRY
//                   </p>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setEnquiryMode("specific")}
//                 className={`flex-1 p-6 border transition-all flex flex-col gap-4 text-left skew-x-[-12deg] ${enquiryMode === "specific" ? "bg-brand-red border-brand-red text-white" : "bg-surface-darker border-surface-border text-surface-muted"}`}
//               >
//                 <div className="skew-x-[12deg]">
//                   <Layers size={32} className="mb-4" />
//                   <p className="font-bebas text-2xl md:text-3xl uppercase italic">
//                     ITEM SPECIFIC
//                   </p>
//                 </div>
//               </button>
//             </div>

//             {/* PRODUCT SELECTOR - Now using your CATEGORIES */}
//             <AnimatePresence mode="wait">
//               {enquiryMode === "specific" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                 >
//                   <h4 className="font-bebas text-2xl text-surface-text tracking-widest mb-6 uppercase italic border-b-2 border-surface-border pb-4">
//                     SELECT EQUIPMENT:
//                   </h4>
//                   <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
//                     {Object.entries(productsByCategory).map(
//                       ([category, items]) => (
//                         <div
//                           key={category}
//                           className="border border-surface-border bg-surface-darker"
//                         >
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setExpandedCategory(
//                                 expandedCategory === category ? null : category,
//                               )
//                             }
//                             className="w-full p-4 md:p-6 flex items-center justify-between font-bebas text-xl md:text-2xl italic tracking-widest text-surface-text"
//                           >
//                             <span className="flex items-center gap-4">
//                               <ChevronDown
//                                 className={`transition-transform ${expandedCategory === category ? "rotate-180 text-brand-red" : "opacity-30"}`}
//                                 size={20}
//                               />
//                               {category.toUpperCase()}
//                             </span>
//                             <span className="text-[10px] font-bold opacity-40">
//                               {items.length} MODELS
//                             </span>
//                           </button>
//                           {expandedCategory === category && (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-surface border-t border-surface-border">
//                               {items.map((p) => (
//                                 <button
//                                   key={p.id}
//                                   type="button"
//                                   onClick={() => toggleItem(p.id)}
//                                   className={`flex items-center gap-4 p-4 border transition-all text-left ${selectedItems.includes(p.id) ? "bg-brand-red/10 border-brand-red text-brand-red" : "bg-surface-darker border-surface-border text-surface-muted"}`}
//                                 >
//                                   <div
//                                     className={`w-6 h-6 border flex items-center justify-center ${selectedItems.includes(p.id) ? "bg-brand-red border-brand-red text-white" : "border-surface-border"}`}
//                                   >
//                                     {selectedItems.includes(p.id) && (
//                                       <CheckCircle size={14} />
//                                     )}
//                                   </div>
//                                   <span className="font-bebas text-lg uppercase italic leading-none">
//                                     {p.name}
//                                   </span>
//                                 </button>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* FORM SIDE */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.98 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="p-8 md:p-16 bg-surface-darker border border-surface-border shadow-2xl relative"
//           >
//             <div className="absolute top-0 right-16 w-32 h-2 bg-brand-red"></div>
//             <h3 className="font-bebas text-4xl md:text-6xl text-surface-text italic mb-12 uppercase">
//               {enquiryMode === "specific"
//                 ? "DEPLOY PROJECT QUOTE"
//                 : "CONSULTATION REQUEST"}
//             </h3>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-2">
//                   <label className="text-surface-muted text-[10px] font-black uppercase tracking-widest">
//                     Full Name
//                   </label>
//                   <input
//                     required
//                     type="text"
//                     className="w-full bg-surface border border-surface-border p-5 font-bebas text-2xl text-surface-text focus:border-brand-red outline-none italic"
//                     placeholder="NAME"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-surface-muted text-[10px] font-black uppercase tracking-widest">
//                     Phone (फोन)
//                   </label>
//                   <input
//                     required
//                     type="tel"
//                     className="w-full bg-surface border border-surface-border p-5 font-bebas text-2xl text-surface-text focus:border-brand-red outline-none italic"
//                     placeholder="98XXXXXXXX"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label className="text-surface-muted text-[10px] font-black uppercase tracking-widest">
//                   Company / Gym Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full bg-surface border border-surface-border p-5 font-bebas text-2xl text-surface-text focus:border-brand-red outline-none italic"
//                   placeholder="FACILITY NAME"
//                   value={formData.company}
//                   onChange={(e) =>
//                     setFormData({ ...formData, company: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-surface-muted text-[10px] font-black uppercase tracking-widest">
//                   Message
//                 </label>
//                 <textarea
//                   rows={4}
//                   className="w-full bg-surface border border-surface-border p-5 font-bebas text-2xl text-surface-text focus:border-brand-red outline-none resize-none italic"
//                   placeholder="TELL US ABOUT YOUR PROJECT..."
//                   value={formData.message}
//                   onChange={(e) =>
//                     setFormData({ ...formData, message: e.target.value })
//                   }
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="skew-button w-full py-8 bg-brand-red text-white font-bold hover:bg-white hover:text-black transition-all text-3xl uppercase tracking-widest shadow-2xl disabled:bg-surface-muted"
//               >
//                 {isSubmitting ? "GENERATING..." : "GET QUOTE"}
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       </div>

//       {/* PRO-FORMA MODAL */}
//       <AnimatePresence>
//         {showInvoice && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-surface/98 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto"
//           >
//             <div className="bg-white text-zinc-950 max-w-5xl w-full p-8 md:p-20 shadow-2xl relative border border-zinc-100 my-10">
//               <button
//                 onClick={() => setShowInvoice(false)}
//                 className="absolute top-8 right-8 text-zinc-300 hover:text-brand-red transition-colors"
//               >
//                 <X size={48} />
//               </button>

//               <div id="invoice-content" className="font-sans">
//                 <header className="flex flex-col md:flex-row justify-between items-start border-b-[15px] border-zinc-950 pb-12 mb-12">
//                   <div>
//                     <h1 className="font-bebas text-7xl md:text-9xl italic leading-[0.7] tracking-tighter">
//                       WELLNESS NEPAL
//                     </h1>
//                     <p className="text-sm font-black tracking-[0.4em] mt-4 opacity-70 uppercase">
//                       Industrial Fitness Solutions
//                     </p>
//                     <div className="mt-6 text-sm font-bold opacity-60">
//                       <p>{SITE_CONFIG.brand.address}</p>
//                       <p>VAT: 601234567</p>
//                     </div>
//                   </div>
//                   <div className="text-left md:text-right mt-8 md:mt-0">
//                     <p className="font-bebas text-5xl italic bg-brand-red text-white px-8 py-4 inline-block">
//                       PRO-FORMA
//                     </p>
//                     <p className="text-xl font-black mt-6 uppercase tracking-widest">
//                       No: WN-{Math.floor(Math.random() * 9000) + 1000}
//                     </p>
//                   </div>
//                 </header>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//                   <div className="bg-zinc-50 p-8 border border-zinc-200">
//                     <h4 className="text-[10px] font-black tracking-widest mb-4 uppercase text-zinc-400">
//                       Client Details
//                     </h4>
//                     <p className="font-bebas text-4xl uppercase leading-none">
//                       {formData.name}
//                     </p>
//                     <p className="font-bold text-lg mt-2 italic text-brand-red uppercase">
//                       {formData.company || "Direct Individual"}
//                     </p>
//                     <p className="text-sm font-bold opacity-50 mt-4">
//                       {formData.phone}
//                     </p>
//                   </div>
//                   <div className="p-8 border border-zinc-200 bg-zinc-950 text-white">
//                     <h4 className="text-[10px] font-black tracking-widest mb-4 uppercase text-zinc-600">
//                       Project Note
//                     </h4>
//                     <p className="text-xl italic font-medium opacity-80 leading-relaxed">
//                       &quot;
//                       {formData.message || "Commercial Fitness Setup Inquiry"}
//                       &quot;
//                     </p>
//                   </div>
//                 </div>

//                 {enquiryMode === "specific" && (
//                   <table className="w-full border-collapse mb-12">
//                     <thead className="bg-zinc-100 text-zinc-950 uppercase text-xs font-black">
//                       <tr>
//                         <th className="p-4 text-left border-b-4 border-zinc-950">
//                           Industrial Equipment Model
//                         </th>
//                         <th className="p-4 text-right border-b-4 border-zinc-950">
//                           Qty
//                         </th>
//                         <th className="p-4 text-right border-b-4 border-zinc-950">
//                           Investment
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedItems.map((id) => {
//                         const product = PRODUCTS_DATA.find((x) => x.id === id)
//                         return (
//                           <tr key={id} className="border-b border-zinc-100">
//                             <td className="p-4">
//                               <p className="font-bebas text-3xl uppercase italic tracking-widest">
//                                 {product?.name}
//                               </p>
//                               <p className="text-[10px] font-black opacity-30 uppercase">
//                                 {product?.category}
//                               </p>
//                             </td>
//                             <td className="p-4 text-right font-black text-xl italic text-zinc-300">
//                               01
//                             </td>
//                             <td className="p-4 text-right font-bebas text-3xl text-zinc-200">
//                               PO REQUIRED
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </table>
//                 )}

//                 <div className="flex flex-col md:flex-row justify-between items-end gap-8">
//                   <div className="max-w-md">
//                     <h4 className="text-[10px] font-black tracking-widest uppercase mb-4 text-zinc-400 underline">
//                       Terms & Conditions
//                     </h4>
//                     <ul className="text-[10px] font-bold text-zinc-400 space-y-1 uppercase tracking-tight">
//                       {SITE_CONFIG.terms.map((t, i) => (
//                         <li key={i}>• {t}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   <button
//                     onClick={() => window.print()}
//                     className="print:hidden flex items-center gap-4 bg-brand-red text-white px-10 py-6 font-bebas text-3xl tracking-widest hover:bg-zinc-950 transition-all skew-x-[-12deg]"
//                   >
//                     <Printer size={32} className="skew-x-[12deg]" />{" "}
//                     <span className="skew-x-[12deg]">SAVE AS PDF</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default function ContactPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-surface" />}>
//       <ContactContent />
//     </Suspense>
//   )
// }
"use client"

import React, { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  Mail,
  CheckCircle,
  X,
  Printer,
  Briefcase,
  Dumbbell,
  Send,
  Layers,
  ChevronDown,
} from "lucide-react"
import { PRODUCTS_DATA } from "@/assets/data/products"
import SectionHeading from "@/components/SectionHeading"

const SITE_CONFIG = {
  brand: {
    phone: "+977-98XXXXXXXX",
    email: "info@wellnessnepal.com",
    address: "Kathmandu, Nepal",
  },
  terms: [
    "Prices shared after Phase 1 Technical Review.",
    "Quote validity: 7 Days from final confirmation.",
    "Installation: Industrial standard within KTM Valley.",
    "Phase 2 includes: Site visit & final price negotiation.",
  ],
}

// const SectionHeading = ({
//   title,
//   subtitle,
// }: {
//   title: string
//   subtitle: string
// }) => (
//   <div className="space-y-1 mb-6 md:mb-10">
//     <h2 className="text-brand-red font-bebas text-lg md:text-xl tracking-[0.3em] italic">
//       {subtitle}
//     </h2>
//     <h1 className="text-surface-text font-bebas text-5xl md:text-7xl leading-none italic uppercase tracking-tighter">
//       {title}
//     </h1>
//   </div>
// )

function ContactContent() {
  const searchParams = useSearchParams()
  const initialItem = searchParams.get("item")

  const [enquiryMode, setEnquiryMode] = useState<"specific" | "general">(
    initialItem ? "specific" : "general",
  )
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    message: "",
  })
  const [selectedItems, setSelectedItems] = useState<string[]>(
    initialItem ? [initialItem] : [],
  )
  const [showInvoice, setShowInvoice] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const productsByCategory = useMemo(() => {
    return PRODUCTS_DATA.reduce(
      (acc, product) => {
        if (!acc[product.category]) acc[product.category] = []
        acc[product.category].push(product)
        return acc
      },
      {} as Record<string, typeof PRODUCTS_DATA>,
    )
  }, [])

  useEffect(() => {
    if (initialItem) {
      const product = PRODUCTS_DATA.find((p) => p.id === initialItem)
      if (product) setExpandedCategory(product.category)
    }
  }, [initialItem])

  useEffect(() => {
    if (showInvoice) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [showInvoice])

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowInvoice(true)
    }, 1200)
  }

  return (
    <div className="bg-surface min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 relative transition-colors duration-300">
      {/* 1. DOCUMENT PRINT CSS - FIXED VERSION */}
      <style jsx global>{`
        @media print {
          /* Kill browser headers/footers (Date, URL, Title) */
          @page {
            size: A4;
            margin: 0;
          }

          /* Force white background and reset heights */
          html,
          body {
            height: auto !important;
            overflow: visible !important;
            background: white !important;
          }

          /* Hide EVERYTHING in the app by default */
          body * {
            visibility: hidden !important;
          }

          /* Hide Nav, footer, buttons explicitly to free up layout space */
          nav,
          footer,
          .print-hidden,
          button,
          .bg-pattern,
          .sticky {
            display: none !important;
          }

          /* Unhide only the document and its nested content */
          #quote-document-wrapper,
          #quote-document-wrapper *,
          #quote-document,
          #quote-document * {
            visibility: visible !important;
          }

          /* Reset the modal positioning for standard paper flow */
          #quote-document-wrapper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }

          /* Target the actual paper card */
          #quote-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20mm !important; /* Proper margin inside the PDF */
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-8">
            <SectionHeading
              title="PROJECT INQUIRY"
              subtitle="SHAKTI CONSULTATION"
            />
            <p className="text-surface-muted text-base md:text-xl leading-relaxed italic border-l-4 border-brand-red pl-6 max-w-xl">
              Select industrial inventory below to generate a professional{" "}
              <span className="text-surface-text font-bold underline decoration-brand-red/30 uppercase tracking-widest">
                Pro-forma
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setEnquiryMode("general")}
                className={`flex-1 p-5 border transition-all skew-x-[-12deg] ${enquiryMode === "general" ? "bg-brand-red border-brand-red text-white" : "bg-surface-darker border-surface-border text-surface-muted"}`}
              >
                <div className="skew-x-[12deg] flex flex-col justify-center items-center  gap-2">
                  <Briefcase size={24} />
                  <p className="font-bebas text-xl md:text-2xl uppercase italic">
                    GENERAL INQUIRY
                  </p>
                  <p
                    className={`text-[10px] md:text-sm font-bold uppercase mt-2 md:mt-4 tracking-widest italic ${enquiryMode === "specific" ? "text-white/70" : "text-surface-muted/60"}`}
                  >
                    Consultancy & Service
                  </p>
                </div>
              </button>
              <button
                onClick={() => setEnquiryMode("specific")}
                className={`flex-1 p-5 border transition-all skew-x-[-12deg] ${enquiryMode === "specific" ? "bg-brand-red border-brand-red text-white" : "bg-surface-darker border-surface-border text-surface-muted"}`}
              >
                <div className="skew-x-[12deg] flex flex-col justify-center items-center  gap-2">
                  <Layers size={24} />
                  <p className="font-bebas text-xl md:text-2xl uppercase italic">
                    ITEM SPECIFIC
                  </p>
                  <p
                    className={`text-[10px] md:text-sm font-bold uppercase mt-2 md:mt-4 tracking-widest italic ${enquiryMode === "specific" ? "text-white/70" : "text-surface-muted/60"}`}
                  >
                    Build Professional Quote
                  </p>
                </div>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {enquiryMode === "specific" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border-b border-surface-border pb-6">
                    {Object.entries(productsByCategory).map(
                      ([category, items]) => (
                        <div
                          key={category}
                          className="border border-surface-border bg-surface-darker"
                        >
                          <button
                            onClick={() =>
                              setExpandedCategory(
                                expandedCategory === category ? null : category,
                              )
                            }
                            className="w-full p-4 flex items-center justify-between font-bebas text-lg md:text-xl italic text-surface-text"
                          >
                            <span className="flex items-center gap-3">
                              <ChevronDown
                                className={`transition-transform duration-300 ${expandedCategory === category ? "rotate-180 text-brand-red" : "opacity-20"}`}
                                size={16}
                              />
                              {category.toUpperCase()}
                            </span>
                          </button>
                          {expandedCategory === category && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-surface border-t border-surface-border">
                              {items.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => toggleItem(p.id)}
                                  className={`flex items-center gap-3 p-3 border transition-all text-left ${selectedItems.includes(p.id) ? "bg-brand-red/5 border-brand-red text-brand-red" : "bg-surface-darker border-surface-border text-surface-muted hover:border-brand-red/30"}`}
                                >
                                  <div
                                    className={`w-5 h-5 border flex items-center justify-center ${selectedItems.includes(p.id) ? "bg-brand-red border-brand-red text-white" : "border-surface-border bg-surface"}`}
                                  >
                                    {selectedItems.includes(p.id) && (
                                      <CheckCircle size={14} />
                                    )}
                                  </div>
                                  <span className="font-bebas text-base uppercase italic leading-none truncate">
                                    {p.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Brand Phone and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-1 pt-6">
              <a
                href={`tel:${SITE_CONFIG.brand.phone}`}
                className="flex items-center gap-4 text-surface-text group"
              >
                <div className="w-12 h-12 bg-surface-darker flex items-center justify-center border border-surface-border group-hover:border-brand-red transition-all shadow -skew-x-12 shrink-0">
                  <Phone
                    size={20}
                    className="group-hover:text-brand-red skew-x-12"
                  />
                </div>
                <span className="font-bebas text-lg md:text-xl tracking-widest italic">
                  {SITE_CONFIG.brand.phone}
                </span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.brand.email}`}
                className="flex items-center gap-4 text-surface-text group"
              >
                <div className="w-12 h-12 bg-surface-darker flex items-center justify-center border border-surface-border group-hover:border-brand-red transition-all shadow -skew-x-12 shrink-0">
                  <Mail
                    size={20}
                    className="group-hover:text-brand-red skew-x-12"
                  />
                </div>
                <span className="font-bebas text-lg md:text-xl tracking-widest italic truncate">
                  {SITE_CONFIG.brand.email}
                </span>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 md:p-12 bg-surface-darker border border-surface-border shadow-2xl relative self-start z-10"
          >
            <div className="absolute top-0 right-8 md:right-12 w-20 md:w-24 h-2 bg-brand-red"></div>
            <h3 className="font-bebas text-4xl md:text-5xl text-surface-text italic mb-8 uppercase">
              REQUEST CONSULTATION
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-surface-muted text-[10px] font-black tracking-widest uppercase">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-surface border border-surface-border p-4 font-bebas text-xl text-surface-text focus:border-brand-red outline-none italic shadow-inner"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-surface-muted text-[10px] font-black tracking-widest uppercase">
                    Phone (फोन)
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-surface border border-surface-border p-4 font-bebas text-xl text-surface-text focus:border-brand-red outline-none italic shadow-inner"
                    placeholder="98XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-surface-muted text-[10px] font-black tracking-widest uppercase">
                  Company / Gym Name
                </label>
                <input
                  type="text"
                  className="w-full bg-surface border border-surface-border p-4 font-bebas text-xl text-surface-text focus:border-brand-red outline-none italic shadow-inner"
                  placeholder="FACILITY NAME"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-surface-muted text-[10px] font-black tracking-widest uppercase">
                  Project Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-surface border border-surface-border p-4 font-bebas text-xl text-surface-text focus:border-brand-red outline-none resize-none italic shadow-inner"
                  placeholder="MESSAGE..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="skew-button w-full py-6 bg-brand-red text-white font-bold hover:bg-white hover:text-black transition-all text-2xl uppercase tracking-widest shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isSubmitting ? (
                  "GENERATING..."
                ) : (
                  <>
                    <Send size={24} /> <span>GET QUOTE</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* PRO-FORMA MODAL */}
      <AnimatePresence>
        {showInvoice && (
          <motion.div
            id="quote-document-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-zinc-950/95 backdrop-blur-md overflow-y-auto px-2 py-4 md:p-10 flex justify-center items-start"
          >
            <div
              className="bg-white text-zinc-950 max-w-[850px] w-full h-auto shadow-[0_0_100px_rgba(0,0,0,0.5)] relative border border-zinc-200 overflow-hidden"
              id="quote-document"
            >
              {/* Responsive Sticky Header (Hides in Print) */}
              <div className="sticky top-0 z-[1100] bg-zinc-100 p-3 border-b border-zinc-200 flex justify-end gap-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="bg-brand-red text-white px-5 py-2 font-bebas text-lg flex items-center gap-2 hover:bg-zinc-900 transition-all"
                >
                  <Printer size={18} /> SAVE AS PDF
                </button>
                <button
                  onClick={() => setShowInvoice(false)}
                  className="bg-zinc-900 text-white p-2 hover:bg-brand-red transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* THE PAPER DOCUMENT */}
              <div className="p-8 md:p-14 font-sans text-left">
                <header className="flex justify-between items-start border-b-[8px] border-zinc-950 pb-8 mb-8">
                  <div className="space-y-2">
                    <h1 className="font-bebas text-5xl md:text-7xl italic leading-[0.8] tracking-tighter uppercase">
                      WELLNESS NEPAL
                    </h1>
                    <p className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase opacity-70">
                      Industrial Fitness Solutions
                    </p>
                    <div className="text-[10px] font-bold opacity-40 uppercase tracking-tight">
                      <p>{SITE_CONFIG.brand.address} | VAT: 601234567</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="font-bebas text-2xl md:text-4xl italic bg-brand-red text-white px-5 py-2 inline-block">
                      PRO-FORMA
                    </span>
                    <p className="text-xs md:text-sm font-black uppercase tracking-widest mt-2">
                      DOC: WN-{Math.floor(Math.random() * 9000) + 1000}
                    </p>
                    <p className="text-[9px] font-bold opacity-30 uppercase">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </header>

                <div className="grid grid-cols-2 gap-10 mb-10 items-start">
                  <div className="border-l-2 border-zinc-100 pl-6 py-2">
                    <h4 className="text-[9px] font-black tracking-[0.2em] mb-3 uppercase text-zinc-400">
                      Recipient Details
                    </h4>
                    <p className="font-bebas text-3xl uppercase leading-none mb-1">
                      {formData.name}
                    </p>
                    <p className="font-bold text-xs italic text-brand-red uppercase">
                      {formData.company || "Individual Client"}
                    </p>
                    <p className="text-xs font-medium opacity-50 mt-1">
                      {formData.phone}
                    </p>
                  </div>
                  <div className="border-l-2 border-zinc-100 pl-6 py-2">
                    <h4 className="text-[9px] font-black tracking-[0.2em] mb-3 uppercase text-zinc-400">
                      Consultation Brief
                    </h4>
                    <p className="text-xs italic font-medium opacity-80 leading-relaxed">
                      &quot;
                      {formData.message ||
                        "Industrial setup inquiry for professional facility."}
                      &quot;
                    </p>
                  </div>
                </div>

                {enquiryMode === "specific" && (
                  <div className="mb-10">
                    <table className="w-full border-collapse">
                      <thead className="bg-zinc-50 uppercase text-[9px] font-black border-y border-zinc-200">
                        <tr>
                          <th className="p-4 text-left">
                            Industrial Equipment Model
                          </th>
                          <th className="p-4 text-center w-24">Qty</th>
                          <th className="p-4 text-right w-48">Price:</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItems.map((id) => {
                          const p = PRODUCTS_DATA.find((x) => x.id === id)
                          return (
                            <tr key={id} className="border-b border-zinc-50">
                              <td className="p-4">
                                <p className="font-bebas text-xl md:text-2xl uppercase italic tracking-wider leading-none">
                                  {p?.name}
                                </p>
                                <p className="text-[8px] font-black opacity-30 mt-1 uppercase tracking-widest">
                                  {p?.category}
                                </p>
                              </td>
                              <td className="p-4 text-center font-bold text-xs italic text-zinc-400">
                                01 UNIT
                              </td>
                              <td className="p-4 text-right font-bebas text-xl text-zinc-300 italic">
                                PHASE 2 REVIEW REQUIRED
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-end gap-10 pt-10 border-t border-zinc-100">
                  <div className="max-w-xs space-y-4">
                    <h4 className="text-[9px] font-black tracking-widest uppercase text-zinc-400 underline decoration-zinc-200">
                      Legal Provisions
                    </h4>
                    <ul className="text-[8px] font-bold text-zinc-400 space-y-1.5 uppercase tracking-tight list-disc list-inside">
                      {SITE_CONFIG.terms.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em] mb-4">
                      Authorized Digital Stamp
                    </p>
                    <div className="font-bebas text-4xl md:text-5xl opacity-[0.03] italic -rotate-12 select-none pointer-events-none uppercase">
                      WELLNESS NEPAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <ContactContent />
    </Suspense>
  )
}
