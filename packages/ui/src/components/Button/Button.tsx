import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
import { LoaderCircleIcon } from "lucide-react"

import styles from "./Button.module.css"
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types"

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const iconOnly = size.startsWith("icon")
  const spinner = (
    <LoaderCircleIcon
      data-slot="button-spinner"
      data-icon={iconOnly ? undefined : "inline-start"}
      className={styles.spinner}
      aria-hidden
    />
  )

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(styles.button, className)}
      {...props}
    >
      {loading && iconOnly ? (
        spinner
      ) : (
        <>
          {loading ? spinner : null}
          {children}
        </>
      )}
    </ButtonPrimitive>
  )
}

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant }
