import type { Meta, StoryObj } from "@storybook/react-vite"
import { CopyIcon, SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  Label,
  toast,
} from "@scope/ui"

type Args = { disabled: boolean; invalid: boolean }

const meta = {
  title: "Components/InputGroup",
  tags: ["autodocs"],
  args: { disabled: false, invalid: false },
  argTypes: {
    disabled: { description: "ปิดช่องกรอก" },
    invalid: { description: "กรอกผิด (ขอบแดงทั้งกลุ่ม)" },
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
export const Playground: Story = {}

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
  ),
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
