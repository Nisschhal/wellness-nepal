"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { CLIENT_LOGOS } from "../assets/data/client-logo"

const TrustedClients: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* TRUSTED PARTNERS MARQUEE */}
      <section className="py-16 md:py-24 bg-surface-darker border-y border-surface-border relative z-10 overflow-hidden shadow-inner">
        <div className="container mx-auto px-6 mb-8 md:mb-12 flex flex-col items-center">
          <span className="text-brand-red font-bebas tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm block mb-4 uppercase font-bold">
            POWERING THE NATION'S BEST
          </span>
          <h2 className="font-bebas text-4xl md:text-7xl text-surface-text italic text-center tracking-tighter uppercase">
            OUR <span className="text-brand-red">ALLIANCE</span> NETWORK
          </h2>
        </div>
        <div className="flex items-center">
          <motion.div
            className="flex gap-20 md:gap-32 whitespace-nowrap px-10 items-center"
            animate={{ x: [0, -3000] }}
            transition={{
              duration: isMobile ? 30 : 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[
              ...CLIENT_LOGOS,
              ...CLIENT_LOGOS,
              ...CLIENT_LOGOS,
              ...CLIENT_LOGOS,
            ].map((brand, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-12 group">
                <span className="font-bebas text-2xl md:text-4xl text-surface-text/10 tracking-widest italic uppercase">
                  TRUSTED BY
                </span>
                <span className="font-bebas text-4xl md:text-6xl text-brand-red hover:text-surface-text transition-all duration-500 italic tracking-widest md:tracking-[0.2em] uppercase cursor-default px-8 md:px-12 border-x border-surface-border/50">
                  {brand}
                </span>
                <div className="w-12 md:w-20 h-[1.5px] bg-brand-red opacity-30 shadow-[0_0_8px_#E61E2A]"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default TrustedClients
