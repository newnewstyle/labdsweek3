import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress, ProgressLabel, ProgressValue } from "@newnewstyle/ui"

type Args = { value: number }

const meta = {
  title: "Components/Progress",
  tags: ["autodocs"],
  args: { value: 82 },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "เปอร์เซ็นต์ 0–100",
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
export const Playground: Story = {}

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
}
