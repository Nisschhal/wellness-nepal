"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { PRODUCTS } from "@/assets/constants"
import { Category as CategoryType } from "@/types"

const INITIAL_VISIBLE = 9
const INCREMENT = 6

function CategoryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL States
  const initialType = (searchParams.get("type") as CategoryType) || "All"
  const [activeType, setActiveType] = useState<CategoryType | "All">(
    initialType,
  )

  // Search States
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  // Handle Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 200)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Sync Category with URL
  useEffect(() => {
    const type = (searchParams.get("type") as CategoryType) || "All"
    setActiveType(type)
  }, [searchParams])

  // RESET visible count when search or category changes to avoid giant gaps
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE)
  }, [debouncedSearch, activeType])

  const categories: (CategoryType | "All")[] = [
    "All",
    ...Object.values(CategoryType),
  ]

  // Filter based on debouncedSearch
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesType = activeType === "All" || p.category === activeType
    const matchesSearch = p.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
    return matchesType && matchesSearch
  })

  // Slice for "Load More"
  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const handleCategoryChange = (cat: CategoryType | "All") => {
    setActiveType(cat)
    const params = new URLSearchParams(window.location.search)
    if (cat === "All") params.delete("type")
    else params.set("type", cat)
    router.push(`/category?${params.toString()}`, { scroll: false })
  }

  return (
    <main className="bg-surface min-h-screen pt-32 pb-24 transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeading
            title={
              activeType === "All"
                ? "FULL CATALOG"
                : `${activeType.toUpperCase()} RANGE`
            }
            subtitle="SHAKTI INVENTORY"
          />
          <div className="relative max-w-md w-full">
            <label htmlFor="search-equipment" className="sr-only">
              Search Equipment
            </label>
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                searchTerm !== debouncedSearch
                  ? "text-brand-red"
                  : "text-surface-muted"
              }`}
              size={20}
            />
            <input
              id="search-equipment"
              type="text"
              placeholder="SEARCH EQUIPMENT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-darker industrial-border p-4 pl-12 font-bebas tracking-widest text-surface-text focus:border-brand-red outline-none italic"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <nav className="space-y-8" aria-label="Category Filters">
            <h2 className="font-bebas text-xl text-surface-text tracking-widest flex items-center gap-2">
              <Filter size={18} className="text-brand-red" /> FILTER RANGE
            </h2>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={activeType === cat}
                  className={`text-left px-6 py-4 font-bebas tracking-[0.2em] transition-all border-l-2 text-lg italic ${
                    activeType === cat
                      ? "border-brand-red text-brand-red bg-surface-darker"
                      : "border-transparent text-surface-muted hover:text-surface-text"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>

          {/* Grid Area */}
          <section className="lg:col-span-3 min-h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {displayedProducts.map((p) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-surface-darker industrial-border overflow-hidden hover:border-brand-red transition-all"
                  >
                    <Link
                      href={`/product/${p.id}`}
                      className="block relative aspect-square bg-zinc-800 overflow-hidden"
                    >
                      <img
                        src={p.image}
                        className="w-full h-full object-cover [@media(hover:hover)]:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        alt={`${p.name} - Commercial Gym Equipment Nepal`}
                        loading="lazy"
                      />
                    </Link>
                    <div className="p-6">
                      <span className="text-brand-red font-bebas text-xs tracking-widest uppercase">
                        {p.category}
                      </span>
                      <h3 className="text-surface-text font-bebas text-2xl mt-1 mb-6 tracking-wide group-hover:text-brand-red transition-colors italic">
                        {p.name}
                      </h3>
                      <button
                        onClick={() => router.push(`/contact?item=${p.id}`)}
                        className="w-full bg-brand-red text-white font-bebas py-3 tracking-widest hover:bg-surface-text hover:text-surface transition-all text-sm uppercase font-bold"
                      >
                        {p.price
                          ? `NPR ${p.price.toLocaleString()}`
                          : "INQUIRE PRICE"}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button - Industrial Shakti UI */}
            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + INCREMENT)}
                  className="group relative flex items-center gap-4 bg-surface-darker border border-surface-border px-10 py-4 hover:border-brand-red transition-all duration-300 overflow-hidden"
                >
                  <Plus
                    size={20}
                    className="text-brand-red group-hover:rotate-90 transition-transform duration-500"
                  />
                  <span className="font-bebas text-xl tracking-[0.2em] text-surface-text italic group-hover:text-brand-red transition-colors">
                    LOAD MORE GEAR
                  </span>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red transition-all duration-500 group-hover:w-full"></div>
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 border industrial-border bg-surface-darker/50">
                <p className="font-bebas text-2xl text-surface-muted tracking-widest italic uppercase">
                  No Shakti equipment matches your search
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default function Category() {
  return (
    <Suspense fallback={<div className="bg-surface min-h-screen" />}>
      <CategoryContent />
    </Suspense>
  )
}
