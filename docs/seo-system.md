# SEO / AEO / GEO System Rules

This document is the single source of truth for all search-engine and AI-engine optimization in this project. **Every new page, component, or route MUST follow these rules.**

---

## 1. Metadata (Every Route)

Every `app/**/page.tsx` MUST export a `metadata` object or `generateMetadata()` function with:

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Use template `%s \| Wellness Nepal` via root layout |
| `description` | Yes | 120-160 chars, include primary keyword + location |
| `keywords` | Yes | 5-8 terms, include city + category variants |
| `alternates.canonical` | Yes | Always set, must match route path exactly |
| `openGraph.*` | Yes | title, description, url, images, type |
| `twitter` | Recommended | Inherits from OG if omitted in root layout |

### Title Formula
- Homepage: `Wellness Nepal Gym | Premium Fitness Equipment`
- Category: `[Type] Equipment | Wellness Nepal`
- Product: `[Name] | Commercial Gym Equipment Nepal | Shakti Series`
- Portfolio: `[Title] | Shakti Case Study in [Location]`
- City (future): `Gym Equipment in [City] | Wellness Nepal`

---

## 2. Structured Data / JSON-LD (AEO/GEO)

Every page type requires specific JSON-LD. Inject via `<script type="application/ld+json">` in Server Components only.

### Required Per Page Type

| Page Type | Schema Types |
|---|---|
| Root Layout | `Organization`, `WebSite` (with `SearchAction`) |
| Homepage | (inherits from root) |
| Category | `ItemList`, `BreadcrumbList` |
| Product Detail | `Product` (with `Offer`, `Brand`), `BreadcrumbList`, `FAQPage` |
| Portfolio List | `ItemList`, `BreadcrumbList` |
| Portfolio Detail | `Article` or `CreativeWork`, `BreadcrumbList` |
| Contact | `ContactPage`, `LocalBusiness` |
| About | `AboutPage`, `FAQPage` |
| City (future) | `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList` |

### Schema Rules

1. **Never use non-standard `@type` values.** Use only types from https://schema.org. (`CaseStudy` is NOT valid -- use `Article` or `CreativeWork`.)
2. **`price` in `Offer` must be numeric or omitted.** Never set `price: "Contact for Price"`. If no price, omit the `price` field and set `availability` to `https://schema.org/InStock` with `priceSpecification` if needed.
3. **`@id` anchors must be consistent.** Use the pattern `absoluteUrl("/path#type")` e.g. `absoluteUrl("/products/treadmill-x1#product")`.
4. **`BreadcrumbList` is mandatory** on all pages deeper than root. Format:
   ```json
   {
     "@type": "BreadcrumbList",
     "itemListElement": [
       { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://..." },
       { "@type": "ListItem", "position": 2, "name": "Category", "item": "https://..." },
       { "@type": "ListItem", "position": 3, "name": "[Page Title]" }
     ]
   }
   ```
5. **`FAQPage` schema** should be added on high-intent pages (product detail, contact, about, category). Source FAQ content from data files, not hardcoded in page components.

---

## 3. Sitemap & Robots

- **`app/sitemap.ts`** -- must include ALL public routes. When adding a new route, add it here.
- **`app/robots.ts`** -- allow all crawlers by default. Disallow only admin/API routes.
- When catalog moves to API, update `lastModified` to use real content timestamps.

---

## 4. Image SEO

- All content images MUST use `next/image` with descriptive `alt` text.
- `alt` text should include product name + category + "Nepal" for product images.
- Hero/above-fold images: `priority={true}`.
- All other images: rely on `next/image` default lazy loading.
- OG images must be raster format (PNG/JPG), 1200x630px. Never use SVG for social cards.

---

## 5. Geographic (GEO) Signals

- Root layout must include `<html lang="en">` (already done).
- Add geo meta tags in root layout:
  ```html
  <meta name="geo.region" content="NP" />
  <meta name="geo.placename" content="Kathmandu" />
  ```
- Organization schema must include `areaServed`, `address`, and `telephone`.
- Future: city landing pages (`/cities/[city]`) with `LocalBusiness` + `Service` schema per city.

---

## 6. AI Engine Optimization (AEO)

AI search engines (Perplexity, ChatGPT search, Google SGE) consume:
1. **JSON-LD structured data** -- highest signal. Keep schemas rich and valid.
2. **FAQ content** -- directly quoted in AI answers. Add `FAQPage` schema wherever questions exist.
3. **Clear semantic HTML** -- use `<article>`, `<section>`, `<header>`, `<nav>`, `<main>` appropriately.
4. **Descriptive headings** -- `<h1>` per page, hierarchy `h1 > h2 > h3`. Never skip levels.
5. **Internal linking** -- every product links to category, every case study links to products used.

---

## 7. Canonical URL Rules

- Use `absoluteUrl()` from `lib/seo.ts` for all canonical/OG URLs.
- Never hardcode the domain. Always derive from `SITE_URL`.
- Query-param pages (e.g. `/category?type=Cardio`) should set canonical to the base path (`/category`) unless the filtered view is a distinct indexable page.

---

## 8. Checklist for New Pages

Before merging any new page/route:

- [ ] `metadata` or `generateMetadata()` exported with all required fields
- [ ] `alternates.canonical` set
- [ ] JSON-LD injected with valid schema types
- [ ] `BreadcrumbList` JSON-LD included (if not homepage)
- [ ] Images use `next/image` with `alt`, `sizes`, and appropriate `priority`
- [ ] Route added to `app/sitemap.ts`
- [ ] OG image is raster (not SVG) at 1200x630
- [ ] Tested with Google Rich Results Test or Schema.org validator
- [ ] `FAQPage` schema added if page has Q&A content

---

## 9. Helper Utilities

All SEO utilities live in `lib/seo.ts`:

- `SITE_URL` -- production domain (from env or fallback)
- `absoluteUrl(path)` -- builds full URL for schema/canonical
- `DEFAULT_KEYWORDS` -- base keyword set
- `ORGANIZATION_JSON_LD` -- reusable org schema
- `WEBSITE_JSON_LD` -- reusable website schema
- `breadcrumbJsonLd(items)` -- generates BreadcrumbList (added by this update)
- `faqJsonLd(faqs)` -- generates FAQPage schema (added by this update)
