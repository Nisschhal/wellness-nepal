"use client"
import SectionHeading from "@/components/SectionHeading"
import { ArrowDown, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BLUEPRINT_STEPS } from "@/assets/data/blueprint"

const BluePrint = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <section className="py-24 md:py-40 bg-surface-darker relative z-10 border-b border-surface-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <SectionHeading
            title="SHAKTI BLUEPRINT"
            subtitle="OUR OPERATIONAL PROCESS"
          />
          <p className="text-surface-muted text-lg md:text-2xl italic leading-relaxed font-light mt-8">
            From small studios to mid-size commercial centers, we guide your
            investment through a strictly engineered 5-step deployment plan.
          </p>
        </div>

        <div className="relative">
          {/* Connective Line */}
          <div className="hidden lg:block absolute top-[140px] left-0 w-full h-[1px] bg-brand-red z-0 opacity-20"></div>

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-4 relative z-10 list-none">
            {BLUEPRINT_STEPS.map((step, i) => {
              const Icon = step.icon // Assign the icon component

              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col items-center lg:items-start relative h-full"
                >
                  <div className="w-full bg-surface p-8 md:p-10 industrial-border group-hover:border-brand-red transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col h-full min-h-[300px] md:min-h-[360px]">
                    {/* Index Number Overlay */}
                    <span className="absolute -top-6 -left-4 font-bebas text-8xl md:text-[10rem] text-surface-text opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none italic">
                      {step.id}
                    </span>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-brand-red mb-6 h-10 flex items-center">
                        <Icon size={28} />
                      </div>

                      <div className="min-h-[60px] md:min-h-[90px] flex items-start relative">
                        {/* Nepali Annotation */}
                        <span className="absolute -top-4 right-0 text-brand-red font-bold text-[10px] opacity-60">
                          [{step.nepaliTitle}]
                        </span>
                        <h4 className="font-bebas text-2xl md:text-3xl text-surface-text tracking-widest italic leading-[1.1] uppercase">
                          {step.title}
                        </h4>
                      </div>

                      <p className="text-surface-muted text-sm md:text-base italic leading-relaxed font-medium flex-grow border-t border-surface-border/30 pt-4">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Logic */}
                  {i < BLUEPRINT_STEPS.length - 1 && (
                    <div className="flex items-center justify-center py-8 lg:py-0 lg:absolute lg:top-[140px] lg:-right-2 lg:-translate-y-1/2 lg:translate-x-1/2 z-20">
                      <div className="text-surface-border group-hover:text-brand-red transition-colors duration-500 bg-surface-darker p-2">
                        <ArrowDown className="block lg:hidden" size={32} />
                        <ArrowRight className="hidden lg:block" size={32} />
                      </div>
                    </div>
                  )}
                </motion.li>
              )
            })}
          </ol>
        </div>
        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="skew-button bg-brand-red px-10 md:px-20 py-5 md:py-8 font-bebas text-xl md:text-3xl text-white hover:bg-surface-text transition-all italic tracking-widest group shadow-2xl"
          >
            <span>GET PROJECT QUOTE</span>
            <ArrowRight
              className="ml-4 transition-transform group-hover:translate-x-2"
              size={24}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BluePrint
