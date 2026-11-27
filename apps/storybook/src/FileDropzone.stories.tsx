import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { FileDropzone, Label } from "@newnewstyle/ui"

type Args = { maxFiles: number; disabled: boolean }

function RepairPhotos({ maxFiles, disabled }: Args) {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <div className="flex max-w-md flex-col gap-2">
      <Label htmlFor="repair-photos">รูปจุดที่ต้องซ่อม</Label>
      <FileDropzone
        id="repair-photos"
        files={files}
        onFilesChange={setFiles}
        maxFiles={maxFiles}
        disabled={disabled}
        hint={`JPG หรือ PNG ไม่เกิน ${maxFiles} รูป (ไม่ได้อัปโหลดจริง)`}
      />
    </div>
  )
}

const meta = {
  title: "Components/FileDropzone",
  tags: ["autodocs"],
  args: { maxFiles: 5, disabled: false },
  argTypes: {
    maxFiles: {
      control: { type: "range", min: 1, max: 10, step: 1 },
      description: "จำนวนรูปสูงสุด",
    },
    disabled: { description: "ปิดการเลือกรูป" },
  },
  render: (args) => <RepairPhotos {...args} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Drop photos or click to pick; thumbnails appear with a remove button.
 * Files stay in the browser.
 */
export const Playground: Story = {}
