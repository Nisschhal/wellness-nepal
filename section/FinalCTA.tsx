"use client"
import { Dumbbell } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const FinalCTA = () => {
  // 1. Initialize with a safe default (assume mobile or false)
  const [isMobile, setIsMobile] = useState(false)

  // 2. We use a "mounted" state to prevent hydration flickering
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    // 3. This code ONLY runs in the browser
    setHasMounted(true)
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // 4. Don't render the marquee until we are on the client
  // This prevents SEO "Hydration Mismatch" errors
  if (!hasMounted) return null

  return (
    <section className="py-24 md:py-40 bg-surface relative z-10 text-center">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="w-20 md:w-32 h-0.5 bg-brand-red mx-auto mb-12 md:mb-16 opacity-60 shadow-[0_0_15px_#E61E2A]"></div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-surface-muted text-lg md:text-4xl font-light italic mb-12 md:mb-20 max-w-4xl mx-auto leading-relaxed"
        >
          "The iron never lies to you. You can walk outside and listen to all
          kinds of talk... but the iron is the ultimate reference point."
          <span className="block text-brand-red font-bebas text-xl md:text-2xl mt-6 md:mt-8 tracking-widest uppercase">
            — Henry Rollins
          </span>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="font-bebas text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] text-surface-text italic mb-12 md:mb-16 leading-[0.8] tracking-tighter uppercase"
        >
          START YOUR <br />
          <span className="text-brand-red">LEGACY</span>
        </motion.h2>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          <Link
            href="/contact"
            className="skew-button inline-block bg-brand-red px-12 md:px-28 py-6 md:py-12 text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-2xl md:text-5xl shadow-2xl shadow-brand-red/50 uppercase tracking-widest group"
          >
            <span className="flex items-center gap-4 md:gap-6">
              GET B2B BLUEPRINT{" "}
              <Dumbbell
                className="group-hover:rotate-45 transition-transform"
                size={isMobile ? 28 : 40}
              />
            </span>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-4 text-surface-muted font-bebas tracking-widest text-sm md:text-xl italic opacity-40 mt-8">
            <span className="hidden md:block h-px w-12 bg-surface-muted"></span>
            ESTABLISHED IN BUTWAL // POWERED BY SHAKTI // SINCE 2015
            <span className="hidden md:block h-px w-12 bg-surface-muted"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
