import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const FALLBACK_SITE_URL = "https://www.wnwellnessequipment.com"
// Production domain. NEXT_PUBLIC_SITE_URL overrides it (e.g. for preview deploys).

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "")

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`
  return `${SITE_URL}${path}`
}

export const DEFAULT_KEYWORDS = [
  "gym equipment Nepal",
  "gym equipment price in Nepal",
  "gym equipment shop in Butwal",
  "gym equipment suppliers Nepal",
  "gym setup cost in Nepal",
  "commercial gym setup Nepal",
  "home gym equipment Nepal",
  "treadmill price in Nepal",
  "WN Wellness Gym Equipment Nepal",
  // TODO(local-seo-cities): expand this list using catalog + service area pages
  // for high-intent city variants (Kathmandu, Pokhara, Chitwan, Nepalgunj, etc.).
]

const { brand, socials, serviceAreas, services } = COMPANY_DETAILS

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SportingGoodsStore",
  "@id": absoluteUrl("#organization"),
  name: brand.name,
  legalName: brand.fullName,
  url: SITE_URL,
  logo: absoluteUrl("/wellness-dark.svg"),
  image: absoluteUrl("/wellness-dark.svg"),
  description: brand.description,
  telephone: brand.phone,
  contactPoint: [brand.phone, ...brand.otherPhones].map((telephone) => ({
    "@type": "ContactPoint",
    telephone,
    contactType: "sales",
    areaServed: "NP",
  })),
  ...(brand.email ? { email: brand.email } : {}),
  taxID: brand.pan,
  foundingDate: String(brand.founded),
  sameAs: Object.values(socials),
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.streetAddress,
    addressLocality: brand.locality,
    addressRegion: brand.region,
    postalCode: brand.postalCode,
    addressCountry: "NP",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: brand.hours.opens,
    closes: brand.hours.closes,
  },
  areaServed: [
    ...serviceAreas.map((name) => ({
      "@type": name.endsWith("Province") ? "AdministrativeArea" : "City",
      name,
    })),
    { "@type": "Country", name: "Nepal" },
  ],
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.desc,
    },
  })),
  // TODO(geo): add `geo` coordinates copied from the Google Business Profile pin.
}

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("#website"),
  url: SITE_URL,
  name: brand.name,
  inLanguage: "en-NP",
  publisher: {
    "@id": absoluteUrl("#organization"),
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/category?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

// --- Reusable JSON-LD generators ---

export interface BreadcrumbItem {
  name: string
  url?: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
