"use client"

import { PRODUCTS_DATA } from "@/assets/data/products"
import SectionHeading from "@/components/SectionHeading"
import { ArrowRight, MoveRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const FeaturedInventory = () => {
  const router = useRouter()
  const featuredProducts = PRODUCTS_DATA.slice(0, 3)

  return (
    <section className="py-24 md:py-40 bg-surface relative z-10">
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
          <SectionHeading title="IRON ARSENAL" subtitle="SELECT YOUR WEAPONS" />
          <Link
            href="/category"
            className="text-brand-red font-bebas text-xl md:text-2xl tracking-widest flex items-center gap-4 group italic"
          >
            EXPLORE FULL RANGE{" "}
            <MoveRight className="group-hover:translate-x-4 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {featuredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="
                group bg-surface-darker industrial-border overflow-hidden
                hover:border-brand-red transition-all duration-300
                shadow-lg md:shadow-2xl flex flex-col
                min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]
              "
            >
              {/* Image - fixed aspect */}
              <div className="aspect-square bg-zinc-800 overflow-hidden relative shrink-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="
                    w-full h-full object-cover
                    [@media(hover:hover)]:grayscale
                    group-hover:grayscale-0 group-hover:scale-110
                    transition-all duration-700 ease-out
                  "
                />
                <div
                  className="
                  absolute top-4 right-4 md:top-6 md:right-6
                  bg-brand-red text-white p-2 md:p-3 shadow-xl -skew-x-12
                  opacity-0 group-hover:opacity-100 transition-opacity duration-400
                "
                >
                  <ArrowRight className="skew-x-12" size={20} />
                </div>
              </div>

              {/* Content area - grows to push button down */}
              <div className="flex flex-col flex-1 p-6 md:p-10">
                <span
                  className="
                  text-brand-red font-bebas tracking-widest
                  text-xs md:text-sm mb-2 block uppercase
                "
                >
                  {p.category}
                </span>

                <h3
                  className="
                  text-surface-text font-bebas
                  text-3xl md:text-4xl mb-6 md:mb-8
                  tracking-wide italic leading-tight uppercase
                  group-hover:text-brand-red transition-colors
                  line-clamp-3
                "
                >
                  {p.name}
                </h3>

                {/* This empty div grows and pushes the button to the bottom */}
                <div className="flex-1" />

                {/* Button always at bottom */}
                <button
                  onClick={() => router.push(`/product/${p.id}`)}
                  className="
                    w-full bg-surface text-surface-text
                    border border-surface-border
                    font-bebas py-4 md:py-5
                    tracking-widest text-base md:text-lg
                    group-hover:bg-brand-red group-hover:text-white
                    group-hover:border-brand-red
                    transition-all duration-300 uppercase italic font-bold
                  "
                >
                  DEPLOY TO FACILITY
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedInventory
