import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"

import styles from "./Button.module.css"

type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"

type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant
  size?: ButtonSize
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(styles.button, className)}
      {...props}
    />
  )
}

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant }
