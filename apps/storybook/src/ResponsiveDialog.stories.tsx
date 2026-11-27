import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
  toast,
} from "@newnewstyle/ui"

function RecordPayment() {
  const [open, setOpen] = React.useState(false)
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      disablePointerDismissal
    >
      <ResponsiveDialogTrigger render={<Button variant="outline" />}>
        บันทึกการชำระ
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>บันทึกการชำระ</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            บ้านเลขที่ 12/3 · สมชาย ใจกว้าง
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="pay-amount">จำนวนเงิน (บาท)</FieldLabel>
            <Input id="pay-amount" inputMode="numeric" defaultValue="8500" />
          </Field>
        </FieldGroup>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose render={<Button variant="outline" />}>
            ยกเลิก
          </ResponsiveDialogClose>
          <Button
            onClick={() => {
              setOpen(false)
              toast.success("บันทึกการชำระแล้ว")
            }}
          >
            บันทึก
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}

const meta = {
  title: "Components/ResponsiveDialog",
  // Example wrapper as the meta component (it takes no args).
  component: RecordPayment,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A `Dialog` at 768px and wider, a bottom-sheet `Drawer` below. Same parts and props as Dialog (`open`, `onOpenChange`, `disablePointerDismissal`…).",
      },
    },
  },
} satisfies Meta<typeof RecordPayment>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A Dialog on desktop. Switch the viewport to a phone (toolbar) and
 * reopen: the same form comes up as a bottom sheet.
 */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "บันทึกการชำระ",
    })
    await userEvent.click(trigger)
    const dialog = await within(document.body).findByRole("dialog")
    // 768px and wider: the Dialog; a narrower canvas gets the Drawer (bottom sheet).
    const wide = window.matchMedia("(min-width: 768px)").matches
    await expect(dialog.getAttribute("data-slot")).toMatch(
      wide ? /^dialog-content$/ : /^drawer-/
    )
    await expect(
      within(dialog).getByLabelText("จำนวนเงิน (บาท)")
    ).toHaveValue("8500")
    await userEvent.click(within(dialog).getByRole("button", { name: "บันทึก" }))
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "false")
    )
  },
}
