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
      ? "Gym Equipment Catalog & Price List in Nepal"
      : `${type} Gym Equipment Price in Nepal`

  return {
    title,
    description: `Browse ${type === "All" ? "" : type.toLowerCase() + " "}gym equipment from WN Wellness Gym Equipment Nepal, Sukhanagar, Butwal: commercial and home gym machines with delivery and installation across Nepal. Ask on WhatsApp for prices.`,
    keywords: [
      `gym equipment price in Nepal`,
      `${type} gym equipment Nepal`,
      `gym equipment shop in Butwal`,
      `WN Wellness Gym Equipment Nepal`,
    ],
    openGraph: {
      title,
      description: `${type} gym equipment for commercial and home gyms in Nepal.`,
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
    name: "WN Wellness Gym Equipment Nepal catalog",
    description: "Commercial and home gym equipment available in Nepal.",
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
      question: "What gym equipment does WN Wellness Gym Equipment Nepal sell?",
      answer:
        "Treadmills, exercise and spin bikes, ellipticals, rowers, multi gym and cable machines, Smith machines, plate-loaded and pin-loaded strength machines, benches, racks, dumbbells and weight plates, for commercial and home gyms.",
    },
    {
      question: "Do you deliver gym equipment outside Butwal?",
      answer:
        "Yes. We deliver gym equipment from our Butwal showroom to cities across Nepal, including Kathmandu, Pokhara, Bharatpur, Nepalgunj, Biratnagar and Dhangadhi, with installation on arrival.",
    },
    {
      question: "Can I get a bulk discount for commercial gym equipment?",
      answer:
        "Yes. We quote commercial gym setups as a package. Call or WhatsApp 984-0967865 for a price list and quotation.",
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
