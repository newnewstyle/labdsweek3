"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

import { useFieldControlProps } from "../Field/field-context"

import styles from "./Switch.module.css"

type SwitchSize = "sm" | "default"

type SwitchProps = SwitchPrimitive.Root.Props & { size?: SwitchSize }

function Switch({ className, size = "default", ...rest }: SwitchProps) {
  const props = useFieldControlProps(rest)
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(styles.switch, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={styles.thumb}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, type SwitchProps, type SwitchSize }
