"use client"

import { PRODUCTS } from "@/assets/constants"
import SectionHeading from "@/components/SectionHeading"
import { ArrowUpRight, MoveRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

const FeaturedInventory = () => {
  const featuredProducts = [
    "syt-zf8400-treadmill",
    "wn-2020a-multi-functional-smith-machine",
    "pl-12-3-multi-station",
  ].flatMap((id) => PRODUCTS.filter((p) => p.id === id))

  return (
    <Section>
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

      <Container className="relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <SectionHeading
            title="FEATURED EQUIPMENT"
            subtitle="POPULAR PICKS FOR NEPALI GYMS"
          />
          <Link
            href="/category"
            className="group inline-flex shrink-0 items-center gap-3 border-b-2 border-brand-red pb-1 font-bebas text-xl tracking-widest text-surface-text hover:text-brand-red transition-colors"
          >
            EXPLORE FULL RANGE{" "}
            <MoveRight
              size={20}
              className="text-brand-red group-hover:translate-x-1.5 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-14">
          {featuredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="group flex h-full flex-col overflow-hidden bg-surface-darker industrial-border transition-all duration-300 hover:border-brand-red hover:shadow-xl hover:shadow-brand-red/10"
            >
              <Link
                href={`/products/${p.id}`}
                tabIndex={-1}
                aria-hidden
                className="relative block aspect-square shrink-0 overflow-hidden bg-surface"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute top-3 right-3 flex size-9 items-center justify-center bg-brand-red text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <span className="mb-2 block truncate text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
                  {p.category}
                </span>

                <h3 className="min-h-[2lh] line-clamp-2 font-bebas text-2xl md:text-3xl leading-[1.05] tracking-wide uppercase text-surface-text transition-colors group-hover:text-brand-red">
                  {p.name}
                </h3>

                <Link
                  href={`/products/${p.id}`}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 border border-surface-border bg-surface font-bebas text-lg tracking-widest uppercase text-surface-text transition-all duration-300 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default FeaturedInventory
