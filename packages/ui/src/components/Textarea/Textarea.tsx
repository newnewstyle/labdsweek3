import * as React from "react"
import { cn } from "cn"

import styles from "./Textarea.module.css"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.textarea, className)}
      {...props}
    />
  )
}

export { Textarea }
