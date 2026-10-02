"use client"
import React from "react"
import { motion } from "framer-motion"
import { LayoutGrid, MapPin, TrendingUp, Truck, Wrench } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

const Hero: React.FC = () => {
  return (
    <Section
      spacing="none"
      className="min-h-[88svh] md:min-h-[92vh] flex items-center overflow-hidden border-b border-surface-border pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auhref=format&fit=crop"
          className="w-full h-full object-cover transition-all duration-1000"
          alt="Commercial Gym Dominance"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/60 to-transparent dark:via-surface/90"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 md:h-96 bg-linear-to-t from-surface to-transparent"></div>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-5 md:mb-7">
            <span className="text-brand-red font-bebas tracking-[0.35em] text-base md:text-xl block">
              NAMASTE (नमस्ते)
            </span>
            <div className="h-[2px] w-16 md:w-28 bg-brand-red"></div>
          </div>

          <h1 className="font-bebas text-[4.25rem] sm:text-8xl md:text-[8.5rem] lg:text-[9.5rem] text-surface-text italic leading-[0.85] tracking-tight mb-6 md:mb-8 drop-shadow-2xl uppercase">
            FORGE YOUR <br /> <span className="text-brand-red">EMPIRE</span>
          </h1>

          <p className="text-surface-text/80 text-base sm:text-lg md:text-2xl font-normal mb-8 md:mb-10 max-w-2xl leading-relaxed border-l-4 border-brand-red pl-5 md:pl-7">
            Stop settling for weak imports.{" "}
            <span className="text-surface-text font-bold underline decoration-brand-red decoration-2 underline-offset-4">
              WN Wellness
            </span>{" "}
            supplies commercial-grade gym equipment from our Butwal showroom,
            delivered, installed and serviced from{" "}
            <span className="text-brand-red font-bold">Mechi to Mahakali</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <Button
              asChild
              className="group skew-button shadow-brand-red/40 bg-brand-red h-14 md:h-16 px-8 md:px-10 text-white hover:bg-surface-text hover:text-surface shadow-xl text-base md:text-lg font-bold tracking-wider gap-3 rounded-none"
            >
              <Link href="/contact">
                <span>INQUIRE NOW</span>
                <TrendingUp
                  className="size-5 md:size-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group skew-button bg-surface-darker/80 backdrop-blur border-2 border-surface-border h-14 md:h-16 px-8 md:px-10 text-surface-text hover:border-brand-red text-base md:text-lg font-bold tracking-wider gap-3 rounded-none"
            >
              <Link href="/category">
                <span>VIEW CATALOG</span>
                <LayoutGrid
                  className="size-5 md:size-6 group-hover:rotate-12 transition-transform"
                />
              </Link>
            </Button>
          </div>

          <ul className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-3xl">
            {[
              { icon: MapPin, label: "Showroom in Butwal" },
              { icon: Truck, label: "Delivery across Nepal" },
              { icon: Wrench, label: "Installation & service" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-sm font-medium text-surface-text/80"
              >
                <span className="flex size-9 shrink-0 items-center justify-center border border-surface-border bg-surface/60 text-brand-red backdrop-blur">
                  <Icon size={16} strokeWidth={1.75} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </Section>
  )
}

export default Hero
