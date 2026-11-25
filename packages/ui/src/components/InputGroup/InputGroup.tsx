"use client"

import * as React from "react"
import { cn } from "cn"

import { Button, type ButtonProps } from "../Button"
import { Input } from "../Input"
import { Textarea } from "../Textarea"

import styles from "./InputGroup.module.css"

type InputGroupAddonAlign =
  "inline-start" | "inline-end" | "block-start" | "block-end"

type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & { align?: InputGroupAddonAlign }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(styles.addon, className)}
      // clicking the addon (e.g. the ฿ sign) focuses the input
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<ButtonProps, "size" | "type"> & {
  size?: InputGroupButtonSize
  type?: "button" | "submit" | "reset"
}) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn(styles.button, className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn(styles.text, className)} {...props} />
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(styles.control, className)}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(styles.control, styles.textarea, className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  type InputGroupAddonAlign,
  type InputGroupButtonSize,
}
