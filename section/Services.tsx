import SectionHeading from "@/components/SectionHeading"
import { IconTile } from "@/components/ui/icon-tile"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"
import {
  Building2,
  CalendarCheck,
  Hammer,
  Home,
  Hotel,
  MapPin,
  PencilRuler,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react"

// Icons follow the order of COMPANY_DETAILS.services
const SERVICE_ICONS: LucideIcon[] = [
  Building2,
  Home,
  Hammer,
  PencilRuler,
  Wrench,
  CalendarCheck,
  Truck,
  Hotel,
]

const Services = () => {
  return (
    <section className="py-16 md:py-24 bg-surface-darker relative z-10 border-b border-surface-border">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="GYM SETUP & SERVICES"
          subtitle="FROM OUR BUTWAL SHOWROOM TO ALL OF NEPAL"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-10 md:mt-14">
          {COMPANY_DETAILS.services.map((service, i) => (
            <article
              key={service.name}
              className="group flex h-full flex-col bg-surface industrial-border p-6 transition-all hover:border-brand-red hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-red/10"
            >
              <div className="flex items-center justify-between">
                <IconTile icon={SERVICE_ICONS[i] ?? Wrench} />
                <span className="font-bebas text-2xl leading-none text-surface-text/15 transition-colors group-hover:text-brand-red/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 min-h-[2lh] font-bebas text-2xl leading-[1.05] tracking-wide text-surface-text uppercase">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-surface-muted">
                {service.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex flex-col gap-4 border-t border-surface-border pt-8 md:flex-row md:items-start md:gap-6">
          <p className="flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wider text-surface-text">
            <Truck size={18} className="text-brand-red" aria-hidden />
            We deliver to:
          </p>
          <ul className="flex flex-wrap gap-2">
            {COMPANY_DETAILS.serviceAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-surface px-3 py-1 text-xs md:text-sm text-surface-muted"
              >
                <MapPin size={12} className="text-brand-red" aria-hidden />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Services
