import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
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
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * A Dialog on desktop. Switch the viewport to a phone (toolbar) and
 * reopen: the same form comes up as a bottom sheet.
 */
export const Playground: Story = { render: () => <RecordPayment /> }
