import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DataTable,
  type DataTableColumn,
  type DataTableFilter,
  Money,
  StatusBadge,
  type StatusKey,
} from "@newnewstyle/ui"

type Tenant = {
  id: string
  name: string
  house: string
  rent: number
  dueDay: number
  status: Extract<StatusKey, "paid" | "due-soon" | "overdue">
}

const names = [
  "สมชาย ใจกว้าง",
  "สมหญิง รักบ้าน",
  "วีระ ทองดี",
  "มาลี ศรีสุข",
  "ประเสริฐ มั่นคง",
  "อรุณี แสงทอง",
  "ธนา พูลผล",
  "กมล ใจดี",
  "สุดา เรืองศรี",
  "ชัยวัฒน์ บุญมา",
  "นภา สายทอง",
  "พิชัย ศรีวงศ์",
]
const statuses: Tenant["status"][] = ["paid", "due-soon", "overdue", "paid"]

const tenants: Tenant[] = names.map((name, i) => ({
  id: `t${i + 1}`,
  name,
  house: `${12 + i}/${(i % 4) + 1}`,
  rent: 6500 + ((i * 1700) % 6000),
  dueDay: ((i * 7) % 28) + 1,
  status: statuses[i % statuses.length]!,
}))

const columns: DataTableColumn<Tenant>[] = [
  {
    key: "name",
    header: "ผู้เช่า",
    cell: (t) => t.name,
    sortValue: (t) => t.name,
  },
  {
    key: "house",
    header: "บ้านเลขที่",
    cell: (t) => t.house,
    sortValue: (t) => t.house,
  },
  {
    key: "rent",
    header: "ค่าเช่า",
    align: "end",
    cell: (t) => <Money value={t.rent} />,
    sortValue: (t) => t.rent,
  },
  {
    key: "due",
    header: "ครบกำหนด",
    cell: (t) => `วันที่ ${t.dueDay}`,
    sortValue: (t) => t.dueDay,
    hideOnMobile: true,
  },
  {
    key: "status",
    header: "สถานะ",
    cell: (t) => <StatusBadge status={t.status} />,
  },
]

const filters: DataTableFilter<Tenant>[] = [
  { value: "all", label: "ทั้งหมด" },
  {
    value: "overdue",
    label: "ค้างชำระ",
    predicate: (t) => t.status === "overdue",
  },
  { value: "paid", label: "ชำระแล้ว", predicate: (t) => t.status === "paid" },
]

type Args = { pageSize: number }

const meta = {
  title: "Components/DataTable",
  tags: ["autodocs"],
  args: { pageSize: 5 },
  argTypes: {
    pageSize: {
      control: { type: "range", min: 3, max: 12, step: 1 },
      description: "จำนวนแถวต่อหน้า",
    },
  },
  render: ({ pageSize }) => (
    <DataTable
      label="รายการผู้เช่า"
      data={tenants}
      columns={columns}
      getRowId={(t) => t.id}
      filters={filters}
      pageSize={pageSize}
      className="max-w-3xl"
    />
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Filter with the bar, sort by clicking a heading (A→Z, Z→A, off), and
 * page through. At phone width rows become cards.
 */
export const Playground: Story = {}

export const Empty: Story = {
  render: () => (
    <DataTable
      label="รายการผู้เช่า"
      data={[] as Tenant[]}
      columns={columns}
      getRowId={(t) => t.id}
      empty="ยังไม่มีผู้เช่า"
      className="max-w-3xl"
    />
  ),
}
