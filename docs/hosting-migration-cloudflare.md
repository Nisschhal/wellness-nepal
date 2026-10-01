# Moving hosting from Vercel to Cloudflare (SEO-safe checklist)

Status: planned, not started. Site is on Vercel; domain and DNS are on Cloudflare.

## Current setup (Oct 2026)

- Domain `wnwellnessequipment.com` bought at Cloudflare; DNS on Cloudflare, records "DNS only".
- DNS records: apex CNAME and `www` CNAME to Vercel, `_vercel` TXT (Vercel ownership),
  `@` TXT `google-site-verification=...` (Search Console, keep forever).
- Vercel project `wellness-nepal`, Node 24.x. Apex redirects to `www` (permanent 308).
- Canonical address: `https://www.wnwellnessequipment.com` (`NEXT_PUBLIC_SITE_URL`).
- Search Console: Domain property `wnwellnessequipment.com`, owner
  wellnessgymequipmentnepal@gmail.com.

## Rule

Rankings belong to the domain and the URLs, not the host. Keep the same domain, the same
paths and the same content, and SEO carries over.

## Before switching

1. Deploy to Cloudflare with the OpenNext adapter (`@opennextjs/cloudflare`) on its
   temporary `*.workers.dev` address.
2. Copy all environment variables from Vercel (AI keys, Cloudinary, `NEXT_PUBLIC_SITE_URL`).
3. Test on the temporary address:
   - `/api/chat` (AI SDK + LangChain streaming)
   - `next/image` with Cloudinary images
   - `/sitemap.xml`, `/robots.txt`, `/llms.txt`
   - a few `/products/[id]` pages, `/category`, `/contact`
   - page titles, canonical tags and JSON-LD match production
4. Check the Workers bundle size limit.

## Switching

1. Lower the TTL on the apex and `www` records a day ahead.
2. Add the custom domains to the Cloudflare project; point apex and `www` at it.
3. Recreate the apex to `www` redirect as permanent (Rules > Redirect Rules, 301/308).
4. Do not touch the `@` google-site-verification TXT record.
5. Keep the Vercel project running for a few days while DNS propagates.

## After switching

- Search Console: URL inspection on the homepage and a few product pages.
- Watch Indexing > Pages for a week for new errors.
- Optional: resubmit `https://www.wnwellnessequipment.com/sitemap.xml`.
- Remove the `_vercel` TXT and delete the Vercel project only after everything is stable.
