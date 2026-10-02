"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Globe, Heart, Shield, Target, Zap } from "lucide-react"
import SectionHeading from "./SectionHeading"
import { IconTile } from "@/components/ui/icon-tile"

const PILLARS = [
  {
    icon: Shield,
    title: "UNBREAKABLE",
    desc: "12-gauge cold-rolled steel frames built to withstand aggressive training.",
  },
  {
    icon: Zap,
    title: "PRECISION",
    desc: "Biomechanical engineering ensures results faster and safer than ever.",
  },
  {
    icon: Globe,
    title: "LOGISTICS",
    desc: "Nationwide technical support network reaching every district of Nepal.",
  },
  {
    icon: Heart,
    title: "ADVISORY",
    desc: "B2B consultancy on membership sales and ROI strategy.",
  },
]

const About: React.FC = () => {
  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 transition-colors duration-300 relative">
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SectionHeading title="OUR MANIFESTO" subtitle="BASED IN BUTWAL" />
            <h3 className="mt-8 font-bebas text-2xl md:text-3xl text-surface-text mb-5 uppercase tracking-wide leading-tight">
              WE DON'T JUST SELL GEAR. WE BUILD DESTINATIONS.
            </h3>
            <div className="space-y-4 text-surface-muted text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                WN Wellness Gym Equipment Nepal was started in Sukhanagar,
                Butwal from a single realization:{" "}
                <span className="text-surface-text font-bold uppercase">
                  Nepal deserved better.
                </span>{" "}
                For too long, gym owners were forced to settle for sub-par
                imports that crumbled under high-volume commercial use.
              </p>
              <p>
                We engineered a new path, merging global metallurgical
                standards with local{" "}
                <span className="text-brand-red font-bold uppercase tracking-wide">
                  WN WELLNESS
                </span>{" "}
                engineering.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              {[
                { icon: Target, label: "BUTWAL SHOWROOM" },
                { icon: Award, label: "DELIVERY ACROSS NEPAL" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 industrial-border bg-surface-darker p-3"
                >
                  <IconTile icon={icon} size="sm" />
                  <span className="font-bebas text-lg md:text-xl tracking-wider uppercase text-surface-text">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative aspect-square w-full max-w-lg mx-auto lg:max-w-none">
            <div className="absolute inset-0 border-4 border-brand-red -translate-x-3 translate-y-3 md:-translate-x-5 md:translate-y-5 z-0 opacity-15"></div>
            <Image
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop"
              className="object-cover relative z-10 border border-surface-border shadow-2xl"
              alt="Wellness Nepal industrial gym engineering workshop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-brand-red px-5 py-4 md:px-8 md:py-6 z-20 shadow-2xl -skew-x-6">
              <p className="font-bebas text-4xl md:text-6xl text-white italic leading-none skew-x-6">
                10YR
              </p>
              <p className="text-white font-semibold text-[11px] md:text-xs tracking-widest mt-1 uppercase skew-x-6">
                Frame Warranty
              </p>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="py-12 md:py-16 border-y border-surface-border bg-surface-darker/50 backdrop-blur-sm px-5 md:px-10">
          <SectionHeading title="THE WN STANDARD" subtitle="CORE COMPETENCIES" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-10 md:mt-12">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="group flex h-full flex-col bg-surface industrial-border p-6 transition-all hover:border-brand-red hover:-translate-y-1"
              >
                <IconTile icon={p.icon} size="lg" />
                <h4 className="mt-5 font-bebas text-2xl text-surface-text tracking-wider uppercase leading-none">
                  {p.title}
                </h4>
                <p className="mt-3 text-surface-muted text-sm md:text-base leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
