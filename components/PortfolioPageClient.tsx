"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { PROJECTS_DATA, ProjectCategory } from "@/assets/data/projects"
import { ArrowUpRight, Clock, MapPin } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"

const filters: (ProjectCategory | "All")[] = [
  "All",
  "Commercial Gyms",
  "Home Gyms",
  "Hotel Fitness",
]

export default function PortfolioPageClient() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">(
    "All",
  )

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    activeFilter === "All" ? true : p.category === activeFilter,
  )

  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-12">
          <SectionHeading
            title="OUR PORTFOLIO"
            subtitle="GYMS WE HAVE SET UP IN NEPAL"
          />
          <div className="-mx-6 px-6 lg:mx-0 lg:px-0 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`shrink-0 h-10 px-4 border text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeFilter === f
                    ? "bg-brand-red border-brand-red text-white"
                    : "bg-surface-darker text-surface-muted hover:text-surface-text border-surface-border hover:border-surface-text/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, i) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06 }}
                className="group h-full overflow-hidden border border-surface-border bg-surface-darker transition-colors hover:border-brand-red"
              >
                <Link href={`/portfolio/${proj.id}`} className="flex h-full flex-col">
                  <div className="aspect-[4/3] shrink-0 overflow-hidden relative">
                    <Image
                      src={proj.image}
                      alt={`${proj.title} - Gym Setup in ${proj.location}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 right-3 flex size-10 items-center justify-center bg-brand-red text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-red">
                      <MapPin size={12} aria-hidden />
                      {proj.location}
                    </span>
                    <h3 className="mt-2 min-h-[2lh] line-clamp-2 text-surface-text font-bebas text-2xl md:text-3xl leading-[1.05] tracking-wide group-hover:text-brand-red transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}

            {[4, 5, 6].map((i) => (
              <motion.div
                layout
                key={`extra-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col overflow-hidden border border-dashed border-surface-border bg-surface-darker/60"
              >
                <div className="aspect-[4/3] shrink-0 overflow-hidden relative opacity-40">
                  <Image
                    src={`https://picsum.photos/seed/gall-${i}/800/600`}
                    alt="Upcoming gym project"
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-surface-muted">
                    <Clock size={12} aria-hidden />
                    Coming soon
                  </span>
                  <h4 className="mt-2 min-h-[2lh] text-surface-muted font-bebas text-2xl md:text-3xl leading-[1.05] tracking-wide">
                    FUTURE PROJECT // 2025
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
