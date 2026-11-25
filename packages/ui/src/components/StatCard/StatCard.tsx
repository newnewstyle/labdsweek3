import * as React from "react"
import { cn } from "cn"

import { Card } from "../Card"

import styles from "./StatCard.module.css"

type StatCardProps = Omit<React.ComponentProps<typeof Card>, "children"> & {
  /** What is counted, e.g. "ค้างชำระรวม". */
  label: React.ReactNode
  /** The number, usually a <Money> or a formatted count. */
  value: React.ReactNode
  /** Context under the number, e.g. "3 ราย · เพิ่มขึ้น 1 จากเดือนก่อน". */
  description?: React.ReactNode
  /** Small icon beside the label (decorative). */
  icon?: React.ReactNode
}

/** One KPI: a label, a large number, and a line of context. */
function StatCard({
  label,
  value,
  description,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card
      data-slot="stat-card"
      size="sm"
      className={cn(styles.card, className)}
      {...props}
    >
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon ? (
          <span className={styles.icon} aria-hidden>
            {icon}
          </span>
        ) : null}
      </div>
      <div className={styles.value}>{value}</div>
      {description ? (
        <div className={styles.description}>{description}</div>
      ) : null}
    </Card>
  )
}

export { StatCard, type StatCardProps }
