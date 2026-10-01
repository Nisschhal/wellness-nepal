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
} from "lucide-react"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-surface-border pt-20 pb-10 relative z-20 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Column 1: Authority & Trust */}
          <div className="space-y-8">
            <h3 className="font-bebas text-5xl text-surface-text tracking-widest italic uppercase">
              WN WELLNESS <span className="text-brand-red">NEPAL</span>
            </h3>
            <p className="text-surface-muted leading-relaxed font-light italic text-lg">
              We supply, install and service commercial and home gym equipment
              across Nepal.
            </p>
            <a
              href={COMPANY_DETAILS.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-surface-text text-xs font-bold uppercase tracking-widest border border-surface-border px-4 py-3 hover:border-brand-red hover:text-brand-red transition-all"
            >
              <Star size={14} className="text-brand-red" /> Review us on Google
            </a>
            <div className="space-y-2">
              <p className="text-surface-muted text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-red" /> PAN/VAT:{" "}
                {COMPANY_DETAILS.brand.pan}
              </p>
              <p className="text-surface-muted text-xs font-bold uppercase tracking-widest">
                {COMPANY_DETAILS.brand.fullName}
              </p>
            </div>
            <div className="flex gap-4">
              {Object.entries(COMPANY_DETAILS.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-surface-border flex items-center justify-center text-surface-muted hover:border-brand-red hover:text-brand-red transition-all shadow-sm bg-surface-darker"
                >
                  {name === "instagram" && <Instagram size={20} />}
                  {name === "facebook" && <Facebook size={20} />}
                  {name === "tiktok" && <Music2 size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Industrial Directory */}
          <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-surface-text tracking-widest border-b border-surface-border pb-3 uppercase italic">
              DIRECTORY
            </h4>
            <ul className="space-y-4 font-medium text-lg">
              <li>
                <Link
                  href="/"
                  className="text-surface-muted hover:text-brand-red transition-colors italic"
                >
                  Home Blueprint
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="text-surface-muted hover:text-brand-red transition-colors italic"
                >
                  Iron Arsenal
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-surface-muted hover:text-brand-red transition-colors italic"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-surface-muted hover:text-brand-red transition-colors italic font-bold underline decoration-brand-red decoration-2 underline-offset-8"
                >
                  Request A Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Arsenal */}
          <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-surface-text tracking-widest border-b border-surface-border pb-3 uppercase italic">
              ARSENAL
            </h4>
            <ul className="space-y-4 font-medium text-lg">
              {["Multi-Station", "Cardio", "Strength", "Free Weights"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/category?type=${cat}`}
                      className="text-surface-muted hover:text-brand-red transition-colors italic"
                    >
                      {cat}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 4: Headquarters */}
          <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-surface-text tracking-widest border-b border-surface-border pb-3 uppercase italic">
              HQ STATUS
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-brand-red mt-1 shrink-0" size={20} />
                <div className="space-y-1">
                  <span className="text-surface-text text-base font-medium italic block">
                    {COMPANY_DETAILS.brand.address}
                  </span>
                  <span className="text-surface-muted text-[10px] font-bold uppercase tracking-widest opacity-70">
                    Delivering to all 77 districts
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="text-brand-red shrink-0" size={20} />
                <span className="text-surface-muted text-base font-medium italic">
                  {COMPANY_DETAILS.brand.hours.label}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-brand-red shrink-0" size={20} />
                <div className="flex flex-col">
                  {[
                    COMPANY_DETAILS.brand.phone,
                    ...COMPANY_DETAILS.brand.otherPhones,
                  ].map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="text-surface-muted text-base font-medium italic hover:text-brand-red transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              {COMPANY_DETAILS.brand.email && (
                <li className="flex items-center gap-4">
                  <Mail className="text-brand-red shrink-0" size={20} />
                  <span className="text-surface-muted text-base font-medium italic truncate">
                    {COMPANY_DETAILS.brand.email}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-surface-muted text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.brand.fullName}{" "}
            ALL RIGHTS RESERVED.
          </p>

          {/* USER CREDIT */}
          {/* USER CREDIT - Industrial Version */}
          <div className="flex items-center gap-2 text-surface-muted text-[10px] font-black uppercase tracking-widest italic group opacity-80">
            <span>Digital Architecture by</span>
            <a
              href="https://nischaldev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-text group-hover:text-brand-red transition-colors flex items-center gap-1 underline underline-offset-4"
            >
              NISCHAL PURI <ExternalLink size={10} />
            </a>
          </div>

          <div className="flex gap-8 text-surface-muted text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
            <Link
              href="/#"
              className="hover:text-surface-text transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/#"
              className="hover:text-surface-text transition-colors"
            >
              Terms of Sale
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
