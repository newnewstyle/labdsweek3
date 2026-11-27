import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import { Progress, ProgressLabel, ProgressValue } from "@newnewstyle/ui"

type Args = { value: number }

const meta = {
  title: "Components/Progress",
  tags: ["autodocs"],
  args: { value: 82 },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "เปอร์เซ็นต์ 0–100 (ส่งเป็น `aria-valuenow`)",
    },
  },
  render: ({ value }) => (
    <Progress value={value} className="max-w-sm">
      <ProgressLabel>จ่ายตรงเวลา</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Label and percentage on one row, the bar below. */
export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", {
      name: "จ่ายตรงเวลา",
    })
    await expect(bar).toHaveAttribute("aria-valuenow", String(args.value))
  },
}

/** The ends of the range. */
export const Bounds: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      {[0, 50, 100].map((value) => (
        <Progress key={value} value={value}>
          <ProgressLabel>{`${value}%`}</ProgressLabel>
          <ProgressValue />
        </Progress>
      ))}
    </div>
  ),
}

/** Several tenants' on-time rate, one bar each. */
export const List: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      {[
        ["สมชาย ใจกว้าง", 100],
        ["สมหญิง รักบ้าน", 92],
        ["วีระ ทองดี", 58],
      ].map(([name, value]) => (
        <Progress key={name} value={Number(value)}>
          <ProgressLabel>{name}</ProgressLabel>
          <ProgressValue />
        </Progress>
      ))}
    </div>
  ),
}

/** No label: give the bar an aria-label. */
export const BarOnly: Story = {
  render: () => (
    <Progress value={45} aria-label="อัปโหลดรูป" className="max-w-sm" />
  ),
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("progressbar", { name: "อัปโหลดรูป" })
    ).toHaveAttribute("aria-valuenow", "45")
  },
}
