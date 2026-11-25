import * as React from "react"
import { cn } from "cn"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { Button, type ButtonSize } from "../Button"

import styles from "./Pagination.module.css"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="แบ่งหน้า"
      data-slot="pagination"
      className={cn(styles.pagination, className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  size?: ButtonSize
} & React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={className}
      nativeButton={false}
      // Button.spec: a Button rendered as a link announces itself as a link
      role="link"
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text = "ก่อนหน้า",
  ...props
}: PaginationLinkProps & { text?: string }) {
  return (
    <PaginationLink
      aria-label="ไปหน้าก่อนหน้า"
      size="default"
      className={cn(styles.previous, className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className={styles.label}>{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "ถัดไป",
  ...props
}: PaginationLinkProps & { text?: string }) {
  return (
    <PaginationLink
      aria-label="ไปหน้าถัดไป"
      size="default"
      className={cn(styles.next, className)}
      {...props}
    >
      <span className={styles.label}>{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(styles.ellipsis, className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">หน้าอื่นๆ</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationLinkProps,
}
