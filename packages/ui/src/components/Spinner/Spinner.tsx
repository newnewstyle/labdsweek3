import { cn } from "cn"
import { Loader2Icon } from "lucide-react"

import styles from "./Spinner.module.css"

type SpinnerProps = React.ComponentProps<"svg">

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="กำลังโหลด"
      className={cn(styles.spinner, className)}
      {...props}
    />
  )
}

export { Spinner, type SpinnerProps }
