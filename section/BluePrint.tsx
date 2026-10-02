"use client"
import SectionHeading from "@/components/SectionHeading"
import { ArrowRight } from "lucide-react"
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
    <section className="py-16 md:py-24 bg-surface-darker relative z-10 border-b border-surface-border overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          align="center"
          title="GYM SETUP PROCESS"
          subtitle="OUR OPERATIONAL PROCESS"
          description="From small studios to mid-size commercial centers, we guide your investment through a strictly engineered 5-step deployment plan."
        />

        <ol className="relative mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-5 list-none">
          {/* Connector: vertical on mobile, horizontal on desktop */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px bg-linear-to-b from-brand-red/60 via-surface-border to-surface-border lg:hidden"
            aria-hidden
          />
          <div
            className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-linear-to-r from-brand-red/60 via-surface-border to-brand-red/60"
            aria-hidden
          />

          {BLUEPRINT_STEPS.map((step, i) => {
            const Icon = step.icon

            return (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-6"
              >
                {/* Step marker */}
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-surface-darker font-bebas text-xl leading-none text-surface-text transition-colors group-hover:bg-brand-red group-hover:text-white">
                  {step.id}
                </span>

                <div className="flex h-full w-full flex-col bg-surface industrial-border p-5 md:p-6 transition-all group-hover:border-brand-red group-hover:shadow-xl group-hover:shadow-brand-red/10">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-10 items-center justify-center bg-brand-red/10 text-brand-red">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className=" border border-brand-red/30 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-brand-red">
                      {step.nepaliTitle}
                    </span>
                  </div>
                  <h4 className="mt-4 lg:min-h-[2lh] font-bebas text-xl md:text-2xl leading-[1.05] tracking-wide text-surface-text uppercase">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-surface-muted">
                    {step.desc}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>

        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/contact"
            className="group skew-button h-14 md:h-16 bg-brand-red px-10 md:px-14 font-bebas text-xl md:text-2xl text-white hover:bg-surface-text hover:text-surface tracking-widest shadow-xl shadow-brand-red/30"
          >
            <span>GET PROJECT QUOTE</span>
            <ArrowRight
              className="ml-3 transition-transform group-hover:translate-x-1.5"
              size={20}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BluePrint
