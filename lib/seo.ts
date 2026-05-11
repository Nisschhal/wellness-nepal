import { COMPANY_DETAILS } from "@/assets/data/companyDetail"

const FALLBACK_SITE_URL = "https://wellnessnepalgym.com"
// TODO(catalog-migration): move this fallback to env-only once production domain is final.
// Keep NEXT_PUBLIC_SITE_URL in sync with whichever provider hosts static content/CDN.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "")

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`
  return `${SITE_URL}${path}`
}

export const DEFAULT_KEYWORDS = [
  "gym equipment Nepal",
  "fitness equipment Nepal",
  "commercial gym equipment Kathmandu",
  "home gym setup Nepal",
  "treadmill price Nepal",
  "strength machines Nepal",
  "Wellness Nepal",
  // TODO(local-seo-cities): expand this list using catalog + service area pages
  // for high-intent city variants (Butwal, Kathmandu, Pokhara, Birtamode, etc.).
]

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "SportsActivityLocation", "Store"],
  "@id": absoluteUrl("#organization"),
  name: COMPANY_DETAILS.brand.name,
  legalName: COMPANY_DETAILS.brand.fullName,
  url: SITE_URL,
  logo: absoluteUrl("/wellness-dark.svg"),
  image: absoluteUrl("/wellness-dark.svg"),
  description:
    "Wellness Nepal supplies commercial and home fitness equipment with planning, installation, and support across Nepal.",
  telephone: COMPANY_DETAILS.brand.phone,
  email: COMPANY_DETAILS.brand.email,
  sameAs: [
    COMPANY_DETAILS.socials.facebook,
    COMPANY_DETAILS.socials.instagram,
    COMPANY_DETAILS.socials.twitter,
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_DETAILS.brand.address,
    addressCountry: "NP",
  },
  areaServed: {
    "@type": "Country",
    name: "Nepal",
  },
  // TODO(geo): add explicit branch/service-area entities when city landing pages are added.
}

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("#website"),
  url: SITE_URL,
  name: "Wellness Nepal",
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
