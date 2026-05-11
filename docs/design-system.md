# Wellness Nepal Design System

This project now uses a lightweight design system so new features stay visually consistent and faster to build.

## Principles

- Performance-first: default to optimized primitives (`next/image`, reusable section/container wrappers, fewer ad-hoc utility stacks).
- Consistency over creativity: reuse tokens and component patterns before introducing new one-off styles.
- Progressive enhancement: keep first paint clean, then layer animations/interactive behavior.

## Core Tokens

Use CSS variables defined in `app/globals.css`:

- Brand: `--brand-red`
- Surfaces: `--surface`, `--surface-darker`
- Borders/text: `--surface-border`, `--surface-text`, `--surface-muted`
- Typography: `--font-bebas`, `--font-montserrat`
- Radius: `--radius`

## Layout Primitives

- `components/ui/container.tsx`
  - Standard page width and horizontal padding.
  - Use for every top-level section content wrapper.
- `components/ui/section.tsx`
  - Standard section spacing and surface variants.
  - Variants:
    - `spacing`: `default` | `compact` | `hero`
    - `surface`: `base` | `elevated` | `transparent`

## Usage Rules For New Features

1. Start every new page block with `<Section>` + `<Container>`.
2. Use `next/image` for all content images (only use `<img>` for unavoidable external/embed scenarios).
3. Reuse existing UI primitives from `components/ui` before creating new custom controls.
4. Keep typography to brand font pairs:
   - Display/headline: Bebas
   - Body/support text: Montserrat
5. Prefer semantic links (`<Link>`) for navigation instead of `router.push` in buttons when possible.

## Performance Defaults

- Lazy-load non-critical/under-the-fold sections.
- Keep chat and optional UI panels dynamically loaded.
- Minimize client-only logic in shared layout unless required.

## Definition Of Done (Frontend)

- Uses section/container primitives
- Uses design tokens instead of hard-coded random colors
- Avoids new ESLint/performance regressions
- Includes image optimization and sensible loading behavior
