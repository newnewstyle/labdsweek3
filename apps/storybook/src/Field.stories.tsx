import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"

import {
  Button,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  type FieldOrientation,
  FieldSeparator,
  FieldSet,
  Input,
  Switch,
} from "@newnewstyle/ui"

import { usageDoc } from "./lib/usage-doc"
import usage from "@ui-docs/components/Field/Field.md?raw"
import { fieldSpec } from "@ui-docs/components/Field/Field.spec"

const orientations = [
  "vertical",
  "horizontal",
  "responsive",
] as const satisfies readonly FieldOrientation[]

type Args = { orientation: FieldOrientation; invalid: boolean; disabled: boolean }

const meta = {
  title: "Components/Field",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: usageDoc(usage, fieldSpec) } },
  },
  args: { orientation: "vertical", invalid: false, disabled: false },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: orientations,
      description:
        "ป้ายอยู่บนช่อง, อยู่ข้างช่อง, หรือเปลี่ยนตามความกว้าง (responsive)",
      table: { defaultValue: { summary: "vertical" } },
    },
    invalid: {
      control: "boolean",
      description:
        "แสดงข้อความผิดใต้ช่อง: ใส่ `data-invalid` ที่ Field และ `aria-invalid` ที่ช่อง",
    },
    disabled: {
      control: "boolean",
      description:
        "ปิดช่อง: `disabled` ที่ช่องกรอก และ `data-disabled` ที่ Field (ป้ายจางลงด้วย)",
    },
  },
  render: ({ orientation, invalid, disabled }) => (
    <FieldGroup className="max-w-md">
      <Field
        orientation={orientation}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
      >
        <FieldLabel htmlFor="phone">เบอร์โทรผู้เช่า</FieldLabel>
        <Input
          id="phone"
          inputMode="tel"
          placeholder="081-234-5678"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? "phone-error" : "phone-hint"}
        />
        {invalid ? (
          <FieldError id="phone-error">เบอร์โทรต้องมี 10 หลัก</FieldError>
        ) : (
          <FieldDescription id="phone-hint">ใช้ส่ง SMS เตือนค่าเช่า</FieldDescription>
        )}
      </Field>
    </FieldGroup>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Label, input, then a hint, or an error that replaces it. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("เบอร์โทรผู้เช่า")
    await expect(input).toHaveAttribute("id", "phone")
    await expect(input).toHaveAccessibleDescription("ใช้ส่ง SMS เตือนค่าเช่า")
    await expect(canvas.getByRole("group")).toHaveAttribute("data-slot", "field")
  },
}

/** The error is a `role="alert"` and the input is marked invalid. */
export const Invalid: Story = {
  args: { invalid: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "เบอร์โทรต้องมี 10 หลัก"
    )
    const input = canvas.getByLabelText("เบอร์โทรผู้เช่า")
    await expect(input).toHaveAttribute("aria-invalid", "true")
    await expect(input).toHaveAccessibleDescription("เบอร์โทรต้องมี 10 หลัก")
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("เบอร์โทรผู้เช่า")
    ).toBeDisabled()
  },
}

/** Each orientation with the same field. */
export const Orientations: Story = {
  render: () => (
    <FieldGroup className="max-w-lg">
      {orientations.map((orientation) => (
        <Field key={orientation} orientation={orientation}>
          <FieldLabel htmlFor={`o-${orientation}`}>{orientation}</FieldLabel>
          <Input id={`o-${orientation}`} placeholder="081-234-5678" />
        </Field>
      ))}
    </FieldGroup>
  ),
}

/** A full form section: legend, grouped fields, separator, settings. */
export const Form: Story = {
  render: () => (
    <form className="max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FieldSet>
        <FieldLegend>ข้อมูลผู้เช่า</FieldLegend>
        <FieldDescription>ใช้ติดต่อและส่งเตือนค่าเช่า</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="f-name">ชื่อ-นามสกุล</FieldLabel>
            <Input id="f-name" placeholder="สมชาย ใจกว้าง" />
          </Field>
          <Field>
            <FieldLabel htmlFor="f-phone">เบอร์โทร</FieldLabel>
            <Input id="f-phone" inputMode="tel" placeholder="081-234-5678" />
          </Field>
          <FieldSeparator>การแจ้งเตือน</FieldSeparator>
          <Field orientation="horizontal">
            <Checkbox id="f-remind" defaultChecked />
            <FieldContent>
              <FieldLabel htmlFor="f-remind">
                เตือนก่อนครบกำหนด 3 วัน
              </FieldLabel>
              <FieldDescription>ส่งทาง LINE ตอน 9 โมงเช้า</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="f-auto">ส่งเตือนอัตโนมัติ</FieldLabel>
            <Switch id="f-auto" />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">บันทึก</Button>
            <Button type="button" variant="outline">
              ยกเลิก
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("group", { name: "ข้อมูลผู้เช่า" })).toBeInTheDocument()
    await expect(
      canvas.getByRole("checkbox", { name: "เตือนก่อนครบกำหนด 3 วัน" })
    ).toBeChecked()
  },
}
