"use client"
import SectionHeading from "@/components/SectionHeading"
import { IconTile } from "@/components/ui/icon-tile"
import { Globe, ShieldCheck, Zap } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    id: "01",
    icon: ShieldCheck,
    title: "BUILT TO LAST",
    nepali: "अटल",
    desc: "Forged for the Himalayas. 12-gauge industrial steel frames engineered to survive the most aggressive commercial environments in Nepal.",
  },
  {
    id: "02",
    icon: Zap,
    title: "RELIABLE SERVICE",
    nepali: "भरपर्दो",
    desc: "Zero-Downtime Commitment. Nationwide technical deployment from Kathmandu to Pokhara. We protect your investment 24/7.",
  },
  {
    id: "03",
    icon: Globe,
    title: "SETUP PLANNING",
    nepali: "योजना",
    desc: "Engineering Profitability. We consult on space optimization and ROI strategy to ensure your gym becomes a local landmark.",
  },
]

const WhyUs = () => {
  return (
    <section className="py-16 md:py-24 bg-surface relative z-10 border-b border-surface-border overflow-hidden">
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative">
        <SectionHeading
          title="THE NEPALESE STANDARD"
          subtitle="WHY INDUSTRY LEADERS CHOOSE US"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-14">
          {features.map((p, i) => (
            <motion.div
              key={p.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative flex h-full flex-col bg-surface-darker industrial-border p-6 md:p-8 transition-all hover:border-brand-red hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-red/10"
            >
              <div className="flex items-start justify-between">
                <IconTile icon={p.icon} size="lg" />
                <span className="font-bebas text-3xl leading-none text-surface-text/10 transition-colors group-hover:text-brand-red/30">
                  {p.id}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-bebas text-2xl md:text-3xl leading-none tracking-wide text-surface-text uppercase">
                  {p.title}
                </h3>
                <span className=" border border-brand-red/30 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-brand-red">
                  {p.nepali}
                </span>
              </div>

              <p className="mt-4 text-sm md:text-base leading-relaxed text-surface-muted">
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
