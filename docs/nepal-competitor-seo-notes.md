# Nepal Competitor SEO/GEO/AEO Notes

This note captures market signals from web search for gym equipment intent in Nepal.

## Observed Competitors/Market Players

- Fitness Choice (Kathmandu)
- Pro Fitness Store (Kathmandu)
- Orla Dad Fitness (nationwide messaging)
- Gym Experts (Nepal-wide, international brand positioning)
- Star Fit / SHGE / other wholesaler listings
- Daraz marketplace sellers (price-first, SKU-heavy long-tail capture)

## City Intent Signals

- Kathmandu queries surface dedicated supplier pages and directories.
- Butwal/Pokhara queries often show mixed local listings + national suppliers.
- Birtamode results are more gym/service heavy; weaker dedicated equipment pages.
- Directories and marketplaces take visibility where brand sites lack structured city pages.

## Strategy To Beat Competitors

1. Build city landing pages with commercial intent:
   - `/cities/kathmandu`
   - `/cities/butwal`
   - `/cities/pokhara`
   - `/cities/birtamode`
2. Add unique proof per city:
   - delivered projects, turnaround times, support coverage, installation photos.
3. Create cluster pages by equipment intent:
   - treadmills, smith machines, functional trainers, flooring, racks.
4. Keep product schema + portfolio case studies tightly interlinked.
5. Capture price-intent traffic with transparent "starting from" ranges and FAQs.

## TODO Implementation Hooks

- TODO(city-pages): add city routes and include in sitemap + internal navigation.
- TODO(schema): add `FAQPage`, `Service`, and `BreadcrumbList` schemas per city and category page.
- TODO(catalog-source): switch from static arrays to API-backed catalog feed while preserving canonical URLs.

## AI/Search 100% Readiness Checklist

Use this as the master TODO list to avoid missing any critical work.

- [ ] Set production canonical domain in env: `NEXT_PUBLIC_SITE_URL`.
- [ ] Add city landing pages: Kathmandu, Butwal, Pokhara, Birtamode (+ other major cities).
- [ ] Add city-level schema (`LocalBusiness`/`Service`) with area-specific proof and FAQs.
- [x] Add `FAQPage` schema on high-intent category/product/service pages.
- [x] Add `BreadcrumbList` schema across category, product, and portfolio page templates.
- [ ] Enrich `Product` schema with future catalog fields (SKU, GTIN/MPN, stock, price range, brand).
- [ ] Add `aggregateRating` and `review` schema when verified review data is available.
- [ ] Move sitemap `lastModified` to real content timestamps from catalog/CMS source.
- [ ] Keep `robots.txt`, `sitemap.xml`, and `llms.txt` updated whenever routes/content strategy changes.
- [ ] Build internal linking hubs between city pages, category pages, products, and case studies.
- [ ] Publish city-specific case studies (project proof, delivery timeline, installation photos).
- [ ] Add content clusters for high-intent equipment keywords (treadmill, smith machine, etc.).
- [ ] Connect and monitor in Google Search Console + Bing Webmaster Tools.
- [ ] Track index coverage, rich result validation, CTR, and ranking by city keyword set monthly.
- [ ] Plan off-page authority: citations, backlinks, reviews, and social proof campaigns.

## Vercel Deployment Notes (Future Catalog Migration)

- Set `NEXT_PUBLIC_SITE_URL` to your final production domain.
- TODO: If using Cloudinary later, set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
- TODO: If using AWS/S3 image host later, set `NEXT_PUBLIC_AWS_BUCKET_HOST`.
- TODO: Rebuild on deploy so `next.config.ts` picks up image host env vars.
