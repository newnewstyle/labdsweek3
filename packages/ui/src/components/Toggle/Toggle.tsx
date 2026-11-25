"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cn } from "cn"

import styles from "./Toggle.module.css"

type ToggleVariant = "default" | "outline"
type ToggleSize = "default" | "sm" | "lg"

type ToggleProps = TogglePrimitive.Props & {
  variant?: ToggleVariant
  size?: ToggleSize
}

/** A button that stays pressed (on) or not (off). */
function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(styles.toggle, className)}
      {...props}
    />
  )
}

export { Toggle, type ToggleProps, type ToggleSize, type ToggleVariant }
