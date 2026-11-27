import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Button, Spinner } from "@newnewstyle/ui"

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: { "aria-label": "กำลังโหลด" },
  argTypes: {
    "aria-label": {
      control: "text",
      description:
        "ชื่อที่ screen reader อ่าน (มีค่าเริ่มต้นอยู่แล้ว) Spinner มี `role=\"status\"`",
    },
    className: {
      control: "text",
      description: "ปรับขนาดด้วย `size-*` เช่น `size-6`",
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const spinner = within(canvasElement).getByRole("status")
    await expect(spinner).toHaveAttribute("data-slot", "spinner")
    await expect(spinner).toHaveAccessibleName("กำลังโหลด")
  },
}

/** Size with a size-* class. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

/** Inline with text while a section loads. */
export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      กำลังโหลดรายการผู้เช่า…
    </div>
  ),
}

/** Buttons have their own `loading` prop; use that instead of a Spinner. */
export const InButton: Story = {
  render: () => <Button loading>กำลังบันทึก</Button>,
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", {
      name: "กำลังบันทึก",
    })
    await expect(button).toHaveAttribute("aria-busy", "true")
  },
}
