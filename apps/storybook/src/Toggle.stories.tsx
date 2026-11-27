import type { Meta, StoryObj } from "@storybook/react-vite"
import { StarIcon } from "lucide-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Toggle, type ToggleSize, type ToggleVariant } from "@newnewstyle/ui"

import { pseudoByAttribute, StateGrid } from "./story-helpers"

// Typed with the exported unions so a renamed variant or size fails typecheck.
const variants = ["default", "outline"] as const satisfies readonly ToggleVariant[]
const sizes = ["sm", "default", "lg"] as const satisfies readonly ToggleSize[]

type Args = {
  variant: ToggleVariant
  size: ToggleSize
  disabled: boolean
  onPressedChange: (pressed: boolean) => void
}

const meta = {
  title: "Components/Toggle",
  tags: ["autodocs"],
  args: {
    variant: "outline",
    size: "default",
    disabled: false,
    onPressedChange: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: variants,
      description: "ไม่มีขอบ หรือมีขอบ Rendered as `data-variant`.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: sizes,
      description: "สูง 28 / 32 / 36px Rendered as `data-size`.",
      table: { defaultValue: { summary: "default" } },
    },
    disabled: { control: "boolean", description: "กดไม่ได้" },
    onPressedChange: { description: "เรียกเมื่อกดเปิด/ปิด ได้ค่า `pressed` ใหม่" },
  },
  render: ({ variant, size, disabled, onPressedChange }) => (
    <Toggle
      variant={variant}
      size={size}
      disabled={disabled}
      onPressedChange={onPressedChange}
    >
      <StarIcon data-icon="inline-start" aria-hidden />
      ติดดาว
    </Toggle>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Press to turn on (stays pressed), press again to turn off. */
export const Playground: Story = {
  play: async ({ args, canvasElement }) => {
    const toggle = within(canvasElement).getByRole("button", { name: "ติดดาว" })
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
    await expect(args.onPressedChange).toHaveBeenLastCalledWith(
      true,
      expect.anything()
    )
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "false")
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <Toggle key={size} variant={args.variant} size={size}>
          size {size}
        </Toggle>
      ))}
    </div>
  ),
}

/** Icon only: needs an aria-label. */
export const IconOnly: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="ติดดาวบ้านหลังนี้">
      <StarIcon />
    </Toggle>
  ),
}

/** Disabled toggles ignore clicks. */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const toggle = within(canvasElement).getByRole("button", { name: "ติดดาว" })
    await expect(toggle).toBeDisabled()
    await userEvent.setup({ pointerEventsCheck: 0 }).click(toggle)
    await expect(args.onPressedChange).not.toHaveBeenCalled()
  },
}

const states = [
  "rest",
  "hover",
  "focus-visible",
  "active",
  "pressed",
  "disabled",
] as const

/** Every variant in every state; hover/focus/active are forced by the pseudo-states addon. */
export const States: Story = {
  parameters: { layout: "padded", pseudo: pseudoByAttribute },
  render: () => (
    <StateGrid
      rows={states}
      columns={variants}
      renderCell={(state, variant) => (
        <Toggle
          variant={variant}
          defaultPressed={state === "pressed"}
          disabled={state === "disabled"}
          data-pseudo={
            state === "hover" || state === "focus-visible" || state === "active"
              ? state
              : undefined
          }
        >
          <StarIcon data-icon="inline-start" aria-hidden />
          ติดดาว
        </Toggle>
      )}
    />
  ),
}
