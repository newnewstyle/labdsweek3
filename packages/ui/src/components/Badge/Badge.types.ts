import type { useRender } from "@base-ui/react/use-render"

export type BadgeVariant =
  "default" | "secondary" | "outline" | "success" | "warning" | "destructive"

export type BadgeProps = useRender.ComponentProps<"span"> & {
  variant?: BadgeVariant
}
