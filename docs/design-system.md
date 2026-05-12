# Wellness Nepal Design System

This project uses a lightweight design system so new features stay visually consistent and performant. **All new code MUST follow these rules.**

See also: `docs/seo-system.md` for SEO/AEO/GEO rules.

---

## Principles

1. **Performance-first**: default to optimized primitives (`next/image`, reusable section/container wrappers, fewer ad-hoc utility stacks).
2. **Consistency over creativity**: reuse tokens and component patterns before introducing new one-off styles.
3. **Progressive enhancement**: keep first paint clean, then layer animations/interactive behavior.
4. **Server-first rendering**: default to Server Components. Only add `"use client"` when you need hooks, event handlers, or browser APIs.

---

## Core Tokens

Use CSS variables defined in `app/globals.css`:

| Token | Variable | Usage |
|---|---|---|
| Brand | `--brand-red` | CTA, accents, links |
| Surface | `--surface`, `--surface-darker` | Backgrounds |
| Border/Text | `--surface-border`, `--surface-text`, `--surface-muted` | Borders, body text, secondary text |
| Typography | `--font-bebas`, `--font-montserrat` | Display / body fonts |
| Radius | `--radius` | Border radius base |

Never hardcode colors. Always use design tokens via Tailwind (`bg-surface`, `text-brand-red`, etc.).

---

## Layout Primitives

- **`components/ui/container.tsx`** -- standard page width + horizontal padding. Use for every section.
- **`components/ui/section.tsx`** -- standard section spacing + surface variants.
  - `spacing`: `default` | `compact` | `hero` | `none`
  - `surface`: `base` | `elevated` | `transparent`

---

## Usage Rules For New Features

### Components
1. Start every new page block with `<Section>` + `<Container>`.
2. Reuse existing UI primitives from `components/ui` before creating new controls.
3. Keep typography to brand font pairs: Display = Bebas, Body = Montserrat.
4. Prefer semantic links (`<Link>`) over `router.push` in buttons when possible.

### Images (Critical)
5. **ALWAYS use `next/image`** for all content images. Raw `<img>` tags are forbidden except for:
   - Dynamically generated content inside markdown renderers
   - Third-party embed iframes
6. Every `<Image>` must have:
   - Descriptive `alt` text (include product name + "Nepal" for product images)
   - `sizes` prop for responsive images (e.g. `"(min-width: 1024px) 33vw, 100vw"`)
   - `priority` on above-the-fold hero images only
7. Add external image domains to `next.config.ts > images.remotePatterns`.

### Loading & Perceived Performance
8. **Every route MUST have a `loading.tsx`** file with a skeleton that matches the page layout. This ensures instant visual feedback during navigation.
9. Dynamic imports (`next/dynamic`) for below-fold sections MUST include a `loading` placeholder:
   ```tsx
   const Section = dynamic(() => import("@/section/Foo"), {
     loading: () => <div className="min-h-[400px]" />,
   })
   ```
10. Use `<Suspense>` boundaries around client components that depend on `useSearchParams()` or other async client state.

### Client vs Server Components
11. Default to **Server Components**. Only add `"use client"` when you need:
    - React hooks (`useState`, `useEffect`, etc.)
    - Event handlers (`onClick`, `onChange`, etc.)
    - Browser APIs (`window`, `document`, etc.)
    - Animation libraries (`framer-motion`)
12. Extract static content (text, headings, links) into Server Components. Wrap only interactive parts in client boundaries.
13. JSON-LD structured data MUST be injected in Server Components (page.tsx / layout.tsx), never inside client components.

---

## Performance Defaults

- Lazy-load non-critical/below-fold sections with `next/dynamic`.
- Keep chat and optional UI panels dynamically loaded with `ssr: false`.
- Minimize client-only logic in shared layout unless required.
- Font loading uses `display: "swap"` to prevent FOIT.
- Images use `next/image` for automatic WebP/AVIF, responsive srcset, and lazy loading.

---

## Custom 404

- `app/not-found.tsx` provides a branded 404 page with navigation back to key pages.
- Always handle `notFound()` in dynamic routes when data lookup fails.

---

## Definition Of Done (Frontend)

Before merging any new page or feature:

- [ ] Uses `<Section>` + `<Container>` layout primitives
- [ ] Uses design tokens (no hardcoded colors)
- [ ] All images use `next/image` with `alt` and `sizes`
- [ ] `loading.tsx` skeleton exists for the route
- [ ] Dynamic imports include `loading` placeholder
- [ ] JSON-LD is in Server Component (see `docs/seo-system.md`)
- [ ] SEO metadata exported (see `docs/seo-system.md`)
- [ ] No new ESLint/performance regressions
- [ ] Tested on mobile viewport (375px+)
