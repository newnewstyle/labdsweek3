import type { Meta, StoryObj } from "@storybook/react-vite"
import { CircleCheckIcon } from "lucide-react"
import { expect, within } from "storybook/test"

import {
  Badge,
  Button,
  Card,
  CardAction,
  type CardSize,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@newnewstyle/ui"

const sizes = ["default", "sm"] as const satisfies readonly CardSize[]

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: { size: "default" },
  argTypes: {
    size: {
      control: "inline-radio",
      options: sizes,
      description: "ระยะภายในและขนาดหัวข้อ `sm` เล็กลง Rendered as `data-size`.",
      table: { defaultValue: { summary: "default" } },
    },
    className: { control: "text" },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByText("บ้านเลขที่ 12/3").closest('[data-slot="card"]')
    await expect(card).toHaveAttribute("data-size", "default")
    await expect(
      canvas.getByRole("button", { name: "บันทึกการชำระ" })
    ).toBeInTheDocument()
  },
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

/** Both sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <Card key={size} size={size}>
          <CardHeader>
            <CardTitle>size {size}</CardTitle>
            <CardDescription>ซอยทุ่งทอง 1</CardDescription>
          </CardHeader>
          <CardContent>ค่าเช่า 6,500 บาท / เดือน</CardContent>
        </Card>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('[data-slot="card"]')
    await expect([...cards].map((c) => c.getAttribute("data-size"))).toEqual([
      "default",
      "sm",
    ])
  },
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
