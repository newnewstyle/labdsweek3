"use client"

import * as React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer"
import { useIsMobile } from "../../hooks/use-mobile"

import styles from "./ResponsiveDialog.module.css"

/*
 * A Dialog on tablets and desktops, a bottom-sheet Drawer on phones
 * (< 768px). Same parts, same props as Dialog; each part renders the
 * matching Dialog or Drawer part.
 */

const MobileContext = React.createContext(false)

type ResponsiveDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Forms: clicking the backdrop does not close (Dialog.spec). */
  disablePointerDismissal?: boolean
  children?: React.ReactNode
}

function ResponsiveDialog({ onOpenChange, ...props }: ResponsiveDialogProps) {
  const isMobile = useIsMobile()
  const handleOpenChange = onOpenChange
    ? (open: boolean) => onOpenChange(open)
    : undefined
  return (
    <MobileContext.Provider value={isMobile}>
      {isMobile ? (
        <Drawer showSwipeHandle onOpenChange={handleOpenChange} {...props} />
      ) : (
        <Dialog onOpenChange={handleOpenChange} {...props} />
      )}
    </MobileContext.Provider>
  )
}

/** Picks the Drawer part on phones and the Dialog part otherwise. */
function part<D extends React.ElementType, M extends React.ElementType>(
  DialogPart: D,
  DrawerPart: M,
  name: string
) {
  function Part(props: React.ComponentProps<D> & React.ComponentProps<M>) {
    const isMobile = React.useContext(MobileContext)
    const Component = (isMobile ? DrawerPart : DialogPart) as React.ElementType
    return <Component {...props} />
  }
  Part.displayName = name
  return Part
}

const ResponsiveDialogTrigger = part(
  DialogTrigger,
  DrawerTrigger,
  "ResponsiveDialogTrigger"
)
const ResponsiveDialogClose = part(
  DialogClose,
  DrawerClose,
  "ResponsiveDialogClose"
)
const ResponsiveDialogHeader = part(
  DialogHeader,
  DrawerHeader,
  "ResponsiveDialogHeader"
)
const ResponsiveDialogFooter = part(
  DialogFooter,
  DrawerFooter,
  "ResponsiveDialogFooter"
)
const ResponsiveDialogTitle = part(
  DialogTitle,
  DrawerTitle,
  "ResponsiveDialogTitle"
)
const ResponsiveDialogDescription = part(
  DialogDescription,
  DrawerDescription,
  "ResponsiveDialogDescription"
)

/** On phones the body scrolls inside the sheet; padding matches its header. */
function ResponsiveDialogContent({
  children,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  const isMobile = React.useContext(MobileContext)
  if (isMobile) {
    return (
      <DrawerContent>
        <div data-slot="responsive-dialog-body" className={styles.body}>
          {children}
        </div>
      </DrawerContent>
    )
  }
  return <DialogContent {...props}>{children}</DialogContent>
}

export {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
  type ResponsiveDialogProps,
}
