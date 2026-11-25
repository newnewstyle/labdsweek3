import type { Meta, StoryObj } from "@storybook/react-vite"

import { STATUS, StatusBadge, type StatusKey } from "@scope/ui"

const keys = Object.keys(STATUS) as StatusKey[]

type Args = { status: StatusKey }

const meta = {
  title: "Components/StatusBadge",
  tags: ["autodocs"],
  args: { status: "overdue" },
  argTypes: {
    status: {
      control: "select",
      options: keys,
      description: "สถานะ: สี ไอคอน และข้อความมาจากตารางกลาง",
    },
  },
  render: ({ status }) => <StatusBadge status={status} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Every status in the app, grouped by what it describes. */
export const AllStatuses: Story = {
  render: () => (
    <dl className="grid max-w-md grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-sm">
      <dt className="text-muted-foreground">บ้าน</dt>
      <dd className="flex flex-wrap gap-2">
        <StatusBadge status="vacant" />
        <StatusBadge status="occupied" />
      </dd>
      <dt className="text-muted-foreground">สัญญา</dt>
      <dd className="flex flex-wrap gap-2">
        <StatusBadge status="lease-ending" />
      </dd>
      <dt className="text-muted-foreground">ค่าเช่า</dt>
      <dd className="flex flex-wrap gap-2">
        <StatusBadge status="paid" />
        <StatusBadge status="due-soon" />
        <StatusBadge status="overdue" />
      </dd>
      <dt className="text-muted-foreground">แจ้งซ่อม</dt>
      <dd className="flex flex-wrap gap-2">
        <StatusBadge status="repair-pending" />
        <StatusBadge status="repair-in-progress" />
        <StatusBadge status="repair-done" />
      </dd>
      <dt className="text-muted-foreground">ความด่วน</dt>
      <dd className="flex flex-wrap gap-2">
        <StatusBadge status="repair-urgent" />
      </dd>
    </dl>
  ),
}

/**
 * A repair row: the step badge, plus "ด่วน" beside it only for urgent
 * jobs. Colour = step; urgency is its own badge.
 */
export const RepairWithUrgency: Story = {
  render: () => (
    <ul className="flex max-w-md flex-col gap-2 text-sm">
      <li className="flex items-center justify-between gap-3">
        น้ำรั่วจากเพดานห้องน้ำ
        <span className="flex gap-1.5">
          <StatusBadge status="repair-urgent" />
          <StatusBadge status="repair-pending" />
        </span>
      </li>
      <li className="flex items-center justify-between gap-3">
        หลอดไฟหน้าบ้านขาด
        <StatusBadge status="repair-pending" />
      </li>
      <li className="flex items-center justify-between gap-3">
        แอร์ห้องนอนไม่เย็น
        <StatusBadge status="repair-in-progress" />
      </li>
    </ul>
  ),
}

/** `label` adds detail while keeping the status's colour and icon. */
export const CustomLabel: Story = {
  render: () => <StatusBadge status="overdue" label="ค้างชำระ 12 วัน" />,
}
