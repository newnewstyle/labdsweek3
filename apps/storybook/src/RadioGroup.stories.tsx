import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
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
          <RadioGroupItem value={c.value} />
          <FieldLabel>{c.label}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Pick one reminder channel. Arrow keys move the selection (Base UI roving focus; not asserted
 * here, see AGENTS.md).
 */
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

/**
 * A RadioGroup inside a Field: the FieldLabel names the group (aria-labelledby) and the
 * FieldError describes it; each option is wired by its own Field. No ids needed.
 */
export const Invalid: Story = {
  render: () => (
    <Field data-invalid className="max-w-xs">
      <FieldLabel>ช่องทางส่งเตือน</FieldLabel>
      <RadioGroup>
        {channels.map((c) => (
          <Field key={c.value} orientation="horizontal">
            <RadioGroupItem value={c.value} />
            <FieldLabel>{c.label}</FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <FieldError>เลือกช่องทางส่งเตือนอย่างน้อยหนึ่งช่องทาง</FieldError>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const group = canvas.getByRole("radiogroup", { name: "ช่องทางส่งเตือน" })
    await expect(group).toHaveAttribute("aria-invalid", "true")
    await expect(group).toHaveAccessibleDescription(
      "เลือกช่องทางส่งเตือนอย่างน้อยหนึ่งช่องทาง"
    )
    await userEvent.click(canvas.getByRole("radio", { name: "SMS" }))
    await expect(canvas.getByRole("radio", { name: "SMS" })).toHaveAttribute(
      "aria-checked",
      "true"
    )
  },
}

/** FieldLabel wrapping a Field turns each option into a choice card. No ids needed. */
export const ChoiceCards: Story = {
  render: () => (
    <RadioGroup
      defaultValue="line"
      aria-label="ช่องทางส่งเตือน"
      className="max-w-sm"
    >
      {channels.map((c) => (
        <FieldLabel key={c.value}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{c.label}</FieldTitle>
              <FieldDescription>{c.hint}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={c.value} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const sms = within(canvasElement).getByRole("radio", { name: /SMS/ })
    await expect(sms).toHaveAccessibleDescription("สำหรับผู้เช่าที่ไม่มี LINE")
    await userEvent.click(sms)
    await expect(sms).toHaveAttribute("aria-checked", "true")
  },
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
