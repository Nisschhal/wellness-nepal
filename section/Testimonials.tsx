"use client"
import { TESTIMONIALS_DATA } from "@/assets/data/testimonials"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import SectionHeading from "@/components/SectionHeading"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
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

  return (
    <section className="py-24 md:py-40 bg-surface-darker relative z-10 overflow-hidden border-y border-surface-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-24 text-center md:text-left gap-8">
          <SectionHeading
            title="WHAT CUSTOMERS SAY"
            subtitle="REAL GOOGLE REVIEWS"
          />
          <div className="flex gap-4 md:gap-6">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 md:w-16 md:h-16 border border-surface-border flex items-center justify-center text-surface-text hover:bg-brand-red hover:text-white transition-all shadow-lg group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 md:w-16 md:h-16 border border-surface-border flex items-center justify-center text-surface-text hover:bg-brand-red hover:text-white transition-all shadow-lg group"
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[450px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testIndex}
              initial={{ opacity: 0, x: isMobile ? 50 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? -50 : -100 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              {TESTIMONIALS_DATA.slice(
                testIndex * itemsPerView,
                testIndex * itemsPerView + itemsPerView,
              ).map((t) => (
                <div
                  key={t.id}
                  className="bg-surface p-8 md:p-12 industrial-border relative shadow-xl hover:border-brand-red transition-all group overflow-hidden"
                >
                  <Quote
                    className="absolute top-6 right-8 text-brand-red/10 group-hover:text-brand-red/20 transition-colors"
                    size={48}
                  />

                  <div className="flex gap-6 md:gap-8 items-center mb-8 md:mb-10 relative z-10">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-brand-red flex items-center justify-center font-bebas text-3xl md:text-5xl text-surface-text shadow-lg shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bebas text-2xl md:text-4xl text-surface-text tracking-wide uppercase italic leading-none">
                        {t.name}
                      </h4>
                      <div className="flex gap-1 text-brand-red mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-surface-muted font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-surface-muted text-lg md:text-2xl italic leading-relaxed font-medium relative z-10 border-l-4 border-brand-red/20 pl-6 md:pl-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <a
              href={COMPANY_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-bebas text-lg tracking-widest italic text-surface-text border border-surface-border px-5 py-3 hover:border-brand-red hover:text-brand-red transition-all"
            >
              Read all reviews on Google
            </a>
            <a
              href={COMPANY_DETAILS.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-bebas text-lg tracking-widest italic text-white bg-brand-red px-5 py-3 hover:bg-surface-text hover:text-surface transition-all"
            >
              Write a review
            </a>
          </div>

          <div className="flex justify-center gap-3 md:gap-4 mt-16 md:mt-20">
            {Array.from({ length: maxPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setTestIndex(i)}
                className={`h-2.5 md:h-3 transition-all duration-700 rounded-full ${testIndex === i ? "w-10 md:w-16 bg-brand-red shadow-[0_0_10px_#E61E2A]" : "w-3 md:w-4 bg-surface-border hover:bg-brand-red/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
