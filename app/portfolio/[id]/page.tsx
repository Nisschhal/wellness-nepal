import { PROJECTS_DATA } from "@/assets/data/projects"
import Link from "next/link"
import Image from "next/image"
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Dumbbell,
  ImageIcon,
  Lightbulb,
  MapPin,
} from "lucide-react"
import { IconTile } from "@/components/ui/icon-tile"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import SectionHeading from "@/components/SectionHeading"
import { PRODUCTS } from "@/assets/constants"
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo"

type Props = {
  params: Promise<{ id: string }>
}

// 1. DYNAMIC METADATA (SEO/GEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = PROJECTS_DATA.find((p) => p.id === id)
  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} | Gym Setup in ${project.location}`,
    description: `Case study of the industrial setup at ${project.title}, ${project.geoDistrict}. High-performance gym equipment deployment across Nepal.`,
    keywords: [
      `gym installation ${project.location}`,
      "commercial gym setup Kathmandu",
      "industrial fitness Pokhara",
    ],
    alternates: {
      canonical: `/portfolio/${project.id}`,
    },
    // TODO(portfolio): remove noindex once placeholder projects are replaced with real installs
    robots: { index: false, follow: true },
    openGraph: {
      title: `${project.title} | Wellness Nepal Portfolio`,
      description: project.description,
      url: absoluteUrl(`/portfolio/${project.id}`),
      images: [{ url: project.image }],
      type: "article",
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = PROJECTS_DATA.find((p) => p.id === id)

  if (!project) notFound()

  // 2. AEO (JSON-LD) for AI Search Engines
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`/portfolio/${project.id}#article`),
    url: absoluteUrl(`/portfolio/${project.id}`),
    headline: project.title,
    name: project.title,
    description: project.description,
    image: project.image,
    locationCreated: {
      "@type": "Place",
      name: project.location,
      address: project.geoDistrict,
    },
    author: { "@type": "Organization", name: "Wellness Nepal" },
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Portfolio", url: absoluteUrl("/portfolio") },
    { name: project.title },
  ])

  const jsonLd = [articleJsonLd, breadcrumbs]

  if (!project)
    return (
      <div className="bg-surface min-h-screen pt-40 text-center">
        <h2 className="font-bebas text-6xl text-surface-text">
          Project not found
        </h2>
        <Link
          href="/portfolio"
          className="text-brand-red underline text-2xl mt-8 block font-bebas tracking-widest"
        >
          Back to Portfolio
        </Link>
      </div>
    )

  const bullet = (strong: boolean) =>
    `mt-2 size-1.5 shrink-0 rounded-full ${strong ? "bg-brand-red" : "bg-brand-red/40"}`

  return (
    <div className="bg-surface min-h-screen pb-16 md:pb-20 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: full-bleed photo that fades into the page */}
      <header className="relative h-[60svh] min-h-[380px] max-h-[620px] w-full overflow-hidden">
        <Image
          src={project.image}
          className="object-cover"
          alt={project.title}
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-surface/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

        <div className="container relative mx-auto flex h-full flex-col px-6 pt-24 md:pt-28 pb-4 md:pb-6">
          <div className="mt-auto dark:[text-shadow:0_1px_12px_rgb(0_0_0/0.85)]">
            <nav className="mb-10 md:mb-14">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-surface-text/85 hover:text-brand-red transition-colors"
              >
                <ArrowLeft size={14} /> BACK TO FULL PORTFOLIO
              </Link>
            </nav>
            <span className="mb-2 md:mb-3 inline-flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              <span className="h-px w-6 bg-brand-red" aria-hidden />
              CASE STUDY
            </span>
            <h1 className="max-w-4xl text-surface-text font-bebas text-4xl sm:text-5xl lg:text-7xl italic leading-[0.95] tracking-tight uppercase">
              {project.title}
            </h1>
            <p className="mt-3 md:mt-4 inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              <MapPin size={14} className="shrink-0" aria-hidden />
              {project.location}
            </p>
          </div>
        </div>
      </header>

      <div className="absolute inset-x-0 top-[min(60svh,620px)] bottom-0 bg-pattern pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,transparent,black_200px)]"></div>

      <div className="container mx-auto px-6 relative z-10 pt-8 md:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-10 md:space-y-14 min-w-0">
            <div>
              <SectionHeading title="TRANSFORMATION" subtitle="THE BRIEF" />
              <p className="mt-6 text-surface-text/85 text-base md:text-lg leading-relaxed border-l-4 border-brand-red pl-5 md:pl-6">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex h-full flex-col p-6 md:p-7 industrial-border bg-surface-darker">
                <div className="mb-5 flex items-center gap-3">
                  <IconTile icon={AlertTriangle} />
                  <h4 className="font-bebas text-2xl md:text-3xl text-surface-text tracking-wider uppercase leading-none">
                    THE CHALLENGES
                  </h4>
                </div>
                <ul className="space-y-3 text-surface-muted text-sm md:text-base leading-relaxed">
                  <li className="flex gap-3">
                    <span className={bullet(false)} aria-hidden />
                    {project.challenge}
                  </li>
                  <li className="flex gap-3">
                    <span className={bullet(false)} aria-hidden />
                    Navigating strict commercial floor-loading requirements in
                    Kathmandu's central hubs.
                  </li>
                  <li className="flex gap-3">
                    <span className={bullet(false)} aria-hidden />
                    Ensuring zero-delay deployment to meet international
                    hospitality opening deadlines.
                  </li>
                </ul>
              </div>
              <div className="flex h-full flex-col p-6 md:p-7 industrial-border bg-surface-darker border-l-4 border-l-brand-red">
                <div className="mb-5 flex items-center gap-3">
                  <IconTile icon={Lightbulb} tone="solid" />
                  <h4 className="font-bebas text-2xl md:text-3xl text-surface-text tracking-wider uppercase leading-none">
                    OUR SOLUTION
                  </h4>
                </div>
                <ul className="space-y-3 text-surface-muted text-sm md:text-base leading-relaxed">
                  <li className="flex gap-3">
                    <span className={bullet(true)} aria-hidden />
                    {project.solution}
                  </li>
                  <li className="flex gap-3">
                    <span className={bullet(true)} aria-hidden />
                    Precision-mapped 3D floor plans designed for elite member
                    flow and safety.
                  </li>
                  <li className="flex gap-3">
                    <span className={bullet(true)} aria-hidden />
                    Ongoing priority maintenance for zero-down-time operations.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-3 font-bebas text-3xl md:text-4xl text-surface-text mb-6 tracking-wider uppercase border-b border-surface-border pb-4">
                <ImageIcon size={22} className="text-brand-red" aria-hidden />
                SITE REVEAL
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-darker industrial-border overflow-hidden group relative"
                  >
                    <Image
                      src={`https://picsum.photos/seed/gall-${project.id}-${i}/800/800`}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={`${project.title} gym setup detail ${i}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="p-6 md:p-7 industrial-border bg-surface-darker shadow-xl">
              <h4 className="font-bebas text-2xl text-surface-text mb-5 tracking-[0.15em] border-b-2 border-brand-red pb-3 uppercase">
                EQUIPMENT LIST
              </h4>
              <ul className="divide-y divide-surface-border">
                {project.equipmentUsed.map((item, idx) => {
                  const matchedProduct = PRODUCTS.find((p) => p.name === item)
                  return (
                    <li key={idx} className="group flex items-center justify-between gap-3 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <CheckCircle size={18} className="shrink-0 text-brand-red" />
                        <span className="text-surface-text text-sm md:text-base font-medium group-hover:text-brand-red transition-colors">
                          {item}
                        </span>
                      </div>
                      {matchedProduct && (
                        <Link
                          href={`/products/${matchedProduct.id}`}
                          className="shrink-0 text-surface-muted hover:text-brand-red transition-colors"
                        >
                          <Activity size={18} />
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
              <Link
                href="/category"
                className="skew-button mt-6 flex h-12 w-full bg-brand-red text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-sm md:text-base uppercase tracking-widest shadow-lg shadow-brand-red/20"
              >
                <span>VIEW FULL CATALOG</span>
              </Link>
            </div>

            <div className="p-6 md:p-7 bg-brand-red text-white relative overflow-hidden group shadow-xl">
              <div className="absolute -top-4 -right-4 opacity-10 group-hover:scale-110 transition-transform">
                <Dumbbell size={110} />
              </div>
              <h4 className="font-bebas text-3xl mb-3 uppercase tracking-wider">
                BUILD THIS SETUP
              </h4>
              <p className="text-white/85 text-sm md:text-base mb-6 leading-relaxed max-w-xs">
                Talk to our team to adapt this blueprint for your specific goals.
              </p>
              <Link
                href="/contact"
                className="flex h-12 items-center justify-center border-2 border-white text-white font-bebas tracking-widest text-xl hover:bg-white hover:text-brand-red transition-all uppercase"
              >
                GET PROJECT QUOTE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
