import type { Button as ButtonPrimitive } from "@base-ui/react/button"

type ButtonVariant =
  "default" | "outline" | "ghost" | "destructive" | "destructive-solid" | "link"

type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Shows a spinner, disables the button and sets aria-busy. */
  loading?: boolean
}

export type { ButtonProps, ButtonSize, ButtonVariant }
