import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva("relative z-10", {
  variants: {
    spacing: {
      none: "",
      default: "py-20 md:py-32",
      compact: "py-14 md:py-20",
      hero: "pt-24 pb-20 md:pt-32 md:pb-32",
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
