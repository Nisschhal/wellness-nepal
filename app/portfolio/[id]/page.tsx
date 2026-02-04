import { PROJECTS_DATA } from "@/assets/data/projects"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Activity, Dumbbell } from "lucide-react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import SectionHeading from "@/components/SectionHeading"
import { PRODUCTS } from "@/assets/constants"

type Props = {
  params: Promise<{ id: string }>
}

// 1. DYNAMIC METADATA (SEO/GEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = PROJECTS_DATA.find((p) => p.id === id)
  if (!project) return { title: "Project Not Found" }

  return {
    title: `${project.title} | Shakti Case Study in ${project.location}`,
    description: `Case study of the industrial setup at ${project.title}, ${project.geoDistrict}. High-performance gym equipment deployment across Nepal.`,
    keywords: [
      `gym installation ${project.location}`,
      "commercial gym setup Kathmandu",
      "industrial fitness Pokhara",
    ],
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = PROJECTS_DATA.find((p) => p.id === id)

  if (!project) notFound()

  // 2. AEO (JSON-LD) for AI Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
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

  return (
    <div className="bg-surface min-h-screen pt-40 pb-32 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute inset-0 bg-pattern pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <nav className="mb-16">
          <Link
            href="/gallery"
            className="flex items-center gap-3 text-surface-muted hover:text-brand-red transition-colors font-bebas tracking-[0.2em] text-lg italic"
          >
            <ArrowLeft size={20} /> BACK TO FULL PORTFOLIO
          </Link>
        </nav>

        {/* Hero Section - FIXED RESPONSIVENESS */}
        <div className="relative aspect-[16/9] md:aspect-video w-full industrial-border overflow-hidden mb-12 md:mb-24 shadow-2xl bg-zinc-950">
          <img
            src={project.image}
            className="w-full h-full object-cover opacity-60 md:opacity-30 contrast-125"
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>

          {/* Text Container - Responsive Padding */}
          <div className="absolute bottom-0 left-0 p-6 md:p-16 w-full">
            <span className="text-brand-red font-bebas tracking-[0.3em]  text-xs sm:text-sm md:text-xl block mb-2 md:mb-6 uppercase font-black">
              CASE STUDY // {project.location}
            </span>
            {/* Title - Fluid Typography */}
            <h1 className="text-surface-text font-bebas text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] italic leading-[0.9] md:leading-[0.8] md:tracking-tighter drop-shadow-2xl uppercase">
              {project.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-20">
            <div>
              <SectionHeading title="TRANSFORMATION" subtitle="THE BRIEF" />
              <p className="text-surface-text text-3xl leading-relaxed font-light italic border-l-8 border-brand-red pl-10 mb-16 shadow-sm">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-12 industrial-border bg-surface-darker shadow-xl">
                <h4 className="font-bebas text-4xl text-brand-red mb-8 italic tracking-widest uppercase">
                  THE CHALLENGES
                </h4>
                <ul className="space-y-6 text-surface-muted text-lg italic font-medium">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-red/30 mt-3 shrink-0"></div>{" "}
                    {project.challenge}
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-red/30 mt-3 shrink-0"></div>{" "}
                    Navigating strict commercial floor-loading requirements in
                    Kathmandu's central hubs.
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-red/30 mt-3 shrink-0"></div>{" "}
                    Ensuring zero-delay deployment to meet international
                    hospitality opening deadlines.
                  </li>
                </ul>
              </div>
              <div className="p-12 industrial-border bg-surface-darker shadow-xl border-l-4 border-l-brand-red">
                <h4 className="font-bebas text-4xl text-brand-red mb-8 italic tracking-widest uppercase">
                  SHAKTI SOLUTIONS
                </h4>
                <ul className="space-y-6 text-surface-muted text-lg italic font-medium">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-red mt-3 shrink-0"></div>{" "}
                    {project.solution}
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-red mt-3 shrink-0"></div>{" "}
                    Precision-mapped 3D floor plans designed for elite member
                    flow and safety.
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 bg-brand-red mt-3 shrink-0"></div>{" "}
                    Ongoing Shakti 24/7 priority maintenance protocol for
                    zero-down-time operations.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-bebas text-5xl text-surface-text italic mb-12 tracking-widest uppercase border-b-2 border-surface-border pb-6">
                SITE REVEAL
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-surface-darker industrial-border overflow-hidden [@media(hover:hover)]:grayscale hover:grayscale-0 transition-all group shadow-lg"
                  >
                    <img
                      src={`https://picsum.photos/seed/gall-${project.id}-${i}/800/800`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                      alt="Detail"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-16">
            <div className="p-12 industrial-border bg-surface-darker shadow-2xl sticky top-32">
              <h4 className="font-bebas text-3xl text-surface-text mb-10 tracking-[0.3em] border-b-4 border-brand-red pb-4 uppercase italic">
                EQUIPMENT LIST
              </h4>
              <ul className="space-y-10">
                {project.equipmentUsed.map((item, idx) => {
                  const matchedProduct = PRODUCTS.find((p) => p.name === item)
                  return (
                    <li key={idx} className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <CheckCircle size={24} className="text-brand-red" />
                          <span className="text-surface-text font-bebas text-2xl group-hover:text-brand-red transition-colors uppercase italic tracking-wide">
                            {item}
                          </span>
                        </div>
                        {matchedProduct && (
                          <Link
                            href={`/product/${matchedProduct.id}`}
                            className="text-surface-muted hover:text-brand-red transition-colors"
                          >
                            <Activity size={24} />
                          </Link>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Link
                href="/category"
                className="skew-button block mt-16 text-center bg-brand-red py-6 text-white font-bold hover:bg-surface-text hover:text-surface transition-all text-2xl uppercase tracking-widest shadow-xl"
              >
                <span>VIEW FULL CATALOG</span>
              </Link>
            </div>

            <div className="p-12 bg-brand-red text-white relative overflow-hidden group shadow-2xl skew-x-[-4deg]">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-150 transition-transform">
                <Dumbbell size={150} />
              </div>
              <h4 className="font-bebas text-4xl italic mb-6 uppercase tracking-widest">
                BUILD THIS SETUP
              </h4>
              <p className="text-white/80 text-lg mb-12 italic font-medium leading-relaxed">
                Consult with Shakti's B2B experts to adapt this industrial
                blueprint for your specific goals.
              </p>
              <Link
                href="/contact"
                className="block text-center border-4 border-white py-6 text-white font-bebas tracking-widest text-2xl hover:bg-white hover:text-brand-red transition-all uppercase italic shadow-lg"
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
