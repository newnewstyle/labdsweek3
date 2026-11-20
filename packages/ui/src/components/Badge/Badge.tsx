import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import styles from "./Badge.module.css"

type BadgeVariant =
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

type BadgeProps = useRender.ComponentProps<"span"> & {
  variant?: BadgeVariant
}

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(styles.badge, className) },
      props
    ),
    render,
    // state becomes data-slot / data-variant attributes
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, type BadgeProps, type BadgeVariant }
