import { Metadata } from "next"
import { notFound } from "next/navigation"
import { PRODUCTS } from "@/assets/constants"
import ProductDetail from "@/components/ProductDetail"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"

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
  // TODO(catalog-migration): enrich metadata with real fields from serverless catalog source:
  // sku, gtin/mpn, brand, stock status, price range, and updatedAt.

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
      url: absoluteUrl(`/products/${product.id}`),
      images: [{ url: product.image }],
      type: "website",
    },
    alternates: {
      canonical: `/products/${product.id}`,
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
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": absoluteUrl(`/products/${product.id}#product`),
    url: absoluteUrl(`/products/${product.id}`),
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Shakti by Wellness Nepal",
    },
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "NPR",
            price: Number(product.price),
            availability: "https://schema.org/InStock",
            areaServed: "Nepal",
            url: absoluteUrl(`/products/${product.id}`),
          },
        }
      : {}),
  }
  // TODO(aeo): when catalog backend is ready, include `aggregateRating` and `review` schema
  // from verified customer/project feedback data.

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Catalog", url: absoluteUrl("/category") },
    { name: product.name },
  ])

  const faqs = faqJsonLd([
    {
      question: `What is the price of ${product.name} in Nepal?`,
      answer: product.price
        ? `The ${product.name} is available at NPR ${Number(product.price).toLocaleString()}. Contact us for B2B and bulk pricing.`
        : `The ${product.name} pricing is available on enquiry. Contact our team for a custom B2B quote.`,
    },
    {
      question: `Does Wellness Nepal deliver ${product.name} outside Kathmandu?`,
      answer: `Yes, Wellness Nepal delivers the ${product.name} nationwide across all 77 districts of Nepal with professional installation support.`,
    },
    {
      question: `What warranty does the ${product.name} come with?`,
      answer: `The ${product.name} comes with a lifetime structural frame warranty and 1-year warranty on wear parts. Extended warranty options are available for commercial clients.`,
    },
  ])

  const jsonLd = [productJsonLd, breadcrumbs, faqs]

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
