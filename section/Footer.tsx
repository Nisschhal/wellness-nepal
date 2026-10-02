import React from "react"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Music2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Star,
  MessageCircle,
} from "lucide-react"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const Footer: React.FC = () => {
  const linkCls =
    "text-surface-muted text-sm md:text-base hover:text-brand-red transition-colors"
  const headingCls =
    "font-bebas text-xl tracking-widest text-surface-text border-b border-surface-border pb-3 mb-5 uppercase"

  return (
    <footer className="bg-surface border-t border-surface-border pt-14 md:pt-20 pb-8 relative z-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 lg:gap-12 mb-12 md:mb-16">
          {/* Column 1: Authority & Trust */}
          <div className="space-y-5">
            <h3 className="font-bebas text-4xl text-surface-text tracking-wider uppercase leading-none">
              WN WELLNESS <span className="text-brand-red">NEPAL</span>
            </h3>
            <p className="text-surface-muted leading-relaxed text-sm md:text-base max-w-xs">
              We supply, install and service commercial and home gym equipment
              across Nepal.
            </p>
            <a
              href={COMPANY_DETAILS.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 text-surface-text text-xs font-semibold uppercase tracking-wider border border-surface-border px-4 hover:border-brand-red hover:text-brand-red transition-all"
            >
              <Star size={14} className="text-brand-red" fill="currentColor" /> Review us on Google
            </a>
            <div className="space-y-1.5">
              <p className="text-surface-muted text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-red shrink-0" /> PAN/VAT:{" "}
                {COMPANY_DETAILS.brand.pan}
              </p>
              <p className="text-surface-muted text-xs font-semibold uppercase tracking-wider pl-[22px]">
                {COMPANY_DETAILS.brand.fullName}
              </p>
            </div>
            <div className="flex gap-3">
              {Object.entries(COMPANY_DETAILS.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-surface-border bg-surface-darker text-surface-muted hover:border-brand-red hover:text-brand-red transition-all"
                >
                  {name === "instagram" && <Instagram size={18} />}
                  {name === "facebook" && <Facebook size={18} />}
                  {name === "tiktok" && <Music2 size={18} />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={headingCls}>QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={linkCls}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category" className={linkCls}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={linkCls}>
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-surface-text text-sm md:text-base font-semibold hover:text-brand-red transition-colors underline decoration-brand-red decoration-2 underline-offset-[6px]"
                >
                  Request A Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className={headingCls}>CATEGORIES</h4>
            <ul className="space-y-3">
              {["Multi-Station", "Cardio", "Strength", "Free Weights"].map(
                (cat) => (
                  <li key={cat}>
                    <Link href={`/category?type=${cat}`} className={linkCls}>
                      {cat}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 4: Headquarters */}
          <div>
            <h4 className={headingCls}>VISIT US</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-red mt-0.5 shrink-0" size={18} />
                <div className="space-y-1">
                  <span className="text-surface-text text-sm md:text-base block leading-snug">
                    {COMPANY_DETAILS.brand.address}
                  </span>
                  <span className="text-surface-muted text-xs font-semibold uppercase tracking-wider">
                    Delivering to all 77 districts
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-brand-red mt-0.5 shrink-0" size={18} />
                <span className="text-surface-muted text-sm md:text-base leading-snug">
                  {COMPANY_DETAILS.brand.hours.label}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-brand-red mt-0.5 shrink-0" size={18} />
                <div className="flex flex-col gap-1">
                  {[
                    COMPANY_DETAILS.brand.phone,
                    ...COMPANY_DETAILS.brand.otherPhones,
                  ].map((phone) => (
                    <a
                      key={phone}
                      {...(phone === COMPANY_DETAILS.brand.phone
                        ? {
                            href: COMPANY_DETAILS.brand.whatsapp,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": `WhatsApp ${phone}`,
                          }
                        : { href: `tel:${phone}` })}
                      className="inline-flex items-center gap-2 text-surface-muted text-sm md:text-base leading-snug tabular-nums hover:text-brand-red transition-colors"
                    >
                      {phone}
                      {phone === COMPANY_DETAILS.brand.phone && (
                        <span className="inline-flex items-center gap-1 bg-[#25D366]/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#25D366]">
                          <MessageCircle size={10} aria-hidden /> WhatsApp
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </li>
              {COMPANY_DETAILS.brand.email && (
                <li className="flex items-start gap-3">
                  <Mail className="text-brand-red mt-0.5 shrink-0" size={18} />
                  <span className="text-surface-muted text-sm md:text-base truncate">
                    {COMPANY_DETAILS.brand.email}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-border pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-center">
          <p className="text-surface-muted text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.brand.fullName}{" "}
            ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-1.5 text-surface-muted text-xs uppercase tracking-wider group">
            <span>Digital Architecture by</span>
            <a
              href="https://nischaldev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-text font-semibold group-hover:text-brand-red transition-colors inline-flex items-center gap-1 underline underline-offset-4"
            >
              NISCHAL PURI <ExternalLink size={11} />
            </a>
          </div>

          <div className="flex gap-6 text-surface-muted text-xs uppercase tracking-wider">
            <Link href="/#" className="hover:text-surface-text transition-colors">
              Privacy
            </Link>
            <Link href="/#" className="hover:text-surface-text transition-colors">
              Terms of Sale
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
