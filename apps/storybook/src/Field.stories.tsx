import type { Meta, StoryObj } from "@storybook/react-vite"

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

type Args = { orientation: FieldOrientation; invalid: boolean }

const meta = {
  title: "Components/Field",
  tags: ["autodocs"],
  args: { orientation: "vertical", invalid: false },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "responsive"],
      description:
        "ป้ายอยู่บนช่อง, อยู่ข้างช่อง, หรือเปลี่ยนตามความกว้าง (responsive)",
    },
    invalid: { description: "แสดงข้อความผิดใต้ช่อง" },
  },
  render: ({ orientation, invalid }) => (
    <FieldGroup className="max-w-md">
      <Field orientation={orientation} data-invalid={invalid || undefined}>
        <FieldLabel htmlFor="phone">เบอร์โทรผู้เช่า</FieldLabel>
        <Input
          id="phone"
          inputMode="tel"
          placeholder="081-234-5678"
          aria-invalid={invalid || undefined}
        />
        {invalid ? (
          <FieldError>เบอร์โทรต้องมี 10 หลัก</FieldError>
        ) : (
          <FieldDescription>ใช้ส่ง SMS เตือนค่าเช่า</FieldDescription>
        )}
      </Field>
    </FieldGroup>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Label, input, then a hint, or an error that replaces it. */
export const Playground: Story = {}

export const Invalid: Story = { args: { invalid: true } }

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
}
