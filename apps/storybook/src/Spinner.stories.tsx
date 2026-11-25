import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, Spinner } from "@scope/ui"

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Size with a size-* class. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

/** Inline with text while a section loads. */
export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      กำลังโหลดรายการผู้เช่า…
    </div>
  ),
}

/** Buttons have their own `loading` prop; use that instead of a Spinner. */
export const InButton: Story = {
  render: () => <Button loading>กำลังบันทึก</Button>,
}
