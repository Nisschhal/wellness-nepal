import { Metadata } from "next"
import { PRODUCTS } from "@/assets/constants"
import Category from "@/components/Category"
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo"

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
      url: absoluteUrl("/category"),
      images: [PRODUCTS[0].image],
    },
    alternates: {
      canonical:
        type === "All" ? "/category" : `/category?type=${encodeURIComponent(type)}`,
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
      url: absoluteUrl(`/products/${p.id}`),
      name: p.name,
      image: p.image,
    })),
  }
  // TODO(catalog-migration): once catalog comes from Cloudinary/AWS/serverless storage,
  // switch PRODUCTS to API-backed pagination and emit matching ItemList page URLs.

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Catalog" },
  ])

  const faqs = faqJsonLd([
    {
      question: "What types of gym equipment does Wellness Nepal sell?",
      answer:
        "Wellness Nepal offers commercial-grade cardio machines, strength equipment, multi-station units, crossfit gear, free weights, and accessories from the Shakti series.",
    },
    {
      question: "Does Wellness Nepal deliver gym equipment outside Kathmandu?",
      answer:
        "Yes, Wellness Nepal delivers and installs gym equipment nationwide across all 77 districts of Nepal.",
    },
    {
      question: "Can I get a bulk discount for commercial gym equipment?",
      answer:
        "Yes, Wellness Nepal offers B2B pricing and custom quotes for commercial gym setups. Contact our team for volume pricing.",
    },
  ])

  const allJsonLd = [jsonLd, breadcrumbs, faqs]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allJsonLd) }}
      />
      <Category />
    </>
  )
}
