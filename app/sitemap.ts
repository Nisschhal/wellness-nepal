import type { MetadataRoute } from "next"
import { PRODUCTS } from "@/assets/constants"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  // TODO(catalog-migration): replace `now` with per-item updatedAt from CMS/serverless catalog
  // once product/project content is sourced from Cloudinary metadata, S3 JSON, or headless CMS.

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/category"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: absoluteUrl(`/products/${product.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  // TODO(portfolio): add /portfolio and project routes back once projects are real installs.

  // TODO(local-seo-cities): append city routes such as /cities/kathmandu, /cities/butwal,
  // /cities/pokhara, /cities/birtamode after those pages are created.

  return [...staticRoutes, ...productRoutes]
}
