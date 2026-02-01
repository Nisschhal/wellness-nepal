import { Metadata } from "next"
import { PRODUCTS } from "@/assets/constants"
import Category from "@/components/Category"

// SEO Metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}): Promise<Metadata> {
  const params = await searchParams

  const type = params.type || "All"
  const title =
    type === "All"
      ? "Full Catalog | Premium Commercial Gym Equipment | Wellness Nepal"
      : `${type} Equipment | Commercial Shakti Range | Wellness Nepal`

  return {
    title,
    description: `Browse the ${type} Shakti range of industrial-grade gym equipment. High-performance ${type.toLowerCase()} gear engineered for commercial gyms in Kathmandu and across Nepal.`,
    keywords: [
      `gym equipment Nepal`,
      `commercial fitness gear`,
      `Shakti series`,
      `${type} gym machines`,
      `Wellness Nepal inventory`,
    ],
    openGraph: {
      title,
      description: `Premium ${type} commercial gym gear. Built for high-volume use.`,
      images: [PRODUCTS[0].image],
    },
  }
}

export default function Page() {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wellness Nepal Shakti Equipment Catalog",
    description: "Industrial-grade commercial gym equipment inventory.",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://wellnessnepal.com.np/product/${p.id}`,
      name: p.name,
      image: p.image,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Category />
    </>
  )
}
