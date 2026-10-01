"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus, ChevronDown } from "lucide-react"
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
  const initialSeries = searchParams.get("series") || "All"
  const [activeType, setActiveType] = useState<CategoryType | "All">(initialType)
  const [activeSeries, setActiveSeries] = useState<string>(initialSeries)

  // Search States
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  // Build a map of category -> unique series names from actual product data
  const seriesByCategory = useMemo(() => {
    const map: Record<string, string[]> = {}
    for (const p of PRODUCTS) {
      if (p.series) {
        if (!map[p.category]) map[p.category] = []
        if (!map[p.category].includes(p.series)) {
          map[p.category].push(p.series)
        }
      }
    }
    return map
  }, [])

  // Handle Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 200)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Sync Category & Series with URL
  useEffect(() => {
    const type = (searchParams.get("type") as CategoryType) || "All"
    const series = searchParams.get("series") || "All"
    setActiveType(type)
    setActiveSeries(series)
  }, [searchParams])

  // RESET visible count when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE)
  }, [debouncedSearch, activeType, activeSeries])

  const categories: (CategoryType | "All")[] = [
    "All",
    ...Object.values(CategoryType),
  ]

  // Filter based on category + series + search
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesType = activeType === "All" || p.category === activeType
    const matchesSeries = activeSeries === "All" || p.series === activeSeries
    const matchesSearch = p.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
    return matchesType && matchesSeries && matchesSearch
  })

  // Slice for "Load More"
  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredProducts.length

  const updateURL = (cat: CategoryType | "All", series: string) => {
    const params = new URLSearchParams()
    if (cat !== "All") params.set("type", cat)
    if (series !== "All") params.set("series", series)
    const qs = params.toString()
    router.push(`/category${qs ? `?${qs}` : ""}`, { scroll: false })
  }

  const handleCategoryChange = (cat: CategoryType | "All") => {
    setActiveType(cat)
    setActiveSeries("All")
    updateURL(cat, "All")
  }

  const handleSeriesChange = (series: string) => {
    setActiveSeries(series)
    updateURL(activeType, series)
  }

  return (
    <main className="bg-surface min-h-screen pt-32 pb-24 transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeading
            title={
              activeSeries !== "All"
                ? `${activeSeries.toUpperCase()}`
                : activeType === "All"
                  ? "FULL CATALOG"
                  : `${activeType.toUpperCase()} RANGE`
            }
            subtitle="FULL CATALOG"
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
            <div className="flex flex-col gap-1">
              {categories.map((cat) => {
                const isActive = activeType === cat
                const seriesList = cat !== "All" ? seriesByCategory[cat] : undefined
                const hasSeries = seriesList && seriesList.length > 0

                return (
                  <div key={cat}>
                    {/* Category Button */}
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      aria-pressed={isActive}
                      className={`w-full text-left px-6 py-4 font-bebas tracking-[0.2em] transition-all border-l-2 text-lg italic flex items-center justify-between ${
                        isActive
                          ? "border-brand-red text-brand-red bg-surface-darker"
                          : "border-transparent text-surface-muted hover:text-surface-text"
                      }`}
                    >
                      <span>{cat.toUpperCase()}</span>
                      {hasSeries && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            isActive ? "rotate-180 text-brand-red" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Series Accordion */}
                    <AnimatePresence>
                      {isActive && hasSeries && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-6 border-l border-surface-border pl-4 py-2 flex flex-col gap-1">
                            {/* All in this category */}
                            <button
                              onClick={() => handleSeriesChange("All")}
                              className={`text-left px-4 py-2 font-bebas tracking-[0.15em] text-sm italic transition-all ${
                                activeSeries === "All"
                                  ? "text-brand-red"
                                  : "text-surface-muted hover:text-surface-text"
                              }`}
                            >
                              ALL {cat.toUpperCase()}
                            </button>
                            {seriesList.map((series) => (
                              <button
                                key={series}
                                onClick={() => handleSeriesChange(series)}
                                className={`text-left px-4 py-2 font-bebas tracking-[0.15em] text-sm italic transition-all ${
                                  activeSeries === series
                                    ? "text-brand-red bg-surface-darker/50"
                                    : "text-surface-muted hover:text-surface-text"
                                }`}
                              >
                                {series.toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
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
                      href={`/products/${p.id}`}
                      className="block relative aspect-square bg-zinc-800 overflow-hidden"
                    >
                      <Image
                        src={p.image}
                        className="object-cover [@media(hover:hover)]:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        alt={`${p.name} - Commercial Gym Equipment Nepal`}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                      />
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-brand-red font-bebas text-xs tracking-widest uppercase">
                          {p.category}
                        </span>
                        {p.series && (
                          <>
                            <span className="text-surface-muted text-xs">/</span>
                            <span className="text-surface-muted font-bebas text-xs tracking-widest uppercase">
                              {p.series}
                            </span>
                          </>
                        )}
                      </div>
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

            {/* Load More Button */}
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
                  No equipment matches your search
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
