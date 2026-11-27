import type { Meta, StoryObj } from "@storybook/react-vite"

import { Money, type MoneyDisplay } from "@newnewstyle/ui"

type Args = { value: number; display: MoneyDisplay; fractionDigits?: number }

const meta = {
  title: "Components/Money",
  tags: ["autodocs"],
  args: { value: 8500, display: "symbol" },
  argTypes: {
    value: { control: "number", description: "จำนวนเงิน (บาท)" },
    display: {
      control: "inline-radio",
      options: ["symbol", "word", "none"],
      description: "฿8,500 / 8,500 บาท / ตัวเลขอย่างเดียว",
    },
    fractionDigits: {
      control: { type: "number", min: 0, max: 2 },
      description: "จำนวนทศนิยม (สตางค์) ถ้าไม่ใส่ แสดง 0–2 ตามจริง",
    },
  },
  render: (args) => <Money {...args} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Word: Story = { args: { display: "word" } }

export const Satang: Story = { args: { value: 1250.5, fractionDigits: 2 } }

/** Negative, e.g. a refund. */
export const Negative: Story = { args: { value: -1200 } }

/** Digits line up in a right-aligned column. */
export const Column: Story = {
  render: () => (
    <div className="flex w-40 flex-col items-end gap-1 text-sm">
      <Money value={8500} />
      <Money value={12000} />
      <Money value={950} />
      <Money value={24500} className="font-semibold" />
    </div>
  ),
}
