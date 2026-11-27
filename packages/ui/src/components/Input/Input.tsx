import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

import { useFieldControlProps } from "../Field/field-context"

import styles from "./Input.module.css"

function Input({ className, type, ...rest }: React.ComponentProps<"input">) {
  const props = useFieldControlProps(rest)
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(styles.input, className)}
      {...props}
    />
  )
}

export { Input }
