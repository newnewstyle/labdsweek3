import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  RadioGroup,
  RadioGroupItem,
} from "@newnewstyle/ui"

import { pseudoByAttribute, StateGrid } from "./story-helpers"

type Args = {
  disabled: boolean
  onValueChange: (value: unknown) => void
}

const channels = [
  { value: "line", label: "LINE", hint: "ผู้เช่าส่วนใหญ่อ่านเร็วที่สุด" },
  { value: "sms", label: "SMS", hint: "สำหรับผู้เช่าที่ไม่มี LINE" },
  { value: "email", label: "อีเมล", hint: "แนบใบแจ้งหนี้ได้" },
]

const meta = {
  title: "Components/RadioGroup",
  tags: ["autodocs"],
  args: { disabled: false, onValueChange: fn() },
  argTypes: {
    disabled: { control: "boolean", description: "ปิดทั้งกลุ่ม" },
    onValueChange: { description: "เรียกเมื่อเลือกตัวเลือกใหม่ ได้ `value` ของตัวที่เลือก" },
  },
  render: ({ disabled, onValueChange }) => (
    <RadioGroup
      defaultValue="line"
      disabled={disabled}
      onValueChange={onValueChange}
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

/** Pick one reminder channel. Arrow keys move the selection. */
export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const line = canvas.getByRole("radio", { name: "LINE" })
    const sms = canvas.getByRole("radio", { name: "SMS" })
    await expect(line).toHaveAttribute("aria-checked", "true")
    await userEvent.click(sms)
    await expect(sms).toHaveAttribute("aria-checked", "true")
    await expect(line).toHaveAttribute("aria-checked", "false")
    await expect(args.onValueChange).toHaveBeenLastCalledWith(
      "sms",
      expect.anything()
    )
    sms.focus()
    await userEvent.keyboard("{ArrowDown}")
    await expect(canvas.getByRole("radio", { name: "อีเมล" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const sms = within(canvasElement).getByRole("radio", { name: "SMS" })
    await userEvent.setup({ pointerEventsCheck: 0 }).click(sms)
    await expect(sms).toHaveAttribute("aria-checked", "false")
    await expect(args.onValueChange).not.toHaveBeenCalled()
  },
}

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

const states = ["rest", "focus-visible", "disabled", "invalid"] as const
const checked = ["unchecked", "checked"] as const

/** The radio dot in every state, checked and unchecked. */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={states}
      columns={checked}
      renderCell={(state, column) => (
        <RadioGroup
          aria-label={`${state} ${column}`}
          defaultValue={column === "checked" ? "a" : undefined}
          disabled={state === "disabled"}
        >
          <RadioGroupItem
            value="a"
            aria-label={`${state} ${column}`}
            aria-invalid={state === "invalid" || undefined}
            data-pseudo={state === "focus-visible" ? state : undefined}
          />
        </RadioGroup>
      )}
    />
  ),
}
