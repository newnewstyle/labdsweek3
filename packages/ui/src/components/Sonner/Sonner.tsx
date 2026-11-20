"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"

import styles from "./Sonner.module.css"

/** Toast colors come from the design tokens via sonner's CSS variables. */
const tokenStyle = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
  "--border-radius": "var(--radius)",
} as React.CSSProperties

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      icons={{
        success: <CircleCheckIcon className={styles.icon} />,
        info: <InfoIcon className={styles.icon} />,
        warning: <TriangleAlertIcon className={styles.icon} />,
        error: <OctagonXIcon className={styles.icon} />,
        loading: <Loader2Icon className={styles.spinner} />,
      }}
      style={tokenStyle}
      {...props}
    />
  )
}

export { Toaster }
