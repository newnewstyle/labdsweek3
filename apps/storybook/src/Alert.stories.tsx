import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleAlertIcon, InfoIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  type AlertVariant,
  Button,
} from "@scope/ui"

type Args = { variant: AlertVariant }

const meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  args: { variant: "default" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "destructive"],
      description: "ปกติ หรือแดงสำหรับเรื่องที่ต้องรีบจัดการ",
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

export const Playground: Story = {}

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
}

export const TitleOnly: Story = {
  render: () => (
    <Alert className="max-w-md">
      <InfoIcon aria-hidden />
      <AlertTitle>บันทึกข้อมูลอัตโนมัติทุก 30 วินาที</AlertTitle>
    </Alert>
  ),
}
