import type { Meta, StoryObj } from "@storybook/react-vite"
import { StarIcon } from "lucide-react"

import { Toggle, type ToggleSize, type ToggleVariant } from "@newnewstyle/ui"

type Args = { variant: ToggleVariant; size: ToggleSize; disabled: boolean }

const meta = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  args: { variant: "outline", size: "default", disabled: false },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
      description: "ไม่มีขอบ หรือมีขอบ",
    },
    size: {
      control: "inline-radio",
      options: ["sm", "default", "lg"],
      description: "สูง 28 / 32 / 36px",
    },
    disabled: { description: "กดไม่ได้" },
  },
  render: ({ variant, size, disabled }) => (
    <Toggle variant={variant} size={size} disabled={disabled}>
      <StarIcon data-icon="inline-start" aria-hidden />
      ติดดาว
    </Toggle>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Press to turn on (stays pressed), press again to turn off. */
export const Playground: Story = {}

/** Icon only: needs an aria-label. */
export const IconOnly: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="ติดดาวบ้านหลังนี้">
      <StarIcon />
    </Toggle>
  ),
}
