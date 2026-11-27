"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "cn"

import {
  Toggle,
  type ToggleProps,
  type ToggleSize,
  type ToggleVariant,
} from "../Toggle"

import styles from "./ToggleGroup.module.css"

type ToggleGroupContextValue = {
  variant?: ToggleVariant
  size?: ToggleSize
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

type ToggleGroupProps = ToggleGroupPrimitive.Props & {
  variant?: ToggleVariant
  size?: ToggleSize
  /** Gap between items in spacing units; 0 joins them into one bar. */
  spacing?: number
  orientation?: "horizontal" | "vertical"
}

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      orientation={orientation}
      // --gap drives the item spacing (a caller's `style` replaces it)
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(styles.group, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  variant = "default",
  size = "default",
  ...props
}: ToggleProps) {
  const context = React.useContext(ToggleGroupContext)
  return (
    <Toggle
      data-slot="toggle-group-item"
      variant={context.variant ?? variant}
      size={context.size ?? size}
      className={cn(styles.item, className)}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps }
