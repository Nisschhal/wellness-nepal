"use client"

import React, { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Phone,
  Mail,
  Check,
  X,
  Printer,
  Briefcase,
  Send,
  Layers,
  ChevronDown,
  MapPin,
  Search,
  Star,
  MessageCircle,
} from "lucide-react"
import { IconTile } from "@/components/ui/icon-tile"
import { PRODUCTS } from "@/assets/constants"
import SectionHeading from "@/components/SectionHeading"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const SITE_CONFIG = {
  brand: COMPANY_DETAILS.brand,
  terms: [
    "Prices shared after Phase 1 Technical Review.",
    "Quote validity: 7 Days from final confirmation.",
    "Installation: delivery and installation across Nepal.",
    "Phase 2 includes: Site visit & final price negotiation.",
  ],
}

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
  const [itemSearch, setItemSearch] = useState("")

  const productsByCategory = useMemo(() => {
    return PRODUCTS.reduce(
      (acc, product) => {
        if (!acc[product.category]) acc[product.category] = []
        acc[product.category].push(product)
        return acc
      },
      {} as Record<string, typeof PRODUCTS>,
    )
  }, [])

  const filteredByCategory = useMemo(() => {
    const q = itemSearch.trim().toLowerCase()
    if (!q) return productsByCategory
    const out: Record<string, typeof PRODUCTS> = {}
    for (const [cat, items] of Object.entries(productsByCategory)) {
      const hits = items.filter((p) => p.name.toLowerCase().includes(q))
      if (hits.length) out[cat] = hits
    }
    return out
  }, [itemSearch, productsByCategory])

  const labelCls =
    "block text-surface-muted text-xs font-semibold tracking-wider uppercase"
  const inputCls =
    "w-full h-12 bg-surface border border-surface-border px-4 text-sm text-surface-text placeholder:text-surface-muted/70 focus:border-brand-red outline-none transition-colors"

  useEffect(() => {
    if (initialItem) {
      const product = PRODUCTS.find((p) => p.id === initialItem)
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
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 relative transition-colors duration-300">
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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 lg:gap-12 items-start">
          <div className="space-y-6 min-w-0">
            <SectionHeading
              title="PROJECT INQUIRY"
              subtitle="FREE CONSULTATION"
              description={
                <>
                  Select industrial inventory below to generate a professional{" "}
                  <span className="text-surface-text font-semibold underline decoration-brand-red decoration-2 underline-offset-4">
                    Pro-forma
                  </span>
                  .
                </>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  {
                    mode: "general",
                    icon: Briefcase,
                    title: "GENERAL INQUIRY",
                    sub: "Consultancy & Service",
                  },
                  {
                    mode: "specific",
                    icon: Layers,
                    title: "ITEM SPECIFIC",
                    sub: "Build Professional Quote",
                  },
                ] as const
              ).map(({ mode, icon: Icon, title, sub }) => {
                const active = enquiryMode === mode
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setEnquiryMode(mode)}
                    aria-pressed={active}
                    className={`flex items-center gap-4 p-4 border text-left transition-all ${active ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20" : "bg-surface-darker border-surface-border text-surface-text hover:border-brand-red/50"}`}
                  >
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center border ${active ? "border-white/30 bg-white/10" : "border-brand-red/25 bg-brand-red/10 text-brand-red"}`}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-bebas text-xl md:text-2xl leading-none tracking-wide uppercase">
                        {title}
                      </span>
                      <span
                        className={`mt-1 block text-xs font-medium ${active ? "text-white/80" : "text-surface-muted"}`}
                      >
                        {sub}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              {enquiryMode === "specific" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="industrial-border bg-surface-darker"
                >
                  <div className="flex items-center gap-3 border-b border-surface-border p-3">
                    <div className="relative flex-1">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-muted"
                      />
                      <input
                        type="text"
                        aria-label="Search products"
                        placeholder="Search products..."
                        value={itemSearch}
                        onChange={(e) => setItemSearch(e.target.value)}
                        className="h-10 w-full border border-surface-border bg-surface pl-9 pr-3 text-sm text-surface-text placeholder:text-surface-muted outline-none focus:border-brand-red"
                      />
                    </div>
                    <span className="shrink-0 bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red">
                      {selectedItems.length} selected
                    </span>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto divide-y divide-surface-border">
                    {Object.entries(filteredByCategory).map(
                      ([category, items]) => {
                        const open =
                          itemSearch.trim() !== "" ||
                          expandedCategory === category
                        return (
                          <div key={category}>
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedCategory(
                                  expandedCategory === category
                                    ? null
                                    : category,
                                )
                              }
                              aria-expanded={open}
                              className="flex h-12 w-full items-center justify-between px-4 text-left text-sm font-semibold uppercase tracking-wider text-surface-text hover:text-brand-red transition-colors"
                            >
                              <span>{category}</span>
                              <span className="flex items-center gap-3">
                                <span className="text-xs font-medium text-surface-muted normal-case tracking-normal">
                                  {items.length} items
                                </span>
                                <ChevronDown
                                  className={`transition-transform duration-300 ${open ? "rotate-180 text-brand-red" : "text-surface-muted"}`}
                                  size={16}
                                />
                              </span>
                            </button>
                            {open && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-surface p-3">
                                {items.map((p) => {
                                  const checked = selectedItems.includes(p.id)
                                  return (
                                    <button
                                      key={p.id}
                                      type="button"
                                      onClick={() => toggleItem(p.id)}
                                      aria-pressed={checked}
                                      className={`flex items-center gap-3 p-2 border text-left transition-all ${checked ? "bg-brand-red/5 border-brand-red" : "bg-surface-darker border-surface-border hover:border-brand-red/40"}`}
                                    >
                                      <span className="relative size-12 shrink-0 overflow-hidden bg-white">
                                        <Image
                                          src={p.image}
                                          alt=""
                                          fill
                                          sizes="48px"
                                          className="object-contain"
                                        />
                                      </span>
                                      <span
                                        className={`min-w-0 flex-1 text-sm font-medium leading-snug line-clamp-2 ${checked ? "text-brand-red" : "text-surface-text"}`}
                                      >
                                        {p.name}
                                      </span>
                                      <span
                                        className={`flex size-5 shrink-0 items-center justify-center border ${checked ? "bg-brand-red border-brand-red text-white" : "border-surface-border bg-surface"}`}
                                      >
                                        {checked && <Check size={14} />}
                                      </span>
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      },
                    )}
                    {Object.keys(filteredByCategory).length === 0 && (
                      <p className="p-6 text-center text-sm text-surface-muted">
                        No products match &ldquo;{itemSearch}&rdquo;
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact details */}
            <div className="industrial-border bg-surface-darker p-4 md:p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                {[SITE_CONFIG.brand.phone, ...SITE_CONFIG.brand.otherPhones].map(
                  (phone) => (
                    <a
                      key={phone}
                      {...(phone === SITE_CONFIG.brand.phone
                        ? {
                            href: COMPANY_DETAILS.brand.whatsapp,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : { href: `tel:${phone}` })}
                      className="group flex items-center gap-3 border border-surface-border bg-surface p-2.5 text-surface-text hover:border-brand-red transition-colors"
                    >
                      {phone === SITE_CONFIG.brand.phone ? (
                        <span className="inline-flex size-9 shrink-0 items-center justify-center border border-[#25D366]/30 bg-[#25D366]/15 text-[#25D366]">
                          <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
                        </span>
                      ) : (
                        <IconTile icon={Phone} size="sm" />
                      )}
                      <span className="min-w-0">
                        <span className="block whitespace-nowrap text-sm font-semibold tabular-nums group-hover:text-brand-red transition-colors">
                          {phone}
                        </span>
                        <span className="block text-[11px] text-surface-muted">
                          {phone === SITE_CONFIG.brand.phone ? "WhatsApp" : "Call"}
                        </span>
                      </span>
                    </a>
                  ),
                )}
                {SITE_CONFIG.brand.email && (
                  <a
                    href={`mailto:${SITE_CONFIG.brand.email}`}
                    className="group flex items-center gap-3 border border-surface-border bg-surface p-2.5 text-surface-text hover:border-brand-red transition-colors"
                  >
                    <IconTile icon={Mail} size="sm" />
                    <span className="text-sm font-semibold truncate group-hover:text-brand-red transition-colors">
                      {SITE_CONFIG.brand.email}
                    </span>
                  </a>
                )}
              </div>
              <p className="flex items-start gap-2 text-sm text-surface-muted">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />
                <span>
                  {SITE_CONFIG.brand.address} · {SITE_CONFIG.brand.hours.label}
                </span>
              </p>
              <iframe
                title="WN Wellness Gym Equipment Nepal on Google Maps"
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${SITE_CONFIG.brand.name}, Butwal`)}&output=embed`}
                className="w-full h-56 border border-surface-border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={COMPANY_DETAILS.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 border border-surface-border px-4 text-xs font-semibold uppercase tracking-wider text-surface-text hover:border-brand-red hover:text-brand-red transition-all"
              >
                <Star size={14} className="text-brand-red" fill="currentColor" />
                Review us on Google
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 md:p-8 bg-surface-darker border border-surface-border shadow-2xl relative z-10 lg:sticky lg:top-28"
          >
            <div className="absolute top-0 right-6 md:right-8 w-16 h-1.5 bg-brand-red"></div>
            <h3 className="font-bebas text-3xl md:text-4xl text-surface-text mb-6 uppercase tracking-wide">
              REQUEST CONSULTATION
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="q-name" className={labelCls}>
                    Full Name
                  </label>
                  <input
                    id="q-name"
                    required
                    type="text"
                    className={inputCls}
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="q-phone" className={labelCls}>
                    Phone (फोन)
                  </label>
                  <input
                    id="q-phone"
                    required
                    type="tel"
                    className={inputCls}
                    placeholder="9804830607"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="q-company" className={labelCls}>
                  Company / Gym Name
                </label>
                <input
                  id="q-company"
                  type="text"
                  className={inputCls}
                  placeholder="Facility name"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="q-message" className={labelCls}>
                  Project Message
                </label>
                <textarea
                  id="q-message"
                  rows={4}
                  className={`${inputCls} h-auto py-3 resize-none`}
                  placeholder="Message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              {enquiryMode === "specific" && selectedItems.length > 0 && (
                <div className="space-y-2">
                  <p className={labelCls}>
                    Selected items ({selectedItems.length})
                  </p>
                  <ul className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                    {selectedItems.map((id) => {
                      const p = PRODUCTS.find((x) => x.id === id)
                      if (!p) return null
                      return (
                        <li
                          key={id}
                          className="flex items-center gap-3 border border-surface-border bg-surface p-1.5 pr-2"
                        >
                          <span className="relative size-9 shrink-0 overflow-hidden bg-white">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-contain"
                            />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm text-surface-text">
                            {p.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleItem(id)}
                            aria-label={`Remove ${p.name}`}
                            className="flex size-7 shrink-0 items-center justify-center text-surface-muted hover:bg-brand-red/10 hover:text-brand-red"
                          >
                            <X size={14} />
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="skew-button w-full h-14 bg-brand-red text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-base md:text-lg uppercase tracking-widest shadow-xl shadow-brand-red/30 disabled:opacity-50 gap-3"
              >
                {isSubmitting ? (
                  <span>GENERATING...</span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Send size={18} /> GET QUOTE
                  </span>
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
                      WN WELLNESS
                    </h1>
                    <p className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase opacity-70">
                      Industrial Fitness Solutions
                    </p>
                    <div className="text-[10px] font-bold opacity-40 uppercase tracking-tight">
                      <p>{SITE_CONFIG.brand.address} | PAN/VAT: {SITE_CONFIG.brand.pan}</p>
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
                    <p className="font-bold text-xs text-brand-red uppercase">
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
                    <p className="text-xs font-medium opacity-80 leading-relaxed">
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
                          const p = PRODUCTS.find((x) => x.id === id)
                          return (
                            <tr key={id} className="border-b border-zinc-50">
                              <td className="p-4">
                                <p className="font-bebas text-xl md:text-2xl uppercase tracking-wider leading-none">
                                  {p?.name}
                                </p>
                                <p className="text-[8px] font-black opacity-30 mt-1 uppercase tracking-widest">
                                  {p?.category}
                                </p>
                              </td>
                              <td className="p-4 text-center font-bold text-xs text-zinc-400">
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
