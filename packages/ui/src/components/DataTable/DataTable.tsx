"use client"

import * as React from "react"
import { cn } from "cn"
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../Pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table"
import { ToggleGroup, ToggleGroupItem } from "../ToggleGroup"

import styles from "./DataTable.module.css"

type DataTableColumn<T> = {
  /** Unique key; also the sort key. */
  key: string
  /** Column heading (Thai). */
  header: string
  /** What the cell shows. */
  cell: (row: T) => React.ReactNode
  /** Value to sort by; omit to make the column unsortable. */
  sortValue?: (row: T) => string | number
  /** "end" right-aligns numbers and money. */
  align?: "start" | "end"
  /** On phones, rows become cards; true leaves this column out of them. */
  hideOnMobile?: boolean
}

type DataTableFilter<T> = {
  value: string
  label: string
  /** Rows that pass; omit for "all". */
  predicate?: (row: T) => boolean
}

type DataTableProps<T> = {
  data: T[]
  columns: DataTableColumn<T>[]
  getRowId: (row: T) => string
  /** Describes the table for screen readers, e.g. "รายการผู้เช่า". */
  label: string
  /** Quick filters shown as a segmented bar above the table. */
  filters?: DataTableFilter<T>[]
  /** Rows per page. Default 10. */
  pageSize?: number
  /** Shown when no row passes the filter. */
  empty?: React.ReactNode
  className?: string
}

type Sort = { key: string; direction: "asc" | "desc" } | null

const collator = new Intl.Collator("th-TH", { numeric: true })

/**
 * A list table with quick filters, sortable columns and pages. On phones
 * each row becomes a card of label / value pairs.
 */
function DataTable<T>({
  data,
  columns,
  getRowId,
  label,
  filters,
  pageSize = 10,
  empty,
  className,
}: DataTableProps<T>) {
  const [filter, setFilter] = React.useState(filters?.[0]?.value)
  const [sort, setSort] = React.useState<Sort>(null)
  const [page, setPage] = React.useState(1)

  const rows = React.useMemo(() => {
    const predicate = filters?.find((f) => f.value === filter)?.predicate
    const filtered = predicate ? data.filter(predicate) : data
    const column = sort && columns.find((c) => c.key === sort.key)
    if (!sort || !column?.sortValue) return filtered
    const value = column.sortValue
    const factor = sort.direction === "asc" ? 1 : -1
    return [...filtered].sort((a, b) => {
      const x = value(a)
      const y = value(b)
      const order =
        typeof x === "number" && typeof y === "number"
          ? x - y
          : collator.compare(String(x), String(y))
      return order * factor
    })
  }, [data, columns, filters, filter, sort])

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))
  const current = Math.min(page, pageCount)
  const visible = rows.slice((current - 1) * pageSize, current * pageSize)

  function toggleSort(key: string) {
    setSort((s) =>
      s?.key !== key
        ? { key, direction: "asc" }
        : s.direction === "asc"
          ? { key, direction: "desc" }
          : null
    )
    setPage(1)
  }

  function goTo(event: React.MouseEvent, next: number) {
    event.preventDefault()
    if (next >= 1 && next <= pageCount) setPage(next)
  }

  return (
    <div data-slot="data-table" className={cn(styles.root, className)}>
      {filters?.length ? (
        <ToggleGroup
          aria-label={`กรอง${label}`}
          variant="outline"
          size="sm"
          spacing={0}
          value={filter ? [filter] : []}
          onValueChange={(value: string[]) => {
            if (value[0]) {
              setFilter(value[0])
              setPage(1)
            }
          }}
          className={styles.filters}
        >
          {filters.map((f) => (
            <ToggleGroupItem key={f.value} value={f.value}>
              {f.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : null}

      {visible.length === 0 ? (
        <div className={styles.empty}>{empty ?? "ไม่มีรายการ"}</div>
      ) : (
        <>
          {/* desktop: table */}
          <div className={styles.desktop}>
            <Table aria-label={label}>
              <TableHeader>
                <TableRow>
                  {columns.map((c) => {
                    const active = sort?.key === c.key ? sort.direction : null
                    return (
                      <TableHead
                        key={c.key}
                        data-align={c.align}
                        className={styles.head}
                        aria-sort={
                          active === "asc"
                            ? "ascending"
                            : active === "desc"
                              ? "descending"
                              : c.sortValue
                                ? "none"
                                : undefined
                        }
                      >
                        {c.sortValue ? (
                          <button
                            type="button"
                            className={styles.sortButton}
                            onClick={() => toggleSort(c.key)}
                          >
                            {c.header}
                            {active === "asc" ? (
                              <ArrowUpIcon aria-hidden />
                            ) : active === "desc" ? (
                              <ArrowDownIcon aria-hidden />
                            ) : (
                              <ArrowUpDownIcon
                                aria-hidden
                                className={styles.sortIdle}
                              />
                            )}
                          </button>
                        ) : (
                          c.header
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((row) => (
                  <TableRow key={getRowId(row)}>
                    {columns.map((c) => (
                      <TableCell
                        key={c.key}
                        data-align={c.align}
                        className={styles.cell}
                      >
                        {c.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* phones: one card per row */}
          <ul className={styles.mobile} aria-label={label}>
            {visible.map((row) => (
              <li key={getRowId(row)} className={styles.mobileRow}>
                <dl className={styles.mobileList}>
                  {columns
                    .filter((c) => !c.hideOnMobile)
                    .map((c) => (
                      <div key={c.key} className={styles.mobileField}>
                        <dt>{c.header}</dt>
                        <dd>{c.cell(row)}</dd>
                      </div>
                    ))}
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}

      {pageCount > 1 ? (
        <div className={styles.footer}>
          <span className={styles.count}>
            {rows.length} รายการ · หน้า {current} จาก {pageCount}
          </span>
          <Pagination className={styles.pagination}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={current === 1 || undefined}
                  onClick={(e) => goTo(e, current - 1)}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink
                    href="#"
                    isActive={n === current}
                    onClick={(e) => goTo(e, n)}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={current === pageCount || undefined}
                  onClick={(e) => goTo(e, current + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
    </div>
  )
}

export {
  DataTable,
  type DataTableColumn,
  type DataTableFilter,
  type DataTableProps,
}
