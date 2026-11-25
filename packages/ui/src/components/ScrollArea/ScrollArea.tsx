"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "cn"

import styles from "./ScrollArea.module.css"

type ScrollAreaProps = ScrollAreaPrimitive.Root.Props & {
  /** Which scrollbars to show. Default: vertical only. */
  scrollbars?: "vertical" | "horizontal" | "both"
}

function ScrollArea({
  className,
  children,
  scrollbars = "vertical",
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(styles.root, className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={styles.viewport}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {scrollbars !== "horizontal" && <ScrollBar orientation="vertical" />}
      {scrollbars !== "vertical" && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(styles.scrollbar, className)}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={styles.thumb}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar, type ScrollAreaProps }
