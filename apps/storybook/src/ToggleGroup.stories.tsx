import type { Meta, StoryObj } from "@storybook/react-vite"
import { LayoutGridIcon, ListIcon } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleSize,
  type ToggleVariant,
} from "@newnewstyle/ui"

import { pseudoByAttribute, StateGrid } from "./story-helpers"

const variants = ["default", "outline"] as const satisfies readonly ToggleVariant[]
const sizes = ["sm", "default", "lg"] as const satisfies readonly ToggleSize[]
const orientations = ["horizontal", "vertical"] as const

type Args = {
  variant: ToggleVariant
  size: ToggleSize
  spacing: number
  orientation: (typeof orientations)[number]
  multiple: boolean
}

const meta = {
  title: "Components/ToggleGroup",
  tags: ["autodocs"],
  args: {
    variant: "outline",
    size: "sm",
    spacing: 0,
    orientation: "horizontal",
    multiple: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: variants,
      description: "ไม่มีขอบ หรือมีขอบ (ส่งต่อให้ทุกปุ่มในกลุ่ม)",
    },
    size: {
      control: "inline-radio",
      options: sizes,
      description: "ขนาดของทุกปุ่มในกลุ่ม",
    },
    spacing: {
      control: { type: "range", min: 0, max: 4, step: 1 },
      description: "ระยะห่าง (0 = ต่อกันเป็นแถบเดียว)",
    },
    orientation: {
      control: "inline-radio",
      options: orientations,
      description: "เรียงแนวนอน หรือแนวตั้ง",
    },
    multiple: {
      control: "boolean",
      description: "เลือกได้หลายปุ่ม (ปกติเลือกได้ปุ่มเดียว)",
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
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const all = canvas.getByRole("button", { name: "ทั้งหมด" })
    const overdue = canvas.getByRole("button", { name: "ค้างชำระ" })
    await expect(all).toHaveAttribute("aria-pressed", "true")
    await userEvent.click(overdue)
    // Single selection: picking one releases the other.
    await expect(overdue).toHaveAttribute("aria-pressed", "true")
    await expect(all).toHaveAttribute("aria-pressed", "false")
  },
}

/** `multiple`: several filters can be on at once. */
export const Multiple: Story = {
  args: { multiple: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "ค้างชำระ" }))
    await expect(canvas.getByRole("button", { name: "ทั้งหมด" })).toHaveAttribute(
      "aria-pressed",
      "true"
    )
    await expect(
      canvas.getByRole("button", { name: "ค้างชำระ" })
    ).toHaveAttribute("aria-pressed", "true")
  },
}

/** Spaced items instead of one joined bar. */
export const Spaced: Story = { args: { spacing: 2, variant: "default" } }

export const Vertical: Story = { args: { orientation: "vertical" } }

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

const states = ["rest", "hover", "focus-visible", "pressed", "disabled"] as const

/** Item states per variant (forced hover/focus via the pseudo-states addon). */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={states}
      columns={variants}
      renderCell={(state, variant) => (
        <ToggleGroup
          aria-label={`ตัวอย่าง ${state} ${variant}`}
          variant={variant}
          size="sm"
          defaultValue={state === "pressed" ? ["a"] : []}
        >
          <ToggleGroupItem
            value="a"
            disabled={state === "disabled"}
            data-pseudo={
              state === "hover" || state === "focus-visible" ? state : undefined
            }
          >
            ค้างชำระ
          </ToggleGroupItem>
          <ToggleGroupItem value="b">ชำระแล้ว</ToggleGroupItem>
        </ToggleGroup>
      )}
    />
  ),
}
