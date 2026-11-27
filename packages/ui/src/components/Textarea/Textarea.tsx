import * as React from "react"
import { cn } from "cn"

import { useFieldControlProps } from "../Field/field-context"

import styles from "./Textarea.module.css"

function Textarea({ className, ...rest }: React.ComponentProps<"textarea">) {
  const props = useFieldControlProps(rest)
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.textarea, className)}
      {...props}
    />
  )
}

export { Textarea }
