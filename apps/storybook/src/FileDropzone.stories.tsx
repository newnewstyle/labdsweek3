import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { FileDropzone, Label } from "@newnewstyle/ui"

import { StateGrid } from "./story-helpers"

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
    disabled: { control: "boolean", description: "ปิดการเลือกรูป" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Controlled: `files` + `onFilesChange`. Also `maxFiles` (default 5), `accept` (default `image/*`), `hint`, `disabled`. Label it with a `<Label htmlFor>` pointing at its `id`.",
      },
    },
  },
  render: (args) => <RepairPhotos {...args} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Drop photos or click to pick; thumbnails appear with a remove button.
 * Files stay in the browser.
 */
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("รูปจุดที่ต้องซ่อม")
    const photo = new File(["x"], "ก๊อกน้ำ.png", { type: "image/png" })
    await userEvent.upload(input, photo)
    const list = canvas.getByRole("list", { name: "รูปที่เลือก" })
    await expect(within(list).getByRole("img", { name: "ก๊อกน้ำ.png" })).toBeInTheDocument()
    await userEvent.click(canvas.getByRole("button", { name: "ลบรูป ก๊อกน้ำ.png" }))
    await expect(canvas.queryByRole("list", { name: "รูปที่เลือก" })).not.toBeInTheDocument()
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByLabelText("รูปจุดที่ต้องซ่อม")).toBeDisabled()
  },
}

const states = ["rest", "hover", "focus-visible", "disabled"] as const

/**
 * The drop area in each state. Hover is forced on the <label> zone, focus on the hidden input
 * inside it (the zone's `:has(:focus-visible)` rule draws the ring). The dragging state is
 * set only by a real drag.
 */
export const States: Story = {
  parameters: {
    layout: "padded",
    pseudo: {
      hover: ['[data-pseudo-zone="hover"] label'],
      focusVisible: ['[data-pseudo="focus-visible"]'],
    },
  },
  render: () => (
    <StateGrid
      rows={states}
      columns={["zone"] as const}
      renderCell={(state) => (
        <div className="w-72" data-pseudo-zone={state === "hover" ? state : undefined}>
          <FileDropzone
            aria-label={`รูปจุดที่ต้องซ่อม (${state})`}
            files={[]}
            onFilesChange={() => {}}
            disabled={state === "disabled"}
            data-pseudo={state === "focus-visible" ? state : undefined}
          />
        </div>
      )}
    />
  ),
}
