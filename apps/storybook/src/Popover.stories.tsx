import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@newnewstyle/ui"

type Args = {
  side: "top" | "bottom" | "left" | "right"
  align: "start" | "center" | "end"
}

const meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  args: { side: "bottom", align: "center" },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
      description: "ด้านที่กล่องเปิดออกจากปุ่ม",
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end"],
      description: "แนวการจัดตำแหน่งเทียบกับปุ่ม",
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
export const Playground: Story = {}
