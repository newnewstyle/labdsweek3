import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleCheckIcon } from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@scope/ui"

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: { size: "default" },
  argTypes: { size: { control: "inline-radio", options: ["default", "sm"] } },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** All parts: header with action, content and footer. */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader className="border-b">
        <CardTitle>บ้านเลขที่ 12/3</CardTitle>
        <CardDescription>ซอยทุ่งทอง 1</CardDescription>
        <CardAction>
          <Badge variant="success">
            <CircleCheckIcon aria-hidden />
            มีผู้เช่า
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>ค่าเช่า 6,500 บาท / เดือน</CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">
          ดูสัญญา
        </Button>
        <Button size="sm">บันทึกการชำระ</Button>
      </CardFooter>
    </Card>
  ),
}

/** size="sm" shrinks the inner spacing and the title. */
export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>ผู้เช่าใหม่เดือนนี้</CardTitle>
        <CardDescription>2 ราย</CardDescription>
      </CardHeader>
    </Card>
  ),
}
