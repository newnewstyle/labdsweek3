"use client"

import * as React from "react"
import { cn } from "cn"

import { Label } from "../Label"
import { Separator } from "../Separator"
import {
  FieldContext,
  useFieldContext,
  useFieldMessage,
  useFieldState,
} from "./field-context"

import styles from "./Field.module.css"

type FieldOrientation = "vertical" | "horizontal" | "responsive"

type FieldProps = React.ComponentProps<"div"> & {
  orientation?: FieldOrientation
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(styles.set, className)}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(styles.legend, className)}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

/**
 * One form field. Links its FieldLabel, FieldDescription and FieldError to the package control
 * inside it (Input, Textarea, Checkbox, Switch, SelectTrigger, InputGroup/Combobox inputs):
 * the control gets an id, aria-describedby and, with `data-invalid`, aria-invalid.
 * One control per Field; props passed explicitly always win.
 */
function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  const dataInvalid = (props as Record<string, unknown>)["data-invalid"]
  const field = useFieldState(dataInvalid === true || dataInvalid === "true" || dataInvalid === "")
  return (
    <FieldContext.Provider value={field}>
      <div
        role="group"
        data-slot="field"
        data-orientation={orientation}
        className={cn(styles.field, className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  htmlFor,
  id,
  ...props
}: React.ComponentProps<typeof Label>) {
  const field = useFieldContext()
  // registered so a group control (RadioGroup) can point aria-labelledby at it
  const labelId = useFieldMessage("label", id)
  return (
    <Label
      data-slot="field-label"
      className={cn(styles.label, className)}
      htmlFor={htmlFor ?? field?.controlId}
      id={labelId}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  id,
  ...props
}: React.ComponentProps<"p">) {
  const messageId = useFieldMessage("description", id)
  return (
    <p
      data-slot="field-description"
      id={messageId}
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(styles.separator, className)}
      {...props}
    >
      <Separator className={styles.separatorLine} />
      {children && (
        <span
          className={styles.separatorContent}
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  id,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = React.useMemo(() => {
    if (children) return children
    if (!errors?.length) return null

    const unique = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]
    if (unique.length === 1) return unique[0]?.message

    return (
      <ul className={styles.errorList}>
        {unique.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  const messageId = useFieldMessage("error", id, !!content)

  if (!content) return null

  return (
    <div
      role="alert"
      data-slot="field-error"
      id={messageId}
      className={cn(styles.error, className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  type FieldOrientation,
  type FieldProps,
}
