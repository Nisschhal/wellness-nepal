"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Props {
  title: string
  subtitle?: string
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
  light?: boolean
}

const SectionHeading: React.FC<Props> = ({
  title,
  subtitle,
  description,
  align = "left",
  className,
}) => {
  const words = title.split(" ")
  const centered = align === "center"

  return (
    <div
      className={cn(
        "relative max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red md:text-sm",
            centered && "justify-center",
          )}
        >
          <span className="h-px w-6 bg-brand-red" aria-hidden />
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-bebas text-4xl uppercase italic leading-[0.95] tracking-tight text-surface-text sm:text-5xl md:text-6xl"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={i === words.length - 1 ? "text-brand-red" : ""}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.h2>
      <div
        className={cn("mt-4 h-1 w-14 bg-brand-red", centered && "mx-auto")}
        aria-hidden
      />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-surface-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
