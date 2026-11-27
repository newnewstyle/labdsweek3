"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

import {
  FieldContext,
  useFieldControlProps,
  useFieldGroupProps,
} from "../Field/field-context"

import styles from "./RadioGroup.module.css"

function RadioGroup({ className, children, ...rest }: RadioGroupPrimitive.Props) {
  // In a Field, the group is named by its FieldLabel (aria-labelledby) and described by its
  // FieldDescription / FieldError.
  const props = useFieldGroupProps(rest)
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn(styles.group, className)}
      {...props}
    >
      {/* Options belong to their own Field (or none), never to the Field around the group. */}
      <FieldContext.Provider value={null}>{children}</FieldContext.Provider>
    </RadioGroupPrimitive>
  )
}

function RadioGroupItem({ className, ...rest }: RadioPrimitive.Root.Props) {
  // In an option's own Field, its FieldLabel and FieldDescription are wired like a Checkbox.
  const props = useFieldControlProps(rest)
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(styles.item, className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={styles.indicator}
      >
        <span className={styles.dot} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
