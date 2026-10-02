"use client"
import { TESTIMONIALS_DATA } from "@/assets/data/testimonials"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import SectionHeading from "@/components/SectionHeading"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PenLine,
  Quote,
  Star,
} from "lucide-react"
import { useEffect, useState } from "react"

const Testimonials = () => {
  const [testIndex, setTestIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate number of items per view
  const itemsPerView = isMobile ? 1 : 2
  const maxPages = Math.ceil(TESTIMONIALS_DATA.length / itemsPerView)

  // Auto change testimonial
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000)
    return () => clearInterval(timer)
  }, [maxPages])

  // Helper functions for changing testimonial
  const nextTestimonial = () => setTestIndex((prev) => (prev + 1) % maxPages)
  const prevTestimonial = () =>
    setTestIndex((prev) => (prev - 1 + maxPages) % maxPages)

  const navBtn =
    "flex size-11 md:size-12 items-center justify-center border border-surface-border text-surface-text transition-all hover:border-brand-red hover:bg-brand-red hover:text-white group"

  return (
    <section className="py-16 md:py-24 bg-surface-darker relative z-10 overflow-hidden border-y border-surface-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <SectionHeading
            title="WHAT CUSTOMERS SAY"
            subtitle="REAL GOOGLE REVIEWS"
          />
          <div className="flex gap-3">
            <button onClick={prevTestimonial} aria-label="Previous reviews" className={navBtn}>
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button onClick={nextTestimonial} aria-label="Next reviews" className={navBtn}>
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative mt-10 md:mt-14">
          <div className="min-h-[300px] md:min-h-[270px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testIndex}
                initial={{ opacity: 0, x: isMobile ? 40 : 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMobile ? -40 : -60 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              >
                {TESTIMONIALS_DATA.slice(
                  testIndex * itemsPerView,
                  testIndex * itemsPerView + itemsPerView,
                ).map((t) => (
                  <div
                    key={t.id}
                    className="group relative flex h-full flex-col overflow-hidden bg-surface p-6 md:p-8 industrial-border transition-all hover:border-brand-red"
                  >
                    <Quote
                      className="absolute top-6 right-6 text-brand-red/15 group-hover:text-brand-red/30 transition-colors"
                      size={40}
                      aria-hidden
                    />

                    <div className="flex items-center gap-4 pr-12">
                      <div className="flex size-12 md:size-14 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red/10 font-bebas text-2xl md:text-3xl leading-none text-surface-text">
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate font-bebas text-xl md:text-2xl leading-none tracking-wide uppercase text-surface-text">
                          {t.name}
                        </h4>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex gap-0.5 text-brand-red">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={13} fill="currentColor" />
                            ))}
                          </div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-surface-muted">
                            {t.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-6 flex-1 border-l-2 border-brand-red/30 pl-5 text-base md:text-lg leading-relaxed text-surface-text/85">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setTestIndex(i)}
                aria-label={`Show reviews page ${i + 1}`}
                aria-current={testIndex === i}
                className={`h-2 rounded-full transition-all duration-500 ${testIndex === i ? "w-10 bg-brand-red" : "w-2 bg-surface-border hover:bg-brand-red/40"}`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <a
              href={COMPANY_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-surface-border px-6 font-bebas text-lg tracking-widest text-surface-text transition-all hover:border-brand-red hover:text-brand-red"
            >
              <ExternalLink size={16} aria-hidden />
              Read all reviews on Google
            </a>
            <a
              href={COMPANY_DETAILS.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 bg-brand-red px-6 font-bebas text-lg tracking-widest text-white transition-all hover:bg-surface-text hover:text-surface"
            >
              <PenLine size={16} aria-hidden />
              Write a review
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
