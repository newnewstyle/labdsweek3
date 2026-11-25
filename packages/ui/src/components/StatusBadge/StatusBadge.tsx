import * as React from "react"
import {
  CalendarClockIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  ClockIcon,
  HourglassIcon,
  SirenIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Badge,
  type BadgeProps,
  type BadgeVariant,
} from "../Badge"

/** Every status the app shows, grouped by what it describes. */
type StatusKey =
  // house
  | "vacant"
  | "occupied"
  // lease
  | "lease-ending"
  // rent payment
  | "paid"
  | "due-soon"
  | "overdue"
  // maintenance request
  | "repair-pending"
  | "repair-in-progress"
  | "repair-done"
  // maintenance urgency: a second badge beside the step, urgent jobs only
  | "repair-urgent"

type StatusDefinition = {
  label: string
  variant: BadgeVariant
  icon: LucideIcon
}

/**
 * Single source for status → Badge level, icon and Thai label. Levels
 * follow Badge.spec: success = done, outline = info, warning = watch,
 * destructive = act now.
 */
const STATUS: Record<StatusKey, StatusDefinition> = {
  vacant: { label: "ว่าง", variant: "outline", icon: CircleDashedIcon },
  occupied: { label: "มีผู้เช่า", variant: "success", icon: CircleCheckIcon },
  "lease-ending": {
    label: "สัญญาใกล้หมด",
    variant: "warning",
    icon: CalendarClockIcon,
  },
  paid: { label: "ชำระแล้ว", variant: "success", icon: CircleCheckIcon },
  "due-soon": { label: "ใกล้ครบกำหนด", variant: "warning", icon: ClockIcon },
  overdue: { label: "ค้างชำระ", variant: "destructive", icon: CircleAlertIcon },
  "repair-pending": {
    label: "รอซ่อม",
    variant: "warning",
    icon: HourglassIcon,
  },
  "repair-in-progress": {
    label: "กำลังซ่อม",
    variant: "outline",
    icon: WrenchIcon,
  },
  "repair-done": {
    label: "ซ่อมเสร็จ",
    variant: "success",
    icon: CircleCheckIcon,
  },
  "repair-urgent": {
    label: "ด่วน",
    variant: "destructive",
    icon: SirenIcon,
  },
}

type StatusBadgeProps = Omit<BadgeProps, "variant" | "children"> & {
  status: StatusKey
  /** Replaces the default Thai label, e.g. "ค้างชำระ 12 วัน". */
  label?: React.ReactNode
}

/** A Badge with the colour, icon and label fixed by the status. */
function StatusBadge({ status, label, ...props }: StatusBadgeProps) {
  const { variant, icon: Icon, label: defaultLabel } = STATUS[status]
  return (
    <Badge data-status={status} variant={variant} {...props}>
      <Icon data-icon="inline-start" aria-hidden />
      {label ?? defaultLabel}
    </Badge>
  )
}

export {
  STATUS,
  StatusBadge,
  type StatusBadgeProps,
  type StatusDefinition,
  type StatusKey,
}
