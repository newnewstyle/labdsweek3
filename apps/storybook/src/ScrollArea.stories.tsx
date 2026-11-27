import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"

import { ScrollArea, Separator } from "@newnewstyle/ui"

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  argTypes: {
    scrollbars: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "both"],
      description: "แถบเลื่อนที่แสดง",
      table: { defaultValue: { summary: "vertical" } },
    },
    className: {
      control: "text",
      description: "กำหนดความสูง/กว้างของกรอบ เช่น `h-64`",
    },
    children: { control: false },
  },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

/** A fixed-height list that scrolls inside the page. */
export const Vertical: Story = {
  play: async ({ canvasElement }) => {
    const viewport = canvasElement.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    )!
    await expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight)
    viewport.scrollTop = 200
    await waitFor(() => expect(viewport.scrollTop).toBeGreaterThan(0))
  },
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-lg border">
      <div className="p-3">
        <h4 className="mb-3 text-sm font-semibold">ประวัติการเตือน</h4>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i}>
            <div className="text-sm">ส่งเตือนครั้งที่ {20 - i}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

/** A wide table on a phone: scroll sideways inside the frame. */
export const Horizontal: Story = {
  render: () => (
    <ScrollArea scrollbars="horizontal" className="w-72 rounded-lg border">
      <div className="flex w-max gap-3 p-3">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-32 items-center justify-center rounded-md bg-muted text-sm"
          >
            บ้านหลังที่ {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
