import type { Meta, StoryObj } from "@storybook/react-vite"
import { BellIcon, CircleAlertIcon, TimerIcon } from "lucide-react"

import { Money, StatCard } from "@newnewstyle/ui"

const meta = {
  title: "Components/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    label: "ค้างชำระรวม",
    value: <Money value={24500} />,
    description: "3 ราย · เพิ่มขึ้น 1 รายจากเดือนก่อน",
    icon: <CircleAlertIcon />,
  },
  argTypes: {
    label: { control: "text", description: "สิ่งที่นับ" },
    description: { control: "text", description: "บริบทใต้ตัวเลข" },
    value: { control: false, description: "ตัวเลข (มักเป็น <Money>)" },
    icon: { control: false, description: "ไอคอนข้างชื่อ (ตกแต่ง)" },
  },
  render: (args) => <StatCard {...args} className="max-w-xs" />,
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** The collection-stats KPI row. */
export const KpiRow: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
      <StatCard
        label="ค้างชำระรวม"
        value={<Money value={24500} />}
        description="3 ราย"
        icon={<CircleAlertIcon />}
      />
      <StatCard
        label="ส่งเตือนเดือนนี้"
        value="18 ครั้ง"
        description="LINE 12 · SMS 6"
        icon={<BellIcon />}
      />
      <StatCard
        label="จ่ายหลังเตือนเฉลี่ย"
        value="2.4 วัน"
        description="เร็วขึ้น 0.6 วัน"
        icon={<TimerIcon />}
      />
    </div>
  ),
}
