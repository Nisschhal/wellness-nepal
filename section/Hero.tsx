"use client"
import React from "react"
import { motion } from "framer-motion"
import { Activity, LayoutGrid, TrendingUp } from "lucide-react"
import Link from "next/link"

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden z-10 pt-24 md:pt-32 lg:pt-0 border-b border-surface-border">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auhref=format&fit=crop"
          className="w-full h-full object-cover  transition-all duration-1000"
          alt="Commercial Gym Dominance"
        />
        {/* <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auhref=format&fit=crop"
          className="w-full h-full object-cover [@media(hover:hover)]:grayscale-0 dark:[@media(hover:hover)]:grayscale opacity-70 dark:opacity-20 contrast-125 transition-all duration-1000"
          alt="Commercial Gym Dominance"
        /> */}
        <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/60 to-transparent dark:via-surface/90"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 md:h-96 bg-linear-to-t from-surface to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-4 my-6 md:my-10 ">
            <span className="text-brand-red font-bebas tracking-[0.4em] md:tracking-[0.6em] text-lg md:text-xl block font-black">
              NAMASTE (नमस्ते)
            </span>
            <div className="h-[2px] w-20 md:w-32 bg-brand-red"></div>
          </div>

          <h1 className="font-bebas text-6xl sm:text-8xl md:text-[10rem] lg:text-[11.5rem] text-surface-text italic leading-[0.85] md:leading-[0.8] tracking-tighter mb-8 md:mb-10 drop-shadow-2xl uppercase">
            FORGE YOUR <br /> <span className="text-brand-red">EMPIRE</span>
          </h1>

          <p className="text-surface-muted text-xl md:text-3xl font-normal mb-12 md:mb-16 max-w-4xl leading italic border-l-8 md:border-l-14 border-brand-red pl-6 md:pl-10 bg-surface/30 backdrop-blur-sm md:bg-transparent rounded-r-xl">
            Stop settling for weak imports. We engineer industrial iron with{" "}
            <span className="text-surface-text font-bold italic tracking-widest uppercase underline decoration-2 md:decoration-4 decoration-brand-white">
              SHAKTI
            </span>{" "}
            (शक्ति) precision. From{" "}
            <span className="text-brand-red font-bold">Mechi to Mahakali</span>,
            we build the iron legacy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
            <Link
              href="/contact"
              className="skew-button shadow-brand-red/50  bg-brand-red px-8 md:px-14 py-5 md:py-8 text-white font-bold hover:bg-surface-text hover:text-surface transition-all shadow-xl text-xl md:text-3xl flex items-center justify-center gap-4 md:gap-6 group"
            >
              <span>INQUIRE NOW</span>
              <TrendingUp
                className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"
                size={24}
              />
            </Link>
            <Link
              href="/category"
              className="skew-button bg-surface-darker border-2 border-surface-border px-8 md:px-14 py-5 md:py-8 text-surface-text font-bold hover:border-brand-red transition-all text-xl md:text-3xl flex items-center justify-center gap-4 md:gap-6 group"
            >
              <span>VIEW CATALOG</span>
              <LayoutGrid
                className="group-hover:rotate-12 transition-transform"
                size={24}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
