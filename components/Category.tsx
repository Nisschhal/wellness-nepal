"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SearchX, Filter, Plus, ChevronDown } from "lucide-react"
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

  const chip = (active: boolean) =>
    `shrink-0 h-10 px-4 inline-flex items-center border text-xs font-semibold uppercase tracking-wider transition-colors ${
      active
        ? "border-brand-red bg-brand-red text-white"
        : "border-surface-border bg-surface-darker text-surface-muted hover:text-surface-text hover:border-surface-text/40"
    }`

  const activeSeriesList =
    activeType !== "All" ? seriesByCategory[activeType] : undefined

  return (
    <main className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
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
          <div className="relative w-full md:max-w-sm">
            <label htmlFor="search-equipment" className="sr-only">
              Search Equipment
            </label>
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                searchTerm !== debouncedSearch
                  ? "text-brand-red"
                  : "text-surface-muted"
              }`}
              size={18}
            />
            <input
              id="search-equipment"
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full bg-surface-darker industrial-border pl-11 pr-4 text-sm text-surface-text placeholder:text-surface-muted focus:border-brand-red outline-none transition-colors"
            />
          </div>
        </header>

        {/* Mobile / tablet filters: horizontal chips */}
        <nav className="lg:hidden mb-6 space-y-3" aria-label="Category Filters">
          <div className="-mx-6 px-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                aria-pressed={activeType === cat}
                className={chip(activeType === cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {activeSeriesList && activeSeriesList.length > 0 && (
            <div className="-mx-6 px-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {["All", ...activeSeriesList].map((series) => (
                <button
                  key={series}
                  onClick={() => handleSeriesChange(series)}
                  aria-pressed={activeSeries === series}
                  className={`shrink-0 h-8 px-3 border text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                    activeSeries === series
                      ? "border-brand-red text-brand-red bg-brand-red/10"
                      : "border-surface-border text-surface-muted"
                  }`}
                >
                  {series === "All" ? `All ${activeType}` : series}
                </button>
              ))}
            </div>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-10">
          {/* Sidebar (desktop) */}
          <nav className="hidden lg:block" aria-label="Category Filters">
            <div className="sticky top-28 space-y-4">
              <h2 className="flex items-center gap-2 border-b border-surface-border pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-surface-text">
                <Filter size={14} className="text-brand-red" /> FILTER RANGE
              </h2>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => {
                  const isActive = activeType === cat
                  const seriesList = cat !== "All" ? seriesByCategory[cat] : undefined
                  const hasSeries = seriesList && seriesList.length > 0

                  return (
                    <div key={cat}>
                      <button
                        onClick={() => handleCategoryChange(cat)}
                        aria-pressed={isActive}
                        className={`w-full h-11 px-4 text-left text-sm font-semibold uppercase tracking-wider transition-colors flex items-center justify-between ${
                          isActive
                            ? "bg-brand-red/10 text-brand-red"
                            : "text-surface-muted hover:bg-surface-darker hover:text-surface-text"
                        }`}
                      >
                        <span>{cat}</span>
                        {hasSeries && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isActive ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {isActive && hasSeries && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 my-1 border-l border-surface-border pl-3 flex flex-col">
                              <button
                                onClick={() => handleSeriesChange("All")}
                                className={`h-9 px-3 text-left text-xs font-medium uppercase tracking-wider transition-colors ${
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
                                  className={`h-9 px-3 text-left text-xs font-medium uppercase tracking-wider transition-colors ${
                                    activeSeries === series
                                      ? "text-brand-red"
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
            </div>
          </nav>

          {/* Grid Area */}
          <section className="lg:col-span-3 min-h-[600px]">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-surface-muted">
              {filteredProducts.length} products
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              <AnimatePresence>
                {displayedProducts.map((p) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="group flex h-full flex-col overflow-hidden bg-surface-darker industrial-border transition-all hover:border-brand-red hover:shadow-lg hover:shadow-brand-red/10"
                  >
                    <Link
                      href={`/products/${p.id}`}
                      className="relative block aspect-square shrink-0 overflow-hidden bg-surface"
                    >
                      <Image
                        src={p.image}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={`${p.name} - Commercial Gym Equipment Nepal`}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                      <div className="flex min-w-0 items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                        <span className="shrink-0 text-brand-red">
                          {p.category}
                        </span>
                        {p.series && (
                          <>
                            <span className="text-surface-muted">/</span>
                            <span className="truncate text-surface-muted">
                              {p.series}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="mt-2 min-h-[2lh] line-clamp-2 font-bebas text-lg sm:text-xl md:text-2xl leading-[1.1] tracking-wide text-surface-text transition-colors group-hover:text-brand-red">
                        {p.name}
                      </h3>
                      <div className="min-h-4 flex-1" />
                      <button
                        onClick={() => router.push(`/contact?item=${p.id}`)}
                        className="h-10 sm:h-11 w-full bg-brand-red font-bebas text-sm sm:text-base tracking-widest uppercase text-white transition-colors hover:bg-surface-text hover:text-surface"
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
              <div className="mt-10 md:mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + INCREMENT)}
                  className="group relative flex h-12 items-center gap-3 overflow-hidden border border-surface-border bg-surface-darker px-8 transition-all duration-300 hover:border-brand-red"
                >
                  <Plus
                    size={18}
                    className="text-brand-red group-hover:rotate-90 transition-transform duration-500"
                  />
                  <span className="font-bebas text-lg tracking-[0.2em] text-surface-text group-hover:text-brand-red transition-colors">
                    LOAD MORE GEAR
                  </span>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red transition-all duration-500 group-hover:w-full"></div>
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-20 text-center industrial-border bg-surface-darker/50">
                <SearchX size={32} className="text-brand-red" aria-hidden />
                <p className="font-bebas text-2xl text-surface-muted tracking-widest uppercase">
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
