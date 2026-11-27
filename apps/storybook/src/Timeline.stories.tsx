import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BellIcon,
  CircleCheckIcon,
  HourglassIcon,
  MessageSquareIcon,
  WrenchIcon,
} from "lucide-react"

import { Timeline, TimelineItem, type TimelineTone } from "@newnewstyle/ui"
import { expect, within } from "storybook/test"

const tones = [
  "default",
  "success",
  "warning",
  "destructive",
] as const satisfies readonly TimelineTone[]

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    children: {
      control: false,
      description:
        "`TimelineItem`s, newest first. Each takes `title`, `time` (Date shown in Thai, or text), optional `icon`, `tone` and details as children.",
    },
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

/** Reminder history for one tenant, newest first. */
export const ReminderHistory: Story = {
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("list")
    await expect(list).toHaveAttribute("data-slot", "timeline")
    await expect(within(list).getAllByRole("listitem")).toHaveLength(3)
    // Date times render as <time> in Thai with a machine-readable dateTime.
    await expect(list.querySelector("time")).toHaveAttribute("datetime")
  },
  render: () => (
    <Timeline className="max-w-md">
      <TimelineItem
        title="ชำระแล้ว 8,500 บาท"
        time={new Date(2026, 10, 7, 14, 20)}
        icon={<CircleCheckIcon />}
        tone="success"
      />
      <TimelineItem
        title="ส่งเตือนค้างชำระทาง LINE"
        time={new Date(2026, 10, 6, 9, 0)}
        icon={<BellIcon />}
        tone="destructive"
      >
        แม่แบบ: เลยกำหนด · ผู้เช่าอ่านแล้ว
      </TimelineItem>
      <TimelineItem
        title="ส่งเตือนครบกำหนดทาง SMS"
        time={new Date(2026, 10, 1, 9, 0)}
        icon={<MessageSquareIcon />}
        tone="warning"
      >
        แม่แบบ: ครบกำหนดวันนี้
      </TimelineItem>
    </Timeline>
  ),
}

/** Every `tone`: the dot colour. */
export const Tones: Story = {
  render: () => (
    <Timeline className="max-w-md">
      {tones.map((tone) => (
        <TimelineItem key={tone} title={`tone ${tone}`} time="27 พ.ย. 2569" tone={tone} />
      ))}
    </Timeline>
  ),
  play: async ({ canvasElement }) => {
    const items = within(canvasElement).getAllByRole("listitem")
    await expect(items.map((i) => i.getAttribute("data-tone"))).toEqual([...tones])
  },
}

/** Maintenance status flow: pending → in progress → done. */
export const RepairFlow: Story = {
  render: () => (
    <Timeline className="max-w-md">
      <TimelineItem
        title="ซ่อมเสร็จ"
        time="27 พ.ย. 2569"
        icon={<CircleCheckIcon />}
        tone="success"
      >
        ค่าซ่อม 450 บาท
      </TimelineItem>
      <TimelineItem
        title="ช่างเข้าซ่อม"
        time="25 พ.ย. 2569"
        icon={<WrenchIcon />}
      >
        เปลี่ยนเทปพันเกลียวก๊อกน้ำ
      </TimelineItem>
      <TimelineItem
        title="แจ้งซ่อม: ก๊อกน้ำห้องครัวรั่ว"
        time="20 พ.ย. 2569"
        icon={<HourglassIcon />}
        tone="warning"
      />
    </Timeline>
  ),
}
