import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@newnewstyle/ui"

type Args = { multiple: boolean }

const repairs = [
  {
    id: "r1",
    title: "ก๊อกน้ำห้องครัวรั่ว",
    detail: "แจ้งเมื่อ 20 พ.ย. · ช่างนัดเข้าวันที่ 27 · ค่าซ่อมประมาณ 450 บาท",
  },
  {
    id: "r2",
    title: "แอร์ห้องนอนไม่เย็น",
    detail: "ล้างแอร์และเติมน้ำยา · ค่าซ่อม 1,200 บาท",
  },
  {
    id: "r3",
    title: "ปลั๊กไฟหน้าบ้านไม่มีไฟ",
    detail: "เปลี่ยนเบรกเกอร์ · เสร็จแล้ว",
  },
]

const meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  args: { multiple: false },
  argTypes: {
    multiple: { description: "เปิดได้หลายหัวข้อพร้อมกัน" },
  },
  render: ({ multiple }) => (
    <Accordion multiple={multiple} defaultValue={["r1"]} className="max-w-md">
      {repairs.map((r) => (
        <AccordionItem key={r.id} value={r.id}>
          <AccordionTrigger>{r.title}</AccordionTrigger>
          <AccordionContent>{r.detail}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Repair requests; open one to see the details. */
export const Playground: Story = {}

export const Multiple: Story = { args: { multiple: true } }
