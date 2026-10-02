"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { IconTile } from "@/components/ui/icon-tile"
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

  const tabs = ["specs", "warranty", "delivery"]

  return (
    <main className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 transition-colors relative overflow-x-clip">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <nav className="mb-6">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-surface-muted hover:text-brand-red transition-colors"
          >
            <ArrowLeft size={14} /> BACK TO FULL CATALOG
          </Link>
        </nav>

        <article className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: GALLERY */}
          <div className="space-y-3 lg:sticky lg:top-28">
            <div className="bg-surface-darker industrial-border relative aspect-square overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  variants={fadeVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 touch-pan-y"
                  {...(images.length > 1 && {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.2,
                    onDragEnd: (_: unknown, info: { offset: { x: number } }) => {
                      if (info.offset.x < -50) nextImage()
                      else if (info.offset.x > 50) prevImage()
                    },
                  })}
                >
                  <Image
                    src={images[selectedImage]}
                    alt={`${product.name} - Commercial Gym Equipment Nepal`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain"
                    priority={selectedImage === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      prevImage()
                    }}
                    aria-label="Previous image"
                    className="pointer-events-auto flex size-10 items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-brand-red"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      nextImage()
                    }}
                    aria-label="Next image"
                    className="pointer-events-auto flex size-10 items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-brand-red"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`Show image ${idx + 1}`}
                    className={`relative size-16 md:size-20 shrink-0 overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-brand-red opacity-100"
                        : "border-surface-border opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      className="object-contain"
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO */}
          <div className="space-y-8">
            <header>
              <span className="text-brand-red text-xs font-semibold tracking-[0.2em] block mb-3 uppercase">
                {product.series || product.category} // {product.category}
              </span>
              <h1 className="text-surface-text font-bebas text-4xl sm:text-5xl xl:text-6xl italic leading-[0.95] tracking-tight mb-4 uppercase">
                {product.name}
              </h1>
              <p className="text-surface-muted text-sm md:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="industrial-border bg-surface-darker p-4 md:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-surface-muted">
                      Price
                    </p>
                    <p className="mt-1 text-surface-text font-bebas text-2xl md:text-3xl tracking-wider uppercase leading-none">
                      {product.price
                        ? `NPR ${product.price.toLocaleString()}`
                        : "Price on Enquiry"}
                    </p>
                  </div>
                  <IconTile icon={Package} tone="outline" />
                </div>

                <button
                  onClick={() => router.push(`/contact?item=${product.id}`)}
                  className="mt-4 flex h-12 md:h-14 w-full items-center justify-center gap-3 bg-brand-red font-bold uppercase tracking-wider text-sm md:text-base text-white shadow-lg shadow-brand-red/20 transition-colors hover:bg-surface-text hover:text-surface group"
                >
                  <MessageSquare
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>REQUEST A QUOTE</span>
                </button>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <IconTile icon={Shield} size="sm" />
                    <span className="text-surface-text text-xs font-semibold uppercase tracking-wider">
                      Elite Warranty
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <IconTile icon={Truck} size="sm" />
                    <span className="text-surface-text text-xs font-semibold uppercase tracking-wider">
                      Nationwide Install
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* INFO TABS */}
            <section>
              <div
                className="flex gap-6 border-b border-surface-border overflow-x-auto no-scrollbar"
                role="tablist"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`-mb-px border-b-2 pb-3 font-bebas tracking-widest text-lg transition-colors whitespace-nowrap ${
                      activeTab === tab
                        ? "text-brand-red border-brand-red"
                        : "text-surface-muted border-transparent hover:text-surface-text"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="min-h-[200px] pt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "specs" && (
                      <div>
                        {/* Key-Value Specs */}
                        {Object.keys(product.specs || {}).length > 0 && (
                          <dl className="divide-y divide-surface-border">
                            {Object.entries(product.specs).map(
                              ([key, value]: [string, any]) => (
                                <div
                                  key={key}
                                  className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3"
                                >
                                  <dt className="text-surface-muted text-xs font-semibold tracking-wider uppercase">
                                    {key}
                                  </dt>
                                  <dd className="text-surface-text text-sm font-medium text-right">
                                    {value}
                                  </dd>
                                </div>
                              ),
                            )}
                          </dl>
                        )}
                        {/* Bullet Features */}
                        {product.features?.length > 0 && (
                          <ul className="mt-2 divide-y divide-surface-border">
                            {product.features.map((f: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 py-3">
                                <Check size={16} className="text-brand-red shrink-0 mt-0.5" />
                                <span className="text-surface-text/85 text-sm leading-relaxed">
                                  {f}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {/* Empty state */}
                        {Object.keys(product.specs || {}).length === 0 && (!product.features || product.features.length === 0) && (
                          <p className="text-surface-muted text-sm py-8">
                            Contact us for detailed specifications.
                          </p>
                        )}
                      </div>
                    )}
                    {activeTab === "warranty" && (
                      <ul className="divide-y divide-surface-border">
                        {(
                          product.warranty || [
                            "Lifetime Structural Frame",
                            "1 Year wear parts",
                          ]
                        ).map((w: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 py-3 text-sm text-surface-text/85"
                          >
                            <Check size={16} className="text-brand-red shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {activeTab === "delivery" && (
                      <ul className="divide-y divide-surface-border">
                        {(
                          product.shipping || [
                            "Standard Kathmandu Install",
                            "Regional Freight available",
                          ]
                        ).map((s: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 py-3 text-sm text-surface-text/85"
                          >
                            <Plus size={16} className="text-brand-red shrink-0 mt-0.5" />
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
