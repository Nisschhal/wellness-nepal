import type { Metadata } from "next"
import PortfolioPageClient from "@/components/PortfolioPageClient"
import { PROJECTS_DATA } from "@/assets/data/projects"
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Portfolio | Gym Setup Projects Across Nepal",
  description:
    "Explore Wellness Nepal portfolio projects for commercial gyms, hotels, and home gyms across Nepal.",
  alternates: {
    canonical: "/portfolio",
  },
  // TODO(portfolio): remove noindex once placeholder projects are replaced with real installs
  robots: { index: false, follow: true },
  openGraph: {
    title: "Wellness Nepal Project Portfolio",
    description:
      "Case studies of gym setup, installation, and equipment deployments across Nepal.",
    url: absoluteUrl("/portfolio"),
    type: "website",
  },
}

export default function PortfolioPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wellness Nepal Portfolio",
    itemListElement: PROJECTS_DATA.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/portfolio/${project.id}`),
      name: project.title,
    })),
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Portfolio" },
  ])

  const jsonLd = [itemListJsonLd, breadcrumbs]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioPageClient />
    </>
  )
}
