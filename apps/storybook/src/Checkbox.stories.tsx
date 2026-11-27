import { Checkbox, Label } from "@newnewstyle/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { pseudoByAttribute, StateGrid } from "./story-helpers";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    "aria-label": "ยอมรับเงื่อนไข",
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    required: { control: "boolean" },
    "aria-invalid": { control: "boolean", description: "Error state." },
    className: { control: "text" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="terms" aria-label={undefined} />
      <Label htmlFor="terms">ยอมรับเงื่อนไขการใช้งาน</Label>
    </div>
  ),
};

const states = ["rest", "hover", "focus-visible", "disabled", "invalid"] as const;
const values = ["unchecked", "checked"] as const;

export const States: Story = {
  parameters: { pseudo: pseudoByAttribute },
  render: (args) => (
    <StateGrid
      rows={states}
      columns={values}
      renderCell={(state, value) => (
        <Checkbox
          {...args}
          aria-label={`${state} ${value}`}
          data-pseudo={state === "hover" || state === "focus-visible" ? state : undefined}
          defaultChecked={value === "checked"}
          disabled={state === "disabled"}
          aria-invalid={state === "invalid" || undefined}
        />
      )}
    />
  ),
};

export const Toggle: Story = {
  play: async ({ args, canvasElement }) => {
    const box = within(canvasElement).getByRole("checkbox", { name: "ยอมรับเงื่อนไข" });
    await userEvent.click(box);
    await expect(box).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalled();
  },
};

export const DisabledIgnoresClicks: Story = {
  args: { disabled: true },
  play: async ({ args, canvasElement }) => {
    const box = within(canvasElement).getByRole("checkbox", { name: "ยอมรับเงื่อนไข" });
    await userEvent.click(box);
    await expect(box).not.toBeChecked();
    await expect(args.onCheckedChange).not.toHaveBeenCalled();
  },
};
