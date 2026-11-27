import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@newnewstyle/ui"

const sides = ["top", "bottom", "left", "right"] as const
const aligns = ["start", "center", "end"] as const

type Args = {
  side: (typeof sides)[number]
  align: (typeof aligns)[number]
}

const meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  args: { side: "bottom", align: "center" },
  argTypes: {
    side: {
      control: "inline-radio",
      options: sides,
      description: "ด้านที่กล่องเปิดออกจากปุ่ม (`PopoverContent side`)",
      table: { defaultValue: { summary: "bottom" } },
    },
    align: {
      control: "inline-radio",
      options: aligns,
      description: "แนวการจัดตำแหน่งเทียบกับปุ่ม (`PopoverContent align`)",
      table: { defaultValue: { summary: "center" } },
    },
  },
  render: ({ side, align }) => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        รายละเอียดค่าเช่า
      </PopoverTrigger>
      <PopoverContent side={side} align={align}>
        <PopoverHeader>
          <PopoverTitle>ค่าเช่าเดือนพฤศจิกายน</PopoverTitle>
          <PopoverDescription>บ้านเลขที่ 12/3</PopoverDescription>
        </PopoverHeader>
        <dl className="grid grid-cols-2 gap-1 tabular-nums">
          <dt className="text-muted-foreground">ค่าเช่า</dt>
          <dd className="text-right">8,500 บาท</dd>
          <dt className="text-muted-foreground">ค่าน้ำ</dt>
          <dd className="text-right">320 บาท</dd>
        </dl>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Click the button to open; click outside or press Esc to close. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "รายละเอียดค่าเช่า",
    })
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    const dialog = await within(document.body).findByRole("dialog")
    await expect(dialog).toHaveAccessibleName("ค่าเช่าเดือนพฤศจิกายน")
    await userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "false")
    )
  },
}
