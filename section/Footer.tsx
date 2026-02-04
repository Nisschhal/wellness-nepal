import React from "react"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  ShieldCheck,
  Clock,
} from "lucide-react"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 pt-20 pb-10 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Column 1: Authority & Trust */}
          <div className="space-y-8">
            <h3 className="font-bebas text-5xl text-white tracking-widest italic uppercase">
              WELLNESS <span className="text-brand-red">NEPAL</span>
            </h3>
            <p className="text-zinc-500 leading-relaxed font-light italic text-lg">
              The architects of Nepal&apos;s fitness landscape. Providing
              industrial-grade iron and B2B success consulting from Mechi to
              Mahakali.
            </p>
            <div className="space-y-2">
              <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-red" /> VAT REG:{" "}
                {COMPANY_DETAILS.brand.vat}
              </p>
              <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-red" /> REG NO:{" "}
                {COMPANY_DETAILS.brand.reg}
              </p>
            </div>
            <div className="flex gap-4">
              {Object.entries(COMPANY_DETAILS.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-brand-red hover:text-brand-red transition-all shadow-lg"
                >
                  {name === "instagram" && <Instagram size={20} />}
                  {name === "facebook" && <Facebook size={20} />}
                  {name === "twitter" && <Twitter size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Industrial Directory */}
          <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-white tracking-widest border-b border-zinc-800 pb-3 uppercase italic">
              DIRECTORY
            </h4>
            <ul className="space-y-4 font-medium text-lg">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic group flex items-center gap-2"
                >
                  Home Blueprint
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic"
                >
                  Iron Arsenal
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic font-bold text-white underline decoration-brand-red decoration-2 underline-offset-8"
                >
                  Request A Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Arsenal */}
          <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-white tracking-widest border-b border-zinc-800 pb-3">
              ARSENAL
            </h4>
            <ul className="space-y-4 font-medium text-lg">
              <li>
                <Link
                  href="/category?type=Multi-Station"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic"
                >
                  Multi-Stations
                </Link>
              </li>
              <li>
                <Link
                  href="/category?type=Cardio"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic"
                >
                  Cardio Power
                </Link>
              </li>
              <li>
                <Link
                  href="/category?type=Strength"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic"
                >
                  Strength Series
                </Link>
              </li>
              <li>
                <Link
                  href="/category?type=Free Weights"
                  className="text-zinc-500 hover:text-brand-red transition-colors italic"
                >
                  Free Weights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: B2B Services (AEO Optimized) */}
          {/* <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-white tracking-widest border-b border-zinc-800 pb-3 uppercase italic">
              SOLUTIONS
            </h4>
            <ul className="space-y-4 font-medium text-lg">
              <li className="text-zinc-500 italic hover:text-white transition-colors cursor-default underline decoration-zinc-800 underline-offset-4">
                3D Gym Floor Mapping
              </li>
              <li className="text-zinc-500 italic hover:text-white transition-colors cursor-default underline decoration-zinc-800 underline-offset-4">
                Commercial AMC Plans
              </li>
              <li className="text-zinc-500 italic hover:text-white transition-colors cursor-default underline decoration-zinc-800 underline-offset-4">
                Industrial Logistics
              </li>
              <li className="text-zinc-500 italic hover:text-white transition-colors cursor-default underline decoration-zinc-800 underline-offset-4">
                B2B Financial Consulting
              </li>
            </ul>
          </div> */}

          {/* Column 4: Headquarters & Geo-Richness */}
          <div className="space-y-8">
            <h4 className="font-bebas text-2xl text-white tracking-widest border-b border-zinc-800 pb-3 uppercase italic">
              HQ STATUS
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-brand-red mt-1 shrink-0" size={20} />
                <div className="space-y-1">
                  <span className="text-zinc-500 text-base font-medium italic block">
                    {COMPANY_DETAILS.brand.address}
                  </span>
                  <span className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest">
                    Delivering to all 77 districts
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="text-brand-red shrink-0" size={20} />
                <span className="text-zinc-500 text-base font-medium italic">
                  SUN - FRI: 09:00 - 18:00
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-brand-red shrink-0" size={20} />
                <span className="text-zinc-500 text-base font-medium italic">
                  {COMPANY_DETAILS.brand.phone}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-brand-red shrink-0" size={20} />
                <span className="text-zinc-500 text-base font-medium italic truncate">
                  {COMPANY_DETAILS.brand.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Wellness Fitness Center. SHAKTI
            SERIES NEPAL. ALL RIGHTS RESERVED.
          </p>

          {/* USER CREDIT */}
          <div className="flex items-center gap-2 text-zinc-700 text-[10px] font-bold uppercase tracking-widest italic group">
            <span>Crafted with Shakti by</span>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 group-hover:text-brand-red transition-colors flex items-center gap-1 underline underline-offset-4"
            >
              YOUR NAME <ExternalLink size={10} />
            </a>
          </div>

          <div className="flex gap-8 text-zinc-700 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Sale
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
