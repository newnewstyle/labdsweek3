import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleAlertIcon, InfoIcon } from "lucide-react"
import { expect, within } from "storybook/test"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  type AlertVariant,
  Button,
} from "@newnewstyle/ui"

const variants = ["default", "destructive"] as const satisfies readonly AlertVariant[]

type Args = { variant: AlertVariant }

const meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  args: { variant: "default" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: variants,
      description:
        "ปกติ หรือแดงสำหรับเรื่องที่ต้องรีบจัดการ Rendered as `data-variant`.",
      table: { defaultValue: { summary: "default" } },
    },
  },
  render: ({ variant }) => (
    <Alert variant={variant} className="max-w-md">
      <InfoIcon aria-hidden />
      <AlertTitle>สัญญาเช่า 2 ฉบับจะหมดในเดือนนี้</AlertTitle>
      <AlertDescription>
        ติดต่อผู้เช่าเพื่อต่อสัญญาก่อนวันที่ 30
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** `role="alert"`: screen readers announce it as soon as it appears. */
export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const alert = within(canvasElement).getByRole("alert")
    await expect(alert).toHaveAttribute("data-variant", args.variant)
    await expect(alert).toHaveTextContent("สัญญาเช่า 2 ฉบับจะหมดในเดือนนี้")
  },
}

/** Both variants side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      {variants.map((variant) => (
        <Alert key={variant} variant={variant}>
          <InfoIcon aria-hidden />
          <AlertTitle>{variant}</AlertTitle>
          <AlertDescription>ข้อความอธิบายเพิ่มเติม</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <CircleAlertIcon aria-hidden />
      <AlertTitle>ค้างชำระ 3 ราย รวม 24,500 บาท</AlertTitle>
      <AlertDescription>เลยกำหนดชำระมาแล้วมากกว่า 7 วัน</AlertDescription>
    </Alert>
  ),
}

/** AlertAction pins a button to the top-right corner. */
export const WithAction: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <CircleAlertIcon aria-hidden />
      <AlertTitle>ค้างชำระ 3 ราย</AlertTitle>
      <AlertDescription>รวม 24,500 บาท</AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          ส่งเตือน
        </Button>
      </AlertAction>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const alert = within(canvasElement).getByRole("alert")
    await expect(
      within(alert).getByRole("button", { name: "ส่งเตือน" })
    ).toBeInTheDocument()
  },
}

export const TitleOnly: Story = {
  render: () => (
    <Alert className="max-w-md">
      <InfoIcon aria-hidden />
      <AlertTitle>บันทึกข้อมูลอัตโนมัติทุก 30 วินาที</AlertTitle>
    </Alert>
  ),
}
