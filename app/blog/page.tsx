import { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Dumbbell,
  MessageCircle,
  PencilRuler,
  ShoppingCart,
  Tag,
  Wrench,
} from "lucide-react"
import { IconTile } from "@/components/ui/icon-tile"
import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

// Placeholder until real posts exist: kept out of the index and the sitemap.
// When the first posts go live, remove `robots` and add /blog to app/sitemap.ts.
export const metadata: Metadata = {
  title: "Blog | Gym Setup Guides Coming Soon",
  description:
    "Gym setup guides, equipment buying tips and maintenance advice for gym owners in Nepal, coming soon from WN Wellness Gym Equipment Nepal.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: true },
}

const TOPICS = [
  {
    icon: PencilRuler,
    title: "Gym setup guides",
    desc: "Plan a commercial or home gym: layout, training zones and budget.",
  },
  {
    icon: ShoppingCart,
    title: "Equipment buying tips",
    desc: "What to check before you buy a treadmill, rack or multi gym.",
  },
  {
    icon: Wrench,
    title: "Maintenance & care",
    desc: "Simple routines that keep belts, cables and motors running longer.",
  },
  {
    icon: Tag,
    title: "Price guides for Nepal",
    desc: "What popular gym equipment costs in Nepal, and why.",
  },
]

export default function BlogPage() {
  return (
    <div className="bg-surface min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 relative">
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="mb-3 inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-brand-red">
            <span className="h-px w-6 bg-brand-red" aria-hidden />
            WN TRAINING LOG
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl uppercase italic leading-[0.9] tracking-tight text-surface-text">
            THE BLOG IS <span className="text-brand-red">WARMING UP</span>
          </h1>
          <div className="mt-4 h-1 w-14 bg-brand-red" aria-hidden />
          <p className="mt-5 text-base md:text-lg leading-relaxed text-surface-muted">
            We are loading the bar with practical guides for gym owners and
            home lifters across Nepal. The first sets are in progress, so check
            back soon.
          </p>

          {/* Progress: set 1 of 3 */}
          <div className="mt-8 max-w-md">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-2 text-surface-text">
                <Dumbbell size={14} className="text-brand-red" aria-hidden />
                Set 1 of 3
              </span>
              <span className="text-brand-red">In progress</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5" aria-hidden>
              <div className="h-2 bg-brand-red" />
              <div className="h-2 bg-brand-red/40 animate-pulse" />
              <div className="h-2 bg-surface-border" />
            </div>
          </div>
        </div>

        {/* Upcoming topics */}
        <section className="mt-12 md:mt-16" aria-labelledby="blog-topics">
          <h2
            id="blog-topics"
            className="mb-6 font-bebas text-2xl md:text-3xl uppercase tracking-wider text-surface-text"
          >
            On the program
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {TOPICS.map((t) => (
              <div
                key={t.title}
                className="group flex h-full flex-col bg-surface-darker industrial-border p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <IconTile icon={t.icon} />
                  <span className="border border-surface-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-surface-muted">
                    Coming soon
                  </span>
                </div>
                <h3 className="mt-5 font-bebas text-2xl leading-none tracking-wide uppercase text-surface-text">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-surface-muted">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Until then */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-surface-border bg-surface-darker p-6 md:p-8 border-l-4 border-l-brand-red">
          <div>
            <p className="font-bebas text-2xl md:text-3xl uppercase tracking-wide text-surface-text">
              Don&apos;t wait for the blog
            </p>
            <p className="mt-1 text-sm md:text-base text-surface-muted">
              Ask us anything about equipment, pricing or setting up your gym.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/category"
              className="group inline-flex h-12 items-center justify-center gap-2 border border-surface-border bg-surface px-6 font-bebas text-lg tracking-widest uppercase text-surface-text transition-colors hover:border-brand-red hover:text-brand-red"
            >
              Browse catalog
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={COMPANY_DETAILS.brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 bg-brand-red px-6 font-bebas text-lg tracking-widest uppercase text-white transition-colors hover:bg-surface-text hover:text-surface"
            >
              <MessageCircle size={16} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
