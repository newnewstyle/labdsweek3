import * as React from "react"
import { cn } from "cn"

import styles from "./Timeline.module.css"

type TimelineTone = "default" | "success" | "warning" | "destructive"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn(styles.timeline, className)}
      {...props}
    />
  )
}

type TimelineItemProps = Omit<React.ComponentProps<"li">, "title"> & {
  /** What happened, e.g. "ส่งเตือนทาง LINE". */
  title: React.ReactNode
  /** When it happened. A Date is shown in Thai; a string is shown as is. */
  time: Date | string
  /** Icon in the dot (decorative; the title carries the meaning). */
  icon?: React.ReactNode
  /** Dot colour by status level, same levels as Badge. */
  tone?: TimelineTone
}

const thaiDateTime = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "medium",
  timeStyle: "short",
})

/** One event: a dot (with optional icon), title, time, and details. */
function TimelineItem({
  title,
  time,
  icon,
  tone = "default",
  className,
  children,
  ...props
}: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      data-tone={tone}
      className={cn(styles.item, className)}
      {...props}
    >
      <span className={styles.dot} aria-hidden>
        {icon}
      </span>
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {time instanceof Date ? (
            <time dateTime={time.toISOString()} className={styles.time}>
              {thaiDateTime.format(time)}
            </time>
          ) : (
            <span className={styles.time}>{time}</span>
          )}
        </div>
        {children ? <div className={styles.content}>{children}</div> : null}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem, type TimelineItemProps, type TimelineTone }
