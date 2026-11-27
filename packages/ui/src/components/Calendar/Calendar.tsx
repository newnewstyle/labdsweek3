"use client"

import * as React from "react"
import { cn } from "cn"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
import { th } from "react-day-picker/locale"

import { Button } from "../Button"

import styles from "./Calendar.module.css"

type CalendarProps = React.ComponentProps<typeof DayPicker>

// Thai month names and Buddhist-era years (พ.ศ.), as th-TH Intl prints them.
const thaiMonthYear = new Intl.DateTimeFormat("th-TH", {
  month: "long",
  year: "numeric",
})
const thaiMonthShort = new Intl.DateTimeFormat("th-TH", { month: "short" })
const thaiYear = new Intl.DateTimeFormat("th-TH", { year: "numeric" })

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale = th,
  formatters,
  components,
  ...props
}: CalendarProps) {
  const d = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.calendar, className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatCaption: (date) => thaiMonthYear.format(date),
        formatMonthDropdown: (date) => thaiMonthShort.format(date),
        formatYearDropdown: (date) => thaiYear.format(date),
        ...formatters,
      }}
      classNames={{
        root: cn(styles.root, d.root),
        months: cn(styles.months, d.months),
        month: cn(styles.month, d.month),
        nav: cn(styles.nav, d.nav),
        button_previous: cn(styles.navButton, d.button_previous),
        button_next: cn(styles.navButton, d.button_next),
        month_caption: cn(styles.caption, d.month_caption),
        dropdowns: cn(styles.dropdowns, d.dropdowns),
        dropdown_root: cn(styles.dropdownRoot, d.dropdown_root),
        dropdown: cn(styles.dropdown, d.dropdown),
        caption_label: cn(
          styles.captionLabel,
          captionLayout !== "label" && styles.captionDropdown,
          d.caption_label
        ),
        month_grid: cn(styles.grid, d.month_grid),
        weekdays: cn(styles.weekdays, d.weekdays),
        weekday: cn(styles.weekday, d.weekday),
        week: cn(styles.week, d.week),
        week_number_header: cn(styles.weekNumberHeader, d.week_number_header),
        week_number: cn(styles.weekNumber, d.week_number),
        day: cn(
          styles.day,
          props.showWeekNumber ? styles.dayWithWeekNumber : styles.dayPlain,
          d.day
        ),
        range_start: cn(styles.rangeStart, d.range_start),
        range_middle: cn(styles.rangeMiddle, d.range_middle),
        range_end: cn(styles.rangeEnd, d.range_end),
        today: cn(styles.today, d.today),
        outside: cn(styles.outside, d.outside),
        disabled: cn(styles.disabled, d.disabled),
        hidden: cn(styles.hidden, d.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={className}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          const Icon =
            orientation === "left"
              ? ChevronLeftIcon
              : orientation === "right"
                ? ChevronRightIcon
                : ChevronDownIcon
          return <Icon className={cn(styles.chevron, className)} {...props} />
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className={styles.weekNumberCell}>{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const d = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(styles.dayButton, d.day, className)}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, type CalendarProps }
