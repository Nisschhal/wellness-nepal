import SectionHeading from "@/components/SectionHeading"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const Services = () => {
  return (
    <section className="py-20 md:py-32 bg-surface-darker relative z-10 border-b border-surface-border">
      <div className="container mx-auto px-6">
        <SectionHeading
          title="GYM SETUP & SERVICES"
          subtitle="FROM OUR BUTWAL SHOWROOM TO ALL OF NEPAL"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16">
          {COMPANY_DETAILS.services.map((service, i) => (
            <div
              key={service.name}
              className="p-8 bg-surface industrial-border hover:border-brand-red transition-all relative"
            >
              <span className="absolute top-4 right-6 font-bebas text-4xl text-surface-text/5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-bebas text-2xl md:text-3xl text-surface-text tracking-wide uppercase mb-4">
                {service.name}
              </h3>
              <p className="text-surface-muted leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-surface-muted mt-12 leading-relaxed">
          <span className="text-surface-text font-bold">We deliver to: </span>
          {COMPANY_DETAILS.serviceAreas.join(", ")}.
        </p>
      </div>
    </section>
  )
}

export default Services
