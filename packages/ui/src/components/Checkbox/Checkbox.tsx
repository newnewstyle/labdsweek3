"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

import { useFieldControlProps } from "../Field/field-context"

import styles from "./Checkbox.module.css"

function Checkbox({ className, ...rest }: CheckboxPrimitive.Root.Props) {
  const props = useFieldControlProps(rest)
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(styles.checkbox, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={styles.indicator}
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
