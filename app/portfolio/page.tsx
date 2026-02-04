"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { PROJECTS_DATA, ProjectCategory } from "@/assets/data/projects"
import { ArrowUpRight } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { PROJECTS } from "@/assets/constants"

const filters: (ProjectCategory | "All")[] = [
  "All",
  "Commercial Gyms",
  "Home Gyms",
  "Hotel Fitness",
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "All">(
    "All",
  )

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    activeFilter === "All" ? true : p.category === activeFilter,
  )

  return (
    <div className="bg-surface min-h-screen pt-32 pb-24 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeading
            title="OUR PORTFOLIO"
            subtitle="NEPAL'S FINEST IRON DESTINATIONS"
          />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-8 py-3 font-bebas tracking-widest text-lg skew-x-[-12deg] transition-all border ${
                  activeFilter === f
                    ? "bg-brand-red border-brand-red text-white shadow-xl shadow-brand-red/20"
                    : "bg-surface-darker text-surface-muted hover:text-surface-text border-surface-border hover:border-brand-red"
                }`}
              >
                <span className="skew-x-[12deg] block">{f.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, i) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                className="relative group overflow-hidden border border-surface-border bg-surface-darker"
              >
                <Link href={`/portfolio/${proj.id}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover [@media(hover:hover)]:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="p-8 relative">
                    <span className="text-brand-red font-bebas text-sm tracking-widest">
                      {proj.location.toUpperCase()}
                    </span>
                    <h3 className="text-surface-text font-bebas text-3xl italic tracking-wide group-hover:text-brand-red transition-colors">
                      {proj.title}
                    </h3>
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 w-12 h-12 bg-surface industrial-border flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all -skew-x-12 opacity-0 group-hover:opacity-100">
                      <ArrowUpRight size={24} className="skew-x-12" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Extended Mock Gallery Items */}
            {[4, 5, 6].map((i) => (
              <motion.div
                layout
                key={`extra-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group overflow-hidden border border-surface-border bg-surface-darker [@media(hover:hover)]:grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/gall-${i}/800/600`}
                    alt="Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-surface-muted font-bebas text-xl tracking-widest italic">
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
