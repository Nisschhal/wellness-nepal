"use client"
import React from "react"
import { motion } from "framer-motion"

interface Props {
  title: string
  subtitle?: string
  light?: boolean
}

const SectionHeading: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 md:mb-12 relative">
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-brand-red font-bebas tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm block mb-2 uppercase font-bold"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-bebas text-4xl sm:text-5xl md:text-7xl lg:text-8xl italic leading-[0.95] md:leading-[0.9] tracking-tighter text-surface-text"
      >
        {title.split(" ").map((word, i) => (
          <span
            key={i}
            className={
              i === title.split(" ").length - 1 ? "text-brand-red" : ""
            }
          >
            {word}{" "}
          </span>
        ))}
      </motion.h2>
      <div className="w-16 md:w-24 h-1.5 md:h-2 bg-brand-red mt-4 md:mt-6"></div>
    </div>
  )
}

export default SectionHeading
