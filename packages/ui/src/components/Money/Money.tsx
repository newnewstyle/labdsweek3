import * as React from "react"
import { cn } from "cn"

import styles from "./Money.module.css"

type MoneyDisplay = "symbol" | "word" | "none"

const formatters = new Map<string, Intl.NumberFormat>()

/** Cached th-TH number formatter: whole baht, up to 2 satang digits. */
function numberFormat(fractionDigits?: number) {
  const key = String(fractionDigits)
  let format = formatters.get(key)
  if (!format) {
    format = new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: fractionDigits ?? 0,
      maximumFractionDigits: fractionDigits ?? 2,
    })
    formatters.set(key, format)
  }
  return format
}

/**
 * Formats an amount of baht the same way everywhere:
 * `formatMoney(8500)` → "฿8,500", with `display: "word"` → "8,500 บาท".
 */
function formatMoney(
  value: number,
  {
    display = "symbol",
    fractionDigits,
  }: { display?: MoneyDisplay; fractionDigits?: number } = {}
) {
  const number = numberFormat(fractionDigits).format(Math.abs(value))
  const sign = value < 0 ? "−" : ""
  if (display === "word") return `${sign}${number} บาท`
  if (display === "none") return `${sign}${number}`
  return `${sign}฿${number}`
}

type MoneyProps = Omit<React.ComponentProps<"span">, "children"> & {
  /** Amount in baht. Negative shows a minus sign. */
  value: number
  /** "฿8,500" (default), "8,500 บาท", or the number alone. */
  display?: MoneyDisplay
  /** Fixed satang digits; default shows 0–2 as needed. */
  fractionDigits?: number
}

/** An amount of money in baht, with aligned digits. */
function Money({
  value,
  display = "symbol",
  fractionDigits,
  className,
  ...props
}: MoneyProps) {
  return (
    <span
      data-slot="money"
      data-negative={value < 0 || undefined}
      className={cn(styles.money, className)}
      {...props}
    >
      {formatMoney(value, { display, fractionDigits })}
    </span>
  )
}

export { formatMoney, Money, type MoneyDisplay, type MoneyProps }
