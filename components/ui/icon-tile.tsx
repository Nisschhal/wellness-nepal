import type { ComponentProps, ElementType } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center border transition-colors",
  {
    variants: {
      size: {
        sm: "size-9 [&_svg]:size-4",
        md: "size-12 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
      },
      tone: {
        subtle:
          "border-brand-red/25 bg-brand-red/10 text-brand-red group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white",
        solid: "border-brand-red bg-brand-red text-white",
        outline: "border-surface-border bg-surface text-brand-red",
      },
    },
    defaultVariants: { size: "md", tone: "subtle" },
  },
)

type IconTileProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof iconTileVariants> & { icon: ElementType }

/** Square icon container so every icon on the site has the same size and alignment. */
export function IconTile({ icon: Icon, size, tone, className, ...props }: IconTileProps) {
  return (
    <span
      className={cn(iconTileVariants({ size, tone }), className)}
      aria-hidden
      {...props}
    >
      <Icon strokeWidth={1.75} />
    </span>
  )
}
