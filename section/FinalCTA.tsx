"use client"
import { Dumbbell, MapPin } from "lucide-react"
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
    <section className="py-20 md:py-28 bg-surface relative z-10 text-center overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-3xl"
        aria-hidden
      />
      <div className="container relative mx-auto px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-surface-muted text-lg md:text-2xl font-light italic mb-10 md:mb-14 max-w-3xl mx-auto leading-relaxed"
        >
          "The iron never lies to you. You can walk outside and listen to all
          kinds of talk... but the iron is the ultimate reference point."
          <span className="block text-brand-red font-bebas not-italic text-lg md:text-xl mt-4 tracking-widest uppercase">
            — Henry Rollins
          </span>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-surface-text italic mb-10 md:mb-12 leading-[0.85] tracking-tight uppercase"
        >
          START YOUR <br />
          <span className="text-brand-red">LEGACY</span>
        </motion.h2>

        <div className="flex flex-col items-center gap-8">
          <Link
            href="/contact"
            className="group skew-button h-14 md:h-16 bg-brand-red px-10 md:px-14 text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-base md:text-xl shadow-xl shadow-brand-red/40 uppercase tracking-widest"
          >
            <span className="flex items-center gap-3">
              GET A FREE QUOTE{" "}
              <Dumbbell
                className="group-hover:rotate-45 transition-transform"
                size={isMobile ? 20 : 24}
              />
            </span>
          </Link>

          <div className="flex items-center gap-3 text-surface-muted font-bebas tracking-widest text-base md:text-lg">
            <span className="hidden md:block h-px w-10 bg-surface-border"></span>
            <MapPin size={16} className="text-brand-red" aria-hidden />
            SUKHANAGAR, BUTWAL // DELIVERY ACROSS NEPAL
            <span className="hidden md:block h-px w-10 bg-surface-border"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
