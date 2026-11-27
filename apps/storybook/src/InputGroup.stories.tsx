import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIcon, SearchIcon } from "lucide-react"
import { expect, userEvent, within } from "storybook/test"

import {
  InputGroup,
  InputGroupAddon,
  type InputGroupAddonAlign,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  Label,
  toast,
  Toaster,
} from "@newnewstyle/ui"

import { StateGrid } from "./story-helpers"

const aligns = [
  "inline-start",
  "inline-end",
  "block-start",
  "block-end",
] as const satisfies readonly InputGroupAddonAlign[]

type Args = { disabled: boolean; invalid: boolean }

const meta = {
  title: "Components/InputGroup",
  tags: ["autodocs"],
  args: { disabled: false, invalid: false },
  argTypes: {
    disabled: { control: "boolean", description: "ปิดช่องกรอก (ทั้งกลุ่มจางลง)" },
    invalid: {
      control: "boolean",
      description: "กรอกผิด: `aria-invalid` ที่ช่อง ทำให้ขอบแดงทั้งกลุ่ม",
    },
  },
  render: ({ disabled, invalid }) => (
    <div className="flex max-w-xs flex-col gap-2">
      <Label htmlFor="rent">ค่าเช่าต่อเดือน</Label>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>฿</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="rent"
          inputMode="numeric"
          placeholder="8,500"
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>บาท</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Unit on both sides: ฿ before, บาท after. Click the ฿ to focus the input. */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("ค่าเช่าต่อเดือน")
    await userEvent.click(canvas.getByText("฿"))
    await expect(input).toHaveFocus()
    await userEvent.type(input, "9000")
    await expect(input).toHaveValue("9000")
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByLabelText("ค่าเช่าต่อเดือน")
    ).toBeDisabled()
  },
}

export const Invalid: Story = { args: { invalid: true } }

/** `align` on InputGroupAddon: before/after the input, or above/below it. */
export const Alignments: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <StateGrid
      rows={aligns}
      columns={["addon"] as const}
      corner="align"
      renderCell={(align) => (
        <InputGroup className="w-64">
          <InputGroupInput aria-label={`ค่าเช่า (${align})`} placeholder="8,500" />
          <InputGroupAddon align={align}>
            <InputGroupText>บาท</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      )}
    />
  ),
}

export const SearchIconStart: Story = {
  render: () => (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <SearchIcon aria-hidden />
      </InputGroupAddon>
      <InputGroupInput placeholder="ค้นหาผู้เช่า" aria-label="ค้นหาผู้เช่า" />
    </InputGroup>
  ),
}

export const WithButton: Story = {
  render: () => (
    <>
    <Toaster />
    <InputGroup className="max-w-xs">
      <InputGroupInput
        readOnly
        defaultValue="BAANCHAO-12-3"
        aria-label="รหัสบ้าน"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label="คัดลอกรหัส"
          onClick={() => toast.success("คัดลอกรหัสบ้านแล้ว")}
        >
          <CopyIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    </>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "คัดลอกรหัส" })
    )
    // sonner's store is global: other stories may have left toasts behind.
    const toasts = await within(document.body).findAllByText("คัดลอกรหัสบ้านแล้ว")
    await expect(toasts.length).toBeGreaterThan(0)
  },
}

/** Textarea with a character count in a block-end addon. */
export const WithTextarea: Story = {
  render: () => (
    <InputGroup className="max-w-sm">
      <InputGroupTextarea
        placeholder="ข้อความเตือนค่าเช่า"
        aria-label="ข้อความเตือนค่าเช่า"
        rows={3}
      />
      <InputGroupAddon align="block-end">
        <InputGroupText className="ml-auto">0/160</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

const states = ["rest", "focus-visible", "invalid", "disabled"] as const

/**
 * The group draws the border and ring for its input. Focus is forced on the inner input
 * (`focusVisible` selector below), which the group's `:has(:focus-visible)` picks up.
 */
export const States: Story = {
  parameters: {
    layout: "padded",
    pseudo: { focusVisible: ['[data-pseudo="focus-visible"]'] },
  },
  render: () => (
    <StateGrid
      rows={states}
      columns={["group"] as const}
      renderCell={(state) => (
        <InputGroup className="w-64">
          <InputGroupAddon>
            <InputGroupText>฿</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            aria-label={`ค่าเช่า (${state})`}
            placeholder="8,500"
            disabled={state === "disabled"}
            aria-invalid={state === "invalid" || undefined}
            data-pseudo={state === "focus-visible" ? state : undefined}
          />
        </InputGroup>
      )}
    />
  ),
}
