import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva("relative z-10", {
  variants: {
    spacing: {
      none: "",
      default: "py-16 md:py-24",
      compact: "py-12 md:py-16",
      hero: "pt-28 pb-16 md:pt-36 md:pb-24",
    },
    surface: {
      base: "bg-surface",
      elevated: "bg-surface-darker",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    spacing: "default",
    surface: "base",
  },
})

type SectionProps = ComponentProps<"section"> & VariantProps<typeof sectionVariants>

export function Section({
  className,
  spacing,
  surface,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ spacing, surface, className }))}
      data-slot="section"
      {...props}
    />
  )
}
