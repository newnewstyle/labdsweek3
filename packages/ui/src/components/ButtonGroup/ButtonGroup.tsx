import { cn } from "cn"

import { Separator } from "../Separator"

import styles from "./ButtonGroup.module.css"

type ButtonGroupOrientation = "horizontal" | "vertical"

type ButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: ButtonGroupOrientation
}

/** Joins related buttons into one bar: shared borders, outer corners only. */
function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

/** A non-interactive label inside the group, e.g. a unit or a count. */
function ButtonGroupText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group-text"
      className={cn(styles.text, className)}
      {...props}
    />
  )
}

/** A thin line between buttons that have no border of their own. */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(styles.separator, className)}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  type ButtonGroupOrientation,
  type ButtonGroupProps,
}
