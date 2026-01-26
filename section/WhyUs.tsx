"use client"
import SectionHeading from "@/components/SectionHeading"
import { Globe, ShieldCheck, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const WhyUs = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const features = [
    {
      id: "01",
      icon: <ShieldCheck size={isMobile ? 40 : 52} />,
      title: "ATAL IRON",
      nepali: "अटल",
      desc: "Forged for the Himalayas. 12-gauge industrial steel frames engineered to survive the most aggressive commercial environments in Nepal.",
    },
    {
      id: "02",
      icon: <Zap size={isMobile ? 40 : 52} />,
      title: "BHARPARDO SERVICE",
      nepali: "भरपर्दो",
      desc: "Zero-Downtime Commitment. Nationwide technical deployment from Kathmandu to Pokhara. We protect your investment 24/7.",
    },
    {
      id: "03",
      icon: <Globe size={isMobile ? 40 : 52} />,
      title: "SHAKTI STRATEGY",
      nepali: "शक्ति",
      desc: "Engineering Profitability. We consult on space optimization and ROI strategy to ensure your gym becomes a local landmark.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-surface relative z-10 border-b border-surface-border overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="THE NEPALESE STANDARD"
          subtitle="WHY INDUSTRY LEADERS CHOOSE US"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-12 md:mt-20">
          {features.map((p, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 md:p-14 bg-surface-darker industrial-border group hover:border-brand-red transition-all shadow-xl hover:shadow-brand-red/20 relative overflow-hidden flex flex-col"
            >
              {/* Card Index */}
              <span className="absolute top-4 right-6 font-bebas text-4xl md:text-6xl text-surface-text/5 group-hover:text-brand-red/10 transition-colors pointer-events-none">
                {p.id}
              </span>

              {/* Icon Container - Fixed Height to keep start of text aligned */}
              <div className="text-brand-red mb-6 md:mb-8 h-12 md:h-16 flex items-center group-hover:scale-110 transition-transform origin-left">
                {p.icon}
              </div>

              {/* HEADING CONTAINER: This ensures descriptions are uniform */}
              <div className="relative min-h-[70px] md:min-h-[110px] flex items-start mb-6 md:mb-8">
                <div className="relative inline-block">
                  {/* Nepali Annotation */}
                  <span className="absolute -top-4 -right-1 md:-top-6 md:-right-2 text-brand-red font-bold text-[10px] md:text-xs tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    [{p.nepali}]
                  </span>

                  <h3 className="font-bebas text-3xl md:text-5xl text-surface-text tracking-widest italic uppercase leading-[0.9] md:leading-none">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Description - Now perfectly aligned across the row */}
              <p className="text-surface-muted leading-relaxed italic font-medium text-base md:text-lg border-l-2 border-surface-border pl-4 group-hover:border-brand-red transition-colors">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
