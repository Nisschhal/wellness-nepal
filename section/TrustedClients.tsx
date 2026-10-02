"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { CLIENT_LOGOS } from "../assets/data/client-logo"

const TrustedClients: React.FC = () => {
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
    <section className="py-12 md:py-16 bg-surface-darker border-y border-surface-border relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 md:mb-10 flex flex-col items-center text-center">
        <span className="mb-3 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">
          POWERING THE NATION'S BEST
        </span>
        <h2 className="font-bebas text-3xl md:text-5xl text-surface-text italic tracking-tight uppercase">
          OUR <span className="text-brand-red">ALLIANCE</span> NETWORK
        </h2>
      </div>

      <div className="flex items-center [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex gap-10 md:gap-16 whitespace-nowrap items-center"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: isMobile ? 40 : 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((brand, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16">
              <span className="font-bebas text-3xl md:text-5xl text-surface-text/40 hover:text-brand-red transition-colors duration-300 tracking-[0.12em] uppercase cursor-default">
                {brand}
              </span>
              <span className="size-1.5 rotate-45 bg-brand-red/60" aria-hidden />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedClients
