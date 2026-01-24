"use client"
import React from "react"
import { motion } from "framer-motion"
import { Activity } from "lucide-react"
import Link from "next/link"

const Hero: React.FC = () => {
  return (
    <div className="bg-surface transition-colors duration-300 min-h-screen relative overflow-hidden">
      {/* Global Texture Overlay */}
      <div className="fixed inset-0 bg-pattern pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center z-10 pt-32 lg:pt-0 border-b border-surface-border">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover transition-all duration-700"
            alt="Industrial Gym Nepal"
          />
          {/* <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale-0 dark:grayscale opacity-70 dark:opacity-20 contrast-110 transition-all duration-700"
            alt="Industrial Gym Nepal"
          /> */}
          {/* Tailwind v4 Gradient Syntax: bg-linear-to-r */}
          <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/60 to-transparent dark:via-surface/80"></div>
          <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-surface to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Namaste Badge */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-brand-red font-bebas tracking-[0.6em] text-lg block font-black">
                NAMASTE (नमस्ते)
              </span>
              <div className="h-[2px] w-24 bg-brand-red"></div>
            </div>

            {/* Main Headline */}
            <h1 className="font-bebas text-7xl md:text-[11rem] text-surface-text italic leading-[0.8] tracking-tighter mb-10 drop-shadow-md">
              IRON <br /> <span className="text-brand-red">DESTINY</span>
            </h1>

            {/* Description Box */}
            <p className="text-surface-muted text-2xl md:text-3xl font-montserrat font-normal mb-14 max-w-2xl leading  italic border-l-12 border-brand-red pl-10 bg-surface/20 backdrop-blur-sm md:bg-transparent">
              Nepal's powerhouse for industrial fitness. Elite commercial
              equipment delivered with{" "}
              <span className="text-surface-text font-bold italic tracking-widest uppercase">
                Shakti
              </span>{" "}
              engineering.
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-8">
              <Link
                href="/category"
                className="skew-button bg-brand-red px-14 py-8 text-white font-bold hover:bg-surface-text hover:text-surface transition-all shadow-2xl shadow-brand-red/40 text-3xl flex items-center gap-6"
              >
                <span>VIEW CATALOG</span>
                <Activity size={32} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Hero
