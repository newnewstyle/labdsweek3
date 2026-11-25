import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  RadioGroup,
  RadioGroupItem,
} from "@scope/ui"

type Args = { disabled: boolean }

const channels = [
  { value: "line", label: "LINE", hint: "ผู้เช่าส่วนใหญ่อ่านเร็วที่สุด" },
  { value: "sms", label: "SMS", hint: "สำหรับผู้เช่าที่ไม่มี LINE" },
  { value: "email", label: "อีเมล", hint: "แนบใบแจ้งหนี้ได้" },
]

const meta = {
  title: "Components/RadioGroup",
  tags: ["autodocs"],
  args: { disabled: false },
  argTypes: { disabled: { description: "ปิดทั้งกลุ่ม" } },
  render: ({ disabled }) => (
    <RadioGroup
      defaultValue="line"
      disabled={disabled}
      aria-label="ช่องทางส่งเตือน"
      className="max-w-xs"
    >
      {channels.map((c) => (
        <Field key={c.value} orientation="horizontal">
          <RadioGroupItem value={c.value} id={`ch-${c.value}`} />
          <FieldLabel htmlFor={`ch-${c.value}`}>{c.label}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Pick one reminder channel. */
export const Playground: Story = {}

/** FieldLabel wrapping a Field turns each option into a choice card. */
export const ChoiceCards: Story = {
  render: () => (
    <RadioGroup
      defaultValue="line"
      aria-label="ช่องทางส่งเตือน"
      className="max-w-sm"
    >
      {channels.map((c) => (
        <FieldLabel key={c.value} htmlFor={`card-${c.value}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{c.label}</FieldTitle>
              <FieldDescription>{c.hint}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={c.value} id={`card-${c.value}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  ),
}
