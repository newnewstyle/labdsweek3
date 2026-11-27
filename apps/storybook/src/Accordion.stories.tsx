import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@newnewstyle/ui"

import { pseudoByAttribute, StateGrid } from "./story-helpers"

type Args = { multiple: boolean; disabled: boolean }

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
  args: { multiple: false, disabled: false },
  argTypes: {
    multiple: {
      control: "boolean",
      description: "เปิดได้หลายหัวข้อพร้อมกัน",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: { control: "boolean", description: "ปิดทั้งชุด กดเปิดไม่ได้" },
  },
  render: ({ multiple, disabled }) => (
    <Accordion
      multiple={multiple}
      disabled={disabled}
      defaultValue={["r1"]}
      className="max-w-md"
    >
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

/** Repair requests; open one to see the details. Opening one closes the other. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const first = canvas.getByRole("button", { name: "ก๊อกน้ำห้องครัวรั่ว" })
    const second = canvas.getByRole("button", { name: "แอร์ห้องนอนไม่เย็น" })
    await expect(first).toHaveAttribute("aria-expanded", "true")
    await userEvent.click(second)
    await expect(second).toHaveAttribute("aria-expanded", "true")
    await expect(first).toHaveAttribute("aria-expanded", "false")
  },
}

export const Multiple: Story = {
  args: { multiple: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "แอร์ห้องนอนไม่เย็น" }))
    await expect(
      canvas.getByRole("button", { name: "ก๊อกน้ำห้องครัวรั่ว" })
    ).toHaveAttribute("aria-expanded", "true")
    await expect(
      canvas.getByRole("button", { name: "แอร์ห้องนอนไม่เย็น" })
    ).toHaveAttribute("aria-expanded", "true")
  },
}

/** Keyboard: Enter on a focused trigger toggles it. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "ปลั๊กไฟหน้าบ้านไม่มีไฟ",
    })
    trigger.focus()
    await userEvent.keyboard("{Enter}")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}

const states = ["rest", "hover", "focus-visible", "open", "disabled"] as const

/** Trigger states (hover underlines, focus shows the ring). */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={states}
      columns={["trigger"] as const}
      renderCell={(state) => (
        <Accordion
          className="w-72"
          defaultValue={state === "open" ? ["x"] : []}
          disabled={state === "disabled"}
        >
          <AccordionItem value="x">
            <AccordionTrigger
              data-pseudo={
                state === "hover" || state === "focus-visible" ? state : undefined
              }
            >
              ก๊อกน้ำห้องครัวรั่ว
            </AccordionTrigger>
            <AccordionContent>ช่างนัดเข้าวันที่ 27</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    />
  ),
}
