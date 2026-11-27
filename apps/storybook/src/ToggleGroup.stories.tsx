import type { Meta, StoryObj } from "@storybook/react-vite"
import { LayoutGridIcon, ListIcon } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleSize,
  type ToggleVariant,
} from "@newnewstyle/ui"

type Args = {
  variant: ToggleVariant
  size: ToggleSize
  spacing: number
  orientation: "horizontal" | "vertical"
}

const meta = {
  title: "Components/ToggleGroup",
  tags: ["autodocs"],
  args: {
    variant: "outline",
    size: "sm",
    spacing: 0,
    orientation: "horizontal",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
      description: "ไม่มีขอบ หรือมีขอบ",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "default", "lg"],
      description: "ขนาดของทุกปุ่มในกลุ่ม",
    },
    spacing: {
      control: { type: "range", min: 0, max: 4, step: 1 },
      description: "ระยะห่าง (0 = ต่อกันเป็นแถบเดียว)",
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "เรียงแนวนอน หรือแนวตั้ง",
    },
  },
  render: (args) => (
    <ToggleGroup aria-label="กรองผู้เช่า" defaultValue={["all"]} {...args}>
      <ToggleGroupItem value="all">ทั้งหมด</ToggleGroupItem>
      <ToggleGroupItem value="overdue">ค้างชำระ</ToggleGroupItem>
      <ToggleGroupItem value="paid">ชำระแล้ว</ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Table filter: pick one. Arrow keys move between options. */
export const Playground: Story = {}

/** Spaced items instead of one joined bar. */
export const Spaced: Story = { args: { spacing: 2, variant: "default" } }

/** Icon-only view switcher; each item has an aria-label. */
export const ViewSwitcher: Story = {
  render: () => (
    <ToggleGroup
      aria-label="มุมมอง"
      variant="outline"
      spacing={0}
      defaultValue={["list"]}
    >
      <ToggleGroupItem value="list" aria-label="แบบรายการ">
        <ListIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="แบบการ์ด">
        <LayoutGridIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
