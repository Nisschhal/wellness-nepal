import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PRODUCTS } from "@/assets/constants"
import ProductDetail from "@/components/ProductDetail"

// 1. GENERATE STATIC PATHS (Makes them real HTML files at build time)
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }))
}

// 2. DYNAMIC SEO METADATA (Updated for Next.js 15)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params // Await the params
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) return { title: "Product Not Found" }

  return {
    title: `${product.name} | Commercial Gym Equipment Nepal | Shakti Series`,
    description: `Industrial-grade ${product.name}. ${product.description} Built for commercial durability in Nepal. View specs, warranty, and B2B pricing.`,
    keywords: [
      `${product.name} Nepal`,
      `commercial gym equipment Kathmandu`,
      `Shakti gym series`,
      `industrial fitness gear`,
      product.category,
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
      type: "website",
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params // Await the params here
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) notFound()

  // 3. JSON-LD FOR AEO/GEO (AI Search Engines love this)
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Shakti by Wellness Nepal",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "NPR",
      price: product.price || "Contact for Price",
      availability: "https://schema.org/InStock",
      areaServed: "Nepal",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  )
}
